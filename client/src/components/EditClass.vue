<script>
export default {
    name: 'EditClass',
    data() {
        return {
            classes: [],
            form: {
                nome: '',
                curso: '',
                periodo: '',
                ano: null,
                turno: '',
            },
            errors: {
                nome: false,
                curso: false,
                periodo: false,
                ano: false,
                turno: false,
            },
            cursos: ['Engenharia', 'Administração', 'Direito', 'Medicina'],
            periodos: ['1º semestre', '2º semestre', '3º semestre', '4º semestre', 'Anual'],
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
        filteredClasses() {
            const term = this.search.toLowerCase();
            return this.classes.filter(t =>
                t.nome.toLowerCase().includes(term) ||
                t.curso.toLowerCase().includes(term)
            );
        },
        currentYear() {
            return new Date().getFullYear();
        }
    },
    methods: {
        saveClass() {
            // Validação
            this.errors = {
                nome: !this.form.nome,
                curso: !this.form.curso,
                periodo: !this.form.periodo,
                ano: !this.form.ano || this.form.ano < 2000 || this.form.ano > this.currentYear + 5,
                turno: !this.form.turno,
            };

            if (Object.values(this.errors).some(v => v)) return;

            if (this.isEditing) {
                this.classes.splice(this.editingIndex, 1, { ...this.form });
                this.showToastMessage('Turma atualizada com sucesso!');
            } else {
                this.classes.push({ ...this.form });
                this.showToastMessage('Turma criada com sucesso!');
            }
            this.resetForm();
        },
        editClass(idx) {
            this.isEditing = true;
            this.editingIndex = idx;
            this.form = { ...this.classes[idx] };
            this.$nextTick(() => this.$refs.nomeInput.focus());
            window.scrollTo({ top: 0, behavior: 'smooth' });
        },
        deleteClass(idx) {
            this.deletingIndex = idx;
            this.showDeleteModal = true;
        },
        confirmDelete() {
            this.classes.splice(this.deletingIndex, 1);
            this.showDeleteModal = false;
            this.showToastMessage('Turma excluída com sucesso!');
        },
        viewClass(turma) {
            this.currentView = turma;
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
            this.form = { nome: '', curso: '', periodo: '', ano: null, turno: '' };
            this.errors = {};
            this.isEditing = false;
            this.editingIndex = null;
        }
    }
};
</script>

<template>
    <div class="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
        <!-- Background decorative elements -->
        <div class="absolute inset-0 overflow-hidden pointer-events-none">
            <div class="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl"></div>
            <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-400/10 rounded-full blur-3xl"></div>
            <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-400/5 rounded-full blur-3xl"></div>
        </div>

        <!-- Toast Notification -->
        <transition name="toast">
            <div v-if="showToast" class="fixed right-6 z-50">
                <div class="bg-white/90 backdrop-blur-sm border border-green-200 text-green-800 px-6 py-4 rounded-xl shadow-lg flex items-center min-w-[300px]">
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
                <h1 class="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent mb-4">
                    Gestão de Turmas
                </h1>
                <p class="text-lg text-gray-600 max-w-2xl mx-auto">
                    Sistema completo para gerenciar turmas acadêmicas com interface moderna e intuitiva
                </p>
            </div>

            <!-- Stats Cards -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div class="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
                    <div class="flex items-center">
                        <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
                            </svg>
                        </div>
                        <div>
                            <p class="text-sm font-medium text-gray-600">Total de Turmas</p>
                            <p class="text-2xl font-bold text-gray-900">{{ classes.length }}</p>
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
                            <p class="text-sm font-medium text-gray-600">Turmas Ativas</p>
                            <p class="text-2xl font-bold text-gray-900">{{ filteredClasses.length }}</p>
                        </div>
                    </div>
                </div>

                <div class="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
                    <div class="flex items-center">
                        <div class="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mr-4">
                            <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
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
            <div class="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/30 p-8 mb-8 hover:shadow-2xl transition-all duration-500">
                <div class="flex items-center justify-between mb-8">
                    <div>
                        <h2 class="text-2xl font-bold text-gray-900 mb-2">
                            {{ isEditing ? 'Editar Turma' : 'Nova Turma' }}
                        </h2>
                        <p class="text-gray-600">{{ isEditing ? 'Atualize os dados da turma selecionada' : 'Preencha os campos para criar uma nova turma' }}</p>
                    </div>
                    <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center">
                        <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                        </svg>
                    </div>
                </div>

                <form @submit.prevent="saveClass" class="grid grid-cols-1 lg:grid-cols-2 gap-6" novalidate>
                    <div class="space-y-2">
                        <label class="block text-sm font-semibold text-gray-700 mb-2">Nome da Turma</label>
                        <div class="relative">
                            <input ref="nomeInput" v-model="form.nome" type="text" placeholder="Ex: Turma A, Turma Manhã..."
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
                            Nome da turma é obrigatório
                        </p>
                    </div>

                    <div class="space-y-2">
                        <label class="block text-sm font-semibold text-gray-700 mb-2">Curso</label>
                        <div class="relative">
                            <select v-model="form.curso" class="w-full bg-white/70 border-2 rounded-xl px-4 py-3 pr-10 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 appearance-none"
                                :class="{ 'border-red-300 focus:border-red-500 focus:ring-red-500/20': errors.curso, 'border-gray-200': !errors.curso }">
                                <option value="">Selecione um curso</option>
                                <option v-for="curso in cursos" :key="curso">{{ curso }}</option>
                            </select>
                            <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </div>
                        </div>
                        <p v-if="errors.curso" class="text-red-500 text-sm flex items-center">
                            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            Selecione um curso
                        </p>
                    </div>

                    <div class="space-y-2">
                        <label class="block text-sm font-semibold text-gray-700 mb-2">Período</label>
                        <div class="relative">
                            <select v-model="form.periodo" class="w-full bg-white/70 border-2 rounded-xl px-4 py-3 pr-10 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 appearance-none"
                                :class="{ 'border-red-300 focus:border-red-500 focus:ring-red-500/20': errors.periodo, 'border-gray-200': !errors.periodo }">
                                <option value="">Selecione o período</option>
                                <option v-for="periodo in periodos" :key="periodo">{{ periodo }}</option>
                            </select>
                            <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </div>
                        </div>
                        <p v-if="errors.periodo" class="text-red-500 text-sm flex items-center">
                            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            Selecione um período
                        </p>
                    </div>

                    <div class="space-y-2">
                        <label class="block text-sm font-semibold text-gray-700 mb-2">Ano Letivo</label>
                        <div class="relative">
                            <input v-model.number="form.ano" type="number" :min="2000" :max="currentYear + 5" 
                                placeholder="2025" class="w-full bg-white/70 border-2 rounded-xl px-4 py-3 pr-10 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 placeholder-gray-400"
                                :class="{ 'border-red-300 focus:border-red-500 focus:ring-red-500/20': errors.ano, 'border-gray-200': !errors.ano }">
                            <div class="absolute inset-y-0 right-0 flex items-center pr-3">
                                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4h.938l1.687 7.875H15v1a1 1 0 01-1 1H10a1 1 0 01-1-1v-1H7.375L9.062 7H8z"></path>
                                </svg>
                            </div>
                        </div>
                        <p v-if="errors.ano" class="text-red-500 text-sm flex items-center">
                            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            Ano deve estar entre 2000 e {{ currentYear + 5 }}
                        </p>
                    </div>

                    <div class="space-y-2">
                        <label class="block text-sm font-semibold text-gray-700 mb-2">Turno</label>
                        <div class="relative">
                            <select v-model="form.turno" class="w-full bg-white/70 border-2 rounded-xl px-4 py-3 pr-10 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 appearance-none"
                                :class="{ 'border-red-300 focus:border-red-500 focus:ring-red-500/20': errors.turno, 'border-gray-200': !errors.turno }">
                                <option value="">Selecione o turno</option>
                                <option>Matutino</option>
                                <option>Vespertino</option>
                                <option>Noturno</option>
                            </select>
                            <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </div>
                        </div>
                        <p v-if="errors.turno" class="text-red-500 text-sm flex items-center">
                            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            Selecione um turno
                        </p>
                    </div>

                    <div class="lg:col-span-2 flex flex-col sm:flex-row gap-4 pt-6">
                        <button type="submit" class="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl hover:from-blue-700 hover:to-indigo-700 
                            transition-all duration-200 flex items-center justify-center font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                                    d="M5 13l4 4L19 7"></path>
                            </svg>
                            {{ isEditing ? 'Atualizar Turma' : 'Criar Turma' }}
                        </button>
                        <button v-if="isEditing" @click="resetForm" type="button"
                            class="flex-1 bg-gray-100 text-gray-700 px-8 py-4 rounded-xl hover:bg-gray-200 transition-all duration-200 flex items-center justify-center font-semibold border-2 border-gray-200 hover:border-gray-300">
                            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>

            <!-- Search and Table Card -->
            <div class="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/30 p-8 hover:shadow-2xl transition-all duration-500">
                <div class="flex flex-col lg:flex-row lg:items-center justify-between mb-8">
                    <div>
                        <h2 class="text-2xl font-bold text-gray-900 mb-2">Turmas Cadastradas</h2>
                        <p class="text-gray-600">Gerencie todas as turmas do sistema</p>
                    </div>
                    <div class="mt-4 lg:mt-0 relative">
                        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                            </svg>
                        </div>
                        <input v-model="search" type="text" placeholder="Buscar turmas..." 
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
                                    <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Curso</th>
                                    <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Período</th>
                                    <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Ano</th>
                                    <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Turno</th>
                                    <th class="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">Ações</th>
                                </tr>
                            </thead>
                            <tbody class="bg-white/50 divide-y divide-gray-200">
                                <tr v-for="(turma, idx) in filteredClasses" :key="idx" 
                                    class="hover:bg-blue-50/50 transition-all duration-200 group">
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        <span class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                                            {{ idx + 1 }}
                                        </span>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div class="text-sm font-medium text-gray-900">{{ turma.nome }}</div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <span class="inline-flex px-3 py-1 text-xs font-semibold rounded-full bg-indigo-100 text-indigo-800">
                                            {{ turma.curso }}
                                        </span>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ turma.periodo }}</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ turma.ano }}</td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <span class="inline-flex px-2 py-1 text-xs font-medium rounded-md"
                                            :class="{
                                                'bg-yellow-100 text-yellow-800': turma.turno === 'Matutino',
                                                'bg-orange-100 text-orange-800': turma.turno === 'Vespertino',
                                                'bg-purple-100 text-purple-800': turma.turno === 'Noturno'
                                            }">
                                            {{ turma.turno }}
                                        </span>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div class="flex justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                            <button @click="viewClass(turma)" 
                                                class="w-8 h-8 flex items-center justify-center text-blue-600 hover:text-blue-700 hover:bg-blue-100 rounded-lg transition-all duration-200">
                                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                                                        d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"></path>
                                                </svg>
                                            </button>
                                            <button @click="editClass(idx)" 
                                                class="w-8 h-8 flex items-center justify-center text-amber-600 hover:text-amber-700 hover:bg-amber-100 rounded-lg transition-all duration-200">
                                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                                                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                                                </svg>
                                            </button>
                                            <button @click="deleteClass(idx)" 
                                                class="w-8 h-8 flex items-center justify-center text-red-600 hover:text-red-700 hover:bg-red-100 rounded-lg transition-all duration-200">
                                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                                </svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                                <tr v-if="filteredClasses.length === 0">
                                    <td colspan="7" class="px-6 py-12 text-center">
                                        <div class="flex flex-col items-center justify-center text-gray-400">
                                            <div class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                                <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                                                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                                                </svg>
                                            </div>
                                            <h3 class="text-lg font-semibold text-gray-600 mb-2">Nenhuma turma encontrada</h3>
                                            <p class="text-gray-500">{{ search ? 'Tente ajustar sua busca' : 'Comece criando sua primeira turma' }}</p>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal de Detalhes -->
        <transition name="modal">
            <div v-if="showModal" class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                <div class="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl w-full max-w-md border border-white/30 transform scale-100 transition-all duration-300">
                    <div class="flex justify-between items-center p-8 border-b border-gray-200">
                        <div class="flex items-center">
                            <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                                <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"></path>
                                </svg>
                            </div>
                            <div>
                                <h3 class="text-xl font-bold text-gray-900">Detalhes da Turma</h3>
                                <p class="text-gray-600 text-sm">Informações completas</p>
                            </div>
                        </div>
                        <button @click="closeModal" class="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-all duration-200">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                    </div>
                    <div class="p-8 space-y-6">
                        <div v-for="(value, key) in currentView" :key="key" class="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                            <div class="flex items-center">
                                <div class="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                                <span class="font-semibold text-gray-700 capitalize">{{ key.replace('_', ' ') }}:</span>
                            </div>
                            <span class="text-gray-900 font-medium bg-gray-50 px-3 py-1 rounded-lg">{{ value || '-' }}</span>
                        </div>
                    </div>
                    <div class="p-8 border-t border-gray-200 flex justify-end">
                        <button @click="closeModal" 
                            class="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-semibold shadow-lg">
                            Fechar
                        </button>
                    </div>
                </div>
            </div>
        </transition>

        <!-- Modal de Confirmação de Exclusão -->
        <transition name="modal">
            <div v-if="showDeleteModal" class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                <div class="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl w-full max-w-md border border-white/30 transform scale-100 transition-all duration-300">
                    <div class="p-8 border-b border-gray-200">
                        <div class="flex items-center">
                            <div class="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mr-4">
                                <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                                </svg>
                            </div>
                            <div>
                                <h3 class="text-xl font-bold text-red-600">Confirmar Exclusão</h3>
                                <p class="text-gray-600 text-sm">Esta ação não pode ser desfeita</p>
                            </div>
                        </div>
                    </div>
                    <div class="p-8">
                        <p class="text-gray-700 mb-6 text-center">Tem certeza que deseja excluir esta turma permanentemente?</p>
                        <div class="flex flex-col sm:flex-row gap-3">
                            <button @click="showDeleteModal = false" 
                                class="flex-1 px-6 py-3 text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-all duration-200 font-semibold border-2 border-gray-200 hover:border-gray-300">
                                Cancelar
                            </button>
                            <button @click="confirmDelete" 
                                class="flex-1 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl hover:from-red-700 hover:to-red-800 transition-all duration-200 font-semibold shadow-lg">
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

/* Modal Animation */
.modal-enter-active, .modal-leave-active {
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}
.modal-enter-from, .modal-leave-to {
    opacity: 0;
}
.modal-enter-from .bg-white, .modal-leave-to .bg-white {
    transform: scale(0.8) translateY(20px);
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
input:focus, select:focus {
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

/* Loading states */
.loading {
    position: relative;
}

.loading::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 20px;
    height: 20px;
    margin: -10px 0 0 -10px;
    border: 2px solid #f3f3f3;
    border-top: 2px solid #3498db;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
</style>