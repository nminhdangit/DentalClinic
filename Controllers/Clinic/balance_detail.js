const Balance_detail = require('../../Models/Users/balance_detail');

class Balance_detailController {


    async get(req, res) {
        try {
            const id = req.query.id;
            const balance_detail = await Balance_detail.findAll({
                where:{
                    customerID: id,
                },
            }
            );
            return res.status(200).json({ data: balance_detail });
        } catch (error) {
            console.error('', error);
            return res.status(500).json({ error: 'An error occurred while retrieving balance_detail' });
        }
    }




}

module.exports = new Balance_detailController();
