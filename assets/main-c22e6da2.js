(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function n(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerpolicy&&(r.referrerPolicy=s.referrerpolicy),s.crossorigin==="use-credentials"?r.credentials="include":s.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=n(s);fetch(s.href,r)}})();function Wt(t,e){t.indexOf(e)===-1&&t.push(e)}const yt=(t,e,n)=>Math.min(Math.max(n,t),e),y={duration:.3,delay:0,endDelay:0,repeat:0,easing:"ease"},z=t=>typeof t=="number",L=t=>Array.isArray(t)&&!z(t[0]),Dt=(t,e,n)=>{const i=e-t;return((n-t)%i+i)%i+t};function Rt(t,e){return L(t)?t[Dt(0,t.length,e)]:t}const vt=(t,e,n)=>-n*t+n*e+t,wt=()=>{},w=t=>t,U=(t,e,n)=>e-t===0?1:(n-t)/(e-t);function xt(t,e){const n=t[t.length-1];for(let i=1;i<=e;i++){const s=U(0,e,i);t.push(vt(n,1,s))}}function bt(t){const e=[0];return xt(e,t-1),e}function Et(t,e=bt(t.length),n=w){const i=t.length,s=i-e.length;return s>0&&xt(e,s),r=>{let o=0;for(;o<i-2&&!(r<e[o+1]);o++);let c=yt(0,1,U(e[o],e[o+1],r));return c=Rt(n,o)(c),vt(t[o],t[o+1],c)}}const Ot=t=>Array.isArray(t)&&z(t[0]),J=t=>typeof t=="object"&&Boolean(t.createAnimation),x=t=>typeof t=="function",et=t=>typeof t=="string",k={ms:t=>t*1e3,s:t=>t/1e3};function kt(t,e){return e?t*(1e3/e):0}const St=(t,e,n)=>(((1-3*n+3*e)*t+(3*n-6*e))*t+3*e)*t,Ht=1e-7,Ft=12;function Vt(t,e,n,i,s){let r,o,c=0;do o=e+(n-e)/2,r=St(o,i,s)-t,r>0?n=o:e=o;while(Math.abs(r)>Ht&&++c<Ft);return o}function R(t,e,n,i){if(t===e&&n===i)return w;const s=r=>Vt(r,0,1,t,n);return r=>r===0||r===1?r:St(s(r),e,i)}const _t=(t,e="end")=>n=>{n=e==="end"?Math.min(n,.999):Math.max(n,.001);const i=n*t,s=e==="end"?Math.floor(i):Math.ceil(i);return yt(0,1,s/t)},ot={ease:R(.25,.1,.25,1),"ease-in":R(.42,0,1,1),"ease-in-out":R(.42,0,.58,1),"ease-out":R(0,0,.58,1)},jt=/\((.*?)\)/;function at(t){if(x(t))return t;if(Ot(t))return R(...t);if(ot[t])return ot[t];if(t.startsWith("steps")){const e=jt.exec(t);if(e){const n=e[1].split(",");return _t(parseFloat(n[0]),n[1].trim())}}return w}class Tt{constructor(e,n=[0,1],{easing:i,duration:s=y.duration,delay:r=y.delay,endDelay:o=y.endDelay,repeat:c=y.repeat,offset:h,direction:l="normal"}={}){if(this.startTime=null,this.rate=1,this.t=0,this.cancelTimestamp=null,this.easing=w,this.duration=0,this.totalDuration=0,this.repeat=0,this.playState="idle",this.finished=new Promise((f,a)=>{this.resolve=f,this.reject=a}),i=i||y.easing,J(i)){const f=i.createAnimation(n);i=f.easing,n=f.keyframes||n,s=f.duration||s}this.repeat=c,this.easing=L(i)?w:at(i),this.updateDuration(s);const u=Et(n,h,L(i)?i.map(at):w);this.tick=f=>{var a;r=r;let m=0;this.pauseTime!==void 0?m=this.pauseTime:m=(f-this.startTime)*this.rate,this.t=m,m/=1e3,m=Math.max(m-r,0),this.playState==="finished"&&this.pauseTime===void 0&&(m=this.totalDuration);const P=m/this.duration;let I=Math.floor(P),b=P%1;!b&&P>=1&&(b=1),b===1&&I--;const V=I%2;(l==="reverse"||l==="alternate"&&V||l==="alternate-reverse"&&!V)&&(b=1-b);const M=m>=this.totalDuration?1:Math.min(b,1),T=u(this.easing(M));e(T),this.pauseTime===void 0&&(this.playState==="finished"||m>=this.totalDuration+o)?(this.playState="finished",(a=this.resolve)===null||a===void 0||a.call(this,T)):this.playState!=="idle"&&(this.frameRequestId=requestAnimationFrame(this.tick))},this.play()}play(){const e=performance.now();this.playState="running",this.pauseTime!==void 0?this.startTime=e-this.pauseTime:this.startTime||(this.startTime=e),this.cancelTimestamp=this.startTime,this.pauseTime=void 0,this.frameRequestId=requestAnimationFrame(this.tick)}pause(){this.playState="paused",this.pauseTime=this.t}finish(){this.playState="finished",this.tick(0)}stop(){var e;this.playState="idle",this.frameRequestId!==void 0&&cancelAnimationFrame(this.frameRequestId),(e=this.reject)===null||e===void 0||e.call(this,!1)}cancel(){this.stop(),this.tick(this.cancelTimestamp)}reverse(){this.rate*=-1}commitStyles(){}updateDuration(e){this.duration=e,this.totalDuration=e*(this.repeat+1)}get currentTime(){return this.t}set currentTime(e){this.pauseTime!==void 0||this.rate===0?this.pauseTime=e:this.startTime=performance.now()-e/this.rate}get playbackRate(){return this.rate}set playbackRate(e){this.rate=e}}class qt{setAnimation(e){this.animation=e,e==null||e.finished.then(()=>this.clearAnimation()).catch(()=>{})}clearAnimation(){this.animation=this.generator=void 0}}const K=new WeakMap;function At(t){return K.has(t)||K.set(t,{transforms:[],values:new Map}),K.get(t)}function $t(t,e){return t.has(e)||t.set(e,new qt),t.get(e)}const Bt=["","X","Y","Z"],Ct=["translate","scale","rotate","skew"],C={x:"translateX",y:"translateY",z:"translateZ"},ct={syntax:"<angle>",initialValue:"0deg",toDefaultUnit:t=>t+"deg"},Nt={translate:{syntax:"<length-percentage>",initialValue:"0px",toDefaultUnit:t=>t+"px"},rotate:ct,scale:{syntax:"<number>",initialValue:1,toDefaultUnit:w},skew:ct},F=new Map,nt=t=>`--motion-${t}`,N=["x","y","z"];Ct.forEach(t=>{Bt.forEach(e=>{N.push(t+e),F.set(nt(t+e),Nt[t])})});const Ut=(t,e)=>N.indexOf(t)-N.indexOf(e),Kt=new Set(N),Lt=t=>Kt.has(t),Gt=(t,e)=>{C[e]&&(e=C[e]);const{transforms:n}=At(t);Wt(n,e),t.style.transform=Xt(n)},Xt=t=>t.sort(Ut).reduce(Zt,"").trim(),Zt=(t,e)=>`${t} ${e}(var(${nt(e)}))`,Q=t=>t.startsWith("--"),lt=new Set;function Jt(t){if(!lt.has(t)){lt.add(t);try{const{syntax:e,initialValue:n}=F.has(t)?F.get(t):{};CSS.registerProperty({name:t,inherits:!1,syntax:e,initialValue:n})}catch{}}}const G=(t,e)=>document.createElement("div").animate(t,e),ut={cssRegisterProperty:()=>typeof CSS<"u"&&Object.hasOwnProperty.call(CSS,"registerProperty"),waapi:()=>Object.hasOwnProperty.call(Element.prototype,"animate"),partialKeyframes:()=>{try{G({opacity:[1]})}catch{return!1}return!0},finished:()=>Boolean(G({opacity:[0,1]},{duration:.001}).finished),linearEasing:()=>{try{G({opacity:0},{easing:"linear(0, 1)"})}catch{return!1}return!0}},X={},A={};for(const t in ut)A[t]=()=>(X[t]===void 0&&(X[t]=ut[t]()),X[t]);const Qt=.015,Yt=(t,e)=>{let n="";const i=Math.round(e/Qt);for(let s=0;s<i;s++)n+=t(U(0,i-1,s))+", ";return n.substring(0,n.length-2)},ft=(t,e)=>x(t)?A.linearEasing()?`linear(${Yt(t,e)})`:y.easing:Ot(t)?te(t):t,te=([t,e,n,i])=>`cubic-bezier(${t}, ${e}, ${n}, ${i})`;function ee(t,e){for(let n=0;n<t.length;n++)t[n]===null&&(t[n]=n?t[n-1]:e());return t}const ne=t=>Array.isArray(t)?t:[t];function Y(t){return C[t]&&(t=C[t]),Lt(t)?nt(t):t}const q={get:(t,e)=>{e=Y(e);let n=Q(e)?t.style.getPropertyValue(e):getComputedStyle(t)[e];if(!n&&n!==0){const i=F.get(e);i&&(n=i.initialValue)}return n},set:(t,e,n)=>{e=Y(e),Q(e)?t.style.setProperty(e,n):t.style[e]=n}};function zt(t,e=!0){if(!(!t||t.playState==="finished"))try{t.stop?t.stop():(e&&t.commitStyles(),t.cancel())}catch{}}function ie(t,e){var n;let i=(e==null?void 0:e.toDefaultUnit)||w;const s=t[t.length-1];if(et(s)){const r=((n=s.match(/(-?[\d.]+)([a-z%]*)/))===null||n===void 0?void 0:n[2])||"";r&&(i=o=>o+r)}return i}function se(){return window.__MOTION_DEV_TOOLS_RECORD}function re(t,e,n,i={},s){const r=se(),o=i.record!==!1&&r;let c,{duration:h=y.duration,delay:l=y.delay,endDelay:u=y.endDelay,repeat:f=y.repeat,easing:a=y.easing,persist:m=!1,direction:P,offset:I,allowWebkitAcceleration:b=!1}=i;const V=At(t),M=Lt(e);let T=A.waapi();M&&Gt(t,e);const v=Y(e),_=$t(V.values,v),E=F.get(v);return zt(_.animation,!(J(a)&&_.generator)&&i.record!==!1),()=>{const j=()=>{var p,W;return(W=(p=q.get(t,v))!==null&&p!==void 0?p:E==null?void 0:E.initialValue)!==null&&W!==void 0?W:0};let g=ee(ne(n),j);const rt=ie(g,E);if(J(a)){const p=a.createAnimation(g,e!=="opacity",j,v,_);a=p.easing,g=p.keyframes||g,h=p.duration||h}if(Q(v)&&(A.cssRegisterProperty()?Jt(v):T=!1),M&&!A.linearEasing()&&(x(a)||L(a)&&a.some(x))&&(T=!1),T){E&&(g=g.map(S=>z(S)?E.toDefaultUnit(S):S)),g.length===1&&(!A.partialKeyframes()||o)&&g.unshift(j());const p={delay:k.ms(l),duration:k.ms(h),endDelay:k.ms(u),easing:L(a)?void 0:ft(a,h),direction:P,iterations:f+1,fill:"both"};c=t.animate({[v]:g,offset:I,easing:L(a)?a.map(S=>ft(S,h)):void 0},p),c.finished||(c.finished=new Promise((S,Mt)=>{c.onfinish=S,c.oncancel=Mt}));const W=g[g.length-1];c.finished.then(()=>{m||(q.set(t,v,W),c.cancel())}).catch(wt),b||(c.playbackRate=1.000001)}else if(s&&M)g=g.map(p=>typeof p=="string"?parseFloat(p):p),g.length===1&&g.unshift(parseFloat(j())),c=new s(p=>{q.set(t,v,rt?rt(p):p)},g,Object.assign(Object.assign({},i),{duration:h,easing:a}));else{const p=g[g.length-1];q.set(t,v,E&&z(p)?E.toDefaultUnit(p):p)}return o&&r(t,e,g,{duration:h,delay:l,easing:a,repeat:f,offset:I},"motion-one"),_.setAnimation(c),c}}const oe=(t,e)=>t[e]?Object.assign(Object.assign({},t),t[e]):Object.assign({},t);function it(t,e){var n;return typeof t=="string"?e?((n=e[t])!==null&&n!==void 0||(e[t]=document.querySelectorAll(t)),t=e[t]):t=document.querySelectorAll(t):t instanceof Element&&(t=[t]),Array.from(t||[])}const ae=t=>t(),Pt=(t,e,n=y.duration)=>new Proxy({animations:t.map(ae).filter(Boolean),duration:n,options:e},le),ce=t=>t.animations[0],le={get:(t,e)=>{const n=ce(t);switch(e){case"duration":return t.duration;case"currentTime":return k.s((n==null?void 0:n[e])||0);case"playbackRate":case"playState":return n==null?void 0:n[e];case"finished":return t.finished||(t.finished=Promise.all(t.animations.map(ue)).catch(wt)),t.finished;case"stop":return()=>{t.animations.forEach(i=>zt(i))};case"forEachNative":return i=>{t.animations.forEach(s=>i(s,t))};default:return typeof(n==null?void 0:n[e])>"u"?void 0:()=>t.animations.forEach(i=>i[e]())}},set:(t,e,n)=>{switch(e){case"currentTime":n=k.ms(n);case"currentTime":case"playbackRate":for(let i=0;i<t.animations.length;i++)t.animations[i][e]=n;return!0}return!1}},ue=t=>t.finished;function fe(t,e,n){return x(t)?t(e,n):t}function de(t){return function(n,i,s={}){n=it(n);const r=n.length,o=[];for(let c=0;c<r;c++){const h=n[c];for(const l in i){const u=oe(s,l);u.delay=fe(u.delay,c,r);const f=re(h,l,i[l],u,t);o.push(f)}}return Pt(o,s,s.duration)}}const he=de(Tt);function pe(t,e){var n={};for(var i in t)Object.prototype.hasOwnProperty.call(t,i)&&e.indexOf(i)<0&&(n[i]=t[i]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,i=Object.getOwnPropertySymbols(t);s<i.length;s++)e.indexOf(i[s])<0&&Object.prototype.propertyIsEnumerable.call(t,i[s])&&(n[i[s]]=t[i[s]]);return n}const ge={any:0,all:1};function st(t,e,{root:n,margin:i,amount:s="any"}={}){if(typeof IntersectionObserver>"u")return()=>{};const r=it(t),o=new WeakMap,c=l=>{l.forEach(u=>{const f=o.get(u.target);if(u.isIntersecting!==Boolean(f))if(u.isIntersecting){const a=e(u);x(a)?o.set(u.target,a):h.unobserve(u.target)}else f&&(f(u),o.delete(u.target))})},h=new IntersectionObserver(c,{root:n,rootMargin:i,threshold:typeof s=="number"?s:ge[s]});return r.forEach(l=>h.observe(l)),()=>h.disconnect()}const $=new WeakMap;let O;function me(t,e){if(e){const{inlineSize:n,blockSize:i}=e[0];return{width:n,height:i}}else return t instanceof SVGElement&&"getBBox"in t?t.getBBox():{width:t.offsetWidth,height:t.offsetHeight}}function ye({target:t,contentRect:e,borderBoxSize:n}){var i;(i=$.get(t))===null||i===void 0||i.forEach(s=>{s({target:t,contentSize:e,get size(){return me(t,n)}})})}function ve(t){t.forEach(ye)}function we(){typeof ResizeObserver>"u"||(O=new ResizeObserver(ve))}function xe(t,e){O||we();const n=it(t);return n.forEach(i=>{let s=$.get(i);s||(s=new Set,$.set(i,s)),s.add(e),O==null||O.observe(i)}),()=>{n.forEach(i=>{const s=$.get(i);s==null||s.delete(e),s!=null&&s.size||O==null||O.unobserve(i)})}}const B=new Set;let H;function be(){H=()=>{const t={width:window.innerWidth,height:window.innerHeight},e={target:window,size:t,contentSize:t};B.forEach(n=>n(e))},window.addEventListener("resize",H)}function Ee(t){return B.add(t),H||be(),()=>{B.delete(t),!B.size&&H&&(H=void 0)}}function Oe(t,e){return x(t)?Ee(t):xe(t,e)}const Se=50,dt=()=>({current:0,offset:[],progress:0,scrollLength:0,targetOffset:0,targetLength:0,containerLength:0,velocity:0}),Te=()=>({time:0,x:dt(),y:dt()}),Ae={x:{length:"Width",position:"Left"},y:{length:"Height",position:"Top"}};function ht(t,e,n,i){const s=n[e],{length:r,position:o}=Ae[e],c=s.current,h=n.time;s.current=t["scroll"+o],s.scrollLength=t["scroll"+r]-t["client"+r],s.offset.length=0,s.offset[0]=0,s.offset[1]=s.scrollLength,s.progress=U(0,s.scrollLength,s.current);const l=i-h;s.velocity=l>Se?0:kt(s.current-c,l)}function Le(t,e,n){ht(t,"x",e,n),ht(t,"y",e,n),e.time=n}function ze(t,e){let n={x:0,y:0},i=t;for(;i&&i!==e;)if(i instanceof HTMLElement)n.x+=i.offsetLeft,n.y+=i.offsetTop,i=i.offsetParent;else if(i instanceof SVGGraphicsElement&&"getBBox"in i){const{top:s,left:r}=i.getBBox();for(n.x+=r,n.y+=s;i&&i.tagName!=="svg";)i=i.parentNode}return n}const Pe={Enter:[[0,1],[1,1]],Exit:[[0,0],[1,0]],Any:[[1,0],[0,1]],All:[[0,0],[1,1]]},tt={start:0,center:.5,end:1};function pt(t,e,n=0){let i=0;if(tt[t]!==void 0&&(t=tt[t]),et(t)){const s=parseFloat(t);t.endsWith("px")?i=s:t.endsWith("%")?t=s/100:t.endsWith("vw")?i=s/100*document.documentElement.clientWidth:t.endsWith("vh")?i=s/100*document.documentElement.clientHeight:t=s}return z(t)&&(i=e*t),n+i}const Ie=[0,0];function Me(t,e,n,i){let s=Array.isArray(t)?t:Ie,r=0,o=0;return z(t)?s=[t,t]:et(t)&&(t=t.trim(),t.includes(" ")?s=t.split(" "):s=[t,tt[t]?t:"0"]),r=pt(s[0],n,i),o=pt(s[1],e),r-o}const We={x:0,y:0};function De(t,e,n){let{offset:i=Pe.All}=n;const{target:s=t,axis:r="y"}=n,o=r==="y"?"height":"width",c=s!==t?ze(s,t):We,h=s===t?{width:t.scrollWidth,height:t.scrollHeight}:{width:s.clientWidth,height:s.clientHeight},l={width:t.clientWidth,height:t.clientHeight};e[r].offset.length=0;let u=!e[r].interpolate;const f=i.length;for(let a=0;a<f;a++){const m=Me(i[a],l[o],h[o],c[r]);!u&&m!==e[r].interpolatorOffsets[a]&&(u=!0),e[r].offset[a]=m}u&&(e[r].interpolate=Et(bt(f),e[r].offset),e[r].interpolatorOffsets=[...e[r].offset]),e[r].progress=e[r].interpolate(e[r].current)}function Re(t,e=t,n){if(n.x.targetOffset=0,n.y.targetOffset=0,e!==t){let i=e;for(;i&&i!=t;)n.x.targetOffset+=i.offsetLeft,n.y.targetOffset+=i.offsetTop,i=i.offsetParent}n.x.targetLength=e===t?e.scrollWidth:e.clientWidth,n.y.targetLength=e===t?e.scrollHeight:e.clientHeight,n.x.containerLength=t.clientWidth,n.y.containerLength=t.clientHeight}function ke(t,e,n,i={}){const s=i.axis||"y";return{measure:()=>Re(t,i.target,n),update:r=>{Le(t,n,r),(i.offset||i.target)&&De(t,n,i)},notify:x(e)?()=>e(n):He(e,n[s])}}function He(t,e){return t.pause(),t.forEachNative((n,{easing:i})=>{var s,r;if(n.updateDuration)i||(n.easing=w),n.updateDuration(1);else{const o={duration:1e3};i||(o.easing="linear"),(r=(s=n.effect)===null||s===void 0?void 0:s.updateTiming)===null||r===void 0||r.call(s,o)}}),()=>{t.currentTime=e.progress}}const D=new WeakMap,gt=new WeakMap,Z=new WeakMap,mt=t=>t===document.documentElement?window:t;function It(t,e={}){var{container:n=document.documentElement}=e,i=pe(e,["container"]);let s=Z.get(n);s||(s=new Set,Z.set(n,s));const r=Te(),o=ke(n,t,r,i);if(s.add(o),!D.has(n)){const l=()=>{const f=performance.now();for(const a of s)a.measure();for(const a of s)a.update(f);for(const a of s)a.notify()};D.set(n,l);const u=mt(n);window.addEventListener("resize",l,{passive:!0}),n!==document.documentElement&&gt.set(n,Oe(n,l)),u.addEventListener("scroll",l,{passive:!0})}const c=D.get(n),h=requestAnimationFrame(c);return()=>{var l;typeof t!="function"&&t.stop(),cancelAnimationFrame(h);const u=Z.get(n);if(!u||(u.delete(o),u.size))return;const f=D.get(n);D.delete(n),f&&(mt(n).removeEventListener("scroll",f),(l=gt.get(n))===null||l===void 0||l(),window.removeEventListener("resize",f))}}function Fe(t,e={}){return Pt([()=>{const n=new Tt(t,[0,1],e);return n.finished.catch(()=>{}),n}],e,e.duration)}function d(t,e,n){return(x(t)?Fe:he)(t,e,n)}It(d(".progress-bar",{scaleX:[0,1]}));const Ve=document.querySelectorAll(".video-scroller");Ve.forEach(t=>{const e=t.querySelector("video");e.pause(),It(({y:n})=>{e.readyState&&(e.currentTime=e.duration*n.progress)},{target:t})});st(".stockanimation",()=>(d(".stock1",{x:[-2e3,0]},{duration:2}),d(".stock3",{x:[-1e3,0]},{duration:2}),d(".stock4",{x:[-500,0]},{duration:2}),d(".stock5",{x:[-2e3,0]},{duration:2}),d(".stock6",{x:[2e3,0]},{duration:2}),d(".stock7",{x:[1500,0]},{duration:2}),d(".stock8",{x:[1e3,0]},{duration:2}),d(".stock9",{x:[500,0]},{duration:2}),d(".stock10",{x:[2e3,0]},{duration:2}),()=>{d(".stock1",{x:[-2e3,0]},{duration:2}),d(".stock3",{x:[-1e3,0]},{duration:2}),d(".stock4",{x:[-500,0]},{duration:2}),d(".stock5",{x:[-2e3,0]},{duration:2}),d(".stock6",{x:[2e3,0]},{duration:2}),d(".stock7",{x:[1500,0]},{duration:2}),d(".stock8",{x:[1e3,0]},{duration:2}),d(".stock9",{x:[500,0]},{duration:2}),d(".stock10",{x:[2e3,0]},{duration:2})}));d("body",{opacity:[0,1]},{duration:5});st(".textinview",()=>{d(".textinview",{x:[-2e3,0]},{duration:1})});st(".inviewnotinview",({target:t})=>(d(t,{rotate:-180},{delay:1,duration:2}),()=>{d(t,{rotate:0})}));