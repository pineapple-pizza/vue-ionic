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
          <ion-checkbox
            slot="end"
            @input="memo.checked = $event.target.value"
            :value="memo.checked"
          >
          </ion-checkbox>
        </ion-item>
      </ion-list>

      <ion-fab-button class="memo-fab" @click="addMemo">
        <ion-icon name="add"></ion-icon>
      </ion-fab-button>
    </ion-content>
  </ion-page>
</template>

<script>
import axios from "axios";
import firebase from "firebase/app";
import { db } from "@/firebase";

export default {
  data() {
    return {
      memos: [],
      checked: false,
      _id: null,
    };
  },
  methods: {
    addMemo() {
      this.$router.push({ path: "/memos/add" });
    },
  },
  created() {
    db.collection("list_memos")
      .get()
      .then((querySnapshot) => {
        let memosList = [];
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          let memo = doc.data();
          memo.id = doc.id;
          memosList.push(memo);
          console.log("memosList in console", memosList);

          // console.log(doc.id, " => ", doc.data());
        });
        this.memos = memosList;
      });
  },
};
</script>

<style>
.memo-fab {
  position: fixed;
  bottom: 25px;
  right: 15px;
  font-size: 30px;
}

.content {
  padding: 10px 10px 10px 0px;
}
</style>
