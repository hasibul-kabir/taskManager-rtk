import React, { useEffect, useState } from 'react'
import { useGetTeamMembersQuery } from '../../redux/features/team/teamMembersApi';
import { useGetProjectsQuery } from '../../redux/features/projects/projectsApi';
import { useEditTaskMutation } from '../../redux/features/task/taskApi';
import { useNavigate } from 'react-router-dom';

const EditForm = ({ taskToEdit }) => {
    const navigate = useNavigate();
    const { data: members, isLoading: isMembersLoading, isError: isMembersError } = useGetTeamMembersQuery();
    const { data: projects, isLoading: isProjectsLoading, isError: isProjectsError } = useGetProjectsQuery();
    const [editTask, { isLoading, isSuccess, isError }] = useEditTaskMutation();


    const { id, taskName: tName, teamMember, project, deadline, status } = taskToEdit;
    const { id: mId, name } = teamMember;
    const { projectName: pName, id: pId } = project;


    //manage local state
    // const [projectName, setProjectName] = useState(pName);
    // const [deadLine, setDeadLine] = useState(deadline);

    const [taskName, setTaskName] = useState(tName);
    const [memberId, setMemberId] = useState(mId);
    const [projectId, setProjectId] = useState(pId);
    const [deadLine, setDeadLine] = useState(deadline);
    const [assignTo, setAssignTo] = useState({});
    const [assignedProject, setAssignedProject] = useState({});

    let memberList;
    if (!isMembersLoading && !isMembersError && members.length > 0) {
        memberList = members.map((member) => <option key={member?.id} value={member?.id}>{member?.name}</option>)
    }

    let projectList;
    if (!isProjectsLoading && !isProjectsError && projects.length > 0) {
        projectList = projects.map((project) => <option key={project?.id} value={project?.id}>{project?.projectName}</option>)
    }

    //set corresponding values of teamMember & project to edit
    useEffect(() => {
        const assignto = members?.find((member) => member?.id === Number(memberId));
        setAssignTo(assignto);
        const assignedproject = projects?.find((project) => project?.id === Number(projectId));
        setAssignedProject(assignedproject);
    }, [memberId, projectId, members, projects]);


    const reset = () => {
        setTaskName('')
        setMemberId('')
        setProjectId('')
        setDeadLine('')
        setTaskName({})
        setTaskName({})
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        editTask({
            id,
            data: {
                taskName,
                teamMember: assignTo,
                project: assignedProject,
                deadline: deadLine,
                status
            }
        })
    }

    useEffect(() => {
        if (isSuccess) {
            reset()
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
                <input type="date" name="deadline" id="lws-deadline" required value={deadLine} onChange={(e) => setDeadLine(e.target.value)} />
            </div>

            <div className="text-right">
                <button type="submit" className="lws-submit" disabled={isLoading}>Save</button>
            </div>
        </form>
    )
}

export default EditForm