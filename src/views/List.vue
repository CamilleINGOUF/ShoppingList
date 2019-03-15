<template>
    <v-container grid-list-xs>
        <v-card>
          <v-card-title primary-title>
            <span class="title">My List - Total : {{ total }}</span>
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
                  v-model="budget"
                  prefix="€"
                  type='number'
                ></v-text-field>
              </v-flex>
              <v-flex xs5>
                <v-combobox
                  label="Item to add"
                  :items="defaults"
                  v-model="itemToAdd"
                  @keyup.enter="addItem"
                  :append-icon="'add'"
                  @click:append="addItem"
                ></v-combobox>
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
                    ></v-text-field>
                  </v-flex>
                </td>
                <td class="justify-left px-0">
                  <v-btn dark color="red accent-4" @click.stop="deleteItem(props.index)">DELETE <v-icon right>delete</v-icon></v-btn>
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
    shopList: [],

    itemToAdd: '',

    budget: 50,

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
      if(this.itemToAdd === '') 
        return;
      this.shopList.push({
        name: this.itemToAdd,
        price: 0,
        checked: false
      })
      this.itemToAdd = ''
    },

    deleteItem (index) {
      this.shopList.splice(index, 1)
    }
  },

  mounted() {
    this.shopList = JSON.parse(window.localStorage.getItem('shopList')) || []
    this.budget = JSON.parse(window.localStorage.getItem('budget')) || 50
  },

  watch: {
    shopList: {
      handler () {
        window.localStorage.setItem('shopList', JSON.stringify(this.shopList))
      },
      deep: true
    },

    budget () {
      window.localStorage.setItem('budget', JSON.stringify(this.budget)) 
    }
  },

  computed: {
    total () {
      return this.shopList.reduce((acc, cur) => cur.checked ? acc += Number(cur.price) : acc,0)
    },

    alert () {
      return this.total > this.budget
    },

    listFilter() {
      if(this.listFilter === 'notBought')
        return this.shopList.filter(i => !i.checked)
      else if(this.listFilter === 'bought')
        return this.shopList.filter(i => i.checked)
      return this.shopList
    }
  }
}
</script>
