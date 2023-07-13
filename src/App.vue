<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="text-h6">
              To Do List
            </v-list-item-title>
            <v-list-item-subtitle>
              Keep track of things you need to do!
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list
          dense
          nav
        >
          <v-list-item
            v-for="item in items"
            :key="item.title"
            :to="item.to"
            link
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
    </v-navigation-drawer>

  <v-app-bar
        app
        color="primary"
        dark
        src="takingnote.gif"
        prominent
      >
        <template v-slot:img="{ props }">
          <v-img
            v-bind="props"
            gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.2)"
          ></v-img>
        </template>

        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

        <v-app-bar-title class="custom-title">To Do List</v-app-bar-title>

        <v-spacer></v-spacer>

      </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script setup>
import {ref} from 'vue'
const drawer = ref(null)
</script>

<script>
export default {
  data: () => ({ drawer: null,
  items: [
      { title: 'To Do', icon: 'mdi-list-box-outline',to:'/' },
      { title: 'About', icon: 'mdi-help-box',to:'/about'},
    ]
  }),
}
</script>