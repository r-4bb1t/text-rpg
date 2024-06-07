/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly MAIN_VITE_API_HOST: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
