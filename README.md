![Header](https://capsule-render.vercel.app/api?type=waving&color=0:1a1a2e,100:16213e&height=200&section=header&text=Money%20Lending%20Management%20System&fontSize=36&fontColor=ffffff&fontAlignY=38&desc=A%20Full-Stack%20Loan%20Management%20Platform&descAlignY=58&descSize=16&animation=fadeIn)

<div align="center">

[![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![C#](https://img.shields.io/badge/C%23_ASP.NET_MVC-512BD4?style=for-the-badge&logo=dotnet&logoColor=white)](https://dotnet.microsoft.com/)
[![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)
[![JWT](https://img.shields.io/badge/JWT_Auth-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)](https://jwt.io/)

</div>

---

## 📌 Overview

The **Money Lending Management System** is a full-stack web application designed to streamline and manage the end-to-end loan lifecycle for a lending business. The system supports two distinct user roles — **Admin** and **Borrower** — each with a dedicated interface and a tailored set of responsibilities. Admins have full control over loan products, applications, and repayments, while Borrowers can browse loan products, submit applications, and manage their repayment schedules independently.

---

## 🏗️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js |
| Backend | C# ASP.NET MVC |
| Database | MySQL |
| Authentication | JWT (JSON Web Tokens) |
| API Communication | REST API |

---

## 👥 User Roles

### 🔐 Admin
The Admin is the primary operator of the system with full oversight and control over all lending operations.

**Loan Product Management**
- ➕ Create and configure loan products with defined interest rates, terms, and conditions
- 📋 View and manage all available loan products in the system

**Loan Application Management**
- 📥 View all loan applications submitted by borrowers
- ✅ Accept or ❌ reject borrower loan applications based on eligibility
- 🏦 Create and issue loans for borrowers upon application approval

**Repayment & Payment Management**
- 📊 View the full repayment schedule for every loan issued to borrowers
- 💳 Manage and allocate borrower payments against their outstanding loan balances
- 🔍 Monitor payment histories, outstanding balances, and allocation breakdowns for each borrower

---

### 👤 Borrower
The Borrower has access to a self-service portal to manage their loan journey from application to repayment.

**Loan Products**
- 🏷️ Browse and view all active loan products available in the system

**Loan Applications**
- 📝 Submit loan applications for a desired loan product
- 📂 Track the status of submitted applications (Pending / Approved / Rejected)

**Repayment Schedules**
- 📅 View the full repayment schedule for each of their active loans
- 💰 Make payments for individual repayment installments directly through the system

**Payment Allocations**
- 📒 View a detailed breakdown of payment allocations per loan
- 🔢 Track outstanding balances, amounts paid, and remaining installments in real time

---

## 🚀 Getting Started

### Prerequisites
Make sure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (v16 or above)
- [npm](https://www.npmjs.com/)
- [Visual Studio](https://visualstudio.microsoft.com/) or [VS Code](https://code.visualstudio.com/)
- [MySQL](https://www.mysql.com/) database server

---

### ⚙️ Frontend Setup (React)

**1. Navigate to the frontend directory**
```bash
cd frontend
```

**2. Install all dependencies**
```bash
npm install
```

**3. Start the development server**
```bash
npm start
```

The app will run at **http://localhost:3000** by default.

---

### 🖥️ Backend Setup (C# ASP.NET MVC)

**1. Open the project in Visual Studio**

**2. Configure your database connection string in `appsettings.json`**
```json
"ConnectionStrings": {
  "DefaultConnection": "Server=localhost;Database=MoneyLendingDB;User=root;Password=yourpassword;"
}
```

**3. Run the database migrations to set up the schema**
```bash
Update-Database
```

**4. Build and run the backend**
```bash
dotnet run
```

The API will run at **http://localhost:5000** by default.

---

## 🗂️ Project Structure

```
MoneyLendingSystem/
│
├── frontend/                   # React.js frontend
│   ├── public/
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   ├── pages/              # Admin & Borrower pages
│   │   ├── services/           # API service calls
│   │   └── App.js
│   └── package.json
│
├── backend/                    # C# ASP.NET MVC backend
│   ├── Controllers/            # API controllers
│   ├── Models/                 # Database models
│   ├── Services/               # Business logic
│   ├── Migrations/             # Database migrations
│   └── appsettings.json
│
└── README.md
```

---

## ✨ Key Features Summary

| Feature | Admin | Borrower |
|---|:---:|:---:|
| Create Loan Products | ✅ | ❌ |
| View Loan Products | ✅ | ✅ |
| Submit Loan Application | ❌ | ✅ |
| Accept / Reject Applications | ✅ | ❌ |
| Issue Loans | ✅ | ❌ |
| View Repayment Schedules | ✅ (All) | ✅ (Own) |
| Make Payments | ❌ | ✅ |
| Manage Payment Allocations | ✅ | ✅ (View Only) |
| Multi-Role Authentication (JWT) | ✅ | ✅ |

---

## 📫 Contact

Built by **Gamith Ranasinghe**

📧 [gamithranasinghe001@gmail.com](mailto:gamithranasinghe001@gmail.com)
🔗 [LinkedIn](https://linkedin.com/in/gamith-ranasinghe)
💻 [GitHub](https://github.com/Gamibro)

![Footer](https://capsule-render.vercel.app/api?type=waving&color=0:16213e,100:1a1a2e&height=120&section=footer&animation=fadeIn)
