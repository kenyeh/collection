<template>
    <div id="app">
        <navbar></navbar>
        <game-page></game-page>
        <footer-bar></footer-bar>
        <history v-if="showHistory"></history>
        <record v-if="showRecord"></record>
        <options v-if="showOptions"></options>
        <play-change v-if="showPlayChange"></play-change>
        <issues-change v-if="showIssuesChange"></issues-change>
        <loading v-if="showLoading"></loading>
        <winning v-if="showWinning"></winning>
    </div>
</template>

<script>
import navbar from '@/components/navbar'
import gamePage from '@/components/game-page'
import footerbar from '@/components/footer-bar'
import options from '@/components/options'
import record from '@/components/record'
import history from '@/components/history'
import playChange from '@/components/play-change'
import issuesChange from '@/components/issues-change'
import loading from '@/components/loading'
import winning from '@/components/winning'
export default {
    data () {
        return {
        }
    },
    components: {
        'navbar': navbar,
        'game-page': gamePage,
        'footer-bar': footerbar,
        'options': options,
        'record': record,
        'history': history,
        'play-change': playChange,
        'issues-change': issuesChange,
        'loading': loading,
        'winning': winning
    },
    created () {
        this.$store.dispatch('actionInitiGame')
    },
    computed: {
        showOptions: function () {
            return this.$store.getters.getModalOptions
        },
        showRecord: function () {
            return this.$store.getters.getModalRecord
        },
        showHistory: function () {
            return this.$store.getters.getModalHistory
        },
        showPlayChange: function () {
            return this.$store.getters.getModalPlayChange
        },
        showIssuesChange: function () {
            return this.$store.getters.getModalIssuesChange
        },
        showLoading: function () {
            return this.$store.getters.getModalLoading
        },
        showWinning: function () {
            return this.$store.getters.getModalWinning
        }
    }
}
</script>



