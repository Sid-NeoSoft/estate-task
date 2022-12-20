import { TextField } from "@mui/material";

const TextBox = ({ size = 'small', label, sx, ...rest }) => {
    return (
        <TextField
            fullWidth
            InputLabelProps={{ shrink: true }}
            label={label}
            placeholder={`Enter ${label}`}
            variant="outlined"
            size={size}
            sx={{ m: 1, ...sx }}
            {...rest}
        />
    )
}

export default TextBox;