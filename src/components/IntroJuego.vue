<template>
<transition enter-active-class="slideInDown" leave-active-class="slideOutUp">
	<div v-if="!enJuego" 
	class="d-flex animated fixed-top justify-content-center align-items-center w-100" 
	style="height: 100%;">
		
		<div v-if="!timeadd" class="text-center bg-smoke rounded p-3">
			<select v-model="tam" class="btn btn-outline-warning border-0 f-6 py-2 mx-3 my-2" >
				<option v-for="(tm, tmi) in tamanos" :value="tm"> 
					Tamaño {{tm}} x {{tm}} 
				</option>
			</select>
			
			<button class="btn btn-outline-info border-0 f-6 mx-2" @click="cambioTamano">
				<i class="fas fa-gamepad"></i>
				<span class="ml-2">empezar</span>
			</button>
		</div>

		<div v-else class="text-center p-3" style="max-width: 480px;">
			<div class="bg-smoke p-3 rounded frase text-white w-100">
				<div class="pb-3 text-left f-6">
					{{ frase.texto }}.
				</div>
				<div class="p-1 text-right f-7">
					<strong class="border-top border-light py-2">{{ frase.autor }}</strong>
				</div>
			</div>
			<br>
			<br>
			<button class="btn btn-dark border-0 f-6" @click="empezarJuego">
				<i class="fas fa-play"></i>
				<span class="ml-2">Continuar</span>
			</button>
		</div>

	</div>
</transition>
</template>
<script>
export default {
	name: 'IntroJuego',
	props:{
		enJuego:{
			type: Boolean,
			default: false,
		},
		frase:{
			type:Object,
			default:()=>{},
		},
		pretam:{
			type: Number,
			default: 12,
		},
		tamanos:{
			type: Array,
			default:()=>[8,9,10,11,12,13,14,15,16,17,18,19,20],
		},
		timeadd:{
			type: Number,
			default: 0,
		}
	},
	data: function()
	{
		return {
			tam: this.pretam,
		}
	},
	methods:{
			cambioTamano: function(){
				this.$emit('cambioTamano', this.tam);
			},
			empezarJuego: function(){
				this.$emit('empezarJuego');
			},
		},
}
</script>