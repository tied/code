define("jira/mail/views/default-reporter-view",["jira/mail/views/text-view","jquery","underscore"],function(b,c,a){return b.extend({initialize:function(){a.bindAll(this,"render");this.model.bind("change",this.render,this);this.container=c(".field-group.reporterusername")},render:function(){b.prototype.render.call(this);var d=this.model.get("createusers");this.container.toggle(!d);return this}})});