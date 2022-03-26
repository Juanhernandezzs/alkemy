import axios from 'axios'
import React, { useEffect, useState } from 'react'
import "./TransactionCard.css"

function TransactionCard({ name, amount, date, type, id }) {
    const formatDate = (date) => date.split(' ')[0]
    const [isEditing, setIsEditing] = useState(false)
    const [input, setInput] = useState({
        name,
        amount,
        date: formatDate(date),
    })
    const [errors, setErrors] = useState({})

    const destroy = function () {
        axios.delete(`http://localhost:3001/transactions/${id}`)
        window.location.reload()
    }

    const save = function () {
        if (validate()) {
            axios.put(`http://localhost:3001/transactions/${id}`, input)
            window.location.reload()
        }
    }

    const handleInputChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
        console.log(input)
    };

    function validate() {
        let errors = {};
        if (!input.name) {
            errors.name = "Indique el concepto";
        }
        if (!input.amount) {
            errors.amount = "Indique el monto";
        }
        if (input.amount < 0) {
            errors.amount = "El valor debe ser positivo";
        }
        setErrors(errors)
        return Object.keys(errors).length === 0;
    }

    useEffect(() => {
        validate();
    }, [input]);

    useEffect(() => {
        setErrors({});
    }, []);

    useEffect(() => {
        isEditing && setInput({
            name,
            amount,
            date: formatDate(date),
        })
    }, [isEditing])

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    return (
        <tr className='transactioncard border-y border-slate-500 bg-slate-600'>
            <td className='cardcontent border-y border-slate-500 bg-slate-600 text-slate-300 font-mono'>
                {isEditing ?
                    <>
                        {errors.name ?
                            <>
                                <input className='text-black border-red-600 border rounded-md pl-2 py-1 focus:outline-none' onChange={handleInputChange} name="name" type="text" value={input.name} />
                                <p className="text-red-600 font-mono">{errors.name}</p>
                            </>
                            :
                            <input className='text-black rounded-md pl-2 py-1 focus:outline-none' onChange={handleInputChange} name="name" type="text" value={input.name} />
                        }
                    </>
                    :
                    name
                }
            </td>
            <td className='border-y border-slate-500 bg-slate-600 text-slate-300 font-mono'>
                {isEditing ?
                    <>
                        {errors.amount ?
                            <>
                                <input className='text-black border-red-600 border rounded-md pl-2 py-1 focus:outline-none' onChange={handleInputChange} name="amount" type="text" value={input.amount} />
                                <p className="text-red-600 font-mono">{errors.amount}</p>
                            </>
                            :
                            <input className='text-black rounded-md pl-2 py-1 focus:outline-none' onChange={handleInputChange} name="amount" type="text" value={input.amount} />
                        }
                    </>
                    :
                    '$' + numberWithCommas(amount)
                }
            </td>
            <td className='border-y border-slate-500 bg-slate-600 text-slate-300 font-mono'>
                {isEditing ?
                    <input className='text-black rounded-md pl-2 py-1 focus:outline-none' onChange={handleInputChange} name="date" type="date" value={input.date} />
                    :
                    formatDate(date)
                }
            </td>
            <td className='border-y border-slate-500 bg-slate-600 text-slate-300 font-mono'>
                {type}
            </td>
            <td className='flex justify-center border-collapse bg-slate-600'>

                {isEditing ?
                    <>
                        <button className='bg-lime-500 text-white font-bold py-2 px-4 rounded mx-2 border-slate-500 font-mono' onClick={save}>Guardar</button>
                        <button className='bg-red-600 text-white font-bold py-2 px-4 rounded mx-2 border-slate-500 font-mono' onClick={() => setIsEditing(false)}>Cancelar</button>
                    </>
                    :
                    <>
                        <button className='bg-blue-500 text-white font-bold py-2 px-4 rounded mx-2 border-slate-500 font-mono' onClick={() => setIsEditing(true)}>Editar</button>
                        <button className='bg-red-600 text-white font-bold py-2 px-4 rounded mx-2 border-slate-500 font-mono' onClick={() => destroy()}>Borrar</button>
                    </>
                }
            </td>

        </tr>
    )
}

export default TransactionCard