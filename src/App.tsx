import {Box} from "@mui/material";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Auth/Login";
import ProtectedRoute from "./components/Auth/ProtectedRoute.tsx";
import Register from "./components/Auth/Register.tsx";
import AppLayout from "./components/Layouts/AppLayout.tsx";
import AccountSettings from "./components/Account/AccountSettings.tsx";
import UserConfigurationsPage from "./components/Configurations/UserConfigurationsPage.tsx";
import SystemUsersPage from "./components/SystemUsers/SystemUsersPage.tsx";
import UserProfile from "./components/SystemUsers/UserProfile.tsx";
import ConfigurationPage from "./components/Configurations/ConfigurationPage.tsx";
import ConfigurationTagPage from "./components/Configurations/ConfigurationTagPage.tsx";

function App() {

  return (
      <Router>
        <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              minHeight: '100vh',
            }}
            >
            <Routes>
                <Route path="/sign-in" element={<Login/>}/>
                <Route path="/sign-up" element={<Register/>}/>

                <Route element={<ProtectedRoute />}>
                    <Route element={<AppLayout />}>
                        <Route path="/" element={<UserConfigurationsPage/>}/>
                        <Route path="/account-settings" element={<AccountSettings/>}/>
                        <Route path="/system-users" element={<SystemUsersPage/>}/>
                        <Route path="/users/:userId" element={<UserProfile/>}/>

                        <Route path="/configurations/:configurationId" element={<ConfigurationPage/>}/>
                        <Route path="/configurations/tags/:tagId" element={<ConfigurationTagPage/>}/>

                        <Route path="*" element={
                            <Navigate
                                to="/"
                                replace
                                state={{
                                    from: '404',
                                    message: 'Page not found'
                                }}
                            />
                        } />
                    </Route>
                </Route>
            </Routes>
        </Box>
      </Router>
  )
}

export default App
