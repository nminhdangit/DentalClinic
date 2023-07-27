const Slot = require('../../Models/Clinic/Slots');// Đường dẫn tới model Slot
const Doctor = require('../../Models/Users/Doctors');
const { Op } = require('sequelize');
const { getAllDoctor } = require('../User/AdminController');
const { format } = require('date-fns');

class SlotController {
  // CREATE
  async createSlot(slotData) {
    try {
      const slot = await Slot.create(slotData);
      return slot;
    } catch (error) {
      console.error('Error creating slot:', error);
      throw new Error('An error occurred while creating the slot');
    }
  }

  async createSlotForDoctor(req, res) {
    try {
      const doctorID = req.body.doctor.id; // Lấy doctorID từ client
      const startDate = new Date(req.body.startDate); // Lấy startDate từ client
      const endDate = new Date(req.body.endDate); // Lấy endDate từ client
      const shifts = req.body.shifts;
      const hasMorningShift = shifts.includes('Ca sáng');
      const hasAfternoonShift = shifts.includes('Ca chiều');

      const createdSlots = [];
      const slotDataArray = [];
      const defaultSlotData = {
        time: null,
        date: null,
        doctorID,
        status: 'available'
      };
      let currentDate = new Date;
      // Tạo các slot theo ca sáng và ca chiều trong mỗi ngày trong khoảng thời gian từ startDate đến endDate
      for (currentDate = startDate; currentDate <= endDate; currentDate.setDate(currentDate.getDate() + 1)) {
        if (hasMorningShift) {
          for (let i = 8; i <= 10; i++) {
            const slotData = {
              ...defaultSlotData,
              time: `${i}h - ${i + 1}h`,
              date: new Date(currentDate)
            };
            const existingSlot = await Slot.findOne({ where: { doctorID, time: slotData.time, date: slotData.date } });
            if (!existingSlot) {
              slotDataArray.push(slotData);
            }
          }
        }

        if (hasAfternoonShift) {
          for (let i = 13; i <= 15; i++) {
            const slotData = {
              ...defaultSlotData,
              time: `${i}h - ${i + 1}h`,
              date: new Date(currentDate)
            };
            const existingSlot = await Slot.findOne({ where: { doctorID, time: slotData.time, date: slotData.date } });
            if (!existingSlot) {
              slotDataArray.push(slotData);
            }
          }
        }
      }

      // Gọi hàm createSlot để tạo các slot
      for (const slotData of slotDataArray) {
        const slot = await Slot.create(slotData);
        createdSlots.push(slot);
      }

      return res.status(201).json(createdSlots);
    } catch (error) {
      console.error('Error creating slots for doctor:', error);
      return res.status(500).json({ error: 'An error occurred while creating the slots for doctor' });
    }
  }




  // READ
  async getSlotById(req, res) {
    try {
      const slotId = req.query.id; // Lấy ID từ request params
      const slot = await Slot.findByPk(slotId);
      if (slot) {
        return res.json({slot : slot});
      }
      return res.status(404).json({ error: 'Slot not found' });
    } catch (error) {
      console.error('Error retrieving slot by ID:', error);
      return res.status(500).json({ error: 'An error occurred while retrieving the slot' });
    }
  }

  async getAllSlots(req, res) {
    try {
      const slots = await Slot.findAll();
      return res.json(slots);
    } catch (error) {
      console.error('Error retrieving all slots:', error);
      return res.status(500).json({ error: 'An error occurred while retrieving all slots' });
    }
  }
  async getAllSlotsByDoctor(req, res) {
    try {
      const { doctorId } = req.query; // Lấy doctorID từ request params
      const today = new Date();
      const threeDaysLater = new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000); // Tính ngày 3 ngày sau

      const slots = await Slot.findAll({
        where: {
          doctorID: doctorId,
          date: {
            [Op.gte]: today
          }
        }
      });

      return res.json({ slots: slots });
    } catch (error) {
      console.error('Error retrieving slots by doctor:', error);
      return res.status(500).json({ error: 'An error occurred while retrieving slots by doctor' });
    }
  }

  async getAvailableSlotsByDoctor(req, res) {
    try {
      const doctorID = req.params.doctorID; // Lấy doctorID từ request params
      const slots = await Slot.findAll({
        where: {
          doctorID: doctorID,
          status: 'available'
        }
      });

      return res.status(200).json(slots);
    } catch (error) {
      console.error('Error retrieving available slots for doctor:', error);
      return res.status(500).json({ error: 'An error occurred while retrieving available slots for doctor' });
    }
  }

  // get all doctor by slot
  async getAllDoctorBySlot(req, res) {
    try {
      const { selectedDate, selectedTime } = req.body;
      const startDate = new Date(selectedDate);
      const endDate = new Date(selectedDate);
      endDate.setHours(23, 59, 59);


      // Tìm các Slot dựa trên ngày và giờ
      const slots = await Slot.findAll({
        where: {
          date: {
            [Op.between]: [startDate, endDate]
          },
          time: selectedTime,
          status: 'available'
        },
      });
      const uniqueDoctorIds = [];
      const doctorIdSet = new Set();
      // Lấy danh sách các unique doctorId từ các Slot tìm thấy
      // Lặp qua từng slot để lấy unique doctorId
      slots.forEach((slot) => {
        if (!doctorIdSet.has(slot.doctorID)) {
          doctorIdSet.add(slot.doctorID);
          uniqueDoctorIds.push(slot.doctorID);
        }
      });

      // Tìm các bác sĩ dựa trên danh sách uniqueDoctorIds
      const doctors = await Doctor.findAll({
        where: {
          id: uniqueDoctorIds,
        },
      });

      // Trả về danh sách các bác sĩ như một phản hồi
      res.status(200).json({ doctors: doctors});
    } catch (error) {
      console.error('Lỗi:', error);
      res.status(500).json({ error: 'Lỗi máy chủ' });
    }
  }



  // UPDATE
  async updateSlot(req, res) {
    try {
      const { slotId, status } = req.body;
      const slot = await Slot.findByPk(slotId);
      if (slot) {
        await slot.update({ status }); // Cập nhật trạng thái slot
        return res.json(slot);
      }
      return res.status(404).json({ error: 'Slot not found' });
    } catch (error) {
      console.error('Error updating slot:', error);
      return res.status(500).json({ error: 'An error occurred while updating the slot' });
    }
  }
  // update status slot 
  async updateSlotStatus(req, res) {
    try {
      const { id } = req.body; // Lấy ID slot từ client
      const status = "Not Available"; // Trạng thái mới là "Not Available"

      const slot = await Slot.findByPk(id);
      if (slot) {
        // Cập nhật cột status
        slot.status = status;
        await slot.save();

        return res.json(slot);
      }
      return res.status(404).json({ error: 'Slot not found' });
    } catch (error) {
      console.error('Error updating slot:', error);
      return res.status(500).json({ error: 'An error occurred while updating the slot' });
    }
  }



  // DELETE
  async deleteSlot(req, res) {
    try {
      const slotId = req.params.id; // Lấy ID từ request params

      const slot = await Slot.findByPk(slotId);
      if (slot) {
        await slot.destroy();
        return res.json({ message: 'Slot deleted successfully' });
      }
      return res.status(404).json({ error: 'Slot not found' });
    } catch (error) {
      console.error('Error deleting slot:', error);
      return res.status(500).json({ error: 'An error occurred while deleting the slot' });
    }
  }

}

module.exports = new SlotController();
