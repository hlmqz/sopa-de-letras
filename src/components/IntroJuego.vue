<template>
<transition enter-active-class="slideInDown" leave-active-class="slideOutUp">
	<div v-if="!enJuego" class="animated fixed-top py-5" style="max-height: 100%; overflow-y: auto;">
		<div class="container">
			<div class="row">
				
				<div class="py-3 col-12" :class="{'col-md-6':timeadd}">
					<div class="bg-smoke p-4">
						<div class="text-center py-2">
							<h4 class="text-success boogaloo">INSTRUCCIONES</h4>
						</div>
						<div class="border-bottom border-top border-light">
							<ul class="text-white text-left">
								<li class="my-2">
									Seleccione el tamaño de la sopa de letras y Seleccione en "Empezar" para jugar.
								</li>
								<li class="my-2">
									Ya en juego, busque una palabra e identifique las casillas correspondientes a los extremos,
									seleccione la casilla de un extremo de la palabra y esta se marcará en fondo oscuro,
									después seleccione la casilla del otro extremo de la palabra y
									sí es válida la selección de palabra entre los extremos las casillas se marcarán de color, 
									de lo contrario volverán a su estado normal.
								</li>
								<li class="my-2">
									Al finalizar en la parte superior derecha mostrará el tiempo que demoró.
								</li>
								<li class="my-2">
									Puede cargar un nuevo juego en cualquier momento.
								</li>
							</ul>
						</div>
					</div>
					<div v-if="!timeadd" class="text-center bg-smoke px-3 pb-3 boogaloo">
						<select v-model="tam" class="btn btn-outline-warning f-6 py-2 m-3" >
							<option v-for="(tm, tmi) in tamanos" :value="tm"> 
								TAMAÑO {{tm}} x {{tm}} 
							</option>
						</select>
						
						<button class="btn btn-outline-info f-6 m-3" @click="cambioTamano">
							<i class="fas fa-gamepad"></i>
							<span class="ml-2">EMPEZAR</span>
						</button>
					</div>
				</div>

				<div  v-if="timeadd" class="text-center p-3 col-12 col-md-6" style="max-width:680px;">
					<div class="bg-smoke p-3 frase text-white w-100">
						<div class="pb-3 text-left f-6">
							{{ frase.texto }}.
						</div>
						<div class="p-1 text-right f-7">
							<strong class="border-top border-light py-2">{{ frase.autor }}</strong>
						</div>
					</div>
					<br>
					<br>
					<button class="btn btn-info border-0 f-6 boogaloo" @click="empezarJuego">
						<i class="fas fa-play"></i>
						<span class="ml-2">CONTINUAR</span>
					</button>
				</div>
			</div>
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