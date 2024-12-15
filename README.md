# NOTE APPLICATION

### This app created using SERN Stack, here Note-App-Client is for client side and Note-App-Server for backend side

## Technical Stack:

- Node.js
- Express.js
- Sequelize
- SQL
- React

## Features:

1. Create a notes web app
2. Database must be MySQL
3. Should be a simple design
4. Delete and add note should work and insert data inside db
5. and more....

## Setup

1. Clone the repository.
2. Install the dependencies by running

```
npm install
```

3. Set up the environment variables in `.env` file.
4. Start the Client(Note-App-Client) using

```
npm run dev
```

5. Start the server(Note-App-Server) using

```
npm start
```

## .env For Note-App-Client

```.env

VITE_API_URL=http://localhost:8081

```

## .env For Note-App-Server

```.env

DB_HOST="localhost"
DB_USER=root
DB_PASSWORD="123456"
DB_NAME="notes_app"
DB_PORT=3306
PORT = 8081

```

## API Endpoints

### notes
- **POST /api/notes**: Create a new note.
- **GET /api/notes**: Retrieve all note.
- **PUT /api/notes/:id**: update notes.
- **DELETE /api/notes/:id**: delete notes.