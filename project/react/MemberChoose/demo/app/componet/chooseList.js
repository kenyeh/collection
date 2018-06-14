import React from 'react'
import Member from './member'

const ChooseList = ({ members, onMemberClick }) => (
    <div className="chooseList">
        <div className="title">Picked List</div>
        <div className="list">
            {members.map(member => <Member key={member.id} {...member} onClick={() => onMemberClick(member.id)}/>)}
        </div>
    </div>
)

export default ChooseList