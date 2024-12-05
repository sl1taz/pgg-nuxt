<!-- components/UserList.vue -->
<template>
  <div class="user-list-container">
    <div class="user-list-header">
      <h1>Usuários</h1>
      <button class="add-user-btn" @click="$router.push('/users/create')">
        Cadastrar Novo Usuário
      </button>
    </div>

    <div class="table-responsive">
      <table class="user-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>CPF</th>
            <th class="user-info">Username</th>
            <th class="user-info">E-mail</th>
            <th class="user-info">Grupo</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.name }}</td>
            <td>{{ formatCPF(user.cpf) }}</td>
            <td class="user-info">{{ user.username }}</td>
            <td class="user-info">{{ user.email }}</td>
            <td class="user-info">{{ user.group }}</td>
            <td class="action-cell">
              <button class="edit-btn" @click="editUser(user)">Editar</button>
              <button class="delete-btn" @click="openDeleteModal(user)">Apagar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <ConfirmModal v-if="showDeleteModal" :user="selectedUser" @confirm="confirmDelete" @cancel="cancelDelete" />
  </div>
</template>


<script lang="ts">
import { defineComponent } from 'vue'
import { useUserStore } from '~/stores/userStore'
import { User } from '~/types/User'

export default defineComponent({
  data() {
    return {
      showDeleteModal: false,
      selectedUser: null as User | null
    }
  },
  computed: {
    users() {
      const userStore = useUserStore()
      return userStore.users
    }
  },
  methods: {
    formatCPF(cpf: string) {
      return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
    },
    editUser(user: User) {
      this.$router.push(`/users/edit/${user.id}`)
    },
    openDeleteModal(user: User) {
      this.selectedUser = user
      this.showDeleteModal = true
    },
    confirmDelete() {
      if (this.selectedUser) {
        const userStore = useUserStore()
        userStore.deleteUser(this.selectedUser.id!)
        this.showDeleteModal = false
        this.selectedUser = null
      }
    },
    cancelDelete() {
      this.showDeleteModal = false
      this.selectedUser = null
    }
  }
})
</script>


<style scoped>
/* 2014-inspired Vintage Design with Responsiveness */
.user-list-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.user-list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  border-bottom: 2px solid #3498db;
  padding-bottom: 10px;
}

.user-list-header h1 {
  color: #2c3e50;
  font-size: 24px;
  margin: 0;
}

.add-user-btn {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 3px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.add-user-btn:hover {
  background-color: #2980b9;
}

.table-responsive {
  width: 100%;
  overflow-x: auto;
}

.user-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1);
  background-color: white;
}

.user-table thead {
  background-color: #f1f1f1;
}

.user-table th,
.user-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.user-table th {
  font-weight: 600;
  color: #34495e;
  text-transform: uppercase;
  font-size: 14px;
}

.user-table tr:nth-child(even) {
  background-color: #f8f9fa;
}

.user-table tr:hover {
  background-color: #e9ecef;
}

.action-cell {
  display: flex;
  gap: 10px;
}

.edit-btn,
.delete-btn {
  padding: 6px 10px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  font-size: 12px;
  transition: background-color 0.3s ease;
}

.edit-btn {
  background-color: #2ecc71;
  color: white;
}

.edit-btn:hover {
  background-color: #27ae60;
}

.delete-btn {
  background-color: #e74c3c;
  color: white;
}

.delete-btn:hover {
  background-color: #c0392b;
}

/* Responsive Adjustments */
@media screen and (max-width: 768px) {
  .user-list-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .add-user-btn {
    margin-top: 10px;
    width: 100%;
  }

  .user-table {
    font-size: 12px;
  }

  .user-table th,
  .user-table td {
    padding: 8px;
  }

  .action-cell {
    flex-direction: column;
    gap: 5px;
  }

  .edit-btn,
  .delete-btn {
    width: 100%;
  }
}

@media screen and (max-width: 480px) {
  .user-list-container {
    padding: 10px;
  }

  .user-table {
    font-size: 10px;
  }
}

@media (max-width: 500px) {
  .user-info {
    display: none;
  }
}
</style>