# URL Shortener Application

<div align="center">
   <img src="https://res.cloudinary.com/dmqhlua4l/image/upload/v1743657289/dog_ww5kk7.jpg" width="400">
</div>

## 📌 Overview

URL Shortener Application เป็นเครื่องมือสำหรับย่อ URL ที่พัฒนาด้วย **TypeScript, Node.js, Express และ Prisma**  
ช่วยให้ผู้ใช้สามารถ:

- ✂️ **ย่อ URL** ยาว ๆ ให้สั้นลง
- 📊 **ติดตามจำนวนคลิก** ของผู้ใช้
- 🏷️ **สร้าง QR Code** สำหรับเข้าชม URL
- ⚡ **เหมาะสำหรับการแชร์ลิงก์บนโซเชียลมีเดีย และการตลาดดิจิทัล**

## 🚀 Features

1. **🔗 URL Shortening**
   - แปลง URL ยาวให้เป็นรหัสสั้น (short code) โดยใช้การเข้ารหัส Base-64
   - รองรับการสร้าง Short URL ซ้ำสำหรับ URL เดิมที่มีอยู่แล้ว
   - คืนค่า URL สั้นในรูปแบบ `https://your-domain.com/<shortCode>`
     
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

## 🛠 Tech Stack  

### **Backend**
- [Node.js](https://nodejs.org/) - JavaScript runtime สำหรับรันเซิร์ฟเวอร์  
- [Express.js](https://expressjs.com/) - Web framework สำหรับสร้าง API  
- [Prisma](https://www.prisma.io/) - ORM สำหรับจัดการฐานข้อมูล  
- [Shortid](https://www.npmjs.com/package/shortid) - ใช้สร้างรหัสย่อของ URL  
- [QRCode](https://www.npmjs.com/package/qrcode) - สร้าง QR Code สำหรับ Short URL  
- [Axios](https://axios-http.com/) - ใช้ตรวจสอบ URL
- 
## 🛠 Prerequisites

ก่อนติดตั้ง คุณต้องมีเครื่องมือและข้อมูลต่อไปนี้:

- **Node.js**: v18 หรือสูงกว่า
- **npm**: v9 หรือสูงกว่า
- **PostgreSQL**: ฐานข้อมูลสำหรับเก็บข้อมูล URL, Click วันที่สร้าง
- **Render Account**: ถ้าต้องการ deploy ออนไลน์


## 🔧 Installation (Local Development)

### 1️⃣ Clone Repository
```bash
git clone https://github.com/your-username/short-link-server.git
cd short-link-server
```
### 2️⃣ Install Dependencies
```bash
npm install
```
### 3️⃣ Setup Environment Variables
```bash
DATABASE_URL="postgresql://<username>:<password>@<host>:<port>/<dbname>?schema=public"
BASE_URL="your_server_domain"
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

🔹 แอปจะรันที่ http://localhost:8000

## 🎯 API Endpoints

Install the dependencies:

✂️ Shorten URL
```bash
POST http://localhost:8080/api/shorten
```
Body:
```bash
{
  "originalUrl": "https://example.com"
}
```
Reaponse:
```bash
{
  "shortUrl": "http://localhost:8080/api/abc123",
  "qrCode": "data:image/png;base64,..."
}
```

🔄 Redirect
```bash
GET http://localhost:8080/api/:shortCode
```
ใช้เพื่อเปลี่ยนเส้นทางไปยัง Original URL

📊 Clicks Count
```bash
GET http://localhost:8080/api/clicks/:shortCode
```
ดูจำนวนครั้งที่มีคนคลิกลิงก์

📜 URL History
```bash
GET http://localhost:8080/api/listUrl
```
ดึงประวัติ URL ที่เคยย่อ

## Database Schema: ShortUrl

ตาราง `ShortUrl` ใช้สำหรับจัดเก็บข้อมูลของ URL ที่ถูกย่อ  

| Column     | Type      | Description                         |
|------------|----------|-------------------------------------|
| `id`       | `Int`    | **Primary Key (PK)**, รหัสเฉพาะของแต่ละแถว |
| `originalUrl` | `String` | URL ต้นฉบับที่ถูกย่อ |
| `shortCode`  | `String` | รหัสที่ใช้ย่อลิงก์ (**Unique**) |
| `createAt`   | `DateTime` | วันที่และเวลาที่สร้างข้อมูลนี้ |
| `updateAt`   | `DateTime` | วันที่และเวลาที่มีการอัปเดตล่าสุด |
| `clicks`     | `Int`    | จำนวนครั้งที่มีการเข้าถึงลิงก์ |

### ER Diagram
<div align="center">
  <img src="https://res.cloudinary.com/dmqhlua4l/image/upload/v1743659767/Blank_diagram_8_tghd1u.png">
</div>

**หมายเหตุ:**
- `id` เป็น **Primary Key (PK)**
- `shortCode` ต้องเป็น **Unique** เพื่อป้องกันค่าซ้ำ  
- `clicks` ใช้เก็บจำนวนการเข้าถึงลิงก์ที่ถูกย่อ

## Data Flow Diagram (DFD)

ระบบ Web ShortURL ทำงานโดยมีขั้นตอนดังนี้:

1. **ผู้ใช้ป้อน URL ต้นฉบับ (Original URL)** และส่งไปยัง Web ShortURL
2. **ระบบสร้าง Short URL** และส่งกลับไปยังผู้ใช้
3. **เมื่อมีคนคลิก Short URL**, ระบบจะตรวจสอบและเปลี่ยนเส้นทางไปยัง Original URL
4. **ผู้ใช้สามารถขอดูประวัติ URL ที่เคยย่อ** และระบบจะแสดงข้อมูล
5. **ระบบสามารถส่งจำนวนคลิก (Total Clicks) และ QR Code** ให้ผู้ใช้
6. **ผู้ใช้สามารถร้องขอ URL History** และระบบจะแสดงข้อมูลทั้งหมด

### Diagram
<div align="center">
  <img src="https://res.cloudinary.com/dmqhlua4l/image/upload/v1743659229/Blank_diagram_7_oqrygf.png">
</div>


## Project Structure
bash
Copy
Edit

```
├── src/
│   ├── routes/          # ไฟล์ API routes
│   │   ├── urlRoutes.js
│   ├── prisma/          # Schema & migrations
│   ├── controllers/     # Logic ของ API
│   ├── services/        # Business Logic
│   ├── utils/           # Helper functions
│   ├── server.js        # Main server file
│   ├── .env             # Environment Variables
├── package.json
├── prisma/schema.prisma # Prisma Schema

```

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever CSS framework you prefer.

---

## 🔗 Links
- **Client Repository:** [Short link client side](https://github.com/amphon11/short-link)
- **Server Repository:** [Short link server side](https://github.com/amphon11/server)

Built with ❤️ using React Router.
