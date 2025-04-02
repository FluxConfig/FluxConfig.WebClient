import {createTheme} from "@mui/material";

const theme = createTheme({
    palette: {
        primary: {
            main: '#E4D7C1',
        },
        secondary: {
            main: '#333333',
        },
        background: {
            default: "#f8f8f8",
        },
    },
    components: {
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        '&.Mui-focused fieldset': {
                            borderColor: "#B9B28A"
                        }
                    },
                    '& .MuiInputLabel-root': {
                        '&.Mui-focused': {
                            color: "#B9B28A"
                        }
                    }
                }
            }
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: "none",
                },
            },
        },
    }
});

export default theme;