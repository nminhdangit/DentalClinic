const bcrypt = require('bcrypt');
const Customer = require('../../Models/Users/Customers');
const Doctor = require('../../Models/Users/Doctors');
const Admin = require('../../Models/Users/Admins');
const { Sequelize } = require('sequelize');



class AdminController {
  //Create doctor
  async createDoctor(req, res) {
    try {
      const { personalInfo, professionalInfo, accountInfo, avatar } = req.body;

      const customer = await Customer.findOne({ where: { email: personalInfo.email } });
      const doctor = await Doctor.findOne({ where: { email: personalInfo.email } });
      const admin = await Admin.findOne({ where: { email: personalInfo.email } });
      // Kiểm tra xem bác sĩ đã tồn tại trong hệ thống chưa
      const existingDoctor = customer || doctor || admin;
      if (existingDoctor) {
        return res.status(400).json({ error: 'Doctor already exists' });
      }

      // Mã hóa mật khẩu trước khi lưu vào cơ sở dữ liệu
      const hashedPassword = await bcrypt.hash(accountInfo.password, 10);

      // Tạo một đối tượng bác sĩ mới
      const newDoctor = new Doctor({
        fullname: personalInfo.fullName,
        idCard: personalInfo.idCard,
        gender: personalInfo.gender,
        dateOfBirth: personalInfo.dateOfBirth,
        phone: personalInfo.phone,
        email: personalInfo.email,
        address: personalInfo.address,
        qualification: professionalInfo.qualification,
        experience: professionalInfo.experience,
        password: hashedPassword,
        avatar: avatar
      });

      // Lưu thông tin bác sĩ vào cơ sở dữ liệu
      await newDoctor.save();

      res.json({ message: 'Doctor created successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }


  async index(req, res) {
    try {
      const admins = await Admin.findAll();
      return res.status(200).json({ admins: admins });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  //get Doctor List
  async getAllDoctor(req, res) {
    try {
      const doctors = await Doctor.findAll();
      return res.status(200).json({ doctors: doctors });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
  //get Doctor List active
  async getAllDoctorActive(req, res) {
    try {
      const doctors = await Doctor.findAll({
        where: {

          status: "active",
        },
      });
      return res.status(200).json({ doctors: doctors });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
  //get doctor
  async getDoctor(req, res) {
    const { doctorId } = req.query;
    try {
      const doctor = await Doctor.findOne({
        where: { id: doctorId },
      });
      if (!doctor) {
        return res.status(404).json({ error: 'Doctor not found' });
      }
      return res.status(200).json({ doctor: doctor });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
  async getAllDoctorByName(req, res) {
    const { name } = req.query;
    try {
      const doctors = await Doctor.findAll({
        where: {
          fullname: {
            [Sequelize.Op.like]: `%${name}%`,
          },
          status: "active",
        },
      });
      return res.status(200).json({ doctors });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }


  //get all slot of doctor



  async detail(req, res) {
    try {
      const { email } = req.body;
      const admin = await Admin.findOne({ where: { email } });
      if (!admin) {
        return res.status(400).json({ error: 'User not found' });
      }
      return res.status(200).json({ admin: admin });
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
      if (admin || doctor || customer) {
        return res.status(400).json({ error: 'Email already exists' });
      }
      const hashedPassword = await bcrypt.hash(password, 10);

      await Admin.create({
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
      const { email, newEmail, newPassword, newFullname, newAddress, newPhone, newGender } = req.body;
      const admin = await Admin.findOne({ where: { email } });
      if (!admin) {
        return res.status(400).json({ error: 'User not found' });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);

      await admin.update({
        email: newEmail,
        password: hashedPassword,
        fullname: newFullname,
        address: newAddress,
        phone: newPhone,
        gender: newGender,
      });
      return res.status(200).json({ message: 'Update successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async delete(req, res) {
    try {
      const { email } = req.body;
      const admin = await Admin.findOne({ where: { email } });
      if (!admin) {
        return res.status(400).json({ error: 'User not found' });
      }
      await admin.destroy();
      return res.status(200).json({ message: 'Delete successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

}

module.exports = new AdminController;