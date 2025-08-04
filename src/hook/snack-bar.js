import { useDispatch } from 'react-redux';
import { showSnackbar } from '../redux/snackbar-slice';

export const useSnackbar = () => {
    const dispatch = useDispatch();

    const openSnackbar = (params) => {
        dispatch(showSnackbar(params));
    };

    return openSnackbar;
};
