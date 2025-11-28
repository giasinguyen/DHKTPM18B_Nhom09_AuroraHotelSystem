import { useEffect, useState } from 'react';
import { Building2 } from 'lucide-react';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { branchApi } from '@/services/branchApi';
import type { Branch } from '@/types/branch.types';

interface BranchSelectorProps {
  value: string | null;
  onChange: (branchId: string | null) => void;
  showAllOption?: boolean;
  allOptionLabel?: string;
  disabled?: boolean;
  className?: string;
}

export function BranchSelector({
  value,
  onChange,
  showAllOption = true,
  allOptionLabel = 'Tất cả chi nhánh',
  disabled = false,
  className,
}: BranchSelectorProps) {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        setLoading(true);
        const response = await branchApi.getAll({ page: 0, size: 100 });
        setBranches(response.result?.content || []);
      } catch (error) {
        console.error('Failed to fetch branches:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBranches();
  }, []);

  return (
    <div className={className}>
      <Label htmlFor="branchSelect" className="text-xs text-gray-500 mb-1 flex items-center gap-1">
        <Building2 className="h-3 w-3" />
        Chi nhánh
      </Label>
      <Select
        value={value || 'all'}
        onValueChange={(v) => onChange(v === 'all' ? null : v)}
        disabled={disabled || loading}
      >
        <SelectTrigger id="branchSelect" className="h-9 min-w-[200px]">
          <SelectValue placeholder={loading ? 'Đang tải...' : 'Chọn chi nhánh'} />
        </SelectTrigger>
        <SelectContent>
          {showAllOption && (
            <SelectItem value="all">
              <span className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-gray-400" />
                {allOptionLabel}
              </span>
            </SelectItem>
          )}
          {branches.map((branch) => (
            <SelectItem key={branch.id} value={branch.id}>
              <span className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-amber-500" />
                {branch.name}
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export default BranchSelector;
