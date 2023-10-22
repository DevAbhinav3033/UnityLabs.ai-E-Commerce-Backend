const jwt = require('jsonwebtoken');
const User = require('../models/user');

const secretKey = process.env.JWT_SECRET; // Replace with your secret key

// Register a user
const register = async (req, res) => {
  try {
    const { username, password, userType } = req.body;
    const user = new User({ username, password, userType });
    // console.log(user);
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
    console.log(error);
  }
};

// Login a user and issue a JWT token
const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({username}).select('+password');
    if (!user) {
      res.status(401).json({ error: 'Authentication failed' });
    } else {
      // console.log(user);
      if (user.comparepassword(password)){
        const token = jwt.sign({ id: user._id }, secretKey, {
          expiresIn: '1h', // Token expiration time
        });
        res.status(200).json({ message: 'Authentication successful', token });
        return;
      } 
     return res.status(500).json({ error: 'Login failed' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
};

module.exports = { register, login };

