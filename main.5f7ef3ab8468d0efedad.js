!function(e){function t(t){for(var i,a,s=t[0],l=t[1],c=t[2],h=0,g=[];h<s.length;h++)a=s[h],Object.prototype.hasOwnProperty.call(r,a)&&r[a]&&g.push(r[a][0]),r[a]=0;for(i in l)Object.prototype.hasOwnProperty.call(l,i)&&(e[i]=l[i]);for(u&&u(t);g.length;)g.shift()();return o.push.apply(o,c||[]),n()}function n(){for(var e,t=0;t<o.length;t++){for(var n=o[t],i=!0,s=1;s<n.length;s++){var l=n[s];0!==r[l]&&(i=!1)}i&&(o.splice(t--,1),e=a(a.s=n[0]))}return e}var i={},r={0:0},o=[];function a(t){if(i[t])return i[t].exports;var n=i[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,a),n.l=!0,n.exports}a.m=e,a.c=i,a.d=function(e,t,n){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},a.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)a.d(n,i,function(t){return e[t]}.bind(null,i));return n},a.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="";var s=window.webpackJsonp=window.webpackJsonp||[],l=s.push.bind(s);s.push=t,s=s.slice();for(var c=0;c<s.length;c++)t(s[c]);var u=l;o.push([130,1]),n()}({130:function(e,t,n){n(131),e.exports=n(334)},333:function(e,t,n){},334:function(e,t,n){"use strict";n.r(t);n(333);var i=function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.list={Blue:["Everett.png","Flags-bg.png","bug.png","nothing but net.png","nowhere.JPG"],City:["Autum leaves.JPG","Federal Rhur.jpg","Granville street.JPG","MASSAG.JPG","Midnight.JPG","PA.JPG","Paris.JPG","Vancouver Real Estate.JPG","Vermont.JPG","You Must be This Tall.JPG","fire(question mark).JPG","heart.JPG","rain-bg.jpeg"],Ferry:["Chaos and Order.JPG","Coast.jpeg","Dream.JPG","Moonshine.jpeg","Mooonshine 2.jpeg","Mountains.JPG","Sky.JPG","Skylight-bg.jpeg","Take it easy-bg.JPG","Vacation.jpeg","Window-bg.jpeg"],"Vacation Photos":["Aelx.JPG","An American Trash Pile In Paris.JPG","Anyone Home.JPG","Beeeees.JPG","Boney.JPG","Breakfast.JPG","Church.JPG","Frame.JPG","Garden.JPG","Gerent.JPG","Hey Hi Hello.JPG","Jet.JPG","Lloyds.jpg","Louvre.JPG","Me.JPG","Mom.JPG","Mum.jpg","Pigeon Portrait.jpg","Prayer.JPG","Square.JPG","Stairway.jpg","Summer.jpg","Tube.JPG","XX.JPG","ew.JPG","number1.JPG","wow.JPG"],Yellow:["Break Time 2.JPG","Break Time.JPG","Liberal.JPG","Underground-bg.JPG","nhl.JPG","nhl2.JPG","nhl3.JPG","nhl4-bg.JPG"],crust:["03190026.JPG","Blind.JPG","Canvas-bg.JPG","Derelict.jpg","Gpa.JPG","Gpas Things.JPG","Parking Lot.JPG","SALE-bg.JPG","Shaving Kit.jpg","Untitled 1.JPG","happy birthday.JPG"]}};function r(e){return function(e){if(Array.isArray(e)){for(var t=0,n=new Array(e.length);t<e.length;t++)n[t]=e[t];return n}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function o(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}var a=new i,s=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.currentBgImage=document.querySelector(".bg-image--current"),this.albumList=a.list,this.pauseBtn=document.querySelector(".pause-btn"),this.bgImageListCreator(),this.bgImageListRandomizer(),this.totalImages=this.bgImageList.length,this.albumArea=document.querySelector(".content-area__list"),this.lightbox=document.querySelector(".lightbox"),this.lightboxImageWrapper=this.lightbox.querySelector(".lightbox__content"),this.lightboxCloseButton=this.lightbox.querySelector(".lightbox__close-button"),this.lightboxBackgroundEscapeBinded=this.lightboxBackgroundEscape.bind(this),this.randomStartImage(),this.events(),this.bgCycleStarter()}var t,n,i;return t=e,(n=[{key:"events",value:function(){var e=this;this.pauseBtn.addEventListener("click",(function(){return e.pauseBtnToggle()})),this.albumArea.addEventListener("click",(function(){return e.lightboxBackground()})),this.lightboxCloseButton.addEventListener("click",(function(){return e.lightboxBackgroundClose()})),this.lightbox.addEventListener("click",(function(){return e.lightboxBackgroundMouseClose()}),!1),this.lightboxImageWrapper.addEventListener("click",(function(){return e.lightboxBackgroundMouseClose()}),!1)}},{key:"bgImageListCreator",value:function(){var e=this;this.bgImageList=[];for(var t=Object.keys(this.albumList),n=function(){var t=r[i];e.albumList[t].map((function(n){n.includes("-bg")&&e.bgImageList.push("./assets/images/albums/".concat(t,"/").concat(n))}))},i=0,r=t;i<r.length;i++)n()}},{key:"bgImageListRandomizer",value:function(){for(var e=this.bgImageList,t=e.length-1;t>0;t--){var n=Math.floor(Math.random()*(t+1)),i=[e[n],e[t]];e[t]=i[0],e[n]=i[1]}}},{key:"lightboxBackground",value:function(){window.addEventListener("keydown",this.lightboxBackgroundEscapeBinded),this.bgCyclePause()}},{key:"lightboxBackgroundClose",value:function(){window.removeEventListener("keydown",this.lightboxBackgroundEscapeBinded),this.pauseBtn.classList.contains("pause-btn--is-paused")?this.bgCycleUnpause():this.bgCycleStarter()}},{key:"lightboxBackgroundEscape",value:function(){27===event.keyCode&&this.lightboxBackgroundClose()}},{key:"lightboxBackgroundMouseClose",value:function(){event.currentTarget===event.target&&this.lightboxBackgroundClose()}},{key:"updateImage",value:function(){this.currentImage++,this.imageLoader(this.bgImageList[this.currentImageIndex])}},{key:"bgImageToggle",value:function(){this.bgDivs.forEach((function(e){e.classList.toggle("bg-image--current")}))}},{key:"imageLoader",value:function(e){var t=new Image;t.onload=function(){if(!document.querySelector("#bg-image-container").classList.contains("initialized"))return document.querySelector(".bg-image--current").src="".concat(e),void document.querySelector("#bg-image-container").classList.add("initialized");r(document.querySelector("#bg-image-container").children).forEach((function(e){return e.classList.toggle("bg-image--current")})),document.querySelector(".bg-image--current").src="".concat(e)},t.src=e}},{key:"randomStartImage",value:function(){var e=Math.floor(Math.random()*this.totalImages)+1;this.currentImage=e,this.updateImage()}},{key:"bgCycleStarter",value:function(){var e=this;clearInterval(this.bgCycle),this.bgCycle=setInterval((function(){e.updateImage()}),7e3)}},{key:"pauseBtnToggle",value:function(){this.pauseBtn.classList.toggle("pause-btn--is-paused"),this.pauseBtn.classList.contains("pause-btn--is-paused")&&this.bgCyclePause(),this.bgCycleUnpause()}},{key:"bgCyclePause",value:function(){clearInterval(this.bgCycle)}},{key:"bgCycleUnpause",value:function(){this.pauseBtn.classList.contains("pause-btn--is-paused")?this.displayPausedBg():(this.updateImage(),this.bgCycleStarter())}},{key:"displayPausedBg",value:function(){this.currentBgImage.src="".concat(this.bgImageList[this.currentImageIndex])}},{key:"currentImage",set:function(e){var t=e>this.totalImages-1?0:e;this.currentImageIndex=t},get:function(){return this.currentImageIndex}}])&&o(t.prototype,n),i&&o(t,i),e}();function l(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}var c=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.aboutBtn=document.querySelector("#about-button"),this.printsBtn=document.querySelector("#prints-button"),this.closeBtn=document.querySelector(".content-overlay__close-button"),this.contentHeading=document.querySelector(".content-area__heading"),this.contentSectionHeight=document.querySelector(".content-area").scrollHeight,this.contentSection=document.querySelector(".content-area__box"),this.contentOverlay=document.querySelector(".content-overlay"),this.albumsList=document.querySelector(".content-area__list"),this.contentText=document.querySelector(".content-overlay__text"),this.contentEscape=function(){27===event.keyCode&&this.toggleSection()},this.contentEscapeBinded=this.contentEscape.bind(this),this.events()}var t,n,i;return t=e,(n=[{key:"events",value:function(){var e=this;this.aboutBtn.addEventListener("click",(function(t){return e.openContent(t)})),this.printsBtn.addEventListener("click",(function(t){return e.openContent(t)})),this.closeBtn.addEventListener("click",(function(t){return e.toggleSection()}))}},{key:"openContent",value:function(e){var t=e.target.innerText,n=t.charAt(0)+t.slice(1).toLowerCase(),i={About:"Born in Ontario, raised in Vancouver and living in Montreal. \nFortunate enough to attend a high school with a darkroom.",Prints:"If you you like to buy prints of my work or have any questions please send me an email via evan.wintschel@gmail.com"};this.contentSection.style.minHeight="".concat(this.contentSectionHeight,"px"),n===this.contentHeading.innerText&&this.contentOverlay.classList.contains("content-overlay--is-visible")?this.toggleSection():this.contentOverlay.classList.contains("content-overlay--is-visible")?(this.contentHeading.innerText=n,this.contentText.innerText=i["".concat(n)]):(document.addEventListener("keydown",this.contentEscapeBinded),this.contentHeading.innerText=n,this.contentText.innerText=i["".concat(n)],this.toggleSection())}},{key:"toggleSection",value:function(){this.contentOverlay.classList.toggle("content-overlay--is-visible"),this.albumsList.classList.toggle("content-area__list--is-hidden"),this.contentOverlay.classList.contains("content-overlay--is-visible")||(document.removeEventListener("keydown",this.contentEscapeBinded),this.contentHeading.innerText="Albums")}}])&&l(t.prototype,n),i&&l(t,i),e}();function u(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}var h=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.setDimensions(),window.onload=this.pageOpacity}var t,n,i;return t=e,(n=[{key:"pageOpacity",value:function(){document.querySelector(".site-reveal").style.opacity=0,document.querySelector(".page-content").style.opacity=1}},{key:"setDimensions",value:function(){var e=window.screen.height;document.body.style.minHeight="".concat(e,"px")}}])&&u(t.prototype,n),i&&u(t,i),e}();function g(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}var d=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.email=document.querySelector("#email"),this.events(),this.alert=document.querySelector(".site-header__copy-alert")}var t,n,i;return t=e,(n=[{key:"events",value:function(){var e=this;this.email.addEventListener("click",(function(){return e.copyEmail()}))}},{key:"copyEmail",value:function(){var e=window.getSelection(),t=document.createRange();t.selectNodeContents(this.email),e.removeAllRanges(),e.addRange(t),document.execCommand("copy"),this.copyAlert()}},{key:"setTimers",value:function(){var e=this;this.opactiyTimer=setTimeout((function(){e.alert.style.opacity="0"}),1e3),this.displayTimer=setTimeout((function(){return e.alert.style.display="none"}),2e3)}},{key:"copyAlert",value:function(){clearTimeout(this.opactiyTimer),clearTimeout(this.displayTimer),this.alert.style.transition="none",this.alert.style.opacity="1",this.alert.style.display="block",this.alert.style.transition="opacity 1s",this.setTimers()}}])&&g(t.prototype,n),i&&g(t,i),e}();function b(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}var m=new i;new(function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.list=m.list,this.albumTitles=document.querySelectorAll(".content-area__album"),this.lightbox=document.querySelector(".lightbox"),this.closeButton=this.lightbox.querySelector(".lightbox__close-button"),this.thumbnailArea=this.lightbox.querySelector(".lightbox__thumbnail-container"),this.currentImage=this.lightbox.querySelector(".lightbox__current-image"),this.imageDescription=this.lightbox.querySelector(".lightbox__description"),this.slideArea=this.lightbox.querySelector(".lightbox__current-slide"),this.currentImageWrapper=this.lightbox.querySelector(".lightbox__content"),this.imageNumberField=this.lightbox.querySelector(".lightbox__image-number"),this.nextSlidebutton=this.lightbox.querySelector(".lightbox__nav--next"),this.previousSlidebutton=this.lightbox.querySelector(".lightbox__nav--previous"),this.fullscreenIcon=this.lightbox.querySelector(".lightbox__fullscreen-icon"),this.slideScrollBinded=this.slideScroll.bind(this),this.lightboxEscapeBinded=this.lightboxEscape.bind(this),this.thumbnailWatcherFunctionBinded=this.thumbnailWatcherFunction.bind(this),this.thumbnailWatcher=new MutationObserver(this.thumbnailWatcherFunctionBinded),this.thumbnailWatcher.observe(this.thumbnailArea,{childList:!0}),this.events()}var t,n,i;return t=e,(n=[{key:"events",value:function(){var e=this,t=!0,n=!1,i=void 0;try{for(var r,o=this.albumTitles[Symbol.iterator]();!(t=(r=o.next()).done);t=!0)r.value.addEventListener("click",(function(t){e.openLightbox(t)}))}catch(e){n=!0,i=e}finally{try{t||null==o.return||o.return()}finally{if(n)throw i}}this.closeButton.addEventListener("click",(function(){return e.closeLightbox()})),this.nextSlidebutton.addEventListener("click",(function(){return e.slideScroll(1)})),this.previousSlidebutton.addEventListener("click",(function(){return e.slideScroll(-1)})),this.lightbox.addEventListener("click",(function(){return e.closeLightbox()}),!1),this.currentImageWrapper.addEventListener("click",(function(){return e.closeLightbox()}),!1),this.fullscreenIcon.addEventListener("click",(function(){return e.fullscreenToggle()})),window.addEventListener("keydown",(function(){return e.slideScrollKey()}))}},{key:"slideScrollKey",value:function(){39===event.keyCode?this.slideScroll(1):37===event.keyCode&&this.slideScroll(-1)}},{key:"slideScroll",value:function(e){var t=parseInt(this.currentImage.getAttribute("slide-id"))+e;t>this.list[this.currentAlbum].length-1?t=0:t<0&&(t=this.list[this.currentAlbum].length-1),this.displayCurrentImage(t)}},{key:"thumbnailWatcherFunction",value:function(e){this.list[this.currentAlbum].length===e[0].target.childElementCount?(e[0].target.classList.add("lightbox__thumbnail-container--is-visible"),this.highlightCurrentThumbnail()):0===e[0].target.childElementCount&&(e[0].target.classList.remove("lightbox__thumbnail-container--is-visible"),this.slideArea.classList.remove("lightbox__current-slide--is-visible"))}},{key:"openLightbox",value:function(e){this.currentAlbum=e.target.innerText,this.lightbox.classList.add("lightbox--is-visible","lightbox--is-above"),document.body.addEventListener("keydown",this.lightboxEscapeBinded),this.createThumbnails(),this.displayCurrentImage()}},{key:"displayCurrentImage",value:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,n=this.currentAlbum,i=new Image,r="./assets/images/albums/".concat(n,"/").concat(this.list[n][t]);i.onload=function(){e.currentImage.src=r,e.currentImage.setAttribute("slide-id",t),e.slideArea.classList.contains("lightbox__current-slide--is-visible")||e.slideArea.classList.add("lightbox__current-slide--is-visible")},this.highlightCurrentThumbnail(t),this.setPhotoDescription(t,n),this.imageNumberDisplay(t,n),i.src=r}},{key:"setPhotoDescription",value:function(e,t){var n=this.list[t][e].replace(/(-bg)?(.jpg|.jpeg|.png)/gi,"");this.imageDescription.innerText=n}},{key:"imageNumberDisplay",value:function(e,t){this.imageNumberField.innerText="".concat(e+1,"/").concat(this.list[t].length)}},{key:"highlightCurrentThumbnail",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,t=!0,n=!1,i=void 0;try{for(var r,o=this.thumbnailArea.children[Symbol.iterator]();!(t=(r=o.next()).done);t=!0){var a=r.value;parseInt(a.getAttribute("slide-id"))===parseInt(e)?a.classList.add("lightbox__thumbnail--is-current"):a.classList.remove("lightbox__thumbnail--is-current")}}catch(e){n=!0,i=e}finally{try{t||null==o.return||o.return()}finally{if(n)throw i}}}},{key:"createThumbnails",value:function(){for(var e=this,t=this.currentAlbum,n=function(n){var i="".concat(e.list[t][n]).slice("".concat(e.list[t][n]).lastIndexOf(".")),r="".concat(e.list[t][n]).replace("".concat(i),"");console.log(r);var o="./assets/images/albums/".concat(t,"/thumbnails/").concat(r,"-thumb").concat(i),a=new Image;a.classList.add("lightbox__thumbnail"),a.setAttribute("slide-id",n),a.addEventListener("click",(function(t){return e.displayCurrentImage(parseInt(t.target.getAttribute("slide-id")))})),a.onload=function(){if(0===e.thumbnailArea.children.length)e.thumbnailArea.appendChild(a);else{var t=!0,n=!1,i=void 0;try{for(var r,o=e.thumbnailArea.children[Symbol.iterator]();!(t=(r=o.next()).done);t=!0){var s=r.value;if(parseInt(a.getAttribute("slide-id"))<parseInt(s.getAttribute("slide-id")))return void s.before(a);e.thumbnailArea.appendChild(a)}}catch(e){n=!0,i=e}finally{try{t||null==o.return||o.return()}finally{if(n)throw i}}}},a.src=o},i=0;i<this.list[t].length;i++)n(i)}},{key:"fullscreenToggle",value:function(){[this.fullscreenIcon,this.previousSlidebutton,this.nextSlidebutton,this.imageNumberField].forEach((function(e){e.classList.toggle("lightbox--fullscreen-overlay"),console.log(e)})),this.fullscreenIcon.classList.toggle("lightbox__fullscreen-icon--fullscreen"),this.currentImageWrapper.classList.toggle("lightbox__content--fullscreen"),this.currentImage.classList.toggle("lightbox__current-image--fullscreen")}},{key:"removeThumbnails",value:function(){this.thumbnailArea.innerHTML=""}},{key:"closeLightbox",value:function(){var e=this;event.currentTarget===event.target&&(this.lightbox.classList.remove("lightbox--is-visible"),setTimeout((function(){e.lightbox.classList.remove("lightbox--is-above"),e.removeThumbnails(),e.currentImageWrapper.classList.contains("lightbox__content--fullscreen")&&e.fullscreenToggle(),e.currentImage.src=""}),500),document.body.removeEventListener("keydown",this.lightboxEscapeBinded))}},{key:"lightboxEscape",value:function(){27===event.keyCode&&(this.currentImageWrapper.classList.contains("lightbox__content--fullscreen")?this.fullscreenToggle():this.closeLightbox())}},{key:"currentAlbum",set:function(e){this.setCurrentAlbum=e},get:function(){return this.setCurrentAlbum}}])&&b(t.prototype,n),i&&b(t,i),e}()),new s,new c,new h,new d}});