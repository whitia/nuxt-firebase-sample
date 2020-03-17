<template>
  <div>
    <Header />
    
    <b-form @submit.prevent="editUser">
      <div class="container mt-5">
  
        <div class="row justify-content-center mb-3">
          <div class="col-12 col-sm-3">
            <h2>Edit user</h2>
          </div>
        </div>
  
        <div class="row justify-content-center">
          <div class="col-12 col-sm-3">
            <b-form-group label="First name" label-for="first">
              <b-form-input
                id="first"
                :value="$store.getters.getUser.name.first"
                required
                placeholder="Jane"
              ></b-form-input>
            </b-form-group>
          </div>
        </div>
  
        <div class="row justify-content-center">
          <div class="col-12 col-sm-3">
            <b-form-group label="Last name" label-for="last">
              <b-form-input
                id="last"
                :value="$store.getters.getUser.name.last"
                required
                placeholder="Doe"
              ></b-form-input>
            </b-form-group>
          </div>
        </div>
  
        <div class="row justify-content-center">
          <div class="col-12 col-sm-3">
            <b-form-group label="Age" label-for="age">
              <b-form-input
                id="age"
                :value="$store.getters.getUser.age"
                required
                placeholder="20"
              ></b-form-input>
            </b-form-group>
          </div>
        </div>
  
        <div class="row justify-content-center">
          <div class="col-12 col-sm-3">
            Avatar
            <b-form-file
              placeholder="画像ファイルを選択してください"
              drop-placeholder="画像ファイルをドラッグ＆ドロップしてください"
              accept="image"
              id="avatar"
              class="mb-3"
              required
              plain
            ></b-form-file>
            <img :src="$store.getters.getUser.avatar" class="img-fluid rounded-circle" />
          </div>
        </div>
  
        <div class="row justify-content-center mt-3">
          <div class="col-12 col-sm-3">
            <b-button block type="submit" variant="primary">Edit</b-button>
          </div>
        </div>
  
      </div>
    </b-form>
  </div>
</template>

<script>
import Header from '~/components/Header'

export default {
  components: {
    Header: Header
  },
  created() {
    const id =this.$route.params.id

    this.$store.dispatch('fetchUser', { id })
  },
  methods: {
    editUser(e) {
      const user = {
        oldId: this.$store.getters.getUser.id,
        newId: this.$store.getters.getUser.id,
        name: {
          first: e.target.first.value,
          last: e.target.last.value
        },
        age: e.target.age.value,
        avatar: e.target.avatar.files[0]
      }

      if (user.avatar) {
        this.$store.dispatch('deleteFile', { name: user.oldId })

        this.$store.dispatch('uploadFile', {
          file: user.avatar
        })
        .then(response => {
          user.newId = response.name
          user.avatar = response.url
          this.$store.dispatch('editUser', { user })
          .then(() => {
            setTimeout(() => {
              this.$router.push('/users')
            }, 1000)
          })
        })
      } else {
        user.avatar = this.$store.getters.getUser.avatar
        this.$store.dispatch('editUser', { user })
        .then(() => {
          setTimeout(() => {
            this.$router.push('/users')
          }, 1000)
        })
      }
    }
  }
}
</script>