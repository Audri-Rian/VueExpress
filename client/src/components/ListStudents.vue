<script>
import { studentService } from '../services/studentService';
import { courseService } from '../services/courseService';

export default {
  name: 'ListStudents',
  data() {
    return {
      students: [],
      courses: [],
      form: {
        name: '',
        age: null,
        CPF: '',
        RG: '',
        gender: '',
        email: '',
        phone: '',
        course: '',
        address: {
          street: '',
          city: '',
          state: '',
          zipCode: ''
        }
      },
      errors: {
        name: '',
        age: '',
        CPF: '',
        RG: '',
        gender: '',
        email: '',
        phone: '',
        course: '',
        address: {
          street: '',
          city: '',
          state: '',
          zipCode: ''
        }
      },
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
      loading: false
    };
  },
  computed: {
    filteredStudents() {
      const term = this.search.toLowerCase();
      return this.students.filter(s =>
        s.name.toLowerCase().includes(term) ||
        s.CPF.includes(term) ||
        (s.course && s.course.title.toLowerCase().includes(term))
      );
    }
  },
  async created() {
    await Promise.all([
      this.loadStudents(),
      this.loadCourses()
    ]);
  },
  methods: {
    async loadCourses() {
      try {
        this.loading = true;
        const response = await courseService.getAllCourses();
        this.courses = response;
      } catch (error) {
        this.showToastMessage(error.message, true);
      } finally {
        this.loading = false;
      }
    },

    async loadStudents() {
      try {
        this.loading = true;
        const response = await studentService.getAllStudents();
        this.students = response;
      } catch (error) {
        this.showToastMessage(error.message, true);
      } finally {
        this.loading = false;
      }
    },

    formatCPF(cpf) {
      // Remove tudo que não for número
      const numbers = cpf.replace(/\D/g, '');
      // Aplica a formatação
      return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    },

    formatPhone(phone) {
      // Remove tudo que não for número
      const numbers = phone.replace(/\D/g, '');
      // Aplica a formatação
      return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    },

    formatCEP(cep) {
      // Remove tudo que não for número
      const numbers = cep.replace(/\D/g, '');
      // Aplica a formatação
      return numbers.replace(/(\d{5})(\d{3})/, '$1-$2');
    },

    validateForm() {
      let isValid = true;
      this.errors = {
        name: '',
        age: '',
        CPF: '',
        RG: '',
        gender: '',
        email: '',
        phone: '',
        course: '',
        address: {
          street: '',
          city: '',
          state: '',
          zipCode: ''
        }
      };

      // Validação do nome
      if (!this.form.name) {
        this.errors.name = 'Nome é obrigatório';
        isValid = false;
      } else if (this.form.name.length < 5) {
        this.errors.name = 'Nome deve ter pelo menos 5 caracteres';
        isValid = false;
      }

      // Validação da idade
      if (!this.form.age) {
        this.errors.age = 'Idade é obrigatória';
        isValid = false;
      } else if (this.form.age < 0 || this.form.age > 120) {
        this.errors.age = 'Idade inválida';
        isValid = false;
      }

      // Validação do CPF
      if (!this.form.CPF) {
        this.errors.CPF = 'CPF é obrigatório';
        isValid = false;
      } else if (this.form.CPF.replace(/\D/g, '').length !== 11) {
        this.errors.CPF = 'CPF deve ter 11 dígitos';
        isValid = false;
      }

      // Validação do RG
      if (!this.form.RG) {
        this.errors.RG = 'RG é obrigatório';
        isValid = false;
      }

      // Validação do gênero
      if (!this.form.gender) {
        this.errors.gender = 'Gênero é obrigatório';
        isValid = false;
      }

      // Validação do email
      if (!this.form.email) {
        this.errors.email = 'Email é obrigatório';
        isValid = false;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.form.email)) {
        this.errors.email = 'Email inválido';
        isValid = false;
      }

      // Validação do telefone
      if (!this.form.phone) {
        this.errors.phone = 'Telefone é obrigatório';
        isValid = false;
      } else if (this.form.phone.replace(/\D/g, '').length !== 11) {
        this.errors.phone = 'Telefone deve ter 11 dígitos';
        isValid = false;
      }

      // Validação do curso
      if (!this.form.course) {
        this.errors.course = 'Curso é obrigatório';
        isValid = false;
      }

      // Validação do endereço
      if (!this.form.address.street) {
        this.errors.address.street = 'Rua é obrigatória';
        isValid = false;
      }

      if (!this.form.address.city) {
        this.errors.address.city = 'Cidade é obrigatória';
        isValid = false;
      }

      if (!this.form.address.state) {
        this.errors.address.state = 'Estado é obrigatório';
        isValid = false;
      }

      if (!this.form.address.zipCode) {
        this.errors.address.zipCode = 'CEP é obrigatório';
        isValid = false;
      } else if (this.form.address.zipCode.replace(/\D/g, '').length !== 8) {
        this.errors.address.zipCode = 'CEP deve ter 8 dígitos';
        isValid = false;
      }

      return isValid;
    },

    async saveStudent() {
      if (!this.validateForm()) {
        this.showToastMessage('Por favor, corrija os erros antes de salvar.', true);
        return;
      }

      try {
        this.loading = true;
        // Formata os campos antes de enviar
        const formattedData = {
          ...this.form,
          CPF: this.formatCPF(this.form.CPF),
          phone: this.formatPhone(this.form.phone),
          address: {
            ...this.form.address,
            zipCode: this.formatCEP(this.form.address.zipCode)
          }
        };

        if (this.isEditing) {
          await studentService.updateStudent(this.editingIndex, formattedData);
          this.showToastMessage('Aluno atualizado com sucesso!');
        } else {
          const response = await studentService.createStudent(formattedData);
          this.showToastMessage('Aluno cadastrado com sucesso!');
        }
        await this.loadStudents();
        this.resetForm();
      } catch (error) {
        console.error('Erro detalhado:', error);
        
        if (error.response && error.response.data) {
          const errorData = error.response.data;
          console.log('Dados do erro:', errorData);
          
          // Limpa todos os erros anteriores
          this.errors = {
            name: '',
            age: '',
            CPF: '',
            RG: '',
            gender: '',
            email: '',
            phone: '',
            course: '',
            address: {
              street: '',
              city: '',
              state: '',
              zipCode: ''
            }
          };

          if (errorData.error === "Erro de validação") {
            // Atualiza os erros do formulário com as mensagens do backend
            for (let field in errorData.details) {
              if (field.includes('.')) {
                const [parent, child] = field.split('.');
                this.errors[parent][child] = errorData.details[field];
              } else {
                this.errors[field] = errorData.details[field];
              }
            }
            this.showToastMessage(errorData.message || 'Por favor, verifique os campos obrigatórios', true);
          } else if (errorData.error === "CPF duplicado" || errorData.error === "Email duplicado") {
            // Mostra erro específico para campo duplicado
            this.errors[errorData.field] = errorData.message;
            this.showToastMessage(errorData.message, true);
            
            // Destaca o campo com erro
            const input = document.querySelector(`[name="${errorData.field}"]`);
            if (input) {
              input.focus();
              input.classList.add('border-red-500');
            }
          } else if (errorData.msg) {
            // Mensagem de erro específica do backend
            this.showToastMessage(errorData.msg, true);
          } else {
            // Se não houver mensagem específica, mostra o erro completo
            this.showToastMessage(`Erro ao salvar aluno: ${JSON.stringify(errorData)}`, true);
          }
        } else {
          this.showToastMessage('Erro ao conectar com o servidor. Por favor, tente novamente.', true);
        }
      } finally {
        this.loading = false;
      }
    },

    async editStudent(id) {
      try {
        this.loading = true;
        const student = await studentService.getStudentById(id);
        this.isEditing = true;
        this.editingIndex = id;
        this.form = {
          name: student.name || '',
          age: student.age || null,
          CPF: student.CPF || '',
          RG: student.RG || '',
          gender: student.gender || '',
          email: student.email || '',
          phone: student.phone || '',
          course: student.course?._id || '',
          address: {
            street: student.address?.street || '',
            city: student.address?.city || '',
            state: student.address?.state || '',
            zipCode: student.address?.zipCode || ''
          }
        };
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } catch (error) {
        this.showToastMessage(error.message, true);
      } finally {
        this.loading = false;
      }
    },

    async deleteStudent(id) {
      if (!confirm('Tem certeza que deseja excluir este aluno?')) return;

      try {
        this.loading = true;
        await studentService.deleteStudent(id);
        this.showToastMessage('Aluno excluído com sucesso!');
        await this.loadStudents();
      } catch (error) {
        this.showToastMessage(error.message, true);
      } finally {
        this.loading = false;
      }
    },

    viewStudent(student) {
      this.currentView = {
        ...student,
        address: student.address || {
          street: 'Não informado',
          city: 'Não informada',
          state: 'Não informado',
          zipCode: 'Não informado'
        }
      };
      this.showModal = true;
    },

    showToastMessage(message, isError = false) {
      this.toastMessage = message;
      this.isError = isError;
      this.showToast = true;
      setTimeout(() => this.showToast = false, 3000);
    },

    closeModal() {
      this.showModal = false;
    },

    resetForm() {
      this.form = {
        name: '',
        age: null,
        CPF: '',
        RG: '',
        gender: '',
        email: '',
        phone: '',
        course: '',
        address: {
          street: '',
          city: '',
          state: '',
          zipCode: ''
        }
      };
      this.errors = {};
      this.isEditing = false;
      this.editingIndex = null;
    }
  }
};
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
    <!-- Toast Message -->
    <div v-if="showToast" 
      class="fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg transform transition-all duration-300"
      :class="isError ? 'bg-red-500 text-white' : 'bg-green-500 text-white'">
      {{ toastMessage }}
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Gerenciamento de Alunos</h1>
        <p class="mt-2 text-gray-600">Cadastre e gerencie os alunos do sistema</p>
      </div>

      <!-- Loading Overlay -->
      <div v-if="loading" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div class="bg-white p-4 rounded-lg shadow-lg">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      </div>

      <!-- Main Content -->
      <div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-8">
        <!-- Form Section -->
        <form @submit.prevent="saveStudent" class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div class="space-y-2">
              <label class="block text-sm font-semibold text-gray-700">Nome Completo <span class="text-red-500">*</span></label>
              <input v-model="form.name" type="text" placeholder="Digite o nome completo"
                class="w-full bg-white/70 border-2 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                :class="{ 'border-red-300 focus:border-red-500 focus:ring-red-500/20': errors.name, 'border-gray-200': !errors.name }">
              <p v-if="errors.name" class="text-red-500 text-xs">{{ errors.name }}</p>
            </div>

            <div class="space-y-2">
              <label class="block text-sm font-semibold text-gray-700">Idade <span class="text-red-500">*</span></label>
              <input v-model.number="form.age" type="number" min="0" placeholder="Digite a idade"
                class="w-full bg-white/70 border-2 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                :class="{ 'border-red-300 focus:border-red-500 focus:ring-red-500/20': errors.age, 'border-gray-200': !errors.age }">
              <p v-if="errors.age" class="text-red-500 text-xs">{{ errors.age }}</p>
            </div>

            <div class="space-y-2">
              <label class="block text-sm font-semibold text-gray-700">CPF <span class="text-red-500">*</span></label>
              <input v-model="form.CPF" type="text" placeholder="Digite o CPF (apenas números)"
                class="w-full bg-white/70 border-2 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                :class="{ 'border-red-300 focus:border-red-500 focus:ring-red-500/20': errors.CPF, 'border-gray-200': !errors.CPF }">
              <p v-if="errors.CPF" class="text-red-500 text-xs">{{ errors.CPF }}</p>
            </div>

            <div class="space-y-2">
              <label class="block text-sm font-semibold text-gray-700">RG <span class="text-red-500">*</span></label>
              <input v-model="form.RG" type="text" placeholder="Digite o RG"
                class="w-full bg-white/70 border-2 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                :class="{ 'border-red-300 focus:border-red-500 focus:ring-red-500/20': errors.RG, 'border-gray-200': !errors.RG }">
              <p v-if="errors.RG" class="text-red-500 text-xs">{{ errors.RG }}</p>
            </div>

            <div class="space-y-2">
              <label class="block text-sm font-semibold text-gray-700">Gênero <span class="text-red-500">*</span></label>
              <select v-model="form.gender" class="w-full bg-white/70 border-2 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 appearance-none"
                :class="{ 'border-red-300 focus:border-red-500 focus:ring-red-500/20': errors.gender, 'border-gray-200': !errors.gender }">
                <option value="">Selecione o gênero</option>
                <option>Masculino</option>
                <option>Feminino</option>
                <option>Outro</option>
              </select>
              <p v-if="errors.gender" class="text-red-500 text-xs">{{ errors.gender }}</p>
            </div>

            <div class="space-y-2">
              <label class="block text-sm font-semibold text-gray-700">Email <span class="text-red-500">*</span></label>
              <input v-model="form.email" type="email" placeholder="Digite o email"
                class="w-full bg-white/70 border-2 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                :class="{ 'border-red-300 focus:border-red-500 focus:ring-red-500/20': errors.email, 'border-gray-200': !errors.email }">
              <p v-if="errors.email" class="text-red-500 text-xs">{{ errors.email }}</p>
            </div>

            <div class="space-y-2">
              <label class="block text-sm font-semibold text-gray-700">Telefone <span class="text-red-500">*</span></label>
              <input v-model="form.phone" type="tel" placeholder="Digite o telefone (apenas números)"
                class="w-full bg-white/70 border-2 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                :class="{ 'border-red-300 focus:border-red-500 focus:ring-red-500/20': errors.phone, 'border-gray-200': !errors.phone }">
              <p v-if="errors.phone" class="text-red-500 text-xs">{{ errors.phone }}</p>
            </div>

            <div class="space-y-2">
              <label class="block text-sm font-semibold text-gray-700">Curso <span class="text-red-500">*</span></label>
              <select v-model="form.course" class="w-full bg-white/70 border-2 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 appearance-none"
                :class="{ 'border-red-300 focus:border-red-500 focus:ring-red-500/20': errors.course, 'border-gray-200': !errors.course }">
                <option value="">Selecione o curso</option>
                <option v-for="course in courses" :key="course._id" :value="course._id">
                  {{ course.title }}
                </option>
              </select>
              <p v-if="errors.course" class="text-red-500 text-xs">{{ errors.course }}</p>
            </div>
          </div>

          <!-- Endereço -->
          <div class="space-y-4 pt-4">
            <h3 class="text-lg font-semibold text-gray-900 border-b pb-2">Endereço</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-2">
                <label class="block text-sm font-semibold text-gray-700">Rua <span class="text-red-500">*</span></label>
                <input v-model="form.address.street" type="text" placeholder="Digite a rua"
                  class="w-full bg-white/70 border-2 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                  :class="{ 'border-red-300 focus:border-red-500 focus:ring-red-500/20': errors.address.street, 'border-gray-200': !errors.address.street }">
                <p v-if="errors.address.street" class="text-red-500 text-xs">{{ errors.address.street }}</p>
              </div>

              <div class="space-y-2">
                <label class="block text-sm font-semibold text-gray-700">Cidade <span class="text-red-500">*</span></label>
                <input v-model="form.address.city" type="text" placeholder="Digite a cidade"
                  class="w-full bg-white/70 border-2 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                  :class="{ 'border-red-300 focus:border-red-500 focus:ring-red-500/20': errors.address.city, 'border-gray-200': !errors.address.city }">
                <p v-if="errors.address.city" class="text-red-500 text-xs">{{ errors.address.city }}</p>
              </div>

              <div class="space-y-2">
                <label class="block text-sm font-semibold text-gray-700">Estado <span class="text-red-500">*</span></label>
                <input v-model="form.address.state" type="text" placeholder="Digite o estado"
                  class="w-full bg-white/70 border-2 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                  :class="{ 'border-red-300 focus:border-red-500 focus:ring-red-500/20': errors.address.state, 'border-gray-200': !errors.address.state }">
                <p v-if="errors.address.state" class="text-red-500 text-xs">{{ errors.address.state }}</p>
              </div>

              <div class="space-y-2">
                <label class="block text-sm font-semibold text-gray-700">CEP <span class="text-red-500">*</span></label>
                <input v-model="form.address.zipCode" type="text" placeholder="Digite o CEP (apenas números)"
                  class="w-full bg-white/70 border-2 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                  :class="{ 'border-red-300 focus:border-red-500 focus:ring-red-500/20': errors.address.zipCode, 'border-gray-200': !errors.address.zipCode }">
                <p v-if="errors.address.zipCode" class="text-red-500 text-xs">{{ errors.address.zipCode }}</p>
              </div>
            </div>
          </div>

          <div class="flex justify-end space-x-4">
            <button type="button" @click="resetForm" 
              class="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all duration-200 font-semibold">
              Cancelar
            </button>
            <button type="submit" 
              class="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-semibold shadow-lg">
              {{ isEditing ? 'Atualizar Aluno' : 'Cadastrar Aluno' }}
            </button>
          </div>
        </form>
      </div>

      <!-- Students List -->
      <div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-xl font-semibold text-gray-900">Lista de Alunos</h2>
          <div class="relative">
            <input v-model="search" type="text" placeholder="Buscar alunos..." 
              class="pl-10 pr-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200">
            <svg class="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="aluno in filteredStudents" :key="aluno._id" 
            class="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 p-4">
            <div class="flex items-start justify-between">
              <div class="flex-1 min-w-0">
                <h3 class="font-semibold text-gray-900 truncate">{{ aluno.name }}</h3>
                <div class="flex items-center mt-1 space-x-2">
                  <span class="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">{{ aluno.course?.title }}</span>
                  <span class="text-xs text-gray-500">Matrícula: {{ aluno.registration }}</span>
                  <span class="text-xs text-gray-500">{{ aluno.CPF }}</span>
                </div>
                <div class="mt-2">
                  <span class="text-xs text-gray-500">{{ aluno.email }}</span>
                </div>
                <div class="mt-1">
                  <span class="text-xs text-gray-500">{{ aluno.address?.city || 'Cidade não informada' }}, {{ aluno.address?.state || 'Estado não informado' }}</span>
                </div>
              </div>
              <div class="flex space-x-1">
                <button @click="viewStudent(aluno)" class="p-1 text-gray-400 hover:text-blue-600 transition-colors">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                  </svg>
                </button>
                <button @click="editStudent(aluno._id)" class="p-1 text-gray-400 hover:text-blue-600 transition-colors">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                  </svg>
                </button>
                <button @click="deleteStudent(aluno._id)" class="p-1 text-gray-400 hover:text-red-600 transition-colors">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- View Modal -->
    <div v-if="showModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div class="bg-white rounded-xl shadow-xl p-6 max-w-2xl w-full mx-4">
        <div class="flex justify-between items-start mb-4">
          <h3 class="text-xl font-semibold text-gray-900">Detalhes do Aluno</h3>
          <button @click="closeModal" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <div class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <p class="text-sm text-gray-500">Matrícula</p>
              <p class="font-medium">{{ currentView.registration }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500">Nome</p>
              <p class="font-medium">{{ currentView.name }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500">Idade</p>
              <p class="font-medium">{{ currentView.age }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500">CPF</p>
              <p class="font-medium">{{ currentView.CPF }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500">RG</p>
              <p class="font-medium">{{ currentView.RG }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500">Gênero</p>
              <p class="font-medium">{{ currentView.gender }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500">Email</p>
              <p class="font-medium">{{ currentView.email }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500">Telefone</p>
              <p class="font-medium">{{ currentView.phone }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500">Curso</p>
              <p class="font-medium">{{ currentView.course?.title }}</p>
            </div>
          </div>
          <div>
            <p class="text-sm text-gray-500">Endereço</p>
            <p class="font-medium">
              {{ currentView.address?.street }}, {{ currentView.address?.city }}, {{ currentView.address?.state }} - {{ currentView.address?.zipCode }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

/* Animações de entrada e saída */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Efeitos de hover e focus */
button:focus {
  outline: none;
  ring: 2px;
  ring-color: rgba(59, 130, 246, 0.5);
}

input:focus,
select:focus {
  outline: none;
  ring: 2px;
  ring-color: rgba(59, 130, 246, 0.5);
}

/* Transições suaves */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 200ms;
}

/* Efeitos de hover nos cards */
.card-hover {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card-hover:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

/* Estilização da barra de rolagem */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}

/* Animações de loading */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

/* Efeitos de glassmorphism */
.glass {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

/* Gradientes e sombras */
.gradient-bg {
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
}

.shadow-soft {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

/* Responsividade */
@media (max-width: 640px) {
  .grid-cols-1 {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
}

@media (min-width: 641px) and (max-width: 1024px) {
  .grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 1025px) {
  .grid-cols-3 {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
</style>
