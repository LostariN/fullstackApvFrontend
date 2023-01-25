import { useState } from 'react'
import Formulario from '../components/Formulario'
import ListadoPacientes from '../components/ListadoPacientes'

const AdministrarPacientes = () => {

    const [mostrarFormulario, setMostrarFormulario] = useState(false)

    return (
        <div className='flex flex-col md:flex-row'>
            <button
                type='button'
                className='text-white font-bold uppercase p-3 mx-10 mb-10 rounded-md md:hidden'
                onClick={() => setMostrarFormulario(!mostrarFormulario)}
            >{mostrarFormulario ? 'Ocultar Formulario' : 'Mostrar Formulario'}</button>
            <div className={`${mostrarFormulario ? 'block' : 'hidden'} md:block  md:w-1/2 lg:w-2/5`} >

                <Formulario /></div>
            <div className=' md:w-1/2 lg:w-3/5 h-[400px] md:h-[820px] lg:h-[770px] overflow-scroll'><ListadoPacientes /></div>
        </div>
    )
}

export default AdministrarPacientes