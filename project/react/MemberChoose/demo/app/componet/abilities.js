import React from 'react'

const Abilities = ({ data }) => (
    <div className="abilities">
        <div className="title">Result</div>
        {
            Object.keys(data).map((ability, index) => {
                const title = ability.toLocaleUpperCase()
                const style = {
                    width: ((data[ability]/50)*100) + "%"
                }

                return (<div className="panel" key={index} aria-label={title}><span style={style}></span></div>)
            })
        }
        {/* <div className="panel act" aria-label="ACT"><span></span></div>
        <div className="panel agi" aria-label="AGI"><span></span></div>
        <div className="panel def" aria-label="DEF"><span></span></div> */}
    </div>
)

export default Abilities