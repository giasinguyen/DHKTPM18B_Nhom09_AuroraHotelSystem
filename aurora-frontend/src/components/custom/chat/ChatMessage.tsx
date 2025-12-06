import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2, RotateCw } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export interface ChatMessageProps {
  isLoading: boolean;
  message: {
    id: string;
    role: string;
    content: string;
    error?: boolean;
    retryData?: {
      message: string;
      chatId: string;
    };
  };
  onRetry?: (message: string, messageId: string) => void;
}

export default function ChatMessage({ isLoading, message, onRetry }: ChatMessageProps) {
  const handleRetry = () => {
    if (message.retryData && onRetry) {
      onRetry(message.retryData.message, message.id);
    }
  };

  return (
    <div
      key={message.id}
      className={cn(
        "flex w-full",
        message.role === "user" ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "flex gap-2 max-w-[85%]",
          message.role === "user" ? "flex-row-reverse" : "flex-row"
        )}
      >
        {(message?.role === "ai") && (
          <Avatar className="h-8 w-8 mt-1">
            <AvatarFallback className="bg-primary text-white text-xs">
              AI
            </AvatarFallback>
          </Avatar>
        )}

        <div
          className={cn(
            "rounded-lg px-3 py-2 text-sm shadow-sm",
            message.role === "user"
              ? "bg-primary text-primary-foreground"
              : message.error
              ? "bg-red-50 text-red-900 border border-red-200"
              : "bg-muted text-foreground border border-gray-100"
          )}
        >
          {/* --- Render Markdown --- */}
          {message.role === "ai" ? (
            <div
              className={cn(
                "prose prose-sm dark:prose-invert max-w-none wrap-break-word ",
                " [&>p]:mb-2 [&>p:last-child]:mb-0 [&>pre]:bg-gray-800 [&>pre]:text-white ",
                " [&>pre]:p-2 [&>pre]:rounded-md"
              )}
            >
              {isLoading && !message.error && !message.content ? (
                <div className="flex w-full justify-start">
                  <div className="flex items-center gap-2 bg-muted px-3 py-2 rounded-lg ml-2">
                    <Loader2 className="h-4 w-4 animate-spin text-gray-500" />
                    <span className="text-xs text-gray-500">
                      AI đang soạn tin...
                    </span>
                  </div>
                </div>
              ) : (
                <>
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {message.content}
                  </ReactMarkdown>
                  
                  {/* Show retry button on error */}
                  {message.error && message.retryData && onRetry && (
                    <div className="mt-3 pt-2 border-t border-red-200">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={handleRetry}
                        className="text-red-700 border-red-300 hover:bg-red-100 hover:text-red-800"
                        disabled={isLoading}
                      >
                        <RotateCw className="h-3 w-3 mr-1" />
                        Thử lại
                      </Button>
                    </div>
                  )}
                </>
              )}
            </div>
          ) : (
            <p>{message.content}</p>
          )}
        </div>
      </div>
    </div>
  );
}
