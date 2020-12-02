(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[4],{185:function(e,t,a){"use strict";var n=a(34);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var c=n(a(0)),r=(0,n(a(40)).default)(c.default.createElement("path",{d:"M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"}),"Search");t.default=r},186:function(e,t,a){"use strict";a.d(t,"a",(function(){return j}));var n=a(19);function c(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}var r=a(3),s=a(0),i=a(167),o=a(8),l=a(185),u=a.n(l),d=a(184);var f=Object(i.a)((function(e){return{search:c({position:"relative",borderRadius:e.shape.borderRadius,backgroundColor:Object(o.c)(e.palette.common.black,.15),"&:hover":{backgroundColor:Object(o.c)(e.palette.common.black,.25)},marginRight:e.spacing(2),marginLeft:0,width:"100%"},e.breakpoints.up("sm"),{marginLeft:e.spacing(3),width:"auto"}),searchIcon:{padding:e.spacing(0,2),height:"100%",position:"absolute",pointerEvents:"none",display:"flex",alignItems:"center",justifyContent:"center"},inputRoot:{color:"inherit"},inputInput:c({padding:e.spacing(1,1,1,0),paddingLeft:"calc(1em + ".concat(e.spacing(4),"px)"),transition:e.transitions.create("width"),width:"100%"},e.breakpoints.up("md"),{width:"20ch"})}}));function j(e){var t=e.fetchData,a=e.url,c=f(),i=Object(s.useState)(""),o=Object(n.a)(i,2),l=o[0],j=o[1],p=function(e,t){var a=Object(s.useState)(e),c=Object(n.a)(a,2),r=c[0],i=c[1];return Object(s.useEffect)((function(){var a=setTimeout((function(){i(e)}),t);return function(){clearTimeout(a)}}),[e]),r}(l,500);return Object(s.useEffect)((function(){p.length>0?t(p):0===p.length&&t()}),[p]),Object(s.useEffect)((function(){j("")}),[a]),Object(r.jsxs)("div",{className:c.search,children:[Object(r.jsx)("div",{className:c.searchIcon,children:Object(r.jsx)(u.a,{})}),Object(r.jsx)(d.a,{placeholder:"Search\u2026",classes:{root:c.inputRoot,input:c.inputInput},inputProps:{"aria-label":"search"},onChange:function(e){return function(e){j(e.target.value)}(e)},value:l})]})}},190:function(e,t,a){"use strict";var n=a(1),c=a(2),r=a(0),s=(a(6),a(4)),i=a(131),o=a(5),l=r.forwardRef((function(e,t){var a=e.classes,o=e.className,l=e.raised,u=void 0!==l&&l,d=Object(c.a)(e,["classes","className","raised"]);return r.createElement(i.a,Object(n.a)({className:Object(s.a)(a.root,o),elevation:u?8:1,ref:t},d))}));t.a=Object(o.a)({root:{overflow:"hidden"}},{name:"MuiCard"})(l)},191:function(e,t,a){"use strict";var n=a(1),c=a(2),r=a(0),s=(a(6),a(4)),i=a(5),o=r.forwardRef((function(e,t){var a=e.classes,i=e.className,o=e.component,l=void 0===o?"div":o,u=Object(c.a)(e,["classes","className","component"]);return r.createElement(l,Object(n.a)({className:Object(s.a)(a.root,i),ref:t},u))}));t.a=Object(i.a)({root:{padding:16,"&:last-child":{paddingBottom:24}}},{name:"MuiCardContent"})(o)},192:function(e,t,a){"use strict";var n=a(1),c=a(2),r=a(0),s=(a(6),a(4)),i=a(5),o=r.forwardRef((function(e,t){var a=e.disableSpacing,i=void 0!==a&&a,o=e.classes,l=e.className,u=Object(c.a)(e,["disableSpacing","classes","className"]);return r.createElement("div",Object(n.a)({className:Object(s.a)(o.root,l,!i&&o.spacing),ref:t},u))}));t.a=Object(i.a)({root:{display:"flex",alignItems:"center",padding:8},spacing:{"& > :not(:first-child)":{marginLeft:8}}},{name:"MuiCardActions"})(o)},199:function(e,t,a){"use strict";a.r(t);var n=a(25),c=a.n(n),r=a(42),s=a(19),i=a(3),o=a(0),l=a(43),u=a.n(l),d=a(167),f=a(190),j=a(192),p=a(191),b=a(183),h=a(176),m=a(172),O=Object(d.a)({root:{width:"40%"},bullet:{display:"inline-block",margin:"0 2px",transform:"scale(0.8)"},title:{fontSize:14},pos:{marginBottom:12}});function v(e){var t=e.data,a=e.fetchData,n=O(),s=function(){var e=Object(r.a)(c.a.mark((function e(t){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t.forEach(function(){var e=Object(r.a)(c.a.mark((function e(t){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,u.a.delete("/api/alerts/".concat(t.id));case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),a();case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(i.jsxs)(f.a,{className:n.root,children:[Object(i.jsxs)(p.a,{children:[Object(i.jsxs)("div",{style:{display:"flex",justifyContent:"space-between"},children:[Object(i.jsx)(h.a,{className:n.title,color:"textSecondary",gutterBottom:!0,children:Object(i.jsxs)("div",{style:{fontFamily:"DM Sans"},children:["Author: ",t.author," ",t.score?"Score: ".concat(t.score):""]})}),Object(i.jsx)(m.a,{onClick:function(){return s(t.Alerts)},color:"primary",children:"Delete Alert"})]}),t.Alerts&&t.Alerts.length>0?Object(i.jsx)(h.a,{style:{color:"red"},variant:"h5",component:"h2",children:Object(i.jsxs)("div",{style:{fontFamily:"DM Sans"},children:["Alert KeyWords:"," ",t.Alerts.map((function(e){return Object(i.jsx)(b.a,{label:"".concat(e.keyWord," : ").concat(e.match)},e.id)}))]})}):null,Object(i.jsx)(h.a,{variant:"h5",component:"h2",children:Object(i.jsxs)("div",{style:{fontFamily:"DM Sans"},children:["Title: ",t.title]})}),Object(i.jsx)(h.a,{variant:"body2",component:"p",children:Object(i.jsx)("div",{style:{fontFamily:"DM Sans"},children:t.content})})]}),Object(i.jsx)(j.a,{children:Object(i.jsx)(h.a,{size:"small",children:Object(i.jsxs)("div",{style:{fontFamily:"DM Sans"},children:["Date: ",new Date(t.date).toUTCString()]})})})]})}var x=a(186);t.default=function(){var e=Object(o.useState)([]),t=Object(s.a)(e,2),a=t[0],n=t[1],l=function(){var e=Object(r.a)(c.a.mark((function e(t){var a,r,s;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=t?"?searchValue=".concat(t):"",e.next=3,u.a.get("/api/alerts".concat(a));case 3:r=e.sent,s=r.data,n(s);case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(o.useEffect)((function(){l()}),[]),Object(i.jsxs)("div",{style:{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",marginTop:"6%"},children:[Object(i.jsx)("h1",{children:"Welcome to The Alerts Page"}),Object(i.jsx)(x.a,{fetchData:l,url:"/api/alerts"}),Object(i.jsx)("div",{style:{display:"flex",flexWrap:"wrap",gap:10,justifyContent:"center"},children:a.length>0?a.map((function(e){return Object(i.jsx)(v,{data:e,fetchData:l},e.id)})):Object(i.jsx)("div",{children:Object(i.jsx)("h1",{children:"Cards Not Found"})})})]})}}}]);
//# sourceMappingURL=4.a080b07f.chunk.js.map