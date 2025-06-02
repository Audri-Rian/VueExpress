<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const handleLogin = () => {
  router.push('/')
}

const goToRegister = () => {
  router.push('/register')
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-blue-900">
    <div class="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Bem-vindo de volta!</h1>
        <p class="text-gray-600 mt-2">Entre com suas credenciais para acessar</p>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-6">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input
            id="email"
            type="email"
            required
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="seu@email.com"
          />
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">Senha</label>
          <input
            id="password"
            type="password"
            required
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          class="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Entrar
        </button>

        <div class="text-center">
          <button
            type="button"
            @click="goToRegister"
            class="text-blue-600 hover:text-blue-800 text-sm font-medium"
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
</style>