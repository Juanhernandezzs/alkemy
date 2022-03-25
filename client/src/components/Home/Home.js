import React, { useEffect, useState } from 'react'
import TransactionCard from '../TransactionCard/TransactionCard'
import axios from 'axios'
import './Home.css'
import { Link } from 'react-router-dom'

function Home() {
    const [data, setData] = useState([])
    const [filteredData, setFilteredData] = useState([])
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

    const totalBalance = function () {
        let actualBalance = 0
        data.map(d => {
            if (d.type === 'ingreso') {
                actualBalance += d.amount
            } else if (d.type === 'egreso') {
                actualBalance -= d.amount
            }
        })
        return actualBalance
    }

    useEffect(() => {
        setFilteredData([...data].slice(Math.max(data.length - 10, 0)).reverse())
    }, [data])

    function sortData() {
        filteredData.sort((a, b) => {
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

    return (
        <div className='home bg-zinc-700'>
            <div className='flex items-center justify-between w-4/5'>
                <p className='mt-6 font-mono text-2xl text-slate-300'>Balance actual: ${totalBalance()}</p>
                <Link to='/add'>
                    <button className='bg-blue-500 text-white font-bold py-2 px-4 rounded mt-2 font-mono'>Agregar transacción</button>
                </Link>
            </div>
            <div className='shadow-sm overflow-hidden my-8 py-6 rounded-2xl bg-slate-400 w-4/5'>
                <table>
                    <tr>
                        <th className='font-mono'>Concepto</th>
                        <th className='font-mono'>Monto</th>
                        <th className='font-mono'>Fecha</th>
                        <th className='font-mono'><button className='font-bold' onClick={sortData}>{defaultType ? "Tipo" : sort ? "Tipo +" : "Tipo -"}</button></th>
                    </tr>
                    {filteredData.map(transaction => <TransactionCard name={transaction.name} amount={transaction.amount} date={transaction.date} type={transaction.type.toUpperCase()} id={transaction.id} />)}
                </table>
            </div>
        </div>
    )
}

export default Home