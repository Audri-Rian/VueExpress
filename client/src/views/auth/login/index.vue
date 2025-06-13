<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import axios from 'axios'
import { endpoints } from '../../../config/api'

interface FormErrors {
  email?: string
  password?: string
  general?: string
}

const router = useRouter()
const isLoading = ref(false)
const errors = ref<FormErrors>({})
const formData = ref({
  email: '',
  password: ''
})

const handleLogin = async () => {
  if (!validateForm()) return

  isLoading.value = true
  errors.value = {}

  try {
    console.log('Tentando fazer login com:', {
      email: formData.value.email.toLowerCase().trim(),
      password: formData.value.password
    })

    const response = await axios.post(endpoints.auth.login, {
      email: formData.value.email.toLowerCase().trim(),
      password: formData.value.password
    })

    console.log('Resposta do servidor:', response.data)

    if (response.data.success) {
      localStorage.setItem('user', JSON.stringify(response.data.user))
      localStorage.setItem('token', response.data.token)
      
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`
      
      console.log('Login bem sucedido, redirecionando...')
      
      setTimeout(() => {
        router.push('/home')
      }, 100)
    } else {
      errors.value.general = response.data.message || 'Erro ao fazer login'
    }
  } catch (error: any) {
    console.error('Erro no login:', error)
    if (error.response) {
      const { data } = error.response
      console.log('Resposta de erro:', data)
      if (data.message) {
        errors.value.general = data.message
      }
      if (data.error) {
        errors.value.general = data.error
      }
    } else {
      errors.value.general = 'Erro ao conectar com o servidor. Por favor, tente novamente.'
    }
  } finally {
    isLoading.value = false
  }
}

const goToRegister = () => {
  router.push('/register')
}

const validateForm = () => {
  errors.value = {}
  
  if (!formData.value.email) {
    errors.value.email = 'Email é obrigatório'
    return false
  }
  if (!formData.value.password) {
    errors.value.password = 'Senha é obrigatória'
    return false
  }
  
  return true
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 p-4 relative overflow-hidden">
    <!-- Elementos decorativos de fundo -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
    </div>

    <div class="bg-white/90 backdrop-blur-lg p-8 rounded-3xl shadow-2xl w-full max-w-md relative z-10 border border-white/20">
      <div class="text-center mb-8">
        <div class="inline-block p-3 rounded-full bg-blue-100 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
          </svg>
        </div>
        <h1 class="text-4xl font-bold text-gray-900 mb-2">Bem-vindo de volta!</h1>
        <p class="text-gray-600">Entre com suas credenciais para acessar</p>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-6">
        <div class="group">
          <label for="email" class="block text-sm font-medium text-gray-700 mb-1 group-hover:text-blue-600 transition-colors duration-200">Email</label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <input
              id="email"
              type="email"
              required
              class="pl-10 mt-1 block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              :class="{ 'border-red-500': errors.email }"
              placeholder="seu@email.com"
              v-model="formData.email"
            />
          </div>
          <p v-if="errors.email" class="mt-1 text-sm text-red-600">{{ errors.email }}</p>
        </div>

        <div class="group">
          <label for="password" class="block text-sm font-medium text-gray-700 mb-1 group-hover:text-blue-600 transition-colors duration-200">Senha</label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <input
              id="password"
              type="password"
              required
              class="pl-10 mt-1 block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              :class="{ 'border-red-500': errors.password }"
              placeholder="••••••••"
              v-model="formData.password"
            />
          </div>
          <p v-if="errors.password" class="mt-1 text-sm text-red-600">{{ errors.password }}</p>
        </div>

        <div v-if="errors.general" class="text-center text-red-600 text-sm bg-red-50 p-3 rounded-lg">
          {{ errors.general }}
        </div>

        <button
          type="submit"
          class="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          :disabled="isLoading"
        >
          <svg v-if="isLoading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {{ isLoading ? 'Entrando...' : 'Entrar' }}
        </button>

        <div class="text-center">
          <button
            type="button"
            @click="goToRegister"
            class="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors duration-200"
          >
            Não tem uma conta? Cadastre-se
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.bg-gradient-to-br {
  background-size: 200% 200%;
  animation: gradient 15s ease infinite;
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.animate-blob {
  animation: blob 7s infinite;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}

@keyframes blob {
  0% {
    transform: translate(0px, 0px) scale(1);
  }
  33% {
    transform: translate(30px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
  100% {
    transform: translate(0px, 0px) scale(1);
  }
}
</style>