# 🏥 Health Data Locker

A **patient-centric digital health record system** built with **Node.js, Express.js, and MongoDB**, designed to securely store, manage, and share medical documents. Patients can upload prescriptions, lab reports, and diagnostic files, and securely share them with doctors.  

In emergencies, essential health information is accessible instantly via a **QR code**, and an **SMS alert is sent to the patient’s emergency contact** to notify them immediately.  

---

## 🚀 Features Implemented

### 🔐 Authentication & Authorization
- Secure user registration & login with **JWT-based authentication**.  
- Passwords hashed using **bcrypt**.  
- Protected APIs using middleware (`authMiddleware`).  

### 👤 Patient Medical Details
- Schema for **personal + medical info** (name, DOB, blood group, allergies, emergency contact, etc.).  
- **Automatic age calculation** from DOB.  
- APIs to save & fetch patient info securely.  

### 📂 Medical Records Upload
- Schema for uploaded records:  
  - `fileName`, `fileType`, `filePath`, `doctorName`, `description`, `uploadedAt`.  
- **Cloudinary + Multer integration** for secure uploads.  
- **Custom filename format** → `FileType_YYYY-MM-DD`.  
- Fetch records sorted by **latest first**.  

### 🔗 Sharing Records
- Generate **secure shareable links** for individual records.  
- Links protected with **JWT tokens** (24h expiry).  
- Doctors/third parties can **view only** (read-only access).  
- Automatic handling of expired/invalid tokens.  

### 🚑 Emergency Access
- Each patient has a unique **emergencyToken (UUID)**.  
- Emergency API provides:  
  - **Basic details** (blood group, allergies, emergency contact).  
  - **Last 6 months of medical records**.  
- **QR code generation** for a **lifetime emergency link** (non-expiring).  
- Doctors scan QR to instantly view patient info.  

📲 **New Feature:**  
- When the QR is scanned, an **SMS alert** is automatically sent to the patient’s **emergency contact number** using **Twilio**.  
- Keeps family/contacts informed in real emergencies.  

---

## 🛠️ Tech Stack
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB (Mongoose)  
- **Authentication:** JWT, bcrypt  
- **File Storage:** Cloudinary, Multer  
- **Utilities:** UUID, QRCode, Twilio  

---

## 📌 Planned Next Features
- **AI-powered report summarization** → Extract and simplify lab reports for quick insights.  
- **Trends Dashboard** → Visualize patient health metrics over time.  
- **Doctor Portal** → Centralized access for verified doctors to review patient data.  

---

## ⚡ Getting Started

### 1️⃣ Clone Repository
```bash
git clone https://github.com/your-username/health-data-locker.git
cd health-data-locker/backend
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Setup Environment Variables
Create a `.env` file in `/backend` with:

```env
PORT=3000
DATABASE_URL=your_mongo_url
JWT_SECRET=your_secret_key
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=your_twilio_phone_number
```

### 4️⃣ Run the Server
```bash
npm start
```

Server runs on: **[http://localhost:3000/](http://localhost:3000/)**  

---

## 📸 Demo Preview (Planned)
- Uploading medical records.  
- Generating shareable links.  
- Scanning QR code for emergency access.  
- Receiving SMS alert on emergency contact’s phone.  

---

## 👨‍💻 Author
Developed by **Anit Paul**.  
