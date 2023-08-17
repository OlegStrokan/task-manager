
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import styles from '../../pages/Login/Login.module.css';
import {Button} from "@mui/material";
import {signinSchema} from "../../helpers/validators/signin.schema";
import {useLoginMutation} from "../../store/api/api";
import {useNavigate} from "react-router-dom";

interface LoginFormValues {
    email: string
    password: string
}

interface SignInInterface {
    onModelChange: () => void;
}

export const SignIn = ({ onModelChange }: SignInInterface) => {

    const {
        register, handleSubmit, formState: { errors },
    } = useForm({
        resolver: yupResolver(signinSchema),
    });


    const navigate = useNavigate();

    const [login, { data, isLoading, error }] = useLoginMutation()


    if (data) {
         navigate('/tasks')
    }



    const onSubmit = async (formData: LoginFormValues) => {
        try {
            await login({ email: formData.email, password: formData.password })

            if (data) {
                navigate('/tasks')
            }
        } catch (e: any) {
            // just for testing. I also parsed error to tsx
            console.log(e)
        }
    }




    return (
        <Box className={styles.logIn}>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon/>
            </Avatar>
                <Box component="form" onSubmit={handleSubmit(onSubmit)} className={styles.inputs} noValidate sx={{ mt: 3 }}>
                    <Grid container spacing={2} className={styles.inputs}>
                        <Grid item xs={12}>
                            <TextField
                                data-testid="email-input"
                                required
                                fullWidth
                                id="email"
                                label="Email"
                                autoComplete="Email"
                                {...register('email')}
                                error={!!errors.email}
                            />
                            <Typography variant="subtitle2" color="error">
                                {errors.email?.message}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                data-testid="password-input"
                                required
                                fullWidth
                                id="password"
                                label="Password"
                                autoComplete="Password"
                                {...register('password')}
                                error={!!errors.password}
                            />
                            <Typography variant="subtitle2" color="error">
                                {errors.password?.message}
                            </Typography>
                        </Grid>
                        {/* {auth.error && <Grid item xs={12}><Typography variant="h6" color="error">{auth.error}</Typography></Grid>}*/}
                        <Grid item xs={12}>
                            <Button
                                data-testid="login-button"
                                type="submit"
                                fullWidth
                                disabled={isLoading}
                                variant="contained"
                                sx={{ mt: 1, mb: 2, p: 2 }}
                            >
                                Sign In
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            {error && <Typography variant="h6" color="error">{error.toString()}</Typography>}
                        </Grid>
                        <Grid item xs={12}>
                            <Button className={styles.link}  onClick={() => onModelChange()}>
                                Don't have an account? Sign Up
                            </Button>
                        </Grid>
                    </Grid>
                </Box></Box>
    );
};
