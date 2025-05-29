import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider, createTheme } from '@mui/material/styles';

import Login from "./components/Auth/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import DashboardLayout from "./components/Layout/DashboardLayout";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";

// Pages
import E3Apps from "./components/Pages/E3Apps";
import Ventilation from "./components/Pages/Ventilation";
import Cooling from "./components/Pages/Cooling";
import HeatPump from "./components/Pages/HeatPump";
import OutOfHours from "./components/Pages/OutOfHours";
import EVCharging from "./components/Pages/EVCharging";
import LoadShifting from "./components/Pages/LoadShifting";

const theme = createTheme({
  palette: {
    primary: {
      main: '#3B82F6',
    },
  },
});

function App() {
  return (
    <AuthProvider>
      <Router>
        <ThemeProvider theme={theme}>
          <div className="App">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <DashboardLayout>
                      <Dashboard />
                    </DashboardLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/e3-apps"
                element={
                  <ProtectedRoute>
                    <DashboardLayout>
                      <E3Apps />
                    </DashboardLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/ventilation"
                element={
                  <ProtectedRoute>
                    <DashboardLayout>
                      <Ventilation />
                    </DashboardLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/cooling"
                element={
                  <ProtectedRoute>
                    <DashboardLayout>
                      <Cooling />
                    </DashboardLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/heat-pump"
                element={
                  <ProtectedRoute>
                    <DashboardLayout>
                      <HeatPump />
                    </DashboardLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/out-of-hours"
                element={
                  <ProtectedRoute>
                    <DashboardLayout>
                      <OutOfHours />
                    </DashboardLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/ev-charging"
                element={
                  <ProtectedRoute>
                    <DashboardLayout>
                      <EVCharging />
                    </DashboardLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/load-shifting"
                element={
                  <ProtectedRoute>
                    <DashboardLayout>
                      <LoadShifting />
                    </DashboardLayout>
                  </ProtectedRoute>
                }
              />
            </Routes>
            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
          </div>
        </ThemeProvider>
      </Router>
    </AuthProvider>
  )
}

export default App;