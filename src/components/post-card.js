import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import api from "../api/axios-instance";
import { useSnackbar } from "../hook/snack-bar";
import localStorageService from "../services/local-storage-service";
import Spinner from "./spinner";
import { useState } from "react";

const PostCard = ({ post, user }) => {
  const openSnackbar = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const applyJob = async () => {
    try {
      setIsLoading(true);
      const headers = {
        headers: {
          Authorization: `Bearer ${localStorageService.getToken().token}`,
        },
      };
      await api.post("job/apply", { id: post._id }, headers);
      openSnackbar({ type: "success", content: "Job applied successfully!" });
    } catch (error) {
      openSnackbar({ type: "error", content: error.response?.data?.message || "Failed to apply for the job" });
    } finally {
      setIsLoading(false);
    }
  };

  const isJobApplied = user?.user_applied_jobs?.includes(post._id);
  return (
    <Card
      fullWidth
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

        {user?.user_type === "jobseeker"
          && (
            <Button
              variant="contained"
              color="primary"
              disabled={isJobApplied}
              sx={{ mt: 2 }}
              onClick={applyJob}
            >
              {isLoading ? <Spinner size={20} /> : isJobApplied ? "Applied" : "Apply Now"}
            </Button>
          )}
      </CardContent>
    </Card>
  );
};

export default PostCard;
