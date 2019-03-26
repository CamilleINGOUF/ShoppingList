<template>
  <v-container grid-list-xs>
    <v-card>
      <v-card-title primary-title>
        <span class='title mr-5'>My lists</span>
        <v-divider vertical></v-divider>
        <v-spacer/>
        <create-lists-dialog :lists="shopLists.lists"></create-lists-dialog>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="shopLists.lists"
        class="elevation-1"
        hide-actions
      >
        <template v-slot:items="props">
          <td class="text-xs-left">{{ props.item.name }}</td>
          <td class="text-xs-left">{{ props.item.list.length }}</td>
          <td class="text-xs-left">{{ props.item.budget }}</td>
          <td class="justify-left px-0">
            <v-btn :to='"/lists/"+props.item.name'>SEE</v-btn>
            <v-btn dark color="red darken-5" @click="deleteList(props.item.name)">DELETE</v-btn>
          </td>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import CreateListsDialog from '@/components/CreateListsDialog'
export default {
  data: () => ({
    // shopLists: {},

    headers: [{
      text: 'Name',
      value: 'name',
      sortable: false
    }, {
      text: 'List Length',
      value: 'list.length',
      sortable: false
    }, {
      text: 'Budget',
      value: 'budget',
      sortable: false
    }, {
      text: 'Actions',
      value: '',
      sortable: false
    }],

    dialog: false,

    name: '',

    alert: false
  }),

  methods: {
    deleteList (name) {
      this.$store.dispatch('deleteList', {name})
    }
  },

  computed: {
    shopLists () {
      return this.$store.getters.shopLists
    }
  },

  components: {
    CreateListsDialog
  }
}
</script>