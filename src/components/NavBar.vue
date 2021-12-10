<template>
  <nav>
    <div>
      <router-link :class="videoClass" to="/">VIDEO GAMES</router-link>
    </div>
    <div>
      <router-link :class="contactClass" to="/contact">CONTACT</router-link>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Navbar',
  data() {
    return {
      videoClass: '',
      contactClass: '',
    };
  },
  created() {
    this.setClass();
  },
  methods: {
    setClass() {
      const name = this.$route.name;

      switch (name) {
        case 'Video':
          this.videoClass = 'video';
          this.contactClass = '';
          break;
        case 'Contact':
          this.contactClass = 'contact';
          this.videoClass = '';
          break;
        default:
          break;
      }
    },
  },
});
</script>

<style scoped lang="scss">
@import '../assets/_variables.scss';

nav {
  background: #091627;
  padding: 5rem 0 4rem 0;

  & > div {
    display: inline;
    &:nth-child(1) {
      margin-right: 2rem;
      margin-left: 6rem;
    }

    & > a {
      text-decoration: none;
      font-size: 28px;
      font-weight: 600;
      color: #fff;

      &:hover {
        color: #c1d1e8;
      }
    }
  }

  & .router-link-exact-active.video {
    position: relative;

    &:before {
      content: 'VIDEO';
      position: absolute;
      left: -20%;
      bottom: 0%;
      font-size: 3.7rem;
      color: #c1d1e81a;
    }
  }
  & .router-link-exact-active.contact {
    position: relative;

    &:before {
      content: 'CONTACT';
      position: absolute;
      left: -20%;
      bottom: 0%;
      font-size: 3.7rem;
      color: #c1d1e81a;
    }
  }
}
@media screen and (max-width: $tablet) {
  nav {
    display: flex;
    flex-direction: column;
    padding-left: 4rem;
    & > div {
      &:nth-child(1) {
        margin-right: 0;
        margin-left: 0;
        margin-bottom: 2rem;
      }

      & > a {
        font-size: 30px;
      }
    }
  }
}
</style>
