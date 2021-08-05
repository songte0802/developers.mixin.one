<template>
  <div>
    <label>{{ label }}</label>
    <input
      :disabled="disabled === ''"
      :placeholder="placeholder || ''"
      :value="value"
      @input="change($event)"
    />
    <img
      v-if="isCopied"
      v-clipboard:copy="value"
      　　v-clipboard:success="click_copy_success"
      　　v-clipboard:error="click_copy_error"
      src="@/assets/img/ic_copy.png"
    />
  </div>
</template>

<script>
export default {
  name: 't-input',
  props: ['value', 'label', 'disabled', 'placeholder', 'isCopied'],
  methods: {
    change(event) {
      this.$emit('input', event.target.value)
    },
    click_copy_success() {
      this.$message.success({
        message: this.$t('message.success.copy'),
        showClose: true,
      })
    },
    click_copy_error() {
      this.$message.error({
        message: this.$t('message.errors.copy'),
        showClose: true,
      })
    },
  },
}
</script>

<style lang="scss" scoped>
div {
  position: relative;
}

label {
  font-weight: 700;
  display: block;
  line-height: 1rem;
  margin-bottom: 1rem;
}

input {
  box-sizing: border-box;
  width: 100%;
  height: 4rem;
  font-size: 1rem;
  padding: 0 1.25rem;
  box-shadow: 0px 1px 4px rgba(125, 137, 155, 0.3);
  border-radius: 0.375rem;

  &::-webkit-input-placeholder {
    color: #a9b0bf;
  }

  &::-moz-input-placeholder {
    color: #a9b0bf;
  }

  &::-ms-input-placeholder {
    color: #a9b0bf;
  }

  &:disabled {
    background: #ebedf2;
    color: #a9b0bf;
    box-shadow: none;
  }
}

img {
  border-radius: 0;
  cursor: pointer;
  position: absolute;
  right: 0.625rem;
  top: 50%;
  transform: translateY(0.5rem);
}

@media screen and (max-width: 48rem) {
  input {
    font-weight: 500;
    height: 3.125rem;
  }
}
</style>
