# 🏥 Health Data Locker

A **patient-centric digital health record system** built with **Node.js, Express.js, and MongoDB**, designed to securely store, manage, and share medical documents. Patients can upload prescriptions, lab reports, and diagnostic files, and securely share them with doctors. In emergencies, essential health information is accessible instantly via a **QR code**.

---

## 🚀 Features Implemented

### 🔐 Authentication & Authorization

* User registration & login with **JWT-based authentication**.
* Passwords secured using **bcrypt hashing**.
* Middleware (`authMiddleware`) ensures only authenticated users can access protected routes.

---

### 👤 Patient Medical Details

* Schema for **personal and medical info** (name, DOB, blood group, emergency contact, etc.).
* **Automatic age calculation** from DOB.
* APIs to save and fetch patient details securely.

---

### 📂 Medical Records Upload

* Schema for records:

  * `fileName`, `fileType`, `filePath`, `doctorName`, `description`, `uploadedAt`.
* **Cloudinary + Multer integration** for secure file uploads.
* **Custom filename format** → `FileType_YYYY-MM-DD`.
* API to fetch records sorted by **latest date first**.

---

### 🔗 Sharing Records

* Generate **secure shareable links** for individual records.
* Links use **JWT tokens** with **24h expiry**.
* Doctors/third parties can **view but not modify** shared records.
* Expired/invalid tokens automatically rejected.

---

### 🚑 Emergency Access

* Each patient gets a unique **emergencyToken (UUID)**.
* Special endpoint exposes:

  * **Basic patient details** (name, blood group, allergies, emergency contact).
  * **Last 6 months of medical records**.
* **QR code generation** for a **lifetime emergency link** (non-expiring).
* Doctors can scan the QR to instantly view essential details in emergencies.

---

## 🛠️ Tech Stack

* **Backend:** Node.js, Express.js
* **Database:** MongoDB (Mongoose ODM)
* **Authentication:** JWT, bcrypt
* **File Storage:** Cloudinary, Multer
* **Utilities:** UUID, QRCode

---

## 📌 Planned Next Features

* **AI-powered report summarization** (extract and simplify lab reports for quick insights).
* **Trends Dashboard** to visualize patient health metrics over time.
* **Doctor Portal** for streamlined access to shared reports.

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

```
PORT=3000
DATABASE_URL=your_mongo_url
JWT_SECRET=your_secret_key
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
```

### 4️⃣ Run the Server

```bash
npm start
```

Server runs on: **[http://localhost:3000/](http://localhost:3000/)**

---

## 📸 Demo Preview (Planned)

* Uploading medical records.
* Generating shareable links.
* Scanning QR code for emergency access.

---

## 👨‍💻 Author

Developed by **Anit Paul**.
