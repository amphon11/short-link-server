# URL Shortener Application


## 📌 Overview
  - URL Shortener Application เป็นเครื่องมือสำหรับย่อ URL ที่พัฒนาด้วย TypeScript, Node.js, Express, และ Prisma ช่วยให้ผู้ใช้สามารถ:
  - ย่อ URL ยาว ๆ ให้สั้นลง
  - ติดตามจำนวนคลิกของผู้ใช้
  - สร้าง QR Code สำฟรับเข้าชม URL
  - เหมาะสำหรับการแชร์ลิงก์บนโซเชียลมีเดียและการตลาดดิจิทัล ✨

  - 
## 🚀 Features

1. **🔗 URL Shortening**
   - แปลง URL ยาวให้เป็นรหัสสั้น (short code) โดยใช้การเข้ารหัส Base-64
   - รองรับการสร้าง Short URL ซ้ำสำหรับ URL เดิมที่มีอยู่แล้ว
   - คืนค่า URL สั้นในรูปแบบ `https://your-domain.com/<shortCode>`
   - 
2. **📊 QR Code**
   - สร้าง QR Code สำหรับ รหัสสั้น (short code)
   - ติดตามจำนวนการเข้าชมของผู้ใช้
   - เข้าชม URL ผ่านทาง QR Code

3. **📊 Click Tracking**
   - บันทึกจำนวนครั้งที่ URL สั้นถูกคลิก
     
4. **📈 Analytics**
   - **Shorting URL**: แสดง Short URl แสดง ตัวอย่าง URL และ QR Code
   - **URL History**: แสดงรายการ URL ทั้งหมดที่เคยสร้าง จำนวนคลิก และวันที่สร้าง

5. **⚡ Scalability**
   - ใช้ Prisma ORM ร่วมกับ PostgreSQL เพื่อจัดการฐานข้อมูลแบบ scalable
   - รองรับการ deploy บน platform เช่น Render

## 🛠 Prerequisites

ก่อนติดตั้ง คุณต้องมีเครื่องมือและข้อมูลต่อไปนี้:

- **Node.js**: v18 หรือสูงกว่า
- **npm**: v9 หรือสูงกว่า
- **PostgreSQL**: ฐานข้อมูลสำหรับเก็บข้อมูล URL, Click วันที่สร้าง
- **Render Account**: ถ้าต้องการ deploy ออนไลน์


## 🔧 Installation (Local Development)

### 1️⃣ Clone Repository
```bash
git clone https://github.com/your-username/short-link.git
cd url-shortener
```
### 2️⃣ Install Dependencies
```bash
npm install
```
### 3️⃣ Setup Environment Variables
```bash
DATABASE_URL="postgresql://<username>:<password>@<host>:<port>/<dbname>?schema=public"
BASE_URL="your_server_domain"
CLIENT_URL="your_client_domain"
PORT=8080
```
📌 เปลี่ยนค่า <username>, <password>, <host>, <port>, <dbname> ตามฐานข้อมูลของคุณ

### 4️⃣ Setup Database
```bash
npx prisma migrate dev --name init
```
🔹 คำสั่งนี้จะสร้างตาราง ShortUrl ตาม schema ใน prisma/schema.prisma

### 5️⃣ Start the Application
```bash
npm start
```

🔹 แอปจะรันที่ http://localhost:8080
## 🎯 API Endpoints

Install the dependencies:

✂️ Shorten URL
```bash
POST http://localhost:8080/shorten
```
Body:
```bash
{
  "originalUrl": "https://example.com"
}
```
🔄 Redirect
```bash
GET http://localhost:8080/<shortCode>
```
🌍 Location Stats
```bash
GET http://localhost:8080/location-stats?shortCode=<shortCode>
```
📜 URL History
```bash
GET http://localhost:8080/history
```

```
├── package.json
├── package-lock.json (or pnpm-lock.yaml, or bun.lockb)
├── build/
│   ├── client/    # Static assets
│   └── server/    # Server-side code
```

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever CSS framework you prefer.

---

Built with ❤️ using React Router.
