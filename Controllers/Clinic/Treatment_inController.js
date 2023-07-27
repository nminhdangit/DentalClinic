const TreatmentIn = require('../../Models/Clinic/Treatment_ins');

class TreatmentInController {
  async createTreatmentIn(req, res) {
    try {
      const treatmentInData = req.body;
      const treatmentIn = await TreatmentIn.create(treatmentInData);

      // Lưu logic liên quan đến trạng thái slot và các thông tin khác tại đây (nếu cần)

      return res.status(200).json(treatmentIn);
    } catch (error) {
      console.error('Error creating treatment in:', error);
      return res.status(500).json({ error: 'An error occurred while creating the treatment in' });
    }
  }

  async getTreatmentInDetails(req, res) {
    try {
      const treatmentInId = req.query.id;
      const treatmentIn = await TreatmentIn.findByPk(treatmentInId);

      if (treatmentIn) {
        return res.json({ treatmentIn });
      }

      return res.status(404).json({ error: 'Treatment in not found' });
    } catch (error) {
      console.error('Error retrieving treatment in details:', error);
      return res.status(500).json({ error: 'An error occurred while retrieving the treatment in details' });
    }
  }

  async getAllTreatmentIns(req, res) {
    try {
      const treatmentIns = await TreatmentIn.findAll();
      return res.json(treatmentIns);
    } catch (error) {
      console.error('Error retrieving all treatment ins:', error);
      return res.status(500).json({ error: 'An error occurred while retrieving all treatment ins' });
    }
  }
  async getTreatmentInDetailsByidTreatmentProfile(req, res) {
    try {
      const idTreatmentProfile = req.query.id;
      const treatmentIns = await TreatmentIn.findAll({
        where: {
          idTreatmentProfile: idTreatmentProfile
        }
      });
  
      if (treatmentIns.length > 0) {
        return res.json({treatmentIns: treatmentIns });
      }
  
      return res.status(404).json({ error: 'No treatment ins found for the given treatment profile ID' });
    } catch (error) {
      console.error('Error retrieving treatment in details:', error);
      return res.status(500).json({ error: 'An error occurred while retrieving the treatment in details' });
    }
  }

  async updateTreatmentIn(req, res) {
    try {
      const treatmentInId = req.query.id;
      const treatmentInData = req.body;

      const treatmentIn = await TreatmentIn.findByPk(treatmentInId);
      if (!treatmentIn) {
        return res.status(404).json({ error: 'Treatment in not found' });
      }

      await treatmentIn.update(treatmentInData);

      return res.json(treatmentIn);
    } catch (error) {
      console.error('Error updating treatment in:', error);
      return res.status(500).json({ error: 'An error occurred while updating the treatment in' });
    }
  }

  async deleteTreatmentIn(req, res) {
    try {
      const treatmentInId = req.params.id;
      const treatmentIn = await TreatmentIn.findByPk(treatmentInId);
      if (treatmentIn) {
        await treatmentIn.destroy();
        return res.json({ message: 'Treatment in deleted successfully' });
      }
      return res.status(404).json({ error: 'Treatment in not found' });
    } catch (error) {
      console.error('Error deleting treatment in:', error);
      return res.status(500).json({ error: 'An error occurred while deleting the treatment in' });
    }
  }
}

module.exports = new TreatmentInController();
