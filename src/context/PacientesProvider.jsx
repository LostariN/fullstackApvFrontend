import { createContext, useEffect, useState } from 'react'
import clienteAxios from '../config/axios'
import useAuth from '../hooks/useAuth'

const PacienteContext = createContext();
const PacientesProvider = ({ children }) => {
    const [pacientes, setPacientes] = useState([])
    const [paciente, setPaciente] = useState({})
    const { auth } = useAuth()
    useEffect(() => {
        const obtenerPacientes = async () => {
            try {
                const token = localStorage.getItem('token')
                if (!token) return;
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
                const { data } = await clienteAxios('/pacientes', config)

                setPacientes([...data])
            } catch (error) {
                console.log(error);
            }
        }
        obtenerPacientes();
    }, [auth])


    const guardarPacientes = async (paciente) => {
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }
        if (paciente.id) {
            try {
                const { data } = await clienteAxios.put(`/pacientes/${paciente.id}`, paciente, config)
                const pacienteActtualizado = pacientes.map(pacienteState => pacienteState._id === data._id ? data : pacienteState)
                setPacientes(pacienteActtualizado)
            } catch (error) {
                console.log(error);
            }
        } else {
            try {
                const { data } = await clienteAxios.post('/pacientes', paciente, config)

                const { createdAt, updatedAt, __v, ...pacienteAlmacenado } = data

                setPacientes([...pacientes, pacienteAlmacenado])
            } catch (error) {
                console.log(error);
            }
        }
    }

    const editarPaciente = (paciente) => {
        setPaciente(paciente)
    }
    const eliminarPaciente = async (id) => {

        const token = localStorage.getItem('token');
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }
        try {
            const { data } = await clienteAxios.delete(`/pacientes/${id}`, config)
            const listaPacientesAct = pacientes.filter(pacienteState => pacienteState._id !== id)
            setPacientes(listaPacientesAct)

        } catch (error) {
            console.log(error);
        }
    }
    return (
        <PacienteContext.Provider
            value={{
                pacientes,
                paciente,
                guardarPacientes,
                editarPaciente,
                eliminarPaciente
            }}>

            {children}
        </PacienteContext.Provider>

    )
}
export {
    PacientesProvider
}

export default PacienteContext