<template>
    <main class="login-page bg-light-gray">
        <div class="row all">
            <div class="col-6 text">
                <h1>Ocerall</h1>
                <p>Toutes les notes de frais de votre organisation, au même endroit</p>
            </div>
            <div class="col-5 container ms-4">
                <form class="login-form" @submit.prevent="login">
                    <h2>Connectez-vous !</h2>
                    <p class="instruction">Renseignez vos informations</p>
                    <input 
                        type="text" 
                        placeholder="Email"
                        v-model="email"
                        class="input-field" />
                    <input 
                        type="password" 
                        placeholder="Mot de passe" 
                        v-model="password"
                        class="input-field" />
                    <div class="forgot-password">
                        <a href="#">Mot de passe oublié</a>
                    </div>
                    <input 
                        type="submit" 
                        value="Se connecter" 
                        class="login-button" />
                </form>
            </div>
        </div>
    </main>
</template>
  
  <script setup>
  import { ref } from 'vue';
  import { useAuthStore } from '@/stores/useAuthStore';
  
  const authStore = useAuthStore();
  const email = ref('');
  const password = ref('');
  
  const login = () => {
    authStore.login(email.value, password.value);
  };
  </script>
  
  <style scoped>
  .login-page {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #f8f9fa;
  }
  
  .container {
    display: flex;
    align-items: center;
    background-color: white;
    padding: 2rem;
    border-radius: 8px;
    border: 1px solid rgb(214, 214, 214);  }
  
  .text {
    margin-right: 2rem;
    max-width: 600px;
  }
  
  .text h1 {
    font-size: 56px;
    margin: 0;
  }
  
  .text p {
    margin-top: 1rem;
    font-weight: bold;
  }
  
  .login-form {
    display: flex;
    flex-direction: column;
    width: 300px;
  }
  
  .login-form h2 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }
  
  .instruction {
    color: #6c757d;
    margin-bottom: 1rem;
  }
  
  .input-field {
    width: 100%;
    padding: 0.75rem;
    margin-bottom: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
  }
  
  .forgot-password {
    text-align: right;
    margin-bottom: 1rem;
  }
  
  .forgot-password a {
    color: #007bff;
    font-size: 0.9rem;
    text-decoration: none;
  }
  
  .login-button {
    background-color: #5db7de;
    color: white;
    border: none;
    padding: 0.75rem;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .login-button:hover {
    background-color: #47a5d4;
  }

  .bg-light-gray {
    background-color: #f8F9fa; 
  }
  </style>
  