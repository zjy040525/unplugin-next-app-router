import { type Metadata } from 'unplugin-next-app-router/types'

export const Component = () => {
    return <div>Child</div>
}

export const metadata: Metadata = {
    nested: false,
}
