<template>
  <div>
    <Header />
    <UserList />
    
  </div>
  <!-- <button @click="notify">Notify !</button> -->
</template>

<script setup lang="ts">

import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';


import { useHead } from "#app";
useHead({
  title: "PGG | Gerenciamento de Usuários",
  meta: [
    { name: "description", content: "Descrição da página dinâmica" }
  ]
});

import { onMounted } from 'vue'
import { useUserStore } from '~/stores/userStore'

const notify = () => {
  toast("Wow so easy !", {
    autoClose: 1000,
  }); // ToastOptions
}

const userStore = useUserStore()

onMounted(() => {
  userStore.initializeStore()
})
</script>