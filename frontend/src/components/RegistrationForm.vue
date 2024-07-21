<template>
	<div class="registration-form">
		<div class="form">
			<Step :isVisible="currentStep === 1" :stepNumber="1" title="Seja Bem-vindo(a)" :showNext="true" @next="nextStep">
				<FInput v-model="formData.email" type="email" placeholder="Digite aqui seu e-mail" label="Endereço de e-mail" required />
				<FRadioButton v-model="formData.userType" :userType="userTypeOptions" />
			</Step>

			<Step :isVisible="currentStep === 2" :stepNumber="2" :title="formData.userType === 'PF' ? 'Pessoa Física' : 'Pessoa Juridica'" :showPrev="true" :showNext="true" @prev="prevStep" @next="nextStep">
				<template v-if="isPF">
					<UserFields :formData="formData" @update:formData="updateFormData" />
				</template>
				<template v-if="isPJ">
					<CompanyFields :formData="formData" @update:formData="updateFormData" />
				</template>
			</Step>

			<Step :isVisible="currentStep === 3" :stepNumber="3" title="Senha de acesso" :showPrev="true" :showNext="true" @prev="prevStep" @next="nextStep">
				<FInput v-model="formData.password" type="password" placeholder="Digite sua senha" label="Sua senha" required />
			</Step>

			<Step :isVisible="currentStep === 4" :stepNumber="4" title="Revise suas informações" :showPrev="true" :showNext="true" @prev="prevStep" @next="nextStep">
				<FInput v-model="formData.email" type="email" placeholder="Digite aqui seu e-mail" label="Endereço de e-mail" required />
				<template v-if="isPF">
					<UserFields :formData="formData" @update:formData="updateFormData" />
				</template>
				<template v-if="isPJ">
					<CompanyFields :formData="formData" @update:formData="updateFormData" />
				</template>
				<FInput v-model="formData.password" type="password" placeholder="Digite sua senha" label="Sua senha" required />
			</Step>
		</div>
	</div>
</template>

<script setup>
import { ref, computed } from 'vue'
import Step from '@/components/Step.vue'
import UserFields from '@/components/form/UserFields.vue'
import CompanyFields from '@/components/form/CompanyFields.vue'
import FInput from '@/components/form/Input.vue'
import FRadioButton from '@/components/form/RadioButton.vue'

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
	{ label: 'Pessoa Juridica', value: 'PJ' },
])

const nextStep = () => {
	currentStep.value++
}

const prevStep = () => {
	currentStep.value--
}

const handleSubmit = async () => {
	const userData = formData.value

	const response = await fetch('/api/registration', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(userData),
	})

	const result = await response.json()
	console.log(result)
}

const isPF = computed(() => formData.value.userType === 'PF')
const isPJ = computed(() => formData.value.userType === 'PJ')

const updateFormData = newData => {
	if (formData.value.userType === 'PF') {
		const { name, cpf, birthDate, phone } = newData
		Object.assign(formData.value, { name, cpf, birthDate, phone })
	} else if (formData.value.userType === 'PJ') {
		const { phone, companyName, cnpj, openingDate } = newData
		Object.assign(formData.value, { phone, companyName, cnpj, openingDate })
	}
}
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
