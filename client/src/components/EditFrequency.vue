<template>
  <div class="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 min-h-screen relative overflow-hidden">
    <!-- Background decorative elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl"></div>
      <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-400/10 rounded-full blur-3xl"></div>
    </div>

    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent mb-4">
          Gestão de Frequência
        </h1>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
          Sistema para registro e acompanhamento de frequência acadêmica
        </p>
      </div>

      <!-- Course Selection Card -->
      <div class="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/30 p-8 mb-8 hover:shadow-2xl transition-all duration-500">
        <div class="flex items-center justify-between mb-8">
          <div>
            <h2 class="text-2xl font-bold text-gray-900 mb-2">Seleção de Turma</h2>
            <p class="text-gray-600">Selecione o curso e disciplina para registrar a frequência</p>
          </div>
          <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
            </svg>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div class="space-y-2">
            <label class="block text-sm font-semibold text-gray-700 mb-2">Curso</label>
            <div class="relative">
              <select v-model="selectedCourse" @change="handleCourseChange" class="w-full bg-white/70 border-2 rounded-xl px-4 py-3 pr-10 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 appearance-none">
                <option value="">Selecione o curso</option>
                <option v-for="course in courses" :key="course._id" :value="course._id">{{ course.title }}</option>
              </select>
              <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </div>
          </div>

          <div class="space-y-2">
            <label class="block text-sm font-semibold text-gray-700 mb-2">Disciplina</label>
            <div class="relative">
              <select v-model="selectedDiscipline" @change="handleDisciplineChange" class="w-full bg-white/70 border-2 rounded-xl px-4 py-3 pr-10 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 appearance-none">
                <option value="">Selecione a disciplina</option>
                <option v-for="discipline in filteredDisciplines" :key="discipline._id" :value="discipline._id">{{ discipline.name }}</option>
              </select>
              <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Frequency Table Card -->
      <div v-if="selectedCourse && selectedDiscipline" class="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/30 p-8 mb-8 hover:shadow-2xl transition-all duration-500">
        <div class="flex items-center justify-between mb-8">
          <div>
            <h2 class="text-2xl font-bold text-gray-900 mb-2">Registro de Frequência</h2>
            <p class="text-gray-600">Marque a presença dos alunos</p>
          </div>
          <div class="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
        </div>

        <div class="overflow-hidden rounded-2xl border border-gray-200">
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead class="bg-gradient-to-r from-gray-50 to-gray-100 sticky top-0 z-10">
                <tr>
                  <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider sticky left-0 bg-gradient-to-r from-gray-50 to-gray-100">Aluno</th>
                  <th v-for="date in dates" :key="date" class="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    {{ formatDate(date) }}
                    <div class="text-xs text-gray-500">{{ formatWeekday(date) }}</div>
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white/50 divide-y divide-gray-200">
                <tr v-for="student in students" :key="student._id" class="hover:bg-blue-50/50 transition-all duration-200">
                  <td class="px-6 py-4 whitespace-nowrap sticky left-0 bg-white/95">
                    <div class="text-sm font-medium text-gray-900">{{ student.name }}</div>
                    <div class="text-xs text-gray-500">{{ student.registration }}</div>
                  </td>
                  <td v-for="date in dates" :key="date" class="px-6 py-4 whitespace-nowrap text-center">
                    <div class="relative group">
                      <select 
                        v-model="frequency[`${student._id}-${date}`]" 
                        @change="handleFrequencyChange(student._id, date)"
                        class="w-24 bg-white border-2 rounded-lg px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                        :class="{
                          'border-green-500': frequency[`${student._id}-${date}`] === 'presente',
                          'border-red-500': frequency[`${student._id}-${date}`] === 'ausente',
                          'border-yellow-500': frequency[`${student._id}-${date}`] === 'justificado'
                        }"
                      >
                        <option value="presente">Presente</option>
                        <option value="ausente">Ausente</option>
                        <option value="justificado">Justificado</option>
                      </select>
                      <div class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                        {{ formatDate(date) }} - {{ formatWeekday(date) }}
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="flex justify-end mt-6 space-x-4">
          <button 
            @click="resetFrequency" 
            class="px-6 py-3 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all duration-200 font-semibold"
          >
            Limpar
          </button>
          <button 
            @click="saveFrequency" 
            :disabled="!hasChanges"
            class="px-6 py-3 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 transition-all duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Salvar Frequência
          </button>
        </div>
      </div>

      <!-- Toast Notification -->
      <transition name="toast">
        <div v-if="toast.show" class="fixed bottom-4 right-4 z-50">
          <div 
            class="px-6 py-4 rounded-xl shadow-lg flex items-center min-w-[300px]"
            :class="{
              'bg-green-100 text-green-800 border border-green-200': toast.type === 'success',
              'bg-red-100 text-red-800 border border-red-200': toast.type === 'error'
            }"
          >
            <div class="w-8 h-8 rounded-full flex items-center justify-center mr-3"
              :class="{
                'bg-green-200': toast.type === 'success',
                'bg-red-200': toast.type === 'error'
              }"
            >
              <svg v-if="toast.type === 'success'" class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <svg v-else class="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </div>
            <span class="font-medium">{{ toast.message }}</span>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { frequencyService } from '../services/frequencyService'
