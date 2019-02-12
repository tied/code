(function(b){b.jqplot.MekkoAxisRenderer=function(){};b.jqplot.MekkoAxisRenderer.prototype.init=function(f){this.tickMode;this.barLabelRenderer=b.jqplot.AxisLabelRenderer;this.barLabels=this.barLabels||[];this.barLabelOptions={};this.tickOptions=b.extend(true,{showGridline:false},this.tickOptions);this._barLabels=[];b.extend(true,this,f);if(this.name=="yaxis"){this.tickOptions.formatString=this.tickOptions.formatString||"%d%"}var a=this._dataBounds;a.min=0;if(this.name=="yaxis"||this.name=="y2axis"){a.max=100;this.tickMode="even"}else{if(this.name=="xaxis"){this.tickMode=(this.tickMode==null)?"bar":this.tickMode;for(var e=0;e<this._series.length;e++){a.max+=this._series[e]._sumy}}else{if(this.name=="x2axis"){this.tickMode=(this.tickMode==null)?"even":this.tickMode;for(var e=0;e<this._series.length;e++){a.max+=this._series[e]._sumy}}}}};b.jqplot.MekkoAxisRenderer.prototype.draw=function(a,i){if(this.show){this.renderer.createTicks.call(this);var k=0;var p;var l=document.createElement("div");this._elem=b(l);this._elem.addClass("jqplot-axis jqplot-"+this.name);this._elem.css("position","absolute");l=null;if(this.name=="xaxis"||this.name=="x2axis"){this._elem.width(this._plotDimensions.width)}else{this._elem.height(this._plotDimensions.height)}this.labelOptions.axis=this.name;this._label=new this.labelRenderer(this.labelOptions);if(this._label.show){this._elem.append(this._label.draw(a))}var m,n,l;if(this.showTicks){m=this._ticks;for(var o=0;o<m.length;o++){n=m[o];if(n.showLabel&&(!n.isMinorTick||this.showMinorTicks)){this._elem.append(n.draw(a))}}}for(o=0;o<this.barLabels.length;o++){this.barLabelOptions.axis=this.name;this.barLabelOptions.label=this.barLabels[o];this._barLabels.push(new this.barLabelRenderer(this.barLabelOptions));if(this.tickMode!="bar"){this._barLabels[o].show=false}if(this._barLabels[o].show){var l=this._barLabels[o].draw(a,i);l.removeClass("jqplot-"+this.name+"-label");l.addClass("jqplot-"+this.name+"-tick");l.addClass("jqplot-mekko-barLabel");l.appendTo(this._elem);l=null}}}return this._elem};b.jqplot.MekkoAxisRenderer.prototype.reset=function(){this.min=this._min;this.max=this._max;this.tickInterval=this._tickInterval;this.numberTicks=this._numberTicks};b.jqplot.MekkoAxisRenderer.prototype.set=function(){var h=0;var o;var p=0;var i=0;var a=(this._label==null)?false:this._label.show;if(this.show&&this.showTicks){var l=this._ticks;for(var m=0;m<l.length;m++){var n=l[m];if(n.showLabel&&(!n.isMinorTick||this.showMinorTicks)){if(this.name=="xaxis"||this.name=="x2axis"){o=n._elem.outerHeight(true)}else{o=n._elem.outerWidth(true)}if(o>h){h=o}}}if(a){p=this._label._elem.outerWidth(true);i=this._label._elem.outerHeight(true)}if(this.name=="xaxis"){h=h+i;this._elem.css({height:h+"px",left:"0px",bottom:"0px"})}else{if(this.name=="x2axis"){h=h+i;this._elem.css({height:h+"px",left:"0px",top:"0px"})}else{if(this.name=="yaxis"){h=h+p;this._elem.css({width:h+"px",left:"0px",top:"0px"});if(a&&this._label.constructor==b.jqplot.AxisLabelRenderer){this._label._elem.css("width",p+"px")}}else{h=h+p;this._elem.css({width:h+"px",right:"0px",top:"0px"});if(a&&this._label.constructor==b.jqplot.AxisLabelRenderer){this._label._elem.css("width",p+"px")}}}}}};b.jqplot.MekkoAxisRenderer.prototype.createTicks=function(){var a=this._ticks;var t=this.ticks;var G=this.name;var i=this._dataBounds;var J,j;var L,F;var T,U;var P,V,E,H;if(t.length){for(E=0;E<t.length;E++){var S=t[E];var P=new this.tickRenderer(this.tickOptions);if(S.constructor==Array){P.value=S[0];P.label=S[1];if(!this.showTicks){P.showLabel=false;P.showMark=false}else{if(!this.showTickMarks){P.showMark=false}}P.setTick(S[0],this.name);this._ticks.push(P)}else{P.value=S;if(!this.showTicks){P.showLabel=false;P.showMark=false}else{if(!this.showTickMarks){P.showMark=false}}P.setTick(S,this.name);this._ticks.push(P)}}this.numberTicks=t.length;this.min=this._ticks[0].value;this.max=this._ticks[this.numberTicks-1].value;this.tickInterval=(this.max-this.min)/(this.numberTicks-1)}else{if(G=="xaxis"||G=="x2axis"){J=this._plotDimensions.width}else{J=this._plotDimensions.height}if(this.min!=null&&this.max!=null&&this.numberTicks!=null){this.tickInterval=null}L=(this.min!=null)?this.min:i.min;F=(this.max!=null)?this.max:i.max;if(L==F){var Q=0.05;if(L>0){Q=Math.max(Math.log(L)/Math.LN10,0.05)}L-=Q;F+=Q}var O=F-L;var M,K;var C,N,D;var R=[3,5,6,11,21];if(this.name=="yaxis"||this.name=="y2axis"){this.min=0;this.max=100;if(!this.numberTicks){if(this.tickInterval){this.numberTicks=3+Math.ceil(O/this.tickInterval)}else{C=2+Math.ceil((J-(this.tickSpacing-1))/this.tickSpacing);for(E=0;E<R.length;E++){D=C/R[E];if(D==1){this.numberTicks=R[E];break}else{if(D>1){N=D;continue}else{if(D<1){if(Math.abs(N-1)<Math.abs(D-1)){this.numberTicks=R[E-1];break}else{this.numberTicks=R[E];break}}else{if(E==R.length-1){this.numberTicks=R[E]}}}}}this.tickInterval=O/(this.numberTicks-1)}}else{this.tickInterval=O/(this.numberTicks-1)}for(var E=0;E<this.numberTicks;E++){V=this.min+E*this.tickInterval;P=new this.tickRenderer(this.tickOptions);if(!this.showTicks){P.showLabel=false;P.showMark=false}else{if(!this.showTickMarks){P.showMark=false}}P.setTick(V,this.name);this._ticks.push(P)}}else{if(this.tickMode=="bar"){this.min=0;this.numberTicks=this._series.length+1;P=new this.tickRenderer(this.tickOptions);if(!this.showTicks){P.showLabel=false;P.showMark=false}else{if(!this.showTickMarks){P.showMark=false}}P.setTick(0,this.name);this._ticks.push(P);C=0;for(E=1;E<this.numberTicks;E++){C+=this._series[E-1]._sumy;P=new this.tickRenderer(this.tickOptions);if(!this.showTicks){P.showLabel=false;P.showMark=false}else{if(!this.showTickMarks){P.showMark=false}}P.setTick(C,this.name);this._ticks.push(P)}this.max=this.max||C;if(this.max>C){P=new this.tickRenderer(this.tickOptions);if(!this.showTicks){P.showLabel=false;P.showMark=false}else{if(!this.showTickMarks){P.showMark=false}}P.setTick(this.max,this.name);this._ticks.push(P)}}else{if(this.tickMode=="even"){this.min=0;this.max=this.max||i.max;var I=2+Math.ceil((J-(this.tickSpacing-1))/this.tickSpacing);O=this.max-this.min;this.numberTicks=I;this.tickInterval=O/(this.numberTicks-1);for(E=0;E<this.numberTicks;E++){V=this.min+E*this.tickInterval;P=new this.tickRenderer(this.tickOptions);if(!this.showTicks){P.showLabel=false;P.showMark=false}else{if(!this.showTickMarks){P.showMark=false}}P.setTick(V,this.name);this._ticks.push(P)}}}}}};b.jqplot.MekkoAxisRenderer.prototype.pack=function(O,P){var w=this._ticks;var i=this.max;var l=this.min;var J=P.max;var L=P.min;var H=(this._label==null)?false:this._label.show;for(var r in O){this._elem.css(r,O[r])}this._offsets=P;var N=J-L;var M=i-l;this.p2u=function(c){return(c-L)*M/N+l};this.u2p=function(c){return(c-l)*N/M+L};if(this.name=="xaxis"||this.name=="x2axis"){this.series_u2p=function(c){return(c-l)*N/M};this.series_p2u=function(c){return c*M/N+l}}else{this.series_u2p=function(c){return(c-i)*N/M};this.series_p2u=function(c){return c*M/N+i}}if(this.show){if(this.name=="xaxis"||this.name=="x2axis"){for(var h=0;h<w.length;h++){var I=w[h];if(I.show&&I.showLabel){var Q;if(I.constructor==b.jqplot.CanvasAxisTickRenderer&&I.angle){var G=(this.name=="xaxis")?1:-1;switch(I.labelPosition){case"auto":if(G*I.angle<0){Q=-I.getWidth()+I._textRenderer.height*Math.sin(-I._textRenderer.angle)/2}else{Q=-I._textRenderer.height*Math.sin(I._textRenderer.angle)/2}break;case"end":Q=-I.getWidth()+I._textRenderer.height*Math.sin(-I._textRenderer.angle)/2;break;case"start":Q=-I._textRenderer.height*Math.sin(I._textRenderer.angle)/2;break;case"middle":Q=-I.getWidth()/2+I._textRenderer.height*Math.sin(-I._textRenderer.angle)/2;break;default:Q=-I.getWidth()/2+I._textRenderer.height*Math.sin(-I._textRenderer.angle)/2;break}}else{Q=-I.getWidth()/2}var t=this.u2p(I.value)+Q+"px";I._elem.css("left",t);I.pack()}}var K;if(H){K=this._label._elem.outerWidth(true);this._label._elem.css("left",L+N/2-K/2+"px");if(this.name=="xaxis"){this._label._elem.css("bottom","0px")}else{this._label._elem.css("top","0px")}this._label.pack()}var F,p,E;for(var h=0;h<this.barLabels.length;h++){F=this._barLabels[h];if(F.show){K=F.getWidth();p=this._ticks[h].getLeft()+this._ticks[h].getWidth();E=this._ticks[h+1].getLeft();F._elem.css("left",(E+p-K)/2+"px");F._elem.css("top",this._ticks[h]._elem.css("top"));F.pack()}}}else{for(var h=0;h<w.length;h++){var I=w[h];if(I.show&&I.showLabel){var Q;if(I.constructor==b.jqplot.CanvasAxisTickRenderer&&I.angle){var G=(this.name=="yaxis")?1:-1;switch(I.labelPosition){case"auto":case"end":if(G*I.angle<0){Q=-I._textRenderer.height*Math.cos(-I._textRenderer.angle)/2}else{Q=-I.getHeight()+I._textRenderer.height*Math.cos(I._textRenderer.angle)/2}break;case"start":if(I.angle>0){Q=-I._textRenderer.height*Math.cos(-I._textRenderer.angle)/2}else{Q=-I.getHeight()+I._textRenderer.height*Math.cos(I._textRenderer.angle)/2}break;case"middle":Q=-I.getHeight()/2;break;default:Q=-I.getHeight()/2;break}}else{Q=-I.getHeight()/2}var t=this.u2p(I.value)+Q+"px";I._elem.css("top",t);I.pack()}}if(H){var a=this._label._elem.outerHeight(true);this._label._elem.css("top",J-N/2-a/2+"px");if(this.name=="yaxis"){this._label._elem.css("left","0px")}else{this._label._elem.css("right","0px")}this._label.pack()}}}}})(jQuery);