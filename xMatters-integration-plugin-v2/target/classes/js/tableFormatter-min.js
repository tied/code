var TableRowAppender={showTableRows:function(a){AJS.log("Parsing the response and converting them to table rows");AJS.$.each(a,function(b,d){var c=AJS.$("<tr></tr>");AJS.$.each(d,function(f,e){AJS.$("<td>"+e+"</td>").appendTo(c)});AJS.$('<td><a href="#" class="deleteMapping" title="Remove this row"> Delete </a></td>').appendTo(c);c.appendTo("#mappingstable tbody")});AJS.log("All mappings loaded")},isXMattersFieldAlreadyMapped:function(b){var a=false;AJS.$("#mappingstable tbody tr td:nth-child(2)").each(function(){if(AJS.$(this).text()===b){a=true}});return a},showAllXMattersEvents:function(a){AJS.log("Parsing the response and converting them to table rows");AJS.$.each(a,function(b,d){var c=AJS.$("<tr></tr>");AJS.$.each(d,function(f,e){AJS.$("<td>"+e+"</td>").appendTo(c)});AJS.$('<td><a href="#" class="deleteEvent" title="Remove this row"> Delete </a></td>').appendTo(c);c.appendTo("#eventstable tbody")});AJS.log("All xMatters events loaded")},isXMattersEventConfigAlreadyPresent:function(a){var b=false;AJS.$("#eventstable tbody tr td:nth-child(1)").each(function(){if(AJS.$(this).text()===a){b=true}});return b},isHipChatConfigAlreadyPresent:function(b){var a=false;AJS.$("#hipchatconfigtable tbody tr td:nth-child(1)").each(function(){if(AJS.$(this).text()===b){a=true}});return a},showAllHipChatConfigs:function(a){AJS.log("Parsing the response and converting them to table rows");AJS.$.each(a,function(b,d){var c=AJS.$("<tr></tr>");AJS.$.each(d,function(f,e){AJS.$("<td>"+e+"</td>").appendTo(c)});AJS.$('<td><a href="#" class="deleteHCConfig" title="Remove this row"> Delete </a></td>').appendTo(c);c.appendTo("#hipchatconfigtable tbody")});AJS.log("All Hipchat configs loaded")}};