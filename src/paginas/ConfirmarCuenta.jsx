
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Alerta from '../components/Alerta'
import clienteAxios from '../config/axios'

const ConfirmarCuenta = () => {
    const params = useParams()
    const { id } = params
    const [confirmarCuenta, setConfirmarCuenta] = useState(false)
    const [cargando, setCargando] = useState(true)
    const [alerta, setAlerta] = useState({})


    useEffect(() => {
        const confirmarCuenta = async () => {
            try {
                const url = `/veterinarios/confirmar/${id}`
                const { data } = await clienteAxios(url)
                setConfirmarCuenta(true)
                setAlerta({
                    msg: data.msg,
                    error: false
                })
            } catch (error) {
                setAlerta({
                    msg: error.response.data.msg,
                    error: true
                })
            }
            setCargando(false)
        }
        confirmarCuenta()
    }, [])

    return (
        <>
            <div className='flex items-center'>
                <h1 className='text-indigo-600 font-black text-4xl'>
                    Confirma TU Cuenta y administra a  <span className='text-black'>tus Pacientes</span>
                </h1>
            </div>
            <div className="[&>*:nth-child]:ml-5 mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
                {!cargando && <Alerta alerta={alerta} />}
                <nav className='mt-10 lg:flex lg:justify-between'>
                    {confirmarCuenta && <Link
                        className='block text-gray-500 text-center my-5'
                        to="/">Ya tienes una cuenta! Inicia Sesion!</Link>}

                </nav>
            </div>
        </>
    )
}

export default ConfirmarCuenta