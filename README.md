# 🎨 BioLogist Frontend (React)

## 📌 Description

BioLogist Frontend is a React-based user interface for an e-commerce platform focused on molecular biology products. It interacts with a Django REST backend to fetch and display data dynamically, enabling users to browse products, manage their cart, and place orders.

---

## 🚀 Features

* 🛍️ Product Listing (Dynamic from backend)
* ➕ Add to Cart functionality
* 🔄 Real-time data updates using APIs
* 📱 Responsive UI design
* 🔗 Seamless integration with Django REST API

---

## 🛠️ Tech Stack

* React.js
* JavaScript (ES6+)
* HTML5, CSS3
* Axios / Fetch API
* REST API Integration

---

## 📂 Project Structure

```
src/
 ├── components/     # Reusable UI components
 ├── pages/          # Main pages (Home, Cart, etc.)
 ├── services/       # API calls and backend communication
 ├── App.js          # Main app component
 ├── index.js        # Entry point
```

---

## 🔗 API Integration

The frontend communicates with the Django backend via REST APIs.

### Example API Call:

```javascript
fetch("http://127.0.0.1:8000/products/")
  .then(response => response.json())
  .then(data => console.log(data));
```

### API Usage:

* Fetch product list
* Add items to cart
* Place orders

---

## ⚙️ State Management

* React Hooks (`useState`, `useEffect`) used for:

  * Managing product data
  * Updating UI dynamically
  * Handling API responses

### Example:

```javascript
useEffect(() => {
  fetchProducts();
}, []);
```

---

## 🎯 Key Functional Flow

1. Frontend sends request to backend API
2. Backend returns JSON data
3. Data is stored in state
4. UI updates dynamically

---

## ▶️ How to Run the Project

### Step 1: Install dependencies

```bash
npm install
```

### Step 2: Start development server

```bash
npm start
```

### Step 3: Open in browser

```
http://localhost:3000
```

---

## 📡 Backend Connection

Make sure the Django backend is running at:

```
http://127.0.0.1:8000/
```

All API requests are sent to this server.

---

---

## ⚠️ Known Limitations

* No authentication (login/signup) implemented
* Basic UI (can be enhanced)
* No payment gateway integration

---

## 🚀 Future Improvements

* 🔐 User Authentication (Login/Signup)
* 💳 Payment Integration
* 🎨 Improved UI/UX
* 🌐 Deployment (Vercel / Netlify)

---

## 👨‍💻 Author

Priyanshu Negi
B.Tech CSE (AI/ML)
Python / Django Developer
