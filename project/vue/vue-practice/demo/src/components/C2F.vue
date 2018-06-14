<template>
<div class="c2f text-center">
    <div class="changeSet">
        <input  type="radio" name="set" value="f" v-model="isCelsius">華氏
        <input  type="radio" name="set" value="c" v-model="isCelsius">攝氏
    </div>
    <h2 v-show="isCelsius=='f'">華氏: {{ calculate }} °F</h2>
    <h2 v-show="isCelsius=='c'">攝氏: {{ calculate }} °C</h2>
    <div class="celsius">
        <span v-show="isCelsius=='f'">攝氏: </span>
        <span v-show="isCelsius=='c'">華氏: </span>
        <input type="number" v-model="inputNum" />
        
        <span v-show="isCelsius=='f'"> °C</span>
        <span v-show="isCelsius=='c'"> °F</span>
    </div>
</div>
</template>
<script>
    export default {
        data () {
            return {
                inputNum: 0,
                isCelsius: 'f'
            }
        },
        computed: {
            calculate () {
                if (this.isCelsius === 'f') {
                    return (this.inputNum * (9 / 5) + 32).toFixed(0)
                } else {
                    return ((this.inputNum - 32) * (5 / 9)).toFixed(0)
                }
            },
            fahrenheit () {
                return this.inputNum * (9 / 5) + 32
            },
            celsius () {
                return (this.inputNum - 32) * (5 / 9)
            }
        }
    }
</script>