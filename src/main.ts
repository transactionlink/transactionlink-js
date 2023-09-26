import mountWidget from './mount-widget';

const token = import.meta.env.VITE_WIDGET_TOKEN

const openWidget = async () => {
    const widget = await mountWidget(token, { useIframe: true })
    setTimeout(() => {
        widget.open()
    }, 1000);
}

openWidget()

