(function(){var c=/\blang(?:uage)?-(?!\*)(\w+)\b/i,a=self.Prism={util:{type:function(f){return Object.prototype.toString.call(f).match(/\[object (\w+)\]/)[1]},clone:function(h){var j=a.util.type(h);switch(j){case"Object":var g={};for(var f in h){h.hasOwnProperty(f)&&(g[f]=a.util.clone(h[f]))}return g;case"Array":return h.slice()}return h}},languages:{extend:function(h,j){var g=a.util.clone(a.languages[h]);for(var f in j){g[f]=j[f]}return g},insertBefore:function(l,p,k,h){h=h||a.languages;var j=h[l],m={};for(var g in j){if(j.hasOwnProperty(g)){if(g==p){for(var f in k){k.hasOwnProperty(f)&&(m[f]=k[f])}}m[g]=j[g]}}return h[l]=m},DFS:function(g,h){for(var f in g){h.call(g,f,g[f]);a.util.type(g)==="Object"&&a.languages.DFS(g[f],h)}}},highlightAll:function(j,k){var h=document.querySelectorAll('code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code');for(var f=0,g;g=h[f++];){a.highlightElement(g,j===!0,k)}},highlightElement:function(e,j,q){var g,p,n=e;while(n&&!c.test(n.className)){n=n.parentNode}if(n){g=(n.className.match(c)||[,""])[1];p=a.languages[g]}if(!p){return}e.className=e.className.replace(c,"").replace(/\s+/g," ")+" language-"+g;n=e.parentNode;/pre/i.test(n.nodeName)&&(n.className=n.className.replace(c,"").replace(/\s+/g," ")+" language-"+g);var k=e.textContent;if(!k){return}k=k.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/\u00a0/g," ");var h={element:e,language:g,grammar:p,code:k};a.hooks.run("before-highlight",h);if(j&&self.Worker){var m=new Worker(a.filename);m.onmessage=function(f){h.highlightedCode=d.stringify(JSON.parse(f.data),g);a.hooks.run("before-insert",h);h.element.innerHTML=h.highlightedCode;q&&q.call(h.element);a.hooks.run("after-highlight",h)};m.postMessage(JSON.stringify({language:h.language,code:h.code}))}else{h.highlightedCode=a.highlight(h.code,h.grammar,h.language);a.hooks.run("before-insert",h);h.element.innerHTML=h.highlightedCode;q&&q.call(e);a.hooks.run("after-highlight",h)}},highlight:function(h,g,f){return d.stringify(a.tokenize(h,g),f)},tokenize:function(L,D,A){var H=a.Token,z=[L],C=D.rest;if(C){for(var t in C){D[t]=C[t]}delete D.rest}L:for(var t in D){if(!D.hasOwnProperty(t)||!D[t]){continue}var P=D[t],K=P.inside,G=!!P.lookbehind,N=0;P=P.pattern||P;for(var I=0;I<z.length;I++){var B=z[I];if(z.length>L.length){break L}if(B instanceof H){continue}P.lastIndex=0;var M=P.exec(B);if(M){G&&(N=M[1].length);var q=M.index-1+N,M=M[0].slice(N),F=M.length,J=q+F,j=B.slice(0,q+1),O=B.slice(J+1),k=[I,1];j&&k.push(j);var x=new H(t,K?a.tokenize(M,K):M);k.push(x);O&&k.push(O);Array.prototype.splice.apply(z,k)}}}return z},hooks:{all:{},add:function(g,h){var f=a.hooks.all;f[g]=f[g]||[];f[g].push(h)},run:function(j,k){var h=a.hooks.all[j];if(!h||!h.length){return}for(var f=0,g;g=h[f++];){g(k)}}}},d=a.Token=function(g,f){this.type=g;this.content=f};d.stringify=function(k,j,g){if(typeof k=="string"){return k}if(Object.prototype.toString.call(k)=="[object Array]"){return k.map(function(e){return d.stringify(e,j,k)}).join("")}var h={type:k.type,content:d.stringify(k.content,j,g),tag:"span",classes:["token",k.type],attributes:{},language:j,parent:g};h.type=="comment"&&(h.attributes.spellcheck="true");a.hooks.run("wrap",h);var l="";for(var f in h.attributes){l+=f+'="'+(h.attributes[f]||"")+'"'}return"<"+h.tag+' class="'+h.classes.join(" ")+'" '+l+">"+h.content+"</"+h.tag+">"};if(!self.document){self.addEventListener("message",function(h){var j=JSON.parse(h.data),g=j.language,f=j.code;self.postMessage(JSON.stringify(a.tokenize(f,a.languages[g])));self.close()},!1);return}var b=document.getElementsByTagName("script");b=b[b.length-1];if(b){a.filename=b.src;document.addEventListener&&!b.hasAttribute("data-manual")&&document.addEventListener("DOMContentLoaded",a.highlightAll)}})();Prism.languages.markup={comment:/&lt;!--[\w\W]*?-->/g,prolog:/&lt;\?.+?\?>/,doctype:/&lt;!DOCTYPE.+?>/,cdata:/&lt;!\[CDATA\[[\w\W]*?]]>/i,tag:{pattern:/&lt;\/?[\w:-]+\s*(?:\s+[\w:-]+(?:=(?:("|')(\\?[\w\W])*?\1|\w+))?\s*)*\/?>/gi,inside:{tag:{pattern:/^&lt;\/?[\w:-]+/i,inside:{punctuation:/^&lt;\/?/,namespace:/^[\w-]+?:/}},"attr-value":{pattern:/=(?:('|")[\w\W]*?(\1)|[^\s>]+)/gi,inside:{punctuation:/=|>|"/g}},punctuation:/\/?>/g,"attr-name":{pattern:/[\w:-]+/g,inside:{namespace:/^[\w-]+?:/}}}},entity:/&amp;#?[\da-z]{1,8};/gi};Prism.hooks.add("wrap",function(a){a.type==="entity"&&(a.attributes.title=a.content.replace(/&amp;/,"&"))});Prism.languages.css={comment:/\/\*[\w\W]*?\*\//g,atrule:{pattern:/@[\w-]+?.*?(;|(?=\s*{))/gi,inside:{punctuation:/[;:]/g}},url:/url\((["']?).*?\1\)/gi,selector:/[^\{\}\s][^\{\};]*(?=\s*\{)/g,property:/(\b|\B)[\w-]+(?=\s*:)/ig,string:/("|')(\\?.)*?\1/g,important:/\B!important\b/gi,ignore:/&(lt|gt|amp);/gi,punctuation:/[\{\};:]/g};Prism.languages.markup&&Prism.languages.insertBefore("markup","tag",{style:{pattern:/(&lt;|<)style[\w\W]*?(>|&gt;)[\w\W]*?(&lt;|<)\/style(>|&gt;)/ig,inside:{tag:{pattern:/(&lt;|<)style[\w\W]*?(>|&gt;)|(&lt;|<)\/style(>|&gt;)/ig,inside:Prism.languages.markup.tag.inside},rest:Prism.languages.css}}});Prism.languages.clike={comment:{pattern:/(^|[^\\])(\/\*[\w\W]*?\*\/|(^|[^:])\/\/.*?(\r?\n|$))/g,lookbehind:!0},string:/("|')(\\?.)*?\1/g,"class-name":{pattern:/((?:(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[a-z0-9_\.\\]+/ig,lookbehind:!0,inside:{punctuation:/(\.|\\)/}},keyword:/\b(if|else|while|do|for|return|in|instanceof|function|new|try|catch|finally|null|break|continue)\b/g,"boolean":/\b(true|false)\b/g,"function":{pattern:/[a-z0-9_]+\(/ig,inside:{punctuation:/\(/}},number:/\b-?(0x[\dA-Fa-f]+|\d*\.?\d+([Ee]-?\d+)?)\b/g,operator:/[-+]{1,2}|!|&lt;=?|>=?|={1,3}|(&amp;){1,2}|\|?\||\?|\*|\/|\~|\^|\%/g,ignore:/&(lt|gt|amp);/gi,punctuation:/[{}[\];(),.:]/g};Prism.languages.javascript=Prism.languages.extend("clike",{keyword:/\b(var|let|if|else|while|do|for|return|in|instanceof|function|new|with|typeof|try|catch|finally|null|break|continue)\b/g,number:/\b-?(0x[\dA-Fa-f]+|\d*\.?\d+([Ee]-?\d+)?|NaN|-?Infinity)\b/g});Prism.languages.insertBefore("javascript","keyword",{regex:{pattern:/(^|[^/])\/(?!\/)(\[.+?]|\\.|[^/\r\n])+\/[gim]{0,3}(?=\s*($|[\r\n,.;})]))/g,lookbehind:!0}});Prism.languages.markup&&Prism.languages.insertBefore("markup","tag",{script:{pattern:/(&lt;|<)script[\w\W]*?(>|&gt;)[\w\W]*?(&lt;|<)\/script(>|&gt;)/ig,inside:{tag:{pattern:/(&lt;|<)script[\w\W]*?(>|&gt;)|(&lt;|<)\/script(>|&gt;)/ig,inside:Prism.languages.markup.tag.inside},rest:Prism.languages.javascript}}});