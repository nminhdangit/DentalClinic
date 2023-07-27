const Amount = require('../../Models/Clinic/Amount');

class AmountController {


    async get(req, res) {
        try {
            const amountData = await Amount.findByPk(4);
            const amountValue = amountData ? amountData.amount : 0;
            return res.status(200).json({amount: amountValue});
        } catch (error) {
            console.error('Error retrieving Amount:', error);
            return res.status(500).json({ error: 'An error occurred while retrieving Amount' });
        }
    }
    async update(req, res) {
        try {
            const amountData = await Amount.findByPk(4);
             amountData.amount = req.body.amount;
             await amountData.save();
        } catch (error) {
            console.error('Error retrieving Amount:', error);
            return res.status(500).json({ error: 'An error occurred while retrieving Amount' });
        }
    }



}

module.exports = new AmountController();
