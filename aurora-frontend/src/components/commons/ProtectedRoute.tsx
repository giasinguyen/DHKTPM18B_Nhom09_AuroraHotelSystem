// import { Navigate } from "react-router-dom";
// import { useAppSelector } from "@/features/hooks.ts";
import { useAppSelector } from "@/hooks/useRedux";
import type { ReactNode } from "react";

interface IProtectedRoute {
  requiredPermission: string | string[];
  children: ReactNode;
  to: string;
}

export function ProtectedRoute({
  children,
  requiredPermission,
  to,
}: IProtectedRoute) {
  const { user } = useAppSelector((state) => state.auth);

  const permissions = Array.isArray(requiredPermission)
    ? requiredPermission
    : [requiredPermission];

  // const hasPermission =
  //   !!user &&
  //   !!user.permissions &&
  //   permissions.some((p) => user.permissions.includes(p));

  // if (!hasPermission) {
  //   toast.error("Không có quyền truy cập");
  //   return <Navigate to={to} replace />;
  // }

  return <>{children}</>;
}