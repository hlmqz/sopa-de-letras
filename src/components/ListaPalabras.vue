<template>
<div class="col-12 col-md-3 col-lg-5 col-xl-7 pt-4 pb-5">
	<div class="list-pals p-1 bg-smoke rounded-0 row m-0">
		<div v-for="(pl,pli) in palabras" 
			class="p-2 col-auto palabra boogaloo text-uppercase text-center rounded py-3 px-4" 
			:class="{'encontrada':pl.e}" :style="{'background-color': (pl.e?pl.h:'') }">
			{{pl.w}}
		</div>
	</div>
</div>
</template>
<script>
export default{
	name: 'ListaPalabras',
	props:{
		palabras:{
			type: Array,
			default: [],
		}
	}
}
</script>