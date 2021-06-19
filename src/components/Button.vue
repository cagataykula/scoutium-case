<template>
  <button :disabled="disabled" class="button" :style="`background-color: ${color}`"><slot /></button>
</template>

<script>
export default {
  props: {
    color: {
      required: false,
      type: String,
      default: ''
    },
    disabled: {
      required: false,
      default: false,
      type: Boolean
    }
  }
}
</script>

<style lang="scss" scoped>
.button {
  background-color: $light-royal-blue;
  color: $white;
  min-width: 225px;
  height: 36px;
  padding: 10px;
  border-radius: 8px;
  outline: none;
  border: none;
  font-family: SofiaPro;
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.17;
  letter-spacing: normal;
  text-align: center;
  cursor: pointer;
  &:disabled {
    background-color: $bluey-grey;
    cursor: not-allowed;
  }
}

</style>