<template>
	<div class="registration-form">
		<div class="form">
			<Notification v-if="notification.visible" :message="notification.message" :type="notification.type" />
			<Step :isVisible="currentStep === 1" :stepNumber="1" title="Seja Bem-vindo(a)" :showNext="true" @next="nextStep">
				<FInput v-model="formData.email" type="email" placeholder="Digite aqui seu e-mail" label="Endereço de e-mail" required @validation="updateError('email', $event)" />
				<FRadioButton v-model="formData.userType" :userType="userTypeOptions" />
			</Step>

			<Step :isVisible="currentStep === 2" :stepNumber="2" :title="stepTitle" :showPrev="true" :showNext="true" @prev="prevStep" @next="nextStep">
				<template v-if="isPF">
					<UserFields :formData="formData" @update:formData="updateFormData" />
				</template>
				<template v-if="isPJ">
					<CompanyFields :formData="formData" @update:formData="updateFormData" />
				</template>
			</Step>

			<Step :isVisible="currentStep === 3" :stepNumber="3" title="Senha de acesso" :showPrev="true" :showNext="true" @prev="prevStep" @next="nextStep">
				<FInput v-model="formData.password" type="password" placeholder="Digite sua senha" label="Sua senha" required @validation="updateError('password', $event)" />
			</Step>

			<Step :isVisible="currentStep === 4" :stepNumber="4" title="Revise suas informações" :showPrev="true" :showNext="true" @prev="prevStep" @next="handleSubmit">
				<FInput v-model:value="formData.email" type="email" placeholder="Digite aqui seu e-mail" label="Endereço de e-mail" required @validation="updateError('email', $event)" />
				<template v-if="isPF">
					<UserFields :formData="formData" @update:formData="updateFormData" />
				</template>
				<template v-if="isPJ">
					<CompanyFields :formData="formData" @update:formData="updateFormData" />
				</template>
				<FInput v-model:value="formData.password" type="password" placeholder="Digite sua senha" label="Sua senha" required @validation="updateError('password', $event)" />
			</Step>
		</div>
	</div>
</template>

<script setup>
import { ref, computed } from 'vue'
import Step from '@/components/Step.vue'
import FInput from '@/components/form/Input.vue'
import FRadioButton from '@/components/form/RadioButton.vue'
import UserFields from '@/components/form/UserFields.vue'
import CompanyFields from '@/components/form/CompanyFields.vue'
import Notification from '@/components/Notification.vue'
import { apiService } from '@/services/apiService.js'

const currentStep = ref(1)
const formData = ref({
	email: '',
	userType: '',
	name: '',
	cpf: '',
	birthDate: '',
	phone: '',
	companyName: '',
	cnpj: '',
	openingDate: '',
	password: '',
})

const userTypeOptions = ref([
	{ label: 'Pessoa Física', value: 'PF' },
	{ label: 'Pessoa Jurídica', value: 'PJ' },
])

const notification = ref({
	message: '',
	type: 'error',
	visible: false,
})

const showNotification = (message, type = 'error') => {
	notification.value.message = message
	notification.value.type = type
	notification.value.visible = true
	setTimeout(() => {
		notification.value.visible = false
	}, 3000)
}

const errors = ref({
	email: null,
	password: null,
})

const updateError = (field, error) => {
	errors.value[field] = error
}

const validateStep = () => {
	switch (currentStep.value) {
		case 1:
			return validateStepOne()
		case 2:
			return validateStepTwo()
		case 3:
			return validateStepThree()
		default:
			return true
	}
}

const validateStepOne = () => {
	if (!isEmailValid()) {
		showNotification('O campo de e-mail é obrigatório e deve ser válido.')
		return false
	}
	if (!isUserTypeSelected()) {
		showNotification('Selecione o tipo de usuário (Pessoa Física ou Pessoa Jurídica).')
		return false
	}
	return true
}

const validateStepTwo = () => {
	if (isUserTypePF() && !isPFDataValid()) {
		showNotification('Os campos Nome e CPF são obrigatórios para Pessoa Física.')
		return false
	}
	if (isUserTypePJ() && !isPJDataValid()) {
		showNotification('Os campos Nome da Empresa e CNPJ são obrigatórios para Pessoa Jurídica.')
		return false
	}
	return true
}

const validateStepThree = () => {
	if (!isPasswordValid()) {
		showNotification('O campo de senha é obrigatório e deve estar correto.')
		return false
	}
	return true
}

const isEmailValid = () => {
	return formData.value.email && !errors.value.email
}

const isUserTypeSelected = () => {
	return formData.value.userType
}

const isUserTypePF = () => {
	return formData.value.userType === 'PF'
}

const isUserTypePJ = () => {
	return formData.value.userType === 'PJ'
}

const isPFDataValid = () => {
	return formData.value.name && formData.value.cpf
}

const isPJDataValid = () => {
	return formData.value.companyName && formData.value.cnpj
}

const isPasswordValid = () => {
	return formData.value.password && !errors.value.password
}

const nextStep = () => {
	if (validateStep()) {
		currentStep.value++
	}
}

const prevStep = () => {
	currentStep.value--
}

const handleSubmit = async () => {
	if (validateStep()) {
		let userData = { ...formData.value }

		if (formData.value.userType === 'PF') {
			delete userData.companyName
			delete userData.cnpj
			delete userData.openingDate
		} else if (formData.value.userType === 'PJ') {
			delete userData.name
			delete userData.cpf
			delete userData.birthDate
		}

		try {
			const result = await apiService.registerUser(userData)
			console.log(result)

			currentStep.value = 1
			formData.value = {
				email: '',
				userType: '',
				name: '',
				cpf: '',
				birthDate: '',
				phone: '',
				companyName: '',
				cnpj: '',
				openingDate: '',
				password: '',
			}
			showNotification('Cadastro realizado com sucesso!', 'success')
		} catch (error) {
			console.error('Error during registration:', error)
			showNotification('Erro ao realizar o cadastro. Tente novamente.', 'error')
		}
	}
}

const updateFormData = newData => {
	formData.value = { ...formData.value, ...newData }
}

const isPF = computed(() => formData.value.userType === 'PF')
const isPJ = computed(() => formData.value.userType === 'PJ')
const stepTitle = computed(() => (formData.value.userType === 'PF' ? 'Pessoa Física' : 'Pessoa Jurídica'))
</script>

<style scoped lang="scss">
@import '@/assets/styles/_variables.scss';
.registration-form {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 800px;
	.form {
		margin-top: 15%;
		width: 100%;
		max-width: 500px;
	}
}
.step {
	max-width: 100%;
	width: 100%;
	margin: 0 auto;
	padding: 25px 15px;
	border-radius: 10px;
	box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;

	.count {
		font-size: 14px;

		span {
			font-weight: bold;
			color: $orange;
		}
	}

	h1 {
		margin-top: 10px;
	}

	.form-container {
		display: grid;
		grid-template-columns: 1fr;
		gap: 10px;
	}
}
</style>
