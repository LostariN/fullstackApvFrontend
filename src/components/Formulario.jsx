import { useEffect } from "react";
import { useState } from "react";

import Alerta from '../components/Alerta'
import usePacientes from "../hooks/usePacientes";


const Formulario = () => {
    const [nombre, setNombre] = useState('');
    const [propietario, setPropietario] = useState('');
    const [email, setEmail] = useState('');
    const [fecha, setFecha] = useState(Date.now());
    const [sintomas, setSintomas] = useState('')
    const [id, setId] = useState('')

    const [alerta, setAlerta] = useState({})

    const { guardarPacientes, paciente } = usePacientes()

    useEffect(() => {
        if (paciente?.nombre) {
            setNombre(paciente.nombre)
            setPropietario(paciente.propietario)
            setEmail(paciente.email)
            setFecha(paciente.fecha)
            setSintomas(paciente.sintomas)
            setId(paciente._id)
        }
    }, [paciente])
    const handleSubmit = (e) => {
        e.preventDefault();
        if ([nombre, propietario, email, fecha, sintomas].includes('')) {
            setAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            })
            // Para subir la pantalla al inicio TOP
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            })
            return;
        }
        setAlerta({})
        guardarPacientes({ nombre, propietario, email, fecha, sintomas, id })
        setAlerta({
            msg: `${nombre} ha sido agregado a su lista de pacientes`,
            error: false
        })
        setNombre('')
        setPropietario('')
        setEmail('')
        setFecha('')
        setSintomas('')


    }
    return (
        <>
            <h2 className='text-center text-3xl font-black'>Administrador de pacientes</h2>
            <p className='text-xl mt-5 mb-10 text-center'>
                Añade a tus  {''}
                <span className='text-indigo-600 font-bold'>Pacientes</span>
            </p>

            {alerta.msg && <Alerta alerta={alerta} />}
            <form className="bg-white py-10 px-5 mb-10 lg:mb-0 shadow-md rounded-md"
                onSubmit={handleSubmit}
            >
                <div className="mb-5">
                    <label htmlFor="nombre" className=" text-gray-800 font-bold uppercase">Nombre Mascota: </label>
                    <input
                        type="text"
                        id="nombre"
                        placeholder="Escribe el nombre de la mascota"
                        className="border-2 w-full mt-2 p-2 rounded-lg placeholder-gray-400"
                        value={nombre}
                        onChange={e => setNombre(e.target.value)}
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="propietario" className=" text-gray-800 font-bold uppercase">Propietario Mascota: </label>
                    <input
                        type="text"
                        id="propietario"
                        placeholder="dueño de la mascota"
                        className="border-2 w-full mt-2 p-2 rounded-lg placeholder-gray-400"
                        value={propietario}
                        onChange={e => setPropietario(e.target.value)}
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="email" className=" text-gray-800 font-bold uppercase">Email: </label>
                    <input
                        type="email"
                        id="email"
                        placeholder="email"
                        className="border-2 w-full mt-2 p-2 rounded-lg placeholder-gray-400"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="fecha" className=" text-gray-800 font-bold uppercase">Fecha de Alta: </label>
                    <input
                        type="date"
                        id="fecha"
                        value={fecha}
                        onChange={e => setFecha(e.target.value)}
                        className="border-2 w-full mt-2 p-2 rounded-lg placeholder-gray-400"
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="sintomas" className=" text-gray-800 font-bold uppercase">Sintomas: </label>
                    <textarea

                        id="sintomas"
                        placeholder="Sintomas de la mascota"
                        className="border-2 w-full mt-2 p-2 rounded-lg placeholder-gray-400"
                        value={sintomas}
                        onChange={e => setSintomas(e.target.value)}
                    />
                </div>
                <input
                    type="submit"
                    value={id ? 'Guardar Cambios' : 'Agregar Paciente'}
                    className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-800 transition-colors cursor-pointer"
                />
            </form>
        </>
    )
}

export default Formulario