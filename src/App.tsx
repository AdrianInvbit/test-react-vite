import { useEffect, useState } from "react";
import { getDeployMeta } from "./deploy-meta";
import { readSection, SECTIONS, SECTION_LABELS, sectionHash, type Section } from "./navigation";
import { applyTheme, persistTheme, readStoredTheme, type Theme } from "./theme";
import { Counter } from "./sections/Counter";
import { Home } from "./sections/Home";
import { Settings } from "./sections/Settings";

export default function App() {
  const [section, setSection] = useState<Section>(() => readSection());
  const [theme, setTheme] = useState<Theme>(() => readStoredTheme());
  const meta = getDeployMeta();

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  useEffect(() => {
    function handleHashChange() {
      setSection(readSection());
    }

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  function handleThemeChange(nextTheme: Theme) {
    persistTheme(nextTheme);
    setTheme(nextTheme);
  }

  return (
    <div className="app-shell">
      <header className="site-header">
        <p className="eyebrow">Laboratorio de pruebas</p>
        <h1>ClonVercel Test Lab</h1>
        <p className="lede">Panel de control React para validar importación Git y despliegue.</p>
        <nav className="site-nav" aria-label="Secciones del panel">
          {SECTIONS.map((item) => (
            <a
              key={item}
              href={sectionHash(item)}
              aria-current={section === item ? "page" : undefined}
            >
              {SECTION_LABELS[item]}
            </a>
          ))}
        </nav>
      </header>

      <main>
        {section === "inicio" ? <Home meta={meta} /> : null}
        {section === "contador" ? <Counter /> : null}
        {section === "configuracion" ? (
          <Settings theme={theme} onThemeChange={handleThemeChange} />
        ) : null}
      </main>

      <footer className="site-footer">
        <section className="card deploy-card" aria-labelledby="deploy-title">
          <h2 id="deploy-title">Identificación del despliegue</h2>
          <dl className="meta-list">
            <div>
              <dt>Nombre</dt>
              <dd id="deploy-name">{meta.name}</dd>
            </div>
            <div>
              <dt>Versión</dt>
              <dd id="deploy-version">{meta.version}</dd>
            </div>
            <div>
              <dt>Rama Git</dt>
              <dd id="deploy-branch">{meta.branch}</dd>
            </div>
            <div>
              <dt>Commit</dt>
              <dd id="deploy-commit">{meta.commit}</dd>
            </div>
            <div>
              <dt>Fecha de compilación</dt>
              <dd id="deploy-build-date">{meta.buildDate}</dd>
            </div>
          </dl>
        </section>
      </footer>
    </div>
  );
}
