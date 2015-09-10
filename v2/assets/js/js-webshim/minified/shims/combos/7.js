jQuery.webshims.register("form-extend",function(b,c,h,f,s,j){var k=h.Modernizr,h=k.inputtypes;if(k.formvalidation&&!c.bugs.bustedValidity){var p=c.inputTypes,q={};c.addInputType=function(a,b){p[a]=b};c.addValidityRule=function(a,b){q[a]=b};c.addValidityRule("typeMismatch",function(a,b,l,i){if(""===b)return!1;i=i.typeMismatch;if(!("type"in l))l.type=(a[0].getAttribute("type")||"").toLowerCase();p[l.type]&&p[l.type].mismatch&&(i=p[l.type].mismatch(b,a));return i});var n=j.overrideMessages,o=!k.requiredSelect||
!h.number||!h.time||!h.range||n,r="customError,typeMismatch,rangeUnderflow,rangeOverflow,stepMismatch,tooLong,patternMismatch,valueMissing,valid".split(","),j=n?["value","checked"]:["value"],e=n?["textarea"]:[],a=function(a,c){if(a){var l=(a.getAttribute&&a.getAttribute("type")||a.type||"").toLowerCase();if(n||!(k.requiredSelect||"select-one"!=l)||p[l])n&&!c&&"radio"==l&&a.name?b(f.getElementsByName(a.name)).each(function(){b.prop(this,"validity")}):b.prop(a,"validity")}},u={};["input","textarea",
"select"].forEach(function(g){var f=c.defineNodeNameProperty(g,"setCustomValidity",{prop:{value:function(l){var l=l+"",i="input"==g?b(this).getNativeElement()[0]:this;f.prop._supvalue.call(i,l);c.bugs.validationMessage&&c.data(i,"customvalidationMessage",l);o&&(c.data(i,"hasCustomError",!!l),a(i))}}});u[g]=f.prop._supvalue});if(o||n)j.push("min"),j.push("max"),j.push("step"),e.push("input");if(!k.requiredSelect||n)j.push("required"),e.push("select");if(o){var g;e.forEach(function(a){var f=c.defineNodeNameProperty(a,
"validity",{prop:{get:function(){if(!g){var l="input"==a?b(this).getNativeElement()[0]:this,i=f.prop._supget.call(l);if(!i)return i;var d={};r.forEach(function(a){d[a]=i[a]});if(!b.prop(l,"willValidate"))return d;g=!0;var A=b(l),e={type:(l.getAttribute&&l.getAttribute("type")||"").toLowerCase(),nodeName:(l.nodeName||"").toLowerCase()},t=A.val(),j=!!c.data(l,"hasCustomError"),m;g=!1;d.customError=j;if(d.valid&&d.customError)d.valid=!1;else if(!d.valid){var v=!0;b.each(d,function(a,d){if(d)return v=
!1});if(v)d.valid=!0}b.each(q,function(b,i){d[b]=i(A,t,e,d);if(d[b]&&(d.valid||!m))u[a].call(l,c.createValidationMessage(l,b)),d.valid=!1,m=!0});d.valid?(u[a].call(l,""),c.data(l,"hasCustomError",!1)):n&&!m&&!j&&b.each(d,function(d,b){if("valid"!==d&&b)return u[a].call(l,c.createValidationMessage(l,d)),!1});return d}},writeable:!1}})});j.forEach(function(b){c.onNodeNamesPropertyModify(e,b,function(){a(this)})});if(f.addEventListener){var t;f.addEventListener("change",function(b){clearTimeout(t);a(b.target)},
!0);f.addEventListener("input",function(b){clearTimeout(t);t=setTimeout(function(){a(b.target)},290)},!0)}var w=e.join(",");c.addReady(function(a,c){b(w,a).add(c.filter(w)).each(function(){b.prop(this,"validity")})});n&&c.ready("DOM form-message",function(){c.activeLang({register:"form-core",callback:function(){b("input, select, textarea").getNativeElement().each(function(){if(!c.data(this,"hasCustomError")){var a=this,g=b.prop(a,"validity")||{valid:!0},l;g.valid||(l=(a.nodeName||"").toLowerCase(),
b.each(g,function(b,d){if("valid"!==b&&d)return u[l].call(a,c.createValidationMessage(a,b)),!1}))}})}})})}c.defineNodeNameProperty("input","type",{prop:{get:function(){var a=(this.getAttribute("type")||"").toLowerCase();return c.inputTypes[a]?a:this.type}}});k.input.list&&!(b("<datalist><select><option></option></select></datalist>").prop("options")||[]).length&&c.defineNodeNameProperty("datalist","options",{prop:{writeable:!1,get:function(){var a=this.options||[];if(!a.length){var c=b("select",this);
if(c[0]&&c[0].options&&c[0].options.length)a=c[0].options}return a}}})}});
jQuery.webshims.register("form-number-date-api",function(b,c){if(!c.getStep)c.getStep=function(a,c){var g=b.attr(a,"step");if("any"===g)return g;c=c||k(a);if(!f[c]||!f[c].step)return g;g=e.number.asNumber(g);return(!isNaN(g)&&0<g?g:f[c].step)*f[c].stepScaleFactor};if(!c.addMinMaxNumberToCache)c.addMinMaxNumberToCache=function(a,b,c){a+"AsNumber"in c||(c[a+"AsNumber"]=f[c.type].asNumber(b.attr(a)),isNaN(c[a+"AsNumber"])&&a+"Default"in f[c.type]&&(c[a+"AsNumber"]=f[c.type][a+"Default"]))};var h=parseInt("NaN",
10),f=c.inputTypes,s=function(a){return"number"==typeof a||a&&a==1*a},j=function(a){return b('<input type="'+a+'" />').prop("type")===a},k=function(a){return(a.getAttribute("type")||"").toLowerCase()},p=c.addMinMaxNumberToCache,q=function(a,b){for(var a=""+a,b=b-a.length,c=0;c<b;c++)a="0"+a;return a},n=c.bugs.valueAsNumberSet||c.bugs.bustedValidity;c.addValidityRule("stepMismatch",function(a,b,g,e){if(""===b)return!1;if(!("type"in g))g.type=k(a[0]);if("date"==g.type)return!1;e=(e||{}).stepMismatch;
if(f[g.type]&&f[g.type].step){if(!("step"in g))g.step=c.getStep(a[0],g.type);if("any"==g.step)return!1;if(!("valueAsNumber"in g))g.valueAsNumber=f[g.type].asNumber(b);if(isNaN(g.valueAsNumber))return!1;p("min",a,g);a=g.minAsNumber;isNaN(a)&&(a=f[g.type].stepBase||0);e=Math.abs((g.valueAsNumber-a)%g.step);e=!(1.0E-7>=e||1.0E-7>=Math.abs(e-g.step))}return e});[{name:"rangeOverflow",attr:"max",factor:1},{name:"rangeUnderflow",attr:"min",factor:-1}].forEach(function(a){c.addValidityRule(a.name,function(b,
c,e,j){j=(j||{})[a.name]||!1;if(""===c)return j;if(!("type"in e))e.type=k(b[0]);if(f[e.type]&&f[e.type].asNumber){if(!("valueAsNumber"in e))e.valueAsNumber=f[e.type].asNumber(c);if(isNaN(e.valueAsNumber))return!1;p(a.attr,b,e);if(isNaN(e[a.attr+"AsNumber"]))return j;j=e[a.attr+"AsNumber"]*a.factor<e.valueAsNumber*a.factor-1.0E-7}return j})});c.reflectProperties(["input"],["max","min","step"]);var o=c.defineNodeNameProperty("input","valueAsNumber",{prop:{get:function(){var a=k(this),a=f[a]&&f[a].asNumber?
f[a].asNumber(b.prop(this,"value")):o.prop._supget&&o.prop._supget.apply(this,arguments);null==a&&(a=h);return a},set:function(a){var e=k(this);f[e]&&f[e].numberToString?isNaN(a)?b.prop(this,"value",""):(e=f[e].numberToString(a),!1!==e?b.prop(this,"value",e):c.warn("INVALID_STATE_ERR: DOM Exception 11")):o.prop._supset&&o.prop._supset.apply(this,arguments)}}}),r=c.defineNodeNameProperty("input","valueAsDate",{prop:{get:function(){var a=k(this);return f[a]&&f[a].asDate&&!f[a].noAsDate?f[a].asDate(b.prop(this,
"value")):r.prop._supget&&r.prop._supget.call(this)||null},set:function(a){var e=k(this);if(f[e]&&f[e].dateToString&&!f[e].noAsDate){if(null===a)return b.prop(this,"value",""),"";e=f[e].dateToString(a);if(!1!==e)return b.prop(this,"value",e),e;c.warn("INVALID_STATE_ERR: DOM Exception 11")}else return r.prop._supset&&r.prop._supset.apply(this,arguments)||null}}}),e={number:{mismatch:function(a){return!s(a)},step:1,stepScaleFactor:1,asNumber:function(a){return s(a)?1*a:h},numberToString:function(a){return s(a)?
a:!1}},range:{minDefault:0,maxDefault:100},date:{mismatch:function(a){if(!a||!a.split||!/\d$/.test(a))return!0;var c=a.split(/\u002D/);if(3!==c.length)return!0;var e=!1;b.each(c,function(a,b){if(!(s(b)||b&&b=="0"+1*b))return e=!0,!1});if(e)return e;if(4!==c[0].length||2!=c[1].length||12<c[1]||2!=c[2].length||33<c[2])e=!0;return a!==this.dateToString(this.asDate(a,!0))},step:1,stepScaleFactor:864E5,asDate:function(a,b){return!b&&this.mismatch(a)?null:new Date(this.asNumber(a,!0))},asNumber:function(a,
b){var c=h;if(b||!this.mismatch(a))a=a.split(/\u002D/),c=Date.UTC(a[0],a[1]-1,a[2]);return c},numberToString:function(a){return s(a)?this.dateToString(new Date(1*a)):!1},dateToString:function(a){return a&&a.getFullYear?a.getUTCFullYear()+"-"+q(a.getUTCMonth()+1,2)+"-"+q(a.getUTCDate(),2):!1}},time:{mismatch:function(a,c){if(!a||!a.split||!/\d$/.test(a))return!0;a=a.split(/\u003A/);if(2>a.length||3<a.length)return!0;var e=!1,f;a[2]&&(a[2]=a[2].split(/\u002E/),f=parseInt(a[2][1],10),a[2]=a[2][0]);b.each(a,
function(a,b){if(!(s(b)||b&&b=="0"+1*b)||2!==b.length)return e=!0,!1});if(e||23<a[0]||0>a[0]||59<a[1]||0>a[1]||a[2]&&(59<a[2]||0>a[2])||f&&isNaN(f))return!0;f&&(100>f?f*=100:10>f&&(f*=10));return!0===c?[a,f]:!1},step:60,stepBase:0,stepScaleFactor:1E3,asDate:function(a){a=new Date(this.asNumber(a));return isNaN(a)?null:a},asNumber:function(a){var b=h,a=this.mismatch(a,!0);!0!==a&&(b=Date.UTC("1970",0,1,a[0][0],a[0][1],a[0][2]||0),a[1]&&(b+=a[1]));return b},dateToString:function(a){if(a&&a.getUTCHours){var b=
q(a.getUTCHours(),2)+":"+q(a.getUTCMinutes(),2),c=a.getSeconds();"0"!=c&&(b+=":"+q(c,2));c=a.getUTCMilliseconds();"0"!=c&&(b+="."+q(c,3));return b}return!1}},"datetime-local":{mismatch:function(a,b){if(!a||!a.split||2!==(a+"special").split(/\u0054/).length)return!0;a=a.split(/\u0054/);return f.date.mismatch(a[0])||f.time.mismatch(a[1],b)},noAsDate:!0,asDate:function(a){a=new Date(this.asNumber(a));return isNaN(a)?null:a},asNumber:function(a){var b=h,c=this.mismatch(a,!0);!0!==c&&(a=a.split(/\u0054/)[0].split(/\u002D/),
b=Date.UTC(a[0],a[1]-1,a[2],c[0][0],c[0][1],c[0][2]||0),c[1]&&(b+=c[1]));return b},dateToString:function(a,b){return f.date.dateToString(a)+"T"+f.time.dateToString(a,b)}}};(n||!j("number"))&&c.addInputType("number",e.number);(n||!j("range"))&&c.addInputType("range",b.extend({},e.number,e.range));(n||!j("date"))&&c.addInputType("date",e.date);(n||!j("time"))&&c.addInputType("time",b.extend({},e.date,e.time));(n||!j("datetime-local"))&&c.addInputType("datetime-local",b.extend({},e.date,e.time,e["datetime-local"]))});
jQuery.webshims.register("form-number-date-ui",function(b,c,h,f,s,j){var k=c.triggerInlineForm,p=Modernizr.inputtypes,q=function(){var b={"padding-box":"innerWidth","border-box":"outerWidth","content-box":"width"},a=Modernizr.prefixed&&Modernizr.prefixed("boxSizing");return function(d,c){var e,f,j;f="width";a&&(f=b[d.css(a)]||f);e=d[f]();f="width"==f;if(e){var m=parseInt(c.css("marginLeft"),10)||0,v=c.outerWidth();(j=parseInt(d.css("marginRight"),10)||0)&&d.css("marginRight",0);m<=-1*v?(c.css("marginRight",
Math.floor(Math.abs(v+m)+j)),d.css("paddingRight",(parseInt(d.css("paddingRight"),10)||0)+Math.abs(m)),f&&d.css("width",Math.floor(e+m))):(c.css("marginRight",j),d.css("width",Math.floor(e-m-v)))}}}(),n={dateFormat:"yy-mm-dd"},o=b([]),r,e=function(a,i){b("input",a).add(i.filter("input")).each(function(){var a=b.prop(this,"type");if(e[a]&&!c.data(this,"shadowData"))e[a](b(this))})},a=function(a,c){if(j.lazyDate){var d=b.data(a[0],"setDateLazyTimer");d&&clearTimeout(d);b.data(a[0],"setDateLazyTimer",
setTimeout(function(){a.datepicker("setDate",c);b.removeData(a[0],"setDateLazyTimer");a=null},0))}else a.datepicker("setDate",c)};if(j.lazyDate===s)try{j.lazyDate=b.browser.msie&&9>c.browserVersion||500>b(h).width()&&500>b(h).height()}catch(u){}var g={tabindex:1,tabIndex:1,title:1,"aria-required":1,"aria-invalid":1};if(!j.copyAttrs)j.copyAttrs={};c.extendUNDEFProp(j.copyAttrs,g);e.common=function(a,i,d){Modernizr.formvalidation&&a.bind("firstinvalid",function(b){(c.fromSubmit||!r)&&a.unbind("invalid.replacedwidgetbubble").bind("invalid.replacedwidgetbubble",
function(d){!b.isInvalidUIPrevented()&&!d.isDefaultPrevented()&&(c.validityAlert.showFor(b.target),b.preventDefault(),d.preventDefault());a.unbind("invalid.replacedwidgetbubble")})});var e,f,k=b("input, span.ui-slider-handle",i),h=a[0].attributes;for(e in j.copyAttrs)if((f=h[e])&&f.specified)g[e]&&k[0]?k.attr(e,f.nodeValue):i[0].setAttribute(e,f.nodeValue);f=a.attr("id");e=j.calculateWidth?{css:{marginRight:a.css("marginRight"),marginLeft:a.css("marginLeft")},outerWidth:a.outerWidth()}:{};e.label=
f?b('label[for="'+f+'"]',a[0].form):o;f=c.getID(e.label);i.addClass(a[0].className);c.addShadowDom(a,i,{data:d||{},shadowFocusElement:b("input.input-datetime-local-date, span.ui-slider-handle",i)[0],shadowChilds:k});a.after(i).hide();a[0].form&&b(a[0].form).bind("reset",function(b){b.originalEvent&&!b.isDefaultPrevented()&&setTimeout(function(){a.prop("value",a.prop("value"))},0)});1==i.length&&!b("*",i)[0]&&(i.attr("aria-labeledby",f),e.label.bind("click",function(){i.focus();return!1}));return e};
Modernizr.formvalidation&&["input","form"].forEach(function(a){var b=c.defineNodeNameProperty(a,"checkValidity",{prop:{value:function(){r=!0;var a=b.prop._supvalue.apply(this,arguments);r=!1;return a}}})});if(!p["datetime-local"]||j.replaceUI){var t=[0.595,0.395],w=[0.565,0.425],y=!b.browser.msie||6<c.browserVersion?0:0.45,z=function(a,i,d,e){var g,k,h=function(){m.dpDiv.unbind("mousedown.webshimsmousedownhandler");k=g=!1},m=i.bind("focusin",function(){h();m.dpDiv.unbind("mousedown.webshimsmousedownhandler").bind("mousedown.webshimsmousedownhandler",
function(){g=!0})}).bind("focusout blur",function(a){g&&(k=!0,a.stopImmediatePropagation())}).datepicker(b.extend({onClose:function(){k&&f.activeElement!==i[0]?(h(),i.trigger("focusout"),i.triggerHandler("blur")):h()}},n,j.datepicker,a.data("datepicker"))).bind("change",d).data("datepicker");m.dpDiv.addClass("input-date-datepicker-control");e&&c.triggerDomUpdate(e[0]);["disabled","min","max","value","step"].forEach(function(b){var d=a.prop(b);""!==d&&("disabled"!=b||!d)&&a.prop(b,d)});return m};e["datetime-local"]=
function(a){if(b.fn.datepicker){var c=b('<span role="group" class="input-datetime-local"><input type="text" class="input-datetime-local-date" /><input type="time" class="input-datetime-local-time" /></span>'),d=this.common(a,c,e["datetime-local"].attrs),f=b("input.input-datetime-local-date",c),g=z(a,f,function(d){var m=f.prop("value")||"",g="";if(j.lazyDate){var x=b.data(f[0],"setDateLazyTimer");x&&(clearTimeout(x),b.removeData(f[0],"setDateLazyTimer"))}if(m){g=b("input.input-datetime-local-time",
c).prop("value")||"00:00";try{m=(m=b.datepicker.parseDate(f.datepicker("option","dateFormat"),m))?b.datepicker.formatDate("yy-mm-dd",m):f.prop("value")}catch(h){m=f.prop("value")}}e["datetime-local"].blockAttr=!0;a.prop("value",!m&&!g?"":m+"T"+g);e["datetime-local"].blockAttr=!1;d.stopImmediatePropagation();k(a[0],"input");k(a[0],"change")},c);b("input.input-datetime-local-time",c).bind("change",function(d){var c=b.prop(this,"value"),i=["",""];if(c){i=a.prop("value").split("T");if(2>i.length||!i[0])i[0]=
b.datepicker.formatDate("yy-mm-dd",new Date);if(i[1]=c)try{f.prop("value",b.datepicker.formatDate(f.datepicker("option","dateFormat"),b.datepicker.parseDate("yy-mm-dd",i[0])))}catch(x){}}i=!i[0]&&!i[1]?"":i.join("T");e["datetime-local"].blockAttr=!0;a.prop("value",i);e["datetime-local"].blockAttr=!1;d.stopImmediatePropagation();k(a[0],"input");k(a[0],"change")});c.attr("aria-labeledby",d.label.attr("id"));d.label.bind("click",function(){f.focus();return!1});if(d.css&&(c.css(d.css),d.outerWidth)){c.outerWidth(d.outerWidth);
var d=c.width(),h=g.trigger[0]?t:w;f.outerWidth(Math.floor(d*h[0]-y),!0);b("input.input-datetime-local-time",c).outerWidth(Math.floor(d*h[1]-y),!0);g.trigger[0]&&q(f,g.trigger)}}};e["datetime-local"].attrs={disabled:function(a,c,d){b("input.input-datetime-local-date",c).prop("disabled",!!d);b("input.input-datetime-local-time",c).prop("disabled",!!d)},step:function(a,c,d){b("input.input-datetime-local-time",c).attr("step",d)},min:function(a,c,d){if(d){d=d.split?d.split("T"):[];try{d=b.datepicker.parseDate("yy-mm-dd",
d[0])}catch(e){d=!1}}d||(d=null);b("input.input-datetime-local-date",c).datepicker("option","minDate",d)},max:function(a,c,d){if(d){d=d.split?d.split("T"):[];try{d=b.datepicker.parseDate("yy-mm-dd",d[0])}catch(e){d=!1}}d||(d=null);b("input.input-datetime-local-date",c).datepicker("option","maxDate",d)},value:function(c,i,d){var f;if(d){d=d.split?d.split("T"):[];try{f=b.datepicker.parseDate("yy-mm-dd",d[0])}catch(g){f=!1}}f?(e["datetime-local"].blockAttr||a(b("input.input-datetime-local-date",i),f),
b("input.input-datetime-local-time",i).prop("value",d[1]||"00:00")):(b("input.input-datetime-local-date",i).prop("value",d[0]||""),b("input.input-datetime-local-time",i).prop("value",d[1]||""))}};e.date=function(a){if(b.fn.datepicker){var c=b('<input class="input-date" type="text" />'),d=this.common(a,c,e.date.attrs),f=z(a,c,function(d){e.date.blockAttr=!0;var f;if(j.lazyDate){var g=b.data(c[0],"setDateLazyTimer");g&&(clearTimeout(g),b.removeData(c[0],"setDateLazyTimer"))}try{f=(f=b.datepicker.parseDate(c.datepicker("option",
"dateFormat"),c.prop("value")))?b.datepicker.formatDate("yy-mm-dd",f):c.prop("value")}catch(m){f=c.prop("value")}a.prop("value",f);e.date.blockAttr=!1;d.stopImmediatePropagation();k(a[0],"input");k(a[0],"change")});d.css&&(c.css(d.css),d.outerWidth&&c.outerWidth(d.outerWidth),f.trigger[0]&&q(c,f.trigger))}};e.date.attrs={disabled:function(a,c,d){b.prop(c,"disabled",!!d)},min:function(a,c,d){try{d=b.datepicker.parseDate("yy-mm-dd",d)}catch(e){d=!1}d&&b(c).datepicker("option","minDate",d)},max:function(a,
c,d){try{d=b.datepicker.parseDate("yy-mm-dd",d)}catch(e){d=!1}d&&b(c).datepicker("option","maxDate",d)},value:function(c,f,d){if(!e.date.blockAttr){try{var g=b.datepicker.parseDate("yy-mm-dd",d)}catch(j){g=!1}g?a(b(f),g):b.prop(f,"value",d)}}}}if(!p.range||j.replaceUI)e.range=function(a){if(b.fn.slider){var c=b('<span class="input-range"><span class="ui-slider-handle" role="slider" tabindex="0" /></span>'),d=this.common(a,c,e.range.attrs);b("span",c).attr("aria-labeledby",d.label.attr("id"));d.label.bind("click",
function(){b("span",c).focus();return!1});d.css&&(c.css(d.css),d.outerWidth&&c.outerWidth(d.outerWidth));c.slider(b.extend({},j.slider,a.data("slider"),{slide:function(b,c){if(b.originalEvent)e.range.blockAttr=!0,a.prop("value",c.value),e.range.blockAttr=!1,k(a[0],"input"),k(a[0],"change")}}));["disabled","min","max","step","value"].forEach(function(c){var d=a.attr(c),f;"value"==c&&!d&&(f=a.getShadowElement())&&(d=(b(f).slider("option","max")-b(f).slider("option","min"))/2);null!=d&&a.attr(c,d)})}},
e.range.attrs={disabled:function(a,c,d){d=!!d;b(c).slider("option","disabled",d);b("span",c).attr({"aria-disabled":d+"",tabindex:d?"-1":"0"})},min:function(a,c,d){d=d?1*d||0:0;b(c).slider("option","min",d);b("span",c).attr({"aria-valuemin":d})},max:function(a,c,d){d=d||0===d?1*d||100:100;b(c).slider("option","max",d);b("span",c).attr({"aria-valuemax":d})},value:function(a,c,d){d=b(a).prop("valueAsNumber");isNaN(d)||(e.range.blockAttr||b(c).slider("option","value",d),b("span",c).attr({"aria-valuenow":d,
"aria-valuetext":d}))},step:function(a,c,d){d=d&&b.trim(d)?1*d||1:1;b(c).slider("option","step",d)}};if(!c.bugs.valueAsNumberSet&&(j.replaceUI||!Modernizr.inputtypes.date||!Modernizr.inputtypes["datetime-local"]||!Modernizr.inputtypes.range))h=function(){c.data(this,"hasShadow")&&b.prop(this,"value",b.prop(this,"value"))},c.onNodeNamesPropertyModify("input","valueAsNumber",h),c.onNodeNamesPropertyModify("input","valueAsDate",h);b.each(["disabled","min","max","value","step"],function(a,b){c.onNodeNamesPropertyModify("input",
b,function(a){var f=c.data(this,"shadowData");if(f&&f.data&&f.data[b]&&f.nativeElement===this)f.data[b](this,f.shadowElement,a)})});if(!j.availabeLangs)j.availabeLangs="af ar ar-DZ az bg bs ca cs da de el en-AU en-GB en-NZ eo es et eu fa fi fo fr fr-CH gl he hr hu hy id is it ja ko kz lt lv ml ms nl no pl pt-BR rm ro ru sk sl sq sr sr-SR sv ta th tr uk vi zh-CN zh-HK zh-TW".split(" ");h=function(){b.datepicker&&(c.activeLang({langObj:b.datepicker.regional,module:"form-number-date-ui",callback:function(a){b("input.hasDatepicker").filter(".input-date, .input-datetime-local-date").datepicker("option",
b.extend(n,a,j.datepicker))}}),b(f).unbind("jquery-uiReady.langchange input-widgetsReady.langchange"))};b(f).bind("jquery-uiReady.langchange input-widgetsReady.langchange",h);h();(function(){var a=function(){var a={};return function(c){return c in a?a[c]:a[c]=b('<input type="'+c+'" />')[0].type===c}}();if(!a("number")||!a("time")){var e=c.cfg["forms-ext"],d=c.inputTypes,g=function(a,f,e){e=e||{};if(!("type"in e))e.type=b.prop(a,"type");if(!("step"in e))e.step=c.getStep(a,e.type);if(!("valueAsNumber"in
e))e.valueAsNumber=d[e.type].asNumber(b.prop(a,"value"));var g="any"==e.step?d[e.type].step*d[e.type].stepScaleFactor:e.step;c.addMinMaxNumberToCache("min",b(a),e);c.addMinMaxNumberToCache("max",b(a),e);if(isNaN(e.valueAsNumber))e.valueAsNumber=d[e.type].stepBase||0;if("any"!==e.step&&(a=Math.round(1E7*((e.valueAsNumber-(e.minAsnumber||0))%e.step))/1E7)&&Math.abs(a)!=e.step)e.valueAsNumber-=a;a=e.valueAsNumber+g*f;return a=!isNaN(e.minAsNumber)&&a<e.minAsNumber?e.valueAsNumber*f<e.minAsNumber?e.minAsNumber:
isNaN(e.maxAsNumber)?e.valueAsNumber:e.maxAsNumber:!isNaN(e.maxAsNumber)&&a>e.maxAsNumber?e.valueAsNumber*f>e.maxAsNumber?e.maxAsNumber:isNaN(e.minAsNumber)?e.valueAsNumber:e.minAsNumber:Math.round(1E7*a)/1E7};c.modules["form-number-date-ui"].getNextStep=g;var j=function(a,c,e){if(!a.disabled&&!a.readOnly&&!b(e).hasClass("step-controls")&&(b.prop(a,"value",d[c].numberToString(g(a,b(e).hasClass("step-up")?1:-1,{type:c}))),b(a).unbind("blur.stepeventshim"),k(a,"input"),f.activeElement)){if(f.activeElement!==
a)try{a.focus()}catch(i){}setTimeout(function(){if(f.activeElement!==a)try{a.focus()}catch(c){}b(a).one("blur.stepeventshim",function(){k(a,"change")})},0)}};if(e.stepArrows){var h={set:function(){var a=c.data(this,"step-controls");if(a)a[this.disabled||this.readonly?"addClass":"removeClass"]("disabled-step-control")}};c.onNodeNamesPropertyModify("input","disabled",h);c.onNodeNamesPropertyModify("input","readonly",b.extend({},h))}var n={38:1,40:-1};c.addReady(function(f,h){e.stepArrows&&b("input",
f).add(h.filter("input")).each(function(){var f=b.prop(this,"type");if(d[f]&&d[f].asNumber&&e.stepArrows&&!(!0!==e.stepArrows&&!e.stepArrows[f]||a(f)||b(h).hasClass("has-step-controls"))){var h=this,m=b('<span class="step-controls" unselectable="on"><span class="step-up" /><span class="step-down" /></span>').insertAfter(h).bind("selectstart dragstart",function(){return!1}).bind("mousedown mousepress",function(a){j(h,f,a.target);return!1}).bind("mousepressstart mousepressend",function(a){b(a.target)["mousepressstart"==
a.type?"addClass":"removeClass"]("mousepress-ui")}),p=function(a,c){if(!h.disabled&&!h.readOnly)return b.prop(h,"value",d[f].numberToString(g(h,c,{type:f}))),k(h,"input"),!1},o=b(h).addClass("has-step-controls").attr({readonly:h.readOnly,disabled:h.disabled,autocomplete:"off",role:"spinbutton"}).bind(b.browser.msie?"keydown":"keypress",function(a){if(!h.disabled&&!h.readOnly&&n[a.keyCode])return b.prop(h,"value",d[f].numberToString(g(h,n[a.keyCode],{type:f}))),k(h,"input"),!1});b.fn.mwheelIntent?
o.add(m).bind("mwheelIntent",p):o.bind("focus",function(){o.add(m).unbind(".mwhellwebshims").bind("mousewheel.mwhellwebshims",p)}).bind("blur",function(){b(h).add(m).unbind(".mwhellwebshims")});c.data(h,"step-controls",m);e.calculateWidth&&(q(o,m),m.css("marginTop",(o.outerHeight()-m.outerHeight())/2))}})})}})();c.addReady(function(a,g){b(f).bind("jquery-uiReady.initinputui input-widgetsReady.initinputui",function(){(b.datepicker||b.fn.slider)&&e(a,g);b.datepicker&&b.fn.slider?b(f).unbind(".initinputui"):
c.modules["input-widgets"].src||c.warn('jQuery UI Widget factory is already included, but not datepicker or slider. configure src of $.webshims.modules["input-widgets"].src')})})});
