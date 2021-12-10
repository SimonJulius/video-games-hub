<template>
  <article class="game">
    <header>{{ title }}</header>
    <p>
      {{ subtitle }}
    </p>
    <p class="game_body">
      {{ body }} <span class="score">{{ score }}</span>
    </p>
  </article>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'GameCard',
  props: {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
  },
});
</script>

<style scoped lang="scss">
@import '../assets/_variables.scss';
article {
  position: relative;
  padding: 1.2rem;
  background: #182c47;
  margin-bottom: 0.9rem;
  font-size: 13px;
  & p {
    display: flex;
    position: relative;
    margin-right: 10%;
    .score {
      position: absolute;
      right: -10%;
      bottom: 90%;
      display: flex;
      justify-content: center;
      align-items: center;
      background: $buttonColor;
      padding: 0.5rem 1rem;
      border-radius: 50%;
      font-size: 1.4rem;
      font-weight: 600;
      font-family: $montserrat;
      width: 3rem;
    }
  }
  & header {
    font-size: 1.2rem;
  }

  &:after {
    content: '';
    position: absolute;
    width: 20%;
    height: 0.9rem;
    background: #091627;
    bottom: 100%;
    left: -20%;
  }
  @media screen and (max-width: 71.7rem) {
    article:after {
      width: 25%;
    }
  }
}

@media screen and (max-width: $mobile) {
  article {
    margin-top: 30%;

    & p {
      .score {
        position: absolute;
        right: -10%;
        transform: translateY(-250%);
      }
    }
  }
}
</style>
