<template>
  <div>
    <Header />

    <b-form @submit.prevent="addUser" enctype="multipart/form-data">
      <div class="container mt-5">
  
        <div class="row justify-content-center mb-3">
          <div class="col-12 col-sm-3">
            <h2>Create user</h2>
          </div>
        </div>
  
        <div class="row justify-content-center">
          <div class="col-12 col-sm-3">
            <b-form-group label="First name" label-for="first">
              <b-form-input
                id="first"
                v-model="user.name.first"
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
                v-model="user.name.last"
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
                v-model="user.age"
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
              v-model="user.avatar"
              placeholder="画像ファイルを選択してください"
              drop-placeholder="画像ファイルをドラッグ＆ドロップしてください"
              accept="image"
              id="avatar"
              class="mb-3"
              required
              plain
            ></b-form-file>
          </div>
        </div>
  
        <div class="row justify-content-center mt-3">
          <div class="col-12 col-sm-3">
            <b-button block type="submit" variant="primary">Create</b-button>
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
  data() {
    return {
      user: {
        name: {
          first: null,
          last: null
        },
        age: null,
        avatar: null
      }
    }
  },
  methods: {
    addUser() {
      this.$store.dispatch('uploadFile', {
        file: this.user.avatar
      })
      .then(response => {
        this.user.id = response.name
        this.user.avatar = response.url
        this.$store.dispatch('addUser', { user: this.user })
        .then(() => {
          setTimeout(() => {
            this.$router.push('/users')
          }, 1000)
        })
      })
    }
  }
}
</script>