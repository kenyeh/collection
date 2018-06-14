<template>
    <div class="bet-sets">
        <ul class="clearfix">
            <li>
                <button class="btn set-clean"></button>
            </li>
            <li>
                <button class="btn btn-bet set-01" money-set="0.1"></button>
            </li>
            <li>
                <button class="btn btn-bet set-1" money-set="1"></button>
            </li>
            <li>
                <button class="btn btn-bet set-10" money-set="10"></button>
            </li>
            <li>
                <button class="btn btn-bet set-100" money-set="100"></button>
            </li>
            <li>
                <button class="btn btn-bet set-500 setting" money-set="500"></button>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'gameBetSet'
}
</script>
