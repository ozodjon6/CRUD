<template>
  <div>
    <form @submit.prevent="postUsersInfo">
      Name:<input type="text" v-model="form.name"><br>
      Surname:<input style="margin: 12px 0" type="text" v-model="form.username"><br>
      <button style="margin: 12px" v-show="!updateSubmit"  type="submit" name="submit">Save</button>
      <button type="button" @click="update(form)" v-show="updateSubmit" >Update</button>
    </form>
    <table style="width: 100%;border-collapse: collapse">
      <thead>
        <tr>
          <th>Id:</th>
          <th>Name:</th>
          <th>Username:</th>
          <th></th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
          <tr v-for="(user, index) in users" :key="index">
            <td>{{user.id}}</td>
            <td>{{user.name}}</td>
            <td>{{user.username}}</td>
            <td>{{user.email}}</td>
            <td>
              <button @click="eddUser(user)">Edit</button>
            </td>
            <td>
              <button @click="deleteUser(user)">Delete</button>
            </td>
          </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'HelloWorld',
  data() {
    return {
      form: {
        name: '',
        username: ''
      },
      users: [],
      updateSubmit: false
    }
  },
  methods: {
    getUsersInfo() {
      axios.get("http://localhost:3000/users")
      .then(res => {
        this.users = res.data
      })
      .catch(() => {
        alert("error load")
      })
    },
    postUsersInfo() {
      axios.post("http://localhost:3000/users", this.form)
      .then(() => {
        this.getUsersInfo()
        this.form.name = ''
        this.form.username = ''
        alert("saving...")
      })
      .catch(() => {
        alert("error load")
      })
    },
    eddUser(user) {
      this.updateSubmit = true
      this.form.id = user.id
      this.form.name = user.name
      this.form.username = user.username
    },
    update(form) {
      axios.put("http://localhost:3000/users/" + form.id, {
        id: this.form.id,
        name: this.form.name,
        username: this.form.username
      })
      .then(() => {
        this.getUsersInfo()
        this.form.name = ''
        this.form.username = ''
        this.updateSubmit = false
        alert("update...")
      })
      .catch((err) => {
        console.log(err)
      })
    },
    deleteUser(user) {
      axios.delete("http://localhost:3000/users/" + user.id)
      .then(() => {
        this.getUsersInfo()
        alert("delete...")
      })
      .catch((err) => {
        console.log(err)
      })
    }
  },
  created() {
    this.getUsersInfo()
  }
}
</script>

<style scoped>

table > thead > tr > th,
table > tbody > tr > td {
  border-bottom: 1px solid #333;
  padding: 12px;
}

</style>
