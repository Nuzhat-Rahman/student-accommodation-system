const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


export const register = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword, role });

    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    const verificationLink = `${process.env.FRONTEND_URL}/verify/${token}`;


    // const transporter = nodemailer.createTransport({
    //   service: 'Gmail',
    //   auth: {
    //     user: process.env.EMAIL,
    //     pass: process.env.EMAIL_PASSWORD,
    //   },
    // });

    // await transporter.sendMail({
    //   to: user.email,
    //   subject: 'Verify Your Account',
    //   html:<p> Click <a href="${verificationLink}">Verify</a> to verify your email and activate your account.</p>,
    // });

    res.status(201).json({ message: 'User registered. Check email for verification link.' });
  } catch (err) {
    res.status(400).json({ error: "Error Occurred" });
  }
};
