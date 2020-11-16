var app=function(){"use strict";function t(){}function n(t,n){for(const e in n)t[e]=n[e];return t}function e(t){return t()}function o(){return Object.create(null)}function r(t){t.forEach(e)}function c(t){return"function"==typeof t}function s(t,n){return t!=t?n==n:t!==n||t&&"object"==typeof t||"function"==typeof t}function i(n,...e){if(null==n)return t;const o=n.subscribe(...e);return o.unsubscribe?()=>o.unsubscribe():o}function l(t,n,e){t.$$.on_destroy.push(i(n,e))}function u(t,n,e,o){if(t){const r=a(t,n,e,o);return t[0](r)}}function a(t,e,o,r){return t[1]&&r?n(o.ctx.slice(),t[1](r(e))):o.ctx}function f(t,n,e,o,r,c,s){const i=function(t,n,e,o){if(t[2]&&o){const r=t[2](o(e));if(void 0===n.dirty)return r;if("object"==typeof r){const t=[],e=Math.max(n.dirty.length,r.length);for(let o=0;o<e;o+=1)t[o]=n.dirty[o]|r[o];return t}return n.dirty|r}return n.dirty}(n,o,r,c);if(i){const r=a(n,e,o,s);t.p(r,i)}}function p(t){const n={};for(const e in t)"$"!==e[0]&&(n[e]=t[e]);return n}function d(t,n){t.appendChild(n)}function $(t,n,e){t.insertBefore(n,e||null)}function h(t){t.parentNode.removeChild(t)}function m(t){return document.createElement(t)}function g(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function v(t){return document.createTextNode(t)}function y(){return v(" ")}function w(){return v("")}function x(t,n,e){null==e?t.removeAttribute(n):t.getAttribute(n)!==e&&t.setAttribute(n,e)}function b(t,n){const e=Object.getOwnPropertyDescriptors(t.__proto__);for(const o in n)null==n[o]?t.removeAttribute(o):"style"===o?t.style.cssText=n[o]:"__value"===o?t.value=t[o]=n[o]:e[o]&&e[o].set?t[o]=n[o]:x(t,o,n[o])}function k(t,n){for(const e in n)x(t,e,n[e])}let _;function E(t){_=t}function C(){if(!_)throw new Error("Function called outside component initialization");return _}function L(){const t=C();return(n,e)=>{const o=t.$$.callbacks[n];if(o){const r=function(t,n){const e=document.createEvent("CustomEvent");return e.initCustomEvent(t,!1,!1,n),e}(n,e);o.slice().forEach((n=>{n.call(t,r)}))}}}function H(t,n){C().$$.context.set(t,n)}function M(t){return C().$$.context.get(t)}const P=[],O=[],j=[],N=[],A=Promise.resolve();let I=!1;function S(t){j.push(t)}let z=!1;const R=new Set;function B(){if(!z){z=!0;do{for(let t=0;t<P.length;t+=1){const n=P[t];E(n),T(n.$$)}for(E(null),P.length=0;O.length;)O.pop()();for(let t=0;t<j.length;t+=1){const n=j[t];R.has(n)||(R.add(n),n())}j.length=0}while(P.length);for(;N.length;)N.pop()();I=!1,z=!1,R.clear()}}function T(t){if(null!==t.fragment){t.update(),r(t.before_update);const n=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,n),t.after_update.forEach(S)}}const D=new Set;let K;function U(){K={r:0,c:[],p:K}}function V(){K.r||r(K.c),K=K.p}function F(t,n){t&&t.i&&(D.delete(t),t.i(n))}function q(t,n,e,o){if(t&&t.o){if(D.has(t))return;D.add(t),K.c.push((()=>{D.delete(t),o&&(e&&t.d(1),o())})),t.o(n)}}function G(t,n){const e={},o={},r={$$scope:1};let c=t.length;for(;c--;){const s=t[c],i=n[c];if(i){for(const t in s)t in i||(o[t]=1);for(const t in i)r[t]||(e[t]=i[t],r[t]=1);t[c]=i}else for(const t in s)r[t]=1}for(const t in o)t in e||(e[t]=void 0);return e}function J(t){return"object"==typeof t&&null!==t?t:{}}function Q(t){t&&t.c()}function W(t,n,o){const{fragment:s,on_mount:i,on_destroy:l,after_update:u}=t.$$;s&&s.m(n,o),S((()=>{const n=i.map(e).filter(c);l?l.push(...n):r(n),t.$$.on_mount=[]})),u.forEach(S)}function X(t,n){const e=t.$$;null!==e.fragment&&(r(e.on_destroy),e.fragment&&e.fragment.d(n),e.on_destroy=e.fragment=null,e.ctx=[])}function Y(t,n){-1===t.$$.dirty[0]&&(P.push(t),I||(I=!0,A.then(B)),t.$$.dirty.fill(0)),t.$$.dirty[n/31|0]|=1<<n%31}function Z(n,e,c,s,i,l,u=[-1]){const a=_;E(n);const f=e.props||{},p=n.$$={fragment:null,ctx:null,props:l,update:t,not_equal:i,bound:o(),on_mount:[],on_destroy:[],before_update:[],after_update:[],context:new Map(a?a.$$.context:[]),callbacks:o(),dirty:u,skip_bound:!1};let d=!1;if(p.ctx=c?c(n,f,((t,e,...o)=>{const r=o.length?o[0]:e;return p.ctx&&i(p.ctx[t],p.ctx[t]=r)&&(!p.skip_bound&&p.bound[t]&&p.bound[t](r),d&&Y(n,t)),e})):[],p.update(),d=!0,r(p.before_update),p.fragment=!!s&&s(p.ctx),e.target){if(e.hydrate){const t=function(t){return Array.from(t.childNodes)}(e.target);p.fragment&&p.fragment.l(t),t.forEach(h)}else p.fragment&&p.fragment.c();e.intro&&F(n.$$.fragment),W(n,e.target,e.anchor),B()}E(a)}class tt{$destroy(){X(this,1),this.$destroy=t}$on(t,n){const e=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return e.push(n),()=>{const t=e.indexOf(n);-1!==t&&e.splice(t,1)}}$set(t){var n;this.$$set&&(n=t,0!==Object.keys(n).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}const nt=[];function et(n,e=t){let o;const r=[];function c(t){if(s(n,t)&&(n=t,o)){const t=!nt.length;for(let t=0;t<r.length;t+=1){const e=r[t];e[1](),nt.push(e,n)}if(t){for(let t=0;t<nt.length;t+=2)nt[t][0](nt[t+1]);nt.length=0}}}return{set:c,update:function(t){c(t(n))},subscribe:function(s,i=t){const l=[s,i];return r.push(l),1===r.length&&(o=e(c)||t),s(n),()=>{const t=r.indexOf(l);-1!==t&&r.splice(t,1),0===r.length&&(o(),o=null)}}}}function ot(n,e,o){const s=!Array.isArray(n),l=s?[n]:n,u=e.length<2;return{subscribe:et(o,(n=>{let o=!1;const a=[];let f=0,p=t;const d=()=>{if(f)return;p();const o=e(s?a[0]:a,n);u?n(o):p=c(o)?o:t},$=l.map(((t,n)=>i(t,(t=>{a[n]=t,f&=~(1<<n),o&&d()}),(()=>{f|=1<<n}))));return o=!0,d(),function(){r($),p()}})).subscribe}}const rt={},ct={};function st(t){return{...t.location,state:t.history.state,key:t.history.state&&t.history.state.key||"initial"}}const it=function(t,n){const e=[];let o=st(t);return{get location(){return o},listen(n){e.push(n);const r=()=>{o=st(t),n({location:o,action:"POP"})};return t.addEventListener("popstate",r),()=>{t.removeEventListener("popstate",r);const o=e.indexOf(n);e.splice(o,1)}},navigate(n,{state:r,replace:c=!1}={}){r={...r,key:Date.now()+""};try{c?t.history.replaceState(r,null,n):t.history.pushState(r,null,n)}catch(e){t.location[c?"replace":"assign"](n)}o=st(t),e.forEach((t=>t({location:o,action:"PUSH"})))}}}(Boolean("undefined"!=typeof window&&window.document&&window.document.createElement)?window:function(t="/"){let n=0;const e=[{pathname:t,search:""}],o=[];return{get location(){return e[n]},addEventListener(t,n){},removeEventListener(t,n){},history:{get entries(){return e},get index(){return n},get state(){return o[n]},pushState(t,r,c){const[s,i=""]=c.split("?");n++,e.push({pathname:s,search:i}),o.push(t)},replaceState(t,r,c){const[s,i=""]=c.split("?");e[n]={pathname:s,search:i},o[n]=t}}}}()),{navigate:lt}=it,ut=/^:(.+)/;function at(t,n){return t.substr(0,n.length)===n}function ft(t){return"*"===t[0]}function pt(t){return t.replace(/(^\/+|\/+$)/g,"").split("/")}function dt(t){return t.replace(/(^\/+|\/+$)/g,"")}function $t(t,n){return{route:t,score:t.default?0:pt(t.path).reduce(((t,n)=>(t+=4,!function(t){return""===t}(n)?!function(t){return ut.test(t)}(n)?ft(n)?t-=5:t+=3:t+=2:t+=1,t)),0),index:n}}function ht(t,n){let e,o;const[r]=n.split("?"),c=pt(r),s=""===c[0],i=function(t){return t.map($t).sort(((t,n)=>t.score<n.score?1:t.score>n.score?-1:t.index-n.index))}(t);for(let t=0,r=i.length;t<r;t++){const r=i[t].route;let l=!1;if(r.default){o={route:r,params:{},uri:n};continue}const u=pt(r.path),a={},f=Math.max(c.length,u.length);let p=0;for(;p<f;p++){const t=u[p],n=c[p];if(void 0!==t&&ft(t)){a["*"===t?"*":t.slice(1)]=c.slice(p).map(decodeURIComponent).join("/");break}if(void 0===n){l=!0;break}let e=ut.exec(t);if(e&&!s){const t=decodeURIComponent(n);a[e[1]]=t}else if(t!==n){l=!0;break}}if(!l){e={route:r,params:a,uri:"/"+c.slice(0,p).join("/")};break}}return e||o||null}function mt(t,n){return t+(n?"?"+n:"")}function gt(t,n){return dt("/"===n?t:`${dt(t)}/${dt(n)}`)+"/"}function vt(t){let n;const e=t[6].default,o=u(e,t,t[5],null);return{c(){o&&o.c()},m(t,e){o&&o.m(t,e),n=!0},p(t,[n]){o&&o.p&&32&n&&f(o,e,t,t[5],n,null,null)},i(t){n||(F(o,t),n=!0)},o(t){q(o,t),n=!1},d(t){o&&o.d(t)}}}function yt(t,n,e){let o,r,c,{$$slots:s={},$$scope:i}=n,{basepath:u="/"}=n,{url:a=null}=n;const f=M(rt),p=M(ct),d=et([]);l(t,d,(t=>e(10,c=t)));const $=et(null);let h=!1;const m=f||et(a?{pathname:a}:it.location);l(t,m,(t=>e(9,r=t)));const g=p?p.routerBase:et({path:u,uri:u});l(t,g,(t=>e(8,o=t)));const v=ot([g,$],(([t,n])=>{if(null===n)return t;const{path:e}=t,{route:o,uri:r}=n;return{path:o.default?e:o.path.replace(/\*.*$/,""),uri:r}}));var y;return f||(y=()=>it.listen((t=>{m.set(t.location)})),C().$$.on_mount.push(y),H(rt,m)),H(ct,{activeRoute:$,base:g,routerBase:v,registerRoute:function(t){const{path:n}=o;let{path:e}=t;if(t._path=e,t.path=gt(n,e),"undefined"==typeof window){if(h)return;const n=function(t,n){return ht([t],n)}(t,r.pathname);n&&($.set(n),h=!0)}else d.update((n=>(n.push(t),n)))},unregisterRoute:function(t){d.update((n=>{const e=n.indexOf(t);return n.splice(e,1),n}))}}),t.$$set=t=>{"basepath"in t&&e(3,u=t.basepath),"url"in t&&e(4,a=t.url),"$$scope"in t&&e(5,i=t.$$scope)},t.$$.update=()=>{if(256&t.$$.dirty){const{path:t}=o;d.update((n=>(n.forEach((n=>n.path=gt(t,n._path))),n)))}if(1536&t.$$.dirty){const t=ht(c,r.pathname);$.set(t)}},[d,m,g,u,a,i,s]}class wt extends tt{constructor(t){super(),Z(this,t,yt,vt,s,{basepath:3,url:4})}}const xt=t=>({params:2&t,location:16&t}),bt=t=>({params:t[1],location:t[4]});function kt(t){let n,e,o,r;const c=[Et,_t],s=[];function i(t,n){return null!==t[0]?0:1}return n=i(t),e=s[n]=c[n](t),{c(){e.c(),o=w()},m(t,e){s[n].m(t,e),$(t,o,e),r=!0},p(t,r){let l=n;n=i(t),n===l?s[n].p(t,r):(U(),q(s[l],1,1,(()=>{s[l]=null})),V(),e=s[n],e?e.p(t,r):(e=s[n]=c[n](t),e.c()),F(e,1),e.m(o.parentNode,o))},i(t){r||(F(e),r=!0)},o(t){q(e),r=!1},d(t){s[n].d(t),t&&h(o)}}}function _t(t){let n;const e=t[10].default,o=u(e,t,t[9],bt);return{c(){o&&o.c()},m(t,e){o&&o.m(t,e),n=!0},p(t,n){o&&o.p&&530&n&&f(o,e,t,t[9],n,xt,bt)},i(t){n||(F(o,t),n=!0)},o(t){q(o,t),n=!1},d(t){o&&o.d(t)}}}function Et(t){let e,o,r;const c=[{location:t[4]},t[1],t[2]];var s=t[0];function i(t){let e={};for(let t=0;t<c.length;t+=1)e=n(e,c[t]);return{props:e}}return s&&(e=new s(i())),{c(){e&&Q(e.$$.fragment),o=w()},m(t,n){e&&W(e,t,n),$(t,o,n),r=!0},p(t,n){const r=22&n?G(c,[16&n&&{location:t[4]},2&n&&J(t[1]),4&n&&J(t[2])]):{};if(s!==(s=t[0])){if(e){U();const t=e;q(t.$$.fragment,1,0,(()=>{X(t,1)})),V()}s?(e=new s(i()),Q(e.$$.fragment),F(e.$$.fragment,1),W(e,o.parentNode,o)):e=null}else s&&e.$set(r)},i(t){r||(e&&F(e.$$.fragment,t),r=!0)},o(t){e&&q(e.$$.fragment,t),r=!1},d(t){t&&h(o),e&&X(e,t)}}}function Ct(t){let n,e,o=null!==t[3]&&t[3].route===t[7]&&kt(t);return{c(){o&&o.c(),n=w()},m(t,r){o&&o.m(t,r),$(t,n,r),e=!0},p(t,[e]){null!==t[3]&&t[3].route===t[7]?o?(o.p(t,e),8&e&&F(o,1)):(o=kt(t),o.c(),F(o,1),o.m(n.parentNode,n)):o&&(U(),q(o,1,1,(()=>{o=null})),V())},i(t){e||(F(o),e=!0)},o(t){q(o),e=!1},d(t){o&&o.d(t),t&&h(n)}}}function Lt(t,e,o){let r,c,{$$slots:s={},$$scope:i}=e,{path:u=""}=e,{component:a=null}=e;const{registerRoute:f,unregisterRoute:d,activeRoute:$}=M(ct);l(t,$,(t=>o(3,r=t)));const h=M(rt);l(t,h,(t=>o(4,c=t)));const m={path:u,default:""===u};let g={},v={};var y;return f(m),"undefined"!=typeof window&&(y=()=>{d(m)},C().$$.on_destroy.push(y)),t.$$set=t=>{o(13,e=n(n({},e),p(t))),"path"in t&&o(8,u=t.path),"component"in t&&o(0,a=t.component),"$$scope"in t&&o(9,i=t.$$scope)},t.$$.update=()=>{8&t.$$.dirty&&r&&r.route===m&&o(1,g=r.params);{const{path:t,component:n,...r}=e;o(2,v=r)}},e=p(e),[a,g,v,r,c,$,h,m,u,i,s]}class Ht extends tt{constructor(t){super(),Z(this,t,Lt,Ct,s,{path:8,component:0})}}function Mt(t){let e,o,r,c;const s=t[11].default,i=u(s,t,t[10],null);let l=[{href:t[0]},{"aria-current":t[2]},t[1]],a={};for(let t=0;t<l.length;t+=1)a=n(a,l[t]);return{c(){e=m("a"),i&&i.c(),b(e,a)},m(n,s){var l,u,a,f;$(n,e,s),i&&i.m(e,null),o=!0,r||(l=e,u="click",a=t[5],l.addEventListener(u,a,f),c=()=>l.removeEventListener(u,a,f),r=!0)},p(t,[n]){i&&i.p&&1024&n&&f(i,s,t,t[10],n,null,null),b(e,a=G(l,[(!o||1&n)&&{href:t[0]},(!o||4&n)&&{"aria-current":t[2]},2&n&&t[1]]))},i(t){o||(F(i,t),o=!0)},o(t){q(i,t),o=!1},d(t){t&&h(e),i&&i.d(t),r=!1,c()}}}function Pt(t,n,e){let o,r,{$$slots:c={},$$scope:s}=n,{to:i="#"}=n,{replace:u=!1}=n,{state:a={}}=n,{getProps:f=(()=>({}))}=n;const{base:p}=M(ct);l(t,p,(t=>e(14,o=t)));const d=M(rt);l(t,d,(t=>e(15,r=t)));const $=L();let h,m,g,v,y;return t.$$set=t=>{"to"in t&&e(6,i=t.to),"replace"in t&&e(7,u=t.replace),"state"in t&&e(8,a=t.state),"getProps"in t&&e(9,f=t.getProps),"$$scope"in t&&e(10,s=t.$$scope)},t.$$.update=()=>{16448&t.$$.dirty&&e(0,h="/"===i?o.uri:function(t,n){if(at(t,"/"))return t;const[e,o]=t.split("?"),[r]=n.split("?"),c=pt(e),s=pt(r);if(""===c[0])return mt(r,o);if(!at(c[0],"."))return mt(("/"===r?"":"/")+s.concat(c).join("/"),o);const i=s.concat(c),l=[];return i.forEach((t=>{".."===t?l.pop():"."!==t&&l.push(t)})),mt("/"+l.join("/"),o)}(i,o.uri)),32769&t.$$.dirty&&e(12,m=at(r.pathname,h)),32769&t.$$.dirty&&e(13,g=h===r.pathname),8192&t.$$.dirty&&e(2,y=g?"page":void 0),45569&t.$$.dirty&&e(1,v=f({location:r,href:h,isPartiallyCurrent:m,isCurrent:g}))},[h,v,y,p,d,function(t){if($("click",t),function(t){return!t.defaultPrevented&&0===t.button&&!(t.metaKey||t.altKey||t.ctrlKey||t.shiftKey)}(t)){t.preventDefault();const n=r.pathname===h||u;lt(h,{state:a,replace:n})}},i,u,a,f,s,c]}class Ot extends tt{constructor(t){super(),Z(this,t,Pt,Mt,s,{to:6,replace:7,state:8,getProps:9})}}function jt(n){let e,o,r,c,s;return{c(){var t,n,i;e=g("svg"),o=g("style"),r=v(".st0 {\n      fill: #ff3e00;\n    }\n    .st1 {\n      fill: #ffffff;\n    }\n  "),c=g("path"),s=g("path"),x(o,"type","text/css"),x(c,"class","st0"),x(c,"d","M91.8,15.6C80.9-0.1,59.2-4.7,43.6,5.2L16.1,22.8C8.6,27.5,3.4,35.2,1.9,43.9c-1.3,7.3-0.2,14.8,3.3,21.3\n\tc-2.4,3.6-4,7.6-4.7,11.8c-1.6,8.9,0.5,18.1,5.7,25.4c11,15.7,32.6,20.3,48.2,10.4l27.5-17.5c7.5-4.7,12.7-12.4,14.2-21.1\n\tc1.3-7.3,0.2-14.8-3.3-21.3c2.4-3.6,4-7.6,4.7-11.8C99.2,32.1,97.1,22.9,91.8,15.6"),x(s,"class","st1"),x(s,"d","M40.9,103.9c-8.9,2.3-18.2-1.2-23.4-8.7c-3.2-4.4-4.4-9.9-3.5-15.3c0.2-0.9,0.4-1.7,0.6-2.6l0.5-1.6l1.4,1\n\tc3.3,2.4,6.9,4.2,10.8,5.4l1,0.3l-0.1,1c-0.1,1.4,0.3,2.9,1.1,4.1c1.6,2.3,4.4,3.4,7.1,2.7c0.6-0.2,1.2-0.4,1.7-0.7L65.5,72\n\tc1.4-0.9,2.3-2.2,2.6-3.8c0.3-1.6-0.1-3.3-1-4.6c-1.6-2.3-4.4-3.3-7.1-2.6c-0.6,0.2-1.2,0.4-1.7,0.7l-10.5,6.7\n\tc-1.7,1.1-3.6,1.9-5.6,2.4c-8.9,2.3-18.2-1.2-23.4-8.7c-3.1-4.4-4.4-9.9-3.4-15.3c0.9-5.2,4.1-9.9,8.6-12.7l27.5-17.5\n\tc1.7-1.1,3.6-1.9,5.6-2.5c8.9-2.3,18.2,1.2,23.4,8.7c3.2,4.4,4.4,9.9,3.5,15.3c-0.2,0.9-0.4,1.7-0.7,2.6l-0.5,1.6l-1.4-1\n\tc-3.3-2.4-6.9-4.2-10.8-5.4l-1-0.3l0.1-1c0.1-1.4-0.3-2.9-1.1-4.1c-1.6-2.3-4.4-3.3-7.1-2.6c-0.6,0.2-1.2,0.4-1.7,0.7L32.4,46.1\n\tc-1.4,0.9-2.3,2.2-2.6,3.8s0.1,3.3,1,4.6c1.6,2.3,4.4,3.3,7.1,2.6c0.6-0.2,1.2-0.4,1.7-0.7l10.5-6.7c1.7-1.1,3.6-1.9,5.6-2.5\n\tc8.9-2.3,18.2,1.2,23.4,8.7c3.2,4.4,4.4,9.9,3.5,15.3c-0.9,5.2-4.1,9.9-8.6,12.7l-27.5,17.5C44.8,102.5,42.9,103.3,40.9,103.9"),x(e,"width","50"),x(e,"version","1.1"),x(e,"id","Layer_1"),x(e,"xmlns","http://www.w3.org/2000/svg"),x(e,"xmlns:xlink","http://www.w3.org/1999/xlink"),x(e,"x","0px"),x(e,"y","0px"),x(e,"viewBox","0 0 98.1 118"),t="enable-background",n="new 0 0 98.1 118",e.style.setProperty(t,n,i?"important":""),x(e,"xml:space","preserve")},m(t,n){$(t,e,n),d(e,o),d(o,r),d(e,c),d(e,s)},p:t,i:t,o:t,d(t){t&&h(e)}}}class Nt extends tt{constructor(t){super(),Z(this,t,null,jt,s,{})}}function At(t){let n,e,o,r,c;return e=new Nt({}),{c(){n=m("div"),Q(e.$$.fragment),o=y(),r=m("div"),r.textContent="svelte-icons-pack",x(r,"class","title svelte-1hc7p3n"),x(n,"class","top svelte-1hc7p3n")},m(t,s){$(t,n,s),W(e,n,null),d(n,o),d(n,r),c=!0},i(t){c||(F(e.$$.fragment,t),c=!0)},o(t){q(e.$$.fragment,t),c=!1},d(t){t&&h(n),X(e)}}}function It(t){let n;return{c(){n=v("Ant Design Icons")},m(t,e){$(t,n,e)},d(t){t&&h(n)}}}function St(t){let n,e,o,r,c,s,i,l,u;return e=new Ot({props:{to:"/",$$slots:{default:[At]},$$scope:{ctx:t}}}),l=new Ot({props:{to:"pack/ai",$$slots:{default:[It]},$$scope:{ctx:t}}}),{c(){n=m("nav"),Q(e.$$.fragment),o=y(),r=m("div"),r.innerHTML='<input type="text" placeholder="Search icons" class="svelte-1hc7p3n"/>',c=y(),s=m("ul"),i=m("li"),Q(l.$$.fragment)},m(t,a){$(t,n,a),W(e,n,null),d(n,o),d(n,r),d(n,c),d(n,s),d(s,i),W(l,i,null),u=!0},p(t,[n]){const o={};1&n&&(o.$$scope={dirty:n,ctx:t}),e.$set(o);const r={};1&n&&(r.$$scope={dirty:n,ctx:t}),l.$set(r)},i(t){u||(F(e.$$.fragment,t),F(l.$$.fragment,t),u=!0)},o(t){q(e.$$.fragment,t),q(l.$$.fragment,t),u=!1},d(t){t&&h(n),X(e),X(l)}}}class zt extends tt{constructor(t){super(),Z(this,t,null,St,s,{})}}function Rt(n){let e;return{c(){e=m("div"),e.innerHTML='<h1>Svelte Icons Pack</h1> \n  <img src="https://img.shields.io/npm/v/svelte-icons-pack.svg" alt="npm"/> \n  <div class="info svelte-x2n362"><a href="https://github.com/leshak/svelte-icons-pack">README</a></div>'},m(t,n){$(t,e,n)},p:t,i:t,o:t,d(t){t&&h(e)}}}class Bt extends tt{constructor(t){super(),Z(this,t,null,Rt,s,{})}}function Tt(t){let n,e;return{c(){n=g("title"),e=v(t[3])},m(t,o){$(t,n,o),d(n,e)},p(t,n){8&n&&function(t,n){n=""+n,t.wholeText!==n&&(t.data=n)}(e,t[3])},d(t){t&&h(n)}}}function Dt(e){let o,r,c,s,i=e[0].c+"",l=e[3]&&Tt(e),u=[{width:e[1]},{height:e[1]},{"stroke-width":"0"},{class:e[4]},e[0].a,{xmlns:"http://www.w3.org/2000/svg"}],a={};for(let t=0;t<u.length;t+=1)a=n(a,u[t]);return{c(){o=g("svg"),l&&l.c(),r=g("g"),x(r,"stroke",c=e[2]||"currentColor"),x(r,"fill",s=e[2]||"currentColor"),k(o,a)},m(t,n){$(t,o,n),l&&l.m(o,null),d(o,r),r.innerHTML=i},p(t,[n]){t[3]?l?l.p(t,n):(l=Tt(t),l.c(),l.m(o,r)):l&&(l.d(1),l=null),1&n&&i!==(i=t[0].c+"")&&(r.innerHTML=i),4&n&&c!==(c=t[2]||"currentColor")&&x(r,"stroke",c),4&n&&s!==(s=t[2]||"currentColor")&&x(r,"fill",s),k(o,a=G(u,[2&n&&{width:t[1]},2&n&&{height:t[1]},{"stroke-width":"0"},16&n&&{class:t[4]},1&n&&t[0].a,{xmlns:"http://www.w3.org/2000/svg"}]))},i:t,o:t,d(t){t&&h(o),l&&l.d()}}}function Kt(t,n,e){let{src:o}=n,{size:r="1em"}=n,{color:c}=n,{title:s}=n,{className:i=""}=n;return t.$$set=t=>{"src"in t&&e(0,o=t.src),"size"in t&&e(1,r=t.size),"color"in t&&e(2,c=t.color),"title"in t&&e(3,s=t.title),"className"in t&&e(4,i=t.className)},[o,r,c,s,i]}class Ut extends tt{constructor(t){super(),Z(this,t,Kt,Dt,s,{src:0,size:1,color:2,title:3,className:4})}}var Vt={AiOutlineNodeExpand:{a:{t:"1569683374330",viewBox:"0 0 1024 1024",version:"1.1","p-id":"9959"},c:'<path d="M952 612c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H298c-14.2-35.2-48.7-60-89-60-53 0-96 43-96 96s43 96 96 96c40.3 0 74.8-24.8 89-60h150.3v152c0 55.2 44.8 100 100 100H952c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H548.3c-15.5 0-28-12.5-28-28V612H952zM456 344h264v98.2c0 8.1 9.5 12.8 15.8 7.7l172.5-136.2c5-3.9 5-11.4 0-15.3L735.8 162.1c-6.4-5.1-15.8-0.5-15.8 7.7V268H456c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8z"></path>'},AiFillCarryOut:{a:{viewBox:"0 0 1024 1024"},c:'<path d="M880 184H712v-64c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H384v-64c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H144c-17.7 0-32 14.3-32 32v664c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V216c0-17.7-14.3-32-32-32zM694.5 432.7L481.9 725.4a16.1 16.1 0 0 1-26 0l-126.4-174c-3.8-5.3 0-12.7 6.5-12.7h55.2c5.1 0 10 2.5 13 6.6l64.7 89 150.9-207.8c3-4.1 7.8-6.6 13-6.6H688c6.5.1 10.3 7.5 6.5 12.8z"></path>'}};function Ft(t,n,e){const o=t.slice();return o[2]=n[e],o}function qt(n){let e,o,r,c;return o=new Ut({props:{src:Vt[n[2]]}}),{c(){e=m("div"),Q(o.$$.fragment),r=y()},m(t,n){$(t,e,n),W(o,e,null),d(e,r),c=!0},p:t,i(t){c||(F(o.$$.fragment,t),c=!0)},o(t){q(o.$$.fragment,t),c=!1},d(t){t&&h(e),X(o)}}}function Gt(t){let n,e,o,r,c=Object.keys(Vt),s=[];for(let n=0;n<c.length;n+=1)s[n]=qt(Ft(t,c,n));const i=t=>q(s[t],1,1,(()=>{s[t]=null}));return{c(){n=m("div"),n.textContent="IconsPack",e=y(),o=m("div");for(let t=0;t<s.length;t+=1)s[t].c()},m(t,c){$(t,n,c),$(t,e,c),$(t,o,c);for(let t=0;t<s.length;t+=1)s[t].m(o,null);r=!0},p(t,[n]){if(0&n){let e;for(c=Object.keys(Vt),e=0;e<c.length;e+=1){const r=Ft(t,c,e);s[e]?(s[e].p(r,n),F(s[e],1)):(s[e]=qt(r),s[e].c(),F(s[e],1),s[e].m(o,null))}for(U(),e=c.length;e<s.length;e+=1)i(e);V()}},i(t){if(!r){for(let t=0;t<c.length;t+=1)F(s[t]);r=!0}},o(t){s=s.filter(Boolean);for(let t=0;t<s.length;t+=1)q(s[t]);r=!1},d(t){t&&h(n),t&&h(e),t&&h(o),function(t,n){for(let e=0;e<t.length;e+=1)t[e]&&t[e].d(n)}(s,t)}}}function Jt(t,n,e){let{location:o}=n,{packId:r}=n;return console.log(Vt),t.$$set=t=>{"location"in t&&e(0,o=t.location),"packId"in t&&e(1,r=t.packId)},[o,r]}class Qt extends tt{constructor(t){super(),Z(this,t,Jt,Gt,s,{location:0,packId:1})}}function Wt(n){let e,o,r,c,s;return o=new Ht({props:{path:"/",component:Bt}}),c=new Ht({props:{path:"pack/:packId",component:Qt}}),{c(){e=m("main"),Q(o.$$.fragment),r=y(),Q(c.$$.fragment),x(e,"class","svelte-1sl1162")},m(t,n){$(t,e,n),W(o,e,null),d(e,r),W(c,e,null),s=!0},p:t,i(t){s||(F(o.$$.fragment,t),F(c.$$.fragment,t),s=!0)},o(t){q(o.$$.fragment,t),q(c.$$.fragment,t),s=!1},d(t){t&&h(e),X(o),X(c)}}}class Xt extends tt{constructor(t){super(),Z(this,t,null,Wt,s,{})}}function Yt(t){let n,e,o,r,c,s,i;return o=new zt({}),s=new Xt({}),{c(){n=m("div"),e=m("div"),Q(o.$$.fragment),r=y(),c=m("div"),Q(s.$$.fragment),x(e,"class","left svelte-1wv9dnp"),x(c,"class","right svelte-1wv9dnp"),x(n,"class","container svelte-1wv9dnp")},m(t,l){$(t,n,l),d(n,e),W(o,e,null),d(n,r),d(n,c),W(s,c,null),i=!0},i(t){i||(F(o.$$.fragment,t),F(s.$$.fragment,t),i=!0)},o(t){q(o.$$.fragment,t),q(s.$$.fragment,t),i=!1},d(t){t&&h(n),X(o),X(s)}}}function Zt(t){let n,e;return n=new wt({props:{$$slots:{default:[Yt]},$$scope:{ctx:t}}}),{c(){Q(n.$$.fragment)},m(t,o){W(n,t,o),e=!0},p(t,[e]){const o={};1&e&&(o.$$scope={dirty:e,ctx:t}),n.$set(o)},i(t){e||(F(n.$$.fragment,t),e=!0)},o(t){q(n.$$.fragment,t),e=!1},d(t){X(n,t)}}}return new class extends tt{constructor(t){super(),Z(this,t,null,Zt,s,{})}}({target:document.body})}();
