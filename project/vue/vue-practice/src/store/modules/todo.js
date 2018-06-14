// types
const types = {
    ADD_TODO: 'ADD_TODO',
    TOGGLE_TODO: 'TOGGLE_TODO',
    DELETE_TODO: 'DELETE_TODO',
    UPDATE_TODO: 'UPDATE_TODO'
}

// state
const state = {
    todos: [{
        key: 0,
        content: 'vue.js 2.0 -111',
        done: true
    },
    {
        key: 1,
        content: 'vue.js 2.0 -222',
        done: true
    },
    {
        key: 2,
        content: 'vue.js 2.0 -333',
        done: false
    },
    {
        key: 3,
        content: 'vue.js 2.0 -444',
        done: false
    }]
}

let todoKey = state.todos.length

// getters
const getters = {
    getTodos: state => {
        return state.todos
    },
    getDone: state => {
        return state.todos.filter((item) => {
            return item.done
        })
    },
    getTodo: state => {
        return state.todos.filter((item) => {
            return !item.done
        })
    }
}

// actions
const actions = {
    addTodo ({ commit }, newTodo) {
        commit(types.ADD_TODO, newTodo)
    },
    toggleTodo ({ commit }, obj) {
        commit(types.TOGGLE_TODO, obj)
    },
    deleteTodo ({ commit }, key) {
        commit(types.DELETE_TODO, key)
    },
    updateTodo ({ commit }, obj) {
        console.log('updateTodo', obj)
        commit(types.UPDATE_TODO, obj)
    }
}

// mutations
const mutations = {
    [types.ADD_TODO] (state, newTodo) {
        state.todos.push({
            key: todoKey,
            content: newTodo,
            done: false
        })

        todoKey++
    },
    [types.TOGGLE_TODO] (state, obj) {
        for (var i in state.todos) {
            var item = state.todos[i]

            if (item.key === obj.key) {
                item.done = obj.checked
                console.log('toggle_todo:', item.content, '| obj.checked?', obj.checked, '| done?', item.done)
            }
        }
    },
    [types.DELETE_TODO] (state, key) {
        for (var i in state.todos) {
            var item = state.todos[i]

            if (item.key === key) {
                console.log('delete_todo:', item.content, ', index?', i)
                state.todos.splice(i, 1)
                break
            }
        }
    },
    // update
    [types.UPDATE_TODO] (state, obj) {
        for (var i in state.todos) {
            var item = state.todos[i]
            if (item.key === obj.key) {
                console.log('update todo', item.content, ' to > ', obj.change)
                item.content = obj.change
                break
            }
        }
    }
}

/* export */
export default {
    state,
    getters,
    actions,
    mutations
}
