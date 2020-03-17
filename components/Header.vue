<template>
  <b-navbar variant="faded" type="light">
    <div class="container">
      <b-navbar-brand>
        Nuxt-Firebase-Sample
      </b-navbar-brand>
      <b-navbar-nav class="ml-auto">
        <template v-if="$store.getters.getAuth.uid === null">
          <a href="#" @click.prevent="login()">
            Login with Google
          </a>
        </template>
        <template v-else>
          <b-nav-item-dropdown right>
            <template v-slot:button-content>
              {{ $store.getters.getAuth.name }}
            </template>
            <b-dropdown-item to="/users">Users</b-dropdown-item>
            <b-dropdown-item to="/users/create">Create user</b-dropdown-item>
            <b-dropdown-item href="#" @click.prevent="logout()">Logout</b-dropdown-item>
          </b-nav-item-dropdown>
        </template>
      </b-navbar-nav>
    </div>
  </b-navbar>
</template>

<script>
export default {
  data() {
    return {
      keys: {
        uid: 'nfs_auth_uid',
        name: 'nfs_auth_name'
      }
    }
  },
  mounted() {
    const auth = {
      uid: this.$localStorage.get(this.keys.uid, null),
      displayName: this.$localStorage.get(this.keys.name, null)
    }

    this.$store.commit('setAuth', auth)
  },
  methods: {
    login() {
      this.$store.dispatch('login')
      .then(() => {
        const auth = this.$store.getters.getAuth

        this.$localStorage.set(this.keys.uid, auth.uid)
        this.$localStorage.set(this.keys.name, auth.name)
      })
    },
    logout() {
      this.$localStorage.remove(this.keys.uid)
      this.$localStorage.remove(this.keys.name)

      this.$store.commit('setAuth', { uid: null, name: null })
    }
  }
}
</script>
