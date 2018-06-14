<template>
    <span class="list">
        <span class="squaredFour">
            <input type="checkbox" :id="getID" :checked="item.done" @change="handleChange" />
            <label class="checkbox-icon forcheck" :for="getID" ></label>
        </span>
        <label :for="getID">{{ item.content }}</label>
    </span>
</template>
<script>
export default {
    props: {
        item: Object
    },
    computed: {
        getID () {
            return `custom_${Math.floor(Math.random() * 9999)}`
        }
    },
    methods: {
        handleChange ($event) {
            this.$emit('toggleTodo', {
                key: this.item.key,
                checked: $event.target.checked
            })
        }
    }
}
</script>
<style>

.squaredFour {
    display: inline-block;
  width: 20px;
  position: relative;
  /*margin: 20px auto;*/
}
.squaredFour .forcheck {
  width: 20px;
  height: 20px;
  cursor: pointer;
  position: absolute;
  top: 0;
  left: 0;
  background: #fcfff4;
  background: -webkit-linear-gradient(top, #fcfff4 0%, #dfe5d7 40%, #b3bead 100%);
  background: linear-gradient(to bottom, #fcfff4 0%, #dfe5d7 40%, #b3bead 100%);
  border-radius: 4px;
  box-shadow: inset 0px 1px 1px white, 0px 1px 3px rgba(0, 0, 0, 0.5);
}
.squaredFour .forcheck:after {
  content: '';
  width: 9px;
  height: 5px;
  position: absolute;
  top: 7px;
    left: 6px;
  border: 3px solid #333;
  border-top: none;
  border-right: none;
  background: transparent;
  opacity: 0;
  -webkit-transform: rotate(-45deg);
          transform: rotate(-45deg);
}
.squaredFour .forcheck:hover::after {
  opacity: 0.5;
}
.squaredFour input[type=checkbox] {
  visibility: hidden;
}
.squaredFour input[type=checkbox]:checked + .forcheck:after {
  opacity: 1;
}

</style>
