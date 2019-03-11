<template>
	<span class="">
		
	<transition enter-active-class="zoomIn" leave-active-class="zoomOut">
		<div v-if="enJuego" class="animated row m-0 pb-3">
			<TopBar 
				:pretam="tam" 
				:timeini="timeini"
				:timefin="timefin"
				:timeadd="timeadd"
				@cambioTamano="cambioTamano" 
				@pausarJuego="pausarJuego" 
			/>
			<MatrixLetras 
				:sopa="sopa"
				:tam="tam"
				@cellSelected="selcell"
			/>
			<ListaPalabras :palabras="palabras"/>
		</div>
	</transition>
	<IntroJuego 
		:pretam="tam" 
		:enJuego="enJuego"
		:timeadd="timeadd"
		:frase="frase"
		@cambioTamano="cambioTamano" 
		@empezarJuego="empezarJuego" 
	/>
	<HCreditos />
	</span>
</template>
<script>
import TopBar from '@/components/TopBar.vue'
import MatrixLetras from '@/components/MatrixLetras.vue'
import ListaPalabras from '@/components/ListaPalabras.vue'
import IntroJuego from '@/components/IntroJuego.vue'
import HCreditos from '@/components/HCreditos.vue'
import {frases, palabras} from '@/assets/js/Recursos'

