import { SimpleEditor } from "@/components/titap/tiptap-templates/simple/simple-editor";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useMyProfile } from "@/hooks/useMyProfile";
import { useEffect, useState, useCallback, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import slugify from "slugify";
import throttle from "lodash.throttle";
import { toast } from "sonner";
import { getNewsBySlug } from "@/services/newsApi";
import type { NewsDetailResponse } from "@/types/news.types";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Upload, User as UserIcon } from "lucide-react";

// Form data interface
interface NewsFormData {
  title: string;
  slug: string;
  description: string;
  thumbnail: File | null;
  isPublic: boolean;
  content: string;
}

// Validation schema
const newsSchema = Yup.object().shape({
  title: Yup.string()
    .required("Tiêu đề không được để trống")
    .min(10, "Tiêu đề phải có ít nhất 10 ký tự")
    .max(200, "Tiêu đề không được vượt quá 200 ký tự"),
  slug: Yup.string()
    .required("Slug không được để trống")
    .matches(/^[a-z0-9-]+$/, "Slug chỉ chứa chữ thường, số và dấu gạch ngang"),
  description: Yup.string()
    .required("Mô tả không được để trống")
    .min(20, "Mô tả phải có ít nhất 20 ký tự")
    .max(500, "Mô tả không được vượt quá 500 ký tự"),
  thumbnail: Yup.mixed<File>().nullable().default(null),
  isPublic: Yup.boolean().required().default(true),
  content: Yup.string().default(""),
});

