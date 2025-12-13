// src/routes/ProtectedRoute.tsx
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

type Props = {
  children: React.ReactNode;
  allowedRoles?: number[]; // ej: [2] admin
  redirectTo?: string;     // ej: "/inicio"
};

export default function ProtectedRoute({
  children,
  allowedRoles,
  redirectTo = "/inicio",
}: Props) {
  const navigate = useNavigate();
  const location = useLocation();
  const [canRender, setCanRender] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const rawUser = localStorage.getItem("user");

    // 1) No logeado
    if (!token || !rawUser) {
      window.alert("Debes iniciar sesión para acceder a esta página.");
      navigate(redirectTo, { replace: true });
      return;
    }

    // 2) Validar rol (si aplica)
    try {
      const user = JSON.parse(rawUser) as { rolId?: number };

      if (allowedRoles?.length && !allowedRoles.includes(Number(user.rolId))) {
        window.alert("Acceso denegado: debes ser administrador para ver esta página.");
        navigate("/", { replace: true });
        return;
      }

      // OK
      setCanRender(true);
    } catch {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.alert("Tu sesión es inválida. Inicia sesión nuevamente.");
      navigate(redirectTo, { replace: true });
    }
  }, [allowedRoles, navigate, redirectTo, location.pathname]);

  // Mientras decide, no renderiza nada (evita parpadeos)
  if (!canRender) return null;

  return <>{children}</>;
}