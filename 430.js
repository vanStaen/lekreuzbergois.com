(self.webpackChunklekreuzbergois=self.webpackChunklekreuzbergois||[]).push([[430],{55430:(r,e,n)=>{"use strict";n.r(e),n.d(e,{uuid:()=>t});var o=n(55877),t=function(){return(0,o.v4)()}},55877:(r,e,n)=>{var o=n(23570),t=n(71171),a=t;a.v1=o,a.v4=t,r.exports=a},45327:r=>{for(var e=[],n=0;n<256;++n)e[n]=(n+256).toString(16).substr(1);r.exports=function(r,n){var o=n||0,t=e;return[t[r[o++]],t[r[o++]],t[r[o++]],t[r[o++]],"-",t[r[o++]],t[r[o++]],"-",t[r[o++]],t[r[o++]],"-",t[r[o++]],t[r[o++]],"-",t[r[o++]],t[r[o++]],t[r[o++]],t[r[o++]],t[r[o++]],t[r[o++]]].join("")}},85217:r=>{var e="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||"undefined"!=typeof msCrypto&&"function"==typeof window.msCrypto.getRandomValues&&msCrypto.getRandomValues.bind(msCrypto);if(e){var n=new Uint8Array(16);r.exports=function(){return e(n),n}}else{var o=new Array(16);r.exports=function(){for(var r,e=0;e<16;e++)0==(3&e)&&(r=4294967296*Math.random()),o[e]=r>>>((3&e)<<3)&255;return o}}},23570:(r,e,n)=>{var o,t,a=n(85217),s=n(45327),u=0,i=0;r.exports=function(r,e,n){var v=e&&n||0,c=e||[],l=(r=r||{}).node||o,d=void 0!==r.clockseq?r.clockseq:t;if(null==l||null==d){var f=a();null==l&&(l=o=[1|f[0],f[1],f[2],f[3],f[4],f[5]]),null==d&&(d=t=16383&(f[6]<<8|f[7]))}var p=void 0!==r.msecs?r.msecs:(new Date).getTime(),y=void 0!==r.nsecs?r.nsecs:i+1,m=p-u+(y-i)/1e4;if(m<0&&void 0===r.clockseq&&(d=d+1&16383),(m<0||p>u)&&void 0===r.nsecs&&(y=0),y>=1e4)throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");u=p,i=y,t=d;var g=(1e4*(268435455&(p+=122192928e5))+y)%4294967296;c[v++]=g>>>24&255,c[v++]=g>>>16&255,c[v++]=g>>>8&255,c[v++]=255&g;var w=p/4294967296*1e4&268435455;c[v++]=w>>>8&255,c[v++]=255&w,c[v++]=w>>>24&15|16,c[v++]=w>>>16&255,c[v++]=d>>>8|128,c[v++]=255&d;for(var k=0;k<6;++k)c[v+k]=l[k];return e||s(c)}},71171:(r,e,n)=>{var o=n(85217),t=n(45327);r.exports=function(r,e,n){var a=e&&n||0;"string"==typeof r&&(e="binary"===r?new Array(16):null,r=null);var s=(r=r||{}).random||(r.rng||o)();if(s[6]=15&s[6]|64,s[8]=63&s[8]|128,e)for(var u=0;u<16;++u)e[a+u]=s[u];return e||t(s)}}}]);
//# sourceMappingURL=430.js.map