<template>
	<header class="header">
		<img class="logo" src="~/assets/images/logo.svg" />
		<div class="buttons">
			<button class="button button-dark" @click="showModalEntry = true">Вхід</button>
			<button class="button" @click="showModalRegistration = true">Реєстрація</button>
		</div>
	</header>

	<Teleport to="body">

		<Transition name="fade">
			<Modal 
				:classes="`modal-entry`" 
				v-if="showModalEntry" 
				@close-modal="
				showModalEntry = !showModalEntry"
			>
				<template v-slot:content>
					<ModalEntry />
				</template>
			</Modal>
		</Transition>

		<Transition name="fade">
			<Modal 
				:classes="`modal-registration`" 
				v-if="showModalRegistration" 
				@close-modal="
				showModalRegistration = !showModalRegistration"
			>
				<template v-slot:content>
					<ModalRegistration />
				</template>
			</Modal>
		</Transition>
		
	</Teleport>
</template>

<script>

export default {
	data() {
		return {
			showModalEntry: false,
			showModalRegistration: false,
		}
	},
}
</script>