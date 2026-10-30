import { APP_TECHNOLOGY, type DeployMeta } from "../deploy-meta";

type HomeProps = {
  meta: DeployMeta;
};

export function Home({ meta }: HomeProps) {
  return (
    <section className="card" aria-labelledby="home-title">
      <h2 id="home-title">Inicio</h2>
      <p className="lede">
        Panel de control de prueba para validar detección de frameworks, instalación
        de dependencias, compilación y publicación de archivos estáticos.
      </p>
      <dl className="meta-list">
        <div>
          <dt>Aplicación</dt>
          <dd id="app-name">{meta.name}</dd>
        </div>
        <div>
          <dt>Versión</dt>
          <dd id="app-version">{meta.version}</dd>
        </div>
        <div>
          <dt>Tecnología</dt>
          <dd id="app-tech">{APP_TECHNOLOGY}</dd>
        </div>
        <div>
          <dt>Estado de JavaScript</dt>
          <dd id="js-status" data-state="ready">
            JavaScript inicializado correctamente
          </dd>
        </div>
      </dl>
    </section>
  );
}
