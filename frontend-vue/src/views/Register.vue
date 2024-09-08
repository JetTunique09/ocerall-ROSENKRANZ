<!-- <template>
    <h1>Ajouter un administrateur</h1>
    <p><input type="text" placeholder="Email" v-model="email"></p>
    <p><input type="text" placeholder="Password" v-model="password"></p>
    <p><button @click="register">Envoyer</button></p>

</template>

<script setup>
    import { ref } from 'vue';
    import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
    import { useRouter } from 'vue-router';
    const email = ref('');
    const password = ref('');
    const router = useRouter()

    const register = () => {
        const auth = getAuth()
        // API call to register the admin
        // console.log(email.value, password.value);
        createUserWithEmailAndPassword(getAuth(), email.value, password.value)
        .then((data) => {
            console.log("Créer !")
        })
        .catch((error) => {
            console.log("Erreur lors de la création : ", error);
        });
    };
</script> -->