export type MountWidgetOptions = {
    useIframe?: boolean,
    inline?: boolean
}

export type IframeMountOptions = Omit<MountWidgetOptions, 'useIframe'>

export type Token = string
