<template>
  <component :is="layout">
      <router-view></router-view>
      <Chatbot />
  </component>
</template>

<script>
import Chatbot from './components/Chatbot.vue'

const default_layout = "default";
export default {
  name: 'App',
  components: {
    Chatbot
  },
  computed: {
    layout() {
      return (this.$route.meta.layout || default_layout) + "-layout";
    },
  },
};
</script>
<style>
</style>