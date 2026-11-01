(function(){
var RM=matchMedia('(prefers-reduced-motion:reduce)').matches, cur=0, mx=.5, my=.5, sy=0, vel=0;
/* split words */
var n=0;
function split(node){Array.prototype.slice.call(node.childNodes).forEach(function(c){
  if(c.nodeType===3){var f=document.createDocumentFragment();c.textContent.split(/(\s+)/).forEach(function(t){
    if(!t)return; if(/^\s+$/.test(t)){f.appendChild(document.createTextNode(' '));return}
    var s=document.createElement('span');s.className='w';s.style.setProperty('--i',Math.min(n++,40));s.textContent=t;f.appendChild(s)});c.replaceWith(f)}
  else if(c.nodeType===1)split(c)})}
document.querySelectorAll('.sp').forEach(function(e){n=0;split(e)});
var nm=document.getElementById('nm');
(function L(el){Array.prototype.slice.call(el.childNodes).forEach(function(c){
  if(c.nodeType===3){var f=document.createDocumentFragment();c.textContent.split('').forEach(function(ch){var s=document.createElement('span');s.className='l';s.textContent=ch;f.appendChild(s)});c.replaceWith(f)}
  else if(c.nodeName!=='BR')L(c)})})(nm);
/* reveal */
var els=document.querySelectorAll('.sp,.rv,.end img,.mq');
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');if(e.target.matches('.trail figure'))setTimeout(function(){e.target.classList.add('done')},1600);io.unobserve(e.target)}})},{threshold:.12});
els.forEach(function(e){io.observe(e)});
document.querySelectorAll('.hero .sp,.hero .rv').forEach(function(e){e.classList.add('in')});
var hud=document.getElementById('hud'),HN=['início','infância','o que me atravessa','mar','linguagem','dados & ia','projetos','horizonte'];
/* chapters */
var dots=document.querySelectorAll('#dots a');
var cio=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){cur=+e.target.dataset.c;hud.textContent='gyovanna.blaustein / '+HN[cur];dots.forEach(function(d,i){d.classList.toggle('on',i===cur)})}})},{threshold:.35});
document.querySelectorAll('[data-c]').forEach(function(e){cio.observe(e)});
/* tilt */
document.querySelectorAll('.tilt').forEach(function(f){
  f.addEventListener('pointermove',function(e){var r=f.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
    f.style.transform='perspective(800px) rotateY('+x*12+'deg) rotateX('+(-y*12)+'deg) scale(1.025)'});
  f.addEventListener('pointerleave',function(){f.style.transform=''})});
/* lightbox */
var lb=document.getElementById('lb'),li=lb.querySelector('img');
document.querySelectorAll('figure img').forEach(function(im){im.addEventListener('click',function(){li.src=im.src;lb.classList.add('on')})});
lb.addEventListener('click',function(){lb.classList.remove('on')});
addEventListener('keydown',function(e){if(e.key==='Escape')lb.classList.remove('on')});
addEventListener('pointermove',function(e){mx=e.clientX/innerWidth;my=1-e.clientY/innerHeight});
/* scroll */
var bar=document.getElementById('bar'),mqs=document.querySelectorAll('.mq');
mqs.forEach(function(m){var t=m.textContent;m.innerHTML='<span>'+t+'</span>'});
function onS(){var h=document.documentElement.scrollHeight-innerHeight;var y=scrollY;vel+=(y-sy)*.004;sy=y;bar.style.transform='scaleX('+(h>0?y/h:0)+')';
  mqs.forEach(function(m){var r=m.getBoundingClientRect();m.firstElementChild.style.transform='translateX('+((r.top-innerHeight/2)*(+m.dataset.s)*.3)+'px)'})}
