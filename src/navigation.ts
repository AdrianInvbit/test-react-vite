export const SECTIONS = ["inicio", "contador", "configuracion"] as const;

export type Section = (typeof SECTIONS)[number];

export const SECTION_LABELS: Record<Section, string> = {
  inicio: "Inicio",
  contador: "Contador",
  configuracion: "Configuración",
};

export function readSection(hash = window.location.hash): Section {
  const value = hash.replace(/^#\/?/, "").toLowerCase();

  if (value === "contador" || value === "configuracion") {
    return value;
  }

  return "inicio";
}

export function sectionHash(section: Section): string {
  return `#${section}`;
}
