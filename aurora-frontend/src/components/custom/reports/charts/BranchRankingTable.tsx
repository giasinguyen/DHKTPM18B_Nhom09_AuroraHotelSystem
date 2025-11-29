import { TrendingUp, TrendingDown, Star, MapPin } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface BranchData {
  branchName: string;
  branchCode: string;
  city: string;
  totalRevenue: number;
  totalBookings: number;
  occupancyRate: number;
  averageRating: number;
}

interface BranchRankingTableProps {
  data: BranchData[];
  totalRevenue: number;
}

const formatCurrency = (value: number) => {
  if (value >= 1000000000) return `${(value / 1000000000).toFixed(1)} tỷ`;
  if (value >= 1000000) return `${(value / 1000000).toFixed(1)} triệu`;
  if (value >= 1000) return `${(value / 1000).toFixed(1)}k`;
  return value.toLocaleString('vi-VN');
};

export function BranchRankingTable({ data, totalRevenue }: BranchRankingTableProps) {
  const sortedBranches = [...data].sort((a, b) => b.totalRevenue - a.totalRevenue);

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">#</TableHead>
            <TableHead>Chi nhánh</TableHead>
            <TableHead className="text-right">Doanh thu</TableHead>
            <TableHead className="text-right">Đặt phòng</TableHead>
            <TableHead className="text-right">Công suất</TableHead>
            <TableHead className="text-right">Đánh giá</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedBranches.map((branch, index) => {
            const revenueShare = totalRevenue > 0 ? (branch.totalRevenue / totalRevenue) * 100 : 0;
            const prevBranch = sortedBranches[index - 1];
            const isUp = prevBranch && branch.totalRevenue > prevBranch.totalRevenue;

            return (
              <TableRow key={branch.branchCode}>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${
                      index === 0 ? 'bg-amber-100 text-amber-700' :
                      index === 1 ? 'bg-gray-100 text-gray-700' :
                      index === 2 ? 'bg-orange-100 text-orange-700' : 'bg-gray-50 text-gray-500'
                    }`}>
                      {index + 1}
                    </span>
                    {index > 0 && (isUp ? 
                      <TrendingUp className="h-3 w-3 text-green-500" /> : 
                      <TrendingDown className="h-3 w-3 text-red-500" />
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium">{branch.branchName}</p>
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      <MapPin className="h-3 w-3" /> {branch.city}
                    </p>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div>
                    <p className="font-medium">{formatCurrency(branch.totalRevenue)}đ</p>
                    <div className="flex items-center justify-end gap-2 mt-1">
                      <Progress value={revenueShare} className="w-12 h-1" />
                      <span className="text-xs text-gray-500">{revenueShare.toFixed(1)}%</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Badge variant="outline">{branch.totalBookings}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Badge variant={branch.occupancyRate >= 80 ? 'default' : branch.occupancyRate >= 50 ? 'secondary' : 'destructive'}>
                    {branch.occupancyRate.toFixed(1)}%
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                    <span className="font-medium">{branch.averageRating.toFixed(1)}</span>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
