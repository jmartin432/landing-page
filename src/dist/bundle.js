!function(t){var e={};function n(i){if(e[i])return e[i].exports;var o=e[i]={i:i,l:!1,exports:{}};return t[i].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=t,n.c=e,n.d=function(t,e,i){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(i,o,function(e){return t[e]}.bind(null,o));return i},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=0)}([function(t,e,n){"use strict";n.r(e);const i=[{id:"instagram",text:"See My Instagram",altText:"See My Instagram",link:"https://www.instagram.com/jugglingtallguy/",mobileLink:"instagram://user?username=jugglingtallguy"},{id:"whatsapp",text:"Contact Me on WhatsApp",altText:"Contact Me on WhatsApp",link:"https://wa.me/14135193798",mobileLink:"https://wa.me/14135193798"},{id:"email",text:"Send Me an E-mail",altText:"Send Me an E-mail",link:"mailto:info@justinlmartin.com",mobileLink:"mailto:info@justinlmartin.com"},{id:"venmo",text:"Send Me Money on Venmo",altText:"Send Me Money on Venmo",link:"https://www.venmo.com/u/justinlmartin",mobileLink:"https://www.venmo.com/justinlmartin?txn=pay"},{id:"github",text:"My Github",altText:"My Github",link:"https://github.com/jmartin432",mobileLink:"https://github.com/jmartin432"}],o=.5*(Math.sqrt(3)-1),s=(3-Math.sqrt(3))/6,r=1/6,a=(Math.sqrt(5)-1)/4,l=(5-Math.sqrt(5))/20,h=new Float32Array([1,1,0,-1,1,0,1,-1,0,-1,-1,0,1,0,1,-1,0,1,1,0,-1,-1,0,-1,0,1,1,0,-1,1,0,1,-1,0,-1,-1]),d=new Float32Array([0,1,1,1,0,1,1,-1,0,1,-1,1,0,1,-1,-1,0,-1,1,1,0,-1,1,-1,0,-1,-1,1,0,-1,-1,-1,1,0,1,1,1,0,1,-1,1,0,-1,1,1,0,-1,-1,-1,0,1,1,-1,0,1,-1,-1,0,-1,1,-1,0,-1,-1,1,1,0,1,1,1,0,-1,1,-1,0,1,1,-1,0,-1,-1,1,0,1,-1,1,0,-1,-1,-1,0,1,-1,-1,0,-1,1,1,1,0,1,1,-1,0,1,-1,1,0,1,-1,-1,0,-1,1,1,0,-1,1,-1,0,-1,-1,1,0,-1,-1,-1,0]);const c=new class{constructor(t=Math.random){const e="function"==typeof t?t:function(t){let e=0,n=0,i=0,o=1;const s=function(){let t=4022871197;return function(e){e=e.toString();for(let n=0;n<e.length;n++){t+=e.charCodeAt(n);let i=.02519603282416938*t;t=i>>>0,i-=t,i*=t,t=i>>>0,i-=t,t+=4294967296*i}return 2.3283064365386963e-10*(t>>>0)}}();e=s(" "),n=s(" "),i=s(" "),e-=s(t),e<0&&(e+=1);n-=s(t),n<0&&(n+=1);i-=s(t),i<0&&(i+=1);return function(){const t=2091639*e+2.3283064365386963e-10*o;return e=n,n=i,i=t-(o=0|t)}}(t);this.p=function(t){const e=new Uint8Array(256);for(let t=0;t<256;t++)e[t]=t;for(let n=0;n<255;n++){const i=n+~~(t()*(256-n)),o=e[n];e[n]=e[i],e[i]=o}return e}(e),this.perm=new Uint8Array(512),this.permMod12=new Uint8Array(512);for(let t=0;t<512;t++)this.perm[t]=this.p[255&t],this.permMod12[t]=this.perm[t]%12}noise2D(t,e){const n=this.permMod12,i=this.perm;let r=0,a=0,l=0;const d=(t+e)*o,c=Math.floor(t+d),p=Math.floor(e+d),u=(c+p)*s,m=t-(c-u),g=e-(p-u);let f,w;m>g?(f=1,w=0):(f=0,w=1);const y=m-f+s,v=g-w+s,x=m-1+2*s,C=g-1+2*s,E=255&c,b=255&p;let S=.5-m*m-g*g;if(S>=0){const t=3*n[E+i[b]];S*=S,r=S*S*(h[t]*m+h[t+1]*g)}let M=.5-y*y-v*v;if(M>=0){const t=3*n[E+f+i[b+w]];M*=M,a=M*M*(h[t]*y+h[t+1]*v)}let k=.5-x*x-C*C;if(k>=0){const t=3*n[E+1+i[b+1]];k*=k,l=k*k*(h[t]*x+h[t+1]*C)}return 70*(r+a+l)}noise3D(t,e,n){const i=this.permMod12,o=this.perm;let s,a,l,d;const c=(t+e+n)*(1/3),p=Math.floor(t+c),u=Math.floor(e+c),m=Math.floor(n+c),g=(p+u+m)*r,f=t-(p-g),w=e-(u-g),y=n-(m-g);let v,x,C,E,b,S;f>=w?w>=y?(v=1,x=0,C=0,E=1,b=1,S=0):f>=y?(v=1,x=0,C=0,E=1,b=0,S=1):(v=0,x=0,C=1,E=1,b=0,S=1):w<y?(v=0,x=0,C=1,E=0,b=1,S=1):f<y?(v=0,x=1,C=0,E=0,b=1,S=1):(v=0,x=1,C=0,E=1,b=1,S=0);const M=f-v+r,k=w-x+r,P=y-C+r,B=f-E+2*r,A=w-b+2*r,N=y-S+2*r,D=f-1+.5,O=w-1+.5,L=y-1+.5,j=255&p,I=255&u,T=255&m;let G=.6-f*f-w*w-y*y;if(G<0)s=0;else{const t=3*i[j+o[I+o[T]]];G*=G,s=G*G*(h[t]*f+h[t+1]*w+h[t+2]*y)}let X=.6-M*M-k*k-P*P;if(X<0)a=0;else{const t=3*i[j+v+o[I+x+o[T+C]]];X*=X,a=X*X*(h[t]*M+h[t+1]*k+h[t+2]*P)}let Y=.6-B*B-A*A-N*N;if(Y<0)l=0;else{const t=3*i[j+E+o[I+b+o[T+S]]];Y*=Y,l=Y*Y*(h[t]*B+h[t+1]*A+h[t+2]*N)}let q=.6-D*D-O*O-L*L;if(q<0)d=0;else{const t=3*i[j+1+o[I+1+o[T+1]]];q*=q,d=q*q*(h[t]*D+h[t+1]*O+h[t+2]*L)}return 32*(s+a+l+d)}noise4D(t,e,n,i){const o=this.perm;let s,r,h,c,p;const u=(t+e+n+i)*a,m=Math.floor(t+u),g=Math.floor(e+u),f=Math.floor(n+u),w=Math.floor(i+u),y=(m+g+f+w)*l,v=t-(m-y),x=e-(g-y),C=n-(f-y),E=i-(w-y);let b=0,S=0,M=0,k=0;v>x?b++:S++,v>C?b++:M++,v>E?b++:k++,x>C?S++:M++,x>E?S++:k++,C>E?M++:k++;const P=b>=3?1:0,B=S>=3?1:0,A=M>=3?1:0,N=k>=3?1:0,D=b>=2?1:0,O=S>=2?1:0,L=M>=2?1:0,j=k>=2?1:0,I=b>=1?1:0,T=S>=1?1:0,G=M>=1?1:0,X=k>=1?1:0,Y=v-P+l,q=x-B+l,_=C-A+l,z=E-N+l,F=v-D+2*l,R=x-O+2*l,H=C-L+2*l,U=E-j+2*l,W=v-I+3*l,V=x-T+3*l,J=C-G+3*l,K=E-X+3*l,Q=v-1+4*l,Z=x-1+4*l,$=C-1+4*l,tt=E-1+4*l,et=255&m,nt=255&g,it=255&f,ot=255&w;let st=.6-v*v-x*x-C*C-E*E;if(st<0)s=0;else{const t=o[et+o[nt+o[it+o[ot]]]]%32*4;st*=st,s=st*st*(d[t]*v+d[t+1]*x+d[t+2]*C+d[t+3]*E)}let rt=.6-Y*Y-q*q-_*_-z*z;if(rt<0)r=0;else{const t=o[et+P+o[nt+B+o[it+A+o[ot+N]]]]%32*4;rt*=rt,r=rt*rt*(d[t]*Y+d[t+1]*q+d[t+2]*_+d[t+3]*z)}let at=.6-F*F-R*R-H*H-U*U;if(at<0)h=0;else{const t=o[et+D+o[nt+O+o[it+L+o[ot+j]]]]%32*4;at*=at,h=at*at*(d[t]*F+d[t+1]*R+d[t+2]*H+d[t+3]*U)}let lt=.6-W*W-V*V-J*J-K*K;if(lt<0)c=0;else{const t=o[et+I+o[nt+T+o[it+G+o[ot+X]]]]%32*4;lt*=lt,c=lt*lt*(d[t]*W+d[t+1]*V+d[t+2]*J+d[t+3]*K)}let ht=.6-Q*Q-Z*Z-$*$-tt*tt;if(ht<0)p=0;else{const t=o[et+1+o[nt+1+o[it+1+o[ot+1]]]]%32*4;ht*=ht,p=ht*ht*(d[t]*Q+d[t+1]*Z+d[t+2]*$+d[t+3]*tt)}return 27*(s+r+h+c+p)}};function p(t,e){for(let n in e)t.setAttribute(n,e[n])}function u(t,e,n){return"hsl("+t.toString()+","+e.toString()+"%,"+n.toString()+"%)"}function m(t,e){return c.noise2D(t,e)}function g(t,e){this.type="anchor",this.angle=t,this.radius=e,this.x=Math.cos(t)*e,this.y=Math.sin(t)*e}function f(t,e){this.type="control",this.angle=t,this.radius=e,this.noiseOffsetX=1e3*Math.random(),this.noiseOffsetY=1e3*Math.random(),this.radiusDelta=.1*m(this.noiseOffsetX,this.noiseOffsetY),this.x=Math.cos(t)*(e+this.radiusDelta),this.y=Math.sin(t)*(e+this.radiusDelta),this.updateNoiseOffsets=function(t){return this.noiseOffsetX+=t,this.noiseOffsetY+=t,this},this.updateRadiusDelta=function(){return this.radiusDelta=.1*m(this.noiseOffsetX,this.noiseOffsetY),this},this.updateXY=function(){return this.x=Math.cos(this.angle)*(this.radius+this.radiusDelta),this.y=Math.sin(this.angle)*(this.radius+this.radiusDelta),this}}function w(t,e){this.type="reflected-control",this.x=2*t.x-e.x,this.y=2*t.y-e.y,this.updateXY=function(t,e){return this.x=2*t.x-e.x,this.y=2*t.y-e.y,this}}function y(t,e,n,i){this.id=t,this.size=e,this.radius=n,this.angleStep=2*Math.PI/e,this.noiseStep=i,this.points=[],this.path="",this.hue=Math.floor(360*Math.random()),this.pathElement=document.getElementById(this.id+"-path"),this.borderGlowElement=document.getElementById(this.id+"-border-glow"),this.borderElement=document.getElementById(this.id+"-border"),this.containerDiv=document.getElementById(this.id+"-container"),this.containerDiv.addEventListener("mouseenter",()=>{this.noiseStep=.015}),this.containerDiv.addEventListener("touchenter",()=>{this.noiseStep=.015}),this.containerDiv.addEventListener("mouseleave",()=>{this.noiseStep=.005}),this.containerDiv.addEventListener("touchleave",()=>{this.noiseStep=.005}),this.createPoints=function(){let t=[];for(let e=0;e<this.size;e++){let n=e*this.angleStep,i=new g(n,this.radius),o=new f(n+1/3*this.angleStep,this.radius),s=new w(i,o);t.push(s,i,o)}return this.points=t,this},this.updatePoints=function(){for(let t=0;t<this.size;t++){const e=this.points[3*t],n=this.points[3*t+1],i=this.points[3*t+2];i.updateNoiseOffsets(this.noiseStep).updateRadiusDelta().updateXY(),e.updateXY(n,i)}return this},this.makePath=function(){let t="M "+this.points[1].x+" "+this.points[1].y;for(let e=2;e<this.points.length-2;e+=3)t=t+" C "+this.points[e].x+" "+this.points[e].y+" "+this.points[e+1].x+" "+this.points[e+1].y+" "+this.points[e+2].x+" "+this.points[e+2].y;return t=t+" C "+this.points[this.points.length-1].x+" "+this.points[this.points.length-1].y+" "+this.points[0].x+" "+this.points[0].y+" "+this.points[1].x+" "+this.points[1].y,this.path=t,this},this.setPathElementData=function(){return this.pathElement.setAttribute("d",this.path),this},this.setBorderGlowColor=function(){this.borderGlowElement.setAttribute("stroke",u(this.hue,50,65))},this.setBorderColor=function(){this.borderElement.setAttribute("stroke",u(this.hue,100,50))},this.setBackGroundColorClipPath=function(){"header-image"!==this.id&&this.containerDiv.setAttribute("style","clip-path: url(#"+this.id+"-clip-path);background-color: "+u(this.hue,50,75))}}function v(t){let e=document.createElementNS("http://www.w3.org/2000/svg","path");return p(e,{id:t,class:"svg-path border","vector-effect":"non-scaling-stroke",transform:"translate(.5,.5) scale(.5)"}),e}function x(t){let e=document.createElementNS("http://www.w3.org/2000/svg","clipPath");return p(e,{id:t,class:"svg-clip-path",clipPathUnits:"objectBoundingBox"}),e}function C(t){let e=document.createElementNS("http://www.w3.org/2000/svg","use");return p(e,{href:t}),e}let E;function b(t){let e=t.getAttribute("stop-color").replace(/(hsl)+|[%()]+/g,"").split(",").map(t=>parseInt(t));e[0]=(e[0]+1)%360,t.setAttribute("stop-color",u(e[0],e[1],e[2]))}const S=new Promise((t,e)=>{t([/Android/i,/webOS/i,/iPhone/i,/iPad/i,/iPod/i,/BlackBerry/i,/Windows Phone/i].some(t=>navigator.userAgent.match(t)))});function M(t){let e=window.innerWidth,n=Math.floor(.048*e);document.getElementById("header").style.fontSize=(n+10).toString()+"px";let i=document.querySelectorAll(".link-container"),o=document.querySelectorAll(".link-text");for(let e=0;e<i.length;e++)i[e].style.margin=t?"65px auto":"25px auto",o[e].style.fontSize=n.toString()+"px"}window.onload=async t=>{const e=[];await function(){let t=document.getElementById("svg-defs-container"),e=document.createElementNS("http://www.w3.org/2000/svg","svg"),n=document.createElementNS("http://www.w3.org/2000/svg","defs");p(n,{id:"svg-defs"}),t.appendChild(e),e.appendChild(n),n.appendChild(v("header-image-path"));let o=x("header-image-clip-path");o.appendChild(C("#header-image-path")),n.appendChild(o),n.appendChild(v("header-path"));let s=x("header-clip-path");s.appendChild(C("#header-path")),n.appendChild(s);for(let t=0;t<i.length;t++){n.appendChild(v("link-"+t+"-path"));let e=x("link-"+t+"-clip-path");e.appendChild(C("#link-"+t+"-path")),n.appendChild(e)}let r=document.createElementNS("http://www.w3.org/2000/svg","filter");p(r,{id:"glow",x:"-10%",y:"-10%",width:"120%",height:"120%"});let a=document.createElementNS("http://www.w3.org/2000/svg","feGaussianBlur");p(a,{result:"coloredBlur",stdDeviation:".015"}),r.appendChild(a),n.appendChild(r);let l=document.createElementNS("http://www.w3.org/2000/svg","radialGradient");l.setAttribute("id","eye-gradient");for(let t=0;t<3;t++){let e=document.createElementNS("http://www.w3.org/2000/svg","stop");p(e,{class:"gradient-stop",id:"eye-gradient-stop-"+t.toString(),"stop-color":u(Math.floor(360*Math.random()),50,75),offset:(50*t).toString()+"%"}),l.appendChild(e)}n.appendChild(l),e.appendChild(n),t.appendChild(e)}(),await function(){let t=document.getElementById("header-image-container"),e=document.createElementNS("http://www.w3.org/2000/svg","svg");p(e,{id:"header-svg",viewBox:"0 0 1 1"});let n=document.createElementNS("http://www.w3.org/2000/svg","g");p(n,{id:"header-svg-group"});let i=document.createElementNS("http://www.w3.org/2000/svg","circle");p(i,{id:"background-circle",cx:".5",cy:".5",r:".5",fill:"url(#eye-gradient)",style:"clip-path: url(#header-image-clip-path);"});let o=document.createElementNS("http://www.w3.org/2000/svg","circle");p(o,{id:"eye-circle-1",cx:".31",cy:".5",r:".115",fill:"url(#eye-gradient)"});let s=document.createElementNS("http://www.w3.org/2000/svg","circle");p(s,{id:"eye-circle-2",cx:".62",cy:".425",r:".115",fill:"url(#eye-gradient)"});let r=document.createElementNS("http://www.w3.org/2000/svg","image");p(r,{class:"header-image",id:"header-image",style:"clip-path: url(#header-image-clip-path);",width:1,height:1});let a=document.createElementNS("http://www.w3.org/2000/svg","use");p(a,{class:"border-glow",id:"header-image-border-glow",href:"#header-image-path",filter:"url(#glow)","stroke-width":"10"});let l=document.createElementNS("http://www.w3.org/2000/svg","use");p(l,{class:"border",id:"header-image-border",href:"#header-image-path","stroke-width":"2"}),n.appendChild(i),n.appendChild(o),n.appendChild(s),n.appendChild(r),n.appendChild(a),n.appendChild(l),e.appendChild(n),t.appendChild(e)}(),await void p(document.getElementById("header-image"),{href:"images/landingPageFaceFullClip-500.png"}),S.then(async t=>{await async function(t){let e=document.getElementById("links-container");for(let n=0;n<i.length;n++){let o=document.createElement("div");p(o,{class:"link-container",id:"link-"+n+"-main-container"});let s=document.createElement("div");p(s,{id:"link-"+n+"-container",class:"link-clip-div"});let r,a=document.createElement("div");p(a,{class:"link-text-box"}),"postcard"===i[n].id?(r=document.createElement("span"),p(r,{class:"link-text"}),r.textContent=i[n].text,o.addEventListener("mouseenter",(function(){r.textContent="",r.innerHTML="<span>PO Box 11967</span><br><span>Portland OR, 97211</span>"})),o.addEventListener("touchenter",(function(){r.textContent="",r.innerHTML="<span>PO Box 11967</span><br><span>Portland OR, 97211</span>"})),o.addEventListener("mouseleave",(function(){r.innerHTML="",r.textContent="Send Me a Postcard"})),o.addEventListener("touchleave",(function(){r.innerHTML="",r.textContent="Send Me a Postcard"}))):(r=document.createElement("a"),p(r,{class:"link-text",href:t?i[n].mobileLink:i[n].link,target:"_blank"}),r.textContent=i[n].text);let l=document.createElement("div");p(l,{class:"link-svg-container"});let h=document.createElementNS("http://www.w3.org/2000/svg","svg");p(h,{id:"link-"+n+"-svg",viewBox:"0 0 1 1",preserveAspectRatio:"none"});let d=document.createElementNS("http://www.w3.org/2000/svg","g"),c=document.createElementNS("http://www.w3.org/2000/svg","use");p(c,{class:"border-glow",id:"link-"+n+"-border-glow",href:"#link-"+n+"-path",filter:"url(#glow)","stroke-width":"10"});let u=document.createElementNS("http://www.w3.org/2000/svg","use");p(u,{class:"border",id:"link-"+n+"-border",href:"#link-"+n+"-path","stroke-width":"2"}),e.appendChild(o),o.appendChild(s),s.appendChild(a),a.appendChild(r),o.appendChild(l),l.appendChild(h),h.appendChild(d),d.append(c),d.appendChild(u)}}(t),function(){let t=document.getElementById("footer-container"),e=document.createElement("footer"),n=document.createElement("span");n.textContent="🦄",n.setAttribute("id","unicorn-unflipped");let i=document.createElement("span");i.textContent=" I made this myself! ";let o=document.createElement("span");o.textContent="🦄",o.setAttribute("id","unicorn-flip"),e.appendChild(n),e.appendChild(i),e.appendChild(o),t.appendChild(e)}(),M(t),function(t){let e=i.length;t.push(new y("header-image",8,.93,.005));for(let n=0;n<e;n++)t.push(new y("link-"+n,8,.93,.005));for(let e=0;e<t.length;e++)t[e].createPoints().makePath().setPathElementData(),t[e].setBorderGlowColor(),t[e].setBorderColor(),t[e].setBackGroundColorClipPath()}(e)}),function(t){const e=document.getElementsByClassName("gradient-stop");!function n(){for(let e=0;e<t.length;e++)t[e].updatePoints().makePath().setPathElementData();for(let t=0;t<e.length;t++)b(e[t]);E=requestAnimationFrame(n)}()}(e)},window.onresize=t=>{S.then(t=>{M(t)})}}]);