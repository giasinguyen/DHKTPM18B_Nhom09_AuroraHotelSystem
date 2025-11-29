import { useState, useEffect, useCallback } from 'react';
import type { ReportDateRange, BranchComparisonData, ShiftReportData, ShiftSummary } from '@/types/report.types';
import * as reportApi from '@/services/reportApi';

// =====================
// Date Range Helper Hook
// =====================

const getDefaultDateRange = (): ReportDateRange => {
  const today = new Date();
  const thirtyDaysAgo = new Date(today);
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  
  return {
    dateFrom: thirtyDaysAgo.toISOString().split('T')[0],
    dateTo: today.toISOString().split('T')[0],
  };
};

export function useDateRange(initialRange?: ReportDateRange) {
  const [dateRange, setDateRange] = useState<ReportDateRange>(
    initialRange || getDefaultDateRange()
  );

  const setDateFrom = useCallback((date: string) => {
    setDateRange(prev => ({ ...prev, dateFrom: date }));
  }, []);

  const setDateTo = useCallback((date: string) => {
    setDateRange(prev => ({ ...prev, dateTo: date }));
  }, []);

  const resetToDefault = useCallback(() => {
    setDateRange(getDefaultDateRange());
  }, []);

  return {
    dateRange,
    setDateRange,
    setDateFrom,
    setDateTo,
    resetToDefault,
  };
}

// =====================
// Branch Comparison Hook
// =====================

interface UseBranchComparisonResult {
  branches: BranchComparisonData[];
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function useBranchComparison(dateRange: ReportDateRange): UseBranchComparisonResult {
  const [branches, setBranches] = useState<BranchComparisonData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await reportApi.getBranchComparison(dateRange.dateFrom, dateRange.dateTo);
      setBranches(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch branch comparison'));
    } finally {
      setLoading(false);
    }
  }, [dateRange.dateFrom, dateRange.dateTo]);

  useEffect(() => {
    if (dateRange.dateFrom && dateRange.dateTo) {
      fetchData();
    }
  }, [fetchData, dateRange.dateFrom, dateRange.dateTo]);

  return { branches, loading, error, refetch: fetchData };
}

// =====================
// Shift Report Hook
// =====================

interface UseShiftReportResult {
  shifts: ShiftReportData[];
  summary: ShiftSummary | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function useShiftReport(
  dateRange: ReportDateRange,
  branchId?: string | null,
  staffId?: string | null
): UseShiftReportResult {
  const [shifts, setShifts] = useState<ShiftReportData[]>([]);
  const [summary, setSummary] = useState<ShiftSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [shiftsResult, summaryResult] = await Promise.all([
        reportApi.getShiftReport(dateRange.dateFrom, dateRange.dateTo, branchId, staffId),
        reportApi.getShiftSummary(dateRange.dateFrom, dateRange.dateTo, branchId),
      ]);
      setShifts(shiftsResult);
      setSummary(summaryResult);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch shift report'));
    } finally {
      setLoading(false);
    }
  }, [dateRange.dateFrom, dateRange.dateTo, branchId, staffId]);

  useEffect(() => {
    if (dateRange.dateFrom && dateRange.dateTo) {
      fetchData();
    }
  }, [fetchData, dateRange.dateFrom, dateRange.dateTo]);

  return { shifts, summary, loading, error, refetch: fetchData };
}

// =====================
// Branch Selection Hook
// =====================

export function useBranchSelection(initialBranchId?: string | null) {
  const [branchId, setBranchId] = useState<string | null>(initialBranchId || null);

  const selectBranch = useCallback((id: string | null) => {
    setBranchId(id);
  }, []);

  const clearBranch = useCallback(() => {
    setBranchId(null);
  }, []);

  return {
    branchId,
    setBranchId: selectBranch,
    clearBranch,
  };
}
