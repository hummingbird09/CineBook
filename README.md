CineBook - A MERN Stack Movie Ticket Booking Application
CineBook is a full-stack web application for browsing movies, viewing details, registering users, logging in, booking tickets, and managing booking history. It's built using the MERN (MongoDB, Express.js, React, Node.js) stack, providing a robust and scalable solution for online movie ticket reservations.

✨ Features
Movie Browsing: View a list of available movies with essential details like genre, description, duration, and rating.

Movie Details: Click on any movie to see comprehensive information including director, cast, showtimes, and ticket price.

User Authentication:

Registration: Create a new user account with secure password hashing (using bcryptjs).

Login: Authenticate users with JWT (JSON Web Tokens) for secure session management.

Logout: Securely end user sessions.

Ticket Booking:

Select showtimes and number of tickets for any movie.

Authenticated users can confirm bookings, with automatic price calculation.

Booking History: Logged-in users can view a personalized list of all their past and current bookings.

Cancel Booking: Users can cancel their own active bookings from their history.

Responsive Design: Basic styling ensures usability across different devices.

MongoDB Atlas Integration: Cloud-hosted database for persistent data storage.

🚀 Technologies Used
Backend (Node.js/Express.js)

Node.js: JavaScript runtime environment.

Express.js: Web application framework for Node.js.

MongoDB: NoSQL database for storing movie and user data.

Mongoose: ODM (Object Data Modeling) library for MongoDB and Node.js.

bcryptjs: For hashing and salting passwords securely.

jsonwebtoken (JWT): For creating and verifying authentication tokens.

dotenv: For loading environment variables from a .env file.

cors: For enabling Cross-Origin Resource Sharing.

Frontend (React)

React: JavaScript library for building user interfaces.

React Hooks: For managing state and side effects in functional components.

fetch API: For making HTTP requests to the backend.

localStorage: For persisting user login state.

Standard CSS (Inline/index.css): For styling and responsiveness.

⚙️ Setup and Installation
Follow these steps to get CineBook up and running on your local machine.

Prerequisites
Node.js (v14 or higher recommended) & npm (comes with Node.js)

MongoDB Atlas Account (or a local MongoDB instance)

Postman (or similar API testing tool) for initial movie data seeding

1. Clone the Repository
First, clone this repository to your local machine:

git clone https://github.com/YOUR_USERNAME/CineBook.git
cd CineBook

(Replace YOUR_USERNAME with your actual GitHub username)

2. Backend Setup
Navigate into the backend directory and set up the server.

cd backend
npm install

Create a .env file in the backend directory:
This file will store your sensitive environment variables.

# backend/.env

MONGO_URI=your_mongodb_atlas_connection_string_here
PORT=5000
JWT_SECRET=a_very_long_and_random_string_for_jwt_security

MONGO_URI: Get this from your MongoDB Atlas cluster (Network Access must allow your IP, and Database Access must have a user). It will look something like mongodb+srv://<username>:<password>@clustername.mongodb.net/?retryWrites=true&w=majority&appName=YourAppName.

JWT_SECRET: Generate a strong, random string. You can use node -e "console.log(require('crypto').randomBytes(32).toString('hex'))" in your terminal to generate one.

Start the Backend Server:

node server.js

The server should start on http://localhost:5000 and connect to MongoDB.

3. Frontend Setup
Open a new terminal window, navigate to the frontend directory.

cd ../frontend # Go back to the root, then into frontend
npm install

Start the Frontend Development Server:

npm start

The React app should open in your browser at http://localhost:3000.

4. Seed Initial Movie Data (Using Postman)
Your application needs movie data to display. Use Postman to add movies to your database.

Backend Endpoint: http://localhost:5000/api/movies
Method: POST
Headers: Content-Type: application/json
Body: Select raw and JSON. Use the following JSON array, sending each movie object as a separate POST request.

