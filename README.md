
# 💰 Expense Tracker (Full Stack Project)

A full-featured personal **Expense Tracker** app to help users manage and visualize their monthly spending. Users can:

- Add, view, update, and delete expenses
- Set monthly budgets for different categories
- Receive alerts when spending exceeds 80% or 100% of a budget
- View spending summaries and trends using interactive charts

Built using:

- **Frontend**: React + TypeScript + Tailwind CSS
- **Backend**: Node.js + Express + TypeScript
- **Database**: MongoDB Atlas
- **Deployment**: Vercel (Frontend), Render (Backend)

---

## 🚀 Live Demo

**Frontend**: [https://expense-tracker2-two.vercel.app/](https://expense-tracker2-two.vercel.app/)  

### 🔐 Test Login

```

Email: [hello@gmail.com]
Password: hello@123

````

---

## 🧪 Environment Variables

### 🔐 Backend `.env` file (`Backend/.env`)

```env
MONGO_URL=mongodb+srv://randomuser:randompass@cluster0.random.mongodb.net/
JWT_SECRET=randomsecret123
````

### 🌍 Frontend `.env` file (`Frontend/.env`)

```env
VITE_BASE_URL=https://your-backend-url.com/api/v1
```

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/rachitkhandelwal41/Expense_tracker.git
cd Expense_tracker
```

---

## 📦 Backend Setup

```bash
cd Backend
npm install
```

### Update `tsconfig.json` in the `Backend` folder:

```json
{
  "compilerOptions": {
    "rootDir": "./src",
    "outDir": "./dist",
    "target": "ES2020",
    "module": "CommonJS",
    "moduleResolution": "Node",
    "esModuleInterop": true,
    "strict": true
  }
}
```

### Build TypeScript and Start the Server:

```bash
npx tsc
node dist/index.js
```

> Your backend should now be running at:
> `http://localhost:3000`

---

## 💻 Frontend Setup

```bash
cd Frontend
npm install
npm run dev
```

> Frontend will be available at:
> `http://localhost:5173`

---

## 🔧 Budget Feature Note

In the Budget page/component, manually insert the deployed backend URL (e.g., `/budget/set`, `/budget/alerts`) where required.

---

## 🛠️ Build Frontend for Production

```bash
cd Frontend
npm run build
```

Build output will be in the `dist/` folder.

---

## 📤 Deployment Info

### 🔁 Backend (Render)

* Root Directory: `Backend/`
* Install Command: `npm install`
* Build Command: `npx tsc`
* Start Command: `node dist/index.js`
* Add environment variables (`MONGO_URL`, `JWT_SECRET`) in Render dashboard

### 🌐 Frontend (Vercel)

* Root Directory: `Frontend/`
* Framework: **Vite**
* Build Command: `npm run build`
* Output Directory: `dist`
* Add env variable:

```env
VITE_BASE_URL=https://your-backend-url.com/api/v1
```

---

## ✅ Features

* ✅ Store and manage expenses by category
* ✅ Add, update, and delete expenses
* ✅ Set and update monthly budgets per category
* ✅ Alerts when spending exceeds 80% or 100% of budget
* ✅ Visualize data through category-wise pie charts and monthly trends using line graphs
* ✅ Authentication using JWT
* ✅ Clean, responsive UI built with Tailwind CSS

---

## 👨‍💻 Author

**Rachit Khandelwal**
GitHub: [@rachitkhandelwal41](https://github.com/rachitkhandelwal41)

---

```

```
