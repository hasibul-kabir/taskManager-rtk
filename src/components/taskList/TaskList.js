import React from 'react'
import { useSelector } from 'react-redux';
import { useGetTasksQuery } from '../../redux/features/task/taskApi';
import Task from './Task'

const TaskList = () => {
    const { data, isLoading, isError, error } = useGetTasksQuery();
    const { filterByProjects, searchBy } = useSelector((state) => state.filter);


    //filter data
    let filteredData = data?.filter((node) => {
        return filterByProjects.find((project) => project === node?.project?.projectName)
    })

    //search function
    const search = (data) => {
        return data.filter((item) => item.taskName?.toLowerCase().includes(searchBy?.toLowerCase()))
    }

    let content;
    if (isLoading) content = <p>Loading...</p>
    if (!isLoading && isError) content = <p>{error?.error?.replace('TypeError:', '')}</p>
    if (!isLoading && !isError && search(filteredData).length === 0) content = <p>No Tasks Here</p>
    if (!isLoading && !isError && search(filteredData).length > 0) content = search(filteredData)?.map((task) => <Task key={task?.id} task={task} />)
    return (
        <div className="lws-task-list">
            {content}
        </div>
    )
}

export default TaskList