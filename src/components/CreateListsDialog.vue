<template>
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
</template>

<script>
export default {
    props: {
        lists: Array
    },

    data: () => ({
        dialog: false,
        
        alert: false,

        name: ''
    }),

    methods: {
        cancel () {
            this.name = ''
            this.dialog = false
            this.alert = false
            },

        save () {
            if(this.name === '' || this.lists.reduce((acc, cur) => cur.name === this.name ? true : acc,false))
                this.alert = true
            else {
                this.$router.push('/lists/'+this.name)
                this.cancel()
            }
        }
    }
}
</script>
