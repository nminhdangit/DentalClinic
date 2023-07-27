const bcrypt = require('bcrypt');
const Customer = require('../../Models/Users/Customers');
const Doctor = require('../../Models/Users/Doctors');
const Admin = require('../../Models/Users/Admins');
const Balance_detail = require('../../Models/Users/balance_detail');

class CustomerController {
    async index(req, res) {
        try {
            const customers = await Customer.findAll();
            return res.status(200).json({ customers: customers });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

    async detail(req, res) {
        try {
            const { id } = req.query;
            const customer = await Customer.findOne({ where: { id } });

            if (!customer) {
                return res.status(400).json({ error: 'User not found' });
            }

            return res.status(200).json({ customer: customer });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

    async create(req, res) {
        try {
            const { email, password, fullname, address, phone, gender } = req.body;
            const doctor = await Doctor.findOne({ where: { email } });
            const admin = await Admin.findOne({ where: { email } });
            const customer = await Customer.findOne({ where: { email } });
            if (doctor || admin || customer) {
                return res.status(400).json({ error: 'Email already exists' });
            }
            const hashedPassword = await bcrypt.hash(password, 10);

            await Customer.create({
                email,
                password: hashedPassword,
                fullname,
                address,
                phone,
                gender,
            });
            return res.status(200).json({ message: 'User registered successfully' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.query;
            const { fullname, email, address, phone, gender } = req.body;

            const customer = await Customer.findByPk(id);

            if (!customer) {
                return res.status(400).json({ error: 'User not found' });
            }

            customer.fullname = fullname;
            customer.email = email;
            customer.address = address;
            customer.phone = phone;
            customer.gender = gender;

            await customer.save();

            return res.status(200).json({ message: 'Update successfully' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
    async subtractAmount(req, res) {
        try {
            const { customerId, amount } = req.body;

            // Tìm khách hàng dựa trên customerId
            const customer = await Customer.findByPk(customerId);

            if (!customer) {
                return res.status(200).json({ message: 'Khách hàng không tồn tại' });
            }

            // Kiểm tra số tiền cần trừ không vượt quá số dư hiện tại của khách hàng
            if (amount > customer.balance) {
                return res.status(200).json({ message: 'Số tiền trừ vượt quá số dư khách hàng' });
            }

            // Trừ số tiền khỏi số dư khách hàng
            customer.balance -= amount;

            // Lưu thay đổi vào cơ sở dữ liệu
            await customer.save();
            const balance_detail = await Balance_detail.create({
                customerID: customer.id,
                amount: amount,
                blance: customer.balance, 
                comment: 'Admin tru tien',
                createdAt: new Date(),
                updatedAt: new Date()
              });
            return res.status(200).json({ message: 'Trừ tiền thành công' });
        } catch (error) {
            console.error(error);
            return res.status(200).json({ message: 'Lỗi server' });
        }
    }

    async addAmount(req, res) {
        try {
            const { customerId, amount } = req.body;

            // Tìm khách hàng dựa trên customerId
            const customer = await Customer.findByPk(customerId);

            if (!customer) {
                return res.status(200).json({ message: 'Khách hàng không tồn tại' });
            }

            // Cộng số tiền vào số dư khách hàng
            customer.balance += amount;

            // Lưu thay đổi vào cơ sở dữ liệu
            await customer.save();
            const balance_detail = await Balance_detail.create({
                customerID: customer.id,
                amount: amount,
                blance: customer.balance, 
                comment: 'Admin cong tien',
                createdAt: new Date(),
                updatedAt: new Date()
              });
            return res.status(200).json({ message: 'Cộng tiền thành công' });
        } catch (error) {
            console.error(error);
            return res.status(200).json({ message: 'Lỗi server' });
        }
    }



    async delete(req, res) {
        try {
            const { email } = req.body;
            const customer = await Customer.findOne({ where: { email } });
            if (!customer) {
                return res.status(400).json({ error: 'User not found' });
            }
            await customer.destroy();
            return res.status(200).json({ message: 'Delete successfully' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal server error' });
        }

    }

}

module.exports = new CustomerController;
