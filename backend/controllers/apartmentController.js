const Apartment = require('../models/Apartment');

exports.addApartment = async (req, res) => {
  try {
    const { location, type, rent, amenities, images } = req.body;
    const landlordId = req.user.id;

    const apartment = new Apartment({
      landlord: landlordId,
      location,
      type,
      rent,
      amenities,
      images,
    });

    await apartment.save();
    res.status(201).json(apartment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getApartments = async (req, res) => {
  try {
    const apartments = await Apartment.find({}).populate('landlord', 'name email');
    res.json(apartments);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch apartments' });
  }
};

exports.updateApartment = async (req, res) => {
  try {
    const updates = req.body;
    const apartment = await Apartment.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!apartment) return res.status(404).json({ message: 'Apartment not found' });
    res.json(apartment);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update apartment' });
  }
};

exports.deleteApartment = async (req, res) => {
  try {
    const apartment = await Apartment.findByIdAndDelete(req.params.id);
    if (!apartment) return res.status(404).json({ message: 'Apartment not found' });
    res.json({ message: 'Apartment deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete apartment' });
  }
};
