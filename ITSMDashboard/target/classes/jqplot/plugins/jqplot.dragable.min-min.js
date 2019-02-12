(function(k){k.jqplot.Dragable=function(a){this.markerRenderer=new k.jqplot.MarkerRenderer({shadow:false});this.shapeRenderer=new k.jqplot.ShapeRenderer();this.isDragging=false;this.isOver=false;this._ctx;this._elem;this._point;this._gridData;this.color;this.constrainTo="none";k.extend(true,this,a)};function g(){k.jqplot.GenericCanvas.call(this);this.isDragging=false;this.isOver=false;this._neighbor;this._cursors=[]}g.prototype=new k.jqplot.GenericCanvas();g.prototype.constructor=g;k.jqplot.Dragable.parseOptions=function(a,b){var c=b||{};this.plugins.dragable=new k.jqplot.Dragable(c.dragable);this.isDragable=k.jqplot.config.enablePlugins};k.jqplot.Dragable.postPlotDraw=function(){if(this.plugins.dragable&&this.plugins.dragable.highlightCanvas){this.plugins.dragable.highlightCanvas.resetCanvas();this.plugins.dragable.highlightCanvas=null}this.plugins.dragable={previousCursor:"auto",isOver:false};this.plugins.dragable.dragCanvas=new g();this.eventCanvas._elem.before(this.plugins.dragable.dragCanvas.createElement(this._gridPadding,"jqplot-dragable-canvas",this._plotDimensions,this));var a=this.plugins.dragable.dragCanvas.setContext()};k.jqplot.preParseSeriesOptionsHooks.push(k.jqplot.Dragable.parseOptions);k.jqplot.postDrawHooks.push(k.jqplot.Dragable.postPlotDraw);k.jqplot.eventListenerHooks.push(["jqplotMouseMove",j]);k.jqplot.eventListenerHooks.push(["jqplotMouseDown",l]);k.jqplot.eventListenerHooks.push(["jqplotMouseUp",h]);function i(d,b){var a=d.series[b.seriesIndex];var e=a.plugins.dragable;var u=a.markerRenderer;var t=e.markerRenderer;t.style=u.style;t.lineWidth=u.lineWidth+2.5;t.size=u.size+5;if(!e.color){var f=k.jqplot.getColorComponents(u.color);var c=[f[0],f[1],f[2]];var r=(f[3]>=0.6)?f[3]*0.6:f[3]*(2-f[3]);e.color="rgba("+c[0]+","+c[1]+","+c[2]+","+r+")"}t.color=e.color;t.init();var v=(b.pointIndex>0)?b.pointIndex-1:0;var s=b.pointIndex+2;e._gridData=a.gridData.slice(v,s)}function j(d,s,A,F,f){if(f.plugins.dragable.dragCanvas.isDragging){var E=f.plugins.dragable.dragCanvas;var z=E._neighbor;var C=f.series[z.seriesIndex];var x=C.plugins.dragable;var a=C.gridData;var c=(x.constrainTo=="y")?z.gridData[0]:s.x;var e=(x.constrainTo=="x")?z.gridData[1]:s.y;var B=C._xaxis.series_p2u(c);var b=C._yaxis.series_p2u(e);var D=E._ctx;D.clearRect(0,0,D.canvas.width,D.canvas.height);if(z.pointIndex>0){x._gridData[1]=[c,e]}else{x._gridData[0]=[c,e]}f.series[z.seriesIndex].draw(E._ctx,{gridData:x._gridData,shadow:false,preventJqPlotSeriesDrawTrigger:true,color:x.color,markerOptions:{color:x.color,shadow:false},trendline:{show:false}});f.target.trigger("jqplotSeriesPointChange",[z.seriesIndex,z.pointIndex,[B,b],[c,e]])}else{if(F!=null){var y=f.series[F.seriesIndex];if(y.isDragable){var E=f.plugins.dragable.dragCanvas;if(!E.isOver){E._cursors.push(d.target.style.cursor);d.target.style.cursor="pointer"}E.isOver=true}}else{if(F==null){var E=f.plugins.dragable.dragCanvas;if(E.isOver){d.target.style.cursor=E._cursors.pop();E.isOver=false}}}}}function l(e,p,r,d,f){var c=f.plugins.dragable.dragCanvas;c._cursors.push(e.target.style.cursor);if(d!=null){var a=f.series[d.seriesIndex];var q=a.plugins.dragable;if(a.isDragable&&!c.isDragging){c._neighbor=d;c.isDragging=true;i(f,d);q.markerRenderer.draw(a.gridData[d.pointIndex][0],a.gridData[d.pointIndex][1],c._ctx);e.target.style.cursor="move";f.target.trigger("jqplotDragStart",[d.seriesIndex,d.pointIndex,p,r])}}else{var b=c._ctx;b.clearRect(0,0,b.canvas.width,b.canvas.height);c.isDragging=false}}function h(f,u,x,d,t){if(t.plugins.dragable.dragCanvas.isDragging){var c=t.plugins.dragable.dragCanvas;var b=c._ctx;b.clearRect(0,0,b.canvas.width,b.canvas.height);c.isDragging=false;var w=c._neighbor;var a=t.series[w.seriesIndex];var v=a.plugins.dragable;var e=(v.constrainTo=="y")?w.data[0]:x[a.xaxis];var s=(v.constrainTo=="x")?w.data[1]:x[a.yaxis];a.data[w.pointIndex][0]=e;a.data[w.pointIndex][1]=s;t.drawSeries({preventJqPlotSeriesDrawTrigger:true},w.seriesIndex);c._neighbor=null;f.target.style.cursor=c._cursors.pop();t.target.trigger("jqplotDragStop",[u,x])}}})(jQuery);