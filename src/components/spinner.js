import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/system';

export default function Spinner({ align = "center", size = 30, sx = {} }) {
    return (
        <Box display="flex" justifyContent={align} sx={{ ...sx }}>
            <CircularProgress size={size} />
        </Box>
    );
}