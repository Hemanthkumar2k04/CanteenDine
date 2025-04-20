# 🍔 CanteenDine - Fast Food Billing System

### This is a full-stack application designed to streamline fast food ordering and billing. The system allows users to browse dishes, add them to a cart, proceed with checkout, and log transactions. The project uses Flask for the backend, React for the frontend, and MongoDB for the database.

## 📋 Features
🍽️ Browse Dishes – View available dishes with images, descriptions, and prices

🛒 Cart Management – Add or remove dishes from the cart with ease

📇 Place Orders – Provide basic user info like 👤 name and 📞 phone number at checkout

💳 Make Payment – Complete payment and store transaction details securely

📜 View History – Access transaction history for administrative purposes

## 🚀 Getting Started
1. **📦 Clone the Repository**
```
git clone https://github.com/your-username/fast-food-billing-system.git
cd fast-food-billing-system
```
2. **⚙️ Backend Setup (Flask)**
Make sure Python is installed.

Run the Flask server:
```
python server.py
```
or
```
py server.py
```
This will start the backend on the default port (e.g., _http://localhost:5000_).

3. **🎨 Frontend Setup (React)**
Navigate to the frontend directory:
```
cd frontend
```
Install the dependencies:
```
npm install
```
Run the frontend:
```
npm run dev
```
React app will run on _http://localhost:5173_ (or your default Vite port).

4. **🗃️ MongoDB Setup**
Create a MongoDB database named:
#### canteen_dine

Create the following collections:
Dishes :
- Name (string)
- Description (string)
- Price (number)
- Image (string / image URL or encoded image)

Users :
- name (string)
- phone (string)
- Created at - timestamp

Orders :
- Cart details 
- User details
- Transaction id
- Total amount

Transactions :
- User ID
- Payment details
- Payment method
- Payment status 

<ins>Structure for dishes collection:</ins>
```
{
  "name": "Dish Name",
  "description": "A short description of the dish",
  "price": 100,
  "image": "image_url_or_filename"
}
```

Make sure your MongoDB is running and the connection string in your Flask app (server.py) points to your MongoDB instance.

## ***🔥 Note:***
- Make sure MongoDB is running before starting the backend.
- Images of dishes can be stored either as URLs or in base64 format depending on how you handle them on the frontend.

## 🤝 Contributing

This is an open-source project, and we welcome contributions from everyone! 🙌  
Feel free to **fork** the repository, create a **branch**, and submit a **pull request**.

Whether it's fixing bugs 🐞, improving the UI 🎨, or adding new features 🚀 — all contributions are appreciated!

If you have suggestions or spot any issues, don’t hesitate to open an issue 📬.

Let’s build something awesome together! 💡✨
