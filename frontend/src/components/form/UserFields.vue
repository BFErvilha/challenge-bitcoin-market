<template>
	<div>
		<FInput v-model="localFormData.name" type="text" placeholder="Digite seu nome completo" label="Nome Completo" required />
		<FInput v-model="localFormData.cpf" type="text" placeholder="Digite seu cpf" label="CPF" required />
		<FInput v-model="localFormData.birthDate" type="date" label="Data de Nascimento" required />
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
		Object.assign(localFormData, newVal)
	},
	{ deep: true },
)
</script>
