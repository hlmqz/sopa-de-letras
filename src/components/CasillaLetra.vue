<template>
<div v-for="(ex, exi) in ey" 
	class="let-cell" 
	:class="ex.c" 
	:style="{ width: (100/tam)+'%', 'background-color': (ex.s?ex.h:''), 'font-size': ftam }" 
	:title_="'X: '+exi+' Y: '+eyi"
	@click="selcell(ex)" >
	{{ex.l}}
</div>
</template>