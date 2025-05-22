<script setup lang="ts">
import { ref } from 'vue'

const metrics = ref([
  { id: 1, title: 'Métrica 1', value: 256, trend: 'up' },
  { id: 2, title: 'Métrica 2', value: '1.2k', trend: 'down' },
  { id: 3, title: 'Métrica 3', value: '89%', trend: 'stable' }
])

const showDetails = ref(false)

const toggleDetails = () => {
  showDetails.value = !showDetails.value
}
</script>

<template>
  <div class="mx-auto">
    <h1 class="text-3xl font-bold text-gray-800 mb-6 animate-fade-in-down">
      Bem-vindo ao Dashboard
    </h1>
    
    <div class="bg-white p-6 rounded-lg shadow-lg transition-transform hover:scale-[1.005]">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div 
          v-for="metric in metrics"
          :key="metric.id"
          class="bg-blue-100 p-4 rounded-lg hover:bg-blue-200 transition-colors cursor-pointer"
          @click="toggleDetails"
        >
          <h3 class="text-blue-800 font-medium">{{ metric.title }}</h3>
          <div class="flex items-center justify-between">
            <p class="text-2xl font-bold text-blue-600">{{ metric.value }}</p>
            <span 
              class="text-sm"
              :class="{
                'text-green-500': metric.trend === 'up',
                'text-red-500': metric.trend === 'down',
                'text-gray-500': metric.trend === 'stable'
              }"
            >
              {{ metric.trend === 'up' ? '↑' : metric.trend === 'down' ? '↓' : '→' }}
            </span>
          </div>
        </div>
      </div>

      <transition
        enter-active-class="transition-opacity duration-300"
        leave-active-class="transition-opacity duration-200"
        enter-from-class="opacity-0"
        leave-to-class="opacity-0"
      >
        <div v-if="showDetails" class="mt-4 p-4 bg-blue-50 rounded-lg">
          <p class="text-blue-800">Detalhes adicionais sobre a métrica selecionada...</p>
        </div>
      </transition>
    </div>
  </div>
</template>