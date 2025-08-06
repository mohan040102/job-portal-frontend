import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  AppBar,
  Box,
  Button,
  CssBaseline,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { useTheme } from "@mui/material/styles";
import { useContext, useEffect, useId, useState } from "react";
import { set } from "react-hook-form";
import { v4 as uuidV4 } from "uuid";
import api from "../api/axios-instance";
import ConfirmationDialog from "../components/confirmation-dialogue";
import CreateJobForm from "../components/job-form";
import PostCard from "../components/post-card";
import config from "../config/config";
import { UserContext } from "../context/user-context";
import { getUser, logoutAsync } from "../services/auth-service";
import localStorageService from "../services/local-storage-service";
import { useNavigate } from "react-router-dom";

export default function RootLayout() {
  const [isLoading, setIsLoading] = useState(false);
  const [isConfirmationDialog, setIsConfirmationDialog] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const message = "Are you sure want to logout?";
  const theme = useTheme();
  const [openJobDialog, setOpenJobDialog] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const [userData, setUserData] = useState(user);

  const [jobs, setJobs] = useState([]);

  const handleCloseJobDialog = async () => {
    setOpenJobDialog(false);
    await fetchJobs();
  };

  const fetchUserData = async () => {
    const userData = await getUser();
    setUser(userData);
    setUserData(userData);
  };

  useEffect(() => {
    if (!user) {
      fetchUserData();
    }
  }, [user]);

  const navigate = useNavigate();

  const handleClose = () => {
    setIsLoading(false);
    setAnchorEl(null);
    setIsConfirmationDialog(false);
    navigate("/login");
  };
  const handleConfirmLogout = () => {
    setAnchorEl(null);
    setIsConfirmationDialog(true);
  };

  const confirmationResponse = (isConfirmed) => {
    if (isConfirmed) {
      handleLogout();
      setIsLoading(true);
    } else {
      setIsConfirmationDialog(false);
    }
  };
  const handleLogout = async () => {
    handleClose();
    await logoutAsync();
  };

  const fetchJobs = async () => {
    const headers = {
      headers: {
        Authorization: `Bearer ${localStorageService.getToken().token}`,
      },
    };
    const result = await api.get("job", headers);
    setJobs(result.data);
  };
  useEffect(() => {
    fetchJobs();
  }, []);

  console.log("users", userData);

  const handleMenu = (event) => setAnchorEl(event.currentTarget);

  const isSmallDevice = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <CssBaseline enableColorScheme />

      {/* AppBar (Header) */}
      <AppBar position="fixed" sx={{ backgroundColor: "white" }}>
        <Toolbar
          sx={{
            minHeight: "48px !important",
            px: isSmallDevice ? 1 : 3,
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{
              textAlign: isSmallDevice ? "center" : "left",
              flexGrow: isSmallDevice ? 1 : 0,
            }}
            variant="h6"
            fontWeight="bold"
            color="primary"
          >
            {config.project_key}
          </Typography>

          {/* Profile Icon */}
          <IconButton color="primary" onClick={handleMenu}>
            <AccountCircleIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem id="logout" onClick={handleConfirmLogout}>
              <ListItemIcon>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText
                primary="Logout"
                sx={{ "& .MuiTypography-root": { fontSize: "14px" } }}
              />
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <Grid
        container
        spacing={2}
        sx={{ padding: 2, mt: 6, justifyContent: "space-between" }}
      >
        <Grid item>
          <Typography variant="h6" fontWeight={"bold"}>
            {`Welcome to Job Portal, ${user?.name || "Guest"}`}
          </Typography>
        </Grid>
        {userData?.user_type === "employer" && (
          <Grid item>
            <Button onClick={() => setOpenJobDialog(true)}>Create Job</Button>
          </Grid>
        )}
      </Grid>

      <Grid container spacing={2} display={"flex"} sx={{ padding: 2 }}>
        {jobs.map((job) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            key={uuidV4()}
            sx={{ display: "flex", flexDirection: "column" }}
          >
            <PostCard post={job} user={userData}/>
          </Grid>
        ))}
      </Grid>

      {isConfirmationDialog && (
        <ConfirmationDialog
          open={isConfirmationDialog}
          onClose={confirmationResponse}
          data={{ content: message }}
          isLoading={isLoading}
        />
      )}

      {openJobDialog && (
        <CreateJobForm
          openJobDialog={openJobDialog}
          handleCloseJobDialog={handleCloseJobDialog}
        />
      )}
    </Box>
  );
}
