import { useState, useEffect } from "react"
import Alerta from '../components/Alerta'
import { Link, useParams } from 'react-router-dom'
import clienteAxios from '../config/axios'


const NuevoPassword = () => {
    const [password, setPassword] = useState('')
    const [repetirPassword, setRepetirPassword] = useState('')
    const [tokenValido, setTokenValido] = useState(false)
    const [passwordModificado, setPasswordModificado] = useState(false)
    const [alerta, setAlerta] = useState({})

    const params = useParams()
    const { token } = params;

    useEffect(() => {
        const comprobarToken = async () => {
            try {
                await clienteAxios(`/veterinarios/restaurarPass/${token}`)
                setAlerta({
                    msg: 'Coloca tu nueva password',
                    error: false
                })
                setTokenValido(true)
            } catch (error) {
                setAlerta({
                    msg: error.response.data.msg,
                    error: true,
                })
            }
        }
        comprobarToken()
    }, [])

    const handleCambioPass = async e => {
        e.preventDefault();

        if (password.length < 6) {
            setAlerta({
                msg: 'password debe ser mayor a 6 caracteres',
                error: true
            })
            return;
        }
        if (password !== repetirPassword) {
            setAlerta({
                msg: 'La password debe ser identica',
                error: true
            })
            return;
        }
        if ([password, repetirPassword].includes('')) {
            setAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            })
            return;
        }
        try {
            await clienteAxios.post(`/veterinarios/restaurarPass/${token}`, { password })
            setAlerta({
                msg: 'Password cambiada correctamente',
                error: false
            })
            setPasswordModificado(true)
            setTokenValido(false)
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        }
    }

    return (
        <>
            <div className='flex items-center'>
                <h1 className='text-indigo-600 font-black text-4xl'>
                    Reestablece tu password y y no pierda a  <span className='text-black'>tus Pacientes</span>
                </h1>
            </div>
            <div className="[&>*:nth-child]:ml-5 mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
                {alerta.msg && <Alerta alerta={alerta} />}
                {tokenValido && <form onSubmit={handleCambioPass}>

                    <div className="my-5">
                        <label className="uppercase text-gray-600 block text-xl font-bold">Nueva Password</label>
                        <input type="password" placeholder="Nueva password"
                            className="border w-full p-3 my-3 bg-gray-100 rounded-xl"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="my-5">
                        <label className="uppercase text-gray-600 block text-xl font-bold">Repetir Password</label>
                        <input type="password" placeholder="Repite tu password"
                            className="border w-full p-3 my-3 bg-gray-100 rounded-xl"
                            value={repetirPassword}
                            onChange={e => setRepetirPassword(e.target.value)}
                        />
                    </div>

                    <div className='flex justify-center'>
                        <input type="submit"
                            className="bg-indigo-700 hover:bg-indigo-600 w-full py-3 rounded-xl text-white font-bold uppercase mt-10 hover:cursor-pointer md:w-auto px-20 "
                            value="Cambiar Password"
                        />
                    </div>
                </form>}
                {passwordModificado &&
                    <nav className='mt-10 flex justify-center'>
                        <Link
                            className='block text-gray-500 text-center my-5'
                            to="/">Ya tienes una cuenta! Inicia Sesion!</Link>

                    </nav>}
            </div>
        </>
    )
}

export default NuevoPassword