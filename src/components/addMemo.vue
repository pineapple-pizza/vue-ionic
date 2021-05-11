<template>
  <ion-page>
    <ion-header class="toolbar-md-primary">

      <ion-toolbar>
        <ion-title>Add Item</ion-title>
      </ion-toolbar>

    </ion-header>
    <ion-content class="content">

      <ion-item>
        <ion-input :value="name" ref="newMemoItem" v-model="name" @input="updateMemoList" placeholder="Memo Name"></ion-input>
      </ion-item>

      <ion-fab-button class="memo-fab" @click="addMemo()">
        <ion-icon name="checkmark"></ion-icon>
      </ion-fab-button>

    </ion-content>
  </ion-page>
</template>

<script>
import axios from 'axios';
import firebase from 'firebase/app'
import { db } from '@/firebase'

export default {
  data() {
    return {
      name: '',
      isChecked: false
    }
  },
  methods: {
    addMemo() {
      const newMemo = { name: this.name, isChecked: false }
      db.collection("list_memos").add(newMemo)
      .then((docRef) => {
          this.$router.push({path: '/memos'})
          console.log("Document written with ID: ", docRef.id);
      })
      .catch((error) => {
          console.error("Error adding document: ", error);
      });
    },
    updateMemoList() {
      this.name = this.$refs.newMemoItem.value
    }
  }
}
</script>

<style>
  
</style>