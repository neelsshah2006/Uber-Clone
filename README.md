# 🚗 Uber Clone - Full Stack Ride Sharing Application

A comprehensive ride-sharing platform built with modern web technologies, featuring real-time communication, geolocation services, and a complete user experience for both riders and drivers (captains).

## 🌟 Overview

This Uber Clone is a full-stack application that replicates the core functionality of ride-sharing services. It provides separate interfaces for riders and drivers, real-time ride tracking, secure authentication, and seamless communication between all parties.

### ✨ Key Features

- **Dual User System**: Separate authentication and interfaces for riders and drivers (captains)
- **Real-time Communication**: Live updates using Socket.IO for ride requests, tracking, and notifications
- **Geolocation Services**: Integration with mapping services for location search and navigation
- **Secure Authentication**: JWT-based authentication with HTTP-only cookies
- **Responsive Design**: Mobile-first approach with modern UI/UX
- **Live Ride Tracking**: Real-time location updates during rides
- **Payment Integration Ready**: Structured for payment gateway integration

## 🏗️ Architecture

```
Uber Clone/
├── Frontend/          # React + Vite client application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Route-based page components
│   │   ├── context/       # React Context providers
│   │   └── assets/        # Static assets
│   └── public/            # Public assets
├── Backend/           # Node.js + Express API server
│   ├── controllers/       # Request handlers
│   ├── models/           # MongoDB data models
│   ├── routes/           # API route definitions
│   ├── services/         # Business logic layer
│   ├── middlewares/      # Custom middleware functions
│   └── db/              # Database configuration
└── README.md         # This file
```

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19.1.0 with Vite 6.3.5
- **Styling**: Tailwind CSS 4.1.7
- **Routing**: React Router DOM 7.6.1
- **Animations**: GSAP 3.13.0
- **HTTP Client**: Axios 1.9.0
- **Real-time**: Socket.IO Client 4.8.1
- **State Management**: React Context API

### Backend
- **Runtime**: Node.js with Express 5.1.0
- **Database**: MongoDB with Mongoose 8.15.0
- **Authentication**: JWT with bcrypt encryption
- **Real-time**: Socket.IO 4.8.1
- **Security**: Helmet, CORS, Rate Limiting
- **Validation**: Express Validator 7.2.1

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd "Uber Clone"
   ```

2. **Setup Backend**
   ```bash
   cd Backend
   npm install
   
   # Create .env file with required variables
   cp .env.example .env
   # Edit .env with your configuration
   
   # Start the server
   npm start
   ```

3. **Setup Frontend**
   ```bash
   cd ../Frontend
   npm install
   
   # Create .env file
   cp .env.example .env
   # Configure API endpoints
   
   # Start development server
   npm run dev
   ```

4. **Access the application**
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:4000`

## 🔧 Configuration

### Backend Environment Variables
Create a `.env` file in the Backend directory:

```env
PORT=4000
MONGODB_URI=mongodb://localhost:27017/uber-clone
JWT_SECRET=your-super-secret-jwt-key
GOOGLE_MAPS_API_KEY=your-google-maps-api-key
NODE_ENV=development
```

### Frontend Environment Variables
Create a `.env` file in the Frontend directory:

```env
VITE_API_URL=http://localhost:4000
VITE_SOCKET_URL=http://localhost:4000
```

## 📱 Application Features

### For Riders
- **Account Management**: Registration, login, profile management
- **Ride Booking**: Search locations, select vehicle type, book rides
- **Real-time Tracking**: Live location tracking during rides
- **Ride History**: View past rides and details
- **Driver Communication**: Real-time updates from assigned drivers

### For Captains (Drivers)
- **Driver Registration**: Complete profile setup with vehicle details
- **Ride Management**: Accept/decline ride requests
- **Navigation**: Integrated navigation during rides
- **Earnings Tracking**: Monitor ride earnings and history
- **Real-time Notifications**: Instant ride request alerts

### Admin Features (Backend)
- **User Management**: Monitor users and captains
- **Ride Analytics**: Track ride statistics and metrics
- **System Monitoring**: API rate limiting and security features

## 🔌 API Documentation

The backend provides comprehensive RESTful APIs:

- **Authentication**: User/Captain registration and login
- **Ride Management**: Create, update, and track rides
- **Geolocation**: Location search and mapping services
- **Real-time Events**: Socket.IO for live communication

For detailed API documentation, see [Backend README](./Backend/README.md).

## 🎨 UI/UX Features

- **Responsive Design**: Optimized for mobile and desktop
- **Modern Interface**: Clean, intuitive user experience
- **Smooth Animations**: GSAP-powered transitions
- **Touch Gestures**: Swipe support for mobile interactions
- **Real-time Updates**: Live status updates without page refresh

## 🧪 Testing

```bash
# Backend testing
cd Backend
npm test

# Frontend testing
cd Frontend
npm test
```

## 🚀 Deployment

### Backend Deployment
1. Set production environment variables
2. Build and deploy to your preferred platform (Heroku, AWS, etc.)
3. Ensure MongoDB connection is configured

### Frontend Deployment
1. Build the application: `npm run build`
2. Deploy the `dist` folder to hosting service (Vercel, Netlify, etc.)
3. Configure environment variables for production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is created for educational purposes. Feel free to use it as a learning resource.

---

**Built with ❤️ for learning and demonstration purposes**
