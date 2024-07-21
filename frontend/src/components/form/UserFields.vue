<template>
	<div>
		<FInput v-model:value="localFormData.name" type="text" id="name" placeholder="Digite seu nome completo" label="Nome Completo" required @input="handleInputChange('name', $event)" />
		<FInput v-model:value="localFormData.cpf" type="text" id="cpf" placeholder="Digite seu cpf" label="CPF" required @input="handleInputChange('cpf', $event)" />
		<FInput v-model:value="localFormData.birthDate" type="date" label="Data de Nascimento" required @input="handleInputChange('birthDate', $event)" />
		<FInput v-model:value="localFormData.phone" type="text" id="phone" placeholder="(##) #####-####" label="Telefone" required @input="handleInputChange('phone', $event)" />
	</div>
</template>

<script setup>
import { ref, watch, toRefs, reactive } from 'vue'
import FInput from '@/components/form/Input.vue'

const props = defineProps({
	formData: Object,
})

const emit = defineEmits(['update:formData'])

const { formData } = toRefs(props)
const localFormData = reactive({ ...formData.value })
const sendData = reactive({})

watch(
	formData,
	newVal => {
		Object.assign(localFormData, newVal)
	},
	{ deep: true, immediate: true },
)

const handleInputChange = (field, event) => {
	sendData[field] = event.target.value
	emit('update:formData', { ...sendData })
}
</script>
