const authService = require('../services/auth.service');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const result = await authService.register(req.body);
  if (result.error || !result.user) {
    return res.status(400).json({ message: result.error });
  }

  const userPayload = {
    id: result.user.id,
    name: result.user.name,
    email: result.user.email,
    roleId: result.user.roleId,
  };

  const token = jwt.sign(userPayload, process.env.JWT_SECRET, { expiresIn: '1h' });

  res.cookie('token', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 60 * 60 * 1000
  });

  return res.status(201).json({
    message: 'ลงทะเบียนสำเร็จ'
  });
};

exports.login = async (req, res) => {
  const result = await authService.login(req.body);
  if (result.error || !result.user) {
    return res.status(400).json({ message: result.error });
  }
  const userPayload = {
    id: result.user.id,
    name: result.user.name,
    email: result.user.email,
    roleId: result.user.roleId,
  };
  const token = jwt.sign(userPayload, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.cookie('token', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 60 * 60 * 1000
  });
  return res.status(200).json({
    message: 'เข้าสู่ระบบสำเร็จ'
  });
}

exports.getCurrentUser = (req, res) => {
  const { id, name, email, roleId } = req.user;
  return res.status(200).json({
    user: { id, name, email, roleId }
  })
}



//Middleware
exports.authMiddleware = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: 'ไม่พบ token' });
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = decoded;
  next();
};


exports.authMiddlewareadmin = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: 'ไม่พบ token' });
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if (decoded.roleId !== 2) {
    return res.status(403).json({ message: 'ใช้งานได้เฉพาะผู้ดูแลเท่านั้น' });
  }
  req.user = decoded;
  next();
};
