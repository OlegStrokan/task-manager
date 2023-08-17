import {useGetTasksQuery} from "../../store/api/api";

export const Tasks = () => {

    const { data: tasksData, isLoading: tasksLoading } = useGetTasksQuery();


    return (
        <div>
            {tasksLoading && <div>Loading tasks...</div>}
            {tasksData && tasksData.length > 0 ?
                <div>
                    <ul>
                        {tasksData?.map((task) => (
                            <li key={task.id}>{task.title}</li>
                        ))}
                    </ul>
                </div>
                :
                <div>No tasks</div>
            }

        </div>
    );

};

