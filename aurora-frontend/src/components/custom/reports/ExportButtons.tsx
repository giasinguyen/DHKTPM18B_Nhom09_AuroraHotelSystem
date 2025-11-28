import { useState } from 'react';
import { Download, FileSpreadsheet, FileText, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';

interface ExportButtonsProps {
  onExportPDF?: () => Promise<void>;
  onExportExcel?: () => Promise<void>;
  onExportCSV?: () => Promise<void>;
  disabled?: boolean;
  loading?: boolean;
}

export function ExportButtons({
  onExportPDF,
  onExportExcel,
  onExportCSV,
  disabled = false,
  loading = false,
}: ExportButtonsProps) {
  const [exporting, setExporting] = useState<string | null>(null);

  const handleExport = async (type: string, handler?: () => Promise<void>) => {
    if (!handler) {
      toast.info('Chức năng xuất file đang được phát triển');
      return;
    }

    try {
      setExporting(type);
      await handler();
      toast.success(`Xuất file ${type.toUpperCase()} thành công!`);
    } catch (error) {
      console.error(`Export ${type} failed:`, error);
      toast.error(`Xuất file ${type.toUpperCase()} thất bại`);
    } finally {
      setExporting(null);
    }
  };

  const isExporting = exporting !== null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          disabled={disabled || loading || isExporting}
          className="gap-2"
        >
          {isExporting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Download className="h-4 w-4" />
          )}
          <span className="hidden sm:inline">
            {isExporting ? `Đang xuất ${exporting}...` : 'Xuất báo cáo'}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem
          onClick={() => handleExport('PDF', onExportPDF)}
          disabled={isExporting}
          className="cursor-pointer"
        >
          <FileText className="h-4 w-4 mr-2 text-red-500" />
          <span>Xuất PDF</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => handleExport('Excel', onExportExcel)}
          disabled={isExporting}
          className="cursor-pointer"
        >
          <FileSpreadsheet className="h-4 w-4 mr-2 text-green-600" />
          <span>Xuất Excel</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleExport('CSV', onExportCSV)}
          disabled={isExporting}
          className="cursor-pointer"
        >
          <FileSpreadsheet className="h-4 w-4 mr-2 text-blue-600" />
          <span>Xuất CSV</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ExportButtons;
