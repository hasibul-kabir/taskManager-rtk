import React from 'react'
import { useParams } from 'react-router-dom';
import EditForm from '../editTask/EditForm'
import { useGetTasksQuery } from '../../redux/features/task/taskApi';

const EditTask = () => {
    const { taskId } = useParams();
    const id = Number(taskId);

    const { data, isLoading, isError } = useGetTasksQuery();

    const taskToEdit = data.find((task) => task?.id === id);

    let content;
    if (!isLoading && !isError && taskToEdit?.id) content = <EditForm taskToEdit={taskToEdit} />

    return (
        <div className="container relative">
            <main className="relative z-20 max-w-3xl mx-auto rounded-lg xl:max-w-none">
                <h1 className="mt-4 mb-8 text-3xl font-bold text-center text-gray-800">
                    Edit Task for Your Team
                </h1>

                <div className="justify-center mb-10 space-y-2 md:flex md:space-y-0">
                    {content}
                </div>
            </main>
        </div>
    )
}

export default EditTask