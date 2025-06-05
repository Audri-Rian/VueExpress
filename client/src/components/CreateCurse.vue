<template>
    <div class="flex h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <!-- Main Content -->
        <div class="flex-1 overflow-y-auto">
            <div class="max-w-8xl mx-auto px-6 sm:px-8 lg:px-10 py-8">
                <!-- Header -->
                <div class="text-center mb-12">
                    <h1 class="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent">
                        {{ editingCourse ? 'Editar Curso' : 'Cadastro de Curso' }}
                    </h1>
                    <p class="text-gray-600 mt-3 text-lg">
                        Sistema completo para gerenciar cursos acadêmicos
                    </p>
                </div>

                <!-- Toast Notification -->
                <transition name="toast">
                    <div v-if="showToast" class="fixed top-4 right-4 z-50">
                        <div class="bg-white/90 backdrop-blur-sm border text-green-800 px-4 py-3 rounded-lg shadow-lg flex items-center"
                            :class="isError ? 'border-red-200 text-red-800' : 'border-green-200 text-green-800'">
                            <div class="w-6 h-6 rounded-full flex items-center justify-center mr-2"
                                :class="isError ? 'bg-red-100' : 'bg-green-100'">
                                <svg v-if="!isError" class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                <svg v-else class="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                            </div>
                            <span class="font-medium text-sm">{{ toastMessage }}</span>
                        </div>
                    </div>
                </transition>

                <!-- Grid Layout -->
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <!-- Form Card -->
                    <div class="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/30 p-8 form-card">
                        <div class="flex items-center justify-between mb-6">
                            <div>
                                <h2 class="text-xl font-bold text-gray-900">
                                    Dados do Curso
                                </h2>
                                <p class="text-sm text-gray-600">Preencha as informações necessárias</p>
                            </div>
                            <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                </svg>
                            </div>
                        </div>

                        <form @submit.prevent="saveCourse" class="space-y-4" novalidate>
                            <div class="space-y-2">
                                <label class="block text-sm font-semibold text-gray-700">Título do Curso <span class="text-red-500">*</span></label>
                                <input ref="titleInput" v-model="form.title" type="text" placeholder="Ex: Engenharia de Software"
                                    class="w-full bg-white/70 border-2 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                                    :class="{ 'border-red-300 focus:border-red-500 focus:ring-red-500/20': errors.title, 'border-gray-200': !errors.title }">
                                <p v-if="errors.title" class="text-red-500 text-xs flex items-center">
                                    <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                    Título do curso é obrigatório
                                </p>
                            </div>

                            <div class="grid grid-cols-2 gap-4">
                                <div class="space-y-2">
                                    <label class="block text-sm font-semibold text-gray-700">Código <span class="text-red-500">*</span></label>
                                    <input v-model="form.code" type="text" placeholder="Ex: ESW"
                                        class="w-full bg-white/70 border-2 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                                        :class="{ 'border-red-300 focus:border-red-500 focus:ring-red-500/20': errors.code, 'border-gray-200': !errors.code }">
                                    <p v-if="errors.code" class="text-red-500 text-xs">{{ errors.code }}</p>
                                </div>

                                <div class="space-y-2">
                                    <label class="block text-sm font-semibold text-gray-700">Número de Períodos <span class="text-red-500">*</span></label>
                                    <input v-model.number="form.periods" type="number" min="1" max="12" placeholder="Ex: 4"
                                        class="w-full bg-white/70 border-2 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                                        :class="{ 'border-red-300 focus:border-red-500 focus:ring-red-500/20': errors.periods, 'border-gray-200': !errors.periods }">
                                    <p v-if="errors.periods" class="text-red-500 text-xs">Número de períodos deve estar entre 1 e 12</p>
                                </div>
                            </div>

                            <div class="space-y-2">
                                <label class="block text-sm font-semibold text-gray-700">Descrição <span class="text-red-500">*</span></label>
                                <textarea v-model="form.description" rows="3" placeholder="Breve descrição do curso..."
                                    class="w-full bg-white/70 border-2 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 resize-none"
                                    :class="{ 'border-red-300 focus:border-red-500 focus:ring-red-500/20': errors.description, 'border-gray-200': !errors.description }">
                                </textarea>
                                <p v-if="errors.description" class="text-red-500 text-xs">A descrição é obrigatória</p>
                            </div>

                            <div class="flex gap-3 pt-4">
                                <button type="submit" 
                                    class="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-2 rounded-lg hover:from-green-700 hover:to-emerald-700 
                                    transition-all duration-200 flex items-center justify-center font-semibold shadow-md hover:shadow-lg"
                                    :disabled="loading">
                                    <svg v-if="loading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <svg v-else class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    {{ editingCourse ? 'Atualizar' : 'Cadastrar' }}
                                </button>
                                <button @click="resetForm" type="button"
                                    class="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-all duration-200 flex items-center justify-center font-semibold border border-gray-200"
                                    :disabled="loading">
                                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                                    </svg>
                                    Limpar
                                </button>
                            </div>
                        </form>
                    </div>

                    <!-- Courses List Card -->
                    <div class="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/30 p-8">
                        <div class="flex items-center justify-between mb-6">
                            <div>
                                <h2 class="text-xl font-bold text-gray-900">
                                    Cursos Cadastrados
                                </h2>
                                <p class="text-sm text-gray-600">Lista de cursos disponíveis</p>
                            </div>
                            <div class="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                                </svg>
                            </div>
                        </div>

                        <!-- Search and Filter -->
                        <div class="mb-4">
                            <div class="relative">
                                <input type="text" v-model="searchQuery" placeholder="Buscar cursos..."
                                    class="w-full bg-white/70 border-2 border-gray-200 rounded-lg pl-10 pr-4 py-2 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200">
                                <svg class="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                </svg>
                            </div>
                        </div>

                        <!-- Loading State -->
                        <div v-if="loading" class="flex justify-center items-center py-8">
                            <svg class="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        </div>

                        <!-- Courses List -->
                        <div v-else class="space-y-4 max-h-[600px] overflow-y-auto pr-3">
                            <div v-for="course in filteredCourses" :key="course._id" 
                                class="bg-white rounded-lg border border-gray-100 p-6 hover:shadow-md transition-all duration-200">
                                <div class="flex items-start justify-between">
                                    <div class="flex-1 min-w-0">
                                        <h3 class="font-semibold text-gray-900 truncate">{{ course.title }}</h3>
                                        <div class="flex items-center mt-1 space-x-2">
                                            <span class="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">{{ course.code }}</span>
                                            <span class="text-xs text-gray-500">{{ course.periods }} períodos</span>
                                        </div>
                                        <p v-if="course.description" class="text-sm text-gray-600 mt-2 line-clamp-2">
                                            {{ course.description }}
                                        </p>
                                    </div>
                                    <div class="flex space-x-2 ml-4 flex-shrink-0">
                                        <button @click="editCourse(course)" class="p-1 text-gray-400 hover:text-blue-600 transition-colors">
                                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                                            </svg>
                                        </button>
                                        <button @click="deleteCourse(course._id)" class="p-1 text-gray-400 hover:text-red-600 transition-colors">
                                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <!-- Empty State -->
                            <div v-if="filteredCourses.length === 0" class="text-center py-8">
                                <svg class="w-12 h-12 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                                <p class="text-gray-500">Nenhum curso encontrado</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Delete Confirmation Modal -->
        <div v-if="showDeleteModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div class="bg-white rounded-xl shadow-2xl p-6 max-w-md w-full mx-4 transform transition-all">
                <div class="flex items-center justify-center mb-4">
                    <div class="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                        <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                        </svg>
                    </div>
                </div>
                
                <h3 class="text-lg font-semibold text-gray-900 text-center mb-2">
                    Confirmar Exclusão
                </h3>
                
                <p class="text-gray-600 text-center mb-6">
                    Tem certeza que deseja excluir o curso <span class="font-semibold">{{ courseToDelete?.title }}</span>?
                    Esta ação não poderá ser desfeita.
                </p>

                <div class="flex gap-3">
                    <button @click="showDeleteModal = false" 
                        class="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-all duration-200 flex items-center justify-center font-semibold border border-gray-200">
                        Cancelar
                    </button>
                    <button @click="confirmDelete" 
                        class="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-all duration-200 flex items-center justify-center font-semibold"
                        :disabled="loading">
                        <svg v-if="loading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Excluir
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { courseService } from '../services/courseService';