addEventListener('scroll',onS,{passive:true});onS();
var mb=document.getElementById('mb'),mn=document.getElementById('menu');
function tm(o){mn.classList.toggle('on',o);mb.setAttribute('aria-expanded',o);mn.setAttribute('aria-hidden',!o);document.body.classList.toggle('mo',o);document.body.style.overflow=o?'hidden':''}
mb.addEventListener('click',function(){tm(!mn.classList.contains('on'))});
mn.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){tm(false)})});
addEventListener('keydown',function(e){if(e.key==='Escape')tm(false)});
/* trail */
var tr=document.querySelector('.trail'),pf=tr.querySelectorAll('figure'),ps=document.getElementById('trsvg'),pp=document.getElementById('pp'),pg=document.getElementById('pg'),bd=document.getElementById('bead'),pl2=0;
function bp(){var W=tr.offsetWidth,H=tr.offsetHeight,p=[[pf[0].offsetLeft-W*.05,0]];
 pf.forEach(function(f){p.push([f.offsetLeft+f.offsetWidth/2,f.offsetTop+f.offsetHeight*.45])});
 var l=p[p.length-1];p.push([l[0]+W*.1,H]);var d='M'+p[0][0]+','+p[0][1];
 for(var i=0;i<p.length-1;i++){var a=p[Math.max(i-1,0)],b=p[i],c=p[i+1],e=p[Math.min(i+2,p.length-1)];
  d+=' C'+(b[0]+(c[0]-a[0])/6)+','+(b[1]+(c[1]-a[1])/6)+' '+(c[0]-(e[0]-b[0])/6)+','+(c[1]-(e[1]-b[1])/6)+' '+c[0]+','+c[1]}
 ps.setAttribute('viewBox','0 0 '+W+' '+H);pp.setAttribute('d',d);pg.setAttribute('d',d);pl2=pp.getTotalLength();pp.style.strokeDasharray=pl2;tp()}
function tp(){pf.forEach(function(f){if(!f.dataset.r&&f.getBoundingClientRect().top<innerHeight*.85){f.dataset.r=1;f.classList.add('in');setTimeout(function(){f.classList.add('done')},1600)}});var r=tr.getBoundingClientRect(),g=Math.max(0,Math.min(1,(innerHeight*.8-r.top)/(r.height+innerHeight*.1)));
 pp.style.strokeDashoffset=pl2*(1-g);var q=pp.getPointAtLength(pl2*g);bd.setAttribute('cx',q.x);bd.setAttribute('cy',q.y)}
addEventListener('resize',bp);addEventListener('load',bp);bp();setTimeout(bp,700);document.fonts&&document.fonts.ready.then(bp);
addEventListener('scroll',tp,{passive:true});
document.querySelectorAll('.fl').forEach(function(f){f.addEventListener('click',function(){f.classList.toggle('flip')})});
/* typed + code + network */
var TL=['> front-end developer em formação','> apaixonada por dados e inteligência artificial','> estudante de Desenvolvimento de Sistemas','> escrevendo o próximo capítulo'],ty=document.getElementById('ty'),ti=0,tc=0,td=false;
function tt(){var t=TL[ti];if(RM){ty.textContent=t;return}
 if(!td){tc++;ty.textContent=t.slice(0,tc);if(tc===t.length){td=true;setTimeout(tt,1800);return}}
 else{tc--;ty.textContent=t.slice(0,tc);if(tc===0){td=false;ti=(ti+1)%TL.length}}
 setTimeout(tt,td?25:55)}
