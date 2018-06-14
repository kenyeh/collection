import React from 'react'
import Member from './member'

const SelectList = ({ members, onMemberClick }) => (
    <div className="selectList">
        <div className="title">Member List</div>
        <div className="list">
            {members.map(member => <Member key={member.id} {...member} onClick={() => onMemberClick(member.id)}/>)}
        </div>
    </div>
)

export default SelectList