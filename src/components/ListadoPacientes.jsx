import usePacientes from '../hooks/usePacientes'
import Paciente from './Paciente';

const ListadoPacientes = () => {

    const { pacientes } = usePacientes();

    return (
        <>
            {pacientes.length ?
                (
                    <>
                        <h2 className='text-center text-3xl font-black'>Listado Pacientes</h2>
                        <p className='text-xl mt-5 mb-10 text-center'>
                            Administra tus {''}
                            <span className='text-indigo-600 font-bold'>Pacientes</span>
                        </p>
                        {pacientes.map(paciente => (
                            <Paciente key={paciente._id}
                                paciente={paciente}
                            />
                        ))}
                    </>
                )
                :
                (
                    <>
                        <h2 className='text-center text-3xl font-black'>No hay pacientes</h2>
                        <p className='text-xl mt-5 mb-10 text-center'>
                            Comienza a agregar {''}
                            <span className='text-indigo-600 font-bold'>Pacientes</span>
                        </p>
                    </>
                )
            }
        </>
    )
}

export default ListadoPacientes