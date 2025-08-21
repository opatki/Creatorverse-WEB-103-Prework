import { Outlet, Link } from 'react-router-dom'
import Header from './Header'

export default function Layout() {
    return (
        <>
            <Header />
            <Outlet />
        </>
    )
}