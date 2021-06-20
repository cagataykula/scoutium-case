<template>
  <button :disabled="disabled" class="button" :style="`background-color: ${backgroundColor}; color: ${color};  width: ${big ? '225px;' : 'unset'}`"><slot /></button>
</template>

<script>
export default {
  props: {
    backgroundColor: {
      required: false,
      type: String,
      default: ''
    },
    color: {
      required: false,
      type: String,
      default: '#fff'
    },
    disabled: {
      required: false,
      default: false,
      type: Boolean
    },
    big: {
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
  min-width: 100px;
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