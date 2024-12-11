import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'
import { browserRouter } from 'virtual:unplugin-next-app-router'
import './index.css'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <RouterProvider router={browserRouter} />
    </StrictMode>,
)
