# FonixBuddy

**Your AI-Powered Career Assistant**

FonixBuddy is a MERN-stack web application designed to help users prepare for interviews and optimize their resumes using AI-powered tools.

## Features

- **AI Interview Preparation:** Prepare for interviews using your interview-related tools.
- **Interview Reports:** Generate AI-assisted interview reports and feedback.
- **Resume Optimization:** Analyze and improve resumes with AI assistance.
- **Authentication:** User authentication and protected application routes.
- **Data Management:** Store application data using MongoDB.
- **Responsive Interface:** React-based frontend for interacting with the application's features.

## Tech Stack

**Frontend**
- React
- Vite
- JavaScript
- SCSS / CSS

**Backend**
- Node.js
- Express.js
- MongoDB and Mongoose
- JWT-based authentication
- Cookie Parser

**AI Integration**
- Google Gemini API
- Mistral API

## Project Structure

```text
SCS/
├── Backend/
│   ├── src/
│   ├── server.js
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── .env.example
├── .gitignore
└── README.md
```

## Prerequisites

- Node.js and npm
- MongoDB database
- Gemini API key for features that use Gemini
- Mistral API key for features that use Mistral

## Getting Started

### 1. Clone the repository


```bash
git clone https://github.com/kharsh-1907/FonixBuddy-AI-Career-assistance.git
cd FonixBuddy-AI-Career-assistance
```

Replace the placeholder URL with your repository URL after creating it.

### 2. Configure the backend

```bash
cd Backend
npm install
```

Create a local `.env` file using `.env.example` as a template.

Configure the following variables:

| Variable | Description |
|---|---|
| `MONGO_URI` | MongoDB connection string |
| `S_PORT` | Local backend port; defaults to 5000 |
| `JWT_SECRETE_KEY` | Secret used for JWT authentication |
| `GEMINI_API_KEY` | API key for Gemini-powered features |
| `MISTRAL_API_KEY` | API key for Mistral-powered features |

Fill in your own credentials locally. Never commit your actual `.env` file.

Start the backend:

```bash
npm start
```

### 3. Configure the frontend

Open another terminal:

```bash
cd frontend
npm install
```

Create a local `.env` file based on `.env.example`:

```env
VITE_API_URL=http://localhost:5000
```

Start the frontend development server:

```bash
npm run dev
```

### 4. Build the frontend

```bash
npm run build
```

Vite generates the production build inside `frontend/dist/`.

## Environment Variables

Real credentials and API keys must remain private. The `.env.example` files provide templates for local setup.

For production, configure environment variables through the hosting providers rather than committing secrets.

## Deployment

- **Frontend:** Vercel
- **Backend:** Render
- **Database:** MongoDB Atlas

Set `VITE_API_URL` on Vercel to the deployed backend's base URL. Configure `FRONTEND_URL`, `MONGO_URI`, `JWT_SECRETE_KEY`, and the required AI API keys on Render.

The backend must allow requests from the deployed frontend origin with the appropriate CORS and cookie settings.

## Security

- Do not commit `.env` files, API keys, database credentials, or JWT secrets.
- Use strong secrets in production.
- Restrict CORS to trusted frontend origins.
- Rotate any credentials that have been exposed.

## License

No license has been specified yet.
