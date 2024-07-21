<template>
	<div class="form-group">
		<label :for="id">{{ label }}</label>
		<div v-if="type === 'password'" class="password-wrapper">
			<input :id="id" :type="showPassword ? 'text' : 'password'" :placeholder="placeholder" v-model="inputValue" @input="validate" @blur="validate" :class="{ 'is-invalid': error }" />
			<button type="button" @click="togglePasswordVisibility" class="toggle-password">
				{{ showPassword ? '👁️' : '👁️‍🗨️' }}
			</button>
		</div>
		<div v-else-if="type === 'date'">
			<input :id="id" type="date" :placeholder="placeholder" v-model="inputValue" @input="validate" @blur="validate" @focus="showDatepicker" :class="{ 'is-invalid': error }" />
		</div>
		<div v-else>
			<input :id="id" :type="type" :placeholder="placeholder" v-model="inputValue" @input="handleInput" @blur="validate" :class="{ 'is-invalid': error }" />
		</div>
		<div v-if="error" class="invalid-feedback">{{ error }}</div>
	</div>
</template>

<script setup>
import { ref, watch } from 'vue'

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
const showPassword = ref(false)

watch(inputValue, newValue => {
	emit('update:modelValue', newValue)
	validate()
})

watch(
	() => props.value,
	newValue => {
		inputValue.value = newValue
	},
)

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
	} else if (props.id === 'password' && !isValidPassword(inputValue.value)) {
		error.value = 'A senha deve ter no mínimo 6 caracteres, incluindo uma letra maiúscula e uma minúscula.'
	} else if (props.id === 'name' && !isValidName(inputValue.value)) {
		error.value = 'O nome deve conter apenas letras.'
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

const isValidPassword = password => {
	const re = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/
	return re.test(password)
}

const isValidName = name => {
	const re = /^[A-Za-zÀ-ÖØ-öø-ÿ]+$/
	return re.test(name)
}

const togglePasswordVisibility = () => {
	showPassword.value = !showPassword.value
}

const showDatepicker = event => {
	event.target.showPicker()
}

const handleInput = event => {
	let value = event.target.value

	if (props.id === 'cpf') {
		value = formatCPF(value)
	} else if (props.id === 'cnpj') {
		value = formatCNPJ(value)
	} else if (props.id === 'phone') {
		value = formatPhone(value)
	} else if (props.id === 'name') {
		value = formatName(value)
	}

	inputValue.value = value
}

const formatCPF = value => {
	value = value.replace(/\D/g, '')
	value = value.slice(0, 11)
	if (value.length > 9) {
		value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
	} else if (value.length > 6) {
		value = value.replace(/(\d{3})(\d{3})(\d{3})/, '$1.$2.$3')
	} else if (value.length > 3) {
		value = value.replace(/(\d{3})(\d{3})/, '$1.$2')
	} else if (value.length > 0) {
		value = value.replace(/(\d{3})/, '$1')
	}
	return value
}

const formatCNPJ = value => {
	value = value.replace(/\D/g, '')
	value = value.slice(0, 14)
	if (value.length > 12) {
		value = value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5')
	} else if (value.length > 8) {
		value = value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})/, '$1.$2.$3/$4')
	} else if (value.length > 5) {
		value = value.replace(/(\d{2})(\d{3})(\d{3})/, '$1.$2.$3')
	} else if (value.length > 2) {
		value = value.replace(/(\d{2})(\d{3})/, '$1.$2')
	} else if (value.length > 0) {
		value = value.replace(/(\d{2})/, '$1')
	}
	return value
}

const formatPhone = value => {
	value = value.replace(/\D/g, '')
	value = value.slice(0, 11)
	if (value.length > 10) {
		value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
	} else if (value.length > 6) {
		value = value.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3')
	} else if (value.length > 2) {
		value = value.replace(/(\d{2})(\d{4})/, '($1) $2')
	} else if (value.length > 0) {
		value = value.replace(/(\d{2})/, '($1')
	}
	return value
}

const formatName = value => {
	value = value.replace(/[^A-Za-zÀ-ÖØ-öø-ÿ]/g, '')
	return value
}
</script>

<style scoped lang="scss">
.form-group {
	margin-bottom: 1.3rem;

	label {
		display: block;
		margin-bottom: 0.5rem;
		font-weight: bold;
	}

	.password-wrapper {
		position: relative;
		display: flex;
		align-items: center;

		input {
			width: 100%;
			padding-right: 2.5rem;
		}

		.toggle-password {
			position: absolute;
			right: 0.5rem;
			background: none;
			border: none;
			cursor: pointer;
			font-size: 1.2rem;
			color: #666;
		}
	}

	input {
		width: 96%;
		max-width: 500px;
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
