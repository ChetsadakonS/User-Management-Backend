const userService = require('../services/user.service');

exports.getUsers = async (req, res) => {
  const users = await userService.getAllUsers();
  res.json(users);
};
exports.AddUser = async (req, res) => {
  const result = await userService.AddUser(req.body);
  if (result.error || !result.user) {
    return res.status(400).json({ message: result.error });
  }
  return res.status(201).json({
    message: 'ลงทะเบียนสำเร็จ'
  });
};

exports.deleteUser = async (req, res) => {
  const result = await userService.deleteUser(req.params.id);
  if (result.error) {
    return res.status(404).json({ message: result.error });
  }
   return res.status(200).json({ message: "ลบผู้ใช้งานสำเร็จ"});
};


exports.getUserById = async (req, res) => {
  const result = await userService.getUsersbyId(req.params.id);

  if (result.error) {
    return res.status(404).json({ message: result.error });
  }

  return res.status(200).json({ user: result });
};


exports.getAllRole = async (req, res) => {
  const AllRole = await userService.getAllRole();
  res.json(AllRole);
};

exports.updateUser = async (req, res) => {

  const result = await userService.updateUser(req.body);
  if (result.error) {
    return res.status(404).json({ message: result.error });
  }
  res.json({ message: 'อัปเดตข้อมูลผู้ใช้สำเร็จ' });
};

exports.deleteUser = async (req, res) => {

  const result = await userService.deleteUser(req.params.id);
  if (result.error) {
    return res.status(404).json({ message: result.error });
  }
  res.json({ message: 'ลบผู้ใช้งานสำเร็จ' });
};


