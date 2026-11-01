(function(){try{
var ms=document.getElementById('ms');if(!ms)return;
var AC=null,out=null,timer=0,on=false,CHD=[[174.6,220,261.6,329.6],[164.8,196,246.9,293.7],[146.8,174.6,220,261.6],[130.8,164.8,196,246.9]],ARP=[0,2,1,3,2,1,3,2];
function build(){AC=new (window.AudioContext||window.webkitAudioContext)();var m=AC.createGain();m.gain.value=0;var lp=AC.createBiquadFilter();lp.type='lowpass';lp.frequency.value=1600;var dl=AC.createDelay(1.5);dl.delayTime.value=.46;var fb=AC.createGain();fb.gain.value=.4;lp.connect(m);lp.connect(dl);dl.connect(fb);fb.connect(dl);dl.connect(m);m.connect(AC.destination);out={m:m,lp:lp}}
function note(f,t,d,ty,g,a){var o=AC.createOscillator(),e=AC.createGain();o.type=ty;o.frequency.value=f;e.gain.setValueAtTime(0,t);e.gain.linearRampToValueAtTime(g,t+a);e.gain.exponentialRampToValueAtTime(.0001,t+d);o.connect(e);e.connect(out.lp);o.start(t);o.stop(t+d+.1)}
function bar(i){if(!on)return;var t=AC.currentTime+.05,c=CHD[i%4];
 c.forEach(function(f){note(f,t,7,'triangle',.05,1.8);note(f*1.004,t,7,'sine',.03,2)});
 ARP.forEach(function(k,s){note(c[k]*2,t+s*.75,1.8,'sine',.07,.02)});
 timer=setTimeout(function(){bar(i+1)},6000)}
function start(){if(!AC)build();if(AC.resume)AC.resume();on=true;out.m.gain.cancelScheduledValues(AC.currentTime);out.m.gain.linearRampToValueAtTime(.6,AC.currentTime+2);bar(0);ms.classList.add('on');ms.setAttribute('aria-pressed','true')}
function stop(){on=false;clearTimeout(timer);out.m.gain.cancelScheduledValues(AC.currentTime);out.m.gain.linearRampToValueAtTime(0,AC.currentTime+1);setTimeout(function(){if(!on)AC.suspend()},1300);ms.classList.remove('on');ms.setAttribute('aria-pressed','false')}
ms.addEventListener('click',function(){try{on?stop():start()}catch(e){}});
}catch(e){}})();
