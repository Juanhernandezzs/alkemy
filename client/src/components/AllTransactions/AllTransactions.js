import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import TransactionCard from '../TransactionCard/TransactionCard';

function AllTransactions() {
    const [data, setData] = useState([])
    const [sort, setSort] = useState(false)
    const [defaultType, setDefaultType] = useState(true)
    useEffect(() => {
        axios.get("http://localhost:3001/transactions")
            .then(response => {
                setData(response.data)
            }).catch(error => {
                console.log(error);
            })
    }, [])

    function sortData() {
        data.sort((a, b) => {
            if (sort) {
                if (a.type < b.type) { return -1 }
                if (a.type > b.type) { return 1 }
                return 0
            } else {
                if (a.type > b.type) { return -1 }
                if (a.type < b.type) { return 1 }
                return 0
            }
        })
        setDefaultType(false)
        setSort(!sort)
    }
    console.log(data)

    return (
        <div className='w-full flex justify-center'>
            <div className='shadow-sm overflow-hidden my-8 pt-6 rounded-2xl bg-slate-400 w-4/5'>
                <table>
                    <tr>
                        <th className='font-mono'>Concepto</th>
                        <th className='font-mono'>Monto</th>
                        <th className='font-mono'>Fecha</th>
                        <th className='font-mono'><button className='font-bold' onClick={sortData}>{defaultType ? "Tipo" : sort ? "Tipo +" : "Tipo -"}</button></th>
                    </tr>
                    {data.sort(function (a, b) {
                        return new Date(b.date) - new Date(a.date);
                    }).map(transaction => <TransactionCard name={transaction.name} amount={transaction.amount} date={transaction.date} type={transaction.type.toUpperCase()} id={transaction.id} />)}
                </table>
                <Link to='/'><button className='bg-blue-500 text-white py-2 px-4 rounded mx-2 my-2 border-slate-500 font-mono'>Volver</button></Link>
            </div>
        </div>
    )
}

export default AllTransactions