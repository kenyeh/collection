import { connect } from 'react-redux'
import { pickMember } from '../actions'
import SelectListCom from '../componet/selectList'


const mapStateToProps = (state) => ({
    members: state.list.filter(t => !t.picked)
})

const mapDispatchToProps = {
    onMemberClick: pickMember
}



const SelectList = connect(
    mapStateToProps,
    mapDispatchToProps
)(SelectListCom)

export default SelectList