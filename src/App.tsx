import {Box, Container, Typography} from "@mui/material";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

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
              <Route path = '/' element={(
                  <>
                      <Typography variant="h6">
                          FluxConfig
                      </Typography>
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
            </Routes>
          </Container>
        </Box>
      </Router>
  )
}

export default App
