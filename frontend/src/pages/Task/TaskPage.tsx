import {useNavigate} from "react-router-dom";
import {useLoginMutation} from "../../store/api/api";
import {Tasks} from "../../components/task/Tasks";
import {Button} from "@mui/material";

export const TaskPage = () => {


    const navigate = useNavigate();


    const onLogin = () => {
        navigate('/login')
    }
    const [_, { data: authData, isLoading: authLoading }] = useLoginMutation();

    console.log(authData, authLoading)
    if (authLoading) {
        return <div>Loading authentication data...</div>;
    }



    return <div>
        {authLoading && <div>Loading authentication data...</div>}
        {!authData
            ? <div>
                <div> Not authenticated. Please log in.</div>
                <Button onClick={onLogin}>LOGIN</Button>

        </div>
            : <div>
                <h2>Task List</h2>
                <Tasks/>
            </div>}
    </div>
}