[
  {
    "title": "Oldboy",
    "genre": "Action, Mystery, Thriller",
    "description": "After being kidnapped and imprisoned for fifteen years, Oh Dae-Su is suddenly released, and he must find his captor in five days.",
    "imageUrl": "https://placehold.co/400x600/000000/FFFFFF?text=Oldboy",
    "duration": "2h 0m",
    "rating": "R",
    "director": "Park Chan-wook",
    "cast": ["Choi Min-sik", "Yoo Ji-tae", "Kang Hye-jung"],
    "showtimes": ["09:00 PM", "11:30 PM"],
    "ticketPrice": 12.50
  },
  {
    "title": "Jab We Met",
    "genre": "Comedy, Drama, Romance",
    "description": "A heartbroken businessman meets a lively and free-spirited woman on a train journey, leading to an unexpected adventure and self-discovery.",
    "imageUrl": "https://placehold.co/400x600/000000/FFFFFF?text=Jab+We+Met",
    "duration": "2h 35m",
    "rating": "PG",
    "director": "Imtiaz Ali",
    "cast": ["Shahid Kapoor", "Kareena Kapoor"],
    "showtimes": ["10:00 AM", "01:00 PM", "04:00 PM", "07:00 PM"],
    "ticketPrice": 10.00
  },
  {
    "title": "Schindler's List",
    "genre": "Biography, Drama, History",
    "description": "In German-occupied Poland during World War II, industrialist Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.",
    "imageUrl": "https://placehold.co/400x600/000000/FFFFFF?text=Schindler's+List",
    "duration": "3h 15m",
    "rating": "R",
    "director": "Steven Spielberg",
    "cast": ["Liam Neeson", "Ben Kingsley", "Ralph Fiennes"],
    "showtimes": ["06:00 PM", "09:45 PM"],
    "ticketPrice": 15.00
  },
  {
    "title": "Attack on Titan Movie: Crimson Bow and Arrow",
    "genre": "Animation, Action, Adventure",
    "description": "Recap of the first 13 episodes of the Attack on Titan anime series, focusing on the events of the Trost District arc.",
    "imageUrl": "https://placehold.co/400x600/000000/FFFFFF?text=Attack+on+Titan",
    "duration": "2h 0m",
    "rating": "R",
    "director": "Tetsuro Araki",
    "cast": ["Yuki Kaji", "Yui Ishikawa", "Marina Inoue"],
    "showtimes": ["02:00 PM", "05:00 PM", "08:00 PM"],
    "ticketPrice": 11.00
  },
  {
    "title": "The Conjuring",
    "genre": "Horror, Mystery, Thriller",
    "description": "Paranormal investigators Ed and Lorraine Warren work to help a family terrorized by a dark presence in their farmhouse.",
    "imageUrl": "https://placehold.co/400x600/000000/FFFFFF?text=The+Conjuring",
    "duration": "1h 52m",
    "rating": "R",
    "director": "James Wan",
    "cast": ["Patrick Wilson", "Vera Farmiga", "Lili Taylor"],
    "showtimes": ["07:30 PM", "10:00 PM", "12:30 AM"],
    "ticketPrice": 13.00
  },
  {
    "title": "Taare Zameen Par",
    "genre": "Drama, Family",
    "description": "An eight-year-old boy is thought to be a lazy troublemaker, until the new art teacher has the patience and compassion to discover the real problem behind his struggles.",
    "imageUrl": "https://placehold.co/400x600/000000/FFFFFF?text=Taare+Zameen+Par",
    "duration": "2h 45m",
    "rating": "PG",
    "director": "Aamir Khan",
    "cast": ["Darsheel Safary", "Aamir Khan", "Tisca Chopra"],
    "showtimes": ["11:00 AM", "02:30 PM", "06:00 PM"],
    "ticketPrice": 9.50
  }
]

🎬 Usage
Browse Movies: Visit http://localhost:3000 to see the list of movies.

Register/Login: Click "Login / Register" in the navigation bar to create a new account or log in with an existing one.

Book Tickets: Once logged in, click "Book Now" on a movie, select showtime and tickets, then "Confirm Booking".

View Bookings: Click "My Bookings" in the navigation bar to see your booking history.

Cancel Bookings: From "My Bookings", click "Cancel Booking" on any item to remove it.

💡 Future Enhancements
Seat Selection: Allow users to pick specific seats.

Payment Gateway Integration: Integrate a real payment system.

Admin Dashboard: A dedicated interface for movie management (add, edit, delete movies).

Search and Filters: Implement robust search and filtering options for movies.

User Profile Management: Allow users to update their profile information.

Email Notifications: Send booking confirmations and cancellation emails.

📄 License
This project is licensed under the MIT License - see the LICENSE file for details (if you create one, otherwise omit this line).
