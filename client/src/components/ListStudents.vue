<script>
export default {
  name: 'ListStudents',
  data() {
    return {
      students: [],
      form: {
        nome: '',
        idade: null,
        cpf: '',
        rg: '',
        genero: '',
        email: '',
        telefone: '',
        curso: '',
        endereco: {
          rua: '',
          cidade: '',
          estado: '',
          cep: ''
        }
      },
      errors: {
        nome: false,
        idade: false,
        cpf: false,
        rg: false,
        genero: false,
        email: false,
        telefone: false,
        curso: false,
        endereco: {
          rua: false,
          cidade: false,
          estado: false,
          cep: false
        }
      },
      cursos: ['Engenharia', 'Administração', 'Direito', 'Medicina'],
      isEditing: false,
      editingIndex: null,
      showModal: false,
      showDeleteModal: false,
      deletingIndex: null,
      currentView: {},
      search: '',
      toastMessage: '',
      showToast: false,
    };
  },
  computed: {
    filteredStudents() {
      const term = this.search.toLowerCase();
      return this.students.filter(s =>
        s.nome.toLowerCase().includes(term) ||
        s.cpf.includes(term) ||
        s.curso.toLowerCase().includes(term)
      ); // Faltava este parêntese
    },
  },
  methods: {
    saveStudent() {
      // Validação
      this.errors = {
        nome: !this.form.nome,
        idade: !this.form.idade || this.form.idade < 0,
        cpf: !this.form.cpf,
        rg: !this.form.rg,
        genero: !this.form.genero,
        email: !this.form.email,
        telefone: !this.form.telefone,
        curso: !this.form.curso,
        endereco: {
          rua: !this.form.endereco.rua,
          cidade: !this.form.endereco.cidade,
          estado: !this.form.endereco.estado,
          cep: !this.form.endereco.cep
        }
      };

      if (Object.values(this.errors).some(v => v) || Object.values(this.errors.endereco).some(v => v)) return;

      if (this.isEditing) {
        this.students.splice(this.editingIndex, 1, { ...this.form });
        this.showToastMessage('Aluno atualizado com sucesso!');
      } else {
        this.students.push({ ...this.form });
        this.showToastMessage('Aluno cadastrado com sucesso!');
      }
      this.resetForm();
    },
    editStudent(idx) {
      this.isEditing = true;
      this.editingIndex = idx;
      this.form = { ...this.students[idx], endereco: { ...this.students[idx].endereco } };
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    deleteStudent(idx) {
      this.deletingIndex = idx;
      this.showDeleteModal = true;
    },
    confirmDelete() {
      this.students.splice(this.deletingIndex, 1);
      this.showDeleteModal = false;
      this.showToastMessage('Aluno excluído com sucesso!');
    },
    viewStudent(aluno) {
      this.currentView = aluno;
      this.showModal = true;
    },
    showToastMessage(message) {
      this.toastMessage = message;
      this.showToast = true;
      setTimeout(() => this.showToast = false, 3000);
    },
    closeModal() {
      this.showModal = false;
    },
    resetForm() {
      this.form = {
        nome: '', idade: null, cpf: '', rg: '', genero: '', email: '', telefone: '', curso: '',
        endereco: { rua: '', cidade: '', estado: '', cep: '' }
      };
      this.errors = {};
      this.isEditing = false;
      this.editingIndex = null;
    }
  }
};
</script>

<template>
  <div class="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden min-h-screen">
    <!-- Background decorative elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl"></div>
      <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-400/10 rounded-full blur-3xl"></div>
    </div>

    <!-- Toast Notification -->
    <transition name="toast">
      <div v-if="showToast" class="fixed right-6 z-50">
        <div
          class="bg-white/90 backdrop-blur-sm border border-green-200 text-green-800 px-6 py-4 rounded-xl shadow-lg flex items-center min-w-[300px]">
          <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
            <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <span class="font-medium">{{ toastMessage }}</span>
        </div>
      </div>
    </transition>

    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1
          class="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent mb-4">
          Gestão de Alunos
        </h1>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
          Sistema completo para gerenciar alunos com interface moderna e intuitiva
        </p>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div
          class="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
          <div class="flex items-center">
            <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-600">Total de Alunos</p>
              <p class="text-2xl font-bold text-gray-900">{{ students.length }}</p>
            </div>
          </div>
        </div>

        <div
          class="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
          <div class="flex items-center">
            <div class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mr-4">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-600">Alunos Ativos</p>
              <p class="text-2xl font-bold text-gray-900">{{ filteredStudents.length }}</p>
            </div>
          </div>
        </div>

        <div
          class="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
          <div class="flex items-center">
            <div class="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mr-4">
              <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253">
                </path>
              </svg>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-600">Cursos</p>
              <p class="text-2xl font-bold text-gray-900">{{ cursos.length }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Form Card -->
      <div
        class="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/30 p-8 mb-8 hover:shadow-2xl transition-all duration-500">
        <div class="flex items-center justify-between mb-8">
          <div>
            <h2 class="text-2xl font-bold text-gray-900 mb-2">
              {{ isEditing ? 'Editar Aluno' : 'Novo Aluno' }}
            </h2>
            <p class="text-gray-600">
              {{ isEditing ? 'Atualize os dados do aluno' : 'Preencha os campos para cadastrar um novo aluno' }}
            </p>
          </div>
          <div
            class="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6">
              </path>
            </svg>
          </div>
        </div>

        <form @submit.prevent="saveStudent" class="grid grid-cols-1 md:grid-cols-2 gap-6" novalidate>
          <!-- Campos do formulário com validação -->
          <div v-for="(field, key) in {
            nome: { label: 'Nome Completo', icon: 'user', type: 'text' },
            idade: { label: 'Idade', icon: 'calendar', type: 'number' },
            cpf: { label: 'CPF', icon: 'id-card', type: 'text' },
            rg: { label: 'RG', icon: 'document', type: 'text' },
            email: { label: 'Email', icon: 'mail', type: 'email' },
            telefone: { label: 'Telefone', icon: 'phone', type: 'tel' },
            genero: { label: 'Gênero', icon: 'gender', type: 'select', options: ['Masculino', 'Feminino', 'Outro'] },
            curso: { label: 'Curso', icon: 'book', type: 'select', options: cursos }
          }" :key="key" class="space-y-2">
            <label class="block text-sm font-semibold text-gray-700 mb-2">{{ field.label }}</label>
            <div class="relative">
              <template v-if="field.type === 'select'">
                <select v-model="form[key]"
                  class="w-full bg-white/70 border-2 rounded-xl px-4 py-3 pr-10 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 appearance-none"
                  :class="{ 'border-red-300 focus:border-red-500 focus:ring-red-500/20': errors[key], 'border-gray-200': !errors[key] }">
                  <option value="">Selecione {{ field.label.toLowerCase() }}</option>
                  <option v-for="option in field.options" :key="option" :value="option">{{ option }}</option>
                </select>
              </template>
              <template v-else>
                <input :id="key" v-model="form[key]" :type="field.type"
                  class="w-full bg-white/70 border-2 rounded-xl px-4 py-3 pr-10 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 placeholder-gray-400"
                  :class="{ 'border-red-300 focus:border-red-500 focus:ring-red-500/20': errors[key], 'border-gray-200': !errors[key] }">
              </template>
              <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <template v-if="field.icon === 'user'">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </template>
                  <template v-else-if="field.icon === 'calendar'">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </template>
                </svg>
              </div>
            </div>
            <p v-if="errors[key]" class="text-red-500 text-sm flex items-center">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              {{ field.label }} é obrigatório
            </p>
          </div>

          <!-- Endereço -->
          <div class="md:col-span-2 space-y-6 pt-4">
            <h3 class="text-lg font-semibold text-gray-900 border-b pb-2">Endereço</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div v-for="(addrField, key) in {
                rua: { label: 'Rua', icon: 'location' },
                cidade: { label: 'Cidade', icon: 'city' },
                estado: { label: 'Estado', icon: 'map' },
                cep: { label: 'CEP', icon: 'mail' }
              }" :key="key" class="space-y-2">
                <label class="block text-sm font-semibold text-gray-700 mb-2">{{ addrField.label }}</label>
                <div class="relative">
                  <input v-model="form.endereco[key]" type="text"
                    class="w-full bg-white/70 border-2 rounded-xl px-4 py-3 pr-10 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 placeholder-gray-400"
                    :class="{ 'border-red-300 focus:border-red-500 focus:ring-red-500/20': errors.endereco[key], 'border-gray-200': !errors.endereco[key] }">
                </div>
              </div>
            </div>
          </div>

          <div class="md:col-span-2 flex flex-col sm:flex-row gap-4 pt-6">
            <button type="submit"
              class="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl hover:from-blue-700 hover:to-indigo-700 
              transition-all duration-200 flex items-center justify-center font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
              {{ isEditing ? 'Atualizar Aluno' : 'Cadastrar Aluno' }}
            </button>
            <button v-if="isEditing" @click="resetForm" type="button"
              class="flex-1 bg-gray-100 text-gray-700 px-8 py-4 rounded-xl hover:bg-gray-200 transition-all duration-200 flex items-center justify-center font-semibold border-2 border-gray-200 hover:border-gray-300">
              Cancelar
            </button>
          </div>
        </form>
      </div>

      <!-- Tabela de Alunos -->
      <div
        class="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/30 p-8 hover:shadow-2xl transition-all duration-500">
        <div class="flex flex-col lg:flex-row lg:items-center justify-between mb-8">
          <div>
            <h2 class="text-2xl font-bold text-gray-900 mb-2">Alunos Cadastrados</h2>
            <p class="text-gray-600">Gerencie todos os alunos do sistema</p>
          </div>
          <div class="mt-4 lg:mt-0 relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
            <input v-model="search" type="text" placeholder="Buscar alunos..."
              class="pl-10 pr-4 py-3 bg-white/70 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 min-w-[300px]">
          </div>
        </div>

        <div class="overflow-hidden rounded-2xl border border-gray-200">
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead class="bg-gradient-to-r from-gray-50 to-gray-100">
                <tr>
                  <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">#</th>
                  <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Nome</th>
                  <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">CPF</th>
                  <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Curso
                  </th>
                  <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Cidade
                  </th>
                  <th class="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">Ações
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white/50 divide-y divide-gray-200">
                <tr v-for="(aluno, idx) in filteredStudents" :key="idx"
                  class="hover:bg-blue-50/50 transition-all duration-200 group">
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    <span
                      class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                      {{ idx + 1 }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm font-medium text-gray-900">{{ aluno.nome }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ aluno.cpf }}</td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span
                      class="inline-flex px-3 py-1 text-xs font-semibold rounded-full bg-indigo-100 text-indigo-800">
                      {{ aluno.curso }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ aluno.endereco.cidade }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div
                      class="flex justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <button @click="viewStudent(aluno)"
                        class="w-8 h-8 flex items-center justify-center text-blue-600 hover:text-blue-700 hover:bg-blue-100 rounded-lg transition-all duration-200">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"></path>
                        </svg>
                      </button>
                      <button @click="editStudent(idx)"
                        class="w-8 h-8 flex items-center justify-center text-amber-600 hover:text-amber-700 hover:bg-amber-100 rounded-lg transition-all duration-200">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z">
                          </path>
                        </svg>
                      </button>
                      <button @click="deleteStudent(idx)"
                        class="w-8 h-8 flex items-center justify-center text-red-600 hover:text-red-700 hover:bg-red-100 rounded-lg transition-all duration-200">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16">
                          </path>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
                <tr v-if="filteredStudents.length === 0">
                  <td colspan="6" class="px-6 py-12 text-center">
                    <div class="flex flex-col items-center justify-center text-gray-400">
                      <div class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                        <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                      </div>
                      <h3 class="text-lg font-semibold text-gray-600 mb-2">Nenhum aluno encontrado</h3>
                      <p class="text-gray-500">
                        {{ search ? 'Tente ajustar sua busca' : 'Comece cadastrando seu primeiro aluno' }}
                      </p>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- Modals (View e Delete) - Mantidos semelhantes ao EditClass -->
    <!-- ... (Mesma estrutura de modais do EditClass adaptada para alunos) ... -->
  </div>
</template>
