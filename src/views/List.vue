<template>
    <v-container grid-list-xs>
        <v-card>
          <v-card-title primary-title>
            <span class="title">{{shopList.name}} - Total : {{ total }} €</span>
            <v-divider vertical class="px-5"></v-divider>
            <v-spacer></v-spacer>
            <v-layout xs4 row>
              <v-flex xs12 sm6 class="py-2">
                <v-btn-toggle v-model="filterMode" mandatory>
                  <v-btn flat value="all">
                    All
                  </v-btn>
                  <v-btn flat value="bought">
                    Bought
                  </v-btn>
                  <v-btn flat value="notBought">
                    Not bought
                  </v-btn>
                </v-btn-toggle>
              </v-flex>
              <v-flex xs2 mr-2>
                <v-text-field
                  label="Budget"
                  :value="shopList.budget"
                  prefix="€"
                  type='number'
                  @input="modifyBudget"
                ></v-text-field>
              </v-flex>
              <v-flex xs5>
                <v-text-field
                  label="Item to add"
                  v-model="itemToAdd"
                  @keyup.enter="addItem"
                  :append-icon="'add'"
                  @click:append="addItem"
                ></v-text-field>
                
                <v-alert
                  :value="error"
                  type="error"
                  dismissible
                >
                  {{messageError}}
                </v-alert>
                <v-card v-if="filterDefaults.length !== 0" style="position: absolute; z-index: 10">
                  <v-list>
                    <v-list-tile
                      v-for="(item, index) in filterDefaults"
                      :key="index"
                      avatar
                      @click="itemToAdd = item"
                    >
                      <v-list-tile-content>
                        <v-list-tile-title v-text="item"></v-list-tile-title>
                      </v-list-tile-content>

                      <v-list-tile-avatar>
                        <img :src="item.avatar">
                      </v-list-tile-avatar>
                    </v-list-tile>
                  </v-list>
                </v-card>
              </v-flex>
            </v-layout>
          </v-card-title>
          <v-alert
            :value="alert"
            type="error"
          >
            Your budget is too low.
          </v-alert>
          <v-data-table
            :headers="headers"
            :items="listFilter"
            class="elevation-1"
            hide-actions
          >
            <template v-slot:items="props">
              <!-- <tr :active="props.item.checked" @click="props.item.checked = !props.item.checked"> -->
                <td>
                  <v-checkbox
                    v-model="props.item.checked"
                    hide-details
                    @change="modifyItem(props.item)"
                  ></v-checkbox>
                </td>
                <td class="text-xs-left">{{ props.item.name }}</td>
                <td class="text-xs-left pb-3">
                  <v-flex xs2> 
                    <v-text-field
                      v-if="props.item.checked"
                      prefix="€"
                      v-model="props.item.price"
                      hide-details
                      type='number'
                      @change="modifyItem(props.item)"
                    ></v-text-field>
                  </v-flex>
                </td>
                <td class="justify-left px-0">
                  <v-btn dark color="red accent-4" @click.stop="deleteItem(props.item.name)">DELETE <v-icon right>delete</v-icon></v-btn>
                </td>
              <!-- </tr> -->
            </template>
          </v-data-table>
        </v-card>
    </v-container>
</template>

<script>
export default {
  data: () => ({
    itemToAdd: '',

    budget: 50,

    filterMode: 'all',

    error: false,

    messageError : '',

    headers: [{
        text: 'Bought',
        value: 'checked',
        sortable: false
      },{
        text: 'Name',
        value: 'name',
        sortable: false
      }, {
        text: 'Price',
        value: 'price',
        sortable: false
      }, {
        text: 'Action',
        value: '',
        sortable: false
      }
    ],

    defaults : [
      "Bananes",
      "Chocolat",
      "Capotes",
      "Raisins",
      "Bonbons"
    ]
  }),

  methods: {
    addItem() {
      if(this.itemToAdd === '') {
        this.error = true
        this.messageError = 'Champ requis'
      } else if (this.$store.getters.itemExistsInList(this.shopList.name, this.itemToAdd)) {
        this.error = true
        this.messageError = 'Item déjà dans la liste'
      } else {
        this.$store.dispatch('addItemInList', {listName: this.shopList.name, itemName: this.itemToAdd})
        this.itemToAdd = ''
        this.error = false
      }
    },

    modifyItem (item) {
      this.$store.dispatch('modidyItemInList', {listName: this.shopList.name, itemName: item.name, item})
    },

    deleteItem (itemName) {
      this.$store.dispatch('deleteItemInList', {listName: this.shopList.name, itemName})
    },

    modifyBudget (val) {
      this.$store.dispatch('modifyList', { shopList : {...this.shopList, budget: val}})
    }
  },

  mounted() {
    if(!this.$store.getters.listExists(this.$route.params.name)) {
      this.$store.dispatch('addList', {name: this.$route.params.name})
    }
  },

  computed: {
    shopList () {
      return this.$store.getters.shopListByName(this.$route.params.name)
    },

    total () {
      if(this.shopList.list)
        return this.shopList.list.reduce((acc, cur) => cur.checked ? acc += Number(cur.price) : acc,0)
      return 0;
    },

    alert () {
      return this.total > this.shopList.budget
    },

    listFilter() {
      if(this.filterMode === 'notBought')
        return this.shopList.list.filter(i => !i.checked)
      else if(this.filterMode === 'bought')
        return this.shopList.list.filter(i => i.checked)
      return this.shopList.list
    },

    filterDefaults () {
      return this.defaults.filter(item => item.startsWith(this.itemToAdd) && this.itemToAdd !== '')
    }
  }
}
</script>
