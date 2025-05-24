<template>
    <div class="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden min-h-screen">
        <!-- Background decorative elements -->
        <div class="absolute inset-0 overflow-hidden pointer-events-none">
            <div class="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl"></div>
            <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-400/10 rounded-full blur-3xl"></div>
            <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-400/5 rounded-full blur-3xl"></div>
        </div>

        <!-- Toast Notification -->
        <transition name="toast">
            <div v-if="showToast" class="fixed top-6 right-6 z-50">
                <div class="bg-white/90 backdrop-blur-sm border text-green-800 px-6 py-4 rounded-xl shadow-lg flex items-center min-w-[300px]"
                    :class="isError ? 'border-red-200 text-red-800' : 'border-green-200 text-green-800'">
                    <div class="w-8 h-8 rounded-full flex items-center justify-center mr-3"
                        :class="isError ? 'bg-red-100' : 'bg-green-100'">
                        <svg v-if="!isError" class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <svg v-else class="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                    </div>
                    <span class="font-medium">{{ toastMessage }}</span>
                </div>
            </div>
        </transition>

        <div class="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <!-- Header -->
            <div class="text-center mb-12">
                <h1 class="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent mb-4">
                    Cadastro de Curso
                </h1>
                <p class="text-lg text-gray-600 max-w-2xl mx-auto">
                    Sistema completo para cadastrar novos cursos acadêmicos com interface moderna e intuitiva
                </p>
            </div>

            <!-- Stats Cards -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div class="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
                    <div class="flex items-center">
                        <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                            </svg>
                        </div>
                        <div>
                            <p class="text-sm font-medium text-gray-600">Formulário</p>
                            <p class="text-2xl font-bold text-gray-900">Novo Curso</p>
                        </div>
                    </div>
                </div>

                <div class="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
                    <div class="flex items-center">
                        <div class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mr-4">
                            <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                        </div>
                        <div>
                            <p class="text-sm font-medium text-gray-600">Status</p>
                            <p class="text-2xl font-bold text-gray-900">Pronto</p>
                        </div>
                    </div>
                </div>

                <div class="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
                    <div class="flex items-center">
                        <div class="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mr-4">
                            <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                            </svg>
                        </div>
                        <div>
                            <p class="text-sm font-medium text-gray-600">Sistema</p>
                            <p class="text-2xl font-bold text-gray-900">Ativo</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Form Card -->
            <div class="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/30 p-8 hover:shadow-2xl transition-all duration-500">
                <div class="flex items-center justify-between mb-8">
                    <div>
                        <h2 class="text-2xl font-bold text-gray-900 mb-2">
                            Dados do Curso
                        </h2>
                        <p class="text-gray-600">Preencha as informações necessárias para cadastrar um novo curso</p>
                    </div>
                    <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center">
                        <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                        </svg>
                    </div>
                </div>

                <form @submit.prevent="saveCourse" class="grid grid-cols-1 lg:grid-cols-2 gap-6" novalidate>
                    <div class="space-y-2">
                        <label class="block text-sm font-semibold text-gray-700 mb-2">Nome do Curso <span class="text-red-500">*</span></label>
                        <div class="relative">
                            <input ref="nomeInput" v-model="form.nome" type="text" placeholder="Ex: Engenharia de Software"
                                class="w-full bg-white/70 border-2 rounded-xl px-4 py-3 pr-10 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 placeholder-gray-400"
                                :class="{ 'border-red-300 focus:border-red-500 focus:ring-red-500/20': errors.nome, 'border-gray-200': !errors.nome }">
                            <div class="absolute inset-y-0 right-0 flex items-center pr-3">
                                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                                </svg>
                            </div>
                        </div>
                        <p v-if="errors.nome" class="text-red-500 text-sm flex items-center">
                            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            Nome do curso é obrigatório
                        </p>
                    </div>

                    <div class="space-y-2">
                        <label class="block text-sm font-semibold text-gray-700 mb-2">Código do Curso <span class="text-red-500">*</span></label>
                        <div class="relative">
                            <input v-model="form.codigo" type="text" placeholder="Ex: ESW"
                                class="w-full bg-white/70 border-2 rounded-xl px-4 py-3 pr-10 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 placeholder-gray-400"
                                :class="{ 'border-red-300 focus:border-red-500 focus:ring-red-500/20': errors.codigo, 'border-gray-200': !errors.codigo }">
                            <div class="absolute inset-y-0 right-0 flex items-center pr-3">
                                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
                                </svg>
                            </div>
                        </div>
                        <p v-if="errors.codigo" class="text-red-500 text-sm flex items-center">
                            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            {{ errors.codigo }}
                        </p>
                    </div>

                    <div class="space-y-2">
                        <label class="block text-sm font-semibold text-gray-700 mb-2">Duração (semestres) <span class="text-red-500">*</span></label>
                        <div class="relative">
                            <input v-model.number="form.duracao" type="number" min="1" placeholder="Ex: 8"
                                class="w-full bg-white/70 border-2 rounded-xl px-4 py-3 pr-10 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 placeholder-gray-400"
                                :class="{ 'border-red-300 focus:border-red-500 focus:ring-red-500/20': errors.duracao, 'border-gray-200': !errors.duracao }">
                            <div class="absolute inset-y-0 right-0 flex items-center pr-3">
                                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                            </div>
                        </div>
                        <p v-if="errors.duracao" class="text-red-500 text-sm flex items-center">
                            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            Duração em semestres é obrigatória
                        </p>
                    </div>

                    <div class="lg:col-span-2 space-y-2">
                        <label class="block text-sm font-semibold text-gray-700 mb-2">Descrição</label>
                        <div class="relative">
                            <textarea v-model="form.descricao" rows="4" placeholder="Breve descrição do curso..."
                                class="w-full bg-white/70 border-2 rounded-xl px-4 py-3 pr-10 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 placeholder-gray-400 resize-none border-gray-200">
                            </textarea>
                            <div class="absolute top-3 right-0 flex items-start pr-3">
                                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7"></path>
                                </svg>
                            </div>
                        </div>
                        <p class="text-gray-500 text-xs">Campo opcional para informações adicionais sobre o curso</p>
                    </div>

                    <div class="lg:col-span-2 flex flex-col sm:flex-row gap-4 pt-6">
                        <button type="submit" class="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-xl hover:from-green-700 hover:to-emerald-700 
                            transition-all duration-200 flex items-center justify-center font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                                    d="M5 13l4 4L19 7"></path>
                            </svg>
                            Cadastrar Curso
                        </button>
                        <button @click="resetForm" type="button"
                            class="flex-1 bg-gray-100 text-gray-700 px-8 py-4 rounded-xl hover:bg-gray-200 transition-all duration-200 flex items-center justify-center font-semibold border-2 border-gray-200 hover:border-gray-300">
                            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                            </svg>
                            Limpar Formulário
                        </button>
                    </div>
                </form>
            </div>

            <!-- Course Preview Card -->
            <div v-if="hasFormData" class="mt-8 bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/30 p-8 hover:shadow-2xl transition-all duration-500">
                <div class="flex items-center justify-between mb-6">
                    <div>
                        <h2 class="text-2xl font-bold text-gray-900 mb-2">
                            Pré-visualização
                        </h2>
                        <p class="text-gray-600">Confira como ficará o curso cadastrado</p>
                    </div>
                    <div class="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"></path>
                        </svg>
                    </div>
                </div>
                
                <div class="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="space-y-4">
                            <div class="flex items-center">
                                <div class="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                                <span class="font-semibold text-gray-700">Nome:</span>
                                <span class="ml-2 text-gray-900 font-medium">{{ form.nome || 'Não informado' }}</span>
                            </div>
                            <div class="flex items-center">
                                <div class="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                                <span class="font-semibold text-gray-700">Código:</span>
                                <span class="ml-2 text-gray-900 font-medium bg-white px-2 py-1 rounded-lg">{{ form.codigo || 'Não informado' }}</span>
                            </div>
                        </div>
                        <div class="space-y-4">
                            <div class="flex items-center">
                                <div class="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                                <span class="font-semibold text-gray-700">Duração:</span>
                                <span class="ml-2 text-gray-900 font-medium">{{ form.duracao ? form.duracao + ' semestres' : 'Não informado' }}</span>
                            </div>
                        </div>
                        <div v-if="form.descricao" class="md:col-span-2">
                            <div class="flex items-start">
                                <div class="w-2 h-2 bg-amber-500 rounded-full mr-3 mt-2"></div>
                                <div>
                                    <span class="font-semibold text-gray-700 block mb-1">Descrição:</span>
                                    <p class="text-gray-900 bg-white p-3 rounded-lg">{{ form.descricao }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CreateCourse',
    data() {
        return {
            form: {
                nome: '',
                codigo: '',
                descricao: '',
                duracao: null,
            },
            errors: {
                nome: false,
                codigo: false,
                duracao: false,
            },
            toastMessage: '',
            showToast: false,
            isError: false,
        };
    },
    computed: {
        hasFormData() {
            return this.form.nome || this.form.codigo || this.form.descricao || this.form.duracao;
        }
    },
    methods: {
        saveCourse() {
            // Validação
            this.errors = {
                nome: !this.form.nome,
                codigo: !this.form.codigo || this.form.codigo.length < 2,
                duracao: !this.form.duracao || this.form.duracao < 1,
            };

            // Verificar se o código tem pelo menos 2 caracteres
            if (this.form.codigo && this.form.codigo.length < 2) {
                this.errors.codigo = 'O código do curso deve ter ao menos 2 caracteres.';
            } else if (this.form.codigo) {
                this.errors.codigo = false;
            }

            if (Object.values(this.errors).some(v => v)) {
                this.showToastMessage('Por favor, corrija os erros no formulário.', true);
                return;
            }

            try {
                setTimeout(() => {
                    this.showToastMessage('Curso cadastrado com sucesso!', false);
                    this.resetForm();
                }, 500);
            } catch (error) {
                this.showToastMessage('Ocorreu um erro inesperado.', true);
            }
        },
        showToastMessage(message, isError = false) {
            this.toastMessage = message;
            this.isError = isError;
            this.showToast = true;
            setTimeout(() => this.showToast = false, 3000);
        },
        resetForm() {
            this.form = { nome: '', codigo: '', descricao: '', duracao: null };
            this.errors = {};
        }
    }
};
</script>

<style scoped>
/* Toast Animation */
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

/* Custom scrollbar */
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

/* Form focus states */
input:focus, select:focus, textarea:focus {
    box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
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
</style>