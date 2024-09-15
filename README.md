# Collaborative Text Editor

## Overview

The Collaborative Text Editor is a real-time web application that allows multiple users to collaboratively edit text documents simultaneously. It features a responsive front-end built with React and a back-end powered by Node.js, Express, MongoDB, and Socket.io for real-time communication.

## Features

- **Real-Time Collaboration:** Multiple users can edit the same document simultaneously, with changes reflected instantly across all clients.
- **Document Persistence:** Documents are stored and retrieved from a MongoDB database.
- **WebSocket Integration:** Real-time communication between the server and clients is handled via Socket.io.
- **Responsive Design:** The interface is designed to work seamlessly on both desktop and mobile devices.

## Technologies Used

### Frontend

- **React.js**: For building the user interface.
- **Socket.io-client**: Manages real-time updates from the server.
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

### Running the Project

You can run the client, server, and MongoDB concurrently using the `npm run devStart` script from the main project directory. This will start both the client and server, as well as ensure MongoDB is connected and running.

```bash
npm run devStart
```

## Future Improvements

- **Authentication**: Implement user authentication to allow document ownership and secure editing.
- **Rich Text Editing**: Add a rich text editor with formatting options.
- **Document History**: Track and view the history of document changes.

## Contributing

This project is currently being developed as a personal project. While contributions are not actively sought, if you have suggestions, find any issues, or want to collaborate, feel free to fork the repository and submit a pull request. All contributions are welcome and will be reviewed.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

