import { defineStore } from 'pinia';
import { auth } from '@/firebase-config';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { ref, onMounted } from 'vue';
import router from '@/router';

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null);

  // fonction vérif l'état de l'utilisateur à chaque chargement de l'application
  const checkAuthState = () => {
    onAuthStateChanged(auth, (currentUser) => {
      user.value = currentUser;
      if (currentUser) {
        // si connecté le rediriger vers home
        if (router.currentRoute.value.name === 'login') {
          router.push('/');
        }
      } else {
        // sinon redirige vers login
        router.push('/login');
      }
    });
  };

  // connexion
  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      user.value = userCredential.user;
      router.push('/'); 
    } catch (error) {
      alert('Erreur de connexion : ' + error.message);
    }
  };

  // déconnexion
  const logout = async () => {
    try {
      await signOut(auth);
      user.value = null;
      router.push('/login'); 
    } catch (error) {
      alert('Erreur de déconnexion : ' + error.message);
    }
  };

  // appel checkAuthState lors du chargement du store
  // modifié suite à erreur constaté de chargement de page qui renvoyait vers login sans déconnecter
  onMounted(() => {
    checkAuthState();
  });

  return { user, login, logout, checkAuthState };
});
