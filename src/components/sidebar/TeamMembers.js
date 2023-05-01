import React from 'react'
import { useGetTeamMembersQuery } from '../../redux/features/team/teamMembersApi'

const TeamMembers = () => {
    const { data, isLoading, isError, error } = useGetTeamMembersQuery();
    let content;
    if (isLoading) content = <p>Loading...</p>
    if (!isLoading && isError) content = <p>{error?.error?.replace('TypeError:', '')}</p>
    if (!isLoading && !isError && data.length === 0) content = <p>No Members Here</p>
    if (!isLoading && !isError && data.length > 0) content = data.map((member) => {
        const { id, name, avatar } = member || {};
        return (
            <div className="checkbox-container" key={id}>
                <img src={avatar} className="team-avater" alt={name} />
                <p className="label">{name}</p>
            </div>
        )
    }
    )
    return (
        <div className="mt-8">
            <h3 className="text-xl font-bold">Team Members</h3>
            <div className="mt-3 space-y-4">
                {content}
            </div>
        </div>
    )
}

export default TeamMembers