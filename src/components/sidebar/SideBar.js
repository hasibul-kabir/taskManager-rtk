import React from 'react'
import { useGetProjectsQuery } from '../../redux/features/projects/projectsApi';
import ProjectList from './ProjectList'
import TeamMembers from './TeamMembers'

const SideBar = () => {
    const { data, isLoading, isError, error } = useGetProjectsQuery();


    let content;
    if (isLoading) content = <p>Loading...</p>
    if (!isLoading && isError) content = <p>{error?.error?.replace('TypeError:', '')}</p>
    if (!isLoading && !isError && data.length === 0) content = <p>No Projects Here</p>
    if (!isLoading && !isError && data.length) content = <ProjectList data={data} />
    return (
        <div className="sidebar">
            <div>
                <h3 className="text-xl font-bold">Projects</h3>
                {content}
            </div>

            <TeamMembers />
        </div>

    )
}

export default SideBar