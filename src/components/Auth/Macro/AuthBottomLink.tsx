import {Box, Typography} from "@mui/material";
import {Link} from "react-router-dom";

function AuthBottomLink({linkPath, linkText} : {linkPath: string, linkText: string}) {
    return (
        <Box sx={{
            textAlign: 'center',
            fontSize: '0.9rem',
        }}>
            <Typography
                component={Link}
                to ={linkPath}
                sx={{
                    textDecoration: 'none',
                    '&:hover': {
                        textDecoration: 'underline',
                        textDecorationThickness: '1px',
                        textUnderlineOffset: '3px'
                    }
                }}
            >
                {linkText}
            </Typography>
        </Box>
    );
}

export default AuthBottomLink;