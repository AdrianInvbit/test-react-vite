import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import App from "../src/App";
import { THEME_STORAGE_KEY } from "../src/theme";

function renderApp() {
  return render(<App />);
}

beforeEach(() => {
  window.location.hash = "";
  localStorage.clear();
  document.documentElement.removeAttribute("data-theme");
});

describe("panel de control", () => {
  it("renderiza la sección de inicio con datos de la aplicación", () => {
    renderApp();

    expect(screen.getByRole("heading", { name: "Inicio" })).toBeInTheDocument();
    expect(screen.getAllByText("test-react-vite").length).toBeGreaterThan(0);
    expect(screen.getAllByText("v0.1.0").length).toBeGreaterThan(0);
    expect(screen.getByText("React, TypeScript y Vite")).toBeInTheDocument();
    expect(screen.getByText("JavaScript inicializado correctamente")).toBeInTheDocument();
  });

  it("muestra los metadatos de despliegue y no inventa identificadores Git", () => {
    renderApp();

    expect(screen.getByRole("heading", { name: "Identificación del despliegue" })).toBeInTheDocument();
    expect(document.getElementById("deploy-name")).toHaveTextContent("test-react-vite");
    expect(document.getElementById("deploy-version")).toHaveTextContent("v0.1.0");
    expect(document.getElementById("deploy-branch")).toHaveTextContent("No disponible");
    expect(document.getElementById("deploy-commit")).toHaveTextContent("No disponible");
    expect(document.getElementById("deploy-build-date")).toHaveTextContent("No disponible");
  });

  it("navega entre las tres secciones sin recargar", async () => {
    const user = userEvent.setup();
    renderApp();

    await user.click(screen.getByRole("link", { name: "Contador" }));
    expect(screen.getByRole("heading", { name: "Contador" })).toBeInTheDocument();
    expect(window.location.hash).toBe("#contador");

    await user.click(screen.getByRole("link", { name: "Configuración" }));
    expect(screen.getByRole("heading", { name: "Configuración" })).toBeInTheDocument();
    expect(window.location.hash).toBe("#configuracion");

    await user.click(screen.getByRole("link", { name: "Inicio" }));
    expect(screen.getByRole("heading", { name: "Inicio" })).toBeInTheDocument();
    expect(window.location.hash).toBe("#inicio");
  });

  it("incrementa, decrementa y reinicia el contador", async () => {
    const user = userEvent.setup();
    renderApp();

    await user.click(screen.getByRole("link", { name: "Contador" }));

    const value = screen.getByText("0", { selector: "#counter-value" });
    expect(value).toHaveTextContent("0");

    await user.click(screen.getByRole("button", { name: "Incrementar" }));
    await user.click(screen.getByRole("button", { name: "Incrementar" }));
    expect(value).toHaveTextContent("2");

    await user.click(screen.getByRole("button", { name: "Decrementar" }));
    expect(value).toHaveTextContent("1");

    await user.click(screen.getByRole("button", { name: "Reiniciar" }));
    expect(value).toHaveTextContent("0");
  });

  it("persiste el tema seleccionado en localStorage", async () => {
    const user = userEvent.setup();
    const { unmount } = renderApp();

    await user.click(screen.getByRole("link", { name: "Configuración" }));
    await user.click(screen.getByLabelText("Oscuro"));

    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe("dark");
    expect(document.documentElement.dataset.theme).toBe("dark");
    expect(screen.getByText("Preferencia actual: oscuro")).toBeInTheDocument();

    unmount();
    window.location.hash = "#configuracion";
    renderApp();

    expect(document.documentElement.dataset.theme).toBe("dark");
    expect(screen.getByLabelText("Oscuro")).toBeChecked();
  });
});
