define("jira/mail/edit-server-details",["jquery"],function(a){return function(){a("select#mailServer").bind("change keyup",function(){var c=a(this).find("option:selected").parent("optgroup");var d=c!=undefined?c.attr("label"):"";var b=a("#folder").parents(".field-group").first();a("div.description",b).text("IMAP"==d?AJS.I18n.getText("admin.service.imap.folder.desc"):AJS.I18n.getText("admin.services.edit.file.service.directory","[jira.home]/import/mail"));b.toggle("POP3"!=d)}).change()}});AJS.namespace("Mail.EditServerDetails",null,require("jira/mail/edit-server-details"));