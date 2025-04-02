import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import {Provider} from "react-redux";
import {store} from "./app/store.ts";
import {CssBaseline, ThemeProvider} from "@mui/material";
import theme from "./theme.tsx";
import PersistAuth from './components/Auth/PersistAuth.tsx';

const rootElement = document.getElementById('root')!;

createRoot(rootElement).render(
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <CssBaseline/>
                <PersistAuth>
                  <StrictMode>
                      <App/>
                  </StrictMode>
                </PersistAuth>
        </ThemeProvider>
    </Provider>
)
