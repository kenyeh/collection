<template>
    <div class="container">
        <h1>Todo List</h1>
        <hr>
        <div class="row">
            <div class="input-group col-md-4">
                <input type="text" class="form-control" placeholder="add todo..." v-model="newTodo" @keyup.enter="actionAddTodo" />
                <span class="input-group-btn">
                    <button type="button" class="btn btn-success" @click="actionAddTodo">
                        <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
                    </button>
                </span>
            </div>
        </div>
    
        <div class="row">
            <div class="col-md-6">
                <h2>Todo List:</h2>
                <ol>
                    <todoItem v-for="(item, index) in todos" :item="item"></todoItem>
                </ol>
                <!--
                <ul>
                    <li v-for="(item, index) in todos">
                        <label for="">
                            <input type="checkbox" :checked="item.done" @change="toggleTodo( item.key )">
                            {{ item.content }}
                        </label>
                        <button class="btn btn-xs btn-danger" @click="deleteTodo( item.key )">
                            <span class="glyphicon glyphicon-trash" aria-hidden="true"></span>
                        </button>
                    </li>
                </ul>
                -->
            </div>
            <div class="col-md-6">
                <h2>Done List</h2>
                <ul>
                    <li v-for="(item, index) in doneList">
                        <customcheckbox :item="item" @toggleTodo="toggleTodo"></customcheckbox>
                        <!--
                        <label for="">
                            <input type="checkbox" :checked="item.done" @change="toggleTodo( item.key )">
                            {{ item.content }}
                        </label>
                        -->
                    </li>
                </ul>
            </div>
        </div>
    
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import todoItem from '../components/todo-item'
import customcheckbox from '../components/customCheckbox'

export default {
    data () {
        return {
            newTodo: ''
        }
    },
    components: {
        todoItem,
        customcheckbox
    },
    computed: mapGetters({
        todos: 'getTodos',
        doneList: 'getDone'
    }),
    methods: {
        ...mapActions([
            'toggleTodo',
            'deleteTodo'
        ]),
        actionAddTodo () {
            // 不需要引入actions
            this.$store.dispatch('addTodo', this.newTodo)

            // clear value
            this.newTodo = ''
        }
    }
}
</script>

