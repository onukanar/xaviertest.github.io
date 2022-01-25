import{J as ie,S as Ce,i as qe,s as Ge,e as g,t as E,j as L,K as kt,c as D,a as B,g as w,d as o,l as O,L as vt,b as G,f as $,H as r,h as Q,M as me,N as Ue,k as Re,I as Le,D as gt,O as Me,E as Et,F as Dt,G as wt,p as ke,n as ye,P as yt,Q as rt,R as St,v as We,w as Ie,x as He,A as je,o as Je,u as Tt,m as Ye,T as Bt,U as Pt}from"../chunks/vendor-20f07e42.js";function at(a,e,l){const t=new Date,n={value:e,expiry:t.getTime()+l};try{localStorage.setItem(a,JSON.stringify(n))}catch{}}function st(a){const e=localStorage.getItem(a);if(!e)return null;const l=JSON.parse(e);return new Date().getTime()>l.expiry?(localStorage.removeItem(a),null):l.value}let $e;async function Qe(){$e=$e||new window.ccxt.binance;let a=st("marketsData");return a||(a=await $e.loadMarkets(),at("marketsData",a,1e3*60*5)),a}async function $t(){$e=$e||new window.ccxt.binance;let a=st("tickersData");return a||(a=await $e.fetchTickers(),at("tickersData",a,1e3*60*30)),a}async function Nt(){const a={},e=await Qe();Object.keys(e).forEach(c=>{(!e[c].active||!e[c].spot)&&delete e[c]});const l={};Object.keys(e).forEach(c=>{const[u,s]=c.split("/");l[c]=c,l[`${s}/${u}`]=c}),Object.keys(e).map(c=>c.split("/")).flat().forEach(c=>{const u=Object.keys(e).filter(s=>e[s].base===c||e[s].quote===c);u.length>0&&(a[c]=u)});const t=[],n={},h={};Object.keys(a).forEach(c=>{a[c].forEach(u=>{const s=u.split("/"),_=s[0]===c?s[1]:s[0];!a[_]||a[_].filter(d=>d!==`${c}/${_}`&&d!==`${_}/${c}`).forEach(d=>{const T=d.split("/"),b=T[0]===_?T[1]:T[0];if(!!a[b]&&a[b].filter(k=>k===`${c}/${b}`||k===`${b}/${c}`).length){t.push([c,_,b,c]);const k=t.length-1;[c,_,b].forEach(v=>{n[v]=n[v]||[],n[v].push(k)});let m=l[`${c}/${_}`];h[m]=h[m]||[],h[m].push(k),m=l[`${_}/${b}`],h[m]=h[m]||[],h[m].push(k),m=l[`${c}/${b}`],h[m]=h[m]||[],h[m].push(k)}})})});function i(...c){return c.length>2?i(c[0],i(...c.slice(1))):c[0].filter(u=>c[1].includes(u))}function f(c,u){let s,_,d,T,b;if(u>c.length||u<=0)return[];if(u===c.length)return[c];if(u===1){for(d=[],s=0;s<c.length;s+=1)d.push([c[s]]);return d}for(d=[],s=0;s<c.length-u+1;s+=1)for(T=c.slice(s,s+1),b=f(c.slice(s+1),u-1),_=0;_<b.length;_+=1)d.push(T.concat(b[_]));return d}return{dict:a,hash:n,pairs:t,coinGroups:function(u){return f(u,3)},intersect:i,ids2pair:function(u){return u.map(s=>t[s])},pairToMarket:l,hashMarket:h}}async function At(a="100",e="0"){const l=await $t(),t=await Qe();function n(i,f){const c=h.BASE_USD_BUDGET,u="USDT,USDC,BUSD,DAI,PAX".split(",");let s="";if(u.indexOf(i)>-1)return new ie(c);for(let _=0;_<u.length;_+=1){const d=u[_],T=`${i}/${d}`,b=`${d}/${i}`;if(t[T]&&f[T])return s=T,new ie(c).div(f[s].bidPrice).toDecimalPlaces(t[s].precision.amount,ie.ROUND_DOWN);if(t[b]&&f[b])return s=b,new ie(c).mul(f[s].bidPrice).toDecimalPlaces(t[s].precision.quote,ie.ROUND_DOWN)}for(let _=0;_<u.length;_+=1){const d=u[_],T=`${i}/${d}`,b=`${d}/${i}`;if(t[T]&&l[T])return s=T,new ie(c).div(l[s].bid).toDecimalPlaces(t[s].precision.amount,ie.ROUND_DOWN);if(t[b]&&l[b])return s=b,new ie(c).mul(l[s].bid).toDecimalPlaces(t[s].precision.quote,ie.ROUND_DOWN)}throw new Error(`no budget price for ${i}`)}function h(i,f){const c=[];for(let u=0;u<i.length;u+=1){const s=i[u];let _;try{_=new ie(n(s[0],f))}catch{continue}let d=_;const T=[],b=[];let k=!1;for(let m=0;m<3;m+=1){const v=[s[m],s[m+1]].join("/"),P=[s[m+1],s[m]].join("/");if(b.push(d+s[m]),f[v]&&t[v]){if(!f[v].bidPrice){k=!0;break}const S=ie(f[v].bidPrice).toDecimalPlaces(t[v].precision.price,ie.ROUND_DOWN);d=d.toDecimalPlaces(t[v].precision.amount,ie.ROUND_DOWN),T.push({market:v,side:"sell",amount:d,price:S,link:`https://www.binance.com/en/trade/${v.replace("/","_")}?ref=OJN3QQMJ`,total:d.mul(S).toDecimalPlaces(t[v].precision.quote,ie.ROUND_DOWN)}),d=d.mul(S),b.push(JSON.stringify({n:v,p:f[v]}))}else if(f[P]&&t[P]){if(!f[P].askPrice){k=!0;break}const S=ie(f[P].askPrice).toDecimalPlaces(t[P].precision.price,ie.ROUND_DOWN),N=d;d=d.div(S).toDecimalPlaces(t[P].precision.amount,ie.ROUND_DOWN),T.push({market:P,side:"buy",amount:d,price:S,link:`https://www.binance.com/en/trade/${P.replace("/","_")}`,total:N.toDecimalPlaces(t[P].precision.quote,ie.ROUND_DOWN)})}else{k=!0;break}}if(!k){const m=ie(h.FEE).mul(3),v=d.div(_).sub(m);c.push({chain:s,profit:v,orders:T})}}return c}return h.BASE_USD_BUDGET="100",h.FEE=0,h}async function Lt(a=["!bookTicker"]){const e=await Qe(),l={},t={};Object.keys(e).forEach(s=>{l[e[s].info.symbol]=s,l[s]=e[s].info.symbol});let n=a;a[0]!=="!bookTicker"&&(n=a.map(s=>t[s]).filter(s=>s).map(s=>`${s.toLowerCase()}@bookTicker`));const h={},i={name:"binance",m:h,socket:"",update:[],pairupdate:[],last:+new Date,msgcount:0},f={};function c(s){i.msgcount+=1;const _=JSON.parse(s.data);if(_.stream&&(_.stream.split("@")[1]==="bookTicker"||_.stream==="!bookTicker")){const{u:d,s:T,b,a:k,B:m,A:v}=_.data,P=parseFloat(m),S=parseFloat(v);if(!P||!S||!v||!m){delete h[T];return}if(i.last=+new Date,f[T]&&d<f[T])return;f[T]=d;let N=T;N=l[T],i.pairupdate.includes(N)||i.pairupdate.push(N),h[N]={last:i.last,bidPrice:b,bidQty:m,askPrice:k,askQty:v}}}function u(){const s=new WebSocket("wss://stream.binance.com/stream");return s.onopen=()=>{console.log("binance socket connected"),s.send(JSON.stringify({method:"SUBSCRIBE",params:n,id:1}))},s.onmessage=c,s}return i.socket=u(),i.socket.onclose=()=>{Object.keys(i.m).forEach(s=>{delete i.m[s]}),console.log("Binance WebSocket connection disconnected"),clearInterval(i.heartbeat),setTimeout(()=>{i.socket=u()},100)},i.reset=()=>{i.socket.close()},i}function nt(a,e,l){const t=a.slice();return t[1]=e[l],t[3]=l,t}function it(a,e,l){const t=a.slice();return t[4]=e[l],t[6]=l,t}function ot(a,e,l){const t=a.slice();return t[4]=e[l],t[6]=l,t}function Ot(a){let e,l;return{c(){e=g("b"),l=E("SELL"),this.h()},l(t){e=D(t,"B",{style:!0});var n=B(e);l=w(n,"SELL"),n.forEach(o),this.h()},h(){me(e,"color","#f84960")},m(t,n){$(t,e,n),r(e,l)},d(t){t&&o(e)}}}function Ut(a){let e,l;return{c(){e=g("b"),l=E("BUY"),this.h()},l(t){e=D(t,"B",{style:!0});var n=B(e);l=w(n,"BUY"),n.forEach(o),this.h()},h(){me(e,"color","#02c076")},m(t,n){$(t,e,n),r(e,l)},d(t){t&&o(e)}}}function ct(a){let e,l,t,n,h,i=a[4].market+"",f,c,u,s,_=a[4].price+"",d,T,b,k=a[4].market.split("/")[1]+"",m,v,P,S=a[4].amount+"",N,j,Y,J=a[4].market.split("/")[0]+"",V,C,M,H=a[4].total+"",X,y,p,U=a[4].market.split("/")[1]+"",le,ce;function ee(F,q){return F[4].side==="buy"?Ut:Ot}let oe=ee(a),fe=oe(a);return{c(){e=g("tr"),l=g("td"),fe.c(),t=L(),n=g("td"),h=g("a"),f=E(i),u=L(),s=g("td"),d=E(_),T=L(),b=g("small"),m=E(k),v=L(),P=g("td"),N=E(S),j=L(),Y=g("small"),V=E(J),C=L(),M=g("td"),X=E(H),y=L(),p=g("small"),le=E(U),ce=L(),this.h()},l(F){e=D(F,"TR",{});var q=B(e);l=D(q,"TD",{});var ve=B(l);fe.l(ve),ve.forEach(o),t=O(q),n=D(q,"TD",{});var we=B(n);h=D(we,"A",{href:!0,target:!0});var ge=B(h);f=w(ge,i),ge.forEach(o),we.forEach(o),u=O(q),s=D(q,"TD",{});var be=B(s);d=w(be,_),T=O(be),b=D(be,"SMALL",{style:!0});var ue=B(b);m=w(ue,k),ue.forEach(o),be.forEach(o),v=O(q),P=D(q,"TD",{});var Ee=B(P);N=w(Ee,S),j=O(Ee),Y=D(Ee,"SMALL",{style:!0});var Se=B(Y);V=w(Se,J),Se.forEach(o),Ee.forEach(o),C=O(q),M=D(q,"TD",{});var de=B(M);X=w(de,H),y=O(de),p=D(de,"SMALL",{style:!0});var De=B(p);le=w(De,U),De.forEach(o),de.forEach(o),ce=O(q),q.forEach(o),this.h()},h(){G(h,"href",c=a[4].link),G(h,"target","_blank"),me(b,"font-weight","bold"),me(Y,"font-weight","bold"),me(p,"font-weight","bold")},m(F,q){$(F,e,q),r(e,l),fe.m(l,null),r(e,t),r(e,n),r(n,h),r(h,f),r(e,u),r(e,s),r(s,d),r(s,T),r(s,b),r(b,m),r(e,v),r(e,P),r(P,N),r(P,j),r(P,Y),r(Y,V),r(e,C),r(e,M),r(M,X),r(M,y),r(M,p),r(p,le),r(e,ce)},p(F,q){oe!==(oe=ee(F))&&(fe.d(1),fe=oe(F),fe&&(fe.c(),fe.m(l,null))),q&1&&i!==(i=F[4].market+"")&&Q(f,i),q&1&&c!==(c=F[4].link)&&G(h,"href",c),q&1&&_!==(_=F[4].price+"")&&Q(d,_),q&1&&k!==(k=F[4].market.split("/")[1]+"")&&Q(m,k),q&1&&S!==(S=F[4].amount+"")&&Q(N,S),q&1&&J!==(J=F[4].market.split("/")[0]+"")&&Q(V,J),q&1&&H!==(H=F[4].total+"")&&Q(X,H),q&1&&U!==(U=F[4].market.split("/")[1]+"")&&Q(le,U)},d(F){F&&o(e),fe.d()}}}function Rt(a){let e,l,t,n=a[4].amount+"",h,i,f,c=a[4].market.split("/")[0]+"",u,s,_=a[4].total+"",d,T,b,k=a[4].market.split("/")[1]+"",m,v,P,S=a[4].market+"",N,j,Y,J=a[4].price+"",V,C,M,H=a[4].market.split("/")[1]+"",X;return{c(){e=g("b"),l=E("SELL"),t=L(),h=E(n),i=L(),f=g("small"),u=E(c),s=E(`
          to get `),d=E(_),T=L(),b=g("small"),m=E(k),v=E(`
          in market `),P=g("a"),N=E(S),Y=E(" @"),V=E(J),C=L(),M=g("small"),X=E(H),this.h()},l(y){e=D(y,"B",{style:!0});var p=B(e);l=w(p,"SELL"),p.forEach(o),t=O(y),h=w(y,n),i=O(y),f=D(y,"SMALL",{style:!0});var U=B(f);u=w(U,c),U.forEach(o),s=w(y,`
          to get `),d=w(y,_),T=O(y),b=D(y,"SMALL",{style:!0});var le=B(b);m=w(le,k),le.forEach(o),v=w(y,`
          in market `),P=D(y,"A",{href:!0,target:!0});var ce=B(P);N=w(ce,S),ce.forEach(o),Y=w(y," @"),V=w(y,J),C=O(y),M=D(y,"SMALL",{style:!0});var ee=B(M);X=w(ee,H),ee.forEach(o),this.h()},h(){me(e,"color","#f84960"),me(f,"font-weight","bold"),me(b,"font-weight","bold"),G(P,"href",j=a[4].link),G(P,"target","_blank"),me(M,"font-weight","bold")},m(y,p){$(y,e,p),r(e,l),$(y,t,p),$(y,h,p),$(y,i,p),$(y,f,p),r(f,u),$(y,s,p),$(y,d,p),$(y,T,p),$(y,b,p),r(b,m),$(y,v,p),$(y,P,p),r(P,N),$(y,Y,p),$(y,V,p),$(y,C,p),$(y,M,p),r(M,X)},p(y,p){p&1&&n!==(n=y[4].amount+"")&&Q(h,n),p&1&&c!==(c=y[4].market.split("/")[0]+"")&&Q(u,c),p&1&&_!==(_=y[4].total+"")&&Q(d,_),p&1&&k!==(k=y[4].market.split("/")[1]+"")&&Q(m,k),p&1&&S!==(S=y[4].market+"")&&Q(N,S),p&1&&j!==(j=y[4].link)&&G(P,"href",j),p&1&&J!==(J=y[4].price+"")&&Q(V,J),p&1&&H!==(H=y[4].market.split("/")[1]+"")&&Q(X,H)},d(y){y&&o(e),y&&o(t),y&&o(h),y&&o(i),y&&o(f),y&&o(s),y&&o(d),y&&o(T),y&&o(b),y&&o(v),y&&o(P),y&&o(Y),y&&o(V),y&&o(C),y&&o(M)}}}function Mt(a){let e,l=a[4].total+"",t,n,h,i=a[4].market.split("/")[1]+"",f,c,u,s,_,d=a[4].amount+"",T,b,k,m=a[4].market.split("/")[0]+"",v,P,S,N=a[4].market+"",j,Y,J,V=a[4].price+"",C,M,H,X=a[4].market.split("/")[1]+"",y;return{c(){e=E("Use "),t=E(l),n=L(),h=g("small"),f=E(i),c=E(`
          to `),u=g("b"),s=E("BUY"),_=L(),T=E(d),b=L(),k=g("small"),v=E(m),P=E(`
          in market `),S=g("a"),j=E(N),J=E(" @"),C=E(V),M=L(),H=g("small"),y=E(X),this.h()},l(p){e=w(p,"Use "),t=w(p,l),n=O(p),h=D(p,"SMALL",{style:!0});var U=B(h);f=w(U,i),U.forEach(o),c=w(p,`
          to `),u=D(p,"B",{style:!0});var le=B(u);s=w(le,"BUY"),le.forEach(o),_=O(p),T=w(p,d),b=O(p),k=D(p,"SMALL",{style:!0});var ce=B(k);v=w(ce,m),ce.forEach(o),P=w(p,`
          in market `),S=D(p,"A",{href:!0,target:!0});var ee=B(S);j=w(ee,N),ee.forEach(o),J=w(p," @"),C=w(p,V),M=O(p),H=D(p,"SMALL",{style:!0});var oe=B(H);y=w(oe,X),oe.forEach(o),this.h()},h(){me(h,"font-weight","bold"),me(u,"color","#02c076"),me(k,"font-weight","bold"),G(S,"href",Y=a[4].link),G(S,"target","_blank"),me(H,"font-weight","bold")},m(p,U){$(p,e,U),$(p,t,U),$(p,n,U),$(p,h,U),r(h,f),$(p,c,U),$(p,u,U),r(u,s),$(p,_,U),$(p,T,U),$(p,b,U),$(p,k,U),r(k,v),$(p,P,U),$(p,S,U),r(S,j),$(p,J,U),$(p,C,U),$(p,M,U),$(p,H,U),r(H,y)},p(p,U){U&1&&l!==(l=p[4].total+"")&&Q(t,l),U&1&&i!==(i=p[4].market.split("/")[1]+"")&&Q(f,i),U&1&&d!==(d=p[4].amount+"")&&Q(T,d),U&1&&m!==(m=p[4].market.split("/")[0]+"")&&Q(v,m),U&1&&N!==(N=p[4].market+"")&&Q(j,N),U&1&&Y!==(Y=p[4].link)&&G(S,"href",Y),U&1&&V!==(V=p[4].price+"")&&Q(C,V),U&1&&X!==(X=p[4].market.split("/")[1]+"")&&Q(y,X)},d(p){p&&o(e),p&&o(t),p&&o(n),p&&o(h),p&&o(c),p&&o(u),p&&o(_),p&&o(T),p&&o(b),p&&o(k),p&&o(P),p&&o(S),p&&o(J),p&&o(C),p&&o(M),p&&o(H)}}}function ft(a){let e=a[6]+1+"",l,t,n,h;function i(u,s){return u[4].side==="buy"?Mt:Rt}let f=i(a),c=f(a);return{c(){l=E(e),t=E(`.
        `),c.c(),n=L(),h=g("br")},l(u){l=w(u,e),t=w(u,`.
        `),c.l(u),n=O(u),h=D(u,"BR",{})},m(u,s){$(u,l,s),$(u,t,s),c.m(u,s),$(u,n,s),$(u,h,s)},p(u,s){f===(f=i(u))&&c?c.p(u,s):(c.d(1),c=f(u),c&&(c.c(),c.m(n.parentNode,n)))},d(u){u&&o(l),u&&o(t),c.d(u),u&&o(n),u&&o(h)}}}function ut(a){let e,l,t,n=a[3]+1+"",h,i,f,c=a[1].chain.join(" &rarr; ")+"",u,s,_,d,T=a[1].time+"",b,k,m,v,P,S,N,j,Y,J,V,C,M,H,X,y,p,U,le,ce,ee,oe,fe,F,q,ve,we,ge=a[1].profit.sub(1).mul(100).toFixed(4)+"",be,ue,Ee,Se,de,De,Te=a[1].orders,re=[];for(let R=0;R<Te.length;R+=1)re[R]=ct(ot(a,Te,R));let ae=a[1].orders,z=[];for(let R=0;R<ae.length;R+=1)z[R]=ft(it(a,ae,R));return{c(){e=g("p"),l=g("b"),t=E("#"),h=E(n),i=L(),f=new kt,u=g("br"),s=L(),_=g("small"),d=E("Time found: "),b=E(T),k=L(),m=g("div"),v=g("table"),P=g("thead"),S=g("tr"),N=g("th"),j=E("Side"),Y=L(),J=g("th"),V=E("Market"),C=L(),M=g("th"),H=E("Price"),X=L(),y=g("th"),p=E("Amount"),U=L(),le=g("th"),ce=E("Total"),ee=L(),oe=g("tbody");for(let R=0;R<re.length;R+=1)re[R].c();fe=L(),F=g("p");for(let R=0;R<z.length;R+=1)z[R].c();q=L(),ve=g("br"),we=E(`
    Total profit (counting all binance BNB fees) `),be=E(ge),ue=E(`%
    `),Ee=g("br"),Se=L(),de=g("hr"),De=L(),this.h()},l(R){e=D(R,"P",{});var K=B(e);l=D(K,"B",{});var W=B(l);t=w(W,"#"),h=w(W,n),W.forEach(o),i=O(K),f=vt(K),u=D(K,"BR",{}),s=O(K),_=D(K,"SMALL",{});var he=B(_);d=w(he,"Time found: "),b=w(he,T),he.forEach(o),K.forEach(o),k=O(R),m=D(R,"DIV",{class:!0});var pe=B(m);v=D(pe,"TABLE",{class:!0});var te=B(v);P=D(te,"THEAD",{});var Ne=B(P);S=D(Ne,"TR",{});var se=B(S);N=D(se,"TH",{});var Ae=B(N);j=w(Ae,"Side"),Ae.forEach(o),Y=O(se),J=D(se,"TH",{});var ne=B(J);V=w(ne,"Market"),ne.forEach(o),C=O(se),M=D(se,"TH",{});var Z=B(M);H=w(Z,"Price"),Z.forEach(o),X=O(se),y=D(se,"TH",{});var x=B(y);p=w(x,"Amount"),x.forEach(o),U=O(se),le=D(se,"TH",{});var I=B(le);ce=w(I,"Total"),I.forEach(o),se.forEach(o),Ne.forEach(o),ee=O(te),oe=D(te,"TBODY",{});var A=B(oe);for(let Be=0;Be<re.length;Be+=1)re[Be].l(A);A.forEach(o),te.forEach(o),fe=O(pe),F=D(pe,"P",{});var _e=B(F);for(let Be=0;Be<z.length;Be+=1)z[Be].l(_e);q=O(_e),ve=D(_e,"BR",{}),we=w(_e,`
    Total profit (counting all binance BNB fees) `),be=w(_e,ge),ue=w(_e,`%
    `),Ee=D(_e,"BR",{}),_e.forEach(o),Se=O(pe),de=D(pe,"HR",{}),De=O(pe),pe.forEach(o),this.h()},h(){f.a=u,G(v,"class","styled-table"),G(m,"class","instructions")},m(R,K){$(R,e,K),r(e,l),r(l,t),r(l,h),r(e,i),f.m(c,e),r(e,u),r(e,s),r(e,_),r(_,d),r(_,b),$(R,k,K),$(R,m,K),r(m,v),r(v,P),r(P,S),r(S,N),r(N,j),r(S,Y),r(S,J),r(J,V),r(S,C),r(S,M),r(M,H),r(S,X),r(S,y),r(y,p),r(S,U),r(S,le),r(le,ce),r(v,ee),r(v,oe);for(let W=0;W<re.length;W+=1)re[W].m(oe,null);r(m,fe),r(m,F);for(let W=0;W<z.length;W+=1)z[W].m(F,null);r(F,q),r(F,ve),r(F,we),r(F,be),r(F,ue),r(F,Ee),r(m,Se),r(m,de),r(m,De)},p(R,K){if(K&1&&c!==(c=R[1].chain.join(" &rarr; ")+"")&&f.p(c),K&1&&T!==(T=R[1].time+"")&&Q(b,T),K&1){Te=R[1].orders;let W;for(W=0;W<Te.length;W+=1){const he=ot(R,Te,W);re[W]?re[W].p(he,K):(re[W]=ct(he),re[W].c(),re[W].m(oe,null))}for(;W<re.length;W+=1)re[W].d(1);re.length=Te.length}if(K&1){ae=R[1].orders;let W;for(W=0;W<ae.length;W+=1){const he=it(R,ae,W);z[W]?z[W].p(he,K):(z[W]=ft(he),z[W].c(),z[W].m(F,q))}for(;W<z.length;W+=1)z[W].d(1);z.length=ae.length}K&1&&ge!==(ge=R[1].profit.sub(1).mul(100).toFixed(4)+"")&&Q(be,ge)},d(R){R&&o(e),R&&o(k),R&&o(m),Ue(re,R),Ue(z,R)}}}function Wt(a){let e,l=a[0],t=[];for(let n=0;n<l.length;n+=1)t[n]=ut(nt(a,l,n));return{c(){for(let n=0;n<t.length;n+=1)t[n].c();e=Re()},l(n){for(let h=0;h<t.length;h+=1)t[h].l(n);e=Re()},m(n,h){for(let i=0;i<t.length;i+=1)t[i].m(n,h);$(n,e,h)},p(n,[h]){if(h&1){l=n[0];let i;for(i=0;i<l.length;i+=1){const f=nt(n,l,i);t[i]?t[i].p(f,h):(t[i]=ut(f),t[i].c(),t[i].m(e.parentNode,e))}for(;i<t.length;i+=1)t[i].d(1);t.length=l.length}},i:Le,o:Le,d(n){Ue(t,n),n&&o(e)}}}function It(a,e,l){let{results:t=[]}=e;return a.$$set=n=>{"results"in n&&l(0,t=n.results)},[t]}class Ve extends Ce{constructor(e){super();qe(this,e,It,Wt,Ge,{results:0})}}function Ht(a){let e,l,t,n,h,i,f,c;const u=a[2].default,s=gt(u,a,a[1],null);return{c(){e=g("div"),l=g("div"),t=g("span"),n=E("\xD7"),h=L(),s&&s.c(),this.h()},l(_){e=D(_,"DIV",{id:!0,class:!0});var d=B(e);l=D(d,"DIV",{class:!0});var T=B(l);t=D(T,"SPAN",{class:!0});var b=B(t);n=w(b,"\xD7"),b.forEach(o),h=O(T),s&&s.l(T),T.forEach(o),d.forEach(o),this.h()},h(){G(t,"class","close svelte-3qf9p8"),G(l,"class","modal-content svelte-3qf9p8"),G(e,"id","myModal"),G(e,"class","modal svelte-3qf9p8")},m(_,d){$(_,e,d),r(e,l),r(l,t),r(t,n),r(l,h),s&&s.m(l,null),i=!0,f||(c=Me(t,"click",a[0]),f=!0)},p(_,[d]){s&&s.p&&(!i||d&2)&&Et(s,u,_,_[1],i?wt(u,_[1],d,null):Dt(_[1]),null)},i(_){i||(ke(s,_),i=!0)},o(_){ye(s,_),i=!1},d(_){_&&o(e),s&&s.d(_),f=!1,c()}}}function jt(a,e,l){let{$$slots:t={},$$scope:n}=e;const h=yt();function i(){h("close")}return a.$$set=f=>{"$$scope"in f&&l(1,n=f.$$scope)},[i,n,t]}class Ft extends Ce{constructor(e){super();qe(this,e,jt,Ht,Ge,{})}}function ht(a,e,l){const t=a.slice();return t[13]=e[l],t}function pt(a){let e,l,t=a[1].BASE_USD_BUDGET+"",n,h,i=a[1].FEE*100+"",f,c,u,s,_=a[0]/1e4+"",d,T,b,k,m,v,P;return{c(){e=g("blockquote"),l=E("Trades profit are calculate on a base budget of "),n=E(t),h=E("USD and a "),f=E(i),c=E("% fee"),u=L(),s=g("div"),d=E(_),T=E("% "),b=g("br"),k=L(),m=g("input"),this.h()},l(S){e=D(S,"BLOCKQUOTE",{class:!0});var N=B(e);l=w(N,"Trades profit are calculate on a base budget of "),n=w(N,t),h=w(N,"USD and a "),f=w(N,i),c=w(N,"% fee"),N.forEach(o),u=O(S),s=D(S,"DIV",{});var j=B(s);d=w(j,_),T=w(j,"% "),b=D(j,"BR",{}),k=O(j),m=D(j,"INPUT",{type:!0,min:!0,max:!0,step:!0}),j.forEach(o),this.h()},h(){G(e,"class","shadow mx-auto w-2/3 bg-white p-4 my-2"),G(m,"type","range"),G(m,"min","0"),G(m,"max","10000"),G(m,"step","1")},m(S,N){$(S,e,N),r(e,l),r(e,n),r(e,h),r(e,f),r(e,c),$(S,u,N),$(S,s,N),r(s,d),r(s,T),r(s,b),r(s,k),r(s,m),rt(m,a[0]),v||(P=[Me(m,"change",a[10]),Me(m,"input",a[10])],v=!0)},p(S,N){N&2&&t!==(t=S[1].BASE_USD_BUDGET+"")&&Q(n,t),N&2&&i!==(i=S[1].FEE*100+"")&&Q(f,i),N&1&&_!==(_=S[0]/1e4+"")&&Q(d,_),N&1&&rt(m,S[0])},d(S){S&&o(e),S&&o(u),S&&o(s),v=!1,St(P)}}}function Ct(a){let e,l;return e=new Ve({props:{results:a[6]}}),{c(){We(e.$$.fragment)},l(t){Ie(e.$$.fragment,t)},m(t,n){He(e,t,n),l=!0},p(t,n){const h={};n&64&&(h.results=t[6]),e.$set(h)},i(t){l||(ke(e.$$.fragment,t),l=!0)},o(t){ye(e.$$.fragment,t),l=!1},d(t){je(e,t)}}}function qt(a){let e,l;return{c(){e=g("b"),l=E("No winner pair yet")},l(t){e=D(t,"B",{});var n=B(e);l=w(n,"No winner pair yet"),n.forEach(o)},m(t,n){$(t,e,n),r(e,l)},p:Le,i:Le,o:Le,d(t){t&&o(e)}}}function _t(a){let e,l,t,n,h,i,f,c,u,s,_,d,T=a[7],b=[];for(let k=0;k<T.length;k+=1)b[k]=mt(ht(a,T,k));return{c(){e=g("h2"),l=E("Pairs"),t=L(),n=g("table"),h=g("thead"),i=g("th"),f=E("Pairs cycle"),c=L(),u=g("th"),s=E("Profit (BNB Fess included)"),_=L(),d=g("tbody");for(let k=0;k<b.length;k+=1)b[k].c();this.h()},l(k){e=D(k,"H2",{});var m=B(e);l=w(m,"Pairs"),m.forEach(o),t=O(k),n=D(k,"TABLE",{class:!0});var v=B(n);h=D(v,"THEAD",{});var P=B(h);i=D(P,"TH",{});var S=B(i);f=w(S,"Pairs cycle"),S.forEach(o),c=O(P),u=D(P,"TH",{});var N=B(u);s=w(N,"Profit (BNB Fess included)"),N.forEach(o),P.forEach(o),_=O(v),d=D(v,"TBODY",{});var j=B(d);for(let Y=0;Y<b.length;Y+=1)b[Y].l(j);j.forEach(o),v.forEach(o),this.h()},h(){G(n,"class","styled-table pairs-table svelte-1cncfbg")},m(k,m){$(k,e,m),r(e,l),$(k,t,m),$(k,n,m),r(n,h),r(h,i),r(i,f),r(h,c),r(h,u),r(u,s),r(n,_),r(n,d);for(let v=0;v<b.length;v+=1)b[v].m(d,null)},p(k,m){if(m&384){T=k[7];let v;for(v=0;v<T.length;v+=1){const P=ht(k,T,v);b[v]?b[v].p(P,m):(b[v]=mt(P),b[v].c(),b[v].m(d,null))}for(;v<b.length;v+=1)b[v].d(1);b.length=T.length}},d(k){k&&o(e),k&&o(t),k&&o(n),Ue(b,k)}}}function mt(a){let e,l,t=a[13].chain.join(" &rarr; ")+"",n,h,i,f=a[13].profit.sub(1).mul(100).toFixed(4)+"",c,u,s,_,d;function T(){return a[11](a[13])}return{c(){e=g("tr"),l=g("td"),n=L(),h=g("td"),i=g("pre"),c=E(f),u=E("% \u24D8"),s=L(),this.h()},l(b){e=D(b,"TR",{class:!0});var k=B(e);l=D(k,"TD",{style:!0});var m=B(l);m.forEach(o),n=O(k),h=D(k,"TD",{});var v=B(h);i=D(v,"PRE",{});var P=B(i);c=w(P,f),u=w(P,"% \u24D8"),P.forEach(o),v.forEach(o),s=O(k),k.forEach(o),this.h()},h(){me(l,"min-width","295px"),G(e,"class","cursor-pointer")},m(b,k){$(b,e,k),r(e,l),l.innerHTML=t,r(e,n),r(e,h),r(h,i),r(i,c),r(i,u),r(e,s),_||(d=Me(e,"click",T),_=!0)},p(b,k){a=b,k&128&&t!==(t=a[13].chain.join(" &rarr; ")+"")&&(l.innerHTML=t),k&128&&f!==(f=a[13].profit.sub(1).mul(100).toFixed(4)+"")&&Q(c,f)},d(b){b&&o(e),_=!1,d()}}}function bt(a){let e,l,t,n,h;return n=new Ve({props:{results:a[5]}}),{c(){e=g("h2"),l=E("PREV CYCLE WINNERS"),t=L(),We(n.$$.fragment)},l(i){e=D(i,"H2",{});var f=B(e);l=w(f,"PREV CYCLE WINNERS"),f.forEach(o),t=O(i),Ie(n.$$.fragment,i)},m(i,f){$(i,e,f),r(e,l),$(i,t,f),He(n,i,f),h=!0},p(i,f){const c={};f&32&&(c.results=i[5]),n.$set(c)},i(i){h||(ke(n.$$.fragment,i),h=!0)},o(i){ye(n.$$.fragment,i),h=!1},d(i){i&&o(e),i&&o(t),je(n,i)}}}function dt(a){let e,l;return e=new Ft({props:{$$slots:{default:[Gt]},$$scope:{ctx:a}}}),e.$on("close",a[12]),{c(){We(e.$$.fragment)},l(t){Ie(e.$$.fragment,t)},m(t,n){He(e,t,n),l=!0},p(t,n){const h={};n&65544&&(h.$$scope={dirty:n,ctx:t}),e.$set(h)},i(t){l||(ke(e.$$.fragment,t),l=!0)},o(t){ye(e.$$.fragment,t),l=!1},d(t){je(e,t)}}}function Gt(a){let e,l;return e=new Ve({props:{results:[a[3]]}}),{c(){We(e.$$.fragment)},l(t){Ie(e.$$.fragment,t)},m(t,n){He(e,t,n),l=!0},p(t,n){const h={};n&8&&(h.results=[t[3]]),e.$set(h)},i(t){l||(ke(e.$$.fragment,t),l=!0)},o(t){ye(e.$$.fragment,t),l=!1},d(t){je(e,t)}}}function Jt(a){let e,l,t,n,h,i,f,c,u,s,_,d,T,b,k,m,v,P,S,N,j=a[4].pairslen+"",Y,J,V,C,M=a[4].msgcount+"",H,X,y,p=a[4].cyclescheckedPerSecond+"",U,le,ce,ee,oe,fe,F,q,ve=a[4].currentStatus+"",we,ge,be,ue,Ee,Se,de,De,Te,re,ae,z,R,K,W,he,pe,te=a[1]&&pt(a);const Ne=[qt,Ct],se=[];function Ae(I,A){return I[6].length?1:0}ae=Ae(a),z=se[ae]=Ne[ae](a);let ne=a[7].length&&_t(a),Z=a[5]&&a[5].length&&bt(a),x=a[2]&&dt(a);return{c(){e=g("main"),l=g("h1"),t=E("Binance triangular arbitrage in real time"),n=L(),h=g("h1"),i=g("small"),f=E("find market imperfections easily!"),c=g("small"),u=g("a"),s=E("Star"),_=L(),d=g("p"),T=E(`Triangular arbitrage is the act of exploiting an arbitrage opportunity resulting from a pricing discrepancy among three different currencies. A triangular arbitrage strategy involves three trades, exchanging the initial currency for a second, the second currency for a third, and the third currency for the initial. During the second trade, the arbitrageur locks in a zero-risk profit from the discrepancy that exists when the market cross exchange rate is not aligned with the implicit cross exchange rate. A profitable trade is only possible if there exist market imperfections. Profitable triangular arbitrage is very rarely possible because when such opportunities arise, traders execute trades that take advantage of the imperfections and prices adjust up or down until the opportunity disappears.[6]

	`),b=g("p"),k=g("b"),m=E("Want to help me?"),v=E(` please register your binance account using my referral link visit
	`),P=g("a"),S=E("https://www.binance.com/en/register"),N=E(`


	Total combinations: `),Y=E(j),J=E(" pairs"),V=g("br"),C=E(`
	Socket updates per second: `),H=E(M),X=g("br"),y=E(`
	Cycles checked per second: `),U=E(p),le=g("br"),ce=L(),ee=g("big"),oe=E("Current status"),fe=g("br"),F=L(),q=g("b"),we=E(ve),ge=g("br"),be=L(),ue=g("a"),Ee=E("Star"),Se=L(),te&&te.c(),de=L(),De=g("h2"),Te=E("WINNERS"),re=L(),z.c(),R=L(),ne&&ne.c(),K=L(),Z&&Z.c(),W=L(),x&&x.c(),he=Re(),this.h()},l(I){e=D(I,"MAIN",{class:!0});var A=B(e);l=D(A,"H1",{class:!0});var _e=B(l);t=w(_e,"Binance triangular arbitrage in real time"),_e.forEach(o),n=O(A),h=D(A,"H1",{class:!0});var Be=B(h);i=D(Be,"SMALL",{});var Fe=B(i);f=w(Fe,"find market imperfections easily!"),c=D(Fe,"SMALL",{});var ze=B(c);u=D(ze,"A",{class:!0,href:!0,"data-icon":!0,"aria-label":!0});var Ke=B(u);s=w(Ke,"Star"),Ke.forEach(o),ze.forEach(o),Fe.forEach(o),Be.forEach(o),_=O(A),d=D(A,"P",{});var Xe=B(d);T=w(Xe,`Triangular arbitrage is the act of exploiting an arbitrage opportunity resulting from a pricing discrepancy among three different currencies. A triangular arbitrage strategy involves three trades, exchanging the initial currency for a second, the second currency for a third, and the third currency for the initial. During the second trade, the arbitrageur locks in a zero-risk profit from the discrepancy that exists when the market cross exchange rate is not aligned with the implicit cross exchange rate. A profitable trade is only possible if there exist market imperfections. Profitable triangular arbitrage is very rarely possible because when such opportunities arise, traders execute trades that take advantage of the imperfections and prices adjust up or down until the opportunity disappears.[6]

	`),Xe.forEach(o),b=D(A,"P",{});var Oe=B(b);k=D(Oe,"B",{});var Ze=B(k);m=w(Ze,"Want to help me?"),Ze.forEach(o),v=w(Oe,` please register your binance account using my referral link visit
	`),P=D(Oe,"A",{href:!0});var xe=B(P);S=w(xe,"https://www.binance.com/en/register"),xe.forEach(o),Oe.forEach(o),N=w(A,`


	Total combinations: `),Y=w(A,j),J=w(A," pairs"),V=D(A,"BR",{}),C=w(A,`
	Socket updates per second: `),H=w(A,M),X=D(A,"BR",{}),y=w(A,`
	Cycles checked per second: `),U=w(A,p),le=D(A,"BR",{}),ce=O(A),ee=D(A,"BIG",{});var Pe=B(ee);oe=w(Pe,"Current status"),fe=D(Pe,"BR",{}),F=O(Pe),q=D(Pe,"B",{});var et=B(q);we=w(et,ve),et.forEach(o),ge=D(Pe,"BR",{}),Pe.forEach(o),be=O(A),ue=D(A,"A",{class:!0,href:!0,"data-icon":!0,"aria-label":!0});var tt=B(ue);Ee=w(tt,"Star"),tt.forEach(o),Se=O(A),te&&te.l(A),de=O(A),De=D(A,"H2",{});var lt=B(De);Te=w(lt,"WINNERS"),lt.forEach(o),re=O(A),z.l(A),R=O(A),ne&&ne.l(A),K=O(A),Z&&Z.l(A),A.forEach(o),W=O(I),x&&x.l(I),he=Re(),this.h()},h(){G(l,"class","svelte-1cncfbg"),G(u,"class","github-button"),G(u,"href","https://github.com/eugenioclrc/binance-crypto-triangular-arbitrage"),G(u,"data-icon","octicon-star"),G(u,"aria-label","Star eugenioclrc/binance-crypto-triangular-arbitrage on GitHub"),G(h,"class","svelte-1cncfbg"),G(P,"href","https://www.binance.com/en/register?ref=Q952PPIF"),G(ue,"class","github-button"),G(ue,"href","https://github.com/eugenioclrc/binance-crypto-triangular-arbitrage"),G(ue,"data-icon","octicon-star"),G(ue,"aria-label","Star eugenioclrc/binance-crypto-triangular-arbitrage on GitHub"),G(e,"class","svelte-1cncfbg")},m(I,A){$(I,e,A),r(e,l),r(l,t),r(e,n),r(e,h),r(h,i),r(i,f),r(i,c),r(c,u),r(u,s),r(e,_),r(e,d),r(d,T),r(e,b),r(b,k),r(k,m),r(b,v),r(b,P),r(P,S),r(e,N),r(e,Y),r(e,J),r(e,V),r(e,C),r(e,H),r(e,X),r(e,y),r(e,U),r(e,le),r(e,ce),r(e,ee),r(ee,oe),r(ee,fe),r(ee,F),r(ee,q),r(q,we),r(ee,ge),r(e,be),r(e,ue),r(ue,Ee),r(e,Se),te&&te.m(e,null),r(e,de),r(e,De),r(De,Te),r(e,re),se[ae].m(e,null),r(e,R),ne&&ne.m(e,null),r(e,K),Z&&Z.m(e,null),$(I,W,A),x&&x.m(I,A),$(I,he,A),pe=!0},p(I,[A]){(!pe||A&16)&&j!==(j=I[4].pairslen+"")&&Q(Y,j),(!pe||A&16)&&M!==(M=I[4].msgcount+"")&&Q(H,M),(!pe||A&16)&&p!==(p=I[4].cyclescheckedPerSecond+"")&&Q(U,p),(!pe||A&16)&&ve!==(ve=I[4].currentStatus+"")&&Q(we,ve),I[1]?te?te.p(I,A):(te=pt(I),te.c(),te.m(e,de)):te&&(te.d(1),te=null);let _e=ae;ae=Ae(I),ae===_e?se[ae].p(I,A):(Ye(),ye(se[_e],1,1,()=>{se[_e]=null}),Je(),z=se[ae],z?z.p(I,A):(z=se[ae]=Ne[ae](I),z.c()),ke(z,1),z.m(e,R)),I[7].length?ne?ne.p(I,A):(ne=_t(I),ne.c(),ne.m(e,K)):ne&&(ne.d(1),ne=null),I[5]&&I[5].length?Z?(Z.p(I,A),A&32&&ke(Z,1)):(Z=bt(I),Z.c(),ke(Z,1),Z.m(e,null)):Z&&(Ye(),ye(Z,1,1,()=>{Z=null}),Je()),I[2]?x?(x.p(I,A),A&4&&ke(x,1)):(x=dt(I),x.c(),ke(x,1),x.m(he.parentNode,he)):x&&(Ye(),ye(x,1,1,()=>{x=null}),Je())},i(I){pe||(ke(z),ke(Z),ke(x),pe=!0)},o(I){ye(z),ye(Z),ye(x),pe=!1},d(I){I&&o(e),te&&te.d(),se[ae].d(),ne&&ne.d(),Z&&Z.d(),I&&o(W),x&&x.d(I),I&&o(he)}}}const zt=!0,Yt=50;function Qt(a,e,l){let t=!1,n={},h=750;const i=m=>{l(2,t=!0),l(3,n=m)},f={pairslen:0,msgcount:0,cycleschecked:0,cyclescheckedPerSecond:0,currentStatus:""};let c=null,u=[],s=[],_,d;Tt(async()=>{const m=await Lt(),{hashMarket:v,pairs:P}=await Nt();return l(4,f.currentStatus="Connecting to binance",f),l(4,f.pairslen=P.length,f),l(4,f.socket=m,f),setInterval(()=>{l(4,f.msgcount=m.msgcount,f),m.msgcount=0,l(4,f.cyclescheckedPerSecond=f.cycleschecked,f),l(4,f.cycleschecked=0,f)},1e3),l(1,_=await At()),l(9,d=function S(){f.currentStatus==="Connecting to binance"?f.msgcount>0&&l(4,f.currentStatus="Working",f):l(4,f.currentStatus="Working",f);const N=+new Date,j=m.pairupdate,Y=m.m;m.pairupdate=[];let J=j.map(C=>v[C]).flat();if(J=[...new Set(J)].map(C=>P[C]).filter(C=>C),!J.length){setTimeout(S,50);return}let V;try{l(4,f.cycleschecked+=J.length,f),V=_(J,Y),V.sort((M,H)=>H.profit.sub(M.profit));const C=V.filter(M=>M.profit.gt(1));C.length&&(l(6,u=C),console.log(u),C.forEach(M=>{M.time=Bt().format();for(let H=0;H<M.length-1;H+=1)delete m.m[M[H]+"/"+M[H+1]],delete m.m[M[H+1]+"/"+M[H]]}))}catch(C){console.error(C),console.log(J)}if(console.log("cycle",+new Date-N,"ms"),u.length){l(4,f.currentStatus="Found profitable cycles, halt for 30 seconds",f),setTimeout(()=>{l(4,f.currentStatus="Working",f),l(5,c=u),l(6,u=[]),S()},1e3*30);return}l(7,s=V.slice(0,10)),setTimeout(S,Yt)}),setTimeout(d,1e3),()=>{}});function T(){h=Pt(this.value),l(0,h)}const b=m=>i(m),k=()=>l(2,t=!1);return a.$$.update=()=>{a.$$.dirty&515&&_&&d&&l(1,_.FEE=(h/1e6).toFixed(6),_)},[h,_,t,n,f,c,u,s,i,d,T,b,k]}class Kt extends Ce{constructor(e){super();qe(this,e,Qt,Jt,Ge,{})}}export{Kt as default,zt as prerender};