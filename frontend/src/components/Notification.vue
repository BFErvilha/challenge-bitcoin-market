<template>
	<transition name="fade">
		<div v-if="visible" class="notification" :class="type">
			<p>{{ message }}</p>
		</div>
	</transition>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
	message: String,
	type: {
		type: String,
		default: 'error',
	},
})

const visible = ref(true)

const hideNotification = () => {
	visible.value = false
}

setTimeout(hideNotification, 3000)
</script>

<style scoped>
.notification {
	position: fixed;
	top: 20px;
	right: 20px;
	padding: 15px;
	border-radius: 5px;
	box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
	z-index: 1000;
	transition: opacity 0.5s ease-in-out;
}

.notification.error {
	background-color: #f8d7da;
	color: #721c24;
}

.notification.success {
	background-color: #d4edda;
	color: #155724;
}

.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
	opacity: 0;
}
</style>
