const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');

exports.register = async (data) => {
  const existingUser = await prisma.user.findUnique({
    where:{ email : data.email },
  });
  if (existingUser) {
    return { error: 'อีเมลนี้มีในระบบอยู่แล้ว' };
  }
  const hashedPassword = await bcrypt.hash(data.password, 10);
  const user = await prisma.user.create({
    data: {
      name : data.name,
      email : data.email,
      password: hashedPassword,
      roleId: 1
    },
  });
  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      roleId: user.roleId,
    },
  };
};
exports.login = async (data) => {
  const user = await prisma.user.findUnique({
    where: { email: data.email },
  });
  if (!user) {
    return { error: 'ไม่พบผู้ใช้ที่มีอีเมลนี้' };
  }
  const isPasswordValid = await bcrypt.compare(data.password, user.password);
  if (!isPasswordValid) {
    return { error: 'รหัสผ่านไม่ถูกต้อง' };
  }
  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      roleId : user.roleId
    },
  };
}
