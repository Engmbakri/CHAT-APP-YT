WanaSa a Real-Time Chat Application
Overview
This is a full-stack real-time chat application built using the MERN stack (MongoDB, Express, React, Node.js) with additional features like authentication, authorization, real-time messaging with Socket.IO, and password recovery through email. The application allows users to register, login, chat in real-time, and recover passwords when forgotten.

Features :
User Authentication: Signup, login, and logout functionality with password encryption.
Real-Time Messaging: Users can send and receive messages instantly using WebSocket (Socket.IO).
Password Reset: Email-based password recovery with token-based validation.
Responsive Design: The UI is built using TailwindCSS and is mobile-friendly.
Secure Communication: Passwords are securely hashed using bcrypt, and sessions are managed with JWT tokens.

Table of Contents :
Overview
Features
Technologies Used
Installation
Usage
API Endpoints
Future Enhancements


Technologies Used :
Frontend :
React: For building the user interface.
TailwindCSS: For responsive and modern UI styling.
DaisyUI: For pre-built styled components.

Backend :
Node.js & Express: For server-side logic and handling API requests.
MongoDB & Mongoose: For database management and user data storage.
Socket.IO: For real-time messaging.

Additional Services:
JWT: For authentication and securing API endpoints.
Nodemailer: For sending password reset emails.


Installation :
Prerequisites :
Make sure you have the following installed:
Node.js: Version 12.x or later.
MongoDB: Local or remote instance.
NPM: Version 6.x or later.

Usage :
Signup and Login
Register as a new user and log in using your credentials.
After logging in, you will be redirected to the chat interface where you can start conversations with other users.
Real-Time Messaging
Users can send and receive messages in real-time.
Chat history is saved for each conversation.
Reset Password
If you forget your password, click on "Forgot Password" on the login page.
You will receive an email with a reset link. Use the link to set a new password.


API Endpoints :
Auth Routes :
POST /api/auth/signup: Register a new user.
POST /api/auth/login: Log in a user and get a JWT token.
POST /api/auth/logout: Log out the user and clear the session.
POST /api/auth/forgot-password: Send a password reset email.
PUT /api/auth/reset-password/: token : Reset the password using a valid token.
Chat Routes
GET /api/messages/send/userid: Fetch all conversations for the logged-in user.
POST /api/messages/send/userid: Send a message to  a specific user


Future Enhancements :
Profile Customization: Add features for users to customize profiles (profile pictures, bios).
Group Chat: Implement functionality for group chats and channels.
