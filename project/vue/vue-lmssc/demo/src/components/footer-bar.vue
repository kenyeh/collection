<template>
    <div class="footer clearfix">
        <div class="my-orders">
            <button class="btn btn-orders" v-on:click="openModal"></button>
        </div>

        <div class="submit">
            <button class="btn btn-submit" :disabled="submitDisabled" v-on:click="submitOrders"></button>
        </div>
        <div class="my-info">
            <a href="#" class="btn btn-deposit">
                <span class="balance">{{currentBalance}}</span>
            </a>
        </div>
    </div>
</template>

<script>
export default {
    name: 'footerbar',
    data () {
        return {}
    },
    computed: {
        currentBalance: function () {
            return this.$store.getters.getCurrentBalance
        },
        submitDisabled: function () {
            return this.$store.getters.getSubmitIsDisabled
        }
    },
    methods: {
        openModal: function () {
            this.$store.dispatch('actionOpenRecord')
        },
        submitOrders: function () {
            this.$store.dispatch('actionSubmitOrders')
        }
    }
}
</script>