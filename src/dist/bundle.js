!function(e){var n={};function t(o){if(n[o])return n[o].exports;var i=n[o]={i:o,l:!1,exports:{}};return e[o].call(i.exports,i,i.exports,t),i.l=!0,i.exports}t.m=e,t.c=n,t.d=function(e,n,o){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:o})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(t.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var i in e)t.d(o,i,function(n){return e[n]}.bind(null,i));return o},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="",t(t.s=0)}([function(e,n){let t=!1;function o(){let e=window.innerHeight,n=window.innerWidth,t=document.querySelectorAll(".link-text"),o=document.querySelectorAll(".link-icon"),i=Math.floor(.05*n);console.log("setting Size",n,e,i);for(let e=0;e<t.length;e++){let n=t[e],r=o[e];console.log(r),n.style.fontSize=i+"px",r.width=i.toString()}}function i(e){console.log("Mobile",t);let n=e.currentTarget.id;switch(console.log(n),n){case"instagram":t?window.open("instagram://user?username=jugglingtallguy"):window.open("https://www.instagram.com/jugglingtallguy/");break;case"venmo":t?window.open("venmo://user?username=justinlmartin"):window.open("https://www.venmo.com/u/justinlmartin");break;case"email":window.open("mailto:info@justinlmartin.com");break;case"coding-portfolio":window.open("https://coding-portfolio.justinlmartin.com");break;case"github":window.open("https://github.com/jmartin432");break;default:return}}window.onload=e=>{t=[/Android/i,/webOS/i,/iPhone/i,/iPad/i,/iPod/i,/BlackBerry/i,/Windows Phone/i].some(e=>navigator.userAgent.match(e)),o();let n=document.getElementsByClassName("link-container");console.log(n);for(let e=0;e<n.length;e++){n[e].addEventListener("click",i)}},window.onresize=e=>{o()}}]);