import type { Theme } from "../theme";

type SettingsProps = {
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
};

export function Settings({ theme, onThemeChange }: SettingsProps) {
  return (
    <section className="card" aria-labelledby="settings-title">
      <h2 id="settings-title">Configuración</h2>
      <p className="lede">
        El tema elegido se guarda en <code>localStorage</code> y se restaura al volver a abrir la
        aplicación.
      </p>
      <fieldset className="theme-fieldset">
        <legend>Tema</legend>
        <label className="theme-option">
          <input
            type="radio"
            name="theme"
            value="light"
            checked={theme === "light"}
            onChange={() => onThemeChange("light")}
          />
          Claro
        </label>
        <label className="theme-option">
          <input
            type="radio"
            name="theme"
            value="dark"
            checked={theme === "dark"}
            onChange={() => onThemeChange("dark")}
          />
          Oscuro
        </label>
      </fieldset>
      <p className="theme-status" id="theme-status">
        Preferencia actual: {theme === "dark" ? "oscuro" : "claro"}
      </p>
    </section>
  );
}
