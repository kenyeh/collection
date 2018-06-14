import React from 'react';
import { render } from 'react-dom'

import { createStore , combineReducers } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'

import App from './componet/App'

const defaultData = {
    list: [
        {
            id: 0,
            name: 'm1',
            picked: false,
            abilites: {
                act: 5,
                agi: 10,
                def: 1
            }
        },
        {
            id: 1,
            name: 'm2',
            picked: false,
            abilites: {
                act: 5,
                agi: 2,
                def: 8
            }
        },
        {
            id: 2,
            name: 'm3',
            picked: false,
            abilites: {
                act: 2,
                agi: 10,
                def: 4
            }
        },
        {
            id: 3,
            name: 'm4',
            picked: false,
            abilites: {
                act: 2,
                agi: 2,
                def: 10
            }
        }
    ]
}


const store = createStore(
    reducer, 
    defaultData,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

render (
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
)

// ReactDOM.render(<App/>, document.getElementById('app'));