<template>
  <div
    :class="className"
    class="container"
    :tabindex="tabindex"
    @blur="closeSelectOnBlur"
  >
    <div class="selected" :class="{ open: isOpened }" @click="toggleSelect">
      {{ selected }}
    </div>
    <div class="items" :class="{ selectHide: !isOpened }">
      <div
        v-for="(option, i) of options"
        :key="i"
        @click="selectOption(option)"
      >
        {{ option }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    options: {
      type: Array,
      required: true,
    },
    default: {
      type: String,
      required: false,
      default: null,
    },
    tabindex: {
      type: Number,
      required: false,
      default: 0,
    },
    className: {
      type: String,
      required: false,
    },
  },
  mounted() {
    this.$emit('select', this.selected);
  },
  data() {
    return {
      selected: this.default
        ? this.default
        : this.options.length > 0
        ? this.options[0]
        : null,
      isOpened: false,
    };
  },
  methods: {
    toggleSelect() {
      this.$emit('onSelectOpen');
      return (this.isOpened = !this.isOpened);
    },
    closeSelectOnBlur() {
      return (this.isOpened = false);
    },

    selectOption(value: string) {
      this.selected = value;
      this.isOpened = false;
      this.$emit('select', this.selected);
      return;
    },
  },
  emits: ['select', 'onSelectOpen'],
});
</script>

<style lang="scss" scoped>
@import '../assets/_variables.scss';

.container {
  position: relative;
  width: 100%;
  text-align: left;
  outline: none;
  height: 1.953rem;
  line-height: 1.953rem;
  .selected {
    background-color: #182c47;
    padding-left: 1em;
    cursor: pointer;
    user-select: none;

    &:after {
      position: absolute;
      content: '';
      top: 50%;
      right: 1em;
      width: 0;
      height: 0;
      border: 5px solid transparent;
      border-color: #fff transparent transparent transparent;
    }

    @media (max-width: 67.5rem) {
      font-size: 10px;
    }
  }
  .items {
    overflow: hidden;
    position: absolute;
    background: #182c47;
    left: 0;
    right: 0;
    z-index: 1;
    div {
      color: #fff;
      padding-left: 1em;
      cursor: pointer;
      user-select: none;
      &:hover {
        background: #07111f;
      }
    }
  }
  .selectHide {
    display: none;
  }
}

@media screen and (max-width: $mobile) {
  .items {
    background: #182c47df !important;
  }
}
</style>
