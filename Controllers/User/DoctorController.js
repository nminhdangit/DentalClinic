const bcrypt = require('bcrypt');
const Customer = require('../../Models/Users/Customers');
const Doctor = require('../../Models/Users/Doctors');
const Admin = require('../../Models/Users/Admins');
const Slot = require('../../Models/Clinic/Slots');
const Appointment = require('../../Models/Clinic/Appointments');
const { Op } = require('sequelize');

class DoctorController {
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
  async index(req, res) {
    try {
      const doctors = await Doctor.findAll();
      return res.status(200).json({ doctors: doctors });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async detail(req, res) {
    try {
      const { id } = req.query;
      const doctor = await Doctor.findOne({ where: { id: id } });
      if (!doctor) {
        return res.status(400).json({ error: 'Doctor not found' });
      }
      return res.status(200).json({ doctor });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async update(req, res) {
    try {
      const { doctorId } = req.query;
      const {
        fullname,
        idCard,
        gender,
        dateOfBirth,
        phone,
        email,
        address,
        qualification,
        experience,
        password,
      } = req.body;

      const doctor = await Doctor.findByPk(doctorId);
      if (!doctor) {
        return res.status(400).json({ error: 'Doctor not found' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      await doctor.update({
        fullname,
        idCard,
        gender,
        dateOfBirth,
        phone,
        email,
        address,
        qualification,
        experience,
        password: hashedPassword,
      });

      return res.status(200).json({ message: 'Update successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }


  async status(req, res) {
    try {
      const doctorId = req.query.id; // Lấy ID của bác sĩ từ query parameters

      // Tìm bác sĩ dựa trên ID
      const currentDate = new Date().toISOString().split('T')[0]; // Lấy ngày hôm nay
      const doctor = await Doctor.findByPk(doctorId);
      if (!doctor) {
        return res.status(404).json({ error: 'Doctor not found' }); // Trả về thông báo lỗi nếu không tìm thấy bác sĩ
      }
      const slots = await Slot.findAll({
        where: {
          doctorID: doctorId,
          date: {
            [Op.gte]: currentDate,
          },
        },
      });

      if (slots.length !== 0) {

      }

      // Cập nhật trạng thái của bác sĩ
      if (doctor.status === 'active') {
        // Trường hợp chuyển từ active sang not active
        if (slots.length !== 0) {
          for (const slot of slots) {
            slot.status = 'not available';
            await slot.save();

            // Tìm cuộc hẹn tương ứng và cộng lại tiền cho khách hàng
            const appointment = await Appointment.findOne({ where: { slotID: slot.id }, order: [['id', 'DESC']] });

            // Cập nhật trạng thái của cuộc hẹn thành "Doctor Cancel"
            appointment.status = 'Doctor Cancel';
            await appointment.save();

            if (appointment) {
              const customerId = appointment.customerID;
              await Customer.increment('balance', { by: appointment.amountValue, where: { id: customerId } });
            }
          }
        }
        // Cập nhật trạng thái của các slot thành "not available" và cộng lại tiền cho khách hàng

        doctor.status = 'not active';
      } else {
        // Trường hợp chuyển từ not active sang active
        if (slots.length !== 0) {
          for (const slot of slots) {
            slot.status = 'available';
            await slot.save();
          }
        }

        doctor.status = 'active';
      }
      await doctor.save();







      return res.status(200).json({ message: 'Doctor status updated, slot status updated, and customer balance updated successfully' }); // Trả về thông báo thành công
    } catch (error) {
      console.error('Error updating doctor status, slot status, and customer balance:', error);
      return res.status(500).json({ error: 'An error occurred while updating doctor status, slot status, and customer balance' });
    }
  }

  async delete(req, res) {
    try {
      const { email } = req.body;
      const doctor = await Doctor.findOne({ where: { email } });
      if (!doctor) {
        return res.status(400).json({ error: 'User not found' });
      }
      await doctor.destroy();
      return res.status(200).json({ message: 'Delete successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getSlot(req, res) {
    try {
      const { email } = req.body;
      const doctor = await Doctor.findOne({ where: { email } });
      if (!doctor) {
        return res.status(400).json({ error: 'Doctor not found' });
      }
      const slot = await Slot.findAll({ where: { doctorID: doctor.id } })
      return res.status(200).json({ slot: slot });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

module.exports = new DoctorController;