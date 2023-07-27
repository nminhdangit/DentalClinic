const Transaction = require('../../Models/Clinic/Transaction');
const { Op } = require('sequelize');


class TransactionController {
 
  async getall(req, res) {
    try {
      const transactions = await Transaction.findAll();
      return res.status(200).json(transactions);
    } catch (error) {
      console.error('Error retrieving transactions:', error);
      return res.status(500).json({ error: 'An error occurred while retrieving transactions' });
    }
  }
  async  total(req, res) {
    try {
      // Lấy ngày đầu tiên và cuối cùng của tháng hiện tại
      const today = new Date();
      const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  
      // Tìm tất cả các giao dịch trong tháng này
      const transactions = await Transaction.findAll({
        where: {
          createdAt: {
            [Op.between]: [firstDayOfMonth, lastDayOfMonth],
          },
        },
      });
  
      // Tính tổng amount
      let totalAmount = 0;
      transactions.forEach((transaction) => {
        totalAmount += transaction.amount;
      });
  
      return res.status(200).json({ total: totalAmount });
    } catch (error) {
      console.error('Error retrieving transactions:', error);
      return res.status(500).json({ error: 'An error occurred while retrieving transactions' });
    }
  }


  async getTransactionByCustomer(req, res) {
    try {
      const customerId = req.query.id;
      const transactions = await Transaction.findAll({
        where: { comment: 'nap tien ' + customerId },
      });

      if (transactions.length > 0) {
        return res.json({ transactions });
      }

      return res.status(404).json({ error: 'No transactions found for the customer' });
    } catch (error) {
      console.error('Error retrieving transactions:', error);
      return res.status(500).json({ error: 'An error occurred while retrieving the transactions' });
    }
  }
}

module.exports = new TransactionController();
