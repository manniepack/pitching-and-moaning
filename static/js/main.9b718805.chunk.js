(this["webpackJsonppitching-and-moaning"]=this["webpackJsonppitching-and-moaning"]||[]).push([[0],{37:function(e,t,n){e.exports=n(62)},62:function(e,t,n){"use strict";n.r(t);var i=n(0),a=n.n(i),o=n(33),r=n.n(o),s=(n(42),n(13)),c=n(14),h=n(16),u=n(15),d=n(2),l=n(17),p=n(34),v=n.n(p),w=n(6),f=n(8),g=n.n(f),A=n(23),m=n(9),I=n(1),y=n(36),b=n.n(y),_=function(e){function t(e){var n;Object(s.a)(this,t),(n=Object(h.a)(this,Object(u.a)(t).call(this,e))).buildAnimation=n.buildAnimation.bind(Object(d.a)(n)),n.loadAnimationAssets=n.loadAnimationAssets.bind(Object(d.a)(n)),n.generateSprites=n.generateSprites.bind(Object(d.a)(n)),n.buildInteractions=n.buildInteractions.bind(Object(d.a)(n)),n.showAnimation=n.showAnimation.bind(Object(d.a)(n)),n.stopAnimation=n.stopAnimation.bind(Object(d.a)(n)),n.resumeAnimation=n.resumeAnimation.bind(Object(d.a)(n)),n.getRendererSize=n.getRendererSize.bind(Object(d.a)(n)),n.updateAnimationSize=n.updateAnimationSize.bind(Object(d.a)(n)),n.state={isLoaded:!1,showVideo:!1},n.CANVAS_SIZE=new w.b(3200,2320),n.ASSET=function(e){return"/pitching-and-moaning/animation_assets/".concat(e)},n.ANIMATION_ROOT=a.a.createRef();var i=n.getRendererSize(e.parentSize,n.CANVAS_SIZE);return n.PIXI_APP={renderer:new I.i({antialias:!0,autoDensity:!0,resolution:window.devicePixelRatio,backgroundColor:16777215,width:i.width,height:i.height}),stage:new I.a({interactive:!0}),ticker:new I.g,sprites:{frame:null,char:null,char_eye:{left:null,right:null,sclera:null},waves:{0:null,1:null,2:null,3:null},sky:null}},n}return Object(l.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){this.buildAnimation()}},{key:"componentDidUpdate",value:function(e,t){var n=e.parentSize,i=this.props.parentSize;n.width===i.width&&n.height===i.height||this.updateAnimationSize();var a=t.isLoaded;this.state.isLoaded&&!a&&this.ANIMATION_ROOT.appendChild(this.PIXI_APP.renderer.view);var o=t.showVideo,r=this.state.showVideo;o!==r&&(r?this.stopAnimation():this.resumeAnimation())}},{key:"componentWillUnmount",value:function(){this.PIXI_APP.ticker.stop(),this.PIXI_APP.renderer.destroy(!0)}},{key:"renderLoader",value:function(e){var t=Object(m.a)({},e,{backgroundColor:"black",color:"white"});return a.a.createElement("div",{style:t},a.a.createElement("div",{style:{textAlign:"center"}},"...pitching, and moaning..."))}},{key:"renderVideo",value:function(){var e=this;return a.a.createElement("div",{style:{width:"100vw",height:"100vh",position:"absolute",top:0,left:0,display:"flex",alignItems:"center",justifyContent:"center",backgroundColor:"rgba(0, 0, 0, 0.7)",color:"white"}},a.a.createElement(b.a,{url:"https://vimeo.com/384489349",controls:!0}),a.a.createElement("div",{style:{position:"absolute",top:0,right:"0.33em",fontSize:"2em",cursor:"pointer",color:"transparent",textShadow:"0 0 0 white"},onClick:function(){return e.setState(Object(m.a)({},e.state,{showVideo:!1}))}},"\u2716"))}},{key:"render",value:function(){var e=this,t=this.state,n=t.isLoaded,i=t.showVideo,o=this.props.parentSize,r={width:o.width,height:o.height,position:"absolute",top:0,left:0,display:"flex",alignItems:"center",justifyContent:"center",transition:"background-color 0.5s ease-out"};return n?a.a.createElement(a.a.Fragment,null,a.a.createElement("div",{style:r,ref:function(t){return e.ANIMATION_ROOT=t}}),i?this.renderVideo():null):this.renderLoader(r)}},{key:"buildAnimation",value:function(){var e=Object(A.a)(g.a.mark((function e(){return g.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.loadAnimationAssets();case 2:this.generateSprites(),this.buildInteractions(),this.showAnimation();case 5:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"loadAnimationAssets",value:function(){var e=Object(A.a)(g.a.mark((function e(){var t=this;return g.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",new Promise((function(e){var n=t.ASSET;I.b.shared.add(n("frame.png")).add(n("sky.png")).add(n("ss_char.json")).add(n("ss_sea.json")).load(e)})));case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()},{key:"generateSprites",value:function(){var e=this.ASSET,t=I.b.shared,n=new I.e(t.resources[e("frame.png")].texture),i=new I.e(t.resources[e("sky.png")].texture),a=t.resources[e("ss_char.json")].spritesheet.textures,o=new I.e(a["char.png"]),r=new I.e(I.f.WHITE),s=new I.e(a["eye_left.png"]),c=new I.e(a["eye_right.png"]);o.anchor.set(.5),o.position.set(1611,1385.5),o._STATES={_DEFAULT:{texture:a["char.png"],position:new I.d(1611,1385.5)},_HOVER:{texture:a["char_click.png"],position:new I.d(1611,1341)}},s._CENTER={x:1545,y:1024.5},c._CENTER={x:1679.5,y:1023.5},s.anchor.set(.5),c.anchor.set(.5),s.position.set(s._CENTER.x,s._CENTER.y),c.position.set(c._CENTER.x,c._CENTER.y),r.width=221,r.height=79,r.anchor.set(.5),r.position.set(1610.5,1023.5);var h=t.resources[e("ss_sea.json")].spritesheet.textures,u=new I.e(h["wave_1.png"]),d=new I.e(h["wave_2.png"]),l=new I.e(h["wave_3.png"]),p=new I.e(h["wave_4.png"]);u.anchor.set(.5),u.position.set(2444.5,1386.5),d.anchor.set(.5),d.position.set(823.5,1253.5),l.anchor.set(.5),l.position.set(1686.5,1545.5),p.anchor.set(.5),p.position.set(954,1604),this.PIXI_APP.sprites={frame:n,char:o,char_eye:{left:s,right:c,sclera:r},waves:{0:u,1:d,2:l,3:p},sky:i}}},{key:"buildInteractions",value:function(){var e=this,t=this.PIXI_APP,n=t.renderer,i=t.stage,a=t.sprites,o=t.ticker,r=function(t){var n=e.PIXI_APP.stage,i=e.CANVAS_SIZE,a=i.width/n.width,o=i.height/n.height;return{x:t.x*a,y:t.y*o}},s=function(t){for(var n in e.PIXI_APP.sprites.char_eye)if("sclera"!==n){n=e.PIXI_APP.sprites.char_eye[n];var i={x:t.x-n.x,y:t.y-n.y},a=Math.sqrt(Math.pow(i.x,2)+Math.pow(i.y,2));a<48?n.position.set(n._CENTER.x,n._CENTER.y):(i.x=i.x/a,i.y=i.y>1?2.32*i.y/a:i.y/a,n.position.set(n._CENTER.x+13*i.x,n._CENTER.y+5*i.y))}};i.interactive=!0,i.on("pointermove",(function(e){s(r(e.data.global))})),i.on("pointerdown",(function(e){s(r(e.data.global))}));var c=function(e,t){var n=e._STATES[t],i=n.texture,a=n.position;e.texture=i,e.anchor.set(.5),e.position.set(a.x,a.y)},h=a.char;h.interactive=!0,h.cursor="pointer",h.on("pointerover",(function(){return c(h,"_HOVER")})),h.on("pointerout",(function(){return c(h,"_DEFAULT")})),h.on("pointerdown",(function(){return e.setState(Object(m.a)({},e.state,{showVideo:!0}))}));var u=a.waves;!function(){for(var e in u[0]._ANIMATION={value:0,changeInValue:.0035,movement:.23,rotation:.0125,func:function(e){var t=u[0],n=t._ANIMATION.value;n>I.c&&(n=0);var i=t._ANIMATION,a=i.changeInValue,o=i.movement,r=i.rotation;t.position.y+=o*Math.sin(n),t.rotation=r*Math.sin(n),t._ANIMATION.value=n+a*e}},u[1]._ANIMATION={value:0,changeInValue:.0037,movement:.1,rotation:.0125,func:function(e){var t=u[1],n=t._ANIMATION.value;n>I.c&&(n=0);var i=t._ANIMATION,a=i.changeInValue,o=i.movement,r=i.rotation;t.position.y+=o*Math.cos(n),t.rotation=r*Math.sin(n),t._ANIMATION.value=n+a*e}},u[2]._ANIMATION={value:0,changeInValue:.0125,movement:.3,rotation:.0225,func:function(e){var t=u[2],n=t._ANIMATION.value;n>I.c&&(n=0);var i=t._ANIMATION,a=i.changeInValue,o=i.movement,r=i.rotation;t.position.y+=o*Math.sin(n),t.rotation=r*Math.sin(n),t._ANIMATION.value=n+a*e}},u[3]._ANIMATION={value:0,changeInValue:.0175,movement:.2,rotation:.03,func:function(e){var t=u[3],n=t._ANIMATION.value;n>I.c&&(n=0);var i=t._ANIMATION,a=i.changeInValue,o=i.movement,r=i.rotation;t.position.y+=o*Math.sin(n),t.rotation=r*Math.sin(n),t._ANIMATION.value=n+a*e}},u)e=u[e],o.add(e._ANIMATION.func,I.h.INTERACTION)}(),o.add((function(){n.render(i)}),I.h.HIGH)}},{key:"showAnimation",value:function(){var e=this.PIXI_APP,t=e.stage,n=e.ticker,i=e.sprites;for(var a in t.addChild(i.sky),i.waves)a=i.waves[a],t.addChild(a);t.addChild(i.char_eye.sclera),t.addChild(i.char_eye.left),t.addChild(i.char_eye.right),t.addChild(i.char),t.addChild(i.frame),this.updateAnimationSize(),n.start(),this.setState(Object(m.a)({},this.state,{isLoaded:!0}))}},{key:"stopAnimation",value:function(){this.PIXI_APP.ticker.stop()}},{key:"resumeAnimation",value:function(){this.PIXI_APP.ticker.start()}},{key:"getRendererSize",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.props.parentSize,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:this.CANVAS_SIZE;return Object(w.c)({container:e,target:t,policy:w.a.ShowAll})}},{key:"updateAnimationSize",value:function(){var e=this.PIXI_APP,t=e.renderer,n=e.stage,i=this.getRendererSize(),a=i.width,o=i.height;n.width=a,n.height=o,t.resize(a,o)}}]),t}(a.a.Component),N=function(e){function t(e){var n;return Object(s.a)(this,t),(n=Object(h.a)(this,Object(u.a)(t).call(this,e))).setWindowSize=v()(n.setWindowSize.bind(Object(d.a)(n)),125),n.state={windowSize:new w.b(window.innerWidth,window.innerHeight)},n}return Object(l.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){window.addEventListener("resize",this.setWindowSize)}},{key:"componentWillUnmount",value:function(){window.removeEventListener("resize",this.setWindowSize)}},{key:"render",value:function(){return a.a.createElement(_,{parentSize:this.state.windowSize})}},{key:"setWindowSize",value:function(){var e=new w.b(window.innerWidth,window.innerHeight),t=this.state.windowSize;if(e.width!==t.width||e.height!==t.height){var n=e;this.setState({windowSize:n})}}}]),t}(a.a.Component),S=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function O(e,t){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var n=e.installing;null!=n&&(n.onstatechange=function(){"installed"===n.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}})).catch((function(e){console.error("Error during service worker registration:",e)}))}r.a.render(a.a.createElement(N,null),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("/pitching-and-moaning",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var t="".concat("/pitching-and-moaning","/service-worker.js");S?(!function(e,t){fetch(e,{headers:{"Service-Worker":"script"}}).then((function(n){var i=n.headers.get("content-type");404===n.status||null!=i&&-1===i.indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):O(e,t)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(t,e),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")}))):O(t,e)}))}}()}},[[37,1,2]]]);
//# sourceMappingURL=main.9b718805.chunk.js.map