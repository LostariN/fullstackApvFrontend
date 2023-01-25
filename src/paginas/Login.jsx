import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Alerta from '../components/Alerta'
import clienteAxios from '../config/axios'
import useAuth from '../hooks/useAuth'

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [alerta, setAlerta] = useState({})
    const { setAuth } = useAuth();
    const navigate = useNavigate()


    const handleLogin = async e => {
        e.preventDefault();

        if ([email, password].includes('')) {
            setAlerta({
                msg: "Error: Los campos son obligatorios",
                error: true
            })
            return;
        }

        try {
            const { data } = await clienteAxios.post('/veterinarios/login', { email, password })
            setAlerta({
                msg: 'CONECTADO',
                error: false
            })
            localStorage.setItem('token', data.token)
            setAuth(data)
            navigate('/admin')
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        }
    }

    return (
        <>
            <div className=" flex items-center">
                <h1 className="text-indigo-600 text-4xl" >Inicia Sesión y Administra tus <span className="font-black">Pacientes</span> </h1>
            </div>

            <div className="[&>*:nth-child]:ml-5 mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
                {alerta.msg && <Alerta alerta={alerta} />}
                <form onSubmit={handleLogin}>
                    <div className="my-5">
                        <label className="uppercase text-gray-600 block text-xl font-bold">Email</label>
                        <input type="email" placeholder="Email de registro"
                            className="border w-full p-3 my-3 bg-gray-100 rounded-xl"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="my-5">
                        <label className="uppercase text-gray-600 block text-xl font-bold">Password</label>
                        <input type="password" placeholder="tu password"
                            className="border w-full p-3 my-3 bg-gray-100 rounded-xl"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>

                    <div className='flex justify-center'>
                        <input type="submit"
                            className="bg-indigo-700 hover:bg-indigo-600 w-full py-3 rounded-xl text-white font-bold uppercase mt-10 hover:cursor-pointer md:w-auto px-10 "
                            value="Iniciar Sesión"
                        />
                    </div>
                </form>
                <nav className='mt-10 lg:flex lg:justify-between'>
                    <Link
                        className='block text-gray-500 text-center my-5'
                        to="/registrar">¿No tienes una cuenta?! Registrate!</Link>
                    <Link
                        className='block text-gray-500 text-center my-5'
                        to="/olvide-cuenta">Recupera tu cuenta!!</Link>
                </nav>
            </div>
        </>
    )
}

export default Login