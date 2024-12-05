<!-- components/ConfirmModal.vue -->
<template>
  <div class="modal-overlay" @click="$emit('cancel')">
    <div class="modal" @click.stop>
      <h3 class="modal-title">Atenção!</h3>
      <p class="modal-message">
        Deseja apagar o usuário:
        <strong class="user-name">"{{ user.name }}"</strong>?
      </p>
      <div class="modal-actions">
        <button class="btn btn-confirm" @click="$emit('confirm')">Apagar</button>
        <button class="btn btn-cancel" @click="$emit('cancel')">Cancelar</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { User } from '~/types/User'

export default defineComponent({
  props: {
    user: {
      type: Object as () => User,
      required: true
    }
  }
})
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease-in-out;
}

.modal {
  background: #fff;
  border-radius: 10px;
  width: 90%;
  max-width: 400px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  animation: scaleUp 0.3s ease-in-out;
}

.modal-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
}

.modal-message {
  font-size: 1rem;
  font-weight: 600;
  color: #555;
  margin-bottom: 20px;
}

.user-name {
  font-weight: bold;
  color: #e63946;
}

.modal-actions {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}

.btn {
  padding: 10px 20px;
  font-size: 1rem;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-confirm {
  background-color: #38a169;
  color: #fff;
}

.btn-confirm:hover {
  background-color: #2f855a;
}

.btn-cancel {
  background-color: #e53e3e;
  color: #fff;
}

.btn-cancel:hover {
  background-color: #c53030;
}

/* Animations */
@keyframes fadeIn {
  from {
    background: rgba(0, 0, 0, 0);
  }

  to {
    background: rgba(0, 0, 0, 0.6);
  }
}

@keyframes scaleUp {
  from {
    transform: scale(0.8);
    opacity: 0;
  }

  to {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
