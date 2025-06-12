const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');
const { error } = require('console');

exports.getAllUsers = () => {
  return prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
    },
    orderBy: {
      createdAt: 'asc', 
    },
  });
};

exports.AddUser = async (data) => {
  const existingUser = await prisma.user.findUnique({
    where: { email: data.email },
  });
  if (existingUser) {
    return { error: 'อีเมลนี้มีในระบบอยู่แล้ว' };
  }
  const hashedPassword = await bcrypt.hash(data.password, 10);
  const user = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: hashedPassword,
      roleId: data.roleId,
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


exports.getUsersbyId = async (id) => {
  const user = await prisma.user.findUnique({
    where : {id : Number(id)},
    include: {role :true},
  })
  if (!user) {
     return {error : "ไม่พบผู้ใช้"}
  }
  return {
      id: user.id,
      name: user.name,
      email: user.email,
      roleId: user.roleId,
      roleName: user.role?.name || null,
      createdAt : user.createdAt,
    };
}
exports.getAllRole = async (id) => {
   return prisma.role.findMany({
    select: {
      id: true,
      name: true,
      },
      orderBy: {
      id: 'asc', 
    },
  });
};

exports.updateUser = async (data) => {
  const user = await prisma.user.findUnique({
    where: { id: Number(data.id) },
  });
  if (!user) {
    return { error: "ไม่พบผู้ใช้ที่ต้องการแก้ไข" };
  }
  await prisma.user.update({
    where: { id: Number(data.id) },
    data: {
      name: data.name,
      email: data.email,
      roleId: data.roleId,
    },
  });
  return {
    success: true
  };
};
exports.deleteUser = async (id) => {
   const user = await prisma.user.findUnique({
    where: {id : Number(id) },
   });
   if (!user) {
    return {error : "ไม่พบผู้ใช้ที่ต้องการลบ"}
   }
   await prisma.user.delete({
    where: { id: Number(id) },
  });
 return {
    success: true
  };
};