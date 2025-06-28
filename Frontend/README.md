# Uber Clone - Frontend

A modern ride-sharing application frontend built with React, Vite, and Tailwind CSS. This application provides a complete user interface for both riders and drivers (captains) with real-time features powered by Socket.IO.

## 🚀 Features

### For Riders

- User authentication (login/signup)
- Real-time ride booking
- Location search and selection
- Vehicle type selection (car, auto, moto)
- Live ride tracking
- Ride history and profile management

### For Captains (Drivers)

- Captain authentication and registration
- Real-time ride notifications
- Accept/decline ride requests
- Live navigation during rides
- Earnings and ride history
- Profile management

### Technical Features

- Real-time communication with Socket.IO
- Responsive design with Tailwind CSS
- Smooth animations with GSAP
- Protected routes for authenticated users
- Context-based state management
- Modern React patterns with hooks

## 🛠️ Tech Stack

- **Frontend Framework**: React 19.1.0
- **Build Tool**: Vite 6.3.5
- **Styling**: Tailwind CSS 4.1.7
- **Routing**: React Router DOM 7.6.1
- **Animations**: GSAP 3.13.0
- **HTTP Client**: Axios 1.9.0
- **Real-time Communication**: Socket.IO Client 4.8.1
- **Touch Gestures**: React Swipeable 7.0.2
- **Linting**: ESLint 9.25.0

## 📁 Project Structure

```
Frontend/
├── public/
│   ├── Uber_logo_2018.png
│   └── bgimage.jpg
├── src/
│   ├── assets/          # Static assets (icons, images)
│   ├── components/      # Reusable UI components
│   │   ├── CaptainDetails.jsx
│   │   ├── ConfirmRide.jsx
│   │   ├── LiveTracking.jsx
│   │   ├── LocationCard.jsx
│   │   ├── VehicleCard.jsx
│   │   └── ...
│   ├── context/         # React Context providers
│   │   ├── UserContext.jsx
│   │   ├── CaptainContext.jsx
│   │   └── SocketContext.jsx
│   ├── pages/           # Page components
│   │   ├── Start.jsx
│   │   ├── Home.jsx
│   │   ├── UserLogin.jsx
│   │   ├── CaptainHome.jsx
│   │   ├── Riding.jsx
│   │   └── ...
│   ├── utils/           # Utility functions
│   ├── App.jsx          # Main app component with routing
│   ├── main.jsx         # Application entry point
│   └── index.css        # Global styles
├── package.json
├── vite.config.js
└── README.md
```

## 🚦 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd Frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application.

## 📜 Available Scripts

- `npm run dev` - Start the development server with hot reload
- `npm run build` - Build the application for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check code quality

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory and configure the following variables:

```env
VITE_API_URL=http://localhost:4000
VITE_SOCKET_URL=http://localhost:4000
```

### Vite Configuration

The project uses Vite with React plugin and Tailwind CSS integration. Configuration can be found in `vite.config.js`.

## 🎨 Styling

This project uses Tailwind CSS for styling with custom configurations. The main styles are defined in:

- `src/index.css` - Global styles and Tailwind imports
- `src/App.css` - Component-specific styles

## 🔌 Real-time Features

The application uses Socket.IO for real-time communication between users and captains:

- Live ride requests and notifications
- Real-time location tracking
- Instant ride status updates
- Driver-rider communication

## 🛡️ Authentication & Protection

The app implements route protection with wrapper components:

- `UserProtectedWrapper` - Protects user routes
- `CaptainProtectedWrapper` - Protects captain routes
- `LoginnedWrapper` - Redirects authenticated users

## 🚀 Deployment

1. **Build the application**

   ```bash
   npm run build
   ```

2. **Deploy the `dist` folder** to your preferred hosting service (Vercel, Netlify, etc.)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is part of an Uber Clone application for educational purposes.
