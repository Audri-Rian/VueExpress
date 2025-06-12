<script>
import { classService } from '../services/classService'
import { courseService } from '../services/courseService'

export default {
  name: 'EditClass',
  data() {
    return {
      classes: [],
      form: {
        name: '',
        course: '',
        period: '',
        year: null,
        shift: '',
      },
      errors: {
        name: false,
        course: false,
        period: false,
        year: false,
        shift: false,
      },
      courses: [],
      periods: [],
      isEditing: false,
      editingIndex: null,
      showModal: false,
      showDeleteModal: false,
      deletingIndex: null,
      currentView: {},
      search: '',
      toastMessage: '',
      showToast: false,
      isError: false,
      loading: false,
    }
  },
  computed: {
    filteredClasses() {
      const term = this.search.toLowerCase()
      return this.classes.filter(
        (t) => t.name.toLowerCase().includes(term) || t.course.title.toLowerCase().includes(term),
      )
    },
    currentYear() {
      return new Date().getFullYear()
    },
    availablePeriods() {
      if (!this.form.course) return []
      const selectedCourse = this.courses.find((c) => c._id === this.form.course)
      if (!selectedCourse) return []

      console.log('Curso selecionado:', selectedCourse) // Log para debug

      const periods = []
      for (let i = 1; i <= selectedCourse.periods; i++) {
        periods.push(`${i}º período`)
      }

      console.log('Períodos gerados:', periods) // Log para debug
      return periods
    },
  },
  watch: {
    'form.course': {
      handler(newCourseId) {
        this.form.period = '' // Limpa o período quando o curso muda
        // Log para debug
        console.log(
          'Curso selecionado:',
          this.courses.find((c) => c._id === newCourseId),
        )
        console.log('Períodos disponíveis:', this.availablePeriods)
      },
    },
  },
  async created() {
    await this.loadCourses()
    await this.loadClasses()
  },
  methods: {
    async loadCourses() {
      try {
        this.loading = true
        const response = await courseService.getAllCourses()
        this.courses = response
      } catch (error) {
        this.showToastMessage(error.message, true)
      } finally {
        this.loading = false
      }
    },

    async loadClasses() {
      try {
        this.loading = true
        const response = await classService.getAllClasses()
        // Garantir que cada turma tenha um curso válido
        this.classes = response.map((turma) => ({
          ...turma,
          course: turma.course || { title: 'Curso não definido' },
        }))
      } catch (error) {
        this.showToastMessage(error.message, true)
      } finally {
        this.loading = false
      }
    },

    async saveClass() {
      // Validação
      this.errors = {
        name: !this.form.name,
        course: !this.form.course,
        period: !this.form.period,
        year: !this.form.year || this.form.year < 2000 || this.form.year > this.currentYear + 5,
        shift: !this.form.shift,
      }

      if (Object.values(this.errors).some((v) => v)) {
        this.isError = true
        this.showToastMessage('Por favor, corrija os erros antes de salvar.')
        return
      }

      try {
        this.loading = true
        if (this.isEditing) {
          await classService.updateClass(this.editingIndex, this.form)
          this.showToastMessage('Turma atualizada com sucesso!')
        } else {
          await classService.createClass(this.form)
          this.showToastMessage('Turma criada com sucesso!')
        }
        await this.loadClasses()
        this.resetForm()
      } catch (error) {
        this.showToastMessage(error.message, true)
      } finally {
        this.loading = false
      }
    },

    async editClass(id) {
      try {
        this.loading = true
        const turma = await classService.getClassById(id)
        this.isEditing = true
        this.editingIndex = id
        this.form = {
          name: turma.name,
          course: turma.course._id,
          period: turma.period,
          year: turma.year,
          shift: turma.shift,
        }
        this.$nextTick(() => this.$refs.nomeInput.focus())
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } catch (error) {
        this.showToastMessage(error.message, true)
      } finally {
        this.loading = false
      }
    },

    async deleteClass(id) {
      if (!confirm('Tem certeza que deseja excluir esta turma?')) return

      try {
        this.loading = true
        await classService.deleteClass(id)
        this.showToastMessage('Turma excluída com sucesso!')
        await this.loadClasses()
      } catch (error) {
        this.showToastMessage(error.message, true)
      } finally {
        this.loading = false
      }
    },

    viewClass(turma) {
      this.currentView = turma
      this.showModal = true
    },

    showToastMessage(message, isError = false) {
      this.toastMessage = message
      this.isError = isError
      this.showToast = true
      setTimeout(() => (this.showToast = false), 3000)
    },

    closeModal() {
      this.showModal = false
    },

    resetForm() {
      this.form = { name: '', course: '', period: '', year: null, shift: '' }
      this.errors = {}
      this.isEditing = false
      this.editingIndex = null
    },
  },
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
    <!-- Header -->
    <div class="max-w-7xl mx-auto mb-8">
      <h1 class="text-3xl font-bold text-gray-900">Gerenciar Turmas</h1>
      <p class="mt-2 text-sm text-gray-600">Crie e gerencie as turmas dos cursos</p>
    </div>

    <!-- Toast Message -->
    <div
      v-if="showToast"
      class="fixed top-4 right-4 z-50 px-4 py-2 rounded-lg shadow-lg transition-all duration-300 transform"
      :class="isError ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'"
    >
      {{ toastMessage }}
    </div>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Form Section -->
        <div class="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6">
          <h2 class="text-xl font-semibold text-gray-900 mb-6">
            {{ isEditing ? 'Editar Turma' : 'Nova Turma' }}
          </h2>

          <form @submit.prevent="saveClass" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-2">
                <label class="block text-sm font-semibold text-gray-700"
                  >Nome da Turma <span class="text-red-500">*</span></label
                >
                <input
                  ref="nomeInput"
                  v-model="form.name"
                  type="text"
                  placeholder="Ex: Turma A, Turma Manhã..."
                  class="w-full bg-white/70 border-2 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                  :class="{
                    'border-red-300 focus:border-red-500 focus:ring-red-500/20': errors.name,
                    'border-gray-200': !errors.name,
                  }"
                />
                <p v-if="errors.name" class="text-red-500 text-xs flex items-center">
                  <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  Nome da turma é obrigatório
                </p>
              </div>

              <div class="space-y-2">
                <label class="block text-sm font-semibold text-gray-700"
                  >Curso <span class="text-red-500">*</span></label
                >
                <select
                  v-model="form.course"
                  class="w-full bg-white/70 border-2 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 appearance-none"
                  :class="{
                    'border-red-300 focus:border-red-500 focus:ring-red-500/20': errors.course,
                    'border-gray-200': !errors.course,
                  }"
                >
                  <option value="">Selecione um curso</option>
                  <option v-for="course in courses" :key="course._id" :value="course._id">
                    {{ course.title }} ({{ course.periods }} períodos)
                  </option>
                </select>
                <p v-if="errors.course" class="text-red-500 text-xs">Selecione um curso</p>
              </div>

              <div class="space-y-2">
                <label class="block text-sm font-semibold text-gray-700"
                  >Período <span class="text-red-500">*</span></label
                >
                <select
                  v-model="form.period"
                  class="w-full bg-white/70 border-2 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 appearance-none"
                  :class="{
                    'border-red-300 focus:border-red-500 focus:ring-red-500/20': errors.period,
                    'border-gray-200': !errors.period,
                  }"
                >
                  <option value="">Selecione o período</option>
                  <option v-for="period in availablePeriods" :key="period">{{ period }}</option>
                </select>
                <p v-if="errors.period" class="text-red-500 text-xs">Selecione um período</p>
                <p
                  v-if="form.course && availablePeriods.length === 0"
                  class="text-yellow-500 text-xs"
                >
                  Nenhum período disponível para este curso
                </p>
              </div>

              <div class="space-y-2">
                <label class="block text-sm font-semibold text-gray-700"
                  >Ano Letivo <span class="text-red-500">*</span></label
                >
                <input
                  v-model.number="form.year"
                  type="number"
                  :min="2000"
                  :max="currentYear + 5"
                  placeholder="2025"
                  class="w-full bg-white/70 border-2 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                  :class="{
                    'border-red-300 focus:border-red-500 focus:ring-red-500/20': errors.year,
                    'border-gray-200': !errors.year,
                  }"
                />
                <p v-if="errors.year" class="text-red-500 text-xs">
                  Ano deve estar entre 2000 e {{ currentYear + 5 }}
                </p>
              </div>

              <div class="space-y-2">
                <label class="block text-sm font-semibold text-gray-700"
                  >Turno <span class="text-red-500">*</span></label
                >
                <select
                  v-model="form.shift"
                  class="w-full bg-white/70 border-2 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 appearance-none"
                  :class="{
                    'border-red-300 focus:border-red-500 focus:ring-red-500/20': errors.shift,
                    'border-gray-200': !errors.shift,
                  }"
                >
                  <option value="">Selecione o turno</option>
                  <option>Matutino</option>
                  <option>Vespertino</option>
                  <option>Noturno</option>
                </select>
                <p v-if="errors.shift" class="text-red-500 text-xs">Selecione um turno</p>
              </div>
            </div>

            <div class="flex justify-end space-x-4">
              <button
                v-if="isEditing"
                @click="resetForm"
                type="button"
                class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                :disabled="loading"
                class="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span v-if="loading" class="flex items-center">
                  <svg
                    class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      class="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      stroke-width="4"
                    ></circle>
                    <path
                      class="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Salvando...
                </span>
                <span v-else>{{ isEditing ? 'Atualizar' : 'Criar' }} Turma</span>
              </button>
            </div>
          </form>
        </div>

        <!-- Classes List Section -->
        <div class="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-xl font-semibold text-gray-900">Turmas Existentes</h2>
            <div class="relative">
              <input
                v-model="search"
                type="text"
                placeholder="Buscar turmas..."
                class="pl-10 pr-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
              />
              <svg
                class="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
          </div>

          <div v-if="loading" class="flex justify-center items-center py-8">
            <svg class="animate-spin h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24">
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>

          <div v-else-if="filteredClasses.length === 0" class="text-center py-8">
            <p class="text-gray-500">Nenhuma turma encontrada</p>
          </div>

          <div v-else class="space-y-4">
            <div
              v-for="turma in filteredClasses"
              :key="turma._id"
              class="bg-white rounded-lg shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow"
            >
              <div class="flex items-start justify-between">
                <div class="flex-1 min-w-0">
                  <h3 class="font-semibold text-gray-900 truncate">{{ turma.name }}</h3>
                  <div class="flex items-center mt-1 space-x-2">
                    <span
                      v-if="turma.course"
                      class="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded"
                      >{{ turma.course.title }}</span
                    >
                    <span v-else class="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded"
                      >Curso não definido</span
                    >
                    <span class="text-xs text-gray-500">{{ turma.period }}</span>
                    <span class="text-xs text-gray-500">{{ turma.year }}</span>
                  </div>
                  <div class="mt-2">
                    <span
                      class="inline-flex px-2 py-1 text-xs font-medium rounded-md"
                      :class="{
                        'bg-yellow-100 text-yellow-800': turma.shift === 'Matutino',
                        'bg-orange-100 text-orange-800': turma.shift === 'Vespertino',
                        'bg-purple-100 text-purple-800': turma.shift === 'Noturno',
                      }"
                    >
                      {{ turma.shift }}
                    </span>
                  </div>
                </div>
                <div class="flex space-x-2 ml-4 flex-shrink-0">
                  <button
                    @click="editClass(turma._id)"
                    class="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      ></path>
                    </svg>
                  </button>
                  <button
                    @click="deleteClass(turma._id)"
                    class="p-1 text-gray-400 hover:text-red-600 transition-colors"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de Detalhes -->
    <transition name="modal">
      <div
        v-if="showModal"
        class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      >
        <div
          class="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl w-full max-w-md border border-white/30 transform scale-100 transition-all duration-300"
        >
          <div class="flex justify-between items-center p-8 border-b border-gray-200">
            <div class="flex items-center">
              <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                <svg
                  class="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"
                  ></path>
                </svg>
              </div>
              <div>
                <h3 class="text-xl font-bold text-gray-900">Detalhes da Turma</h3>
                <p class="text-gray-600 text-sm">Informações completas</p>
              </div>
            </div>
            <button
              @click="closeModal"
              class="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-all duration-200"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>
          <div class="p-8 space-y-6">
            <div
              v-for="(value, key) in currentView"
              :key="key"
              class="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0"
            >
              <div class="flex items-center">
                <div class="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                <span class="font-semibold text-gray-700 capitalize"
                  >{{ key.replace('_', ' ') }}:</span
                >
              </div>
              <span class="text-gray-900 font-medium bg-gray-50 px-3 py-1 rounded-lg">{{
                value || '-'
              }}</span>
            </div>
          </div>
          <div class="p-8 border-t border-gray-200 flex justify-end">
            <button
              @click="closeModal"
              class="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-semibold shadow-lg"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </transition>

    <!-- Modal de Confirmação de Exclusão -->
    <transition name="modal">
      <div
        v-if="showDeleteModal"
        class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      >
        <div
          class="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl w-full max-w-md border border-white/30 transform scale-100 transition-all duration-300"
        >
          <div class="p-8 border-b border-gray-200">
            <div class="flex items-center">
              <div class="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mr-4">
                <svg
                  class="w-6 h-6 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  ></path>
                </svg>
              </div>
              <div>
                <h3 class="text-xl font-bold text-red-600">Confirmar Exclusão</h3>
                <p class="text-gray-600 text-sm">Esta ação não pode ser desfeita</p>
              </div>
            </div>
          </div>
          <div class="p-8">
            <p class="text-gray-700 mb-6 text-center">
              Tem certeza que deseja excluir esta turma permanentemente?
            </p>
            <div class="flex flex-col sm:flex-row gap-3">
              <button
                @click="showDeleteModal = false"
                class="flex-1 px-6 py-3 text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-all duration-200 font-semibold border-2 border-gray-200 hover:border-gray-300"
              >
                Cancelar
              </button>
              <button
                @click="deleteClass(deletingIndex)"
                class="flex-1 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl hover:from-red-700 hover:to-red-800 transition-all duration-200 font-semibold shadow-lg"
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
/* Toast Animation */
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}
.toast-enter-from {
  opacity: 0;
  transform: translateX(100%) scale(0.8);
}
.toast-leave-to {
  opacity: 0;
  transform: translateX(100%) scale(0.8);
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 3px;
}
::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}
::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* Form focus states */
input:focus,
select:focus {
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* Button hover effects */
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
  transition:
    width 0.6s,
    height 0.6s;
}

button:hover::before {
  width: 300px;
  height: 300px;
}

/* Ajuste para o truncamento de texto */
.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
