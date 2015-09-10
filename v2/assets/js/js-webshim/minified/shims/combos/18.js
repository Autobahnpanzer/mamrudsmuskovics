jQuery.webshims.register("form-datalist",function(c,d,m,e,r){d.propTypes.element=function(e){d.createPropDefault(e,"attr");if(!e.prop)e.prop={get:function(){var d=e.attr.get.call(this);d&&(d=c("#"+d)[0])&&e.propNodeName&&!c.nodeName(d,e.propNodeName)&&(d=null);return d||null},writeable:!1}};(function(){if(!Modernizr.input.list){var i=0,k={submit:1,button:1,reset:1,hidden:1,range:1,date:1},p=c.browser.msie&&7>parseInt(c.browser.version,10),q={},l=function(c){if(!c)return[];if(q[c])return q[c];var d;
try{d=JSON.parse(localStorage.getItem("storedDatalistOptions"+c))}catch(b){}q[c]=d||[];return d||[]},t={_create:function(a){if(!k[c.prop(a.input,"type")]){var d=a.datalist,b=c.data(a.input,"datalistWidget");if(d&&b&&b.datalist!==d)b.datalist=d,b.id=a.id,c(b.datalist).unbind("updateDatalist.datalistWidget").bind("updateDatalist.datalistWidget",c.proxy(b,"_resetListCached")),b._resetListCached();else if(d){if(!(b&&b.datalist===d)){i++;var g=this;this.hideList=c.proxy(g,"hideList");this.timedHide=function(){clearTimeout(g.hideTimer);
g.hideTimer=setTimeout(g.hideList,9)};this.datalist=d;this.id=a.id;this.hasViewableData=!0;this._autocomplete=c.attr(a.input,"autocomplete");c.data(a.input,"datalistWidget",this);this.shadowList=c('<div class="datalist-polyfill" />').appendTo("body");this.index=-1;this.input=a.input;this.arrayOptions=[];this.shadowList.delegate("li","mouseenter.datalistWidget mousedown.datalistWidget click.datalistWidget",function(b){var a=c("li:not(.hidden-item)",g.shadowList),d="mousedown"==b.type||"click"==b.type;
g.markItem(a.index(b.currentTarget),d,a);"click"==b.type&&g.hideList();return"mousedown"!=b.type}).bind("focusout",this.timedHide);a.input.setAttribute("autocomplete","off");c(a.input).attr({"aria-haspopup":"true"}).bind("input.datalistWidget",function(){if(!g.triggeredByDatalist)g.changedValue=!1,g.showHideOptions()}).bind("keydown.datalistWidget",function(b){var a=b.keyCode;if(40==a&&!g.showList())return g.markItem(g.index+1,!0),!1;if(g.isListVisible){if(38==a)return g.markItem(g.index-1,!0),!1;
if(!b.shiftKey&&(33==a||36==a))return g.markItem(0,!0),!1;if(!b.shiftKey&&(34==a||35==a))return b=c("li:not(.hidden-item)",g.shadowList),g.markItem(b.length-1,!0,b),!1;if(13==a||27==a)return 13==a&&g.changeValue(c("li.active-item:not(.hidden-item)",g.shadowList)),g.hideList(),!1}}).bind("focus.datalistWidget",function(){c(this).hasClass("list-focus")&&g.showList()}).bind("mousedown.datalistWidget",function(){(this==e.activeElement||c(this).is(":focus"))&&g.showList()}).bind("blur.datalistWidget",
this.timedHide);c(this.datalist).unbind("updateDatalist.datalistWidget").bind("updateDatalist.datalistWidget",c.proxy(this,"_resetListCached"));this._resetListCached();a.input.form&&a.input.id&&c(a.input.form).bind("submit.datalistWidget"+a.input.id,function(){var b=c.prop(a.input,"value"),d=(a.input.name||a.input.id)+c.prop(a.input,"type");if(!g.storedOptions)g.storedOptions=l(d);if(b&&-1==g.storedOptions.indexOf(b)&&(g.storedOptions.push(b),b=g.storedOptions,d)){b=b||[];try{localStorage.setItem("storedDatalistOptions"+
d,JSON.stringify(b))}catch(f){}}});c(m).bind("unload",function(){g.destroy()})}}else b&&b.destroy()}},destroy:function(){var a=c.attr(this.input,"autocomplete");c(this.input).unbind(".datalistWidget").removeData("datalistWidget");this.shadowList.remove();c(e).unbind(".datalist"+this.id);this.input.form&&this.input.id&&c(this.input.form).unbind("submit.datalistWidget"+this.input.id);this.input.removeAttribute("aria-haspopup");a===r?this.input.removeAttribute("autocomplete"):c(this.input).attr("autocomplete",
a)},_resetListCached:function(c){var f=this,b;this.needsUpdate=!0;this.lastUpdatedValue=!1;this.lastUnfoundValue="";this.updateTimer||(m.QUnit||(b=c&&e.activeElement==f.input)?f.updateListOptions(b):d.ready("WINDOWLOAD",function(){f.updateTimer=setTimeout(function(){f.updateListOptions();f=null;i=1},200+100*i)}))},updateListOptions:function(a){this.needsUpdate=!1;clearTimeout(this.updateTimer);this.updateTimer=!1;this.shadowList.css({fontSize:c.curCSS(this.input,"fontSize"),fontFamily:c.curCSS(this.input,
"fontFamily")});var d=[],b=[],g=[],h,e,i,v;for(e=c.prop(this.datalist,"options"),i=0,v=e.length;i<v;i++){h=e[i];if(h.disabled)return;h={value:c(h).val()||"",text:c.trim(c.attr(h,"label")||h.textContent||h.innerText||c.text([h])||""),className:h.className||"",style:c.attr(h,"style")||""};h.text?h.text!=h.value&&(h.className+=" different-label-value"):h.text=h.value;b[i]=h.value;g[i]=h}if(!this.storedOptions)this.storedOptions=l((this.input.name||this.input.id)+c.prop(this.input,"type"));this.storedOptions.forEach(function(c){-1==
b.indexOf(c)&&g.push({value:c,text:c,className:"stored-suggest",style:""})});for(i=0,v=g.length;i<v;i++)e=g[i],d[i]='<li class="'+e.className+'" style="'+e.style+'" tabindex="-1" role="listitem"><span class="option-label">'+e.text+'</span> <span class="option-value">'+e.value+"</span></li>";this.arrayOptions=g;this.shadowList.html('<ul role="list" class="'+(this.datalist.className||"")+" "+this.datalist.id+'-shadowdom">'+d.join("\n")+"</ul>");c.fn.bgIframe&&p&&this.shadowList.bgIframe();(a||this.isListVisible)&&
this.showHideOptions()},showHideOptions:function(a){var d=c.prop(this.input,"value").toLowerCase();if(!(d===this.lastUpdatedValue||this.lastUnfoundValue&&0===d.indexOf(this.lastUnfoundValue))){this.lastUpdatedValue=d;var b=!1,g=c("li",this.shadowList);d?this.arrayOptions.forEach(function(a,e){if(!("lowerText"in a))a.lowerText=a.text!=a.value?a.text.toLowerCase()+a.value.toLowerCase():a.text.toLowerCase();-1!==a.lowerText.indexOf(d)?(c(g[e]).removeClass("hidden-item"),b=!0):c(g[e]).addClass("hidden-item")}):
g.length&&(g.removeClass("hidden-item"),b=!0);this.hasViewableData=b;!a&&b&&this.showList();if(!b)this.lastUnfoundValue=d,this.hideList()}},setPos:function(){var a=d.getRelOffset(this.shadowList,this.input);a.top+=c(this.input).outerHeight();a.width=c(this.input).outerWidth()-(parseInt(this.shadowList.css("borderLeftWidth"),10)||0)-(parseInt(this.shadowList.css("borderRightWidth"),10)||0);this.shadowList.css(a);return a},showList:function(){if(this.isListVisible)return!1;this.needsUpdate&&this.updateListOptions();
this.showHideOptions(!0);if(!this.hasViewableData)return!1;this.isListVisible=!0;var a=this,d;a.setPos();p&&(a.shadowList.css("height","auto"),250<a.shadowList.height()&&a.shadowList.css("height",220));a.shadowList.addClass("datalist-visible");c(e).unbind(".datalist"+a.id).bind("mousedown.datalist"+a.id+" focusin.datalist"+a.id,function(b){b.target===a.input||a.shadowList[0]===b.target||c.contains(a.shadowList[0],b.target)?(clearTimeout(a.hideTimer),setTimeout(function(){clearTimeout(a.hideTimer)},
9)):a.timedHide()});c(m).unbind(".datalist"+a.id).bind("resize.datalist"+a.id+"orientationchange.datalist "+a.id+" emchange.datalist"+a.id,function(){clearTimeout(d);d=setTimeout(function(){a.setPos()},9)});clearTimeout(d);return!0},hideList:function(){if(!this.isListVisible)return!1;var a=this,f=function(){a.changedValue&&c(a.input).trigger("change");a.changedValue=!1};a.shadowList.removeClass("datalist-visible list-item-active").scrollTop(0).find("li.active-item").removeClass("active-item");a.index=
-1;a.isListVisible=!1;if(a.changedValue){a.triggeredByDatalist=!0;d.triggerInlineForm&&d.triggerInlineForm(a.input,"input");if(a.input==e.activeElement||c(a.input).is(":focus"))c(a.input).one("blur",f);else f();a.triggeredByDatalist=!1}c(e).unbind(".datalist"+a.id);c(m).unbind(".datalist"+a.id);return!0},scrollIntoView:function(a){var d=c("> ul",this.shadowList),b=a.position();b.top-=(parseInt(d.css("paddingTop"),10)||0)+(parseInt(d.css("marginTop"),10)||0)+(parseInt(d.css("borderTopWidth"),10)||
0);0>b.top?this.shadowList.scrollTop(this.shadowList.scrollTop()+b.top-2):(b.top+=a.outerHeight(),a=this.shadowList.height(),b.top>a&&this.shadowList.scrollTop(this.shadowList.scrollTop()+(b.top-a)+2))},changeValue:function(a){if(a[0]){var a=c("span.option-value",a).text(),d=c.prop(this.input,"value");if(a!=d)c(this.input).prop("value",a).triggerHandler("updateInput"),this.changedValue=!0}},markItem:function(a,d,b){b=b||c("li:not(.hidden-item)",this.shadowList);if(b.length)0>a?a=b.length-1:a>=b.length&&
(a=0),b.removeClass("active-item"),this.shadowList.addClass("list-item-active"),b=b.filter(":eq("+a+")").addClass("active-item"),d&&(this.changeValue(b),this.scrollIntoView(b)),this.index=a}};(function(){d.defineNodeNameProperty("datalist","options",{prop:{writeable:!1,get:function(){var a=c("select",this);a[0]?a=a[0].options:(a=c("option",this).get(),a.length&&d.warn("you should wrap you option-elements for a datalist in a select element to support IE and other old browsers."));return a}}});d.defineNodeNameProperties("input",
{selectedOption:{prop:{writeable:!1,get:function(){var a=c.prop(this,"list"),d=null,b;if(!a)return d;b=c.attr(this,"value");if(!b)return d;a=c.prop(a,"options");if(!a.length)return d;c.each(a,function(a,h){if(b==c.prop(h,"value"))return d=h,!1});return d}}},autocomplete:{attr:{get:function(){var a=c.data(this,"datalistWidget");return a?a._autocomplete:"autocomplete"in this?this.autocomplete:this.getAttribute("autocomplete")},set:function(a){var d=c.data(this,"datalistWidget");d?(d._autocomplete=a,
"off"==a&&d.hideList()):"autocomplete"in this?this.autocomplete=a:this.setAttribute("autocomplete",a)}}},list:{attr:{get:function(){var c=d.contentAttr(this,"list");return null==c?r:c},set:function(a){d.contentAttr(this,"list",a);d.objectCreate(t,r,{input:this,id:a,datalist:c.prop(this,"list")})}},initAttr:!0,reflect:!0,propType:"element",propNodeName:"datalist"}});if(c.event.customEvent)c.event.customEvent.updateDatalist=!0,c.event.customEvent.updateInput=!0;d.addReady(function(c,d){d.filter("datalist > select, datalist, datalist > option, datalist > select > option").closest("datalist").triggerHandler("updateDatalist")})})()}})()});
jQuery.webshims.register("form-extend",function(c,d,m,e,r,i){var k=m.Modernizr,m=k.inputtypes;if(k.formvalidation&&!d.bugs.bustedValidity){var p=d.inputTypes,q={};d.addInputType=function(b,c){p[b]=c};d.addValidityRule=function(b,c){q[b]=c};d.addValidityRule("typeMismatch",function(b,c,d,a){if(""===c)return!1;a=a.typeMismatch;if(!("type"in d))d.type=(b[0].getAttribute("type")||"").toLowerCase();p[d.type]&&p[d.type].mismatch&&(a=p[d.type].mismatch(c,b));return a});var l=i.overrideMessages,t=!k.requiredSelect||
!m.number||!m.time||!m.range||l,a="customError,typeMismatch,rangeUnderflow,rangeOverflow,stepMismatch,tooLong,patternMismatch,valueMissing,valid".split(","),i=l?["value","checked"]:["value"],f=l?["textarea"]:[],b=function(b,d){if(b){var a=(b.getAttribute&&b.getAttribute("type")||b.type||"").toLowerCase();if(l||!(k.requiredSelect||"select-one"!=a)||p[a])l&&!d&&"radio"==a&&b.name?c(e.getElementsByName(b.name)).each(function(){c.prop(this,"validity")}):c.prop(b,"validity")}},g={};["input","textarea",
"select"].forEach(function(a){var h=d.defineNodeNameProperty(a,"setCustomValidity",{prop:{value:function(g){var g=g+"",n="input"==a?c(this).getNativeElement()[0]:this;h.prop._supvalue.call(n,g);d.bugs.validationMessage&&d.data(n,"customvalidationMessage",g);t&&(d.data(n,"hasCustomError",!!g),b(n))}}});g[a]=h.prop._supvalue});if(t||l)i.push("min"),i.push("max"),i.push("step"),f.push("input");if(!k.requiredSelect||l)i.push("required"),f.push("select");if(t){var h;f.forEach(function(b){var e=d.defineNodeNameProperty(b,
"validity",{prop:{get:function(){if(!h){var s="input"==b?c(this).getNativeElement()[0]:this,n=e.prop._supget.call(s);if(!n)return n;var j={};a.forEach(function(b){j[b]=n[b]});if(!c.prop(s,"willValidate"))return j;h=!0;var z=c(s),f={type:(s.getAttribute&&s.getAttribute("type")||"").toLowerCase(),nodeName:(s.nodeName||"").toLowerCase()},i=z.val(),u=!!d.data(s,"hasCustomError"),o;h=!1;j.customError=u;if(j.valid&&j.customError)j.valid=!1;else if(!j.valid){var A=!0;c.each(j,function(b,c){if(c)return A=
!1});if(A)j.valid=!0}c.each(q,function(c,a){j[c]=a(z,i,f,j);if(j[c]&&(j.valid||!o))g[b].call(s,d.createValidationMessage(s,c)),j.valid=!1,o=!0});j.valid?(g[b].call(s,""),d.data(s,"hasCustomError",!1)):l&&!o&&!u&&c.each(j,function(c,a){if("valid"!==c&&a)return g[b].call(s,d.createValidationMessage(s,c)),!1});return j}},writeable:!1}})});i.forEach(function(c){d.onNodeNamesPropertyModify(f,c,function(){b(this)})});if(e.addEventListener){var u;e.addEventListener("change",function(c){clearTimeout(u);b(c.target)},
!0);e.addEventListener("input",function(c){clearTimeout(u);u=setTimeout(function(){b(c.target)},290)},!0)}var w=f.join(",");d.addReady(function(b,a){c(w,b).add(a.filter(w)).each(function(){c.prop(this,"validity")})});l&&d.ready("DOM form-message",function(){d.activeLang({register:"form-core",callback:function(){c("input, select, textarea").getNativeElement().each(function(){if(!d.data(this,"hasCustomError")){var b=this,a=c.prop(b,"validity")||{valid:!0},h;a.valid||(h=(b.nodeName||"").toLowerCase(),
c.each(a,function(c,a){if("valid"!==c&&a)return g[h].call(b,d.createValidationMessage(b,c)),!1}))}})}})})}d.defineNodeNameProperty("input","type",{prop:{get:function(){var b=(this.getAttribute("type")||"").toLowerCase();return d.inputTypes[b]?b:this.type}}});k.input.list&&!(c("<datalist><select><option></option></select></datalist>").prop("options")||[]).length&&d.defineNodeNameProperty("datalist","options",{prop:{writeable:!1,get:function(){var b=this.options||[];if(!b.length){var a=c("select",this);
if(a[0]&&a[0].options&&a[0].options.length)b=a[0].options}return b}}})}});
jQuery.webshims.register("form-number-date-api",function(c,d){if(!d.getStep)d.getStep=function(b,a){var d=c.attr(b,"step");if("any"===d)return d;a=a||k(b);if(!e[a]||!e[a].step)return d;d=f.number.asNumber(d);return(!isNaN(d)&&0<d?d:e[a].step)*e[a].stepScaleFactor};if(!d.addMinMaxNumberToCache)d.addMinMaxNumberToCache=function(b,c,a){b+"AsNumber"in a||(a[b+"AsNumber"]=e[a.type].asNumber(c.attr(b)),isNaN(a[b+"AsNumber"])&&b+"Default"in e[a.type]&&(a[b+"AsNumber"]=e[a.type][b+"Default"]))};var m=parseInt("NaN",
10),e=d.inputTypes,r=function(b){return"number"==typeof b||b&&b==1*b},i=function(b){return c('<input type="'+b+'" />').prop("type")===b},k=function(b){return(b.getAttribute("type")||"").toLowerCase()},p=d.addMinMaxNumberToCache,q=function(b,c){for(var b=""+b,c=c-b.length,a=0;a<c;a++)b="0"+b;return b},l=d.bugs.valueAsNumberSet||d.bugs.bustedValidity;d.addValidityRule("stepMismatch",function(b,c,a,f){if(""===c)return!1;if(!("type"in a))a.type=k(b[0]);if("date"==a.type)return!1;f=(f||{}).stepMismatch;
if(e[a.type]&&e[a.type].step){if(!("step"in a))a.step=d.getStep(b[0],a.type);if("any"==a.step)return!1;if(!("valueAsNumber"in a))a.valueAsNumber=e[a.type].asNumber(c);if(isNaN(a.valueAsNumber))return!1;p("min",b,a);b=a.minAsNumber;isNaN(b)&&(b=e[a.type].stepBase||0);f=Math.abs((a.valueAsNumber-b)%a.step);f=!(1.0E-7>=f||1.0E-7>=Math.abs(f-a.step))}return f});[{name:"rangeOverflow",attr:"max",factor:1},{name:"rangeUnderflow",attr:"min",factor:-1}].forEach(function(b){d.addValidityRule(b.name,function(c,
a,d,f){f=(f||{})[b.name]||!1;if(""===a)return f;if(!("type"in d))d.type=k(c[0]);if(e[d.type]&&e[d.type].asNumber){if(!("valueAsNumber"in d))d.valueAsNumber=e[d.type].asNumber(a);if(isNaN(d.valueAsNumber))return!1;p(b.attr,c,d);if(isNaN(d[b.attr+"AsNumber"]))return f;f=d[b.attr+"AsNumber"]*b.factor<d.valueAsNumber*b.factor-1.0E-7}return f})});d.reflectProperties(["input"],["max","min","step"]);var t=d.defineNodeNameProperty("input","valueAsNumber",{prop:{get:function(){var b=k(this),b=e[b]&&e[b].asNumber?
e[b].asNumber(c.prop(this,"value")):t.prop._supget&&t.prop._supget.apply(this,arguments);null==b&&(b=m);return b},set:function(b){var a=k(this);e[a]&&e[a].numberToString?isNaN(b)?c.prop(this,"value",""):(a=e[a].numberToString(b),!1!==a?c.prop(this,"value",a):d.warn("INVALID_STATE_ERR: DOM Exception 11")):t.prop._supset&&t.prop._supset.apply(this,arguments)}}}),a=d.defineNodeNameProperty("input","valueAsDate",{prop:{get:function(){var b=k(this);return e[b]&&e[b].asDate&&!e[b].noAsDate?e[b].asDate(c.prop(this,
"value")):a.prop._supget&&a.prop._supget.call(this)||null},set:function(b){var g=k(this);if(e[g]&&e[g].dateToString&&!e[g].noAsDate){if(null===b)return c.prop(this,"value",""),"";g=e[g].dateToString(b);if(!1!==g)return c.prop(this,"value",g),g;d.warn("INVALID_STATE_ERR: DOM Exception 11")}else return a.prop._supset&&a.prop._supset.apply(this,arguments)||null}}}),f={number:{mismatch:function(b){return!r(b)},step:1,stepScaleFactor:1,asNumber:function(b){return r(b)?1*b:m},numberToString:function(b){return r(b)?
b:!1}},range:{minDefault:0,maxDefault:100},date:{mismatch:function(b){if(!b||!b.split||!/\d$/.test(b))return!0;var a=b.split(/\u002D/);if(3!==a.length)return!0;var d=!1;c.each(a,function(b,c){if(!(r(c)||c&&c=="0"+1*c))return d=!0,!1});if(d)return d;if(4!==a[0].length||2!=a[1].length||12<a[1]||2!=a[2].length||33<a[2])d=!0;return b!==this.dateToString(this.asDate(b,!0))},step:1,stepScaleFactor:864E5,asDate:function(b,c){return!c&&this.mismatch(b)?null:new Date(this.asNumber(b,!0))},asNumber:function(b,
c){var a=m;if(c||!this.mismatch(b))b=b.split(/\u002D/),a=Date.UTC(b[0],b[1]-1,b[2]);return a},numberToString:function(b){return r(b)?this.dateToString(new Date(1*b)):!1},dateToString:function(b){return b&&b.getFullYear?b.getUTCFullYear()+"-"+q(b.getUTCMonth()+1,2)+"-"+q(b.getUTCDate(),2):!1}},time:{mismatch:function(b,a){if(!b||!b.split||!/\d$/.test(b))return!0;b=b.split(/\u003A/);if(2>b.length||3<b.length)return!0;var d=!1,e;b[2]&&(b[2]=b[2].split(/\u002E/),e=parseInt(b[2][1],10),b[2]=b[2][0]);c.each(b,
function(b,c){if(!(r(c)||c&&c=="0"+1*c)||2!==c.length)return d=!0,!1});if(d||23<b[0]||0>b[0]||59<b[1]||0>b[1]||b[2]&&(59<b[2]||0>b[2])||e&&isNaN(e))return!0;e&&(100>e?e*=100:10>e&&(e*=10));return!0===a?[b,e]:!1},step:60,stepBase:0,stepScaleFactor:1E3,asDate:function(b){b=new Date(this.asNumber(b));return isNaN(b)?null:b},asNumber:function(b){var c=m,b=this.mismatch(b,!0);!0!==b&&(c=Date.UTC("1970",0,1,b[0][0],b[0][1],b[0][2]||0),b[1]&&(c+=b[1]));return c},dateToString:function(c){if(c&&c.getUTCHours){var a=
q(c.getUTCHours(),2)+":"+q(c.getUTCMinutes(),2),d=c.getSeconds();"0"!=d&&(a+=":"+q(d,2));d=c.getUTCMilliseconds();"0"!=d&&(a+="."+q(d,3));return a}return!1}},"datetime-local":{mismatch:function(c,a){if(!c||!c.split||2!==(c+"special").split(/\u0054/).length)return!0;c=c.split(/\u0054/);return e.date.mismatch(c[0])||e.time.mismatch(c[1],a)},noAsDate:!0,asDate:function(c){c=new Date(this.asNumber(c));return isNaN(c)?null:c},asNumber:function(c){var a=m,d=this.mismatch(c,!0);!0!==d&&(c=c.split(/\u0054/)[0].split(/\u002D/),
a=Date.UTC(c[0],c[1]-1,c[2],d[0][0],d[0][1],d[0][2]||0),d[1]&&(a+=d[1]));return a},dateToString:function(c,a){return e.date.dateToString(c)+"T"+e.time.dateToString(c,a)}}};(l||!i("number"))&&d.addInputType("number",f.number);(l||!i("range"))&&d.addInputType("range",c.extend({},f.number,f.range));(l||!i("date"))&&d.addInputType("date",f.date);(l||!i("time"))&&d.addInputType("time",c.extend({},f.date,f.time));(l||!i("datetime-local"))&&d.addInputType("datetime-local",c.extend({},f.date,f.time,f["datetime-local"]))});
jQuery.webshims.register("form-number-date-ui",function(c,d,m,e,r,i){var k=d.triggerInlineForm,p=Modernizr.inputtypes,q=function(){var c={"padding-box":"innerWidth","border-box":"outerWidth","content-box":"width"},b=Modernizr.prefixed&&Modernizr.prefixed("boxSizing");return function(a,d){var e,f,g;f="width";b&&(f=c[a.css(b)]||f);e=a[f]();f="width"==f;if(e){var o=parseInt(d.css("marginLeft"),10)||0,i=d.outerWidth();(g=parseInt(a.css("marginRight"),10)||0)&&a.css("marginRight",0);o<=-1*i?(d.css("marginRight",
Math.floor(Math.abs(i+o)+g)),a.css("paddingRight",(parseInt(a.css("paddingRight"),10)||0)+Math.abs(o)),f&&a.css("width",Math.floor(e+o))):(d.css("marginRight",g),a.css("width",Math.floor(e-o-i)))}}}(),l={dateFormat:"yy-mm-dd"},t=c([]),a,f=function(b,a){c("input",b).add(a.filter("input")).each(function(){var b=c.prop(this,"type");if(f[b]&&!d.data(this,"shadowData"))f[b](c(this))})},b=function(b,a){if(i.lazyDate){var d=c.data(b[0],"setDateLazyTimer");d&&clearTimeout(d);c.data(b[0],"setDateLazyTimer",
setTimeout(function(){b.datepicker("setDate",a);c.removeData(b[0],"setDateLazyTimer");b=null},0))}else b.datepicker("setDate",a)};if(i.lazyDate===r)try{i.lazyDate=c.browser.msie&&9>d.browserVersion||500>c(m).width()&&500>c(m).height()}catch(g){}var h={tabindex:1,tabIndex:1,title:1,"aria-required":1,"aria-invalid":1};if(!i.copyAttrs)i.copyAttrs={};d.extendUNDEFProp(i.copyAttrs,h);f.common=function(b,n,j){Modernizr.formvalidation&&b.bind("firstinvalid",function(c){(d.fromSubmit||!a)&&b.unbind("invalid.replacedwidgetbubble").bind("invalid.replacedwidgetbubble",
function(a){!c.isInvalidUIPrevented()&&!a.isDefaultPrevented()&&(d.validityAlert.showFor(c.target),c.preventDefault(),a.preventDefault());b.unbind("invalid.replacedwidgetbubble")})});var e,f,g=c("input, span.ui-slider-handle",n),k=b[0].attributes;for(e in i.copyAttrs)if((f=k[e])&&f.specified)h[e]&&g[0]?g.attr(e,f.nodeValue):n[0].setAttribute(e,f.nodeValue);f=b.attr("id");e=i.calculateWidth?{css:{marginRight:b.css("marginRight"),marginLeft:b.css("marginLeft")},outerWidth:b.outerWidth()}:{};e.label=
f?c('label[for="'+f+'"]',b[0].form):t;f=d.getID(e.label);n.addClass(b[0].className);d.addShadowDom(b,n,{data:j||{},shadowFocusElement:c("input.input-datetime-local-date, span.ui-slider-handle",n)[0],shadowChilds:g});b.after(n).hide();b[0].form&&c(b[0].form).bind("reset",function(c){c.originalEvent&&!c.isDefaultPrevented()&&setTimeout(function(){b.prop("value",b.prop("value"))},0)});1==n.length&&!c("*",n)[0]&&(n.attr("aria-labeledby",f),e.label.bind("click",function(){n.focus();return!1}));return e};
Modernizr.formvalidation&&["input","form"].forEach(function(c){var b=d.defineNodeNameProperty(c,"checkValidity",{prop:{value:function(){a=!0;var c=b.prop._supvalue.apply(this,arguments);a=!1;return c}}})});if(!p["datetime-local"]||i.replaceUI){var u=[0.595,0.395],w=[0.565,0.425],v=!c.browser.msie||6<d.browserVersion?0:0.45,x=function(b,a,j,f){var g,h,k=function(){o.dpDiv.unbind("mousedown.webshimsmousedownhandler");h=g=!1},o=a.bind("focusin",function(){k();o.dpDiv.unbind("mousedown.webshimsmousedownhandler").bind("mousedown.webshimsmousedownhandler",
function(){g=!0})}).bind("focusout blur",function(c){g&&(h=!0,c.stopImmediatePropagation())}).datepicker(c.extend({onClose:function(){h&&e.activeElement!==a[0]?(k(),a.trigger("focusout"),a.triggerHandler("blur")):k()}},l,i.datepicker,b.data("datepicker"))).bind("change",j).data("datepicker");o.dpDiv.addClass("input-date-datepicker-control");f&&d.triggerDomUpdate(f[0]);["disabled","min","max","value","step"].forEach(function(c){var a=b.prop(c);""!==a&&("disabled"!=c||!a)&&b.prop(c,a)});return o};f["datetime-local"]=
function(b){if(c.fn.datepicker){var a=c('<span role="group" class="input-datetime-local"><input type="text" class="input-datetime-local-date" /><input type="time" class="input-datetime-local-time" /></span>'),d=this.common(b,a,f["datetime-local"].attrs),e=c("input.input-datetime-local-date",a),g=x(b,e,function(d){var j=e.prop("value")||"",g="";if(i.lazyDate){var y=c.data(e[0],"setDateLazyTimer");y&&(clearTimeout(y),c.removeData(e[0],"setDateLazyTimer"))}if(j){g=c("input.input-datetime-local-time",
a).prop("value")||"00:00";try{j=(j=c.datepicker.parseDate(e.datepicker("option","dateFormat"),j))?c.datepicker.formatDate("yy-mm-dd",j):e.prop("value")}catch(h){j=e.prop("value")}}f["datetime-local"].blockAttr=!0;b.prop("value",!j&&!g?"":j+"T"+g);f["datetime-local"].blockAttr=!1;d.stopImmediatePropagation();k(b[0],"input");k(b[0],"change")},a);c("input.input-datetime-local-time",a).bind("change",function(a){var d=c.prop(this,"value"),j=["",""];if(d){j=b.prop("value").split("T");if(2>j.length||!j[0])j[0]=
c.datepicker.formatDate("yy-mm-dd",new Date);if(j[1]=d)try{e.prop("value",c.datepicker.formatDate(e.datepicker("option","dateFormat"),c.datepicker.parseDate("yy-mm-dd",j[0])))}catch(n){}}j=!j[0]&&!j[1]?"":j.join("T");f["datetime-local"].blockAttr=!0;b.prop("value",j);f["datetime-local"].blockAttr=!1;a.stopImmediatePropagation();k(b[0],"input");k(b[0],"change")});a.attr("aria-labeledby",d.label.attr("id"));d.label.bind("click",function(){e.focus();return!1});if(d.css&&(a.css(d.css),d.outerWidth)){a.outerWidth(d.outerWidth);
var d=a.width(),h=g.trigger[0]?u:w;e.outerWidth(Math.floor(d*h[0]-v),!0);c("input.input-datetime-local-time",a).outerWidth(Math.floor(d*h[1]-v),!0);g.trigger[0]&&q(e,g.trigger)}}};f["datetime-local"].attrs={disabled:function(b,a,d){c("input.input-datetime-local-date",a).prop("disabled",!!d);c("input.input-datetime-local-time",a).prop("disabled",!!d)},step:function(b,a,d){c("input.input-datetime-local-time",a).attr("step",d)},min:function(b,a,d){if(d){d=d.split?d.split("T"):[];try{d=c.datepicker.parseDate("yy-mm-dd",
d[0])}catch(e){d=!1}}d||(d=null);c("input.input-datetime-local-date",a).datepicker("option","minDate",d)},max:function(b,a,d){if(d){d=d.split?d.split("T"):[];try{d=c.datepicker.parseDate("yy-mm-dd",d[0])}catch(e){d=!1}}d||(d=null);c("input.input-datetime-local-date",a).datepicker("option","maxDate",d)},value:function(a,d,j){var e;if(j){j=j.split?j.split("T"):[];try{e=c.datepicker.parseDate("yy-mm-dd",j[0])}catch(g){e=!1}}e?(f["datetime-local"].blockAttr||b(c("input.input-datetime-local-date",d),e),
c("input.input-datetime-local-time",d).prop("value",j[1]||"00:00")):(c("input.input-datetime-local-date",d).prop("value",j[0]||""),c("input.input-datetime-local-time",d).prop("value",j[1]||""))}};f.date=function(b){if(c.fn.datepicker){var a=c('<input class="input-date" type="text" />'),d=this.common(b,a,f.date.attrs),e=x(b,a,function(d){f.date.blockAttr=!0;var e;if(i.lazyDate){var j=c.data(a[0],"setDateLazyTimer");j&&(clearTimeout(j),c.removeData(a[0],"setDateLazyTimer"))}try{e=(e=c.datepicker.parseDate(a.datepicker("option",
"dateFormat"),a.prop("value")))?c.datepicker.formatDate("yy-mm-dd",e):a.prop("value")}catch(g){e=a.prop("value")}b.prop("value",e);f.date.blockAttr=!1;d.stopImmediatePropagation();k(b[0],"input");k(b[0],"change")});d.css&&(a.css(d.css),d.outerWidth&&a.outerWidth(d.outerWidth),e.trigger[0]&&q(a,e.trigger))}};f.date.attrs={disabled:function(b,a,d){c.prop(a,"disabled",!!d)},min:function(b,a,d){try{d=c.datepicker.parseDate("yy-mm-dd",d)}catch(e){d=!1}d&&c(a).datepicker("option","minDate",d)},max:function(b,
a,d){try{d=c.datepicker.parseDate("yy-mm-dd",d)}catch(e){d=!1}d&&c(a).datepicker("option","maxDate",d)},value:function(a,d,e){if(!f.date.blockAttr){try{var g=c.datepicker.parseDate("yy-mm-dd",e)}catch(i){g=!1}g?b(c(d),g):c.prop(d,"value",e)}}}}if(!p.range||i.replaceUI)f.range=function(a){if(c.fn.slider){var b=c('<span class="input-range"><span class="ui-slider-handle" role="slider" tabindex="0" /></span>'),d=this.common(a,b,f.range.attrs);c("span",b).attr("aria-labeledby",d.label.attr("id"));d.label.bind("click",
function(){c("span",b).focus();return!1});d.css&&(b.css(d.css),d.outerWidth&&b.outerWidth(d.outerWidth));b.slider(c.extend({},i.slider,a.data("slider"),{slide:function(c,b){if(c.originalEvent)f.range.blockAttr=!0,a.prop("value",b.value),f.range.blockAttr=!1,k(a[0],"input"),k(a[0],"change")}}));["disabled","min","max","step","value"].forEach(function(b){var d=a.attr(b),e;"value"==b&&!d&&(e=a.getShadowElement())&&(d=(c(e).slider("option","max")-c(e).slider("option","min"))/2);null!=d&&a.attr(b,d)})}},
f.range.attrs={disabled:function(b,a,d){d=!!d;c(a).slider("option","disabled",d);c("span",a).attr({"aria-disabled":d+"",tabindex:d?"-1":"0"})},min:function(b,a,d){d=d?1*d||0:0;c(a).slider("option","min",d);c("span",a).attr({"aria-valuemin":d})},max:function(a,b,d){d=d||0===d?1*d||100:100;c(b).slider("option","max",d);c("span",b).attr({"aria-valuemax":d})},value:function(b,a,d){d=c(b).prop("valueAsNumber");isNaN(d)||(f.range.blockAttr||c(a).slider("option","value",d),c("span",a).attr({"aria-valuenow":d,
"aria-valuetext":d}))},step:function(b,a,d){d=d&&c.trim(d)?1*d||1:1;c(a).slider("option","step",d)}};if(!d.bugs.valueAsNumberSet&&(i.replaceUI||!Modernizr.inputtypes.date||!Modernizr.inputtypes["datetime-local"]||!Modernizr.inputtypes.range))m=function(){d.data(this,"hasShadow")&&c.prop(this,"value",c.prop(this,"value"))},d.onNodeNamesPropertyModify("input","valueAsNumber",m),d.onNodeNamesPropertyModify("input","valueAsDate",m);c.each(["disabled","min","max","value","step"],function(c,a){d.onNodeNamesPropertyModify("input",
a,function(c){var b=d.data(this,"shadowData");if(b&&b.data&&b.data[a]&&b.nativeElement===this)b.data[a](this,b.shadowElement,c)})});if(!i.availabeLangs)i.availabeLangs="af ar ar-DZ az bg bs ca cs da de el en-AU en-GB en-NZ eo es et eu fa fi fo fr fr-CH gl he hr hu hy id is it ja ko kz lt lv ml ms nl no pl pt-BR rm ro ru sk sl sq sr sr-SR sv ta th tr uk vi zh-CN zh-HK zh-TW".split(" ");m=function(){c.datepicker&&(d.activeLang({langObj:c.datepicker.regional,module:"form-number-date-ui",callback:function(b){c("input.hasDatepicker").filter(".input-date, .input-datetime-local-date").datepicker("option",
c.extend(l,b,i.datepicker))}}),c(e).unbind("jquery-uiReady.langchange input-widgetsReady.langchange"))};c(e).bind("jquery-uiReady.langchange input-widgetsReady.langchange",m);m();(function(){var b=function(){var b={};return function(a){return a in b?b[a]:b[a]=c('<input type="'+a+'" />')[0].type===a}}();if(!b("number")||!b("time")){var a=d.cfg["forms-ext"],f=d.inputTypes,g=function(a,b,e){e=e||{};if(!("type"in e))e.type=c.prop(a,"type");if(!("step"in e))e.step=d.getStep(a,e.type);if(!("valueAsNumber"in
e))e.valueAsNumber=f[e.type].asNumber(c.prop(a,"value"));var g="any"==e.step?f[e.type].step*f[e.type].stepScaleFactor:e.step;d.addMinMaxNumberToCache("min",c(a),e);d.addMinMaxNumberToCache("max",c(a),e);if(isNaN(e.valueAsNumber))e.valueAsNumber=f[e.type].stepBase||0;if("any"!==e.step&&(a=Math.round(1E7*((e.valueAsNumber-(e.minAsnumber||0))%e.step))/1E7)&&Math.abs(a)!=e.step)e.valueAsNumber-=a;a=e.valueAsNumber+g*b;return a=!isNaN(e.minAsNumber)&&a<e.minAsNumber?e.valueAsNumber*b<e.minAsNumber?e.minAsNumber:
isNaN(e.maxAsNumber)?e.valueAsNumber:e.maxAsNumber:!isNaN(e.maxAsNumber)&&a>e.maxAsNumber?e.valueAsNumber*b>e.maxAsNumber?e.maxAsNumber:isNaN(e.minAsNumber)?e.valueAsNumber:e.minAsNumber:Math.round(1E7*a)/1E7};d.modules["form-number-date-ui"].getNextStep=g;var i=function(a,b,d){if(!a.disabled&&!a.readOnly&&!c(d).hasClass("step-controls")&&(c.prop(a,"value",f[b].numberToString(g(a,c(d).hasClass("step-up")?1:-1,{type:b}))),c(a).unbind("blur.stepeventshim"),k(a,"input"),e.activeElement)){if(e.activeElement!==
a)try{a.focus()}catch(i){}setTimeout(function(){if(e.activeElement!==a)try{a.focus()}catch(b){}c(a).one("blur.stepeventshim",function(){k(a,"change")})},0)}};if(a.stepArrows){var h={set:function(){var a=d.data(this,"step-controls");if(a)a[this.disabled||this.readonly?"addClass":"removeClass"]("disabled-step-control")}};d.onNodeNamesPropertyModify("input","disabled",h);d.onNodeNamesPropertyModify("input","readonly",c.extend({},h))}var m={38:1,40:-1};d.addReady(function(e,h){a.stepArrows&&c("input",
e).add(h.filter("input")).each(function(){var e=c.prop(this,"type");if(f[e]&&f[e].asNumber&&a.stepArrows&&!(!0!==a.stepArrows&&!a.stepArrows[e]||b(e)||c(h).hasClass("has-step-controls"))){var h=this,l=c('<span class="step-controls" unselectable="on"><span class="step-up" /><span class="step-down" /></span>').insertAfter(h).bind("selectstart dragstart",function(){return!1}).bind("mousedown mousepress",function(a){i(h,e,a.target);return!1}).bind("mousepressstart mousepressend",function(a){c(a.target)["mousepressstart"==
a.type?"addClass":"removeClass"]("mousepress-ui")}),p=function(a,b){if(!h.disabled&&!h.readOnly)return c.prop(h,"value",f[e].numberToString(g(h,b,{type:e}))),k(h,"input"),!1},o=c(h).addClass("has-step-controls").attr({readonly:h.readOnly,disabled:h.disabled,autocomplete:"off",role:"spinbutton"}).bind(c.browser.msie?"keydown":"keypress",function(a){if(!h.disabled&&!h.readOnly&&m[a.keyCode])return c.prop(h,"value",f[e].numberToString(g(h,m[a.keyCode],{type:e}))),k(h,"input"),!1});c.fn.mwheelIntent?
o.add(l).bind("mwheelIntent",p):o.bind("focus",function(){o.add(l).unbind(".mwhellwebshims").bind("mousewheel.mwhellwebshims",p)}).bind("blur",function(){c(h).add(l).unbind(".mwhellwebshims")});d.data(h,"step-controls",l);a.calculateWidth&&(q(o,l),l.css("marginTop",(o.outerHeight()-l.outerHeight())/2))}})})}})();d.addReady(function(a,b){c(e).bind("jquery-uiReady.initinputui input-widgetsReady.initinputui",function(){(c.datepicker||c.fn.slider)&&f(a,b);c.datepicker&&c.fn.slider?c(e).unbind(".initinputui"):
d.modules["input-widgets"].src||d.warn('jQuery UI Widget factory is already included, but not datepicker or slider. configure src of $.webshims.modules["input-widgets"].src')})})});