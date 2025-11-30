import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useLocalStorage } from "../hooks/useLocalStorage";

// --- helpers ---
function dispatchStorageUpdate(key: string) {
  window.dispatchEvent(new CustomEvent("storage-update", { detail: { key } }));
}

describe("useLocalStorage hook", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  // --------------------------------------------------------
  it("usa el valor inicial si localStorage está vacío", () => {
    const { result } = renderHook(() =>
      useLocalStorage("test-key", "DEFAULT")
    );

    expect(result.current.value).toBe("DEFAULT");
  });

  // --------------------------------------------------------
  it("lee valor desde localStorage si existe", () => {
    localStorage.setItem("test-key", JSON.stringify("EXISTING"));

    const { result } = renderHook(() =>
      useLocalStorage("test-key", "DEFAULT")
    );

    expect(result.current.value).toBe("EXISTING");
  });

  // --------------------------------------------------------
  it("guarda el nuevo valor en localStorage", () => {
    const { result } = renderHook(() =>
      useLocalStorage("test-key", "DEFAULT")
    );

    act(() => {
      result.current.setValue("NEW VALUE");
    });

    // Se ejecuta el effect → guardado
    expect(localStorage.getItem("test-key")).toBe(
      JSON.stringify("NEW VALUE")
    );
  });

  // --------------------------------------------------------
  it("no guarda si el valor no cambió", () => {
    localStorage.setItem("test-key", JSON.stringify("A"));

    const spy = vi.spyOn(localStorage, "setItem");

    const { result } = renderHook(() =>
      useLocalStorage("test-key", "DEFAULT")
    );

    act(() => {
      result.current.setValue("A"); // mismo valor
    });

    // No debe llamar setItem
    expect(spy).not.toHaveBeenCalled();
  });

  // --------------------------------------------------------
  it("emite el evento 'storage-update' al guardar", () => {
    const dispatchSpy = vi.spyOn(window, "dispatchEvent");

    const { result } = renderHook(() =>
      useLocalStorage("test-key", "DEFAULT")
    );

    act(() => {
      result.current.setValue("NEW");
    });

    expect(dispatchSpy).toHaveBeenCalled();
  });

  // --------------------------------------------------------
  it("escucha evento storage-update y actualiza el valor", () => {
    const { result } = renderHook(() =>
      useLocalStorage("test-key", "DEFAULT")
    );

    // Simulamos que localStorage cambió fuera del hook
    localStorage.setItem("test-key", JSON.stringify("SYNCED"));

    // Disparamos evento global
    act(() => {
      dispatchStorageUpdate("test-key");
    });

    expect(result.current.value).toBe("SYNCED");
  });

  // --------------------------------------------------------
  it("restaura el valor inicial si localStorage se elimina", () => {
    localStorage.setItem("test-key", JSON.stringify("SAVED"));

    const { result } = renderHook(() =>
      useLocalStorage("test-key", "DEFAULT")
    );

    // Eliminar desde fuera
    localStorage.removeItem("test-key");

    act(() => {
      dispatchStorageUpdate("test-key");
    });

    expect(result.current.value).toBe("DEFAULT");
  });

  // --------------------------------------------------------
  it("limpia el event listener al desmontar", () => {
    const removeSpy = vi.spyOn(window, "removeEventListener");

    const { unmount } = renderHook(() =>
      useLocalStorage("test-key", "DEFAULT")
    );

    unmount();

    expect(removeSpy).toHaveBeenCalled();
  });
});
