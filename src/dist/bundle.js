!function(t){var e={};function n(i){if(e[i])return e[i].exports;var o=e[i]={i:i,l:!1,exports:{}};return t[i].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=t,n.c=e,n.d=function(t,e,i){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(i,o,function(e){return t[e]}.bind(null,o));return i},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=0)}([function(t,e,n){"use strict";n.r(e);const i=[{id:"instagram",text:"My Instagram",altText:"My Instagram",link:"https://www.instagram.com/jugglingtallguy/",mobileLink:"instagram://user?username=jugglingtallguy"},{id:"email",text:"Send Me an E-mail",altText:"Send Me an E-mail",link:"mailto:info@justinlmartin.com",mobileLink:"mailto:info@justinlmartin.com"},{id:"postcard",text:"Send Me a Postcard",altText:"PO Box 14011, Portland OR, 97293",link:"",mobileLink:""},{id:"venmo",text:"Send Me Money on Venmo",altText:"Send Me Money on Venmo",link:"https://www.venmo.com/u/justinlmartin",mobileLink:"https://www.venmo.com/justinlmartin?txn=pay"},{id:"coding-portfolio",text:"Coding Portfolio",altText:"Coding Portfolio",link:"https://coding-portfolio.justinlmartin.com",mobileLink:"https://coding-portfolio.justinlmartin.com"},{id:"github",text:"My Github",altText:"My Github",link:"https://github.com/jmartin432",mobileLink:"https://github.com/jmartin432"}],o=.5*(Math.sqrt(3)-1),s=(3-Math.sqrt(3))/6,r=1/6,l=(Math.sqrt(5)-1)/4,a=(5-Math.sqrt(5))/20,h=new Float32Array([1,1,0,-1,1,0,1,-1,0,-1,-1,0,1,0,1,-1,0,1,1,0,-1,-1,0,-1,0,1,1,0,-1,1,0,1,-1,0,-1,-1]),d=new Float32Array([0,1,1,1,0,1,1,-1,0,1,-1,1,0,1,-1,-1,0,-1,1,1,0,-1,1,-1,0,-1,-1,1,0,-1,-1,-1,1,0,1,1,1,0,1,-1,1,0,-1,1,1,0,-1,-1,-1,0,1,1,-1,0,1,-1,-1,0,-1,1,-1,0,-1,-1,1,1,0,1,1,1,0,-1,1,-1,0,1,1,-1,0,-1,-1,1,0,1,-1,1,0,-1,-1,-1,0,1,-1,-1,0,-1,1,1,1,0,1,1,-1,0,1,-1,1,0,1,-1,-1,0,-1,1,1,0,-1,1,-1,0,-1,-1,1,0,-1,-1,-1,0]);const c=new class{constructor(t=Math.random){const e="function"==typeof t?t:function(t){let e=0,n=0,i=0,o=1;const s=function(){let t=4022871197;return function(e){e=e.toString();for(let n=0;n<e.length;n++){t+=e.charCodeAt(n);let i=.02519603282416938*t;t=i>>>0,i-=t,i*=t,t=i>>>0,i-=t,t+=4294967296*i}return 2.3283064365386963e-10*(t>>>0)}}();e=s(" "),n=s(" "),i=s(" "),e-=s(t),e<0&&(e+=1);n-=s(t),n<0&&(n+=1);i-=s(t),i<0&&(i+=1);return function(){const t=2091639*e+2.3283064365386963e-10*o;return e=n,n=i,i=t-(o=0|t)}}(t);this.p=function(t){const e=new Uint8Array(256);for(let t=0;t<256;t++)e[t]=t;for(let n=0;n<255;n++){const i=n+~~(t()*(256-n)),o=e[n];e[n]=e[i],e[i]=o}return e}(e),this.perm=new Uint8Array(512),this.permMod12=new Uint8Array(512);for(let t=0;t<512;t++)this.perm[t]=this.p[255&t],this.permMod12[t]=this.perm[t]%12}noise2D(t,e){const n=this.permMod12,i=this.perm;let r=0,l=0,a=0;const d=(t+e)*o,c=Math.floor(t+d),p=Math.floor(e+d),u=(c+p)*s,m=t-(c-u),f=e-(p-u);let g,w;m>f?(g=1,w=0):(g=0,w=1);const y=m-g+s,x=f-w+s,v=m-1+2*s,M=f-1+2*s,E=255&c,S=255&p;let b=.5-m*m-f*f;if(b>=0){const t=3*n[E+i[S]];b*=b,r=b*b*(h[t]*m+h[t+1]*f)}let C=.5-y*y-x*x;if(C>=0){const t=3*n[E+g+i[S+w]];C*=C,l=C*C*(h[t]*y+h[t+1]*x)}let k=.5-v*v-M*M;if(k>=0){const t=3*n[E+1+i[S+1]];k*=k,a=k*k*(h[t]*v+h[t+1]*M)}return 70*(r+l+a)}noise3D(t,e,n){const i=this.permMod12,o=this.perm;let s,l,a,d;const c=(t+e+n)*(1/3),p=Math.floor(t+c),u=Math.floor(e+c),m=Math.floor(n+c),f=(p+u+m)*r,g=t-(p-f),w=e-(u-f),y=n-(m-f);let x,v,M,E,S,b;g>=w?w>=y?(x=1,v=0,M=0,E=1,S=1,b=0):g>=y?(x=1,v=0,M=0,E=1,S=0,b=1):(x=0,v=0,M=1,E=1,S=0,b=1):w<y?(x=0,v=0,M=1,E=0,S=1,b=1):g<y?(x=0,v=1,M=0,E=0,S=1,b=1):(x=0,v=1,M=0,E=1,S=1,b=0);const C=g-x+r,k=w-v+r,P=y-M+r,O=g-E+2*r,N=w-S+2*r,A=y-b+2*r,j=g-1+.5,B=w-1+.5,D=y-1+.5,L=255&p,T=255&u,I=255&m;let X=.6-g*g-w*w-y*y;if(X<0)s=0;else{const t=3*i[L+o[T+o[I]]];X*=X,s=X*X*(h[t]*g+h[t+1]*w+h[t+2]*y)}let Y=.6-C*C-k*k-P*P;if(Y<0)l=0;else{const t=3*i[L+x+o[T+v+o[I+M]]];Y*=Y,l=Y*Y*(h[t]*C+h[t+1]*k+h[t+2]*P)}let q=.6-O*O-N*N-A*A;if(q<0)a=0;else{const t=3*i[L+E+o[T+S+o[I+b]]];q*=q,a=q*q*(h[t]*O+h[t+1]*N+h[t+2]*A)}let _=.6-j*j-B*B-D*D;if(_<0)d=0;else{const t=3*i[L+1+o[T+1+o[I+1]]];_*=_,d=_*_*(h[t]*j+h[t+1]*B+h[t+2]*D)}return 32*(s+l+a+d)}noise4D(t,e,n,i){const o=this.perm;let s,r,h,c,p;const u=(t+e+n+i)*l,m=Math.floor(t+u),f=Math.floor(e+u),g=Math.floor(n+u),w=Math.floor(i+u),y=(m+f+g+w)*a,x=t-(m-y),v=e-(f-y),M=n-(g-y),E=i-(w-y);let S=0,b=0,C=0,k=0;x>v?S++:b++,x>M?S++:C++,x>E?S++:k++,v>M?b++:C++,v>E?b++:k++,M>E?C++:k++;const P=S>=3?1:0,O=b>=3?1:0,N=C>=3?1:0,A=k>=3?1:0,j=S>=2?1:0,B=b>=2?1:0,D=C>=2?1:0,L=k>=2?1:0,T=S>=1?1:0,I=b>=1?1:0,X=C>=1?1:0,Y=k>=1?1:0,q=x-P+a,_=v-O+a,z=M-N+a,R=E-A+a,F=x-j+2*a,G=v-B+2*a,H=M-D+2*a,U=E-L+2*a,V=x-T+3*a,W=v-I+3*a,J=M-X+3*a,K=E-Y+3*a,Q=x-1+4*a,Z=v-1+4*a,$=M-1+4*a,tt=E-1+4*a,et=255&m,nt=255&f,it=255&g,ot=255&w;let st=.6-x*x-v*v-M*M-E*E;if(st<0)s=0;else{const t=o[et+o[nt+o[it+o[ot]]]]%32*4;st*=st,s=st*st*(d[t]*x+d[t+1]*v+d[t+2]*M+d[t+3]*E)}let rt=.6-q*q-_*_-z*z-R*R;if(rt<0)r=0;else{const t=o[et+P+o[nt+O+o[it+N+o[ot+A]]]]%32*4;rt*=rt,r=rt*rt*(d[t]*q+d[t+1]*_+d[t+2]*z+d[t+3]*R)}let lt=.6-F*F-G*G-H*H-U*U;if(lt<0)h=0;else{const t=o[et+j+o[nt+B+o[it+D+o[ot+L]]]]%32*4;lt*=lt,h=lt*lt*(d[t]*F+d[t+1]*G+d[t+2]*H+d[t+3]*U)}let at=.6-V*V-W*W-J*J-K*K;if(at<0)c=0;else{const t=o[et+T+o[nt+I+o[it+X+o[ot+Y]]]]%32*4;at*=at,c=at*at*(d[t]*V+d[t+1]*W+d[t+2]*J+d[t+3]*K)}let ht=.6-Q*Q-Z*Z-$*$-tt*tt;if(ht<0)p=0;else{const t=o[et+1+o[nt+1+o[it+1+o[ot+1]]]]%32*4;ht*=ht,p=ht*ht*(d[t]*Q+d[t+1]*Z+d[t+2]*$+d[t+3]*tt)}return 27*(s+r+h+c+p)}};function p(t,e){for(let n in e)t.setAttribute(n,e[n])}function u(t,e,n){return"hsl("+t.toString()+","+e.toString()+"%,"+n.toString()+"%)"}function m(t,e){return c.noise2D(t,e)}function f(t,e){this.type="anchor",this.angle=t,this.radius=e,this.x=Math.cos(t)*e,this.y=Math.sin(t)*e}function g(t,e){this.type="control",this.angle=t,this.radius=e,this.noiseOffsetX=1e3*Math.random(),this.noiseOffsetY=1e3*Math.random(),this.radiusDelta=.1*m(this.noiseOffsetX,this.noiseOffsetY),this.x=Math.cos(t)*(e+this.radiusDelta),this.y=Math.sin(t)*(e+this.radiusDelta)}function w(t,e){this.type="reflected-control",this.x=2*t.x-e.x,this.y=2*t.y-e.y}function y(t,e,n,i){this.id=t,this.size=e,this.radius=n,this.angleStep=2*Math.PI/e,this.noiseStep=i,this.points=[],this.path="",this.hue=Math.floor(360*Math.random()),this.pathElement=document.createElementNS("http://www.w3.org/2000/svg","path");let o=document.getElementById("svg-defs");p(this.pathElement,{id:this.id+"-path",class:"svg-path border","vector-effect":"non-scaling-stroke",transform:"translate(.5,.5) scale(.5)"}),o.appendChild(this.pathElement);let s=document.createElementNS("http://www.w3.org/2000/svg","clipPath");p(s,{id:this.id+"-clip-path",class:"svg-clip-path",clipPathUnits:"objectBoundingBox"});let r=document.createElementNS("http://www.w3.org/2000/svg","use");p(r,{href:"#"+t+"-path"}),s.appendChild(r),o.appendChild(s)}let x;function v(t){let e=t.getAttribute("stop-color").replace(/(hsl)+|[%()]+/g,"").split(",").map(t=>parseInt(t));e[0]=(e[0]+1)%360,t.setAttribute("stop-color",u(e[0],e[1],e[2]))}g.prototype.updateNoiseOffsets=function(t){return this.noiseOffsetX+=t,this.noiseOffsetY+=t,this},g.prototype.updateRadiusDelta=function(){return this.radiusDelta=.1*m(this.noiseOffsetX,this.noiseOffsetY),this},g.prototype.updateXY=function(){return this.x=Math.cos(this.angle)*(this.radius+this.radiusDelta),this.y=Math.sin(this.angle)*(this.radius+this.radiusDelta),this},w.prototype.updateXY=function(t,e){return this.x=2*t.x-e.x,this.y=2*t.y-e.y,this},y.prototype.createPoints=function(){let t=[];for(let e=0;e<this.size;e++){let n=e*this.angleStep,i=new f(n,this.radius),o=new g(n+1/3*this.angleStep,this.radius),s=new w(i,o);t.push(s,i,o)}return this.points=t,this},y.prototype.updatePoints=function(){for(let t=0;t<this.size;t++){const e=this.points[3*t],n=this.points[3*t+1],i=this.points[3*t+2];i.updateNoiseOffsets(this.noiseStep).updateRadiusDelta().updateXY(),e.updateXY(n,i)}return this},y.prototype.makePath=function(){let t="M "+this.points[1].x+" "+this.points[1].y;for(let e=2;e<this.points.length-2;e+=3)t=t+" C "+this.points[e].x+" "+this.points[e].y+" "+this.points[e+1].x+" "+this.points[e+1].y+" "+this.points[e+2].x+" "+this.points[e+2].y;return t=t+" C "+this.points[this.points.length-1].x+" "+this.points[this.points.length-1].y+" "+this.points[0].x+" "+this.points[0].y+" "+this.points[1].x+" "+this.points[1].y,this.path=t,this},y.prototype.setPathElementData=function(){return this.pathElement.setAttribute("d",this.path),this};const M=new Promise((t,e)=>{t([/Android/i,/webOS/i,/iPhone/i,/iPad/i,/iPod/i,/BlackBerry/i,/Windows Phone/i].some(t=>navigator.userAgent.match(t)))});function E(t){let e=window.innerWidth,n=Math.floor(.048*e);document.getElementById("header").style.fontSize=(n+10).toString()+"px";let i=document.querySelectorAll(".link-container"),o=document.querySelectorAll(".link-text");for(let e=0;e<i.length;e++)i[e].style.margin=t?"65px auto":"25px auto",o[e].style.fontSize=n.toString()+"px"}window.onload=t=>{const e=[];!function(){let t=document.getElementById("footer-container"),e=document.createElement("footer"),n=document.createElement("span");n.textContent="🦄",n.setAttribute("id","unicorn-unflipped");let i=document.createElement("span");i.textContent=" I made this myself! ";let o=document.createElement("span");o.textContent="🦄",o.setAttribute("id","unicorn-flip"),e.appendChild(n),e.appendChild(i),e.appendChild(o),t.appendChild(e)}(),function(t){let e=i.length,n=document.getElementById("svg-defs-container"),o=document.createElementNS("http://www.w3.org/2000/svg","svg"),s=document.createElementNS("http://www.w3.org/2000/svg","defs");p(s,{id:"svg-defs"}),n.appendChild(o),o.appendChild(s),t.push(new y("header-img",8,.93,.005)),t.push(new y("header",8,.93,.005));for(let n=0;n<e;n++)t.push(new y("link-"+n,8,.93,.005));for(let e=0;e<t.length;e++)t[e].createPoints().makePath().setPathElementData();let r=document.createElementNS("http://www.w3.org/2000/svg","filter");p(r,{id:"glow",x:"-10%",y:"-10%",width:"120%",height:"120%"});let l=document.createElementNS("http://www.w3.org/2000/svg","feGaussianBlur");p(l,{result:"coloredBlur",stdDeviation:".015"}),r.appendChild(l),s.appendChild(r);let a=document.createElementNS("http://www.w3.org/2000/svg","radialGradient");a.setAttribute("id","eye-gradient");for(let t=0;t<3;t++){let e=document.createElementNS("http://www.w3.org/2000/svg","stop");p(e,{class:"gradient-stop",id:"eye-gradient-stop-"+t.toString(),"stop-color":u(Math.floor(360*Math.random()),50,75),offset:(50*t).toString()+"%"}),a.appendChild(e)}s.appendChild(a),o.appendChild(s),n.appendChild(o)}(e),function(t){let e=document.getElementById("header-image-container"),n=document.createElementNS("http://www.w3.org/2000/svg","svg");p(n,{id:"header-svg",viewBox:"0 0 1 1"});let i=document.createElementNS("http://www.w3.org/2000/svg","g");p(i,{id:"header-svg-group"});let o=document.createElementNS("http://www.w3.org/2000/svg","circle");p(o,{id:"eye-circle-1",cx:".31",cy:".5",r:".13",fill:"url(#eye-gradient)"});let s=document.createElementNS("http://www.w3.org/2000/svg","circle");p(s,{id:"eye-circle-2",cx:".62",cy:".425",r:".13",fill:"url(#eye-gradient)"});let r=document.createElementNS("http://www.w3.org/2000/svg","use");p(r,{class:"border-glow",id:"header-img-border-glow",href:"#header-img-path",stroke:u(t[0].hue,50,65),filter:"url(#glow)","stroke-width":"10"});let l=document.createElementNS("http://www.w3.org/2000/svg","use");p(l,{class:"border",id:"header-img-border",href:"#header-img-path",stroke:u(t[0].hue,100,50),"stroke-width":"2"});let a=document.createElementNS("http://www.w3.org/2000/svg","image");a.onload=function(){i.appendChild(o),i.appendChild(s),i.appendChild(a),i.appendChild(r),i.appendChild(l)},p(a,{class:"header-image",id:"header-image",style:"clip-path: url(#header-img-clip-path);",href:"images/landingPageFaceEyeClip-500.png",width:1,height:1}),n.appendChild(i),e.appendChild(n)}(e),M.then(t=>{!function(t,e){let n=document.getElementById("links-container");for(let o=0;o<i.length;o++){let s=document.createElement("div");p(s,{class:"link-container",id:i[o].id});let r=document.createElement("div");p(r,{class:"link-clip-div",style:"clip-path: url(#link-"+o+"-clip-path); background-color: "+u(e[o+2].hue,50,75)});let l,a=document.createElement("div");p(a,{class:"link-text-box"}),"postcard"===i[o].id?(l=document.createElement("span"),p(l,{class:"link-text"}),l.textContent=i[o].text,l.addEventListener("mouseenter",(function(){l.textContent="",l.innerHTML="<span>PO Box 14011</span><br><span>Portland OR, 97293</span>"})),l.addEventListener("touchenter",(function(){l.textContent="",l.innerHTML="<span>PO Box 14011</span><br><span>Portland OR, 97293</span>"})),l.addEventListener("mouseleave",(function(){l.innerHTML="",l.textContent="Send Me a Postcard"})),l.addEventListener("touchleave",(function(){l.innerHTML="",l.textContent="Send Me a Postcard"}))):(l=document.createElement("a"),p(l,{class:"link-text",href:t?i[o].mobileLink:i[o].link,target:"_blank"}),l.textContent=i[o].text);let h=document.createElement("div");p(h,{class:"link-svg-container"});let d=document.createElementNS("http://www.w3.org/2000/svg","svg");p(d,{id:"link-"+o+"-svg",viewBox:"0 0 1 1",preserveAspectRatio:"none"});let c=document.createElementNS("http://www.w3.org/2000/svg","g"),m=document.createElementNS("http://www.w3.org/2000/svg","use");p(m,{class:"border-glow",id:"link-"+o+"-border-glow",href:"#link-"+o+"-path",stroke:u(e[o+2].hue,50,65),filter:"url(#glow)","stroke-width":"10"});let f=document.createElementNS("http://www.w3.org/2000/svg","use");p(f,{class:"border",id:"link-"+o+"-border",href:"#link-"+o+"-path",stroke:u(e[o+2].hue,100,50),"stroke-width":"2"}),n.appendChild(s),s.appendChild(r),r.appendChild(a),a.appendChild(l),s.appendChild(h),h.appendChild(d),d.appendChild(c),c.append(m),c.appendChild(f)}}(t,e),E(t)}),function(t){const e=document.getElementsByClassName("gradient-stop");!function n(){for(let e=0;e<t.length;e++)t[e].updatePoints().makePath().setPathElementData();for(let t=0;t<e.length;t++)v(e[t]);x=requestAnimationFrame(n)}()}(e)},window.onresize=t=>{M.then(t=>{E(t)})}}]);