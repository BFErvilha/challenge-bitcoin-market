<template>
	<div class="container">
		<FInput v-model="formData.email" type="email" placeholder="Digite aqui seu e-mail" label="Endereço de e-mail" required />
		<button class="btn btn-orange w-100" @click="nextStep">Continuar</button>
	</div>
</template>

<script setup>
import FInput from '@/components/form/Input.vue'
import { reactive } from 'vue'

const formData = reactive({
	email: '',
})

const errors = reactive({})

const updateError = (field, error) => {
	if (error) {
		this.$set(errors, field, error)
	} else {
		this.$delete(errors, field)
	}
}
</script>

<style scoped lang="scss"></style>