tt();
var CH='<span class="k">const</span> <span class="v">gyovanna</span> = {\n  <span class="p">paixao</span>: [<span class="s">"dados"</span>, <span class="s">"inteligência artificial"</span>],\n  <span class="p">aprendendo</span>: [<span class="s">"Python"</span>, <span class="s">"SQL"</span>, <span class="s">"Power BI"</span>, <span class="s">"IA"</span>],\n  <span class="p">acredita</span>: <span class="s">"tecnologia precisa ter alma"</span>,\n  <span class="p">objetivo</span>: <span class="s">"gerar impacto real"</span>,\n};';
function part(h,n){var o='',c=0,i=0;while(i<h.length&&c<n){if(h[i]==='<'){var j=h.indexOf('>',i);o+=h.slice(i,j+1);i=j+1}else{o+=h[i++];c++}}return o}
var CS={perfil:CH,
formacao:'<span class="c">// o que estou construindo</span>\n<span class="k">const</span> <span class="v">formacao</span> = [\n  { <span class="p">curso</span>: <span class="s">"Técnico em Desenvolvimento de Sistemas"</span>,\n    <span class="p">onde</span>: <span class="s">"SENAI São Paulo"</span>, <span class="p">periodo</span>: <span class="s">"2025 – 2026"</span> },\n  { <span class="p">curso</span>: <span class="s">"Ensino Médio"</span>,\n    <span class="p">onde</span>: <span class="s">"Sesi Mogi das Cruzes"</span>, <span class="p">serie</span>: <span class="s">"3º ano"</span> },\n];\n\n<span class="k">const</span> <span class="v">certificacoes</span> = [\n  <span class="s">"Claude com a Anthropic API"</span>,\n  <span class="s">"Por dentro da segurança cibernética"</span>,\n  <span class="s">"Excel básico"</span>,\n  <span class="s">"Fundamentos de Orientação a Objetos"</span>,\n  <span class="s">"Ética na Inteligência Artificial"</span>,\n  <span class="s">"Fundamentos de IA e Descarbonização (SENAI)"</span>,\n];\n\n<span class="k">const</span> <span class="v">idiomas</span> = { <span class="p">portugues</span>: <span class="s">"nativo"</span>, <span class="p">espanhol</span>: <span class="s">"profissional"</span>, <span class="p">ingles</span>: <span class="s">"básico"</span> };',
projetos:'<span class="k">const</span> <span class="v">projetos</span> = [\n  <span class="s">"Dra. Marianna Mármora"</span>,\n  <span class="s">"Gaby Blaustein · UGC"</span>,\n  <span class="s">"Universo GAH"</span>,\n  <span class="s">"Básico Premium"</span>,\n];\n<span class="v">projetos</span>.<span class="fn">length</span>; <span class="c">// 4 capítulos... e contando</span>\n<span class="v">projetos</span>.<span class="fn">push</span>(<span class="s">"o próximo capítulo"</span>);',
contato:'<span class="k">$</span> contato --gyovanna\n<span class="c">// vamos escrever o próximo capítulo juntos?</span>\n\n<span class="p">email</span>:     <a href="mailto:gyblaustein@gmail.com">gyblaustein@gmail.com</a>\n<span class="p">linkedin</span>:  <a href="https://www.linkedin.com/in/gyovannablaustein-029610338" target="_blank" rel="noopener">/in/gyovannablaustein</a>\n<span class="p">instagram</span>: <a href="https://www.instagram.com/gy_blaustein" target="_blank" rel="noopener">@gy_blaustein</a>\n<span class="p">local</span>:     <span class="s">"Mogi das Cruzes, SP"</span>\n<span class="p">status</span>:    <span class="s">"aberta a novos capítulos"</span>'};
document.querySelectorAll('.cp').forEach(function(el){var h=CS[el.dataset.k],tot=h.replace(/<[^>]+>/g,'').length,st=false,step=Math.max(1,Math.round(tot/230));
 el.style.minHeight='calc('+(h.split('\n').length*1.7)+'em + 2.4rem)';
 new IntersectionObserver(function(es,ob){if(es[0].isIntersecting&&!st){st=true;ob.disconnect();if(RM){el.innerHTML=h;return}var k=0,iv=setInterval(function(){k+=step;el.innerHTML=part(h,k);if(k>=tot)clearInterval(iv)},24)}},{threshold:.3}).observe(el)});

var nc=document.getElementById('net'),nx=nc.getContext('2d'),nodes=[],nvis=false,nm={x:-999,y:-999};
function nr(){nc.width=innerWidth;nc.height=nc.parentElement.offsetHeight;var N=Math.min(110,Math.round(nc.width*nc.height/16000));nodes=[];for(var i=0;i<N;i++)nodes.push({x:Math.random()*nc.width,y:Math.random()*nc.height,vx:(Math.random()-.5)*.4,vy:(Math.random()-.5)*.4})}
new IntersectionObserver(function(e){nvis=e[0].isIntersecting}).observe(nc.parentElement);
nc.parentElement.addEventListener('pointermove',function(e){var r=nc.getBoundingClientRect();nm.x=e.clientX-r.left;nm.y=e.clientY-r.top});
function nd(){requestAnimationFrame(nd);if(!nvis)return;nx.clearRect(0,0,nc.width,nc.height);
 nodes.forEach(function(a,i){if(!RM){a.x+=a.vx;a.y+=a.vy}if(a.x<0||a.x>nc.width)a.vx*=-1;if(a.y<0||a.y>nc.height)a.vy*=-1;
  var dx=nm.x-a.x,dy=nm.y-a.y;if(Math.hypot(dx,dy)<170){a.x+=dx*.012;a.y+=dy*.012}
  nx.fillStyle='rgba(255,255,255,.85)';nx.beginPath();nx.arc(a.x,a.y,1.8,0,6.3);nx.fill();
  for(var j=i+1;j<nodes.length;j++){var b=nodes[j],e=Math.hypot(a.x-b.x,a.y-b.y);if(e<125){nx.strokeStyle='rgba(255,255,255,'+(1-e/125)*.5+')';nx.beginPath();nx.moveTo(a.x,a.y);nx.lineTo(b.x,b.y);nx.stroke()}}})}
