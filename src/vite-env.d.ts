/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_WIDGET_TOKEN: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
