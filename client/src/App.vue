<!-- Adicione isto no <head> do seu arquivo HTML principal -->

<script setup lang="ts">
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { ref, watch } from 'vue'

const route = useRoute()
const isSidebarOpen = ref(true)

watch(() => route.path, () => {
  if (window.innerWidth < 768) {
    isSidebarOpen.value = false
  }
})
</script>

<template>
  <div class="flex min-h-screen sidebar-gradient font-sans">
    <!-- Botão Menu Mobile -->
    <button @click="isSidebarOpen = !isSidebarOpen"
      class="md:hidden fixed top-4 right-4 z-50 p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg transition-colors">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/>
      </svg>
    </button>

    <!-- Sidebar -->
    <aside :class="[
      'flex flex-col h-screen fixed md:relative transform transition-all duration-300 z-40',
      isSidebarOpen ? 'translate-x-0 w-72' : '-translate-x-full md:translate-x-0 md:w-20'
    ]">
      <!-- Header da Sidebar -->
      <div class="p-6 border-b border-blue-400/30 transition-opacity duration-300" 
           :class="{ 'opacity-0 md:opacity-100': !isSidebarOpen }">
        <h1 class="text-white text-xl font-semibold whitespace-nowrap tracking-tight">Dashboard</h1>
        <p class="text-blue-100 text-sm mt-1 font-medium opacity-80">Bem-vindo ao painel</p>
      </div>

      <!-- Navegação Principal -->
      <nav class="flex-1 px-4 py-2 space-y-1">
        <RouterLink 
          v-for="link in [
            { to: '/', name: 'Home', icon: 'M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25' },
            { to: '/editclass', name: 'Editar Turma', icon: 'M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10' },
            { to: '/listadealunos', name: 'Listagem de Alunos', icon: 'M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z' }
          ]" 
          :key="link.to" 
          :to="link.to"
          class="flex items-center p-3 rounded-xl transition-all duration-200 group relative" 
          :class="{
            'bg-white/20 text-white shadow-sm backdrop-blur-sm': $route.path === link.to,
            'text-blue-100 hover:bg-white/10 hover:text-white': $route.path !== link.to
          }">
          <svg class="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" :d="link.icon"/>
          </svg>
          <span class="ml-3 text-sm font-medium whitespace-nowrap transition-opacity duration-300" 
                :class="{ 'opacity-0 md:opacity-100': !isSidebarOpen }">
            {{ link.name }}
          </span>
          <div v-if="$route.path === link.to" 
               class="absolute right-0 top-1/2 transform -translate-y-1/2 w-1 h-6 bg-white rounded-l-full"/>
        </RouterLink>
      </nav>

      <!-- Links do Footer -->
      <div class="border-t border-blue-400/30 p-4 space-y-2">
        <a href="https://github.com" 
           target="_blank" 
           class="flex items-center p-3 rounded-xl text-blue-100 hover:bg-white/10 hover:text-white transition-all duration-200 group">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"/>
          </svg>
          <span class="ml-3 text-sm font-medium whitespace-nowrap transition-opacity duration-300" 
                :class="{ 'opacity-0 md:opacity-100': !isSidebarOpen }">
            GitHub Repositório
          </span>
        </a>

        <a href="https://docs.example.com" 
           target="_blank" 
           class="flex items-center p-3 rounded-xl text-blue-100 hover:bg-white/10 hover:text-white transition-all duration-200 group">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25M9 16.5v.75m3-3v3M15 12v5.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"/>
          </svg>
          <span class="ml-3 text-sm font-medium whitespace-nowrap transition-opacity duration-300" 
                :class="{ 'opacity-0 md:opacity-100': !isSidebarOpen }">
            Documentation
          </span>
        </a>

        <a href="https://github.com/seuusername" 
           target="_blank" 
           class="flex items-center p-3 rounded-xl text-blue-100 hover:bg-white/10 hover:text-white transition-all duration-200 group">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"/>
          </svg>
          <span class="ml-3 text-sm font-medium whitespace-nowrap transition-opacity duration-300" 
                :class="{ 'opacity-0 md:opacity-100': !isSidebarOpen }">
            Minha Conta
          </span>
        </a>
      </div>
    </aside>

    <!-- Overlay para Mobile -->
    <div v-if="isSidebarOpen" 
         @click="isSidebarOpen = false" 
         class="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30">
    </div>

    <!-- Conteúdo das páginas em si -->
    <div class="flex-1 p-2 transition-all duration-300" 
         :class="{ 'md:ml-20': !isSidebarOpen }">
      <main class="h-full p-8 rounded-3xl bg-white shadow-lg border border-gray-100">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<style scoped>
/* Transições suaves para todos os elementos */
* {
  transition: all 0.2s ease-in-out;
}

/* Scroll suave na sidebar */
aside {
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.3) transparent;
}

aside::-webkit-scrollbar {
  width: 6px;
}

aside::-webkit-scrollbar-track {
  background: transparent;
}

aside::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 3px;
}

aside::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.5);
}

.sidebar-gradient {
  background: linear-gradient(180deg,
      #0575e6 0%,
      #02298a 85%,
      #021b79 100%);
}

/* Efeito hover nos links */
a:hover svg {
  transform: scale(1.1);
}

@media (max-width: 768px) {
  .sidebar-collapsed {
    transform: translateX(-100%);
  }
}
</style>