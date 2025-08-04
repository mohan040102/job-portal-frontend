import { FormProvider, get, set, useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import api from "../api/axios-instance";
import localStorageService from "../services/local-storage-service";
import { useSnackbar } from "../hook/snack-bar";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";

const CreateJobForm = ({ openJobDialog, handleCloseJobDialog }) => {
  const openSnackbar = useSnackbar();
  const jobFormSchema = Yup.object().shape({
    company: Yup.string()
      .required("company is required"),
    title: Yup.string().required("title is required"),
    description: Yup.string().required("Description is required"),
  });

  const methods = useForm({
    resolver: yupResolver(jobFormSchema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const handleJobSubmit = async (data) => {
    try {
      const headers = {
        headers: {
          Authorization: `Bearer ${localStorageService.getToken().token}`,
        },
      };
      await api.post("/job", data, headers);
      handleCloseJobDialog();
      openSnackbar({ type: "success", message: "Job created successfully!" });
    } catch (error) {
      console.error("Error creating job:", error);
      openSnackbar({
        type: "error",
        message: "Failed to create job. Please try again.",
      });
    }
  };

  // Add this Dialog component anywhere inside your JSX:
  return (
    <Dialog open={openJobDialog} onClose={handleCloseJobDialog}>
      <DialogTitle>Create Job</DialogTitle>
      <form onSubmit={handleSubmit(handleJobSubmit)}>
        <DialogContent>
          <TextField
            margin="dense"
            label="Company"
            name="company"
            register
            fullWidth
            required
            {...register("company")}
            error={!!errors.company}
            helperText={errors.company?.message}
          />
          <TextField
            margin="dense"
            label="Title"
            name="title"
            fullWidth
            required
            {...register("title")}
                          error={!!errors.title}
                          helperText={errors.title?.message}
          />
          <TextField
            margin="dense"
            label="Description"
            name="description"
            fullWidth
            multiline
            rows={4}
            required
            {...register("description")}
                          error={!!errors.description}
                          helperText={errors.description?.message}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseJobDialog}>Cancel</Button>
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CreateJobForm;
