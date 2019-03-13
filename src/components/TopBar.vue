<template>
	<div class="col-12 text-center border-bottom bg-smoke row m-0 boogaloo py-1" :style="{minWidth}">

		<div class="py-1 col-12 col-sm-4">
			<select v-model="tam"  class="btn btn-block btn-outline-warning pt-2">
				<option v-for="(tm, tmi) in tamanos" :value="tm"> 
					TAMAÑO {{tm}} x {{tm}} 
				</option>
			</select>
		</div>
		
		<div class="py-1 col-12 col-sm-4">
			<button class="btn btn-block btn-outline-info" @click="cambioTamano">
				<i class="fas fa-gamepad"></i>
				<span class="ml-2">NUEVO JUEGO</span>
			</button>
		</div>

		<div class="py-1 col-12 col-sm-4 position-relative">
			
			<transition enter-active-class="zoomIn" leave-active-class="zoomOut">
				<button v-if="!timefin" class="animated btn btn-block btn-outline-light rounded-0" @click="pausarJuego">
					<i class="fas fa-headset mr-2"></i>
					<i class="fas fa-pause"></i>
					<span class="ml-2">PAUSAR</span>
				</button>
			</transition>

			<transition enter-active-class="zoomIn absolute-center" leave-active-class="zoomOut absolute-center">
				<div v-if="timefin" class="animated text-center bg-success text-white f-5" style="padding: 0.45rem;">
					<span>TIEMPO: {{tiempoDuracion}}</span>
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
				tamdef: this.pretam,
			}
		},
		methods:{
			cambioTamano: function(){
				this.tamdef = this.tam;
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
			},
			minWidth: function()
			{
				return ((20+20-parseInt(this.tamdef*0.75))*this.tamdef)+32+'px';
			}
		}
	}
</script>