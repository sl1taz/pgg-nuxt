<template>
    <header class="app-header">
        <div class="header-container">
            <div class="logo">
                <nuxt-link to="/" class="logo-link">
                    Gerenciamento de Usuários - PGG
                </nuxt-link>
            </div>
            <div class="logo-mobile">
                <nuxt-link to="/" class="logo-link">
                    PGG
                </nuxt-link>
            </div>
            <nav class="main-nav">
                <ul class="nav-list">
                    <li class="nav-item">
                        <nuxt-link to="/about" class="nav-link">
                            <i class="nav-icon">ℹ</i>
                            Sobre
                        </nuxt-link>
                    </li>
                </ul>
            </nav>
        </div>
    </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'



export default defineComponent({
    name: 'AppHeader',
})
</script>

<style scoped>
.app-header {
    background-color: #2c3e50;
    color: white;
    padding: 15px 0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.header-container {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
}

.logo {
    font-size: 24px;
    font-weight: bold;
}

@media (max-width: 481px) {
  .logo {
    display: none; /* ou inline, inline-block, conforme necessário */
  }
  
  .logo-mobile {
    display: block;
  }
}

@media (min-width: 481px) {
  .logo {
    display: block; /* ou inline, inline-block, conforme necessário */
  }
  
  .logo-mobile {
    display: none;
  }
}

.logo-link {
    color: white;
    text-decoration: none;
    transition: color 0.3s ease;
}

.logo-link:hover {
    color: #3498db;
}

.main-nav {
    display: flex;
}

.nav-list {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    gap: 20px;
}

.nav-item {
    position: relative;
}

.nav-link {
    color: white;
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 15px;
    border-radius: 4px;
    transition: background-color 0.3s ease;
}

.nav-link:hover {
    background-color: rgba(255, 255, 255, 0.1);
}

.nav-link.router-link-active {
    background-color: #3498db;
    color: white;
}

.nav-icon {
    margin-right: 5px;
}

/* Responsive adjustments */
@media screen and (max-width: 600px) {
    .header-container {
        flex-direction: column;
        text-align: center;
    }

    .main-nav {
        margin-top: 15px;
    }

    .nav-list {
        flex-direction: column;
        align-items: center;
        gap: 10px;
    }
}
</style>