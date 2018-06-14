<template>
    <div class="header clearfix">
        <div class="left-block">
            <a href="#" class="btn-back"></a>
        </div>
        <div class="right-block">
            <a href="javascript:" class="btn-pro" v-on:click="openModal"><span class="glyphicon glyphicon-option-horizontal"></span></a>
        </div>
        <div class="title clearfix">
            {{gameTitle}}
        </div>
    </div>
</template>

<script>
export default {
    name: 'navbar',
    data () {
        return {
            gameTitle: 'Vue时时彩'
        }
    },
    methods: {
        openModal: function () {
            this.$store.dispatch('actionModalShow', {modal: 'Options'})
        }
    }
}
</script>
