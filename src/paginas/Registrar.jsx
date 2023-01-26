import { useState } from 'react'
import { Link } from 'react-router-dom'
import Alerta from '../components/Alerta';
import clienteAxios from '../config/axios';


const Registrar = () => {

    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repetirPassword, setRepetirPassword] = useState('')
    const [alerta, setAlerta] = useState({})

    async function handleRegistro(e) {
        e.preventDefault();

        if ([nombre, email, password, repetirPassword].includes('')) {
            setAlerta({ msg: 'Hay campos vacios', error: true });
            return;
        }
        if (password !== repetirPassword) {

            setAlerta({ msg: 'La password no coincide', error: true });
            return
        }
        if (password.length < 6) {

            setAlerta({ msg: 'Password debe tener arriba de 6 caracteres', error: true });
            return;
        }
        setAlerta({})


        try {
            const { data } = await clienteAxios.post("/veterinarios", { nombre, email, password })
            setAlerta({
                msg: "Creado Correctamente, revisa tu email",
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
                    Crea tu Cuenta y Admministra <span className='text-black'>tus Pacientes</span>
                </h1>
            </div>
            <div className="[&>*:nth-child]:ml-5 mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
                <form onSubmit={handleRegistro}>
                    <div className="my-5">
                        <label className="uppercase text-gray-600 block text-xl font-bold">Nombre</label>
                        <input type="text" placeholder="tu nombre"
                            className="border w-full p-3 my-3 bg-gray-100 rounded-xl"
                            value={nombre}
                            onChange={e => setNombre(e.target.value)}
                        />
                    </div>
                    <div className="my-5">
                        <label className="uppercase text-gray-600 block text-xl font-bold">Email</label>
                        <input type="email" placeholder="tu email"
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
                    <div className="my-5">
                        <label className="uppercase text-gray-600 block text-xl font-bold">Repetir Password</label>
                        <input type="password" placeholder="Repite tu password"
                            className="border w-full p-3 my-3 bg-gray-100 rounded-xl"
                            value={repetirPassword}
                            onChange={e => setRepetirPassword(e.target.value)}
                        />
                    </div>

                    {alerta.msg && <Alerta alerta={alerta} />}
                    <div className='flex justify-center'>
                        <input type="submit"
                            className="bg-indigo-700 hover:bg-indigo-600 w-full py-3 rounded-xl text-white font-bold uppercase mt-10 hover:cursor-pointer md:w-auto px-20 "
                            value="Registrar"
                        />
                    </div>
                </form>
                <nav className='mt-10 lg:flex lg:justify-between'>
                    <Link
                        className='block text-gray-500 text-center my-5'
                        to="/">¿Ya tienes una cuenta?! Inicia Sesion!</Link>
                    <Link
                        className='block text-gray-500 text-center my-5'
                        to="/olvide-cuenta">Recupera tu cuenta!!</Link>
                </nav>
            </div>
        </>
    )
}

export default Registrar