interface WidgetApi {
    open: () => void
    setContext: (p: string) => void;
    transactionlink_ready: () => void;
}
interface Window {
    transactionlink_ready: () => void;
    transactionlink: WidgetApi;
}

type MountWidgetOptions = {
    useIframe?: boolean,
    inline?: boolean
}

declare module 'transactionlink-widget' {
    function mountWidget (ctx: string, opts: MountWidgetOptions): Promise<WidgetApi>;
    export default mountWidget
}
