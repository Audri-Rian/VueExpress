<template>
  <div
    class="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 min-h-screen relative overflow-hidden"
  >
    <!-- Background decorative elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl"></div>
      <div
        class="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-400/10 rounded-full blur-3xl"
      ></div>
    </div>

    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1
          class="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent mb-4"
        >
          Gestão de Notas
        </h1>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
          Sistema completo para lançamento e gestão de notas acadêmicas
        </p>
      </div>

      <!-- Course Selection Card -->
      <div
        class="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/30 p-8 mb-8 hover:shadow-2xl transition-all duration-500"
      >
        <div class="flex items-center justify-between mb-8">
          <div>
            <h2 class="text-2xl font-bold text-gray-900 mb-2">Seleção de Turma</h2>
            <p class="text-gray-600">Selecione o curso e disciplina para gerenciar as notas</p>
          </div>
          <div
            class="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center"
          >
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              ></path>
            </svg>
          </div>
        </div>

        <form @submit.prevent="loadStudents" class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div class="space-y-2">
            <label class="block text-sm font-semibold text-gray-700 mb-2">Curso</label>
            <div class="relative">
              <select
                v-model="selectedCourse"
                @change="handleCourseChange"
                class="w-full bg-white/70 border-2 rounded-xl px-4 py-3 pr-10 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 appearance-none"
                :class="{ 'border-red-500': errors.course }"
              >
                <option value="">Selecione o curso</option>
                <option v-for="curso in courses" :key="curso._id" :value="curso._id">
                  {{ curso.title }}
                </option>
              </select>
              <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg
                  class="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </div>
            </div>
            <p v-if="errors.course" class="text-red-500 text-sm mt-1">{{ errors.course }}</p>
          </div>

          <div class="space-y-2">
            <label class="block text-sm font-semibold text-gray-700 mb-2">Disciplina</label>
            <div class="relative">
              <select
                v-model="selectedDiscipline"
                @change="handleDisciplineChange"
                class="w-full bg-white/70 border-2 rounded-xl px-4 py-3 pr-10 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 appearance-none"
                :class="{ 'border-red-500': errors.discipline }"
                :disabled="!selectedCourse"
              >
                <option value="">Selecione a disciplina</option>
                <option v-for="disc in disciplines" :key="disc._id" :value="disc._id">
                  {{ disc.name }}
                </option>
              </select>
              <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg
                  class="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </div>
            </div>
            <p v-if="errors.discipline" class="text-red-500 text-sm mt-1">{{ errors.discipline }}</p>
          </div>
        </form>
      </div>

      <!-- Notes Table Card -->
      <div
        v-if="showNotesTable"
        class="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/30 p-8 mb-8 hover:shadow-2xl transition-all duration-500"
      >
        <div class="flex items-center justify-between mb-8">
          <div>
            <h2 class="text-2xl font-bold text-gray-900 mb-2">Lançamento de Notas</h2>
            <p class="text-gray-600">Atualize as notas dos alunos selecionados</p>
          </div>
          <div
            class="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center"
          >
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              ></path>
            </svg>
          </div>
        </div>

        <form @submit.prevent="saveNotes">
          <div class="overflow-hidden rounded-2xl border border-gray-200">
            <div class="overflow-x-auto">
              <table class="w-full">
                <thead class="bg-gradient-to-r from-gray-50 to-gray-100">
                  <tr>
                    <th
                      class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                    >
                      #
                    </th>
                    <th
                      class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                    >
                      Aluno
                    </th>
                    <th
                      class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                    >
                      Nota 1
                    </th>
                    <th
                      class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                    >
                      Nota 2
                    </th>
                    <th
                      class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                    >
                      Média Final
                    </th>
                    <th
                      class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                    >
                      Situação
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white/50 divide-y divide-gray-200">
                  <tr
                    v-for="(student, idx) in students"
                    :key="student._id"
                    class="hover:bg-blue-50/50 transition-all duration-200 group"
                  >
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      <span
                        class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold"
                      >
                        {{ idx + 1 }}
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm font-medium text-gray-900">{{ student.name }}</div>
                      <div class="text-sm text-gray-500">{{ student.registration }}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <input
                        type="number"
                        v-model.number="notes[student._id].grade1"
                        min="0"
                        max="10"
                        step="0.1"
                        placeholder="0.0"
                        class="w-24 bg-white/70 border-2 rounded-xl px-3 py-2 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                        :class="{ 'border-red-500': errors[`grade1_${student._id}`] }"
                        @input="validateGrade(student._id, 'grade1')"
                      />
                      <p v-if="errors[`grade1_${student._id}`]" class="text-red-500 text-xs mt-1">{{ errors[`grade1_${student._id}`] }}</p>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <input
                        type="number"
                        v-model.number="notes[student._id].grade2"
                        min="0"
                        max="10"
                        step="0.1"
                        placeholder="0.0"
                        class="w-24 bg-white/70 border-2 rounded-xl px-3 py-2 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                        :class="{ 'border-red-500': errors[`grade2_${student._id}`] }"
                        @input="validateGrade(student._id, 'grade2')"
                      />
                      <p v-if="errors[`grade2_${student._id}`]" class="text-red-500 text-xs mt-1">{{ errors[`grade2_${student._id}`] }}</p>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <input
                        type="number"
                        v-model.number="notes[student._id].finalGrade"
                        min="0"
                        max="10"
                        step="0.1"
                        placeholder="0.0"
                        class="w-24 bg-white/70 border-2 rounded-xl px-3 py-2 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                        readonly
                      />
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span
                        :class="[
                          'px-3 py-1 rounded-full text-sm font-medium',
                          notes[student._id].status === 'Aprovado'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        ]"
                      >
                        {{ notes[student._id].status }}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="text-right mt-6">
            <button
              type="submit"
              class="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-3 rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl"
              :disabled="isSaving"
            >
              <span v-if="isSaving">Salvando...</span>
              <span v-else>Salvar Notas</span>
            </button>
          </div>
        </form>
      </div>

      <!-- Toast Notification -->
      <transition name="toast">
        <div v-if="statusMessage" class="fixed right-6 bottom-6 z-50">
          <div
            :class="[
              'bg-white/90 backdrop-blur-sm border px-6 py-4 rounded-xl shadow-lg flex items-center min-w-[300px]',
              statusMessageType === 'success' ? 'border-green-200 text-green-800' : 'border-red-200 text-red-800'
            ]"
          >
            <div
              :class="[
                'w-8 h-8 rounded-full flex items-center justify-center mr-3',
                statusMessageType === 'success' ? 'bg-green-100' : 'bg-red-100'
              ]"
            >
              <svg
                v-if="statusMessageType === 'success'"
                class="w-4 h-4 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <svg
                v-else
                class="w-4 h-4 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </div>
            <span class="font-medium">{{ statusMessage }}</span>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { courseService } from '../services/courseService'
