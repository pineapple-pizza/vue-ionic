<template>
  <ion-page>
    <ion-header class="toolbar-md-primary">

      <ion-toolbar>
        <ion-title>Add Item</ion-title>
      </ion-toolbar>

    </ion-header>
    <ion-content class="content">

      <ion-item>
        <ion-input :value="name" ref="newMemoItem" @input="updateMemo" placeholder="Memo Name"></ion-input>
      </ion-item>

      <ion-fab-button class="memo-fab" @click="addMemo">
        <ion-icon name="checkmark"></ion-icon>
      </ion-fab-button>

    </ion-content>
  </ion-page>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      name: ''
    }
  },
  methods: {
    addMemo() {
      const newMemo = { name: this.name }
      axios.post('http://localhost:3001/memos', newMemo)
        .then(res => {
          this.$router.push({path: '/memos'})
        })
    },
    updateMemo() {
      this.name = this.$refs.newMemoItem.value
    }
  }
}
</script>

<style>
  
</style>