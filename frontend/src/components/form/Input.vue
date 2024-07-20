<template>
	<div class="form-group">
		<label :for="id">{{ label }}</label>
		<input :id="id" :type="type" :placeholder="placeholder" v-model="inputValue" @input="validate" @blur="validate" :class="{ 'is-invalid': error }" />
		<div v-if="error" class="invalid-feedback">{{ error }}</div>
	</div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'

const props = defineProps({
	value: [String, Number],
	type: {
		type: String,
		default: 'text',
	},
	placeholder: String,
	label: String,
	id: String,
	required: {
		type: Boolean,
		default: false,
	},
	pattern: String,
})

const emit = defineEmits(['update:modelValue', 'validation'])

const inputValue = ref(props.value)
const error = ref(null)

const validate = () => {
	if (props.required && !inputValue.value) {
		error.value = 'Este campo é obrigatório.'
	} else if (props.type === 'email' && !isValidEmail(inputValue.value)) {
		error.value = 'Formato de email inválido.'
	} else if (props.type === 'tel' && !isValidPhone(inputValue.value)) {
		error.value = 'Formato de telefone inválido.'
	} else if (props.id === 'cpf' && !isValidCPF(inputValue.value)) {
		error.value = 'Formato de CPF inválido.'
	} else if (props.id === 'cnpj' && !isValidCNPJ(inputValue.value)) {
		error.value = 'Formato de CNPJ inválido.'
	} else if (props.pattern && !new RegExp(props.pattern).test(inputValue.value)) {
		error.value = 'Formato inválido.'
	} else {
		error.value = null
	}
	emit('validation', error.value)
}

const isValidEmail = email => {
	const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
	return re.test(email)
}

const isValidPhone = phone => {
	const re = /^\(\d{2}\) \d{4,5}-\d{4}$/
	return re.test(phone)
}

const isValidCPF = cpf => {
	const re = /^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/
	return re.test(cpf)
}

const isValidCNPJ = cnpj => {
	const re = /^\d{2}\.?\d{3}\.?\d{3}\/?\d{4}-?\d{2}$/
	return re.test(cnpj)
}

watch(inputValue, newValue => {
	emit('update:modelValue', newValue)
	validate()
})
</script>

<style lang="scss" scoped>
.form-group {
	margin-bottom: 1rem;

	label {
		display: block;
		margin-bottom: 0.5rem;
		font-weight: bold;
	}

	input {
		width: 100%;
		padding: 0.5rem;
		border: 1px solid #ccc;
		border-radius: 4px;
		font-size: 1rem;

		&.is-invalid {
			border-color: red;
		}
	}

	.invalid-feedback {
		color: red;
		margin-top: 0.25rem;
		font-size: 0.875rem;
	}
}
</style>
