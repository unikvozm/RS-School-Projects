!function(e){var t={};function o(r){if(t[r])return t[r].exports;var a=t[r]={i:r,l:!1,exports:{}};return e[r].call(a.exports,a,a.exports,o),a.l=!0,a.exports}o.m=e,o.c=t,o.d=function(e,t,r){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(o.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)o.d(r,a,function(t){return e[t]}.bind(null,a));return r},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="",o(o.s=0)}([function(e,t,o){"use strict";o.r(t);var r={setSize:e=>{localStorage.setItem("size",e)},getSize:()=>null===localStorage.getItem("size")?((void 0).setSize(128),128):localStorage.getItem("size"),setPrevColor:e=>{localStorage.setItem("previous color",e)},getPrevColor:()=>null===localStorage.getItem("previous color")?((void 0).setPrevColor("#c4c4c4"),"#c4c4c4"):localStorage.getItem("previous color"),setCurColor:e=>{localStorage.setItem("current color",e)},getCurColor:()=>null===localStorage.getItem("current color")?((void 0).setCurColor("#41f795"),"#41f795"):localStorage.getItem("current color"),setImage:e=>{localStorage.setItem("canvasImage",e.toDataURL())},getImage:()=>localStorage.getItem("canvasImage"),setActiveTool:e=>{localStorage.setItem("active tool",e)},getActiveTool:()=>null===localStorage.getItem("active tool")?((void 0).setActiveTool("pencil"),"pencil"):localStorage.getItem("active tool")};const a=document.querySelector(".drawing-area__slider-value"),l=document.querySelector(".drawing-area__slider");var n=function(){const e=l.value;r.setSize(e);const t=(l.value-l.getAttribute("min"))/(l.getAttribute("max")-l.getAttribute("min"));let o;switch(e){case"128":o=7;break;case"256":o=-7;break;case"384":o=-21;break;case"512":o=-35}a.innerHTML=e,a.style.left=`${512*t+o}px`};const c=document.querySelector(".drawing-area__slider"),i=document.querySelector(".drawing-area__canvas");i.width=512,i.height=512;const u=i.getContext("2d");c.onchange=()=>n(),window.onload=()=>{const e=new Image;e.src=r.getImage(),e.onload=()=>{u.drawImage(e,0,0)}},window.onbeforeunload=()=>{r.setImage(i.toDataURL())}}]);