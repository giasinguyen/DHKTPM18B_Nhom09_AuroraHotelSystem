import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { 
  Eye, 
  MoreHorizontal, 
  Trash2, 
  Edit, 
  User as UserIcon,
  Shield,
  Calendar,
  Mail,
} from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { 
  PageHeader, 
  DataTable, 
  Pagination, 
  SearchFilter, 
  ConfirmDialog,
  type Column 
} from '@/components/custom';

import { getUsersPaginated, deleteUser, searchUsers } from '@/services/userApi';
import type { User } from '@/types/user.types';
import { ROLE_CONFIG } from '@/types/user.types';

export default function UserList() {
  const navigate = useNavigate();
  
  // State
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  
  // Filters
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  
  // Sorting
  const [sortColumn, setSortColumn] = useState('username');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  
  // Dialogs
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  // Fetch users
  const fetchUsers = useCallback(async () => {
    try {
      setIsLoading(true);
      
      let response;
      if (searchKeyword) {
        response = await searchUsers({
          username: searchKeyword,
          page: currentPage,
          size: pageSize,
        });
      } else {
        response = await getUsersPaginated({
          page: currentPage,
          size: pageSize,
          sortBy: sortColumn,
          sortDir: sortDirection,
        });
      }
      
      if (response.result) {
        let filteredUsers = response.result.content;
        
        // Client-side filter by role
        if (selectedRole) {
          filteredUsers = filteredUsers.filter(u => 
            u.roles?.some(r => r.name === selectedRole)
          );
        }
        
        setUsers(filteredUsers);
        setTotalElements(response.result.totalElements);
        setTotalPages(response.result.totalPages);
      }
    } catch (error) {
      console.error('Failed to fetch users:', error);
      toast.error('Không thể tải danh sách người dùng');
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, pageSize, searchKeyword, selectedRole, sortColumn, sortDirection]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Handle delete user
  const handleDeleteUser = async () => {
    if (!selectedUserId) return;
    
    try {
      await deleteUser(selectedUserId);
      toast.success('Xóa người dùng thành công');
      setDeleteDialogOpen(false);
      setSelectedUserId(null);
      fetchUsers();
    } catch (error) {
      console.error('Failed to delete user:', error);
      toast.error('Không thể xóa người dùng');
    }
  };

  // Handle sort
  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  // Handle clear filters
  const handleClearFilters = () => {
    setSearchKeyword('');
    setSelectedRole('');
    setCurrentPage(0);
  };

  // Format date
  const formatDate = (dateString?: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  // Get initials from name
  const getInitials = (firstName?: string, lastName?: string) => {
    const first = firstName?.charAt(0).toUpperCase() || '';
    const last = lastName?.charAt(0).toUpperCase() || '';
    return first + last || 'U';
  };

  // Table columns
  const columns: Column<User>[] = [
    {
      key: 'user',
      header: 'Người dùng',
      cell: (item) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={item.avatarUrl} alt={item.username} />
            <AvatarFallback className="bg-primary/10 text-primary">
              {getInitials(item.firstName, item.lastName)}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{item.firstName} {item.lastName}</div>
            <div className="text-sm text-muted-foreground flex items-center gap-1">
              <UserIcon className="h-3 w-3" />
              {item.username}
            </div>
          </div>
        </div>
      ),
    },
    {
      key: 'email',
      header: 'Email',
      cell: (item) => (
        <div className="flex items-center gap-2 text-sm">
          <Mail className="h-4 w-4 text-muted-foreground" />
          {item.email || '-'}
        </div>
      ),
    },
    {
      key: 'dob',
      header: 'Ngày sinh',
      cell: (item) => (
        <div className="flex items-center gap-2 text-sm">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          {formatDate(item.dob)}
        </div>
      ),
      sortable: true,
    },
    {
      key: 'roles',
      header: 'Vai trò',
      cell: (item) => (
        <div className="flex flex-wrap gap-1">
          {item.roles?.map((role) => {
            const config = ROLE_CONFIG[role.name] || { label: role.name, color: 'text-gray-700', bgColor: 'bg-gray-100' };
            return (
              <Badge 
                key={role.id} 
                variant="outline" 
                className={`${config.bgColor} ${config.color} border-0`}
              >
                <Shield className="h-3 w-3 mr-1" />
                {config.label}
              </Badge>
            );
          }) || '-'}
        </div>
      ),
    },
    {
      key: 'actions',
      header: '',
      cell: (item) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Thao tác</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate(`/admin/users/${item.id}`)}>
              <Eye className="h-4 w-4 mr-2" />
              Xem chi tiết
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate(`/admin/users/${item.id}/edit`)}>
              <Edit className="h-4 w-4 mr-2" />
              Chỉnh sửa
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-destructive"
              onClick={() => {
                setSelectedUserId(item.id);
                setDeleteDialogOpen(true);
              }}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Xóa người dùng
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
      className: 'w-[50px]',
    },
  ];

  // Filter options
  const roleOptions = Object.entries(ROLE_CONFIG).map(([value, config]) => ({
    value,
    label: config.label,
  }));

  return (
    <div className="space-y-6">
      <PageHeader
        title="Quản lý người dùng"
        description="Xem và quản lý tất cả người dùng trong hệ thống"
        onAdd={() => navigate('/admin/users/create')}
        addButtonText="Thêm người dùng"
        onRefresh={fetchUsers}
        isLoading={isLoading}
      />

      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-medium">Bộ lọc</CardTitle>
        </CardHeader>
        <CardContent>
          <SearchFilter
            searchValue={searchKeyword}
            onSearchChange={setSearchKeyword}
            searchPlaceholder="Tìm theo tên đăng nhập..."
            filters={[
              {
                key: 'role',
                label: 'Vai trò',
                value: selectedRole,
                options: roleOptions,
                onChange: (value) => {
                  setSelectedRole(value === 'all' ? '' : value);
                  setCurrentPage(0);
                },
              },
            ]}
            onClear={handleClearFilters}
          />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <DataTable
            columns={columns}
            data={users}
            keyExtractor={(item) => item.id}
            isLoading={isLoading}
            emptyMessage="Không có người dùng nào"
            sortColumn={sortColumn}
            sortDirection={sortDirection}
            onSort={handleSort}
          />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            pageSize={pageSize}
            totalElements={totalElements}
            onPageChange={setCurrentPage}
            onPageSizeChange={(size) => {
              setPageSize(size);
              setCurrentPage(0);
            }}
          />
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="Xác nhận xóa người dùng"
        description="Bạn có chắc chắn muốn xóa người dùng này? Hành động này không thể hoàn tác."
        confirmText="Xóa"
        cancelText="Hủy"
        onConfirm={handleDeleteUser}
        variant="destructive"
      />
    </div>
  );
}