AJS.$(function(){PISDtoRelMapper.getAllMappings();function a(){AJS.$.ajax({url:"/rest/createjiraticket/1.0/pisdtoreladminconfig",type:"PUT",contentType:"application/json",data:'{"pisdtorelticketuid": "'+AJS.$("#pisdtorelticketuid").attr("value")+'", "pisdtorelticketpwd": "'+AJS.$("#pisdtorelticketpwd").attr("value")+'","pisdToRelticketApplicationName": "'+AJS.$("#pisdToRelticketApplicationName option:selected").text()+'","pisdToRelticketApplicationUrl": "'+AJS.$("#pisdToRelticketApplicationName option:selected").attr("displayUrl")+'"}',processData:false})}AJS.$("#pisdtorelticketadmin2").submit(function(b){b.preventDefault();a();JIRA.Messages.showSuccessMsg("Plugin Configuration Saved Successfully!")});AJS.$("#pisdtorel-mapping-button").click(function(){AJS.log("Mapping dialog pops up");AJS.dialog2("#pisdtoreltktmapping-dialog").show();populateProjectsFromTargetJIRAInstance();AJS.$(".error").html("");AJS.$("#serviceDeskProject > option:eq(0)").prop("selected",true);AJS.$("#otherJIRAInstProject > option:eq(0)").prop("selected",true);AJS.$("#otherJIRAInstProjectIssueType > option:eq(0)").prop("selected",true);AJS.log("Mapping dialog ready to accept form inputs")});AJS.$("#pisdtorelmapping-dialog-cancel-link").click(function(b){b.preventDefault();AJS.dialog2("#pisdtoreltktmapping-dialog").hide();AJS.log("Mapping dialog hides")});AJS.$("#pisdtorelmapping-dialog-add-button").click(function(){if(serviceDeskProjectNotEmpty()){PISDtoRelMapper.addMapping();AJS.dialog2("#pisdtoreltktmapping-dialog").hide()}});AJS.$(".deleteProjMapping").live("click",function(){var b=[];AJS.$(this).closest("tr").find("td").each(function(){b.push(AJS.$(this).text())});AJS.log("Delete Mapping dialog pops up");AJS.dialog2("#pisdtoreltktdelete-mapping-dialog").show();AJS.$("#serviceDeskProjectNameconf").text(b[0]);AJS.$("#serviceDeskProjectKeyconf").text(b[1]);AJS.$("#otherJIRAInstProjectNameconf").text(b[2]);AJS.$("#otherJIRAInstProjectKeyconf").text(b[3]);AJS.$("#otherJIRAInstProjectKeyIssueTypeconf").text(b[4])});AJS.$("#pisdtorelmapping-dialog-delete-cancel-link").click(function(b){b.preventDefault();AJS.dialog2("#pisdtoreltktdelete-mapping-dialog").hide();AJS.log("Delete Mapping dialog hides")});AJS.$("#pisdtorelmapping-dialog-delete-button").click(function(){PISDtoRelMapper.removeMapping(AJS.$("#serviceDeskProjectNameconf").text(),AJS.$("#serviceDeskProjectKeyconf").text(),AJS.$("#otherJIRAInstProjectNameconf").text(),AJS.$("#otherJIRAInstProjectKeyconf").text(),AJS.$("#otherJIRAInstProjectKeyIssueTypeconf").text());AJS.dialog2("#pisdtoreltktdelete-mapping-dialog").hide()});AJS.$("#otherJIRAInstProject").change(function(){var b=AJS.$("#otherJIRAInstProject option:selected").val();populateIssueTypeBasedOnJIRAReleaseProject(b)})});function populateProjectsFromTargetJIRAInstance(){AJS.$.ajax({url:AJS.params.baseURL+"/rest/createjiraticket/1.0/getJIRAProjectsFromTarget",type:"GET",contentType:"application/json",async:false,success:function(f){var a=AJS.$("#otherJIRAInstProject");AJS.$("option",a).not(":eq(0)").remove();for(var c=0;c<f.length;c++){var b=f[c].projectName;var e=f[c].projectKey;var d=AJS.$("<option/>").attr("value",e).text(b);a.append(d)}}})}function serviceDeskProjectNotEmpty(){var a=true;var b=AJS.$("#serviceDeskProject option:selected").text();var d=AJS.$("#otherJIRAInstProject option:selected").text();var c=AJS.$("#otherJIRAInstProjectIssueType option:selected").text();console.log("Validating Service Desk Project selected : "+b);if(b==="Select"){AJS.$("#sdProjError").html("Please select a Service Desk Project");a=false}if(d!=="Select"&&c==="Select"){AJS.$("#sdProjIssueTypeError").html("Please select the JIRA Release Project Issue Type");a=false}return a}function populateIssueTypeBasedOnJIRAReleaseProject(a){jQuery.ajax({url:"/rest/createjiraticket/1.0/getIssueTypes",type:"GET",contentType:"application/json",data:{projectkey:a},success:function(g){var b=AJS.$("#otherJIRAInstProjectIssueType");b.empty();var h=AJS.$("<option/>").attr("value","").text("Select");b.append(h);for(var d=0;d<g.length;d++){var c=g[d].label;var f=g[d].value;var e=jQuery("<option/>").attr("value",f).text(c);b.append(e)}}})};