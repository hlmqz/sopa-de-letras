<template>
	<div class="col-12 text-center border-none border-bottom bg-smoke row m-0">

		<div class="py-1 col-4">
			<select v-model="tam"  class="btn btn-outline-warning border-0 mx-3">
				<option v-for="(tm, tmi) in tamanos" :value="tm"> 
					Tamaño {{tm}} x {{tm}} 
				</option>
			</select>
		</div>
		
		<div class="py-1 col-4">
			<button class="btn btn-outline-info border-0 mx-2" @click="cambioTamano">
				<i class="fas fa-gamepad"></i>
				<span class="ml-2">Nuevo juego</span>
			</button>
		</div>

		<div class="py-1 col-4 position-relative">
			
			<transition enter-active-class="zoomIn" leave-active-class="zoomOut">
				<button v-if="!timefin" class="animated absolute-center btn btn-outline-light border-0" @click="pausarJuego">
					<i class="fas fa-headset mr-2"></i>
					<i class="fas fa-pause"></i>
					<span class="ml-2">Pausar</span>
				</button>
			</transition>

			<transition enter-active-class="zoomIn" leave-active-class="zoomOut">
				<div v-if="timefin" class="animated absolute-center text-center bg-success text-white py-1 px-5 f-5">
					<span>Tiempo: {{tiempoDuracion}}</span>
				</div>
			</transition>
		</div>

	</div>
</template>
<script>
	export default {
		name: 'TopBar',
		props:{
			tamanos:{
				type: Array,
				default:()=>[8,9,10,11,12,13,14,15,16,17,18,19,20],
			},
			pretam:{
				type: Number,
				default: 12,
			},
			timeini:{
				type: Number,
				default: 0,
			},
			timefin:{
				type: Number,
				default: 0,
			},
			timeadd:{
				type: Number,
				default: 0,
			},
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
			pausarJuego: function(){
				this.$emit('pausarJuego');
			}
		},
		computed:{
			tiempoDuracion: function()
			{
				if(!this.timefin)  return 'Sin Finalizar';
				let d = this.timefin - this.timeini + this.timeadd;
				d = parseInt(d/1000);
				let s = d%60;
				let m = (parseInt((d-s)/60))%60;
				let h = parseInt((d-(m*60)-s)/3600);
				let tt = (h<10?'0':'')+h+':'+(m<10?'0':'')+m+':'+(s<10?'0':'')+s;
				return tt;
			}
		}
	}
</script>