<template>
	<div>
		<FInput v-model:value="localFormData.companyName" type="text" placeholder="Digite o nome da empresa" label="Nome da Empresa" required @input="handleInputChange('companyName', $event)" />
		<FInput v-model:value="localFormData.cnpj" type="text" id="cnpj" placeholder="Digite o CNPJ" label="CNPJ" required @input="handleInputChange('cnpj', $event)" />
		<FInput v-model:value="localFormData.openingDate" type="date" label="Data de Abertura" required @input="handleInputChange('openingDate', $event)" />
		<FInput v-model:value="localFormData.phone" type="text" id="phone" placeholder="(##) #####-####" label="Telefone" required @input="handleInputChange('phone', $event)" />
	</div>
</template>

<script setup>
import { reactive, watch, toRefs } from 'vue'
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
