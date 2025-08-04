import { Box, Card, CardContent, Typography } from "@mui/material";

const PostCard = ({ post }) => {
  return (
    <Card
      variant="outlined"
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        p: 2,
        borderRadius: 1,
        borderBottom: (theme) => `4px solid ${theme.palette.primary.main}`,
      }}
    >
      <CardContent
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
          <Typography variant="h4" color="primary" fontWeight="bold">
            {post.company ?? "No Data"}
          </Typography>
        </Box>
        <Typography variant="h6" fontWeight="bold" color="#4DB6AC">
          {post.title}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {post.description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PostCard;
