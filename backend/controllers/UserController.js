import User from '../models/UserModel.js'; 
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

async function getUser(req, res) {
  try {
    const users = await User.findAll({
      attributes: ['id', 'email', 'username'] 
    });
    res.status(200).json(users);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ 
      status: "Error", 
      message: error.message 
    });
  }
}

async function register(req, res) {
  try {
    const { email, username, password } = req.body;
    
    const existingUser = await User.findOne({
      where: {
        email: email
      }
    });
    
    if (existingUser) {
      return res.status(400).json({ 
        status: "Error", 
        message: "Email already registered" 
      });
    }
    
    const encryptPassword = await bcrypt.hash(password, 5);
    
    const newUser = await User.create({
      email,
      username,
      password: encryptPassword,
      refresh_token: null
    });
    
    const { password: _, ...userWithoutPassword } = newUser.toJSON();
    
    res.status(201).json({
      status: "Success",
      message: "Registration successful",
      data: userWithoutPassword
    });
    
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ 
      status: "Error", 
      message: error.message 
    });
  }
}

async function login(req, res) {
    try {
      const { email, password } = req.body;
  
      const user = await User.findOne({
        where: {
          email: email,
        },
      });
  
      if (user) {
        const userPlain = user.toJSON(); 
  
        console.log(userPlain);
  
        const { password: _, refresh_token: __, ...safeUserData } = userPlain;
  
        const decryptPassword = await bcrypt.compare(password, user.password);
  
        if (decryptPassword) {
          const accessToken = jwt.sign(
            safeUserData,
            process.env.ACCESS_TOKEN_SECRET,
            {
              expiresIn: "30m",
            }
          );
  
          const refreshToken = jwt.sign(
            safeUserData,
            process.env.REFRESH_TOKEN_SECRET,
            {
              expiresIn: "1d",
            }
          );
  
          await User.update(
            { refresh_token: refreshToken },
            {
              where: {
                id: user.id,
              },
            }
          );
  
          res.cookie("refreshToken", refreshToken, {
            httpOnly: false, // Ngatur cross-site scripting, untuk penggunaan asli aktifkan karena bisa nyegah serangan fetch data dari website "document.cookies"
            sameSite: "none", // Ngatur domain yg request misal kalo strict cuman bisa akses ke link dari dan menuju domain yg sama, lax itu bisa dari domain lain tapi cuman bisa get
            maxAge: 24 * 60 * 60 * 1000, // Ngatur lamanya token disimpan di cookie (dalam satuan ms)
            secure: true, // Ini ngirim cookies cuman bisa dari https, kenapa? nyegah skema MITM di jaringan publik, tapi pas development di false in aja
          });
  
          // Kirim respons berhasil (200)
          res.status(200).json({
            status: "Succes",
            message: "Login Berhasil",
            safeUserData,
            accessToken,
          });
        } else {
          // Kalau password salah
          const error = new Error("Paassword atau email salah");
          error.statusCode = 400;
          throw error;
        }
      } else {
        // Kalau email salah
        const error = new Error("Paassword atau email salah");
        error.statusCode = 400;
        throw error;
      }
    } catch (error) {
      res.status(error.statusCode || 500).json({
        status: "Error",
        message: error.message,
      });
    }
  }
  
  async function logout(req, res) {
    // mengecek refresh token sama gak sama di database
    const refreshToken = req.cookies.refreshToken;
  
    // Kalo ga sama atau ga ada kirim status code 204
    if (!refreshToken) return res.sendStatus(204);
  
    // Kalau sama, cari user berdasarkan refresh token tadi
    const user = await User.findOne({
      where: {
        refresh_token: refreshToken,
      },
    });
  
    // Kalau user gaada, kirim status code 204
    if (!user.refresh_token) return res.sendStatus(204);
  
    // Kalau user ketemu, ambil user id
    const userId = user.id;
  
    // Hapus refresh token dari DB berdasarkan user id tadi
    await User.update(
      { refresh_token: null },
      {
        where: {
          id: userId,
        },
      }
    );
  
    // Ngehapus cookies yg tersimpan
    res.clearCookie("refreshToken");
    return res.sendStatus(200);
  }

export { login, logout, getUser, register };