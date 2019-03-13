<template>
<div class="animated px-1 col-12 col-md-9 col-lg-7 col-xl-5 pt-4 text-center">
	<div class="content-lets">
		<div v-for="(ey, eyi) in sopa" class="let-row" :style="{height: ctam }">
			<div v-for="(ex, exi) in ey" 
				class="let-cell" 
				:class="ex.c" 
				:style="{ width: ctam, height:ctam, 'background-color': (ex.s?ex.h:''), 'font-size': ftam }" 
				:title_="'X: '+exi+' Y: '+eyi"
				@click="selcell(ex)" >
				{{ex.l}}
			</div>
		</div>
	</div>
</div>
</template>
<script>
export default {
	name: 'MatrixLetras',
	props: {
		sopa: {
			type: Array,
			default: ()=>[],
		},
		tam:{
			type: Number,
			default: 12,
		}
	},
	data: function(){
		return {
		}
	},
	methods:{
		selcell: function(cell)
		{
			this.$emit('cellSelected',cell);
		}
	},
	computed:{
		ftam: function()
		{
			return 12+20-parseInt(this.tam*0.75)+'px';
		},
		ctam: function(){
			return 20+20-parseInt(this.tam*0.75)+'px';
		}
	}
}
</script>