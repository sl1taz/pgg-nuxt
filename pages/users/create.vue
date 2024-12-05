<template>
  <Header />
  <UserForm />
</template>

<script lang="ts">
import UserForm from '~/components/UserForm.vue'
import { useHead } from "#app";


export default {
  components: { UserForm }
}
</script>