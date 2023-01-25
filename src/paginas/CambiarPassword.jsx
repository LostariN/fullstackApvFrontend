import { useState } from 'react'
import AdminNav from '../components/AdminNav'
import Alerta from '../components/Alerta'
import useAuth from '../hooks/useAuth'

const CambiarPassword = () => {

    const [alerta, setAlerta] = useState({})
    const [passwords, setPasswords] = useState({
        oldPass: "",
        newPass: "",
    })
    const { guardarPass } = useAuth()
    const handleSubmit = async e => {
        e.preventDefault();

        if (Object.values(passwords).some(campo => campo === "")) {
            setAlerta({
                msg: "Todos los campos son obligatorios",
                error: true
            })
            setTimeout(() => {
                setAlerta({})
            }, 2000);
            return;
        }

        if (passwords.newPass.length < 6) {
            setAlerta({
                msg: "Minimo 6 caracteres",
                error: true
            })
            setTimeout(() => {
                setAlerta({})
            }, 2000);
            return;
        }
        const respuesta = await guardarPass(passwords)
        setAlerta(respuesta)
        setTimeout(() => {
            setAlerta({})
        }, 2000);

    }
    return (
        <div>
            <AdminNav />
            <h2 className='text-3xl font-black text-center mt-10'>Cambiar Password</h2>
            <p className='text-xl mt-5 mb-10 text-center'>Modifica tu {''} <span className='text-indigo-600 font-bold'>password aqui</span></p>
            <div className='flex justify-center'>
                <div className='w-full md:w-1/3 bg-white shadow rounded-lg p-5'>

                    {alerta.msg && <Alerta alerta={alerta} />}
                    <form className='' onSubmit={handleSubmit}>
                        <div className='my-3'>
                            <label htmlFor="" className='uppercase font-bold text-gray-600'>Antigua Password</label>
                            <input type="password"
                                className='border bg-gray-50 w-full mt-5 rounded-lg py-2'
                                name='oldPass'
                                onChange={e => setPasswords({
                                    ...passwords,
                                    [e.target.name]: e.target.value
                                })}
                            />
                        </div>
                        <div className='my-3'>
                            <label htmlFor="" className='uppercase font-bold  text-gray-600'>Nueva Password</label>
                            <input type="password"
                                className='border bg-gray-50 w-full mt-5 py-2 rounded-lg'
                                name='newPass'
                                onChange={e => setPasswords({
                                    ...passwords,
                                    [e.target.name]: e.target.value
                                })}
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
        </div>
    )
}

export default CambiarPassword