const TreatmentProfile = require('../../Models/Clinic/Treatment_profiles'); // đường dẫn đến Treatment_profile

class TreatmentProfileController {
  // CREATE
  async createTreatmentProfile(req, res) {
    try {
      const treatmentProfileData = req.body; // Dữ liệu được gửi từ client
      const treatmentProfile = await TreatmentProfile.create(treatmentProfileData);
      return res.status(201).json(treatmentProfile);
    } catch (error) {
      console.error('Error creating treatment profile:', error);
      return res.status(500).json({ error: 'An error occurred while creating the treatment profile' });
    }
  }

  // READ
  async getTreatmentProfileById(req, res) {
    try {
      const treatmentProfileId = req.query.id; // Lấy ID từ request params
      const treatmentProfile = await TreatmentProfile.findByPk(treatmentProfileId);
      if (treatmentProfile) {
        return res.json({treatmentProfile : treatmentProfile});
      }
      return res.status(404).json({ error: 'Treatment profile not found' });
    } catch (error) {
      console.error('Error retrieving treatment profile by ID:', error);
      return res.status(500).json({ error: 'An error occurred while retrieving the treatment profile' });
    }
  }

  async getAllTreatmentProfiles(req, res) {
    try {
      const treatmentProfiles = await TreatmentProfile.findAll();
      return res.json(treatmentProfiles);
    } catch (error) {
      console.error('Error retrieving all treatment profiles:', error);
      return res.status(500).json({ error: 'An error occurred while retrieving all treatment profiles' });
    }
  }
  async getAllTreatmentProfilesByCustomer(req, res) {
    try {
      const customerID = req.query.id; // Lấy ID của khách hàng từ request params
      const treatmentProfiles = await TreatmentProfile.findAll({
        where: { customerID },
      });
      return res.json({treatmentProfiles: treatmentProfiles});
    } catch (error) {
      console.error('Error retrieving treatment profiles by customer ID:', error);
      return res.status(500).json({ error: 'An error occurred while retrieving the treatment profiles' });
    }
  }

  // UPDATE
  async updateTreatmentProfile(req, res) {
    try {
      const treatmentProfileId = req.params.id; // Lấy ID từ request params
      const treatmentProfileData = req.body; // Dữ liệu được gửi từ client
      const treatmentProfile = await TreatmentProfile.findByPk(treatmentProfileId);
      if (treatmentProfile) {
        await treatmentProfile.update(treatmentProfileData);
        return res.json(treatmentProfile);
      }
      return res.status(404).json({ error: 'Treatment profile not found' });
    } catch (error) {
      console.error('Error updating treatment profile:', error);
      return res.status(500).json({ error: 'An error occurred while updating the treatment profile' });
    }
  }

  // DELETE
  async deleteTreatmentProfile(req, res) {
    try {
      const treatmentProfileId = req.params.id; // Lấy ID từ request params
      const treatmentProfile = await TreatmentProfile.findByPk(treatmentProfileId);
      if (treatmentProfile) {
        await treatmentProfile.destroy();
        return res.json({ message: 'Treatment profile deleted successfully' });
      }
      return res.status(404).json({ error: 'Treatment profile not found' });
    } catch (error) {
      console.error('Error deleting treatment profile:', error);
      return res.status(500).json({ error: 'An error occurred while deleting the treatment profile' });
    }
  }
}

module.exports = new TreatmentProfileController();
