<template>
    <component :is="unitShow"></component>
</template>
<script>
import wuxing from '@/components/betPanels/wuxing'
import sanxing from '@/components/betPanels/sanxing'
import yixing from '@/components/betPanels/yixing'

export default {
    name: 'bet-component',
    data () {
        return {
            // betType: 'sanxing'
        }
    },
    components: {
        'wuxing': wuxing,
        'sanxing': sanxing,
        'yixing': yixing
    },
    computed: {
        unitShow: function () {
            return this.$store.getters.getModuleNameById().name
        }
    }
}
</script>
