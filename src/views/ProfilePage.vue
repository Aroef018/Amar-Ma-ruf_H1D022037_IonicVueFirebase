<template>
    <ion-page>
        <ion-header :translucent="true">
            <ion-toolbar>
                <ion-title>Profile</ion-title>

                <!-- Logout Button -->
                <ion-button slot="end" fill="clear" @click="logout" style="--color: gray;">
                    <ion-icon slot="end" :icon="exit"></ion-icon>
                    <ion-label>Logout</ion-label>
                </ion-button>
            </ion-toolbar>
        </ion-header>

        <ion-content :fullscreen="true">
            <!-- Avatar -->
            <div id="avatar-container">
                <ion-avatar>
                    <!-- Pastikan untuk mengakses userPhoto.value di sini -->
                    <img alt="Avatar" :src="userPhoto" @error="handleImageError" />
                </ion-avatar>
            </div>

            <!-- Data Profile -->
            <ion-list>
                <ion-item>
                    <ion-input label="Nama" :value="user?.displayName" readonly></ion-input>
                </ion-item>

                <ion-item>
                    <ion-input label="Email" :value="user?.email" readonly></ion-input>
                </ion-item>
            </ion-list>
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonList, IonLabel, IonIcon, IonButton, IonAvatar } from '@ionic/vue';
import { exit } from 'ionicons/icons';
import { computed, ref, watch, onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
const user = computed(() => authStore.user);

// Default avatar URL
const defaultAvatar = 'https://ionicframework.com/docs/img/demos/avatar.svg';
const userPhoto = ref(defaultAvatar); // Initialize with default avatar

// Function to set user photo based on user data
const updateUserPhoto = () => {
    if (user.value?.photoURL) {
        userPhoto.value = user.value.photoURL;  // Update userPhoto if photoURL exists
    } else {
        userPhoto.value = defaultAvatar;  // Set default if photoURL is not available
    }
    console.log("Updated userPhoto:", userPhoto.value); // Debug log to check value
};

// Watch user data changes and update photo
watch(user, (newUser) => {
    console.log("User updated:", newUser);
    updateUserPhoto();
});

// Ensure photo is updated after component is mounted
onMounted(() => {
    updateUserPhoto();
});

// Logout function
const logout = () => {
    authStore.logout();
};

// Error handler for image load failure
function handleImageError() {
    console.log("Gambar gagal dimuat, menggunakan gambar cadangan", userPhoto.value);  // Access userPhoto.value here
    userPhoto.value = defaultAvatar;  // Fallback to default avatar
}
</script>

<style scoped>
#avatar-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px 0;
}

#avatar-icon {
    width: 80px;
    height: 80px;
}
</style>
