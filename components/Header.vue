<template>
	<header class="header">
		<img class="logo" src="~/assets/images/logo.svg" />
		<div class="buttons">
			<ModalOpen :modalType="'entry'" :classes="`button button-dark`" :label="`Вхід`" />
			<ModalOpen :modalType="'registration'" :label="`Реєстрація`"  />
		</div>
	</header>
</template>

