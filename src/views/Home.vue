<template>
  <v-container grid-list-xs>
    <v-flex xs2>
      <v-card class='pa-3' v-if="lastList">
        <v-card-title primary-title>
          <span class="title">This is your last list</span>
        </v-card-title>
        <v-card color="green lighten-4">
          <v-card-title primary-title>
            <span class='title'>{{ lastList.name }}</span>
          </v-card-title>
          <v-card-text>
            Number of items : {{ lastList.list.length }}
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn :to='"/lists/"+lastList.name' color="green darken-4" dark>SEE</v-btn>  
          </v-card-actions>
        </v-card>
      </v-card>
      <v-alert v-else type="error" :value="true">
        You have no list.
        <create-lists-dialog/>
      </v-alert>
    </v-flex>
  </v-container>
</template>

<script>
import CreateListsDialog from '@/components/CreateListsDialog'
export default {
  data: () => ({
    lastList : null,

    shopLists: {}
  }),

  mounted () {
    this.lastList = this.$store.getters.lastUpdatedList
  },

  components: {
    CreateListsDialog
  }
}
</script>
