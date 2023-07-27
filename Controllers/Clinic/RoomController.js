const Room = require('../../Models/Clinic/Rooms');

class RoomController {
  // Tạo phòng mới
  async createRoom(req, res) {
    try {
      const roomData = req.body; // Lấy dữ liệu phòng từ body của request
      const room = await Room.create(roomData); // Tạo một phòng mới trong cơ sở dữ liệu
      return res.status(201).json(room); // Trả về phòng vừa tạo dưới dạng JSON
    } catch (error) {
      console.error('Error creating room:', error);
      return res.status(500).json({ error: 'An error occurred while creating the room' });
    }
  }

  // Lấy thông tin phòng theo ID
  async getRoomById(req, res) {
    try {
      const roomId = req.params.id; // Lấy ID của phòng từ params của request
      const room = await Room.findByPk(roomId); // Tìm phòng theo ID trong cơ sở dữ liệu
      if (room) {
        return res.json(room); // Trả về thông tin phòng dưới dạng JSON
      }
      return res.status(404).json({ error: 'Room not found' }); // Trả về thông báo lỗi nếu không tìm thấy phòng
    } catch (error) {
      console.error('Error retrieving room by ID:', error);
      return res.status(500).json({ error: 'An error occurred while retrieving the room' });
    }
  }

  // Lấy danh sách tất cả các phòng
  async getAllRooms(req, res) {
    try {
      const rooms = await Room.findAll(); // Lấy danh sách tất cả các phòng từ cơ sở dữ liệu
      return res.json(rooms); // Trả về danh sách phòng dưới dạng JSON
    } catch (error) {
      console.error('Error retrieving all rooms:', error);
      return res.status(500).json({ error: 'An error occurred while retrieving all rooms' });
    }
  }

  // Cập nhật thông tin phòng
  async updateRoom(req, res) {
    try {
      const roomId = req.params.id; // Lấy ID của phòng từ params của request
      const roomData = req.body; // Lấy dữ liệu phòng từ body của request
      const room = await Room.findByPk(roomId); // Tìm phòng theo ID trong cơ sở dữ liệu
      if (room) {
        await room.update(roomData); // Cập nhật thông tin phòng
        return res.json(room); // Trả về thông tin phòng đã được cập nhật dưới dạng JSON
      }
      return res.status(404).json({ error: 'Room not found' }); // Trả về thông báo lỗi nếu không tìm thấy phòng
    } catch (error) {
      console.error('Error updating room:', error);
      return res.status(500).json({ error: 'An error occurred while updating the room' });
    }
  }

  // Xóa phòng
  async deleteRoom(req, res) {
    try {
      const roomId = req.params.id; // Lấy ID của phòng từ params của request
      const room = await Room.findByPk(roomId); // Tìm phòng theo ID trong cơ sở dữ liệu
      if (room) {
        await room.destroy(); // Xóa phòng
        return res.json({ message: 'Room deleted successfully' }); // Trả về thông báo xóa thành công
      }
      return res.status(404).json({ error: 'Room not found' }); // Trả về thông báo lỗi nếu không tìm thấy phòng
    } catch (error) {
      console.error('Error deleting room:', error);
      return res.status(500).json({ error: 'An error occurred while deleting the room' });
    }
  }
}

module.exports = new RoomController();
