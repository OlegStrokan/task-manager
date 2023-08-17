import { Grid } from '@mui/material';
import styles from './Login.module.css'
import { useNavigate } from "react-router-dom";
import {useState, useEffect} from "react";
import {SignUp} from "../../components/auth/SignUp";
import {SignIn} from "../../components/auth/SignIn";

interface LoginInterface {
    isAuth: boolean,

}

export const LoginPage = ({ isAuth }: LoginInterface) => {
    const [register, setRegister] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        if (isAuth) {
             navigate(`/tasks`);
        }
    },[isAuth, navigate])

    const onModelChange = () => {
        setRegister(!register);
    };

    return (
        <Grid className={styles.root}>
            {!register ? <SignUp onModelChange={onModelChange} /> : <SignIn onModelChange={onModelChange} />}
        </Grid>
    );
}
