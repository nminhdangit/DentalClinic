const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const mailer = require('../mailer');
const customerController = require('./User/CustomerController');
const Customer = require('../Models/Users/Customers');
const Doctor = require('../Models/Users/Doctors');
const Admin = require('../Models/Users/Admins');
const Balance_detail = require('../Models/Users/balance_detail');
const Transaction = require('../Models/Clinic/Transaction');
const OAuth2 = require('../oauth2google');
const { Op } = require('sequelize');
const config = require('../config');

class AuthController {
  async login(req, res) {
    try {
      const { email, password } = req.body;

      const customer = await Customer.findOne({ where: { email } });
      const doctor = await Doctor.findOne({ where: { email } });
      const admin = await Admin.findOne({ where: { email } });
      const user = customer || doctor || admin;

      if (!user) {
        return res.status(400).json({ error: 'User not found' });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(400).json({ error: 'Invalid password' });
      }

      const token = user

      return res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async register(req, res) {
    try {
      return await customerController.create(req, res);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async googleAuthCallBack(req, res) {
    try {
      await OAuth2.getCallBack(req, res);
      const data = await OAuth2.getUserProfile();

      const { email, name } = data;

      const customer = await Customer.findOne({ where: { email } });
      const doctor = await Doctor.findOne({ where: { email } });
      const admin = await Admin.findOne({ where: { email } });
      const user = customer || doctor || admin;

      if (!user) {
        // Tạo người dùng mới với thông tin từ Google    
        const frontendURL = 'http://frontend-url.com'; // Thay đổi địa chỉ URL của front-end ở đây    
        return res.status(200).json({ redirectTo: `${frontendURL}/complete-profile?email=${email}&name=${name}` });
      }

      const token = jwt.sign({ id: user.id, email: user.email }, 'your-secret-key', { expiresIn: '1h' });

      return res.status(200).json({ message: 'Google login successful', token });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  googleAuth(req, res) {
    try {
      const url = OAuth2.getAuthUrl();
      res.redirect(url);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }


  async forgotPassword(req, res) {
    try {
      const { email } = req.body;
      console.log(email);

      // Tìm người dùng với email đã cung cấp
      const customer = await Customer.findOne({ where: { email } });
      const doctor = await Doctor.findOne({ where: { email } });
      const admin = await Admin.findOne({ where: { email } });
      const user = customer || doctor || admin;

      if (!user) {
        return res.status(400).json({ error: 'User not found' });
      }

      // Tạo mã đặc biệt để xác nhận yêu cầu đổi mật khẩu
      const resetToken = crypto.randomBytes(20).toString('hex');
      const resetTokenExpiration = Date.now() + 3600000; // Thời gian hết hạn là 1 giờ sau khi tạo mã

      // Lưu mã và thời gian hết hạn vào cơ sở dữ liệu của người dùng
      user.resetToken = resetToken;
      user.resetTokenExpiration = resetTokenExpiration;
      await user.save();

      // Gửi email xác nhận đổi mật khẩu
      const resetPasswordUrl = `${config.domain.name}/reset-password?token=${resetToken}`;

      mailer.sendMail(email, 'Yêu cầu đặt lại mật khẩu', resetPasswordUrl);

      // Gửi email chứa mật khẩu mới đến người dùng
      res.json({ message: 'Email sent for password reset' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async resetPassword(req, res) {
    try {
      const { token, password } = req.body;

      // Tìm người dùng với mã đặc biệt
      const customer = await Customer.findOne({ where: { resetToken: token, resetTokenExpiration: {[Op.gt]: Date.now() } } });
      const doctor = await Doctor.findOne({ where: { resetToken: token, resetTokenExpiration: {[Op.gt]: Date.now() } } });
      const admin = await Admin.findOne({ where: { resetToken: token, resetTokenExpiration: {[Op.gt]: Date.now() } } });

      const user = customer || doctor || admin;

      if (!user) {
        return res.status(400).json({ error: 'Invalid or expired token' });
      }

      // Đặt lại mật khẩu cho người dùng
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
      user.resetToken = null;
      user.resetTokenExpiration = null;
      await user.save();

      res.json({ message: 'Password reset successful' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async changepass(req, res) {
    try {
      const { email, password, newPassword } = req.body;

      const customer = await Customer.findOne({ where: { email } });
      const doctor = await Doctor.findOne({ where: { email } });
      const admin = await Admin.findOne({ where: { email } });
      const user = customer || doctor || admin;

      if (!user) {
        return res.status(400).json({ error: 'User not found' });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(400).json({ error: 'Invalid password' });
      }

      // Thay đổi mật khẩu của user
      const hashedNewPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedNewPassword;
      await user.save();

      return res.status(200).json({ message: 'Password changed successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
  async momo(req, res) {
    try {
      const data = req.body;
      const { signature, phone, tranId, ackTime, partnerId, partnerName, amount, comment } = data;
      // Tạo giao dịch mới
      const transaction = await Transaction.create({
        partnerId,
        amount,
        comment,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      

      // Kiểm tra cấu trúc của comment: "nap tien x"
      const regex = /^nap tien (\d+)$/;
      const match = comment.match(regex);
      if (!match) {
        return res.status(200).json({ error: 'Invalid comment format. Please use "nap tien x" format.' });
      }

      const x = parseInt(match[1]); // Lấy giá trị x từ kết quả match

      // Tìm khách hàng dựa trên giá trị x là khóa chính
      const customer = await Customer.findOne({ where: { id: x } });

      if (!customer) {
        return res.status(404).json({ error: 'Customer not found.' });
      }

      // Cập nhật giá trị balance của khách hàng
      const newBalance = customer.balance + amount;
      await Customer.update({ balance: newBalance }, { where: { id: x } });

      // Tiếp tục xử lý dữ liệu
      const balance_detail = await Balance_detail.create({
        customerID: x,
        amount: amount,
        blance: newBalance, 
        comment: 'nap tien',
        createdAt: new Date(),
        updatedAt: new Date()
      });

      res.status(200).json({ message: 'Data received and processed successfully.', newBalance });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'An error occurred during processing.' });
    }
  }


}

module.exports = new AuthController();
