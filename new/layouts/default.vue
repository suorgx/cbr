<template>
  <v-app dark>
    <v-app-bar fixed dense app>
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-switch hide-details v-model="$vuetify.theme.dark" inset></v-switch>
      <v-icon v-if="$vuetify.theme.dark" dark> mdi-theme-light-dark </v-icon>
      <v-icon v-else> mdi-theme-light-dark </v-icon>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer :absolute="!fixed" app>
      <span>suorg &copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "DefaultLayout",
  data() {
    return {
      fixed: false,
      title: "Курсы валют ЦБ РФ относительно рубля",
    };
  },
};
</script>

<style scoped>
#app {
  font-family: 'Noto Sans', sans-serif !important;
}
</style>
