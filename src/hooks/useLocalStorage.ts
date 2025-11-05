import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : initial;
  });

  //Guarda cambios sin generar loops infinitos
  useEffect(() => {
    try {
      const current = localStorage.getItem(key);
      const parsed = current ? JSON.parse(current) : null;
      // solo guarda si realmente cambió
      if (JSON.stringify(parsed) !== JSON.stringify(value)) {
        localStorage.setItem(key, JSON.stringify(value));
        // emite evento de sincronización global
        window.dispatchEvent(new CustomEvent("storage-update", { detail: { key } }));
      }
    } catch (error) {
      console.error("Error guardando en localStorage:", error);
    }
  }, [key, value]);

  //Escucha actualizaciones desde otros componentes
  useEffect(() => {
    const onStorageChange = (e: Event) => {
      const custom = e as CustomEvent<{ key: string }>;
      if (custom.detail?.key === key) {
        const raw = localStorage.getItem(key);
        if (raw) {
          const newValue = JSON.parse(raw);
          // solo actualiza si hay diferencia real
          if (JSON.stringify(newValue) !== JSON.stringify(value)) {
            setValue(newValue);
          }
        } else {
          setValue(initial);
        }
      }
    };

    window.addEventListener("storage-update", onStorageChange);
    return () => window.removeEventListener("storage-update", onStorageChange);
  }, [key, initial, value]);

  return { value, setValue };
}
