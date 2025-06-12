<template>
  <div
    class="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 min-h-screen relative overflow-hidden"
  >
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl"></div>
      <div
        class="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-400/10 rounded-full blur-3xl"
      ></div>
    </div>

    <div class="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="text-center mb-10">
        <h1
          class="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent mb-2"
        >
          Criar Disciplina
        </h1>
        <p class="text-lg text-gray-600">
          Cadastre uma nova disciplina e vincule a um curso existente
        </p>
      </div>

      <div
        class="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/30 p-8 hover:shadow-2xl transition-all duration-500"
      >
        <form @submit.prevent="createDiscipline" class="space-y-6">
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Nome da Disciplina</label>
            <input
              v-model="name"
              type="text"
              required
              class="w-full bg-white/70 border-2 rounded-xl px-4 py-3 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
              placeholder="Digite o nome da disciplina"
            />
          </div>
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Curso</label>
            <select
              v-model="cursoId"
              required
              class="w-full bg-white/70 border-2 rounded-xl px-4 py-3 pr-10 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 appearance-none"
            >
              <option value="">Selecione o curso</option>
              <option v-for="curso in cursos" :key="curso._id" :value="curso._id">
                {{ curso.title }}
              </option>
            </select>
          </div>
          <div class="text-right">
            <button
              type="submit"
              class="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl"
            >
              Criar Disciplina
            </button>
          </div>
        </form>
        <transition name="toast">
          <div v-if="statusMessage" class="fixed right-6 z-50 mt-4">
            <div
              class="bg-white/90 backdrop-blur-sm border border-green-200 text-green-800 px-6 py-4 rounded-xl shadow-lg flex items-center min-w-[300px]"
            >
              <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                <svg
                  class="w-4 h-4 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              </div>
              <span class="font-medium">{{ statusMessage }}</span>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import { courseService } from '../services/courseService'
import { disciplineService } from '../services/disciplineService'

export default {
  name: 'CreateDiscipline',
  data() {
    return {
      name: '',
      cursoId: '',
      cursos: [],
      statusMessage: '',
    }
  },
  mounted() {
    this.fetchCourses(), this.createDiscipline()
  },
  methods: {
    async fetchCourses() {
      try {
        const response = await courseService.getAllCourses()
        this.cursos = response
      } catch (error) {
        this.statusMessage = 'Erro ao carregar cursos.'
      }
    },
    async createDiscipline() {
      if (!this.name || !this.cursoId) return
      try {
        await disciplineService.createDiscipline({
          name: this.name,
          cursoId: this.cursoId,
        })
        this.statusMessage = 'Disciplina criada com sucesso!'
        this.name = ''
        this.cursoId = ''
      } catch (error) {
        console.error('Erro ao criar disciplina:', error)
        this.statusMessage = 'Erro ao criar disciplina.'
      }
      setTimeout(() => {
        this.statusMessage = ''
      }, 3000)
    },
  },
}
</script>
