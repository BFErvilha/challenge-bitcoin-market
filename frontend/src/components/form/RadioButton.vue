<template>
	<div class="form-group">
		<div>
			<label v-for="option in userType" :key="option.value" class="radio-container">
				<input type="radio" :value="option.value" v-model="selectedValue" />
				<span class="checkmark"></span>
				{{ option.label }}
			</label>
		</div>
	</div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
	modelValue: String,
	label: String,
	userType: Array,
})

const emit = defineEmits(['update:modelValue'])

const selectedValue = ref(props.modelValue)

watch(selectedValue, newValue => {
	emit('update:modelValue', newValue)
})
</script>

<style scoped lang="scss">
@import '@/assets/styles/_variables.scss';

.form-group {
	div {
		display: flex;
		justify-content: flex-start;
		gap: 20px;
	}

	.radio-container {
		display: block;
		position: relative;
		padding-left: 30px;
		margin-bottom: 12px;
		cursor: pointer;
		font-size: 18px;
		user-select: none;

		input {
			position: absolute;
			opacity: 0;
			cursor: pointer;
		}

		.checkmark {
			position: absolute;
			top: 0;
			left: 0;
			height: 20px;
			width: 20px;
			background-color: #eee;
			border-radius: 50%;
			transition: background-color 0.3s ease;

			&:after {
				content: '';
				position: absolute;
				display: none;
				top: 6px;
				left: 6px;
				width: 8px;
				height: 8px;
				border-radius: 50%;
				background: white;
			}
		}

		&:hover input ~ .checkmark {
			background-color: #ccc;
		}

		input:checked ~ .checkmark {
			background-color: $orange;

			&:after {
				display: block;
			}
		}
	}
}
</style>
