<script setup lang="ts">
// Configurações básicas por enquanto
</script>

<template>
  <div class="p-6">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-2xl font-bold text-gray-900 mb-6">Configurações</h1>
      
      <!-- Seção de Perfil -->
      <div class="bg-white rounded-lg shadow p-6 mb-6">
        <h2 class="text-lg font-semibold text-gray-900 mb-4">Perfil</h2>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Nome</label>
            <input type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="Seu nome" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="email" class="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="seu@email.com" />
          </div>
        </div>
      </div>

      <!-- Seção de Segurança -->
      <div class="bg-white rounded-lg shadow p-6 mb-6">
        <h2 class="text-lg font-semibold text-gray-900 mb-4">Segurança</h2>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Senha Atual</label>
            <input type="password" class="w-full px-3 py-2 border border-gray-300 rounded-md" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Nova Senha</label>
            <input type="password" class="w-full px-3 py-2 border border-gray-300 rounded-md" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Confirmar Nova Senha</label>
            <input type="password" class="w-full px-3 py-2 border border-gray-300 rounded-md" />
          </div>
        </div>
      </div>

      <!-- Botões -->
      <div class="flex justify-end space-x-4">
        <button class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
          Cancelar
        </button>
        <button class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
          Salvar Alterações
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
input:focus {
  outline: none;
  ring: 2px;
  ring-color: rgb(59, 130, 246);
  border-color: rgb(59, 130, 246);
}
</style> 