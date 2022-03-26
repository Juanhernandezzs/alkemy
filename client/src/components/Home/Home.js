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
        setFilteredData(data.sort(function (a, b) {
            return new Date(b.date) - new Date(a.date);
        }).slice(0, 10))
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

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      }

    return (
        <div className='home bg-zinc-700'>
            <div className='flex flex-col items-center justify-between w-4/5 sm:flex-row'>
                <p className='mt-6 font-mono text-2xl text-slate-300'>Balance actual: ${numberWithCommas(totalBalance())}</p>
                <Link to='/add'>
                    <button className='bg-blue-500 text-white font-bold py-2 px-4 rounded mt-2 font-mono'>Agregar transacción</button>
                </Link>
            </div>
            <div className='shadow-sm overflow-x-scroll sm:overflow-x-hidden my-8 pt-6 rounded-2xl bg-slate-400 w-4/5'>
                <p className='font-mono text-xl font-bold'>Últimos 10 movimientos</p>
                <table>
                    <tr>
                        <th className='font-mono text-lg'>Concepto</th>
                        <th className='font-mono text-lg'>Monto</th>
                        <th className='font-mono text-lg'>Fecha</th>
                        <th className='font-mono text-lg'><button className='font-bold' onClick={sortData}>{defaultType ? "Tipo" : sort ? "Tipo +" : "Tipo -"}</button></th>
                    </tr>
                    {filteredData.map(transaction => <TransactionCard name={transaction.name} amount={transaction.amount} date={new Date(transaction.date).toISOString().split('T')[0]} type={transaction.type.toUpperCase()} id={transaction.id} />)}
                </table>
                <Link to='/all'><button className='bg-blue-500 text-white py-2 px-4 rounded mx-2 my-2 border-slate-500 font-mono'>Ver todo</button></Link>
            </div>
        </div>
    )
}

export default Home
