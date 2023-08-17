import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { useForm } from 'react-hook-form';
import {yupResolver} from "@hookform/resolvers/yup";
import styles from '../../pages/Login/Login.module.css'
import {signupSchema} from "../../helpers/validators/signup.schema";
import {useNavigate} from "react-router-dom";
import { useRegisterMutation} from "../../store/api/api";



interface RegisterFormValues {
    email: string
    password: string
    userName: string
    fullName: string
}


interface ISignUp {
    onModelChange: () => void;
}

export const SignUp = ({ onModelChange }: ISignUp ) => {

    const {
        register: reg, handleSubmit, formState: { errors },
    } = useForm({
        resolver: yupResolver(signupSchema),
    });

    const navigate = useNavigate();

    const [register, { data, isLoading, error }] = useRegisterMutation()


    if (data) {
         navigate('/task')
    }


    const onSubmit = async (formData: RegisterFormValues) => {
        try {
            await register({
                email: formData.email,
                password: formData.password,
                userName: formData.userName,
                fullName: formData.fullName
            })

            if (data) {
                navigate('/task')
            }
        } catch (e: any) {
            console.log(e)
        }
    }

    return (
        <Grid>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            ><Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
            </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
                    <Grid container spacing={2} className={styles.inputs}>
                        <Grid item xs={12}>
                            <TextField
                                autoComplete="email"
                                required
                                fullWidth
                                id="email"
                                label="Email"
                                autoFocus
                                {...reg('email')}
                                error={!!errors.email}
                            />
                            <Typography variant="subtitle2" color="error">
                                {errors.email?.message}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                autoComplete="full-name"
                                required
                                fullWidth
                                id="fullname"
                                label="Full name"
                                {...reg('fullName')}
                                error={!!errors.fullName}
                            />
                            <Typography variant="subtitle2" color="error">
                                {errors.fullName?.message}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="username"
                                label="User Name"
                                autoComplete="User name"
                                {...reg('userName')}
                                error={!!errors.userName}
                            />
                            <Typography variant="subtitle2" color="error">
                                {errors.userName?.message}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="password"
                                label="Password"
                                autoComplete="Password"
                                {...reg('password')}
                                error={!!errors.password}
                            />
                            <Typography variant="subtitle2" color="error">
                                {errors.password?.message}
                            </Typography>
                        </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        disabled={isLoading}
                        variant="contained"
                        sx={{ mt: 2, mb: 2, p: 2 }}
                    >
                        Sign Up
                    </Button>
                        <Grid item xs={12}>
                            {error && <Typography variant="h6" color="error">{error.toString()}</Typography>}
                        </Grid>
                    <Grid item xs={12}>
                        <Button className={styles.link} onClick={() => onModelChange()}>
                            Already have an account? Sign in
                        </Button>
                    </Grid>
                    </Grid>
                </Box>
            </Box>
        </Grid>
    );
};
