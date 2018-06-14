import { connect } from 'react-redux'
import { pickMember } from '../actions'
import ChooseListCom from '../componet/chooseList'


const mapStateToProps = (state) => ({
    members: state.list.filter(t => t.picked)
})

const mapDispatchToProps = {
    onMemberClick: pickMember
}



const ChooseList = connect(
    mapStateToProps,
    mapDispatchToProps
)(ChooseListCom)

export default ChooseList