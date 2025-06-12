<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Chart from 'chart.js/auto'

const metrics = ref([
  { 
    id: 1, 
    title: 'Total de Alunos', 
    value: 256, 
    trend: 'up',
    icon: 'M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z'
  },
  { 
    id: 2, 
    title: 'Turmas Ativas', 
    value: '12', 
    trend: 'up',
    icon: 'M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5'
  },
  { 
    id: 3, 
    title: 'Taxa de Aprovação', 
    value: '89%', 
    trend: 'stable',
    icon: 'M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75'
  }
])

const showDetails = ref(false)
const toggleDetails = () => {
  showDetails.value = !showDetails.value
}

// Referências para os canvas dos gráficos
const alunosChartRef = ref<HTMLCanvasElement | null>(null)
const notasChartRef = ref<HTMLCanvasElement | null>(null)
const frequenciaChartRef = ref<HTMLCanvasElement | null>(null)

onMounted(() => {
  // Gráfico de Distribuição de Alunos por Curso
  if (alunosChartRef.value) {
    new Chart(alunosChartRef.value, {
      type: 'bar',
      data: {
        labels: ['Ciência da Computação', 'Engenharia', 'Administração', 'Direito', 'Medicina'],
        datasets: [{
          label: 'Número de Alunos',
          data: [120, 85, 65, 95, 75],
          backgroundColor: 'rgba(59, 130, 246, 0.2)',
          borderColor: 'rgb(59, 130, 246)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Distribuição de Alunos por Curso',
            font: {
              size: 16,
              weight: 'bold'
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(0, 0, 0, 0.05)'
            }
          },
          x: {
            grid: {
              display: false
            }
          }
        }
      }
    })
  }

  // Gráfico de Notas Médias
  if (notasChartRef.value) {
    new Chart(notasChartRef.value, {
      type: 'line',
      data: {
        labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
        datasets: [{
          label: 'Nota Média',
          data: [7.5, 7.8, 8.2, 7.9, 8.4, 8.6],
          borderColor: 'rgb(34, 197, 94)',
          backgroundColor: 'rgba(34, 197, 94, 0.1)',
          tension: 0.4,
          fill: true
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Evolução das Notas Médias',
            font: {
              size: 16,
              weight: 'bold'
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(0, 0, 0, 0.05)'
            }
          },
          x: {
            grid: {
              display: false
            }
          }
        }
      }
    })
  }

  // Gráfico de Frequência
  if (frequenciaChartRef.value) {
    new Chart(frequenciaChartRef.value, {
      type: 'doughnut',
      data: {
        labels: ['Presente', 'Ausente', 'Justificado'],
        datasets: [{
          data: [75, 15, 10],
          backgroundColor: [
            'rgba(34, 197, 94, 0.2)',
            'rgba(239, 68, 68, 0.2)',
            'rgba(234, 179, 8, 0.2)'
          ],
          borderColor: [
            'rgb(34, 197, 94)',
            'rgb(239, 68, 68)',
            'rgb(234, 179, 8)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Distribuição de Frequência',
            font: {
              size: 16,
              weight: 'bold'
            }
          }
        }
      }
    })
  }
})
</script>

<template>
  <div class="mx-auto space-y-6 bg-gradient-to-br from-gray-50 to-white min-h-screen p-6">
    <!-- Header -->
    <div class="flex justify-between items-center mb-8">
      <div>
        <h1 class="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent animate-fade-in-down">
          Dashboard Acadêmico
        </h1>
        <p class="text-gray-600 mt-1">Bem-vindo ao seu painel de controle</p>
      </div>
      <button class="p-2 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-600 rounded-lg hover:from-blue-100 hover:to-blue-200 transition-all duration-300 shadow-sm hover:shadow-md">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      </button>
    </div>
    
    <!-- Métricas Principais -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div 
        v-for="metric in metrics"
        :key="metric.id"
        class="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
      >
        <div class="flex items-center justify-between mb-4">
          <div class="p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="metric.icon" />
            </svg>
          </div>
          <span 
            class="text-sm px-2 py-1 rounded-full"
            :class="{
              'bg-gradient-to-r from-green-100 to-green-50 text-green-600': metric.trend === 'up',
              'bg-gradient-to-r from-red-100 to-red-50 text-red-600': metric.trend === 'down',
              'bg-gradient-to-r from-gray-100 to-gray-50 text-gray-600': metric.trend === 'stable'
            }"
          >
            {{ metric.trend === 'up' ? '↑ Aumento' : metric.trend === 'down' ? '↓ Queda' : '→ Estável' }}
          </span>
        </div>
        <h3 class="text-gray-600 font-medium mb-1">{{ metric.title }}</h3>
        <p class="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">{{ metric.value }}</p>
      </div>
    </div>

    <!-- Grid de Gráficos -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Gráfico de Distribuição de Alunos -->
      <div class="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 h-[350px]">
        <canvas ref="alunosChartRef"></canvas>
      </div>

      <!-- Gráfico de Notas Médias -->
      <div class="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 h-[350px]">
        <canvas ref="notasChartRef"></canvas>
      </div>

      <!-- Gráfico de Frequência -->
      <div class="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 h-[350px]">
        <canvas ref="frequenciaChartRef"></canvas>
      </div>

      <!-- Container para Futuros Gráficos -->
      <div class="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 h-[350px]">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-lg font-semibold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Próximas Atualizações</h3>
          <span class="px-3 py-1 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-600 rounded-full text-sm">Em breve</span>
        </div>
        <div class="space-y-4">
          <div class="flex items-center space-x-3 group">
            <div class="w-2 h-2 bg-blue-500 rounded-full group-hover:scale-150 transition-transform"></div>
            <p class="text-gray-600 group-hover:text-blue-600 transition-colors">Novos gráficos de desempenho</p>
          </div>
          <div class="flex items-center space-x-3 group">
            <div class="w-2 h-2 bg-blue-500 rounded-full group-hover:scale-150 transition-transform"></div>
            <p class="text-gray-600 group-hover:text-blue-600 transition-colors">Análise de evasão escolar</p>
          </div>
          <div class="flex items-center space-x-3 group">
            <div class="w-2 h-2 bg-blue-500 rounded-full group-hover:scale-150 transition-transform"></div>
            <p class="text-gray-600 group-hover:text-blue-600 transition-colors">Relatórios personalizados</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.animate-fade-in-down {
  animation: fadeInDown 0.5s ease-out;
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Estilização da barra de rolagem */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* Efeitos de hover para os cards */
.hover\:shadow-md:hover {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

/* Gradientes e transições suaves */
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