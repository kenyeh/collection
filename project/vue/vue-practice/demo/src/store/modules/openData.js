// root types
import * as rootypes from '../mutations_type'

// types
const types = {
    OPEN_DATA: 'OPEN_DATA',
    OPEN_SEARCH_ID: 'OPEN_SEARCH_ID',
    OPEN_SEARCH_KEYWORD: 'OPEN_SEARCH_KEYWORD'
}

// state
const state = {
    opendata: [],
    idOption: ['1', '2', '3'],
    search: {
        id: 'all',
        keyword: ''
    }
}

// getters
const getters = {
    getOpenData: state => {
        let _opendata = state.opendata

        if (state.search.id !== 'all') {
            _opendata = _opendata.filter(item => (item.postId === parseInt(state.search.id)))
        }

        if (state.search.keyword !== '') {
            _opendata = _opendata.filter(item => (JSON.stringify(item.email).indexOf(state.search.keyword) !== -1))
        }

        return _opendata
    },
    getIdOption: state => state.idOption
}

// actions
const actions = {
    openData ({ commit }) {
        // start loading
        commit(rootypes.LOADING, true)

        // use fetch call to get data API
        fetch('https://jsonplaceholder.typicode.com/comments')
        .then(function (response) {
            // fetch -> ok ( response state 200 )
            if (response.ok) {
                return response.json()
            } else {
                console.log(response)
                // end loading
                commit(rootypes.LOADING, false)
            }
        })
        .then(function (data) {
            // json pass to mutations
            commit(types.OPEN_DATA, data)
            // end loading
            commit(rootypes.LOADING, false)
        })
        .catch(function (error) {
            console.error(error)
            // end loading
            commit(rootypes.LOADING, false)
        })
    },
    opendataSearchId ({ commit }, id) {
        commit(types.OPEN_SEARCH_ID, id)
    },
    opendataSearchKeyword ({ commit }, val) {
        commit(types.OPEN_SEARCH_KEYWORD, val)
    }
}

// mutations
const mutations = {
    [types.OPEN_DATA] (state, data) {
        state.opendata = data
    },
    [types.OPEN_SEARCH_ID] (state, id) {
        state.search.id = id
    },
    [types.OPEN_SEARCH_KEYWORD] (state, val) {
        state.search.keyword = val
    }
}

/* export */
export default {
    state,
    getters,
    actions,
    mutations
}
