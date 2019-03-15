<template>
  <v-container grid-list-xs>
    <v-flex xs2>
      <v-card v-if="lastList" color="green lighten-4">
        <v-card-title primary-title>
          <span class='title'>{{ lastList.name }}</span>
        </v-card-title>
        <v-card-text>
          There are {{ lastList.length }} items in this list.
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn :to='"/list/"+lastList.name' color="green darken-4" dark>SEE</v-btn>  
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    lastList : null
  }),

  mounted () {
    const lists = JSON.parse(window.localStorage.getItem('shopLists')) || []
    this.lastList = lists[lists.length - 1]
  }
}
</script>
