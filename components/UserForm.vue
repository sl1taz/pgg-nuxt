
<template>
  <div class="user-form-container">
    <div class="form-header">
      <h2>{{ isEditing ? 'Editar Usuário' : 'Cadastrar Usuário' }}</h2>
    </div>
    <form @submit.prevent="submitForm" class="user-form">
      <div class="form-group">
        <label>Nome</label>
        <input 
          v-model="user.name" 
          type="text" 
          required
          :class="{ 'input-error': submitted && !user.name }"
          placeholder="Digite o nome completo"
        >
        <span v-if="submitted && !user.name" class="error-message">Nome é obrigatório!</span>
      </div>
      
      <div class="form-group">
        <label>CPF</label>
        <input 
          v-model="user.cpf" 
          type="text" 
          @input="formatCPF"
          maxlength="14"
          required
          :class="{ 'input-error': submitted && (!isValidCPF || cpfExists) }"
          placeholder="000.000.000-00"
        >
        <span v-if="submitted && !isValidCPF" class="error-message">CPF inválido!</span>
        <span v-if="submitted && cpfExists" class="error-message">CPF já cadastrado!</span>
      </div>
      
      <div class="form-group">
        <label>Username</label>
        <input 
          v-model="user.username" 
          type="text" 
          required
          :class="{ 'input-error': submitted && (!user.username || usernameExists) }"
          placeholder="Digite o nome do usuário"
        >
        <span v-if="submitted && !user.username" class="error-message">Nome de usuário obrigatório!</span>
        <span v-if="submitted && usernameExists" class="error-message">Nome de usuário já cadastrado!</span>
      </div>
      
      <div class="form-group">
        <label>E-mail</label>
        <input 
          v-model="user.email" 
          type="email" 
          required
          :class="{ 'input-error': submitted && (!isValidEmail || emailExists) }"
          placeholder="Digite o e-mail do usuário"
        >
        <span v-if="submitted && !isValidEmail" class="error-message">E-mail inválido!</span>
        <span v-if="submitted && emailExists" class="error-message">E-mail já cadastrado!</span>
      </div>
      
      <div class="form-group">
        <label>Grupo</label>
        <input 
          v-model="user.group" 
          type="text" 
          required
          :class="{ 'input-error': submitted && !user.group }"
          placeholder="Digite o grupo"
        >
        <span v-if="submitted && !user.group" class="error-message">Grupo é obrigatório!</span>
      </div>
      
      <div class="form-actions">
        <button type="submit" class="save-btn">Salvar</button>
        <button type="button" class="cancel-btn" @click="cancel">Cancelar</button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '~/stores/userStore'
import type { User } from '~/types/User'

export default defineComponent({
  setup() {
    const userStore = useUserStore()
    const route = useRoute()
    const router = useRouter()
    
    const user = ref<User>({
      name: '',
      cpf: '',
      username: '',
      email: '',
      group: ''
    })
    
    const submitted = ref(false)
    const isEditing = ref(false)
    const cpfExists = ref(false)
    const usernameExists = ref(false)
    const emailExists = ref(false)

    const isValidCPF = computed(() => {
      const cpf = user.value.cpf.replace(/[^\d]/g, '')
      return cpf.length === 11
    })
    
    const isValidEmail = computed(() => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return emailRegex.test(user.value.email)
    })

    const formatCPF = () => {
      user.value.cpf = user.value.cpf
        .replace(/\D/g, '')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{2})$/, '$1-$2')
    }

    const checkUniqueFields = () => {
      cpfExists.value = false
      usernameExists.value = false
      emailExists.value = false

      const currentUserId = isEditing.value ? user.value.id : null

      cpfExists.value = userStore.users.some(
        u => u.cpf === user.value.cpf && u.id !== currentUserId
      )

      usernameExists.value = userStore.users.some(
        u => u.username === user.value.username && u.id !== currentUserId
      )

      emailExists.value = userStore.users.some(
        u => u.email === user.value.email && u.id !== currentUserId
      )

      return !(cpfExists.value || usernameExists.value || emailExists.value)
    }

    const submitForm = () => {
      submitted.value = true
      
      const isValidForm = user.value.name && 
        isValidCPF.value && 
        user.value.username && 
        isValidEmail.value && 
        user.value.group

      const isUnique = checkUniqueFields()
      
      if (isValidForm && isUnique) {
        if (isEditing.value) {
          userStore.updateUser(user.value)
        } else {
          userStore.addUser(user.value)
        }
        
        router.push('/').then(() => {
          
        })
      }
    }

    const cancel = () => {
      router.push('/')
    }

    onMounted(() => {
      const userId = route.params.id ? Number(route.params.id) : null
      if (userId) {
        isEditing.value = true
        const existingUser = userStore.getUserById(userId)
        if (existingUser) {
          user.value = { ...existingUser }
        }
      }
    })

    return {
      user,
      submitted,
      isEditing,
      cpfExists,
      usernameExists,
      emailExists,
      isValidCPF,
      isValidEmail,
      formatCPF,
      checkUniqueFields,
      submitForm,
      cancel
    }
  }
})
</script>





<style scoped>
/* 2014-inspired Vintage Design */
.user-form-container {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.form-header {
  border-bottom: 2px solid #3498db;
  padding-bottom: 10px;
  margin-bottom: 20px;
}

.form-header h2 {
  color: #2c3e50;
  margin: 0;
  font-size: 24px;
}

.user-form .form-group {
  margin-bottom: 15px;
}

.user-form label {
  display: block;
  margin-bottom: 5px;
  color: #34495e;
  font-weight: 600;
}

.user-form input {
  width: 100%;
  padding: 10px;
  border: 1px solid #bdc3c7;
  border-radius: 3px;
  font-size: 14px;
  transition: border-color 0.3s ease;
}

.user-form input:focus {
  outline: none;
  border-color: #3498db;
  box-shadow: 0 0 5px rgba(52, 152, 219, 0.5);
}

.input-error {
  border: 1px solid #e74c3c;
}

.error-message {
  color: #e74c3c;
  font-size: 12px;
  font-weight: bold;
  margin-top: 5px;
  display: block;
}

.form-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.save-btn, .cancel-btn {
  padding: 10px 15px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease;
}

.save-btn {
  background-color: #2ecc71;
  color: white;
}

.save-btn:hover {
  background-color: #27ae60;
}

.cancel-btn {
  background-color: #bdc3c7;
  color: #34495e;
}

.cancel-btn:hover {
  background-color: #95a5a6;
}

/* Responsive Adjustments */
@media screen and (max-width: 600px) {
  .user-form-container {
    width: 90%;
    padding: 15px;
  }

  .form-actions {
    flex-direction: column;
    gap: 10px;
  }

  .save-btn, .cancel-btn {
    width: 100%;
  }
}
</style>