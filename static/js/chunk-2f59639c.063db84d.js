(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2f59639c"],{"16aa":function(e,t,n){},"28cd":function(e,t,n){"use strict";var i=n("64bf"),r=n.n(i);r.a},5789:function(e,t,n){"use strict";var i=n("16aa"),r=n.n(i);r.a},"64bf":function(e,t,n){},f66c:function(e,t,n){"use strict";n.r(t);var i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"entry"},[n("div",{staticClass:"containers"},[n("div",{staticClass:"header clearfix"},[n("div",{staticClass:"left-logo",on:{click:e.toggleItem}},[n("svg-icon",{staticClass:"svg",attrs:{"icon-class":"menu"}})],1),e._m(0)]),n("div",{staticClass:"nr"},[n("transition",{attrs:{name:"fadeInLeft","enter-active-class":"animated fadeInLeft","leave-active-class":"animated fadeOutLeft"}},[n("div",{directives:[{name:"show",rawName:"v-show",value:e.opened,expression:"opened"}],staticClass:"menu"},e._l(e.routes,(function(t,i){return n("vmenu",{directives:[{name:"show",rawName:"v-show",value:!t.meta.hidden,expression:"!route.meta.hidden"}],key:i,class:{active:e.mainRoute===t.path},attrs:{title:t.meta.title,icon:t.meta.icon,to:t.path}})})),1)]),n("div",{class:{main:"true",hidden:!e.opened},on:{click:e.closeBar}},[n("keep-alive",[n("router-view")],1)],1)],1)])])},r=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"right-title"},[n("h2",{staticClass:"none-select"},[e._v("语符")])])}],o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"menu_icon",on:{click:e.ReplaceRoute}},[n("router-link",{attrs:{to:e.to}},[n("div",{staticClass:"box"},[n("svg-icon",{attrs:{"icon-class":e.icon}}),n("span",{staticClass:"title"},[e._v(e._s(e.title))])],1)])],1)},c=[],s=n("2f62");function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function u(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){l(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var d={name:"Vmenu",props:{title:{type:String,required:!0},icon:{type:String,required:!0},to:{type:String,required:!0}},methods:u({},Object(s["d"])(["SET_MAIN_ROUTE"]),{ReplaceRoute:function(){this.SET_MAIN_ROUTE(this.to)}})},f=d,p=(n("5789"),n("2877")),b=Object(p["a"])(f,o,c,!1,null,"4fc443ee",null),v=b.exports,m=n("4360"),O=document,h=O.body,g=583,w={beforeMount:function(){window.addEventListener("resize",this.$_resizeHandler)},beforeDestroy:function(){window.removeEventListener("resize",this.$_resizeHandler)},mounted:function(){var e=this.$_isMobile();e&&m["a"].dispatch("toggleDevice","mobile")},methods:{$_isMobile:function(){var e=h.getBoundingClientRect();return e.width-1<g},$_resizeHandler:function(){if(!document.hidden){var e=this.$_isMobile();m["a"].dispatch("toggleDevice",e?"mobile":"desktop"),e&&m["a"].dispatch("closeSideBar",{withoutAnimation:!1})}}}},y=n("41cb");function j(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function _(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?j(Object(n),!0).forEach((function(t){E(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):j(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function E(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var P={name:"Main",components:{vmenu:v},mixins:[w],data:function(){return{routes:[]}},computed:_({},Object(s["c"])(["mainRoute","opened","device"])),mounted:function(){var e=y["a"];this.routes=e.filter((function(e){if(e.meta)return!0}))},methods:_({},Object(s["d"])(["SET_MAIN_ROUTE","TOGGLE_SIDEBAR"]),{},Object(s["b"])(["closeSideBar"]),{toggleItem:function(){this.TOGGLE_SIDEBAR()},closeBar:function(){"mobile"===this.device&&this.closeSideBar(!1)}})},S=P,C=(n("28cd"),Object(p["a"])(S,i,r,!1,null,"214b0c08",null));t["default"]=C.exports}}]);
//# sourceMappingURL=chunk-2f59639c.063db84d.js.map