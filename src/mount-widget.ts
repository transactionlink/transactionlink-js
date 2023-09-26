import { MountWidgetOptions, Token } from './types'
import handleIframeMount from './use-iframe'
import decode from 'jwt-decode'

const mountWidget = async (context: Token, options: MountWidgetOptions = {}) => {
    if (options.useIframe) {
        return handleIframeMount(context, options)
    }
    const script = document.createElement('script')
    const widget = document.createElement('transactionlink-widget')

    const decoded: Record<'environment', 'sandbox' | 'staging' | 'production'> = decode(context)

    script.src = `https://widget.${decoded?.environment === 'sandbox' ? 'sandbox.' : ''}transactionlink.io/transactionlink-widget.umd.js?v=${ Date.now().toString(16) }`
    const body = document.body

    if (!body) {
        throw new Error(
            'Expected document.body not to be null. TransactionLink widget requires a <body> element to be present.'
        )
    }

    body.appendChild(widget)
    body.appendChild(script)

    let widgetLoaded = false
    const tries = 0

    window.transactionlink_ready = () => {
        window.transactionlink.setContext(context)

        widgetLoaded = true
    }

    while (!widgetLoaded && tries < 100) {
        await new Promise((resolve) => setTimeout(resolve, 100))
    }

    if (!widgetLoaded) {
        throw new Error('TransactionLink widget failed to load.')
    }

    return window.transactionlink
}

export default mountWidget
