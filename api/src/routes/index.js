const { Router } = require('express');
const { Transaction } = require('../db.js');

const router = Router();

router.get('/transactions', async (req, res) => {
    try {
        const transactions = await Transaction.findAll()
        res.json(transactions)
    } catch (error) {
        res.status(500).send(error)
    }

})

router.post('/transactions', async (req, res) => {
    try {
        const newTransaction = await Transaction.create({
            name: req.body.name,
            amount: req.body.amount,
            date: req.body.date,
            type: req.body.type
        })
        res.status(201).send(newTransaction)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.delete('/transactions/:id', async (req, res) => {
    try {
        const id = req.params.id
        await Transaction.destroy({ where: { id: id } })
        res.sendStatus(204)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.put('/transactions/:id', async (req, res) => {
    try {
        await Transaction.update({
            name: req.body.name,
            amount: req.body.amount,
            date: req.body.date
        }, { where: { id: req.params.id } })
        res.sendStatus(200)
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router; 