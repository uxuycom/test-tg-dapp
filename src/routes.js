import { createBrowserRouter } from 'react-router-dom'
import Layout from './components/Layout'

// import Demo from './page/Demo'
import Home from './page/Home'
import { ErrorLayout } from './page/ErrorLayout'

export const router = createBrowserRouter([
    {
        path: '/',
        Component: Layout,
        children: [
            { path: '/', Component: Home },
            // { path: '/demo', Component: Demo },
            { path: '*', Component: ErrorLayout },
        ]
    }

])



