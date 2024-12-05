<template>
    <Header />
    <div class="about-container">
        <div class="about-card">
            <h1 class="page-title">Sobre</h1>

            <section class="project-details">
                <div class="detail-row">
                    <span class="detail-label">Nome do Projeto:</span>
                    <span class="detail-value">PGG - Gerenciamento de Usuários </span>
                </div>

                <div class="detail-row">
                    <span class="detail-label">Versão:</span>
                    <span class="detail-value">1.0.0</span>
                </div>

                <div class="detail-row">
                    <span class="detail-label">Author:</span>
                    <span class="detail-value">Gabriel Ralusi</span>
                </div>

                <div class="detail-row">
                    <span class="detail-label">Technologies:</span>
                    <span class="detail-value">
                        Vue 3, Nuxt 3, TypeScript
                    </span>
                </div>
            </section>

            <section class="project-description">
                <h2>Descrição do Projeto</h2>
                <p>
                    O User Management System é um aplicativo web abrangente projetado para simplificar o registro, o
                    gerenciamento e o rastreamento de usuários. Este sistema fornece uma interface intuitiva para criar,
                    editar e gerenciar perfis de usuários com validação robusta e verificações de restrições exclusivas.
                </p>
            </section>

            <section class="key-features">
                <h2>Principais recursos</h2>
                <ul>
                    <li>Registro de usuário com validação abrangente</li>
                    <li>Validação de CPF (cadastro de pessoa física brasileira)</li>
                    <li>Verificações de exclusividade de e-mail e nome de usuário</li>
                    <li>Design responsivo para dispositivos móveis e desktop</li>
                    <li>Roteamento do lado do cliente com Nuxt</li>
                </ul>
            </section>

            <section class="contact-info">
                <h2>Contato</h2>
                <div class="contact-links">
                    <a href="mailto:gabrielralusi@gmail.com" class="contact-link">
                        📧 gabrielralusi@gmail.com
                    </a>
                    <a target="_blank" href="https://github.com/sl1taz" class="contact-link">
                        🌐 Portfolio
                    </a>
                    <a target="_blank" href="https://github.com/sl1taz" class="contact-link">
                        🐙 GitHub
                    </a>
                </div>
            </section>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'AboutPage',
    head() {
        return {
            title: 'About - User Management System'
        }
    }
})
</script>

<style scoped>
.about-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: calc(100vh - 100px);
    background-color: #f4f6f7;
    padding: 20px;
}

.about-card {
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    max-width: 700px;
    width: 100%;
    padding: 30px;
    text-align: left;
}

.page-title {
    color: #2c3e50;
    border-bottom: 2px solid #3498db;
    padding-bottom: 10px;
    margin-bottom: 20px;
    font-size: 24px;
}

.project-details {
    background-color: #f9f9f9;
    padding: 15px;
    border-radius: 4px;
    margin-bottom: 20px;
}

.detail-row {
    display: flex;
    margin-bottom: 10px;
    padding: 5px 0;
    border-bottom: 1px solid #ecf0f1;
}

.detail-label {
    font-weight: 600;
    color: #34495e;
    flex: 1;
}

.detail-value {
    color: #2980b9;
    flex: 2;
}

.project-description p,
.key-features ul,
.contact-info {
    color: #2c3e50;
    line-height: 1.6;
}

.key-features ul {
    padding-left: 20px;
}

.key-features li {
    margin-bottom: 10px;
    color: #34495e;
}

.contact-links {
    display: flex;
    gap: 15px;
    margin-top: 15px;
}

.contact-link {
    text-decoration: none;
    color: #3498db;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: color 0.3s ease;
}

.contact-link:hover {
    color: #2980b9;
}

@media screen and (max-width: 600px) {
    .about-card {
        margin: 0 10px;
        padding: 20px;
    }

    .contact-links {
        flex-direction: column;
    }
}
</style>