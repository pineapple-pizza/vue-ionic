<template>
  <ion-page>
    <ion-header>
      <ion-toolbar class="toolbar-md-primary">
        <ion-title>liste memos</ion-title>
      </ion-toolbar>
    </ion-header>
    <!-- <ion-content class="content"> -->
      <ion-list>
        <ion-item
          v-for="memo in memos"
          :key="memo.id"
          :class="[memo.isChecked == true ? checkEdit : notCheck]"
        >
          {{ memo.name }}
          <ion-checkbox
            slot="end"
            :key="memo.id"
            @input="memo.checked = $event.target.value"
            :value="memo.isChecked"
            @click="updateMemoStatus(memo)"
          >
          </ion-checkbox>
        </ion-item>
      </ion-list>

      <!-- <ion-list>
    <ion-item v-for="entry in form" :key="entry.id">
      <ion-label>{{entry.val}}</ion-label>
      <ion-checkbox
        slot="end"
        @input="entry.checked = $event.target.value"
        :value="entry.isChecked">
      </ion-checkbox>
    </ion-item>
  </ion-list> -->

      <ion-fab-button class="memo-fab" @click="addMemo">
        <ion-icon name="add"></ion-icon>
      </ion-fab-button>
    <!-- </ion-content> -->
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
      isChecked: false,
      tempCheck: Boolean,
      memo_id: null,
      checkEdit: "checked-style",
      notCheck: "not-checked",
      form: [
      { val: 'Pepperoni', isChecked: true },
      { val: 'Sausage', isChecked: false },
      { val: 'Mushroom', isChecked: false }
    ]
    };
  },
  methods: {
    addMemo() {
      this.$router.push({ path: "/memos/add" });
    },
    checkValue(e) {
      // this.memo_id = memo.id;
      // console.log("memo id", e.id)
      this.tempCheck = event.target.value;
      console.log("event in check value", this.tempCheck);

      // var statement = true;
      // if (statement) {
      //   e.checked = true;
      // }
    },
    updateMemoStatus(memo) {
      this.memo_id = memo.id;

      if (memo.isChecked == false) {
        db.collection("list_memos")
          .doc(this.memo_id)
          .update({
            isChecked: true,
          })
          .then(() => {
            console.log("Document successfully updated!");
          })
          .catch((error) => {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
          });
      } else {
        db.collection("list_memos")
          .doc(this.memo_id)
          .update({
            isChecked: false,
          })
          .then(() => {
            console.log("Document successfully updated!");
          })
          .catch((error) => {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
          });
      }
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

.checked-style {
  font-style: italic;
  color: #a1a1a1;
}

.not-checked {
  /* font-style: bold; */
  /* color: red; */
}
</style>
