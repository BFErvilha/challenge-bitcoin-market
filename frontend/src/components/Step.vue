<template>
	<div class="step" v-show="isVisible" :key="stepNumber">
		<span class="count">
			Etapa <span>{{ stepNumber }}</span> de 4
		</span>
		<h1>{{ title }}</h1>
		<div class="form-container">
			<slot></slot>
		</div>
		<div class="actions">
			<button v-if="showPrev" class="btn btn-orange-outline w-100" @click="$emit('prev')">Voltar</button>
			<button v-if="showNext" class="btn btn-orange w-100" @click="$emit('next')">{{ stepNumber === 4 ? 'Cadastrar' : 'Continuar' }}</button>
		</div>
	</div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
	isVisible: Boolean,
	stepNumber: Number,
	title: String,
	showPrev: Boolean,
	showNext: Boolean,
})
</script>

<style scoped lang="scss">
@import '@/assets/styles/_variables.scss';
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
