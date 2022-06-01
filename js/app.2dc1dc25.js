(function(){"use strict";var e={5633:function(e,t,n){var r=n(9242),i=n(3396),o=n(7139),u=n(7718),a=n(8796),l=n(3435),c=n(7393),s=n(6572),f=n(1332),d=n(1334),m=n(1888),p=n(8357),g=n(1666),h=n(9234),w=n(1539),v=n(3289),b=n(9271),y=n(3173),x=n(1818),_=n(5030),k=n(5250);const j={key:0,class:"h-75 w-100 d-flex flex-column justify-center align-center"},O={class:"d-flex flex-no-wrap justify-space-between"},W={key:0,class:"ml-1 text-green"},P=(0,i.Uk)("mdi-chevron-up"),C={key:1,class:"ml-1 text-red"},T=(0,i.Uk)("mdi-chevron-down"),z={key:0},L={key:1},U=(0,i.Uk)(" Подробнее "),D=(0,i.Uk)("title"),E=(0,i._)("div",{class:"text-h2 pa-12"},"value",-1),N=(0,i.Uk)("Close");function V(e,t,n,r,V,A){return(0,i.wg)(),(0,i.j4)(u.q,null,{default:(0,i.w5)((()=>[(0,i.Wm)(a.L,{elevation:"1"},{default:(0,i.w5)((()=>[(0,i.Wm)(_.q,{class:"text-subtitle-1 text-md-h6 text-lg-h5",textContent:(0,o.zw)(V.titleApp),style:{"min-width":"165px"}},null,8,["textContent"]),(0,i.Wm)(h.C),(0,i.Wm)(x.G,{onClick:t[0]||(t[0]=e=>r.toggleTheme()),inset:"","hide-details":"",style:{"max-width":"55px"}}),(0,i.Wm)(v.t,{icon:"mdi-theme-light-dark"})])),_:1}),(0,i.Wm)(b.O,null,{default:(0,i.w5)((()=>[!0===V.isPageLoading?((0,i.wg)(),(0,i.iD)("div",j,[(0,i.Wm)(y.L,{size:150,indeterminate:""})])):(0,i.kq)("",!0),!1===V.isPageLoading?((0,i.wg)(),(0,i.j4)(w.K,{key:1},{default:(0,i.w5)((()=>[((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(V.currencies,(e=>((0,i.wg)(),(0,i.j4)(c._,{"max-width":"500",class:"mx-auto mb-4",key:e.id},{default:(0,i.w5)((()=>[(0,i._)("div",O,[(0,i._)("div",null,[(0,i.Wm)(s.E,{class:"text-xs-h6 text-md-h5 text-lg-h5 pr-0 pl-2 font-weight-medium"},{default:(0,i.w5)((()=>[(0,i.Uk)((0,o.zw)(e.CharCode)+" ",1),e.Value>e.Previous?((0,i.wg)(),(0,i.iD)("span",W,[(0,i.Wm)(v.t,{color:"green"},{default:(0,i.w5)((()=>[P])),_:1}),(0,i.Uk)(" "+(0,o.zw)(`${(e.Value/e.Previous*100-100).toFixed(3)}%`),1)])):((0,i.wg)(),(0,i.iD)("span",C,[(0,i.Wm)(v.t,{color:"red"},{default:(0,i.w5)((()=>[T])),_:1}),(0,i.Uk)(" "+(0,o.zw)(`${(100-e.Value/e.Previous*100).toFixed(3)}%`),1)]))])),_:2},1024),(0,i.Wm)(f.Q,{class:"pr-0 pl-2 text-xs-subtitle-2 text-md-subtitle-1 text-lg-subtitle-1"},{default:(0,i.w5)((()=>[e.Nominal>1?((0,i.wg)(),(0,i.iD)("span",z,(0,o.zw)(e.Nominal)+" "+(0,o.zw)(e.Name),1)):((0,i.wg)(),(0,i.iD)("span",L,(0,o.zw)(e.Name),1))])),_:2},1024),(0,i.Wm)(d.h,{class:"pr-0 pl-0"},{default:(0,i.w5)((()=>[(0,i.Wm)(l.T,{class:"ml-2",variant:"outlined",size:"small",onClick:t[1]||(t[1]=e=>A.showDialog())},{default:(0,i.w5)((()=>[U])),_:1})])),_:1})]),(0,i.Wm)(s.E,{class:"text-h4 pl-0 pr-2"},{default:(0,i.w5)((()=>[(0,i.Uk)((0,o.zw)(`${e.Value.toFixed(2)}₽`),1)])),_:2},1024)])])),_:2},1024)))),128))])),_:1})):(0,i.kq)("",!0),(0,i.Wm)(p.B,{modelValue:V.dialog,"onUpdate:modelValue":t[3]||(t[3]=e=>V.dialog=e)},{default:(0,i.w5)((()=>[(0,i.Wm)(c._,null,{default:(0,i.w5)((()=>[(0,i.Wm)(k.iv,null,{default:(0,i.w5)((()=>[D])),_:1}),(0,i.Wm)(m.Z,null,{default:(0,i.w5)((()=>[E])),_:1}),(0,i.Wm)(d.h,{class:"justify-end"},{default:(0,i.w5)((()=>[(0,i.Wm)(l.T,{text:"",onClick:t[2]||(t[2]=e=>V.dialog=!1)},{default:(0,i.w5)((()=>[N])),_:1})])),_:1})])),_:1})])),_:1},8,["modelValue"])])),_:1}),(0,i.Wm)(g.c,{app:""},{default:(0,i.w5)((()=>[(0,i._)("span",null,"in developing © "+(0,o.zw)((new Date).getFullYear()),1)])),_:1})])),_:1})}var A=n(7041),F=n(6265),q=n.n(F),S={name:"App",data(){return{isPageLoading:!1,titleApp:"Курсы валют ЦБ РФ относительно рубля",currentTheme:"",dialog:!1,currencies:[]}},methods:{showDialog(){this.dialog=!0},async fetchCurrencies(){try{this.isPageLoading=!0;const e=await q().get("https://www.cbr-xml-daily.ru/daily_json.js");this.currencies=e.data.Valute}catch(e){console.log("error 1")}finally{this.isPageLoading=!1,console.log(this.isPageLoading)}}},setup(){const e=(0,A.Fg)();return{theme:e,toggleTheme(){"light"===e.current.value?e.current.value=this.currentTheme="dark":e.current.value=this.currentTheme="light"}}},mounted(){this.fetchCurrencies()}},M=n(89);const $=(0,M.Z)(S,[["render",V]]);var B=$,K=(n(9773),n(4402)),R=(0,K.Rd)({theme:{defaultTheme:"light"}});async function Y(){const e=await n.e(461).then(n.t.bind(n,3657,23));e.load({google:{families:["Roboto:100,300,400,500,700,900&display=swap"]}})}Y(),(0,r.ri)(B).use(R).mount("#app")}},t={};function n(r){var i=t[r];if(void 0!==i)return i.exports;var o=t[r]={exports:{}};return e[r](o,o.exports,n),o.exports}n.m=e,function(){var e=[];n.O=function(t,r,i,o){if(!r){var u=1/0;for(s=0;s<e.length;s++){r=e[s][0],i=e[s][1],o=e[s][2];for(var a=!0,l=0;l<r.length;l++)(!1&o||u>=o)&&Object.keys(n.O).every((function(e){return n.O[e](r[l])}))?r.splice(l--,1):(a=!1,o<u&&(u=o));if(a){e.splice(s--,1);var c=i();void 0!==c&&(t=c)}}return t}o=o||0;for(var s=e.length;s>0&&e[s-1][2]>o;s--)e[s]=e[s-1];e[s]=[r,i,o]}}(),function(){n.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return n.d(t,{a:t}),t}}(),function(){var e,t=Object.getPrototypeOf?function(e){return Object.getPrototypeOf(e)}:function(e){return e.__proto__};n.t=function(r,i){if(1&i&&(r=this(r)),8&i)return r;if("object"===typeof r&&r){if(4&i&&r.__esModule)return r;if(16&i&&"function"===typeof r.then)return r}var o=Object.create(null);n.r(o);var u={};e=e||[null,t({}),t([]),t(t)];for(var a=2&i&&r;"object"==typeof a&&!~e.indexOf(a);a=t(a))Object.getOwnPropertyNames(a).forEach((function(e){u[e]=function(){return r[e]}}));return u["default"]=function(){return r},n.d(o,u),o}}(),function(){n.d=function(e,t){for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}}(),function(){n.f={},n.e=function(e){return Promise.all(Object.keys(n.f).reduce((function(t,r){return n.f[r](e,t),t}),[]))}}(),function(){n.u=function(e){return"js/webfontloader.eb16b03a.js"}}(),function(){n.miniCssF=function(e){}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){var e={},t="new:";n.l=function(r,i,o,u){if(e[r])e[r].push(i);else{var a,l;if(void 0!==o)for(var c=document.getElementsByTagName("script"),s=0;s<c.length;s++){var f=c[s];if(f.getAttribute("src")==r||f.getAttribute("data-webpack")==t+o){a=f;break}}a||(l=!0,a=document.createElement("script"),a.charset="utf-8",a.timeout=120,n.nc&&a.setAttribute("nonce",n.nc),a.setAttribute("data-webpack",t+o),a.src=r),e[r]=[i];var d=function(t,n){a.onerror=a.onload=null,clearTimeout(m);var i=e[r];if(delete e[r],a.parentNode&&a.parentNode.removeChild(a),i&&i.forEach((function(e){return e(n)})),t)return t(n)},m=setTimeout(d.bind(null,void 0,{type:"timeout",target:a}),12e4);a.onerror=d.bind(null,a.onerror),a.onload=d.bind(null,a.onload),l&&document.head.appendChild(a)}}}(),function(){n.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){n.p=""}(),function(){var e={143:0};n.f.j=function(t,r){var i=n.o(e,t)?e[t]:void 0;if(0!==i)if(i)r.push(i[2]);else{var o=new Promise((function(n,r){i=e[t]=[n,r]}));r.push(i[2]=o);var u=n.p+n.u(t),a=new Error,l=function(r){if(n.o(e,t)&&(i=e[t],0!==i&&(e[t]=void 0),i)){var o=r&&("load"===r.type?"missing":r.type),u=r&&r.target&&r.target.src;a.message="Loading chunk "+t+" failed.\n("+o+": "+u+")",a.name="ChunkLoadError",a.type=o,a.request=u,i[1](a)}};n.l(u,l,"chunk-"+t,t)}},n.O.j=function(t){return 0===e[t]};var t=function(t,r){var i,o,u=r[0],a=r[1],l=r[2],c=0;if(u.some((function(t){return 0!==e[t]}))){for(i in a)n.o(a,i)&&(n.m[i]=a[i]);if(l)var s=l(n)}for(t&&t(r);c<u.length;c++)o=u[c],n.o(e,o)&&e[o]&&e[o][0](),e[o]=0;return n.O(s)},r=self["webpackChunknew"]=self["webpackChunknew"]||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))}();var r=n.O(void 0,[998],(function(){return n(5633)}));r=n.O(r)})();
//# sourceMappingURL=app.2dc1dc25.js.map