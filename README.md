
# 💰 Expense Tracker (Full Stack Project)

A personal Expense Tracker built using:

- **Frontend**: React + TypeScript + Tailwind CSS
- **Backend**: Node.js + Express + TypeScript
- **Database**: MongoDB Atlas
- **Deployment**: Vercel (Frontend), Render (Backend)

---

🌐 Live URL

Frontend: [https://expense-tracker2-two.vercel.app/](#)  


---

## 🧪 Environment Variables

### 🔐 Backend `.env` file

Create a `.env` file inside the `Backend/` directory:

```

MONGO\_URL=""/
JWT\_SECRET=""

```

### 🌍 Frontend `.env` file

Create a `.env` file inside the `Frontend/` directory:

```

VITE\_BASE\_URL=[])

````

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/rachitkhandelwal41/Expense_tracker.git
cd Expense_tracker
````

---

## 📦 Backend Setup

### Step-by-step:

```bash
cd Backend
npm install
```

Update your `tsconfig.json` in the `Backend/` folder like this:

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

### Compile TypeScript to JavaScript:

```bash
npx tsc
```

### Start the server:

```bash
node dist/index.js
```

Your backend should now be running on:
**[http://localhost:3000](http://localhost:3000)**

---

## 💻 Frontend Setup

```bash
cd Frontend
npm install
npm run dev
```

Frontend will be available at:
**[http://localhost:5173](http://localhost:5173)**

---

## 🔧 Hardcoded Budget URLs

In your **budget page/component**, hardcode the following API endpoints:

* **Set Budget:**

```
https://expense-tracker-gp93.onrender.com/api/v1/user/budget/set
```

* **Get Alerts:**

```
https://expense-tracker-gp333.onrender.com/api/v1/user/budget/alerts
```

These endpoints will connect to your deployed backend directly.

---

## 🪄 Build Frontend for Production

If you want to build the frontend for deployment (e.g. for Vercel):

```bash
cd Frontend
npm run build
```

This will output the production-ready files to the `/dist` directory.

---

## 📤 Deployment Info

### Render (Backend)

* Use the **`Backend/`** as root folder
* Install command: `npm install`
* Build command: `npx tsc`
* Start command: `node dist/index.js`
* Add environment variables in Render dashboard

### Vercel (Frontend)

* Use the **`Frontend/`** folder
* Framework: `Vite`
* Build command: `npm run build`
* Output directory: `dist`
* Add env var:

  ```
  
  ```

---

## ✅ Features

* Set monthly budgets per category
* Add expenses by category and date
* Budget alerts when spending exceeds 80% or 100%
* JWT-based user authentication
* Clean, responsive UI with Tailwind CSS

---

## 🧠 Author

**Rachit Khandelwal**

GitHub: [@rachitkhandelwal41](https://github.com/rachitkhandelwal41)

---

```

```