export default function NewsUpsertPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { user, loading } = useMyProfile();
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [isSlugManuallyEdited, setIsSlugManuallyEdited] = useState(false);
  const [isLoadingNews, setIsLoadingNews] = useState(false);
  const [newsData, setNewsData] = useState<NewsDetailResponse | null>(null);
  const [editorContent, setEditorContent] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isEditMode = !!slug;

  const form = useForm<NewsFormData>({
    resolver: yupResolver(newsSchema),
    defaultValues: {
      title: "",
      slug: "",
      description: "",
      thumbnail: null,
      isPublic: true,
      content: "",
    },
  });

  // Load news data when editing
  useEffect(() => {
    const loadNewsData = async () => {
      if (!slug) return;
      
      setIsLoadingNews(true);
      try {
        const response = await getNewsBySlug(slug);
        const news = response.result;
        setNewsData(news);
        
        // Populate form
        form.setValue("title", news.title);
        form.setValue("slug", news.slug);
        form.setValue("description", news.description);
        form.setValue("isPublic", news.isPublic);
        
        // Set thumbnail preview if exists
        if (news.thumbnailUrl) {
          setThumbnailPreview(news.thumbnailUrl);
        }
        
        // Set editor content
        setEditorContent(news.contentHtml || "");
        
        // Mark slug as manually edited to prevent auto-generation
        setIsSlugManuallyEdited(true);
        
        toast.success("Đã tải dữ liệu tin tức");
      } catch (error) {
        console.error("Failed to load news:", error);
        toast.error("Không thể tải dữ liệu tin tức");
        navigate("/admin/news");
      } finally {
        setIsLoadingNews(false);
      }
    };
    
    loadNewsData();
  }, [slug, form, navigate]);

  // Throttled slug generation function
  const generateSlugFromTitle = useCallback(
    (title: string, setValue: (field: string, value: string) => void) => {
      if (title) {
        const generatedSlug = slugify(title, {
          lower: true,
          strict: true,
          locale: "vi",
        });
        setValue("slug", generatedSlug);
      }
    },
    []
  );

  const throttledGenerateSlug = useRef(
    throttle(
      (title: string, setValue: (field: string, value: string) => void) => {
        generateSlugFromTitle(title, setValue);
      },
      500
    )
  ).current;

  // Watch title changes for auto-generating slug
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === "title" && value.title && !isSlugManuallyEdited) {
        throttledGenerateSlug(value.title, (field: string, val: string) =>
          form.setValue(field as "slug", val)
        );
      }
    });
    return () => subscription.unsubscribe();
  }, [form, isSlugManuallyEdited, throttledGenerateSlug]);

  // Handle thumbnail upload
  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue("thumbnail", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const onSubmit = (data: NewsFormData) => {
    console.log("News data:", data);
    console.log("Editor content:", editorContent);
    console.log("Is edit mode:", isEditMode);
    console.log("News ID:", newsData?.id);
    // TODO: Implement API call to save/update news
  };

  if (isLoadingNews) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Đang tải dữ liệu tin tức...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          {isEditMode ? "Chỉnh sửa tin tức" : "Thêm tin tức mới"}
        </h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Current User Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserIcon className="w-5 h-5" />
                  Thông tin tác giả
                </CardTitle>
                <CardDescription>
                  Người tạo/chỉnh sửa tin tức này
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gray-200 animate-pulse" />
                    <div className="space-y-2">
                      <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                      <div className="h-3 w-48 bg-gray-200 rounded animate-pulse" />
                    </div>
                  </div>
                ) : user ? (
                  <div className="flex items-center gap-4">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={user.avatarUrl} alt={user.username} />
                      <AvatarFallback>
                        {user.firstName?.[0]}
                        {user.lastName?.[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-gray-900">
                        {user.firstName} {user.lastName}
                      </p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-500">
                    Không thể tải thông tin người dùng
                  </p>
                )}
              </CardContent>
            </Card>

            {/* News Metadata Form */}
            <Card>
              <CardHeader>
                <CardTitle>Thông tin tin tức</CardTitle>
                <CardDescription>
                  Điền thông tin cơ bản cho bài viết của bạn
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Title Input */}
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Tiêu đề <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Nhập tiêu đề tin tức..."
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Tiêu đề hấp dẫn sẽ thu hút nhiều người đọc hơn
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Slug Input */}
                <FormField
                  control={form.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Slug (URL thân thiện){" "}
                        <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="duong-dan-url-thuan-tien"
                          {...field}
                          onChange={(e) => {
                            setIsSlugManuallyEdited(true);
                            field.onChange(e);
                          }}
                        />
                      </FormControl>
                      <FormDescription>
                        Tự động tạo từ tiêu đề. Bạn có thể chỉnh sửa thủ công.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Thumbnail Upload */}
                  <FormField
                    control={form.control}
                    name="thumbnail"
                    render={() => (
                      <FormItem>
                        <FormLabel>Ảnh đại diện</FormLabel>
                        <FormControl>
                          <div className="space-y-4">
                            <div className="flex items-center gap-4">
                              <Input
                                type="file"
                                accept="image/*"
                                onChange={handleThumbnailChange}
                                ref={fileInputRef}
                                className="cursor-pointer"
                              />
                              <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                onClick={() => fileInputRef.current?.click()}
                              >
                                <Upload className="w-4 h-4" />
                              </Button>
                            </div>
                            {thumbnailPreview && (
                              <div className="relative w-full h-48 rounded-lg overflow-hidden border">
                                <img
                                  src={thumbnailPreview}
                                  alt="Preview"
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            )}
                          </div>
                        </FormControl>
                        <FormDescription>
                          Tải lên ảnh đại diện cho tin tức (khuyến nghị:
                          1200x630px)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Public Toggle */}
                  <FormField
                    control={form.control}
                    name="isPublic"
                    render={({ field }) => (
                      <FormItem className="flex flex-col justify-between">
                        <div>
                          <FormLabel>Trạng thái xuất bản</FormLabel>
                          <FormDescription>
                            Bật để công khai tin tức cho mọi người xem
                          </FormDescription>
                        </div>
                        <FormControl>
                          <div className="flex items-center gap-3 pt-2">
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                            <span className="text-sm font-medium">
                              {field.value ? "Công khai" : "Nháp"}
                            </span>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Description Textarea */}
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Mô tả ngắn <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Nhập mô tả ngắn gọn về nội dung tin tức..."
                          className="min-h-[100px] resize-y"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Mô tả này sẽ hiển thị trong kết quả tìm kiếm và chia sẻ
                        mạng xã hội
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Editor Section */}
            <Card>
              <CardHeader>
                <CardTitle>Nội dung chi tiết</CardTitle>
                <CardDescription>
                  Viết nội dung chi tiết cho tin tức của bạn
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SimpleEditor 
                  key={editorContent} 
                  initialContent={editorContent}
                  onChange={(html) => {
                    setEditorContent(html);
                    form.setValue("content", html);
                  }}
                />
              </CardContent>
            </Card>

            {/* Submit Buttons */}
            <div className="flex items-center justify-end gap-4 pb-8">
              <Button 
                type="button" 
                variant="outline"
                onClick={() => navigate("/admin/news")}
              >
                Hủy
              </Button>
              <Button type="submit" variant="default">
                {isEditMode ? "Cập nhật tin tức" : "Tạo tin tức"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
