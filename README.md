# Collaborative Text Editor

## Overview

The Collaborative Text Editor is a real-time web application that allows multiple users to edit text documents simultaneously. It features a responsive front-end built with React and a back-end powered by Node.js, Express, MongoDB, and Socket.io for real-time communication.

## Features

- **Real-Time Collaboration:** Multiple users can edit the same document at the same time, with changes reflected instantly across all clients.
- **Document Persistence:** Documents are saved and retrieved from a MongoDB database.
- **WebSocket Integration:** Real-time communication between the server and clients is managed via Socket.io.
- **Responsive Design:** The interface is built to work seamlessly on both desktop and mobile devices.

## Technologies Used

### Frontend

- **React.js**: Used for building the user interface.
- **Socket.io-client**: Handles real-time updates from the server.
- **CSS**: Basic styling for the app.

### Backend

- **Node.js**: JavaScript runtime for building the server.
- **Express.js**: Web framework for Node.js, used to create the API.
- **Socket.io**: Enables real-time bidirectional communication between clients and the server.
- **MongoDB**: NoSQL database for storing document data.
- **Mongoose**: Object Data Modeling (ODM) library for MongoDB and Node.js.

## Getting Started

### Prerequisites

- **Node.js**: Ensure Node.js is installed on your machine. [Download Node.js](https://nodejs.org/)
- **MongoDB**: Ensure MongoDB is installed and running on your local machine or a remote server. [Download MongoDB](https://www.mongodb.com/try/download/community)

## Future Improvements

- **Authentication**: Implement user authentication to allow document ownership and secure editing.
- **Rich Text Editing**: Add a rich text editor with formatting options.
- **Document History**: Track and view the history of document changes.

## Contributing

This project is currently being developed as a personal project. While contributions are not actively sought, if you have suggestions, find any issues, or want to collaborate, feel free to fork the repository and submit a pull request. All contributions are welcome and will be reviewed.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

