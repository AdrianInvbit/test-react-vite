export const APP_NAME = "test-react-vite";
export const APP_VERSION = "v0.1.0";
export const APP_TECHNOLOGY = "React, TypeScript y Vite";
export const UNAVAILABLE = "No disponible";

export type DeployMeta = {
  name: string;
  version: string;
  technology: string;
  branch: string;
  commit: string;
  buildDate: string;
};

function readEnv(value: string | undefined, fallback: string): string {
  const trimmed = value?.trim();
  return trimmed ? trimmed : fallback;
}

export function getDeployMeta(
  env: ImportMetaEnv = import.meta.env,
): DeployMeta {
  return {
    name: readEnv(env.VITE_APP_NAME, APP_NAME),
    version: readEnv(env.VITE_APP_VERSION, APP_VERSION),
    technology: APP_TECHNOLOGY,
    branch: readEnv(env.VITE_GIT_BRANCH, UNAVAILABLE),
    commit: readEnv(env.VITE_GIT_COMMIT, UNAVAILABLE),
    buildDate: readEnv(env.VITE_BUILD_DATE, UNAVAILABLE),
  };
}
