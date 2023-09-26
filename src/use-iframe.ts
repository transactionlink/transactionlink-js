import { IframeMountOptions, Token } from './types';

const WIDGET_URL = import.meta.env.VITE_WIDGET_URL || 'http://localhost:5173';

class WidgetAPI {
    private iframe: HTMLIFrameElement;

    constructor(iframeUrl: string) {
        this.iframe = document.createElement('iframe');
        this.hideIframe()
        this.iframe.src = iframeUrl

        document.body?.append(this.iframe);
    }

    private hideIframe() {
        const iframe = this.iframe
        if (iframe) {
            iframe.style.display = 'none';
            iframe.style.border = '0';
            iframe.style.position = 'fixed';
            iframe.style.top = '0';
            iframe.style.left = '0';
            iframe.style.width = '100vw';
            iframe.style.height = '100vh';
        }
    }

    private postMessage(type: string, data?: unknown) {
        const message = { type, data };
        this.iframe.contentWindow?.postMessage(message, WIDGET_URL);
    }

    public initialize(): void {
        this.postMessage('widget.initialize');
    }

    public reinitialize(): void {
        this.postMessage('widget.reinitialize');
    }

    public open(): void {
        if (!document.body) {
            throw new Error(
                'Expected document.body not to be null. Transactionlink widget requires a <body> element to be present.'
            );
        }

        this.iframe.style.display = 'block';
        this.postMessage('widget.open');
    }

    public close(): void {
        this.postMessage('widget.close');
        this.iframe.style.display = 'none';
    }

    public setContext(jwt: Token): void {
        this.postMessage('widget.setContext', jwt);
    }
}

const handleIframeMount = async (context: Token, options?: IframeMountOptions): Promise<WidgetAPI> => {
    const params: Record<string, string> = { context };

    if (options) {
        Object.entries(options).forEach(([key, value]) => {
            params[key] = `${value}`;
        });
    }

    const api = new WidgetAPI(`${WIDGET_URL}?${new URLSearchParams(params).toString()}`);

    const handleIframeMessage = (message: MessageEvent) => {
        if (message.origin !== WIDGET_URL) return;

        const { type } = message.data;

        if (type === 'widget-wrapper.ready') {
            window?.transactionlink_ready?.();
        }

        if (type === 'widget-wrapper.close') {
            api.close()
        }
    };

    window.addEventListener('message', handleIframeMessage);

    return api;
};

export default handleIframeMount;
