🌍 UppGo — Uppsala Events Platform

UppGo is a web platform for discovering events happening in Uppsala, Sweden.

Users can explore events, search and filter them, and view event locations on a map.
Administrators can manage events through an admin dashboard.

This project uses a React frontend and a Laravel backend API.

🚀 Features
👥 Public Features

Browse events

Featured events carousel

Swipe-enabled carousel (mobile)

Search events

Filter by category

Filter by event type (Nations / Non-Nations)

Event detail page

Event map location

Responsive design

🛠 Admin Features

Admin login

Admin dashboard

Add event

Edit event

Delete event

Upload event images

Featured events for homepage

Automatic address → coordinates conversion

🧰 Tech Stack
Frontend

React

Vite

React Router

Axios

Tailwind CSS

Leaflet (Maps)

Backend

Laravel

PHP

MySQL

REST API

📁 Project Structure
uppgo/
│
├── uppgo-app        # React Frontend
│
└── uppgo-api        # Laravel Backend
⚙ Requirements

Make sure you have installed:

Node.js (v18+)

PHP (8.2+ recommended)

Composer

MySQL (XAMPP recommended)

Git

📥 Clone the Repository

If you don't have the project yet:

git clone https://github.com/YOUR_REPO/uppgo.git
cd uppgo

If you already have it:

git pull

🔧 Backend Setup (Laravel)

Navigate to backend folder:

cd uppgo-api

Install dependencies (first time only):

composer install

Create environment file:

copy .env.example .env

Generate Laravel key:

php artisan key:generate
🗄 Database Setup

Open .env and configure:

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=uppgo
DB_USERNAME=root
DB_PASSWORD=

Create a MySQL database called:

uppgo

Run migrations:

php artisan migrate

🖼 Enable Image Upload Storage

Run this command once:

php artisan storage:link

Images will be available at:

http://127.0.0.1:8000/storage/...

▶ Start Laravel Server
php artisan serve

Backend runs at:

http://127.0.0.1:8000

Example API endpoint:

http://127.0.0.1:8000/api/events

💻 Frontend Setup (React)

Open another terminal.

Navigate to frontend:

cd uppgo-app

Install dependencies (first time only):

npm install

Run development server:

npm run dev

Frontend runs at:

http://localhost:5173

🌐 Run the Full Project

Start both servers.

Terminal 1:

cd uppgo-api
php artisan serve

Terminal 2:

cd uppgo-app
npm run dev

Open in browser:

http://localhost:5173

🔐 Admin Login

Go to:

http://localhost:5173/login

Login credentials:

username: admin
password: admin123
🛠 Admin Panel

After login you can:

Admin Dashboard
   ├── Manage Events
   ├── Add Event
   ├── Edit Event
   └── Delete Event

Events created here are stored in the MySQL database.

🔗 API Endpoints
GET    /api/events
GET    /api/events/{id}
POST   /api/events
PUT    /api/events/{id}
DELETE /api/events/{id}

Featured events:

/api/events?featured=1
🗺 Map System

Event addresses are converted to coordinates using:

OpenStreetMap Nominatim API

Coordinates are stored in the database and displayed using Leaflet maps.

👨‍💻 Team Workflow

Pull latest updates:

git pull origin main

Create feature branch:

git checkout -b feature-name

Push changes:

git add .
git commit -m "feature description"
git push origin feature-name

Create a Pull Request on GitHub.

🔮 Future Improvements

Map view + list view toggle

User accounts

Event bookmarking

Admin analytics dashboard

🎓 Project

UppGo Project
Uppsala University
Information Systems Programme