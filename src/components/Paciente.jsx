import usePaciente from '../hooks/usePacientes'

const Paciente = ({ paciente }) => {

    const { nombre, propietario, email, fecha, sintomas, _id } = paciente
    const { editarPaciente, eliminarPaciente } = usePaciente();

    const formatearFecha = (fecha) => {
        const nuevaFecha = new Date(fecha)
        return new Intl.DateTimeFormat('es-CL', { dateStyle: "long" }).format(nuevaFecha)
    }
    return (
        <div className='mx-5 my-10 bg-white shadow-md px-5 py-10 rounded-xl'>
            <p className='font-bold uppercase text-indigo-600 my-2 '>
                Nombre:{' '}
                <span className='font-normal normal-case text-black'>{nombre}</span>
            </p>
            <p className='font-bold uppercase text-indigo-600 my-2'>
                Propietario:{' '}
                <span className='font-normal normal-case text-black'>{propietario}</span>
            </p>
            <p className='font-bold uppercase text-indigo-600 my-2'>
                email:{' '}
                <span className='font-normal normal-case text-black'>{email}</span>
            </p>
            <p className='font-bold uppercase text-indigo-600 my-2'>
                fecha:{' '}
                <span className='font-normal normal-case text-black'>{formatearFecha(fecha)}</span>
            </p>
            <p className='font-bold uppercase text-indigo-600 my-2'>
                sintomas:{' '}
                <span className='font-normal normal-case text-black'>{sintomas}</span>
            </p>
            <div className='flex justify-between items-center mt-5'>
                <button className='px-10 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold uppercase rounded-lg'
                    onClick={() => editarPaciente(paciente)}
                >
                    Editar
                </button>
                <button className='px-10 py-2 bg-red-600 hover:bg-red-700 text-white font-bold uppercase rounded-lg'
                    onClick={() => eliminarPaciente(paciente._id)}
                >
                    Eliminar
                </button>
            </div>
        </div>
    )
}

export default Paciente