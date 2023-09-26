interface WidgetApi {
    open: () => void
    setContext: (p: string) => void;
    setLanguage: (p: string) => void;
    setMode: (p: string) => void;
    transactionlink_ready: () => void;
}
interface Window {
    transactionlink_ready: () => void;
    transactionlink: WidgetApi;
}

type MountWidgetOptions = {
    useIframe?: boolean;
    mode?: string;
    language?: string;
}

declare module 'transactionlink-widget' {
    function mountWidget (ctx: string, opts: MountWidgetOptions): Promise<WidgetApi>;
    export default mountWidget
}