<template>
  <ion-page>
    <ion-header>

      <ion-toolbar class="toolbar-md-primary">
        <ion-title>memo list</ion-title>
      </ion-toolbar>

    </ion-header>
    <ion-content class="content">

      <ion-list>
        <ion-item v-for="memo in memos" :key="memo.id">
          {{ memo.name }}
        </ion-item>
      </ion-list>

      <ion-fab-button class="memo-fab" @click="addMemo">
        <ion-icon name="add"></ion-icon>
      </ion-fab-button>
    </ion-content>
  </ion-page>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      memos: []
    }
  },
  methods: {
    addMemo() {
      this.$router.push({path: '/memos/add'})
    }
  },
  created() {
    axios.get('http://localhost:3001/memos')
      .then(res => this.memos = res.data)
  }
}
</script>

<style>
.memo-fab {
  position: fixed;
  bottom: 25px;
  right: 15px;
  font-size: 30px;
}

.content {
  padding: 10px 10px 10px 0px
}
</style>