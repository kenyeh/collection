import React from 'react'

const member = ({ onClick, name }) => (
    <a href="#" className="member" onClick={onClick}>{name}</a>
)

export default member
/*
List.propTypes = {
    members: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        picked: PropTypes.bool.isRequired
    }).isRequired).isRequired,
    onMemberClick: PropTypes.func.isRequired
}
*/