export default {
	name:'SopaDeLetras',
	components:{TopBar, MatrixLetras, ListaPalabras, IntroJuego, HCreditos},
	data: function(){
		return {
			frases: frases,
			allpalabras: palabras,
			enBuild: 1,
			enJuego: false,
			frase: {},
			alfab: 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ',
			sopa: [],
			prepalabras :[], 
			palabras: [],
			selstart: 0,
			selstartdata: {},
			selenddata: {},
			timeadd: 0,
			timeini: 0,
			timefin: 0,
			pretam: 12,
			tam: 12,
			tamanos:[8,9,10,11,12,13,14,15,16,17,18,19,20],

		}
	},
	methods:{
		pausarJuego: function()
		{
			if(!this.sopaCompletada)
			{
				this.frase = frases[Math.floor(Math.random()*frases.length)%frases.length];
				this.enJuego = false;
				let pausa = this.getNow();
				this.timeadd += pausa - this.timeini;
				this.timeini = pausa;
			}
		},
		cambioTamano: function(t)
		{
			this.pretam = t;
			this.tam = t;
			this.buildSopa();
			this.empezarJuego();
		},
		empezarJuego: function()
		{
			this.enJuego = true;
			this.timeadd = 0;
			this.timeini = this.getNow();
		},
		finalizarJuego: function()
		{
			this.timefin = this.getNow();
		},
		buildSopa: function()
		{
			this.enBuild = 1;
			this.timefin = 0;
			this.prepalabras = [];
			this.palabras = [];
			let tam = this.tam;
			let validPalabras = this.allpalabras.filter(function(p){
				return (p.length < tam ? true : false);
			});
			for(let i = 0; i < tam ; i++)
			{
				this.prepalabras.push(validPalabras[Math.ceil(Math.random()*validPalabras.length)%validPalabras.length]);
			}
			this.setPrepalabras();
			this.defaultSopa();
			this.setPalabras();
		},
		selcell: function(cell)
		{
			if(!this.sopaCompletada)
			{

			for(let r = 0; r < this.tam ; r++)
			{
				for(let c = 0; c < this.tam ; c++)
				{
					this.sopa[r][c].c['let-sel'] = 0;
					this.sopa[r][c].c['let-pos'] = 0;
				}
			}
			if(!this.selstart)
			{
				let x, y;
				let sel = cell.c['let-sel'];
				if(!sel)
				{
					for(let p = 1; p < this.tam*2; p++)
					{
						for(let i = -1; i < 2; i++ )
						{
							for(let j = -1; j < 2; j++ )
							{
								x = cell.x +(p*i);
								y = cell.y +(p*j);
								if(x>=0&&x<this.tam && y>=0&&y<this.tam) this.sopa[y][x].c['let-pos'] = 1;
							}
						}
					}
					cell.c['let-sel'] = 1;
					cell.c['let-pos'] = 0;
					this.selstartdata = cell;
					this.selenddata = {};
					this.selstart = 1; 
				}
			}else
			{
				this.selenddata = cell;
				self = this;
				let e = this.palabras.find(function(op){
					return  ((op.d.a.x == self.selstartdata.x && 
							op.d.a.y == self.selstartdata.y && 
							op.d.b.x == self.selenddata.x && 
							op.d.b.y == self.selenddata.y)||
							(op.d.b.x == self.selstartdata.x && 
							op.d.b.y == self.selstartdata.y && 
							op.d.a.x == self.selenddata.x && 
							op.d.a.y == self.selenddata.y))
				});
				if(e)this.marcarPalabra(e);
				this.selstart = 0;
				this.selstartdata = {};
				this.selenddata = {};
				if(this.sopaCompletada) this.finalizarJuego();
			}
			}
		},
		marcarPalabra:function(pal)
		{
			let nx, ny;
			for(let l=0;l<pal.p.length;l++)
			{
				ny = l*pal.d.c.y+pal.d.a.y;
				nx = l*pal.d.c.x+pal.d.a.x;

				this.sopa[ny][nx].c['let-mar'] = 1;
				this.sopa[ny][nx].s = 1;
				this.sopa[ny][nx].h = pal.h;
				
			}
			pal.e = 1;
		},
		defaultSopa: function()
		{
			let p, rw, d;
			let t = this.tam;
			this.sopa = [];
			for(let r = 0; r<t; r++ )
			{
				rw = [];
				for(let c = 0; c<t; c++)
				{
					d = {
						l: '',
						x: c,
						y: r,
						n: r*t+c,
						s:0,
						c: {
							'let-sel': 0,
							'let-pos': 0,
							'let-mar': 0,
						}
					};
					rw.push(d);
				}
				this.sopa.push(rw);
			}
		},
		setPrepalabras: function()
		{
			for(let idx in this.prepalabras)
			{
				this.palabras.push({

					w: this.prepalabras[idx],
					p: this.preparePalabra(this.prepalabras[idx]),
					d:{},
					o: [],
					e: 0,
					u: 0,
				});
			}
		},
		preparePalabra: function(w)
		{
			w = w.toUpperCase();
			w = w.replace(/Á/,'A');
			w = w.replace(/É/,'E');
			w = w.replace(/Í/,'I');
			w = w.replace(/Ó/,'O');
			w = w.replace(/Ú/,'U');
			w = w.replace(/Ü/,'U');
			return w;
		},
		setPalabras: function()
		{
			this.palabras.sort(function(a,b){
				return a.p.length - b.p.length ;
			});
			let tx,ty;
			for (let ip in this.palabras)
			{
				for(let cy = 0; cy < this.tam; cy++)
				{
					for(let cx = 0; cx < this.tam; cx++)
					{
						for(let j = -1; j < 2; j++ )
						{
							for(let i = -1; i < 2; i++ )
							{
								let ok = true;
								for(let l=0;l<this.palabras[ip].p.length;l++)
								{
									ty = (l*j)+cy;
									tx = (l*i)+cx;
									if(tx>=0&&tx<this.tam&&ty>=0&&ty<this.tam)
									{
										if(this.sopa[ty][tx].l!='' && 
											this.sopa[ty][tx].l!= this.palabras[ip].p[l]) ok = false;
									}else
									{
										ok = false;
									}
								}
								if(ok && (cx!=tx||cy!=ty)) this.palabras[ip].o.push({
									a:{x:cx, y:cy}, 
									b:{x:tx, y:ty},
									c:{x:i, y:j} 
								}); 
							}
						}
					}
				}

				if(this.palabras[ip].o.length)
				{
					let r = Math.floor(Math.random()*this.palabras[ip].o.length);
					this.putPalabra(ip,r);
				}
			}
			this.palabras = this.palabras.filter(function(pp){return pp.u});
			this.fillVacios();
		},
		putPalabra: function(idx,r)
		{
			let nx, ny;
			let p = this.palabras[idx].p;
			let o = this.palabras[idx].o[r];
			let i = o.a;
			let d = o.c;
			for(let l=0;l<p.length;l++)
			{
				ny = l*d.y+i.y;
				nx = l*d.x+i.x;
				this.sopa[ny][nx].l = p[l];
			}
			this.palabras[idx].d = o;
			this.palabras[idx].u = 1;
			this.palabras[idx].h = `rgb(${(Math.random()*96)+96},${(Math.random()*96)+96},${(Math.random()*96)+96})`;;
			this.palabras[idx].o = [];
		},
		fillVacios: function()
		{
			for(let y=0; y < this.tam; y++)
			{
				for(let x=0; x < this.tam; x++)
				{
					if(this.sopa[y][x].l=='') this.sopa[y][x].l = this.alfab[Math.floor(Math.random()*this.alfab.length)];
				}
			}
			this.enBuild = 0;
		},
		getNow()
		{
			let t = new Date();
			return t.getTime();
		}
	},
	computed:{
		ftam: function()
		{
			return 20+20-parseInt(this.tam)+'px';
		},
		sopaCompletada: function()
		{
			let ok = 1;
			for(let ip in this.palabras) if(!this.palabras[ip].e) ok = 0;
			return  ok;
		}
	},
	beforeMount: function(){
		this.frases.sort(function(){return 0.5 - Math.random()});
		// this.buildSopa();
	},
	mounted: function()
	{
		// document.getElementById(this.$el.id).style.display='inherit';
	}
}
</script>