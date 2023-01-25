

const Alerta = ({ alerta }) => {
    return (
        <div className={`${alerta.error ? 'from-red-400 to-red-600' : 'from-indigo-300 to-indigo-600'} bg-gradient-to-br text-center text-white text-sm font-bold p-3 rounded-xl my-6`}>{alerta.msg}</div>
    )
}

export default Alerta