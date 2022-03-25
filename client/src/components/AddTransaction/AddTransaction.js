import axios from 'axios';
import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom';


function AddTransaction() {
    const currentDate = function () {
        return new Date()
    }
    const history = useHistory()
    const [input, setInput] = useState({
        name: '',
        amount: '',
        date: currentDate(),
        type: 'ingreso'
    })


    const handleInputChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        await axios.post("http://localhost:3001/transactions", input)
        history.push('/')
    }

    return (
        <div className='home flex items-center flex-col'>
            <form className='flex items-center flex-col w-96 bg-white p-6 mt-6 rounded-lg' onSubmit={handleSubmit}>
                <h1 className='font-mono text-3xl font-bold text-slate-600'>Agregar transacción</h1>
                <div className='mt-6 flex flex-col items-start w-4/5'>
                    <label className='font-mono text-lg font-bold text-slate-600'>Concepto</label>
                    <input className='text-black border rounded-md pl-2 py-1 font-mono w-full focus:outline-none' onChange={handleInputChange} name="name" type="text" value={input.name} />
                </div>
                <div className='mt-6 flex flex-col items-start w-4/5'>
                    <label className='font-mono text-lg font-bold text-slate-600'>Monto</label>
                    <input className='text-black border rounded-md pl-2 py-1 font-mono w-full focus:outline-none' onChange={handleInputChange} name="amount" type="number" value={input.amount} />
                </div>
                <div className='mt-6 flex flex-col items-start w-4/5'>
                    <label className='font-mono text-lg font-bold text-slate-600'>Tipo</label>
                    <select className='text-black border rounded-md py-1 font-mono w-full focus:outline-none' name='type' onChange={handleInputChange}>
                        <option className='font-mono w-full' value='ingreso'>Ingreso</option>
                        <option className='font-mono w-full' value='egreso'>Egreso</option>
                    </select>
                </div>
                <button className='bg-lime-500 text-white py-2 px-4 rounded mx-2 mt-12 border-slate-500 font-mono' type='submit'>Agregar</button>
            </form>
            <Link to='/'><button className='bg-blue-500 text-white py-2 px-4 rounded mx-2 mt-12 border-slate-500 font-mono'>Volver</button></Link>
        </div>
    )
}

export default AddTransaction