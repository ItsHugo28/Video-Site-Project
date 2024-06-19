# VideoWebsite

This is a web application that allows users to upload, view, and share videos. It provides a platform similar to YouTube where users can interact with video content.

## Features

- **User Authentication**: Users can create accounts and log in securely.
- **Video Upload**: Upload videos to share with others.
- **Video Playback**: Seamless video playback with player controls.
- **Comments**: Users can comment on videos.
- **Search**: Search for videos based on keywords.

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript, Handlebars.js
- **Backend**: Node.js, Express.js
- **Database**: MySQL

## Installation

To run this project locally, follow these steps:

1. **Clone the repository:**
   ```
   git clone https://github.com/ItsHugo28/videowebsite.git
   ```

2. **Navigate to the project directory:**
   ```
   cd videowebsite
   ```

3. **Install dependencies:**
   ```
   npm install
   ```

4. **Set up MySQL database:**
   - Create a MySQL database and note down the connection details (database name, username, password).

5. **Configure environment variables:**
   - Create a `.env` file in the root directory of the project.
   - Define the following variables with your MySQL database connection details:
     ```
     PORT=3000
     DB_HOST=<database host>
     DB_USER=<database username>
     DB_PASSWORD=<database password>
     DB_NAME=<database name>
     ```

6. **Start the development server:**
   ```
   npm start
   ```

7. **Access the application in your browser at `http://localhost:3000`.**

## Usage

- Register for an account or log in if you already have one.
- Upload videos using the upload functionality.
- Watch videos, leave comments, and interact with other users' content.
