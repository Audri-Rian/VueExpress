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
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
          d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
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
        <RouterLink v-for="link in [
          { to: '/', name: 'Home', icon: 'M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25' },
          { to: '/editclass', name: 'Editar Turma', icon: 'M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125' },
          { to: '/createcurse', name: 'Criar Curso', icon: 'M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z' },
          { to: '/listadealunos', name: 'Listagem de Alunos', icon: 'M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z' },
          { to: '/notas', name: 'Modificar Notas', icon: 'M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75' },
          { to: '/frequencia', name: 'Alterar Frequência', icon: 'M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z' },
        ]" :key="link.to" :to="link.to"
          class="flex items-center p-3 rounded-xl transition-all duration-200 group relative" :class="{
            'bg-white/20 text-white shadow-sm backdrop-blur-sm': $route.path === link.to,
            'text-blue-100 hover:bg-white/10 hover:text-white': $route.path !== link.to
          }">
          <svg class="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" :d="link.icon" />
          </svg>
          <span class="ml-3 text-sm font-medium whitespace-nowrap transition-opacity duration-300"
            :class="{ 'opacity-0 md:opacity-100': !isSidebarOpen }">
            {{ link.name }}
          </span>
          <div v-if="$route.path === link.to"
            class="absolute right-0 top-1/2 transform -translate-y-1/2 w-1 h-6 bg-white rounded-l-full" />
        </RouterLink>

      </nav>

      <!-- Links do Footer -->
      <div class="border-t border-blue-400/30 p-4 space-y-2">
        <a href="https://github.com" target="_blank"
          class="flex items-center p-3 rounded-xl text-blue-100 hover:bg-white/10 hover:text-white transition-all duration-200 group">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
              d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
          </svg>
          <span class="ml-3 text-sm font-medium whitespace-nowrap transition-opacity duration-300"
            :class="{ 'opacity-0 md:opacity-100': !isSidebarOpen }">
            GitHub Repositório
          </span>
        </a>

        <a href="https://docs.example.com" target="_blank"
          class="flex items-center p-3 rounded-xl text-blue-100 hover:bg-white/10 hover:text-white transition-all duration-200 group">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
              d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25M9 16.5v.75m3-3v3M15 12v5.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
          </svg>
          <span class="ml-3 text-sm font-medium whitespace-nowrap transition-opacity duration-300"
            :class="{ 'opacity-0 md:opacity-100': !isSidebarOpen }">
            Documentation
          </span>
        </a>

        <a href="https://github.com/seuusername" target="_blank"
          class="flex items-center p-3 rounded-xl text-blue-100 hover:bg-white/10 hover:text-white transition-all duration-200 group">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
          </svg>
          <span class="ml-3 text-sm font-medium whitespace-nowrap transition-opacity duration-300"
            :class="{ 'opacity-0 md:opacity-100': !isSidebarOpen }">
            Minha Conta
          </span>
        </a>
      </div>
    </aside>

    <!-- Overlay para Mobile -->
    <div v-if="isSidebarOpen" @click="isSidebarOpen = false"
      class="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30">
    </div>

    <!-- Conteúdo das páginas em si -->
    <div class="flex-1 p-3 transition-all duration-300" :class="{ 'md:ml-20': !isSidebarOpen }">
      <RouterView />
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