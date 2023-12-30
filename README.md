Betting Tips Platform
Welcome to the Betting Tips Platform repository! This project is a web application designed for managing and sharing betting tips. The platform consists of both frontend and backend components.

Frontend
Technologies Used:
React.js: A JavaScript library for building user interfaces.
Redux: State management for handling global application state.
Axios: A library for making HTTP requests to the backend.
Bootstrap or Material-UI: Styling libraries for creating a visually appealing user interface.
Components:
Navbar: Allows users to sign in, sign out, and search for different types.
TipList: Lists all active and expired tips.
ActiveTipItem: Displays information about active tips.
ExpiredTipItem: Displays information about expired tips with labels "winner" or "loser."
TipDetailPopup: Opens when "read more" is clicked, providing detailed information and comments.
Features:
Filtering and sorting of tips.
Like/Dislike functionality.
Display and addition of comments.
Backend
Technologies Used:
Node.js: JavaScript runtime for server-side development.
Express.js: Framework for creating APIs.
MongoDB: NoSQL database for storing tip and user information.
Mongoose: Object-Document Mapping (ORM) for MongoDB.
JWT: JSON Web Tokens for authentication.
Routes:
GET /tips: Fetches all tips.
POST /tips: Adds a new tip.
GET /tips/:id: Fetches a specific tip by ID.
PUT /tips/:id: Updates a specific tip.
DELETE /tips/:id: Deletes a specific tip.
POST /tips/:id/like: Adds a "like" to a specific tip.
POST /tips/:id/dislike: Adds a "dislike" to a specific tip.
POST /tips/:id/comment: Adds a comment to a specific tip.
Authentication routes for user management.
Database:
Tip Model:
Rivals
League
Sport
Date and time
Proposed tip and odds
Number of likes/dislikes
Description
Comments
User Model:
Username
Password
Email
Tips added by the user
User's like/dislike history
Authentication:
Implement JWT authentication to enable user authentication for adding, updating, and deleting tips.

Security:
Implement CORS policy.
Hash passwords before storing them in the database.
Input validation and protection against SQL injection attacks.
Getting Started
Clone the repository.
Install dependencies for both frontend and backend using npm install.
Set up MongoDB and configure the connection in the backend.
Run the frontend and backend servers using npm start.
Feel free to contribute and improve this platform. Happy coding!