export default {
    name: 'CreateCourse',
    data() {
        return {
            form: {
                title: '',
                code: '',
                description: '',
                periods: 1,
            },
            errors: {
                title: false,
                code: false,
                description: false,
                periods: false
            },
            toastMessage: '',
            showToast: false,
            isError: false,
            searchQuery: '',
            courses: [],
            loading: false,
            editingCourse: null,
            showDeleteModal: false,
            courseToDelete: null
        };
    },
    computed: {
        filteredCourses() {
            if (!this.searchQuery) return this.courses;
            const query = this.searchQuery.toLowerCase();
            return this.courses.filter(course => 
                course.title.toLowerCase().includes(query) ||
                course.code.toLowerCase().includes(query) ||
                course.description.toLowerCase().includes(query)
            );
        }
    },
    async created() {
        await this.loadCourses();
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

        async saveCourse() {
            // Validação
            this.errors = {
                title: !this.form.title,
                code: !this.form.code || this.form.code.length < 2,
                description: !this.form.description,
                periods: !this.form.periods || this.form.periods < 1 || this.form.periods > 12
            };

            if (Object.values(this.errors).some(v => v)) {
                this.showToastMessage('Por favor, corrija os erros no formulário.', true);
                return;
            }

            try {
                this.loading = true;
                if (this.editingCourse) {
                    await courseService.updateCourse(this.editingCourse._id, this.form);
                    this.showToastMessage('Curso atualizado com sucesso!', false);
                } else {
                    await courseService.createCourse(this.form);
                    this.showToastMessage('Curso cadastrado com sucesso!', false);
                }
                await this.loadCourses();
                this.resetForm();
            } catch (error) {
                this.showToastMessage(error.message, true);
            } finally {
                this.loading = false;
            }
        },

        async deleteCourse(id) {
            this.courseToDelete = this.courses.find(course => course._id === id);
            this.showDeleteModal = true;
        },

        async confirmDelete() {
            if (!this.courseToDelete) return;

            try {
                this.loading = true;
                await courseService.deleteCourse(this.courseToDelete._id);
                this.showToastMessage('Curso excluído com sucesso!', false);
                await this.loadCourses();
            } catch (error) {
                this.showToastMessage(error.message, true);
            } finally {
                this.loading = false;
                this.showDeleteModal = false;
                this.courseToDelete = null;
            }
        },

        editCourse(course) {
            this.editingCourse = course;
            this.form = {
                title: course.title,
                code: course.code,
                description: course.description,
                periods: course.periods
            };
            // Scroll para o formulário
            this.$nextTick(() => {
                const formElement = document.querySelector('.form-card');
                if (formElement) {
                    formElement.scrollIntoView({ behavior: 'smooth' });
                }
            });
        },

        showToastMessage(message, isError = false) {
            this.toastMessage = message;
            this.isError = isError;
            this.showToast = true;
            setTimeout(() => this.showToast = false, 3000);
        },

        resetForm() {
            this.form = { title: '', code: '', description: '', periods: 1 };
            this.errors = {};
            this.editingCourse = null;
        }
    }
};
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
input:focus, select:focus, textarea:focus {
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

/* Loading animation */
@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}
.animate-spin {
    animation: spin 1s linear infinite;
}

/* Ajuste para o truncamento de texto */
.truncate {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

/* Modal Animation */
.modal-enter-active,
.modal-leave-active {
    transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
    opacity: 0;
}

.modal-enter-active .modal-content,
.modal-leave-active .modal-content {
    transition: transform 0.3s ease;
}

.modal-enter-from .modal-content,
.modal-leave-to .modal-content {
    transform: scale(0.95);
}
</style>