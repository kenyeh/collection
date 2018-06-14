
const list = (state = [], action) => {
    switch (action.type) {
        /*
        case 'ADD_TODO':
            return [
            ...state,
            {
                id: action.id,
                text: action.text,
                completed: false
            }
            ]
        */
        case 'PICK_MEMBER':
            return state.map(member => {
                    if (member.id !== action.id) {
                        return member
                    }

                    console.log('PICK_MEMBER', action.id)

                    return Object.assign({}, member, {
                        picked: !member.picked
                    })
                }
            )
        default:
            return state
    }
}

export default list