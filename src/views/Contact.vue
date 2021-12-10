<template>
  <div class="contact">
    <nav-bar />
    <div class="contact_contents">
      <div class="minimise">
        <h3>GET IN TOUCH</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto
          voluptatibus molestiae nesciunt, voluptas omnis sed esse iure laborum
          qui neque.
        </p>

        <div class="form-group">
          <h6>Contact Form</h6>

          <div class="customer-info">
            <Input label="Name" type="text" placeholder="" />
            <Input label="Email Address" type="text" placeholder="" />
          </div>
          <div class="customer-comment">
            <Input label="Message" type="textarea" placeholder="" />
          </div>
          <div class="button_container">
            <button class="send">Send</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import NavBar from '@/components/NavBar.vue';

export default defineComponent({
  name: 'Home',
  components: {
    NavBar,
  },
});
</script>

<style lang="scss" scoped>
.contact_contents {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  background-image: linear-gradient(#081221, #03080f);
  & .minimise {
    height: 40rem;
    width: 27rem;
    margin-top: 3rem;
  }

  & .form-group {
    margin-top: 1.5rem;
    background: #101d2f;
    padding: 2rem 2rem;

    .button_container {
      display: flex;
      justify-content: flex-end;
    }
    .send {
      border: none;
      padding: 0.2rem 0.7rem;
      font-size: 12px;
      margin-top: 1rem;
    }
    .customer-info {
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
