<template>
  <v-container grid-list-xs>
    <v-card>
      <v-card-title primary-title>
        <span class='title mr-5'>My lists</span>
        <v-divider vertical></v-divider>
        <v-spacer/>
        <v-dialog v-model="dialog" persistent max-width="600px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark v-on="on">New</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">List</span>
            </v-card-title>

            <v-alert
              :value="alert"
              type="error"
            >
              Name already taken or empty.
            </v-alert>
            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12>
                    <v-text-field v-model="name" label="List name"></v-text-field>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat @click="cancel">Close</v-btn>
              <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="lists"
        class="elevation-1"
        hide-actions
      >
        <template v-slot:items="props">
          <td class="text-xs-left">{{ props.item.name }}</td>
          <td class="text-xs-left">{{ props.item.list.length }}</td>
          <td class="text-xs-left">{{ props.item.budget }}</td>
          <td class="justify-left px-0">
            <v-btn :to='"/list/"+props.item.name'>SEE</v-btn>
            <v-btn dark color="red darken-5" @click="deleteList(props.item.name)">DELETE</v-btn>
          </td>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    lists: [],

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

  mounted () {
    this.lists = JSON.parse(window.localStorage.getItem('shopLists')) || []
  },

  methods: {
    deleteList (name) {
      this.lists = this.lists.filter(l => l.name !== name)
      window.localStorage.setItem('shopLists',JSON.stringify(this.lists))
    },

    cancel () {
      this.name = ''
      this.dialog = false
      this.alert = false
    },

    save () {
      if(this.name === '' || this.lists.reduce((acc, cur) => cur.name === this.name ? true : acc,false))
        this.alert = true
      else {
        this.$router.push('/list/'+this.name)
        this.cancel()
      }
    }
  }
}
</script>