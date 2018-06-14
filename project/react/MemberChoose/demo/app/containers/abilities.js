import { connect } from 'react-redux'
import AbilitiesCom from '../componet/abilities'


const mapStateToProps = (state) => {
    //members: state.list.filter(t => t.picked)

    let data = {
        act: 0,
        agi: 0,
        def: 0
    }

    state.list.forEach((item, index) => {
        if (!item.picked) {
            return ;
        }

        let abilites = item.abilites

        Object.keys(abilites).forEach((a) => {
            // console.log(data[a], "-", abilites[a])
            data[a] = data[a] + abilites[a]
        })
    })

    // console.log('data', data)

    return {
        data: data
    }
}


const Abilities = connect(
    mapStateToProps,
)(AbilitiesCom)

export default Abilities