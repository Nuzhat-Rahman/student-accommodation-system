const express = require('express');
const { addApartment, getApartments, updateApartment, deleteApartment } = require('../controllers/apartmentController');
const { authMiddleware } = require('../middlewares/authMiddleware');
const { roleMiddleware } = require('../middlewares/roleMiddleware');
const router = express.Router();

router.post('/register', authMiddleware, roleMiddleware('landlord'), addApartment);
router.get('/', authMiddleware, getApartments);
router.put('/:id', authMiddleware, roleMiddleware('landlord'), updateApartment);
router.delete('/:id', authMiddleware, roleMiddleware('landlord'), deleteApartment);

module.exports = router;
