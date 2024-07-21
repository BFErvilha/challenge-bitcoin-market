<template>
	<div>
		<FInput v-model="localFormData.companyName" type="text" placeholder="Digite a razão social" label="Razão Social" required />
		<FInput v-model="localFormData.cnpj" type="text" placeholder="Digite o cnpj" label="CNPJ" required />
		<FInput v-model="localFormData.openingDate" type="date" label="Data de Abertura" required />
		<FInput v-model="localFormData.phone" type="text" placeholder="(##) #####-####" label="Telefone" required />
	</div>
</template>

<script setup>
import { defineProps, defineEmits, reactive, watch, computed } from 'vue'
import FInput from '@/components/form/Input.vue'

const props = defineProps({
	formData: Object,
})

const emit = defineEmits(['update:formData'])

const formData = computed(() => props.formData)
const localFormData = reactive({ ...formData.value })

watch(
	localFormData,
	newVal => {
		emit('update:formData', newVal)
	},
	{ deep: true },
)

watch(
	() => props.formData,
	newVal => {
		console.log(newVal)
		Object.assign(localFormData, newVal)
	},
	{ deep: true },
)
</script>