nr();addEventListener('resize',nr);setTimeout(nr,800);nd();
/* WebGL */
try{
var cv=document.getElementById('gl');
var R=new THREE.WebGLRenderer({canvas:cv,antialias:true});R.autoClear=false;
var cam=new THREE.PerspectiveCamera(40,1,.1,50);cam.position.z=6;
var bg=new THREE.Scene(),sc=new THREE.Scene();
var P=[['#e8c547','#e2608f','#ee7a3a','#1f6f78'],['#f08fb0','#ffb98a','#e8c547','#b07ac8'],['#1f6f78','#6b4fa0','#e2608f','#e8c547'],['#1b3a63','#ee7a3a','#e2608f','#1f8a8a'],['#1f6f78','#e8b83a','#ee6a5a','#7a4fa8'],['#14305e','#19a6b8','#8a4fb0','#e2608f'],['#1f8a8a','#e8c547','#e2608f','#2b2748'],['#ee7a3a','#e2608f','#8a4fb0','#e8c547']].map(function(a){return a.map(function(h){return new THREE.Color(h)})});
var U={uT:{value:0},uM:{value:new THREE.Vector2(.5,.5)},uRes:{value:new THREE.Vector2(1,1)},uL:{value:0},uV:{value:1},uK:{value:0},uMc:{value:new THREE.Vector2(.5,.5)},
 uC0:{value:P[0][0].clone()},uC1:{value:P[0][1].clone()},uC2:{value:P[0][2].clone()},uC3:{value:P[0][3].clone()}};
var lq=matchMedia('(prefers-color-scheme:light)');function setL(){var t=document.documentElement.dataset.theme;U.uL.value=(t?t==='light':lq.matches)?1:0}setL();lq.addEventListener&&lq.addEventListener('change',setL);
var pl=new THREE.Mesh(new THREE.PlaneGeometry(2,2),new THREE.ShaderMaterial({uniforms:U,depthTest:false,depthWrite:false,
 vertexShader:'void main(){gl_Position=vec4(position.xy,0.,1.);}',
 fragmentShader:'precision highp float;uniform float uT,uL,uK,uV;uniform vec2 uM,uRes,uMc;uniform vec3 uC0,uC1,uC2,uC3;'+
 'float h(vec2 p){return fract(sin(dot(p,vec2(12.9898,78.233)))*43758.5453);}'+
 'void main(){vec2 uv=gl_FragCoord.xy/uRes;vec2 p=uv;p.x*=uRes.x/uRes.y;vec2 m=uM;m.x*=uRes.x/uRes.y;vec2 q=p*1.3;'+
 'for(int i=0;i<4;i++){float k=float(i);q+=.55*vec2(sin(q.y*1.7+uT*.22+k*1.3),cos(q.x*1.5-uT*.18+k*2.1));}'+
 'float d=distance(p,m);q+=.5*exp(-d*d*7.)*vec2(sin(uT*.8+d*6.),cos(uT*.7-d*6.));'+
 'vec2 mc=uMc;mc.x*=uRes.x/uRes.y;float r=distance(p,mc);q+=uK*.6*exp(-r*r*4.)*vec2(cos(r*22.-uT*5.),sin(r*22.-uT*5.));'+
 'float a=.5+.5*sin(q.x*1.3+q.y*.7),b=.5+.5*sin(q.y*1.6-q.x*1.1+2.),c=.5+.5*sin(length(q)*1.8-uT*.15);'+
 'vec3 col=mix(mix(uC0,uC1,a),mix(uC2,uC3,b),c);'+
 'col=mix(col*(.6+.3*uV),mix(col,vec3(1.),.5),uL);col+=(h(gl_FragCoord.xy+uT)-.5)*.05;gl_FragColor=vec4(col,1.);}'}));
pl.frustumCulled=false;bg.add(pl);
var VS='uniform float uT,uD;varying vec3 vN,vV;void main(){vec3 p=position;float n=sin(p.x*2.1+uT*.8)+sin(p.y*2.4+uT*1.1)+sin(p.z*2.7+uT*.7);p+=normal*n*uD;vN=normalize(normalMatrix*normal);vec4 mv=modelViewMatrix*vec4(p,1.);vV=normalize(-mv.xyz);gl_Position=projectionMatrix*mv;}';
var FS='uniform vec3 uC0,uC1,uC2,uC3;uniform float uT;varying vec3 vN,vV;void main(){vec3 N=normalize(vN);float f=pow(1.-max(dot(N,normalize(vV)),0.),2.2);'+
 'vec3 c=mix(mix(uC0,uC1,N.x*.5+.5+.2*sin(uT*.3)),mix(uC2,uC3,N.y*.5+.5),.5+.5*sin(N.z*3.+uT*.4));c=c*.95+f*vec3(1.,.94,.9)*.85;gl_FragColor=vec4(c,.8);}';
function mat(d){var u=Object.assign({uD:{value:d}},U);return new THREE.ShaderMaterial({uniforms:u,vertexShader:VS,fragmentShader:FS,transparent:true})}
var orb=new THREE.Mesh(new THREE.SphereGeometry(1,96,96),mat(.2));sc.add(orb);
addEventListener('pointerdown',function(e){U.uMc.value.set(e.clientX/innerWidth,1-e.clientY/innerHeight);U.uK.value=1});
var ringEl=document.getElementById('ring');
var OP=[[0,0,1.9],[2.5,0,.95],[-2.5,0,.95],[2.5,0,.95],[-2.5,0,.95],[2.6,0,.9],[-2.6,0,.9],[2.6,0,.9]],ox=0,oy=0,os=1.6,rx=0,ry=0,t0=performance.now();
function rs(){var w=innerWidth,h=innerHeight;R.setPixelRatio(Math.min(devicePixelRatio,1.75));R.setSize(w,h,false);cam.aspect=w/h;cam.updateProjectionMatrix();U.uRes.value.set(w*R.getPixelRatio(),h*R.getPixelRatio())}
rs();addEventListener('resize',rs);
function loop(){requestAnimationFrame(loop);var t=(performance.now()-t0)/1000*(RM?.25:1);U.uT.value=t;
 U.uM.value.x+=(mx-U.uM.value.x)*.06;U.uM.value.y+=(my-U.uM.value.y)*.06;
 var pal=P[cur];[U.uC0,U.uC1,U.uC2,U.uC3].forEach(function(u,i){u.value.lerp(pal[i],.025)});
 var asp=cam.aspect,k=asp<.8?.3:1,o=OP[cur],tx=o[0]*k*Math.min(1,asp),ty=o[1],ts=o[2]*(asp<.8?.62:1);
 if(cur===0&&ringEl){var rr=ringEl.getBoundingClientRect(),upp=2*Math.tan(20*Math.PI/180)*6/innerHeight;tx=(rr.left+rr.width/2-innerWidth/2)*upp;ty=-(rr.top+rr.height/2-innerHeight/2)*upp;ts=.3*rr.width*upp}
 ox+=(tx-ox)*.06;oy+=(ty-oy)*.06;os+=(ts-os)*.06;
 vel*=.92;rx+=((my-.5)*.5-rx)*.05;ry+=((mx-.5)*.7-ry)*.05;
 orb.position.set(ox+(mx-.5)*.3,oy+Math.sin(t*.7)*.12,0);U.uV.value+=((cur===0?1:0)-U.uV.value)*.04;U.uK.value*=.95;orb.scale.setScalar(os*(1+U.uK.value*.14));orb.rotation.set(rx+t*.1,ry+t*.15+vel,0);
 R.clear();R.render(bg,cam);R.render(sc,cam)}
loop();
}catch(err){document.body.classList.add('nogl')}
})();
