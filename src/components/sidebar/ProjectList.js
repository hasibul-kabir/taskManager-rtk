import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { filterKeys } from '../../redux/features/filters/filterSlice';

const ProjectList = ({ data }) => {
    const dispatch = useDispatch();
    let myProjects = data?.map((el) => el.projectName);
    const [filterTags, setFilterTags] = useState([...myProjects]);

    const filterHandler = (e) => {
        if (e.target.checked) {
            setFilterTags([...filterTags, e.target.value])
        } else {
            setFilterTags(
                filterTags.filter((filterTag) => filterTag !== e.target.value)
            )
        }
    }

    useEffect(() => {
        dispatch(filterKeys(filterTags))
    }, [filterTags, dispatch])


    let projects = data.map((project) => {
        const { id, projectName, colorClass } = project || {};
        return (
            <div className="checkbox-container" key={id}>
                <input type="checkbox" className={colorClass} checked={filterTags.includes(projectName)} value={projectName} onChange={filterHandler} />
                <p className="label">{projectName}</p>
            </div>
        )
    })

    return (
        <div className="mt-3 space-y-4">
            {projects}
        </div>
    )
}

export default ProjectList