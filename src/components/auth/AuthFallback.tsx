import { AuthLayout } from "./AuthLayout";

export function AuthFallback() {
  return (
    <AuthLayout>
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-primary border-t-transparent" />
    </AuthLayout>
  );
}
