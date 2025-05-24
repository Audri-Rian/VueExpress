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

        <form @submit.prevent="loadStudents" class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div class="space-y-2">
            <label class="block text-sm font-semibold text-gray-700 mb-2">Curso</label>
            <div class="relative">
              <select v-model="selectedCourse" class="w-full bg-white/70 border-2 rounded-xl px-4 py-3 pr-10 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 appearance-none">
                <option value="">Selecione o curso</option>
                <option v-for="curso in cursos" :key="curso.id" :value="curso.id">{{ curso.nome }}</option>
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
              <select v-model="selectedDiscipline" class="w-full bg-white/70 border-2 rounded-xl px-4 py-3 pr-10 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 appearance-none">
                <option value="">Selecione a disciplina</option>
                <option v-for="disc in filteredDisciplines" :key="disc.id" :value="disc.id">{{ disc.nome }}</option>
              </select>
              <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </div>
          </div>

          <div class="lg:col-span-2 flex justify-end pt-4">
            <button type="submit" class="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl">
              Carregar Alunos
            </button>
          </div>
        </form>
      </div>

      <!-- Attendance Table Card -->
      <div v-if="students.length" class="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/30 p-8 mb-8 hover:shadow-2xl transition-all duration-500">
        <div class="flex items-center justify-between mb-8">
          <div>
            <h2 class="text-2xl font-bold text-gray-900 mb-2">Registro de Frequência</h2>
            <p class="text-gray-600">Marque os alunos presentes na aula</p>
          </div>
          <div class="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
        </div>

        <form @submit.prevent="saveAttendance">
          <div class="overflow-hidden rounded-2xl border border-gray-200">
            <div class="overflow-x-auto">
              <table class="w-full">
                <thead class="bg-gradient-to-r from-gray-50 to-gray-100">
                  <tr>
                    <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">#</th>
                    <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Aluno</th>
                    <th class="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Presente</th>
                  </tr>
                </thead>
                <tbody class="bg-white/50 divide-y divide-gray-200">
                  <tr v-for="(aluno, idx) in students" :key="aluno.id" class="hover:bg-blue-50/50 transition-all duration-200 group">
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      <span class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                        {{ idx + 1 }}
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm font-medium text-gray-900">{{ aluno.nome }}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-center">
                      <label class="inline-flex items-center cursor-pointer">
                        <input type="checkbox" v-model="attendance[aluno.id]" class="hidden">
                        <div class="w-6 h-6 border-2 rounded-md transition-all duration-200 flex items-center justify-center"
                          :class="attendance[aluno.id] ? 'bg-blue-600 border-blue-600' : 'bg-white border-gray-300'">
                          <svg v-if="attendance[aluno.id]" class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                        </div>
                      </label>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="text-right mt-6">
            <button type="submit" class="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-3 rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl">
              Salvar Frequência
            </button>
          </div>
        </form>
      </div>

      <!-- Toast Notification -->
      <transition name="toast">
        <div v-if="statusMessage" class="fixed right-6 z-50">
          <div class="bg-white/90 backdrop-blur-sm border border-green-200 text-green-800 px-6 py-4 rounded-xl shadow-lg flex items-center min-w-[300px]">
            <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
              <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
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
export default {
  name: 'EditAttendance',
  data() {
    return {
      cursos: [
        { id: 1, nome: 'Engenharia de Software' },
        { id: 2, nome: 'Administração' }
      ],
      disciplines: [
        { id: 1, nome: 'Programação Web', cursoId: 1 },
        { id: 2, nome: 'Banco de Dados', cursoId: 1 },
        { id: 3, nome: 'Gestão Financeira', cursoId: 2 }
      ],
      studentsData: [
        { id: 1, nome: 'Ana Silva', cursoId: 1 },
        { id: 2, nome: 'João Souza', cursoId: 1 },
        { id: 3, nome: 'Maria Oliveira', cursoId: 2 }
      ],
      selectedCourse: '',
      selectedDiscipline: '',
      students: [],
      attendance: {},
      statusMessage: ''
    };
  },
  computed: {
    filteredDisciplines() {
      return this.disciplines.filter(d => d.cursoId === this.selectedCourse);
    }
  },
  methods: {
    loadStudents() {
      if (!this.selectedCourse || !this.selectedDiscipline) return;
      this.statusMessage = '';
      this.students = this.studentsData.filter(s => s.cursoId === this.selectedCourse);
      this.attendance = {};
      this.students.forEach(s => {
        this.attendance[s.id] = false;
      });
    },
    saveAttendance() {
      this.statusMessage = 'Frequência registrada com sucesso!';
      setTimeout(() => { this.statusMessage = ''; }, 3000);
    }
  }
};
</script>

<style scoped>
/* Estilos idênticos aos componentes anteriores */
.toast-enter-active, .toast-leave-active {
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}
.toast-enter-from {
  opacity: 0;
  transform: translateX(100%) scale(0.8);
}
.toast-leave-to {
  opacity: 0;
  transform: translateX(100%) scale(0.8);
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