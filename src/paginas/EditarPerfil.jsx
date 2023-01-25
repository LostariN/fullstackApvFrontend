import { useEffect } from 'react';
import { useState } from 'react';
import AdminNav from '../components/AdminNav'
import useAuth from '../hooks/useAuth'
import Alerta from '../components/Alerta'

const EditarPerfil = () => {
    const { auth, actualizarPerfil } = useAuth()
    const [perfil, setPerfil] = useState({})
    const [alerta, setAlerta] = useState({})

    useEffect(() => {
        setPerfil(auth)
    }, [auth])

    const handleChange = e => {
        const { name, value } = e.target
        setPerfil({
            ...perfil,
            [name]: value
        })
    }
    const handleSubmit = async e => {
        e.preventDefault();
        const { nombre, email } = perfil
        if ([nombre, email].includes('')) {
            setAlerta({
                msg: "Nombre y/o email no pueden ir vacios",
                error: true
            })
            return;
        }
        const resultado = await actualizarPerfil(perfil)
        setAlerta({
            msg: resultado.msg,
            error: resultado.error
        })
        setTimeout(() => {
            setAlerta({})
        }, 2000);
    }
    return (
        <>
            <AdminNav />
            <h2 className='text-3xl font-black text-center mt-10'>Edita tu perfil</h2>
            <p className='text-xl mt-5 mb-10 text-center'>Modifica tu {''} <span className='text-indigo-600 font-bold'>Informacion</span></p>

            <div className='flex justify-center'>
                <div className='w-full md:w-1/3 bg-white shadow rounded-lg p-5'>

                    {alerta.msg && <Alerta alerta={alerta} />}
                    <form className='' onSubmit={handleSubmit}>
                        <div className='my-3'>
                            <label htmlFor="" className='uppercase font-bold text-gray-600'>Nombre</label>
                            <input type="text"
                                className='border bg-gray-50 w-full mt-5 rounded-lg'
                                name='nombre'
                                value={perfil.nombre || ''}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='my-3'>
                            <label htmlFor="" className='uppercase font-bold text-gray-600'>Sitio Web</label>
                            <input type="text"
                                className='border bg-gray-50 w-full mt-5 rounded-lg'
                                name='web'
                                value={perfil.web || ''}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='my-3'>
                            <label htmlFor="" className='uppercase font-bold text-gray-600'>Telefono</label>
                            <input type="text"
                                className='border bg-gray-50 w-full mt-5 rounded-lg'
                                name='telefono'
                                value={perfil.telefono || ''}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='my-3'>
                            <label htmlFor="" className='uppercase font-bold text-gray-600'>Email</label>
                            <input type="text"
                                className='border bg-gray-50 w-full mt-5 rounded-lg'
                                name='email'
                                value={perfil.email || ''}
                                onChange={handleChange}
                            />
                        </div>

                        <input type="submit"
                            value="Guardar Cambios"
                            className='bg-indigo-600 p-3 rounded-lg text-white font-
                            hover:bg-indigo-700 cursor-pointer my-2 w-full'
                        />

                    </form>
                </div>
            </div>
        </>
    )
}

export default EditarPerfil