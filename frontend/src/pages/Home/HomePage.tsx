import {useNavigate} from "react-router-dom";

export const HomePage = () => {
    const navigate = useNavigate()

    const onNavigate = () => {
        navigate('/tasks')
    }
       return (
        <div>
         hello
            <button onClick={onNavigate}>Go</button>
        </div>
    );
};

