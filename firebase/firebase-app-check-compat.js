!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(require("@firebase/app-compat"),require("@firebase/app")):"function"==typeof define&&define.amd?define(["@firebase/app-compat","@firebase/app"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).firebase,e.firebase.INTERNAL.modularAPIs)}(this,function(Ce,Se){"use strict";try{!(function(){function e(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var t,r,n=e(Ce);const o={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:"function"==typeof atob,encodeByteArray(r,e){if(!Array.isArray(r))throw Error("encodeByteArray takes an array as a parameter");this.init_();var n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_;const o=[];for(let l=0;l<r.length;l+=3){var a=r[l],i=l+1<r.length,s=i?r[l+1]:0,c=l+2<r.length,h=c?r[l+2]:0;let e=(15&s)<<2|h>>6,t=63&h;c||(t=64,i||(e=64)),o.push(n[a>>2],n[(3&a)<<4|s>>4],n[e],n[t])}return o.join("")},encodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?btoa(e):this.encodeByteArray(function(t){const r=[];let n=0;for(let o=0;o<t.length;o++){let e=t.charCodeAt(o);e<128?r[n++]=e:(e<2048?r[n++]=e>>6|192:(55296==(64512&e)&&o+1<t.length&&56320==(64512&t.charCodeAt(o+1))?(e=65536+((1023&e)<<10)+(1023&t.charCodeAt(++o)),r[n++]=e>>18|240,r[n++]=e>>12&63|128):r[n++]=e>>12|224,r[n++]=e>>6&63|128),r[n++]=63&e|128)}return r}(e),t)},decodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?atob(e):function(e){const t=[];let r=0,n=0;for(;r<e.length;){var o,a,i=e[r++];i<128?t[n++]=String.fromCharCode(i):191<i&&i<224?(o=e[r++],t[n++]=String.fromCharCode((31&i)<<6|63&o)):239<i&&i<365?(a=((7&i)<<18|(63&e[r++])<<12|(63&e[r++])<<6|63&e[r++])-65536,t[n++]=String.fromCharCode(55296+(a>>10)),t[n++]=String.fromCharCode(56320+(1023&a))):(o=e[r++],a=e[r++],t[n++]=String.fromCharCode((15&i)<<12|(63&o)<<6|63&a))}return t.join("")}(this.decodeStringToByteArray(e,t))},decodeStringToByteArray(e,t){this.init_();var r=t?this.charToByteMapWebSafe_:this.charToByteMap_;const n=[];for(let c=0;c<e.length;){var o=r[e.charAt(c++)],a=c<e.length?r[e.charAt(c)]:0;++c;var i=c<e.length?r[e.charAt(c)]:64;++c;var s=c<e.length?r[e.charAt(c)]:64;if(++c,null==o||null==a||null==i||null==s)throw new h;n.push(o<<2|a>>4),64!==i&&(n.push(a<<4&240|i>>2),64!==s&&n.push(i<<6&192|s))}return n},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let e=0;e<this.ENCODED_VALS.length;e++)this.byteToCharMap_[e]=this.ENCODED_VALS.charAt(e),this.charToByteMap_[this.byteToCharMap_[e]]=e,this.byteToCharMapWebSafe_[e]=this.ENCODED_VALS_WEBSAFE.charAt(e),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[e]]=e,e>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(e)]=e,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(e)]=e)}}};class h extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const i=function(e){try{return o.decodeString(e,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};class s{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(r){return(e,t)=>{e?this.reject(e):this.resolve(t),"function"==typeof r&&(this.promise.catch(()=>{}),1===r.length?r(e):r(e,t))}}}function a(){try{return"object"==typeof indexedDB}catch(e){return}}class c extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name="FirebaseError",Object.setPrototypeOf(this,c.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,l.prototype.create)}}class l{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){var n,r=t[0]||{},o=`${this.service}/${e}`,a=this.errors[e],a=a?(n=r,a.replace(p,(e,t)=>{var r=n[t];return null!=r?String(r):`<${t}?>`})):"Error",a=`${this.serviceName}: ${a} (${o}).`;return new c(o,a,r)}}const p=/\{\$([^}]+)}/g;function u(e){return JSON.parse(e)}function d(e){const t=function(e){let t={},r={},n={},o="";try{var a=e.split(".");t=u(i(a[0])||""),r=u(i(a[1])||""),o=a[2],n=r.d||{},delete r.d}catch(e){}return{header:t,claims:r,data:n,signature:o}}(e).claims;return"object"==typeof t&&t.hasOwnProperty("iat")?t.iat:null}function g(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,e=>{const t=16*Math.random()|0,r="x"===e?t:3&t|8;return r.toString(16)})}const f=144e5,v=.5;class E{constructor(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}(r=t=t||{})[r.DEBUG=0]="DEBUG",r[r.VERBOSE=1]="VERBOSE",r[r.INFO=2]="INFO",r[r.WARN=3]="WARN",r[r.ERROR=4]="ERROR",r[r.SILENT=5]="SILENT";const _={debug:t.DEBUG,verbose:t.VERBOSE,info:t.INFO,warn:t.WARN,error:t.ERROR,silent:t.SILENT},w=t.INFO,m={[t.DEBUG]:"log",[t.VERBOSE]:"log",[t.INFO]:"info",[t.WARN]:"warn",[t.ERROR]:"error"},k=(e,t,...r)=>{if(!(t<e.logLevel)){var n=(new Date).toISOString(),o=m[t];if(!o)throw new Error(`Attempted to log a message with an invalid logType (value: ${t})`);console[o](`[${n}]  ${e.name}:`,...r)}};const b=new Map,y={activated:!1,tokenObservers:[]},A={initialized:!1,enabled:!1};function T(e){return b.get(e)||Object.assign({},y)}const C="https://content-firebaseappcheck.googleapis.com/v1",S="exchangeDebugToken",R={OFFSET_DURATION:3e5,RETRIAL_MIN_WAIT:3e4,RETRIAL_MAX_WAIT:96e4};class P{constructor(e,t,r,n,o){if(this.operation=e,this.retryPolicy=t,this.getWaitDuration=r,this.lowerBound=n,this.upperBound=o,this.pending=null,o<(this.nextErrorWaitInterval=n))throw new Error("Proactive refresh lower bound greater than upper bound!")}start(){this.nextErrorWaitInterval=this.lowerBound,this.process(!0).catch(()=>{})}stop(){this.pending&&(this.pending.reject("cancelled"),this.pending=null)}isRunning(){return!!this.pending}async process(e){this.stop();try{this.pending=new s,this.pending.promise.catch(e=>{}),t=this.getNextRun(e),await new Promise(e=>{setTimeout(e,t)}),this.pending.resolve(),await this.pending.promise,this.pending=new s,this.pending.promise.catch(e=>{}),await this.operation(),this.pending.resolve(),await this.pending.promise,this.process(!0).catch(()=>{})}catch(e){this.retryPolicy(e)?this.process(!1).catch(()=>{}):this.stop()}var t}getNextRun(e){if(e)return this.nextErrorWaitInterval=this.lowerBound,this.getWaitDuration();var t=this.nextErrorWaitInterval;return this.nextErrorWaitInterval*=2,this.nextErrorWaitInterval>this.upperBound&&(this.nextErrorWaitInterval=this.upperBound),t}}const I=new l("appCheck","AppCheck",{"already-initialized":"You have already called initializeAppCheck() for FirebaseApp {$appName} with different options. To avoid this error, call initializeAppCheck() with the same options as when it was originally called. This will return the already initialized instance.","use-before-activation":"App Check is being used before initializeAppCheck() is called for FirebaseApp {$appName}. Call initializeAppCheck() before instantiating other Firebase services.","fetch-network-error":"Fetch failed to connect to a network. Check Internet connection. Original error: {$originalErrorMessage}.","fetch-parse-error":"Fetch client could not parse response. Original error: {$originalErrorMessage}.","fetch-status-error":"Fetch server returned an HTTP error status. HTTP status: {$httpStatus}.","storage-open":"Error thrown when opening storage. Original error: {$originalErrorMessage}.","storage-get":"Error thrown when reading from storage. Original error: {$originalErrorMessage}.","storage-set":"Error thrown when writing to storage. Original error: {$originalErrorMessage}.","recaptcha-error":"ReCAPTCHA error.",throttled:"Requests throttled due to {$httpStatus} error. Attempts allowed again after {$time}"});function D(e=!1){var t;return e?null===(t=self.grecaptcha)||void 0===t?void 0:t.enterprise:self.grecaptcha}function O(e){if(!T(e).activated)throw I.create("use-before-activation",{appName:e.name})}function x(e){var t=Math.round(e/1e3),r=Math.floor(t/86400),n=Math.floor((t-3600*r*24)/3600),o=Math.floor((t-3600*r*24-3600*n)/60),t=t-3600*r*24-3600*n-60*o;let a="";return r&&(a+=N(r)+"d:"),n&&(a+=N(n)+"h:"),a+=N(o)+"m:"+N(t)+"s",a}function N(e){return 0===e?"00":10<=e?e.toString():"0"+e}async function M({url:e,body:t},r){const n={"Content-Type":"application/json"},o=r.getImmediate({optional:!0});!o||(c=await o.getHeartbeatsHeader())&&(n["X-Firebase-Client"]=c);var a={method:"POST",body:JSON.stringify(t),headers:n};let i;try{i=await fetch(e,a)}catch(e){throw I.create("fetch-network-error",{originalErrorMessage:null==e?void 0:e.message})}if(200!==i.status)throw I.create("fetch-status-error",{httpStatus:i.status});let s;try{s=await i.json()}catch(e){throw I.create("fetch-parse-error",{originalErrorMessage:null==e?void 0:e.message})}var c=s.ttl.match(/^([\d.]+)(s)$/);if(!c||!c[2]||isNaN(Number(c[1])))throw I.create("fetch-parse-error",{originalErrorMessage:"ttl field (timeToLive) is not in standard Protobuf Duration "+`format: ${s.ttl}`});a=1e3*Number(c[1]),c=Date.now();return{token:s.token,expireTimeMillis:c+a,issuedAtTimeMillis:c}}function L(e,t){var{projectId:r,appId:n,apiKey:o}=e.options;return{url:`${C}/projects/${r}/apps/${n}:${S}?key=${o}`,body:{debug_token:t}}}const B="firebase-app-check-database",H=1,$="firebase-app-check-store",j="debug-token";let W=null;function F(){return W||(W=new Promise((t,r)=>{try{const e=indexedDB.open(B,H);e.onsuccess=e=>{t(e.target.result)},e.onerror=e=>{var t;r(I.create("storage-open",{originalErrorMessage:null===(t=e.target.error)||void 0===t?void 0:t.message}))},e.onupgradeneeded=e=>{const t=e.target.result;0===e.oldVersion&&t.createObjectStore($,{keyPath:"compositeKey"})}}catch(e){r(I.create("storage-open",{originalErrorMessage:null==e?void 0:e.message}))}}),W)}async function V(e,t){const r=await F(),n=r.transaction($,"readwrite"),o=n.objectStore($),a=o.put({compositeKey:e,value:t});return new Promise((t,r)=>{a.onsuccess=e=>{t()},n.onerror=e=>{var t;r(I.create("storage-set",{originalErrorMessage:null===(t=e.target.error)||void 0===t?void 0:t.message}))}})}async function K(e){const t=await F(),o=t.transaction($,"readonly"),r=o.objectStore($),a=r.get(e);return new Promise((r,n)=>{a.onsuccess=e=>{var t=e.target.result;r(t?t.value:void 0)},o.onerror=e=>{var t;n(I.create("storage-get",{originalErrorMessage:null===(t=e.target.error)||void 0===t?void 0:t.message}))}})}function z(e){return`${e.options.appId}-${e.name}`}const U=new class{constructor(e){this.name=e,this._logLevel=w,this._logHandler=k,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in t))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel="string"==typeof e?_[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if("function"!=typeof e)throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,t.DEBUG,...e),this._logHandler(this,t.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,t.VERBOSE,...e),this._logHandler(this,t.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,t.INFO,...e),this._logHandler(this,t.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,t.WARN,...e),this._logHandler(this,t.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,t.ERROR,...e),this._logHandler(this,t.ERROR,...e)}}("@firebase/app-check");async function q(t){if(a()){let e=void 0;try{e=await K(z(t))}catch(e){U.warn(`Failed to read token from IndexedDB. Error: ${e}`)}return e}}function G(e,t){return a()?V(z(e),t).catch(e=>{U.warn(`Failed to write token to IndexedDB. Error: ${e}`)}):Promise.resolve()}async function X(){let e=void 0;try{e=await K(j)}catch(e){}if(e)return e;var t,r=g();return t=r,V(j,t).catch(e=>U.warn(`Failed to persist debug token to IndexedDB. Error: ${e}`)),r}function J(){return A.enabled}async function Y(){var e=A;if(e.enabled&&e.token)return e.token.promise;throw Error(`
            Can't get debug token in production mode.
        `)}function Z(){var e=function(){if("undefined"!=typeof self)return self;if("undefined"!=typeof window)return window;if("undefined"!=typeof global)return global;throw new Error("Unable to locate global object.")}();const t=A;if(t.initialized=!0,"string"==typeof e.FIREBASE_APPCHECK_DEBUG_TOKEN||!0===e.FIREBASE_APPCHECK_DEBUG_TOKEN){t.enabled=!0;const r=new s;t.token=r,"string"==typeof e.FIREBASE_APPCHECK_DEBUG_TOKEN?r.resolve(e.FIREBASE_APPCHECK_DEBUG_TOKEN):r.resolve(X())}}const Q={error:"UNKNOWN_ERROR"};async function ee(e,t=!1){var r=e.app;O(r);const n=T(r);let o=n.token,a=void 0;if(o&&!ae(o)&&(n.token=void 0,o=void 0),o||(s=await n.cachedTokenPromise)&&(ae(s)?o=s:await G(r,void 0)),!t&&o&&ae(o))return{token:o.token};let i=!1;if(J()){n.exchangeTokenPromise||(n.exchangeTokenPromise=M(L(r,await Y()),e.heartbeatServiceProvider).finally(()=>{n.exchangeTokenPromise=void 0}),i=!0);var s=await n.exchangeTokenPromise;return await G(r,s),{token:(n.token=s).token}}try{n.exchangeTokenPromise||(n.exchangeTokenPromise=n.provider.getToken().finally(()=>{n.exchangeTokenPromise=void 0}),i=!0),o=await T(r).exchangeTokenPromise}catch(e){"appCheck/throttled"===e.code?U.warn(e.message):U.error(e),a=e}let c;return o?a?c=ae(o)?{token:o.token,internalError:a}:ie(a):(c={token:o.token},n.token=o,await G(r,o)):c=ie(a),i&&oe(r,c),c}function te(e,t,r,n){var o=e["app"];const a=T(o);o={next:r,error:n,type:t};if(a.tokenObservers=[...a.tokenObservers,o],a.token&&ae(a.token)){const i=a.token;Promise.resolve().then(()=>{r({token:i.token}),ne(e)}).catch(()=>{})}a.cachedTokenPromise.then(()=>ne(e))}function re(e,t){const r=T(e);var n=r.tokenObservers.filter(e=>e.next!==t);0===n.length&&r.tokenRefresher&&r.tokenRefresher.isRunning()&&r.tokenRefresher.stop(),r.tokenObservers=n}function ne(e){var t=e["app"];const r=T(t);let n=r.tokenRefresher;n||(n=function(r){const n=r["app"];return new P(async()=>{var e=T(n);let t;if(t=e.token?await ee(r,!0):await ee(r),t.error)throw t.error;if(t.internalError)throw t.internalError},()=>!0,()=>{var e=T(n);if(e.token){var t=e.token.issuedAtTimeMillis+.5*(e.token.expireTimeMillis-e.token.issuedAtTimeMillis)+3e5,e=e.token.expireTimeMillis-3e5,t=Math.min(t,e);return Math.max(0,t-Date.now())}return 0},R.RETRIAL_MIN_WAIT,R.RETRIAL_MAX_WAIT)}(e),r.tokenRefresher=n),!n.isRunning()&&r.isTokenAutoRefreshEnabled&&n.start()}function oe(e,t){for(const r of T(e).tokenObservers)try{"EXTERNAL"===r.type&&null!=t.error?r.error(t.error):r.next(t)}catch(e){}}function ae(e){return 0<e.expireTimeMillis-Date.now()}function ie(e){return{token:(t=Q,o.encodeString(JSON.stringify(t),!1)),error:e};var t}class se{constructor(e,t){this.app=e,this.heartbeatServiceProvider=t}_delete(){var e=T(this.app)["tokenObservers"];for(const t of e)re(this.app,t.next);return Promise.resolve()}}function ce(t){return{getToken:e=>ee(t,e),getLimitedUseToken:()=>async function(e){var t=e.app;O(t);const r=T(t)["provider"];if(J()){var n=(await M(L(t,await Y()),e.heartbeatServiceProvider))["token"];return{token:n}}return{token:n=(await r.getToken())["token"]}}(t),addTokenListener:e=>te(t,"INTERNAL",e),removeTokenListener:e=>re(t.app,e)}}const he="https://www.google.com/recaptcha/api.js",le="https://www.google.com/recaptcha/enterprise.js";function pe(t,r){const n=new s,e=T(t);e.reCAPTCHAState={initialized:n};const o=ge(t);var a=D(!1);return a?de(t,r,a,o,n):function(e){const t=document.createElement("script");t.src=he,t.onload=e,document.head.appendChild(t)}(()=>{var e=D(!1);if(!e)throw new Error("no recaptcha");de(t,r,e,o,n)}),n.promise}function ue(t,r){const n=new s,e=T(t);e.reCAPTCHAState={initialized:n};const o=ge(t);var a=D(!0);return a?de(t,r,a,o,n):function(e){const t=document.createElement("script");t.src=le,t.onload=e,document.head.appendChild(t)}(()=>{var e=D(!0);if(!e)throw new Error("no recaptcha");de(t,r,e,o,n)}),n.promise}function de(e,t,r,n,o){r.ready(()=>{!function(e,t,r,n){const o=r.render(n,{sitekey:t,size:"invisible",callback:()=>{T(e).reCAPTCHAState.succeeded=!0},"error-callback":()=>{T(e).reCAPTCHAState.succeeded=!1}}),a=T(e);a.reCAPTCHAState=Object.assign(Object.assign({},a.reCAPTCHAState),{widgetId:o})}(e,t,r,n),o.resolve(r)})}function ge(e){var t=`fire_app_check_${e.name}`;const r=document.createElement("div");return r.id=t,r.style.display="none",document.body.appendChild(r),t}async function fe(n){O(n);const o=await T(n).reCAPTCHAState.initialized.promise;return new Promise((e,t)=>{const r=T(n).reCAPTCHAState;o.ready(()=>{e(o.execute(r.widgetId,{action:"fire_app_check"}))})})}class ve{constructor(e){this._siteKey=e,this._throttleData=null}async getToken(){var e;me(this._throttleData);var t=await fe(this._app).catch(e=>{throw I.create("recaptcha-error")});if(null===(e=T(this._app).reCAPTCHAState)||void 0===e||!e.succeeded)throw I.create("recaptcha-error");let r;try{r=await M(function(e,t){var{projectId:r,appId:n,apiKey:o}=e.options;return{url:`${C}/projects/${r}/apps/${n}:exchangeRecaptchaV3Token?key=${o}`,body:{recaptcha_v3_token:t}}}(this._app,t),this._heartbeatServiceProvider)}catch(e){throw null!==(t=e.code)&&void 0!==t&&t.includes("fetch-status-error")?(this._throttleData=we(Number(null===(t=e.customData)||void 0===t?void 0:t.httpStatus),this._throttleData),I.create("throttled",{time:x(this._throttleData.allowRequestsAfter-Date.now()),httpStatus:this._throttleData.httpStatus})):e}return this._throttleData=null,r}initialize(e){this._app=e,this._heartbeatServiceProvider=Se._getProvider(e,"heartbeat"),pe(e,this._siteKey).catch(()=>{})}isEqual(e){return e instanceof ve&&this._siteKey===e._siteKey}}class Ee{constructor(e){this._siteKey=e,this._throttleData=null}async getToken(){var e;me(this._throttleData);var t=await fe(this._app).catch(e=>{throw I.create("recaptcha-error")});if(null===(e=T(this._app).reCAPTCHAState)||void 0===e||!e.succeeded)throw I.create("recaptcha-error");let r;try{r=await M(function(e,t){var{projectId:r,appId:n,apiKey:o}=e.options;return{url:`${C}/projects/${r}/apps/${n}:exchangeRecaptchaEnterpriseToken?key=${o}`,body:{recaptcha_enterprise_token:t}}}(this._app,t),this._heartbeatServiceProvider)}catch(e){throw null!==(t=e.code)&&void 0!==t&&t.includes("fetch-status-error")?(this._throttleData=we(Number(null===(t=e.customData)||void 0===t?void 0:t.httpStatus),this._throttleData),I.create("throttled",{time:x(this._throttleData.allowRequestsAfter-Date.now()),httpStatus:this._throttleData.httpStatus})):e}return this._throttleData=null,r}initialize(e){this._app=e,this._heartbeatServiceProvider=Se._getProvider(e,"heartbeat"),ue(e,this._siteKey).catch(()=>{})}isEqual(e){return e instanceof Ee&&this._siteKey===e._siteKey}}class _e{constructor(e){this._customProviderOptions=e}async getToken(){var e=await this._customProviderOptions.getToken(),t=d(e.token),t=null!==t&&t<Date.now()&&0<t?1e3*t:Date.now();return Object.assign(Object.assign({},e),{issuedAtTimeMillis:t})}initialize(e){this._app=e}isEqual(e){return e instanceof _e&&this._customProviderOptions.getToken.toString()===e._customProviderOptions.getToken.toString()}}function we(e,t){if(404===e||403===e)return{backoffCount:1,allowRequestsAfter:Date.now()+864e5,httpStatus:e};var r,n,o=t?t.backoffCount:0,n=(t=2,r=1e3*Math.pow(t,o),n=Math.round(v*r*(Math.random()-.5)*2),Math.min(f,r+n));return{backoffCount:o+1,allowRequestsAfter:Date.now()+n,httpStatus:e}}function me(e){if(e&&Date.now()-e.allowRequestsAfter<=0)throw I.create("throttled",{time:x(e.allowRequestsAfter-Date.now()),httpStatus:e.httpStatus})}function ke(e=Se.getApp(),t){var r;e=(r=e)&&r._delegate?r._delegate:r;const n=Se._getProvider(e,"app-check");if(A.initialized||Z(),J()&&Y().then(e=>console.log(`App Check debug token: ${e}. You will need to add it to your app's App Check settings in the Firebase console for it to work.`)),n.isInitialized()){var o=n.getImmediate();const a=n.getOptions();if(a.isTokenAutoRefreshEnabled===t.isTokenAutoRefreshEnabled&&a.provider.isEqual(t.provider))return o;throw I.create("already-initialized",{appName:e.name})}o=n.initialize({options:t});return function(t,e,r){const n=function(e,t){return b.set(e,t),b.get(e)}(t,Object.assign({},y));n.activated=!0,n.provider=e,n.cachedTokenPromise=q(t).then(e=>(e&&ae(e)&&(n.token=e,oe(t,{token:e.token})),e)),n.isTokenAutoRefreshEnabled=void 0===r?t.automaticDataCollectionEnabled:r,n.provider.initialize(t)}(e,t.provider,t.isTokenAutoRefreshEnabled),T(e).isTokenAutoRefreshEnabled&&te(o,"INTERNAL",()=>{}),o}const be="app-check-internal";Se._registerComponent(new E("app-check",e=>{var t,r=e.getProvider("app").getImmediate(),n=e.getProvider("heartbeat");return t=r,e=n,new se(t,e)},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,r)=>{e.getProvider(be).initialize()})),Se._registerComponent(new E(be,e=>{return ce(e.getProvider("app-check").getImmediate())},"PUBLIC").setInstantiationMode("EXPLICIT")),Se.registerVersion("@firebase/app-check","0.8.8");const ye=new l("appCheck","AppCheck",{"use-before-activation":"App Check is being used before activate() is called for FirebaseApp {$appName}. Call activate() before instantiating other Firebase services."});class Ae{constructor(e){this.app=e}activate(e,t){let r;r="string"==typeof e?new ve(e):e instanceof Ee||e instanceof ve||e instanceof _e?e:new _e({getToken:e.getToken}),this._delegate=ke(this.app,{provider:r,isTokenAutoRefreshEnabled:t})}setTokenAutoRefreshEnabled(e){if(!this._delegate)throw ye.create("use-before-activation",{appName:this.app.name});!function(e,t){const r=T(e.app);r.tokenRefresher&&(!0===t?r.tokenRefresher.start():r.tokenRefresher.stop()),r.isTokenAutoRefreshEnabled=t}(this._delegate,e)}getToken(e){if(!this._delegate)throw ye.create("use-before-activation",{appName:this.app.name});return async function(e,t){var r=await ee(e,t);if(r.error)throw r.error;return{token:r.token}}(this._delegate,e)}onTokenChanged(e,t,r){if(!this._delegate)throw ye.create("use-before-activation",{appName:this.app.name});return function(e,t,r){let n=()=>{},o=()=>{};return n=null!=t.next?t.next.bind(t):t,null!=t.error?o=t.error.bind(t):r&&(o=r),te(e,"EXTERNAL",n,o),()=>re(e.app,n)}(this._delegate,e,t)}}const Te=e=>{var t=e.getProvider("app-compat").getImmediate();return new Ae(t)};n.default.INTERNAL.registerComponent(new E("appCheck-compat",Te,"PUBLIC").setServiceProps({ReCaptchaEnterpriseProvider:Ee,ReCaptchaV3Provider:ve,CustomProvider:_e})),n.default.registerVersion("@firebase/app-check-compat","0.3.15")}).apply(this,arguments)}catch(e){throw console.error(e),new Error("Cannot instantiate firebase-app-check-compat.js - be sure to load firebase-app.js first.")}});
//# sourceMappingURL=firebase-app-check-compat.js.map