import { disciplineService } from '../services/disciplineService'
import noteService from '../services/noteService'

export default {
  name: 'EditNotes',
  data() {
    return {
      courses: [],
      disciplines: [],
      students: [],
      selectedCourse: '',
      selectedDiscipline: '',
      notes: {},
      statusMessage: '',
      statusMessageType: 'success',
      errors: {},
      isSaving: false,
      showNotesTable: false
    }
  },
  mounted() {
    this.fetchCourses()
  },
  methods: {
    async fetchCourses() {
      try {
        this.courses = await courseService.getAllCourses()
        console.log("Cursos carregados:", this.courses)
      } catch (error) {
        console.error("Erro ao carregar cursos:", error)
        this.showStatusMessage('Erro ao carregar cursos. Por favor, tente novamente.', 'error')
      }
    },
    async handleCourseChange() {
      this.errors = {}
      this.selectedDiscipline = ''
      this.students = []
      this.notes = {}
      this.showNotesTable = false

      if (!this.selectedCourse) {
        this.errors.course = 'Por favor, selecione um curso'
        return
      }

      try {
        await Promise.all([
          this.loadDisciplines(),
          this.loadStudents()
        ])
      } catch (error) {
        this.showStatusMessage('Erro ao carregar dados do curso. Por favor, tente novamente.', 'error')
      }
    },
    async handleDisciplineChange() {
      this.errors = {}
      this.notes = {}
      this.showNotesTable = false

      if (!this.selectedDiscipline) {
        this.errors.discipline = 'Por favor, selecione uma disciplina'
        return
      }

      try {
        await this.loadNotes()
        this.showNotesTable = true
      } catch (error) {
        this.showStatusMessage('Erro ao carregar notas. Por favor, tente novamente.', 'error')
      }
    },
    async loadDisciplines() {
      if (!this.selectedCourse) return
      try {
        const response = await disciplineService.getDisciplinesByCourse(this.selectedCourse)
        this.disciplines = response
      } catch (error) {
        console.error('Erro ao carregar disciplinas:', error)
        throw error
      }
    },
    async loadStudents() {
      if (!this.selectedCourse) return
      try {
        const response = await courseService.getStudentsByCourse(this.selectedCourse)
        this.students = response
      } catch (error) {
        console.error('Erro ao carregar alunos:', error)
        throw error
      }
    },
    async loadNotes() {
      if (!this.selectedCourse || !this.selectedDiscipline) return
      try {
        const response = await noteService.getNotesByCourseAndDiscipline(
          this.selectedCourse,
          this.selectedDiscipline
        )
        this.initializeNotes(response)
      } catch (error) {
        console.error('Erro ao carregar notas:', error)
        throw error
      }
    },
    initializeNotes(existingNotes = []) {
      this.notes = {}
      this.students.forEach(student => {
        const existingNote = existingNotes.find(note => note.student._id === student._id)
        this.notes[student._id] = {
          grade1: existingNote?.grade1 || null,
          grade2: existingNote?.grade2 || null,
          finalGrade: existingNote?.finalGrade || null,
          status: existingNote?.status || 'Reprovado'
        }
      })
    },
    validateGrade(studentId, gradeType) {
      const grade = this.notes[studentId][gradeType]
      const errorKey = `${gradeType}_${studentId}`

      if (grade === null || grade === '') {
        this.errors[errorKey] = 'Nota é obrigatória'
        return false
      }

      if (grade < 0 || grade > 10) {
        this.errors[errorKey] = 'Nota deve estar entre 0 e 10'
        return false
      }

      delete this.errors[errorKey]
      this.calculateFinalGrade(studentId)
      return true
    },
    calculateFinalGrade(studentId) {
      const note = this.notes[studentId]
      if (note.grade1 !== null && note.grade2 !== null) {
        note.finalGrade = ((note.grade1 + note.grade2) / 2).toFixed(1)
        note.status = note.finalGrade >= 6 ? 'Aprovado' : 'Reprovado'
      }
    },
    validateAllGrades() {
      let isValid = true
      this.errors = {}

      this.students.forEach(student => {
        if (!this.validateGrade(student._id, 'grade1') || !this.validateGrade(student._id, 'grade2')) {
          isValid = false
        }
      })

      return isValid
    },
    async saveNotes() {
      if (!this.validateAllGrades()) {
        this.showStatusMessage('Por favor, corrija os erros antes de salvar.', 'error')
        return
      }

      this.isSaving = true
      try {
        const notesData = Object.entries(this.notes).map(([studentId, note]) => ({
          student: studentId,
          course: this.selectedCourse,
          discipline: this.selectedDiscipline,
          grade1: note.grade1,
          grade2: note.grade2,
          finalGrade: note.finalGrade,
          status: note.status
        }))

        await noteService.bulkUpdateNotes(notesData)
        this.showStatusMessage('Notas salvas com sucesso!', 'success')
      } catch (error) {
        console.error('Erro ao salvar notas:', error)
        this.showStatusMessage(error.message || 'Erro ao salvar notas. Por favor, tente novamente.', 'error')
      } finally {
        this.isSaving = false
      }
    },
    showStatusMessage(message, type = 'success') {
      this.statusMessage = message
      this.statusMessageType = type
      setTimeout(() => {
        this.statusMessage = ''
      }, 3000)
    }
  }
}
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from,
.toast-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>
