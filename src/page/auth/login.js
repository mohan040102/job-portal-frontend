import { useContext, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  TextField,
  Grid,
  Button,
  InputAdornment,
  IconButton,
  useTheme,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import Divider from "@mui/material/Divider";
import { FormProvider, get, set, useForm } from "react-hook-form";
import { Api, Visibility, VisibilityOff } from "@mui/icons-material";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router";
import Link from "@mui/material/Link";
import { useDispatch, useSelector } from "react-redux";
import storageService from "../../services/local-storage-service";
import { useSnackbar } from "../../hook/snack-bar";
import GradientBackground from "../../components/gradient-background";
import Spinner from "../../components/spinner";
import { loginAsync, getUser } from "../../services/auth-service";
import { UserContext } from "../../context/user-context";
import api from "../../api/axios-instance";

export default function Login() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setUser } = useContext(UserContext);
  const dispatch = useDispatch();
  const openSnackbar = useSnackbar();
  const [isLoginForm, setIsLoginForm] = useState(true);

  const loginSchema = {
    email: Yup.string()
      .email("Enter a valid email")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  };

  const createUserSchema = {
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Enter a valid email")
      .required("Email is required"),
    password: Yup.string().min(8).required("Password is required"),
    user_type: Yup.string().oneOf(
      ["jobseeker", "employer"],
      "User type is required"
    ),
  };

  // Form validation schema
  const validationSchema = Yup.object().shape({
    ...(isLoginForm ? loginSchema : createUserSchema),
  });

  // React Hook Form setup
  const methods = useForm({
    resolver: yupResolver(validationSchema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = async (data) => {
    try {
      if (isLoginForm) {
        setLoading(true);
        await loginAsync(data, { rejectWithValue: (error) => error });
        const user = await getUser(data.email);
        setUser(user);
        setLoading(false);

        if (storageService.getToken()) {
          navigate("/");
        } else {
          const errorMessage = "Login Failed! Please try again";
        
          openSnackbar({ type: "error", content: errorMessage });
        }
      } else {
        await api.post("user/", data);
        openSnackbar({ type: "success", content: "User created successfully!" });
        setIsLoginForm(true);
      }
    } catch (error) {
      console.error("Login error:", error);
      openSnackbar({ type: "error", content: "Something went wrong!" });
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === " ") {
      event.preventDefault();
    }
  };

  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      height="97vh"
      p={2}
    >
      <GradientBackground />
      <Grid size={{ xs: 12, lg: 4 }}>
        <Card
          elevation={5}
          sx={{ textAlign: "center", padding: 3, borderRadius: 4 }}
        >
          <CardHeader title="Login" />
          <CardContent>
            <FormProvider {...methods}>
              <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                autoComplete="off"
              >
                <Grid container spacing={2}>
                  {isLoginForm ? (
                    <>
                      <Grid size={{ xs: 12 }}>
                        <TextField
                          label="Email"
                          fullWidth
                          variant="outlined"
                          {...register("email")}
                          error={!!errors.email}
                          helperText={errors.email?.message}
                        />
                      </Grid>
                      <Grid size={{ xs: 12 }}>
                        <TextField
                          label="Password"
                          fullWidth
                          variant="outlined"
                          type={showPassword ? "text" : "password"}
                          {...register("password")}
                          error={!!errors.password}
                          helperText={errors.password?.message}
                          onKeyDown={handleKeyPress}
                          slotProps={{
                            input: {
                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton
                                    onClick={() =>
                                      setShowPassword(!showPassword)
                                    }
                                    edge="end"
                                  >
                                    {showPassword ? (
                                      <Visibility />
                                    ) : (
                                      <VisibilityOff />
                                    )}
                                  </IconButton>
                                </InputAdornment>
                              ),
                            },
                          }}
                        />
                      </Grid>
                    </>
                  ) : (
                    <>
                      <Grid size={{ xs: 12 }}>
                        <TextField
                          label="Email"
                          fullWidth
                          variant="outlined"
                          {...register("email")}
                          error={!!errors.email}
                          helperText={errors.email?.message}
                        />
                      </Grid>
                      <Grid size={{ xs: 12 }}>
                        <TextField
                          label="Name"
                          fullWidth
                          variant="outlined"
                          {...register("name")}
                          error={!!errors.name}
                          helperText={errors.name?.message}
                        />
                      </Grid>
                      <Grid size={{ xs: 12 }}>
                        <TextField
                          label="Password"
                          fullWidth
                          variant="outlined"
                          {...register("password")}
                          error={!!errors.password}
                          helperText={errors.password?.message}
                        />
                      </Grid>
                      <Grid size={{ xs: 12 }}>
                        <FormControl
                          fullWidth
                          variant="outlined"
                          error={!!errors.user_type}
                        >
                          <InputLabel id="user-type-label">
                            User Type
                          </InputLabel>
                          <Select
                            labelId="user-type-label"
                            label="User Type"
                            defaultValue=""
                            {...register("user_type")}
                          >
                            <MenuItem value="employer">Employer</MenuItem>
                            <MenuItem value="jobseeker">Jobseeker</MenuItem>
                          </Select>
                        </FormControl>
                        <Typography variant="caption" color="error">
                          {errors.user_type?.message}
                        </Typography>
                      </Grid>
                    </>
                  )}
                  <Grid size={12} display={"flex"} justifyContent={"flex-end"}>
                    <Link
                      id="create-user-btn"
                      style={{
                        fontSize: "15px",
                        color: theme.palette.primary.main,
                        cursor: "pointer",
                      }}
                      onClick={() => setIsLoginForm(!isLoginForm)}
                    >
                      {isLoginForm ? "Create User" : "Login"}
                    </Link>
                  </Grid>
                  <Grid size={12} display="flex" justifyContent="center">
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      sx={{ width: "50%" }}
                    >
                      {isLoginForm ? "Login": "Create User"}
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </FormProvider>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
