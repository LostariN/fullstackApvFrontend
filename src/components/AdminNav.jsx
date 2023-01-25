import { Link } from 'react-router-dom'



const AdminNav = () => {
    return (
        <nav className='flex gap-4'>
            <Link
                to="/admin/perfil"
                className='font-bold uppercase text-gray-500'
            >Perfil</Link>
            <Link
                to="/admin/cambiar-password"
                className='font-bold uppercase text-gray-500'
            >cambiar password</Link>
        </nav>
    )
}

export default AdminNav