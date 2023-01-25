import { Link } from 'react-router-dom'
import clienteAxios from '../config/axios'
import { useState } from 'react'
import Alerta from '../components/Alerta'

const OlvideCuenta = () => {

    const [email, setEmail] = useState('')
    const [alerta, setAlerta] = useState({})

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!email) {
            setAlerta({
                msg: 'Campo requerido, porfavor ingrese un email valido',
                error: true
            })
            return;
        }
        try {
            const { data } = await clienteAxios.post('/veterinarios/restaurarPass', { email })

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
    }


    return (
        <>
            <div className='flex items-center'>
                <h1 className='text-indigo-600 font-black text-4xl'>
                    Recupera tu Acceso y no pierda a Tus <span className='text-black'>tus Pacientes</span>
                </h1>
            </div>
            <div className="[&>*:nth-child]:ml-5 mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
                <form onSubmit={handleSubmit}>

                    <div className="my-5">
                        <label className="uppercase text-gray-600 block text-xl font-bold">Email</label>
                        <input type="email" placeholder="tu email"
                            className="border w-full p-3 my-3 bg-gray-100 rounded-xl"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>

                    {alerta.msg && <Alerta alerta={alerta} />}

                    <input type="submit"
                        className="bg-indigo-700 hover:bg-indigo-600 w-full py-3 rounded-xl text-white font-bold uppercase mt-10 hover:cursor-pointer md:w-auto px-10 "
                        value="Enviar Instrucciones"
                    />
                </form>
                <nav className='mt-10 lg:flex lg:justify-between'>
                    <Link
                        className='block text-gray-500 text-center my-5'
                        to="/">¿Ya tienes una cuenta?! Inicia Sesion!</Link>
                    <Link
                        className='block text-gray-500 text-center my-5'
                        to="/registrar">¿No tienes una cuenta?! Registrate!</Link>
                </nav>
            </div>
        </>
    )
}

export default OlvideCuenta