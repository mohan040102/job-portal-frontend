import { Box } from "@mui/material";

const GradientBackground = () => {
    return (
        <Box
            sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: "linear-gradient(135deg, #FFFFFF 50%, #80cbc4 50%)",
                zIndex: -1,
            }}
        />
    );
};

export default GradientBackground;
