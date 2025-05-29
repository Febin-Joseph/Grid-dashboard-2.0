# Grid Manager 2.0 - Full Stack Application

A comprehensive dashboard application built with React, Node.js, Express, and MongoDB.

## Features

- **Authentication System**: Login/logout with JWT tokens
- **Dashboard**: Peak Shaving & Alert management
- **Form Validation**: Frontend (Formik + Yup) and Backend (Joi)
- **Charts**: Multi-line power cost visualization using ApexCharts
- **CRUD Operations**: Create, read, and delete alerts
- **Responsive Design**: Works on all desktop sizes using vh/vw units

## Tech Stack

### Frontend
- React 18
- React Router DOM
- Formik & Yup (Form handling and validation)
- ApexCharts (Data visualization)
- Axios (HTTP client)
- React Toastify (Notifications)
- Tailwind CSS (Styling)

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose ODM
- JWT Authentication
- Joi (Server-side validation)
- bcryptjs (Password hashing)
- CORS enabled

### Environment Setup

Create a \`.env\` file in the \`server\` directory:

\`\`\`env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/gridmanager
JWT_SECRET=your-super-secret-jwt-key-here
NODE_ENV=development
\`\`\`

### Create Initial User (Optional)

You can register a user via API or use the demo credentials:
- Email: admin@example.com
- Password: password123

To create this user, make a POST request to \`http://localhost:5000/api/auth/register`:

\`\`\`json
{
  "name": "Admin User",
  "email": "admin@example.com",
  "password": "password123",
  "userId": "Abc-24"
}
\`\`\`

## Project Structure

\`\`\`
grid-manager-fullstack/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   └── utils
│   └── package.json
├── server/                 # Node.js backend
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── data/
│   ├── .env.example
│   └── package.json
└── README.md
\`\`\`

## Demo Credentials

- **Email**: admin@example.com
- **Password**: password123