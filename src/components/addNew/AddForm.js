import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useGetProjectsQuery } from '../../redux/features/projects/projectsApi';
import { useAddTaskMutation } from '../../redux/features/task/taskApi';
import { useGetTeamMembersQuery } from '../../redux/features/team/teamMembersApi';

const AddForm = () => {
    const navigate = useNavigate();
    const { data: members, isLoading: isMembersLoading, isError: isMembersError } = useGetTeamMembersQuery();
    const { data: projects, isLoading: isProjectsLoading, isError: isProjectsError } = useGetProjectsQuery();
    const [addTask, { isError, isLoading, isSuccess, error }] = useAddTaskMutation();

    //manage local state
    const [taskName, setTaskName] = useState('');
    const [memberId, setMemberId] = useState('');
    const [projectId, setProjectId] = useState('');
    const [deadline, setDeadLine] = useState('');
    const [teamMember, setTeamMember] = useState({});
    const [project, setProject] = useState({});

    let memberList;
    if (!isMembersLoading && !isMembersError && members.length > 0) {
        memberList = members.map((member) => <option key={member?.id} value={member?.id}>{member?.name}</option>)
    }

    let projectList;
    if (!isProjectsLoading && !isProjectsError && projects.length > 0) {
        projectList = projects.map((project) => <option key={project?.id} value={project?.id}>{project?.projectName}</option>)
    }


    useEffect(() => {
        const assignto = members?.find((member) => member?.id === Number(memberId));
        setTeamMember(assignto);
        const assignedProject = projects?.find((project) => project?.id === Number(projectId));
        setProject(assignedProject);
    }, [memberId, projectId, members, projects]);

    const handleSubmit = (e) => {
        e.preventDefault();
        addTask({
            taskName,
            teamMember,
            project,
            deadline,
            status: "pending"
        });
    }
    useEffect(() => {
        if (isSuccess) {
            navigate('/')
        }
    }, [isSuccess])
    return (
        <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="fieldContainer">
                <label for="lws-taskName">Task Name</label>
                <input
                    type="text"
                    name="taskName"
                    id="lws-taskName"
                    required
                    placeholder="Implement RTK Query"
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                />
            </div>

            <div className="fieldContainer">
                <label>Assign To</label>
                <select name="teamMember" id="lws-teamMember" required value={memberId} onChange={(e) => setMemberId(e.target.value)}>
                    <option value="" hidden selected>Select Job</option>
                    {memberList}
                </select>
            </div>
            <div className="fieldContainer">
                <label for="lws-projectName">Project Name</label>
                <select id="lws-projectName" name="projectName" required value={projectId} onChange={(e) => setProjectId(e.target.value)}>
                    <option value="" hidden selected>Select Project</option>
                    {projectList}
                </select>
            </div>

            <div className="fieldContainer">
                <label for="lws-deadline">Deadline</label>
                <input type="date" name="deadline" id="lws-deadline" required value={deadline} onChange={(e) => setDeadLine(e.target.value)} />
            </div>

            <div className="text-right">
                <button type="submit" className="lws-submit" disabled={isLoading}>Save</button>
            </div>
        </form>
    )
}

export default AddForm