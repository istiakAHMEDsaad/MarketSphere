import { generateToken } from '../utils/generateToken.js';

export const createJWT = async (req, res) => {
  try {
    const { email } = req.body;

    const token = generateToken({ email });

    res
      .cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
      })
      .status(200)
      .json({ success: true });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to generate token',
    });
  }
};

export const logout = (req, res) => {
  res
    .clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
    })
    .status(200)
    .json({ success: true });
};
