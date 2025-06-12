<template>
  <div class="flex h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
    <!-- Main Content -->
    <div class="flex-1 overflow-y-auto">
      <div class="max-w-8xl mx-auto px-6 sm:px-8 lg:px-10 py-8">
        <!-- Header -->
        <div class="text-center mb-12">
          <h1 class="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent">
            Criar Disciplina
          </h1>
          <p class="text-gray-600 mt-3 text-lg">
            Cadastre uma nova disciplina e vincule a um curso existente
          </p>
        </div>

        <!-- Toast Notification -->
        <transition name="toast">
          <div v-if="statusMessage" class="fixed top-4 right-4 z-50">
            <div class="bg-white/90 backdrop-blur-sm border border-green-200 text-green-800 px-4 py-3 rounded-lg shadow-lg flex items-center">
              <div class="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-2">
                <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <span class="font-medium text-sm">{{ statusMessage }}</span>
            </div>
          </div>
        </transition>

        <!-- Grid Layout -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Form Card -->
          <div class="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/30 p-8">
            <div class="flex items-center justify-between mb-6">
              <div>
                <h2 class="text-xl font-bold text-gray-900">
                  Dados da Disciplina
                </h2>
                <p class="text-sm text-gray-600">Preencha as informações necessárias</p>
              </div>
              <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
              </div>
            </div>

            <form @submit.prevent="createDiscipline" class="space-y-6">
              <div class="space-y-2">
                <label class="block text-sm font-semibold text-gray-700">Nome da Disciplina <span class="text-red-500">*</span></label>
                <input
                  v-model="name"
                  type="text"
                  required
                  class="w-full bg-white/70 border-2 rounded-lg px-4 py-3 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                  placeholder="Digite o nome da disciplina"
                />
              </div>

              <div class="space-y-2">
                <label class="block text-sm font-semibold text-gray-700">Curso <span class="text-red-500">*</span></label>
                <select
                  v-model="cursoId"
                  required
                  class="w-full bg-white/70 border-2 rounded-lg px-4 py-3 pr-10 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 appearance-none"
                >
                  <option value="">Selecione o curso</option>
                  <option v-for="curso in cursos" :key="curso._id" :value="curso._id">
                    {{ curso.title }}
                  </option>
                </select>
              </div>

              <div class="flex gap-3 pt-4">
                <button
                  type="submit"
                  class="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl flex items-center justify-center"
                >
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Criar Disciplina
                </button>
                <button
                  @click="resetForm"
                  type="button"
                  class="flex-1 bg-gray-100 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-200 transition-all duration-200 flex items-center justify-center font-semibold border border-gray-200"
                >
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                  </svg>
                  Limpar
                </button>
              </div>
            </form>
          </div>

          <!-- Disciplines List Card -->
          <div class="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/30 p-8">
            <div class="flex items-center justify-between mb-6">
              <div>
                <h2 class="text-xl font-bold text-gray-900">
                  Disciplinas Cadastradas
                </h2>
                <p class="text-sm text-gray-600">Lista de disciplinas disponíveis</p>
              </div>
              <div class="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                </svg>
              </div>
            </div>

            <!-- Disciplines List -->
            <div class="space-y-4 max-h-[600px] overflow-y-auto pr-3">
              <div v-for="discipline in disciplines" :key="discipline._id" 
                class="bg-white rounded-lg border border-gray-100 p-6 hover:shadow-md transition-all duration-200">
                <div class="flex items-start justify-between">
                  <div class="flex-1 min-w-0">
                    <h3 class="font-semibold text-gray-900 truncate">{{ discipline.name }}</h3>
                    <div class="flex items-center mt-1 space-x-2">
                      <span class="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        {{ getCourseName(discipline.cursoId) }}
                      </span>
                    </div>
                  </div>
                  <div class="flex space-x-2 ml-4 flex-shrink-0">
                    <button @click="editDiscipline(discipline)" class="p-1 text-gray-400 hover:text-blue-600 transition-colors">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                      </svg>
                    </button>
                    <button @click="deleteDiscipline(discipline._id)" class="p-1 text-gray-400 hover:text-red-600 transition-colors">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              <!-- Empty State -->
              <div v-if="disciplines.length === 0" class="text-center py-8">
                <svg class="w-12 h-12 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <p class="text-gray-500">Nenhuma disciplina encontrada</p>
              </div>
            </div>
          </div>
        </div>
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
      disciplines: [],
      statusMessage: '',
      editingDiscipline: null
    }
  },
  mounted() {
    this.fetchCourses();
    this.fetchDisciplines();
  },
  methods: {
    async fetchCourses() {
      try {
        const response = await courseService.getAllCourses();
        this.cursos = response;
      } catch (error) {
        this.statusMessage = 'Erro ao carregar cursos.';
      }
    },
    async fetchDisciplines() {
      try {
        const response = await disciplineService.getAllDisciplines();
        this.disciplines = response;
        if (this.cursos.length === 0) {
          await this.fetchCourses();
        }
      } catch (error) {
        this.statusMessage = 'Erro ao carregar disciplinas.';
      }
    },
    async createDiscipline() {
      if (!this.name || !this.cursoId) return;
      try {
        await disciplineService.createDiscipline({
          name: this.name,
          cursoId: this.cursoId,
        });
        this.statusMessage = 'Disciplina criada com sucesso!';
        this.resetForm();
        await this.fetchDisciplines();
      } catch (error) {
        console.error('Erro ao criar disciplina:', error);
        this.statusMessage = 'Erro ao criar disciplina.';
      }
      setTimeout(() => {
        this.statusMessage = '';
      }, 3000);
    },
    getCourseName(cursoId) {
      if (typeof cursoId === 'object' && cursoId !== null) {
        return cursoId.title || 'Curso não encontrado';
      }
      const course = this.cursos.find(c => c._id === cursoId);
      return course ? course.title : 'Curso não encontrado';
    },
    resetForm() {
      this.name = '';
      this.cursoId = '';
      this.editingDiscipline = null;
    },
    editDiscipline(discipline) {
      this.editingDiscipline = discipline;
      this.name = discipline.name;
      this.cursoId = discipline.cursoId;
    },
    async deleteDiscipline(id) {
      if (confirm('Tem certeza que deseja excluir esta disciplina?')) {
        try {
          await disciplineService.deleteDiscipline(id);
          this.statusMessage = 'Disciplina excluída com sucesso!';
          await this.fetchDisciplines();
        } catch (error) {
          this.statusMessage = 'Erro ao excluir disciplina.';
        }
        setTimeout(() => {
          this.statusMessage = '';
        }, 3000);
      }
    }
  }
}
</script>

<style scoped>
/* Toast Animation */
.toast-enter-active, .toast-leave-active {
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
input:focus, select:focus {
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
  transition: width 0.6s, height 0.6s;
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
