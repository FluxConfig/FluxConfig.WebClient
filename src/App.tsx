import {Box, Container} from "@mui/material";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Auth/Login";
import ProtectedRoute from "./components/Auth/ProtectedRoute.tsx";
import Register from "./components/Auth/Register.tsx";

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
          <Container
              maxWidth={false}
              component="main"
              sx={{
                flex: 1
              }}
              disableGutters>
            <Routes>
                <Route path="/sign-in" element={<Login/>}/>
                <Route path="/sign-up" element={<Register/>}/>

                <Route element={<ProtectedRoute/>}>
                    <Route path = '/' element={(
                        <>
                        </>)}/>

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
            </Routes>
          </Container>
        </Box>
      </Router>
  )
}

export default App
