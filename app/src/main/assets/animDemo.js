var AnimDemo=new function(){var k=0,g=0,i=0,b=0,e="",h=0,c=1000,j=8000,d=4000;function a(m){var l=k;setTimeout(function(){f(l)},m)}function f(s){if(!h||s!=k){return}if(!i){if(!g){g=g_demoList}var m=Math.floor(Math.random()*g.length);i=g[m];b=-1;var p=$("#anim-demo").empty().show();if(p.length==0){return alert("Empty #anim-demo")}if(i.name){var o=i.name[ChemSys.curLang];if(!o){o=i.name.en}p.append("<h3>"+o+"</h3>")}$("<div/>").addClass("formula-text").appendTo(p);$("<div/>").addClass("echem-formula").appendTo(p);return a(c)}b++;if(b>=i.fr.length){i=null;$("#anim-demo .formula-text").text(e);function v(){var w=k;setTimeout(function(){if(w==k){$("#anim-demo").fadeOut(d,function(){f(w)})}},j)}return v()}var n=i.fr[b],l=n.indexOf("?");function q(y,w){if(!y){return""}var x=htmlEscape(y);if(w){x="<"+w+">"+x+"</"+w+">"}return x}var t=q(n);if(l>=0){t=q(n.substring(0,l),"b")+q(e)+q(n.substring(l+1),"b");n=n.substring(0,l)+e+n.substring(l+1)}else{if(n.charAt(0)=="ОІ"){t=q(e.substring(0,e.length-1))+q(n.substring(1),"b")+q(e.substring(e.length-1));n=e.substring(0,e.length-1)+n.substring(1)+e.substring(e.length-1)}else{if(n.charAt(0)=="Оі"){t=q(e.substring(0,e.length-2))+q(n.substring(1),"b")+q(e.substring(e.length-2));n=e.substring(0,e.length-2)+n.substring(1)+e.substring(e.length-2)}}}e=n;var r=ChemSys.compile(n);$("#anim-demo .formula-text").html(t);var u=$("#anim-demo .echem-formula").empty();if(!r.isOk()){u.text(r.getMessage());return}if(!ChemSys.draw(u[0],r)){return}a(c)}this.setList=function(l){k++;g=l;i=0};this.start=function(){if(h){return}h=1;f(k)};this.stop=function(){if(!h){return}h=0};this.getCode=function(){return e}};function animDemo(){if($("#anim-demo").is(":visible")){AnimDemo.start()}}var g_lastDemo=0;function popupDemo(b,c){if(g_lastDemo){g_lastDemo.close();AnimDemo.stop();$("#anim-demo").remove()}var a,e=c.charAt(0),d=c.substring(1).split(e);if(e=="?"){for(a=1;a<d.length;a++){d[a]=e+d[a]}}g_lastDemo=openDlg({tmID:"TmAnimDemoBox",owner:b,justify:"RB",onClose:function(){AnimDemo.stop();g_lastDemo=0}});AnimDemo.setList([{fr:d}]);AnimDemo.start()}var g_demoList=[{name:{ru:"РќР°С„С‚Р°Р»РёРЅ",en:"Naphthalene"},fr:["|","?\\","?/","?/","?`|","?`\\","?\\","?`/","?|","?`/","?`\\\\","?`|","?//","?\\"]},{name:{ru:"РђРґРµРЅРёРЅ",en:"Adenine"},fr:["/","?`|","?N","?H","?2","?; ","?#2","?\\","?\\","?N","?|","?`/","?/","?N","?`\\","?`|","?|","?_q","?N","?_q","?q","?_q","?H","?N","?_q","$itemColor(blue)?"]},{name:{ru:"РђРґРµРЅРѕР·РёРЅС‚СЂРёС„РѕСЃС„Р°С‚",en:"Adenosine triphosphate"},fr:["/","?<`|>","ОІN","ОІH","ОІ2","?\\","?\\","?N","?|","?`/","?/","?N","?`\\","?`|","?|","?_q","?N","?_q","?q","?_q","?N","?_q","?; ","?#-1","?|","?_(x-.6)","ОІ,y.7","ОІ,W+","?<|>","ОІO","ОІH","?_(x-1)","?<|>","ОІH","ОІO","?_(x-.6)","ОІ,y-.7","ОІ,W-","?_(x1.1)","ОІ,y-.5","?O","?_(x1.1)","ОІ,y.5","?; ","?#-2","?`|","?`\\","?O","?`-","?P","?<`||O>","?<|OH>","?`-","?O","?`-","?P","?<`||O>","?<|OH>","?`-","?O","?`-","?P","?<`||O>","?<|OH>","?`-","?H","?O"]},{name:{ru:"РўРµСЃС‚РѕСЃС‚РµСЂРѕРЅ",en:"Testosteron"},fr:["|","?<|>","ОІd","ОІH","?_q","?_q","?_q","?<_(A-65,w+)>","ОІO","ОІH","?_q","?<`|>","ОІw","?`\\","?`/","?|","?<|>","ОІd","ОІH","?\\","?<`|>","ОІw","ОІH","?/","?`/","?0","?|","?`/","?`\\","?`|","?/","?`/","?0","?<`|>","ОІw","?`\\","?`/","?|","?`/","?O","?/","?\\","?/","?/"]},{name:{en:"Thyroxine",ru:"РўРёСЂРѕРєСЃРёРЅ"},fr:["`\\","?`=","?<`\\>","ОІI","?`/","?<`->","ОІH","ОІO","?\\","?\\","?<`/>","ОІI","?-","?/","?/","?-","?O","?/","?`\\","?\\","?<`->","ОІI","?/","?=","?:a","?\\","?`/","?/","?<\\>","ОІI","?`-","$L(.8)?","?; ","?#a","?/","?-","?<\\>","ОІN","ОІH","ОІ2","?<`\\>","ОІd","ОІH","?/","?<`\\>","ОІ\\","ОІO","?-","?O","?H"]},{name:{ru:"ОІ-Р“Р»СЋРєРѕР·Р°",en:"ОІ-D-Glucopyranose"},fr:["C","?H","?2","?O","?H","?|","?-","?O","?_(x.8)","ОІ,y1","?<`|>","ОІO","ОІH","?_(x-.8)","ОІ,y1","ОІ,W+","?<|>","ОІO","ОІH","?_(x-1)","?<`|>","ОІO","ОІH","?_(x-.8)","ОІ,y-1","ОІ,W-","?<|>","ОІH","ОІO","?_#2"]},{name:{ru:"РђР·СѓР»РµРЅ",en:"Azulene"},fr:["`|","?_p","?_p","?p","?_p","?_p","?p","?`|","?0","?_q","?q","?7","?_q","?7","?_q","?q","?7","?_q","?7","?_q","?q","?7","?_q","?7"]},{name:{ru:"Р‘СѓР»СЊРІР°Р»РµРЅ",en:"Bullvalene"},fr:["C","?H","?`/","?H","?C","?|","?|","?H","?C","?|","?H","?C","?:L; ","?#1","?_(A25)","?C","?H","$L(1.5)?","?|","?|","?C","?H","?|","?C","?H","?:R","?_#L; ","?#1","?_(A75)","?C","?H","?|","?|","?C","?H","?|","?C","?H","?<_#R>","?_#L"]},{name:{ru:"РљРѕСЂРѕРЅРµРЅ",en:"Coronene"},fr:["|","?\\","?/","?`/","?|","?\\","?`\\","?`/","?|","?`|","?`\\","?`|","?/","?`/","?`\\","?`|","?|","?/","?\\","?\\","?/","?\\","?\\","?|","?\\","?|","?|","?`/","?|","?`/","?/","?`\\","?`/","?`\\","?\\","?`|","?/","?`/","?`\\","?`|","?|","?/"]},{name:{en:"Solifenacin",ru:"РЎРѕР»РёС„РµРЅР°С†РёРЅ",ja:"г‚ЅгѓЄгѓ•г‚§гѓЉг‚·гѓі"},fr:["_(x-.3)","ОІ,y.7","?`\\","?N","?`/","?_(x.3)","ОІ,y-.7","?/","?<`|>","ОІ_(x-.3,y.7)","ОІ|","?</>","ОІd","ОІH","?\\","?/","?O","?\\","?|","?O","?`|","?/","?N","?\\","?/","?`|","?/","?\\","?\\","?|","?`/","?/","?`\\","?`|","?`\\","?`/","?|","?\\","?0","?|","?d","?\\","?|","?|","?`/","?`\\","?\\","?`|","?/","?/"]},{name:{en:"Dark violet lead rhodizonate",ru:"РЎРёРЅРёР№ РєРѕРјРїР»РµРєСЃ СЂРѕРґРёР·РѕРЅР°С‚Р° СЃРІРёРЅС†Р°"},fr:["O","?H","?`-","?Pb","?`|","?O","?`\\","?`|","?`\\","?`|","?O","?|","?`/","?`\\","?O","?\\","?|","?`/","?O","?/","?\\","?<|>","ОІ|","ОІO","ОІ-","ОІv","ОІ#Pb","?/","?`|","?/","?O","?`|","?Pb","?-","?O","?H"]},{name:{en:"Cubane",ru:"РљСѓР±Р°РЅ",de:"Cuban",zh:"з«‹ж–№зѓ·",ja:"г‚­гѓҐгѓђгѓі",cs:"Kuban",ko:"нЃђлІ мќё"},fr:["-","$L(2)?","?_(x1)","ОІ,y-.5","?`-","?_(x-1)","ОІ,y.5","?|","?-","?<`|>","?_(x1)","ОІ,y-.5","?<`|>","?`-","?<`|>","?_(x-1)","ОІ,y.5"]}];var EqDemo=new function(){this.init=function(){var e=$("#formula-scroller");var n,f,o,d,c,m,i,b,l=[],a=[];for(d in EqList){m=ChemSys.compile(EqList[d]);if(m.isOk()&&m.isLinear()){l.push(b=$("<div/>").addClass("echem-formula").append(m.html()));b.hide().appendTo("body");n=b.width()*1.1+4;f=b.height();b.hide().css({width:n,height:f}).data("text",EqList[d]).click(function(){$(this).css({color:"red","text-shadow":"none"});$("#scroller-form").find("input[name=formula]").val($(this).data("text")).end().submit()})}}for(d in l){c=Math.floor(Math.random()*l.length);m=l[c];l[c]=l[d];l[d]=m}V=20;d=0;function g(){b=l[d++];d%=l.length;b.appendTo(e).show();b.css({left:e.width(),top:(e.height()-b.height())/2});var h=(e.width()+b.width())/V*1000;b.animate({left:-b.width()},h);setTimeout(g,b.width()*1.5/V*1000)}g()}};var EqList=["H3BO3 + 3C2H5OH = (C2H5O)3B + 3H2O",'CaCO3 "1000^oC"--> CaO + CO2"|^"','2{Me}^+ + [SiF6]^2- = {Me}2[SiF6]"|v (Me = K, Rb)"',"2Mn(NO3)2 + 5PbO2 + 6HNO3 = 2HMnO4 + 5Pb(NO3)2 + 2H2O","H2(0) + F2(0) = 2H(+1)F(-1)","2H2S(2-) + 3O2(0) -> 2H2O(2-) + 2S(4+)O2(2-)","(N(3-)H4)2Cr2(6+)O7 -> N2(0) + Cr2(3+)O3 + 4H2O","Mn(+4)O2 + 2KI(-1) + 2H2SO4  ->  I2(0) + K2SO4 + Mn(+2)SO4 + 2H2O","NaOH + NaH2PO4 -> Na2HPO4 + H2O","O2 + 2H2O + 4{e}^в€’ в†’ 4OH^в€’",'2W + 4HNO3 + 10HF -> WF6 + WOF4 + 4NO"|^" + 7H2O','2K2MnF6 + 4SbF5 -> 4KSbF6 + 2MnF3 + F2"|^"',"H2O + Cr2O7^2- <=> 2HCrO4^1- <=> 2H^+ + 2CrO4^2-",'3{Me} + 5HNO3 + 21HF = 3H2[{Me}F7] + 5NO"|^" + 10H2O", Me=(Nb, Ta)"','3PbS"`(s)`" + 8HNO3 -> 3Pb(NO3)2 + 3S"`(s)`" + 2NO"`(g)`" + 8H2O'];