# ClonVercel Test Lab — `test-react-vite`

Aplicación React de prueba, versión **v0.1.0**, para validar la detección de frameworks, la instalación de dependencias, la compilación, la publicación de archivos estáticos y la actualización mediante Git en ClonVercel.

## Objetivo

Disponer de un panel de control sencillo, predecible y compilable que se pueda importar en ClonVercel como proyecto React + Vite, sin backend, sin base de datos y sin servicios externos.

## Tecnologías

- React 19
- TypeScript
- Vite
- CSS nativo
- Node.js 20 o superior
- Vitest y Testing Library para las pruebas locales

## Funcionalidades

El panel tiene tres secciones con navegación por hash, sin recargar la página:

1. **Inicio:** nombre, versión, tecnología y estado de JavaScript.
2. **Contador:** incrementar, decrementar y reiniciar un valor con `useState`.
3. **Configuración:** tema claro u oscuro persistido en `localStorage`.

La identificación del despliegue aparece en todas las vistas:

- Nombre `test-react-vite`
- Versión `v0.1.0`
- Rama Git
- Identificador del commit
- Fecha de compilación

Esos tres últimos datos salen de variables `VITE_*`. Si no están definidas, la interfaz muestra **No disponible**. El código no inventa identificadores de Git.

## Estructura

```text
test-react-vite/
├── public/
│   └── favicon.svg
├── src/
│   ├── sections/
│   ├── App.tsx
│   ├── deploy-meta.ts
│   ├── index.css
│   ├── main.tsx
│   ├── navigation.ts
│   ├── theme.ts
│   └── vite-env.d.ts
├── tests/
│   ├── app.test.tsx
│   ├── project.test.ts
│   └── setup.ts
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── README.md
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
└── vite.config.ts
```

## Variables de entorno

Copiar `.env.example` a `.env.local` si se quiere probar la inyección local. Durante el despliegue, ClonVercel puede definir:

```bash
VITE_APP_NAME=test-react-vite
VITE_APP_VERSION=v0.1.0
VITE_GIT_BRANCH=
VITE_GIT_COMMIT=
VITE_BUILD_DATE=
```

Solo se usan variables con prefijo `VITE_`, para que Vite las incorpore en tiempo de compilación.

## Ejecución local

```bash
npm ci
npm run dev
```

La URL habitual es `http://localhost:5173`.

Vista previa de la carpeta de producción:

```bash
npm run build
npm run preview
```

## Pruebas

```bash
npm run build
npm test
```

Las pruebas comprueban:

- el renderizado de las tres secciones
- el funcionamiento del contador
- la navegación sin recarga
- la persistencia del tema
- la visualización de metadatos del despliegue
- que la salida de producción en `dist/` usa rutas relativas

## Despliegue estático

1. Instalar dependencias con `npm ci`.
2. Compilar con `npm run build`.
3. Publicar el contenido de `dist/`.
4. El directorio de salida es `dist` y el archivo de entrada es `index.html`.
5. `vite.config.ts` define `base: "./"` para que los recursos funcionen en la raíz o bajo un subdirectorio.

## Matriz de pruebas previstas para ClonVercel

| Caso | Resultado esperado |
| --- | --- |
| Importación Git del repositorio | El proyecto se reconoce como aplicación React/Vite `test-react-vite`. |
| Instalación de dependencias | `npm ci` instala a partir de `package-lock.json`. |
| Compilación | `npm run build` genera `dist/`. |
| Publicación de estáticos | Se sirve `dist/index.html` con sus recursos relativos. |
| Navegación | Inicio, Contador y Configuración cambian sin recargar. |
| Contador en producción | Incrementar, decrementar y reiniciar actualizan el valor. |
| Tema | La preferencia claro/oscuro se conserva en `localStorage`. |
| Metadatos sin inyección | Rama, commit y fecha aparecen como `No disponible`. |
| Metadatos con `VITE_*` | Se muestran la rama, el commit y la fecha reales inyectados al compilar. |
| Despliegue bajo subdirectorio | Los recursos de `dist/` siguen cargando por las rutas relativas. |

## Limitaciones conocidas

- No hay backend, autenticación ni persistencia de servidor.
- El contador se reinicia al recargar.
- Rama, commit y fecha de compilación permanecen en `No disponible` hasta que el proceso de despliegue inyecte las variables `VITE_*`.

## Versión

- Aplicación: `v0.1.0`
- Commit: `No disponible`
