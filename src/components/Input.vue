<template>
  <div>
    <label>
      {{ label }}
      <textarea class="input textarea" v-if="type === 'textarea'"> </textarea>
      <input
        class="input"
        v-else
        :type="type"
        name=""
        id=""
        :min="min"
        :max="max"
        :placeholder="placeholder"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
      />
    </label>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Input',
  emits: ['update:modelValue'],
  props: {
    modelValue: [String, Number],
    type: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      required: true,
    },
    min: {
      type: Number,
      required: false,
    },
    max: {
      type: Number,
      required: false,
    },
  },
});
</script>

<style scoped lang="scss">
.input {
  display: block;
  margin-top: 4%;
  background: #182c47;
  width: 100%;
  border: 0;
  height: 1.953rem;
  padding: 0.75rem;
  &:focus {
    outline: none;
  }
}
.textarea {
  height: 5.8rem;
}
::placeholder {
  color: #c1d1e8;
  opacity: 0.5;
  font-size: 0.9rem;
}
</style>
