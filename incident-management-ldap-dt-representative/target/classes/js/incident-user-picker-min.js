(function(b){JIRA.bind(JIRA.Events.NEW_CONTENT_ADDED,function(d,c){setTimeout(function(){a()},50)});function a(){var e=AJS.$("#create-issue-dialog h2");var c=AJS.$(".aui-page-header-main h1");var h=AJS.$(".jira-dialog-heading h2");var d=AJS.$("#content>header h1");var f=AJS.$("#issuetype-field").val();if(!f){f=AJS.$("#issue-create-issue-type").text()}f=AJS.$.trim(f);AJS.log("Issue Type found after timeout is "+f);var g;console.log("-------- createIssueDialog ---------"+AJS.$(e).text());console.log("-------- createIssueDialogAdmin ---------"+AJS.$(c).text());console.log("-------- createJiraIssueDialog ---------"+AJS.$(h).text());console.log("-------- createIssueAddOnDialog ---------"+AJS.$(d).text());if(AJS.$(e).text()=="Create Issue"||AJS.$(h).text()=="Create Issue"){AJS.log("Going ahead to find issue type");if(f=="Incident"){AJS.log("Detected that the issue type is incident, trying to get dt rep name");AJS.$("#tab-1").find("label").each(function(){if(AJS.$(this).text()=="DT Representative Name"){g=AJS.$(this).attr("for")}})}}if(AJS.$(c).text()=="Create Issue"||AJS.$(d).text()=="Create Issue"){if(f=="Incident"){AJS.$("#tab2").find("label").each(function(){if(AJS.$(this).text()=="DT Representative Name"){g=AJS.$(this).attr("for")}})}}console.log("-------- dt_rpt_name ---------"+g);AJS.$("#"+g).on("change",function(){var i=AJS.$("input[type=text]#"+g).val();AJS.$.ajax({url:"/rest/incidentmgmtdt/1.0/incident-ldap/readUserDetails",type:"GET",contentType:"application/json",data:{userName:i},success:function(j){AJS.$.each(j,function(k,l){AJS.$("#"+k).val(l)})}})})}})(AJS.$);