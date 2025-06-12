# 🧑‍💼 User Management System


ระบบจัดการผู้ใช้ (User Management System) สำหรับฝั่ง Backend พัฒนาโดยใช้ express.js, PostgreSQL, และ Prisma รองรับการสมัครสมาชิก, เข้าสู่ระบบ, เข้ารหัสรหัสผ่าน, การยืนยันตัวตนด้วย JWT,และการจัดการผู้ใช้งาน

## เทคโนโลยีที่ใช้

โปรเจกต์นี้พัฒนาด้วย:

- Express.js – Framework สำหรับจัดการ API
- PostgreSQL – ฐานข้อมูล NoSQL 
- Prisma – สำหรับใช้งานร่วมกับ PostgreSQL
- JSON Web Token (JWT) – ใช้สำหรับการยืนยันตัวตนของผู้ใช้
- bcryptjs – สำหรับการเข้ารหัสรหัสผ่านอย่างปลอดภัย
- dotenv – จัดการ environment variables
- CORS – อนุญาตการเชื่อมต่อข้ามโดเมน (Frontend ↔ Backend)
  
## 📁 โครงสร้างโปรเจกต์
```
User-Management-Backend/
├── prisma/                 
├── src/
│   ├── controllers/       
│   ├── services/          
│   ├── app.js/            
│   └── server.js          
├── .env                   
├── package.json            
└── README.md
```          
## วิธีเริ่มต้นใช้งาน

1. Clone โปรเจกต์:

```bash
git clone https://github.com/ChetsadakonS/User-Management-Backend.git
cd User-Management-Backend
```
### 2. ติดตั้ง dependencies
```bash
npm install หรือ npm i
# หรือ
yarn install
```
### 3. ตั้งค่า prisma
```bash
npx prisma generate
```
### 4. รันเซิร์ฟเวอร์

```bash
node src/server.js
```
