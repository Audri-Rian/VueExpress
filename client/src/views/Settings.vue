<script setup lang="ts">
import { ref } from 'vue'

const formData = ref({
  name: '',
  email: '',
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

const errors = ref({})
const isLoading = ref(false)

const handleSubmit = () => {
  // Implementar lógica de atualização
  console.log('Atualizando configurações...')
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-white p-6">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent animate-fade-in-down">
          Configurações
        </h1>
        <p class="text-gray-600 mt-2">Gerencie suas informações pessoais e preferências</p>
      </div>
      
      <!-- Seção de Perfil -->
      <div class="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 mb-8 border border-gray-100">
        <div class="flex items-center mb-6">
          <div class="p-3 bg-blue-100 rounded-xl mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h2 class="text-xl font-semibold text-gray-900">Perfil</h2>
        </div>

        <div class="space-y-6">
          <div class="group">
            <label class="block text-sm font-medium text-gray-700 mb-2 group-hover:text-blue-600 transition-colors duration-200">Nome</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <input 
                type="text" 
                v-model="formData.name"
                class="pl-10 w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200" 
                placeholder="Seu nome completo" 
              />
            </div>
          </div>

          <div class="group">
            <label class="block text-sm font-medium text-gray-700 mb-2 group-hover:text-blue-600 transition-colors duration-200">Email</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <input 
                type="email" 
                v-model="formData.email"
                class="pl-10 w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200" 
                placeholder="seu@email.com" 
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Seção de Segurança -->
      <div class="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 mb-8 border border-gray-100">
        <div class="flex items-center mb-6">
          <div class="p-3 bg-blue-100 rounded-xl mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 class="text-xl font-semibold text-gray-900">Segurança</h2>
        </div>

        <div class="space-y-6">
          <div class="group">
            <label class="block text-sm font-medium text-gray-700 mb-2 group-hover:text-blue-600 transition-colors duration-200">Senha Atual</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <input 
                type="password" 
                v-model="formData.currentPassword"
                class="pl-10 w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200" 
                placeholder="••••••••" 
              />
            </div>
          </div>

          <div class="group">
            <label class="block text-sm font-medium text-gray-700 mb-2 group-hover:text-blue-600 transition-colors duration-200">Nova Senha</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <input 
                type="password" 
                v-model="formData.newPassword"
                class="pl-10 w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200" 
                placeholder="••••••••" 
              />
            </div>
          </div>

          <div class="group">
            <label class="block text-sm font-medium text-gray-700 mb-2 group-hover:text-blue-600 transition-colors duration-200">Confirmar Nova Senha</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <input 
                type="password" 
                v-model="formData.confirmPassword"
                class="pl-10 w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200" 
                placeholder="••••••••" 
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Botões -->
      <div class="flex justify-end space-x-4">
        <button 
          class="px-6 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-200 shadow-sm hover:shadow-md"
        >
          Cancelar
        </button>
        <button 
          @click="handleSubmit"
          class="px-6 py-3 text-sm font-medium text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-all duration-200 shadow-sm hover:shadow-md flex items-center"
          :disabled="isLoading"
        >
          <svg v-if="isLoading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {{ isLoading ? 'Salvando...' : 'Salvar Alterações' }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.animate-fade-in-down {
  animation: fade-in-down 0.5s ease-out;
}

@keyframes fade-in-down {
  0% {
    opacity: 0;
    transform: translateY(-10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style> 