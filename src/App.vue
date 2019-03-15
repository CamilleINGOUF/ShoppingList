<template>
  <v-app>
    <v-content>
      <v-toolbar>
        <v-toolbar-title>Shopping List</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-sm-and-down">
          <v-btn flat to='/'>Home</v-btn>
          <v-btn flat to='/lists'>My Lists</v-btn>
          <v-btn flat to='/about'>About</v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: 'App'
}
</script>
