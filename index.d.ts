type MethodTypes = 'widget-opened' | 'widget-closed' | 'error' | 'workflow-finished'

interface WidgetApi {
    open: () => void;
    close: () => void;
    setContext: (p: string) => void;
    transactionlink_ready: () => void;
    on: (event: MethodTypes , cb: () => void) => void;
    off: (event: MethodTypes, cb: () => void) => void;
}
interface Window {
    transactionlink_ready: () => void;
    transactionlink: WidgetApi;
}

type MountWidgetOptions = {
    useIframe?: boolean;
    inline?: boolean;
}

declare module 'transactionlink-js' {
    function mountWidget (ctx: string, opts: MountWidgetOptions): Promise<WidgetApi>;
    export default mountWidget
}
