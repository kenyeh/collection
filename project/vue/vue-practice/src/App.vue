<template>
    <div id="app">
        <!-- loading -->
        <div v-if="loading" class="loader loader-default is-active" data-text data-blink></div>
        <navbar></navbar>
        <router-view></router-view>
    </div>
</template>

<script>
import Navbar from '@/pages/Navbar'
import { mapGetters } from 'vuex'
export default {
    components: {
        Navbar
    },
    computed: mapGetters({
        // get loading state
        loading: 'getLoading'
    })
}
</script>

<style>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
