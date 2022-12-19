import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const Dropdown = ({ onChange, label, options = [], value }) => {
    return (
        <FormControl size="small" sx={{ m: 1 }} fullWidth>
            <InputLabel shrink sx={{ backgroundColor: 'white' }}>{label}</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={value}
                label={label}
                onChange={onChange}
            >
                {options.map((text, ix) => (
                    <MenuItem key={`${ix} ${text}`} value={text}>{text}</MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default Dropdown;
