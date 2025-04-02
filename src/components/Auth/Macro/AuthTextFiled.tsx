import {TextField, TextFieldProps} from "@mui/material";

function AuthTextField(props: TextFieldProps) {
    return (
        <TextField
            margin="dense"
            fullWidth
            autoFocus
            {...props}
        />
    );
}

export default AuthTextField;