import { courseService } from '../services/courseService'
import { disciplineService } from '../services/disciplineService'
import { studentService } from '../services/studentService'

export default {
  name: 'EditFrequency',
  data() {
    return {
      courses: [],
      disciplines: [],
      students: [],
      selectedCourse: '',
      selectedDiscipline: '',
      frequency: {},
      originalFrequency: {},
      dates: [],
      loading: false,
      toast: {
        show: false,
        message: '',
        type: 'success'
      }
    }
  },
  computed: {
    filteredDisciplines() {
      if (!this.selectedCourse) return []
      return this.disciplines.filter(d => {
        const disciplineCourseId = typeof d.cursoId === 'object' ? d.cursoId._id : d.cursoId
        return disciplineCourseId === this.selectedCourse
      })
    },
    hasChanges() {
      return JSON.stringify(this.frequency) !== JSON.stringify(this.originalFrequency)
    }
  },
  async created() {
    await this.loadCourses()
    this.generateDates()
  },
  methods: {
    generateDates() {
      const today = new Date()
      const dates = []
      for (let i = 0; i < 10; i++) {
        const date = new Date(today)
        date.setDate(today.getDate() + i)
        dates.push(date.toISOString().split('T')[0])
      }
      this.dates = dates
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit'
      })
    },
    formatWeekday(date) {
      return new Date(date).toLocaleDateString('pt-BR', {
        weekday: 'short'
      })
    },
    async loadCourses() {
      try {
        this.loading = true
        const response = await courseService.getAllCourses()
        console.log('Cursos carregados:', response)
        this.courses = response
      } catch (error) {
        console.error('Erro ao carregar cursos:', error)
        this.showToast('Erro ao carregar cursos', 'error')
      } finally {
        this.loading = false
      }
    },
    async loadDisciplines() {
      if (!this.selectedCourse) return
      try {
        this.loading = true
        const response = await disciplineService.getAllDisciplines()
        console.log('Todas as disciplinas:', response)
        this.disciplines = response
        console.log('Disciplinas filtradas:', this.filteredDisciplines)
      } catch (error) {
        console.error('Erro ao carregar disciplinas:', error)
        this.showToast('Erro ao carregar disciplinas', 'error')
      } finally {
        this.loading = false
      }
    },
    async loadStudents() {
      if (!this.selectedCourse) return
      try {
        this.loading = true
        const response = await studentService.getAllStudents()
        console.log('Todos os alunos:', response)
        this.students = response.filter(s => {
          if (!s.course) return false
          const studentCourseId = typeof s.course === 'object' ? s.course._id : s.course
          return studentCourseId === this.selectedCourse
        })
        console.log('Alunos filtrados:', this.students)
      } catch (error) {
        console.error('Erro ao carregar alunos:', error)
        this.showToast('Erro ao carregar alunos', 'error')
      } finally {
        this.loading = false
      }
    },
    async loadFrequency() {
      if (!this.selectedDiscipline) return
      try {
        this.loading = true
        console.log('Carregando frequências para disciplina:', this.selectedDiscipline)
        
        // Inicializa o objeto de frequência com 'ausente' como padrão
        this.frequency = {}
        this.students.forEach(student => {
          this.dates.forEach(date => {
            const key = `${student._id}-${date}`
            this.frequency[key] = 'ausente'
          })
        })

        // Tenta carregar frequências existentes
        const response = await frequencyService.getFrequenciesByClassAndDate(
          this.selectedDiscipline,
          this.dates[0]
        )
        
        console.log('Frequências carregadas:', response)
        
        // Atualiza apenas as frequências que existem
        if (response && response.length > 0) {
          response.forEach(freq => {
            const key = `${freq.student._id}-${new Date(freq.date).toISOString().split('T')[0]}`
            if (this.frequency.hasOwnProperty(key)) {
              this.frequency[key] = freq.status
            }
          })
        }
        
        // Salva uma cópia para comparação
        this.originalFrequency = JSON.parse(JSON.stringify(this.frequency))
        console.log('Frequências iniciais:', this.frequency)
        
      } catch (error) {
        console.error('Erro ao carregar frequências:', error)
        this.showToast('Erro ao carregar frequências', 'error')
      } finally {
        this.loading = false
      }
    },
    async handleCourseChange() {
      console.log('Curso alterado para:', this.selectedCourse)
      this.selectedDiscipline = ''
      this.students = []
      this.frequency = {}
      this.originalFrequency = {}
      await this.loadDisciplines()
      await this.loadStudents()
    },
    async handleDisciplineChange() {
      console.log('Disciplina alterada para:', this.selectedDiscipline)
      await this.loadFrequency()
    },
    handleFrequencyChange(studentId, date) {
      console.log(`Frequência alterada para aluno ${studentId} na data ${date}:`, this.frequency[`${studentId}-${date}`])
    },
    async saveFrequency() {
      if (!this.hasChanges) return
      
      try {
        this.loading = true
        const frequencyRecords = []
        
        // Prepara os registros de frequência
        Object.entries(this.frequency).forEach(([key, status]) => {
          const [studentId, date] = key.split('-')
          if (status !== this.originalFrequency[key]) {
            frequencyRecords.push({
              class: this.selectedDiscipline,
              student: studentId,
              date: new Date(date).toISOString(),
              status: status
            })
          }
        })
        
        if (frequencyRecords.length === 0) {
          this.showToast('Nenhuma alteração para salvar', 'error')
          return
        }

        console.log('Enviando registros de frequência:', frequencyRecords)
        
        // Envia cada registro individualmente
        for (const record of frequencyRecords) {
          await frequencyService.createFrequency(record)
        }
        
        this.originalFrequency = JSON.parse(JSON.stringify(this.frequency))
        this.showToast('Frequência salva com sucesso!', 'success')
      } catch (error) {
        console.error('Erro ao salvar frequência:', error)
        this.showToast(error.message || 'Erro ao salvar frequência', 'error')
      } finally {
        this.loading = false
      }
    },
    resetFrequency() {
      this.frequency = JSON.parse(JSON.stringify(this.originalFrequency))
    },
    showToast(message, type = 'success') {
      this.toast = {
        show: true,
        message,
        type
      }
      setTimeout(() => {
        this.toast.show = false
      }, 3000)
    }
  }
}
</script>

<style scoped>
.toast-enter-active, .toast-leave-active {
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}
.toast-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
.toast-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

input:focus, select:focus {
  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
}

button {
  position: relative;
  overflow: hidden;
}

button::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
}

button:hover::before {
  width: 300px;
  height: 300px;
}
</style>