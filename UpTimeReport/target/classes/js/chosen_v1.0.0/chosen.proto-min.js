(function(){var a,d,e,b={}.hasOwnProperty,c=function(i,g){for(var f in g){if(b.call(g,f)){i[f]=g[f]}}function h(){this.constructor=i}h.prototype=g.prototype;i.prototype=new h();i.__super__=g.prototype;return i};d=(function(){function f(){this.options_index=0;this.parsed=[]}f.prototype.add_node=function(g){if(g.nodeName.toUpperCase()==="OPTGROUP"){return this.add_group(g)}else{return this.add_option(g)}};f.prototype.add_group=function(m){var l,i,k,h,j,g;l=this.parsed.length;this.parsed.push({array_index:l,group:true,label:this.escapeExpression(m.label),children:0,disabled:m.disabled});j=m.childNodes;g=[];for(k=0,h=j.length;k<h;k++){i=j[k];g.push(this.add_option(i,l,m.disabled))}return g};f.prototype.add_option=function(h,i,g){if(h.nodeName.toUpperCase()==="OPTION"){if(h.text!==""){if(i!=null){this.parsed[i].children+=1}this.parsed.push({array_index:this.parsed.length,options_index:this.options_index,value:h.value,text:h.text,html:h.innerHTML,selected:h.selected,disabled:g===true?g:h.disabled,group_array_index:i,classes:h.className,style:h.style.cssText})}else{this.parsed.push({array_index:this.parsed.length,options_index:this.options_index,empty:true})}return this.options_index+=1}};f.prototype.escapeExpression=function(i){var h,g;if((i==null)||i===false){return""}if(!/[\&\<\>\"\'\`]/.test(i)){return i}h={"<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"};g=/&(?!\w+;)|[\<\>\"\'\`]/g;return i.replace(g,function(j){return h[j]||"&amp;"})};return f})();d.select_to_array=function(f){var k,j,i,g,h;j=new d();h=f.childNodes;for(i=0,g=h.length;i<g;i++){k=h[i];j.add_node(k)}return j.parsed};a=(function(){function f(g,h){this.form_field=g;this.options=h!=null?h:{};if(!f.browser_is_supported()){return}this.is_multiple=this.form_field.multiple;this.set_default_text();this.set_default_values();this.setup();this.set_up_html();this.register_observers()}f.prototype.set_default_values=function(){var g=this;this.click_test_action=function(h){return g.test_active_click(h)};this.activate_action=function(h){return g.activate_field(h)};this.active_field=false;this.mouse_on_container=false;this.results_showing=false;this.result_highlighted=null;this.result_single_selected=null;this.allow_single_deselect=(this.options.allow_single_deselect!=null)&&(this.form_field.options[0]!=null)&&this.form_field.options[0].text===""?this.options.allow_single_deselect:false;this.disable_search_threshold=this.options.disable_search_threshold||0;this.disable_search=this.options.disable_search||false;this.enable_split_word_search=this.options.enable_split_word_search!=null?this.options.enable_split_word_search:true;this.group_search=this.options.group_search!=null?this.options.group_search:true;this.search_contains=this.options.search_contains||false;this.single_backstroke_delete=this.options.single_backstroke_delete!=null?this.options.single_backstroke_delete:true;this.max_selected_options=this.options.max_selected_options||Infinity;this.inherit_select_classes=this.options.inherit_select_classes||false;this.display_selected_options=this.options.display_selected_options!=null?this.options.display_selected_options:true;return this.display_disabled_options=this.options.display_disabled_options!=null?this.options.display_disabled_options:true};f.prototype.set_default_text=function(){if(this.form_field.getAttribute("data-placeholder")){this.default_text=this.form_field.getAttribute("data-placeholder")}else{if(this.is_multiple){this.default_text=this.options.placeholder_text_multiple||this.options.placeholder_text||f.default_multiple_text}else{this.default_text=this.options.placeholder_text_single||this.options.placeholder_text||f.default_single_text}}return this.results_none_found=this.form_field.getAttribute("data-no_results_text")||this.options.no_results_text||f.default_no_result_text};f.prototype.mouse_enter=function(){return this.mouse_on_container=true};f.prototype.mouse_leave=function(){return this.mouse_on_container=false};f.prototype.input_focus=function(g){var h=this;if(this.is_multiple){if(!this.active_field){return setTimeout((function(){return h.container_mousedown()}),50)}}else{if(!this.active_field){return this.activate_field()}}};f.prototype.input_blur=function(g){var h=this;if(!this.mouse_on_container){this.active_field=false;return setTimeout((function(){return h.blur_test()}),100)}};f.prototype.results_option_build=function(h){var i,l,k,g,j;i="";j=this.results_data;for(k=0,g=j.length;k<g;k++){l=j[k];if(l.group){i+=this.result_add_group(l)}else{i+=this.result_add_option(l)}if(h!=null?h.first:void 0){if(l.selected&&this.is_multiple){this.choice_build(l)}else{if(l.selected&&!this.is_multiple){this.single_set_selected_text(l.text)}}}}return i};f.prototype.result_add_option=function(i){var g,h;if(!i.search_match){return""}if(!this.include_option_in_results(i)){return""}g=[];if(!i.disabled&&!(i.selected&&this.is_multiple)){g.push("active-result")}if(i.disabled&&!(i.selected&&this.is_multiple)){g.push("disabled-result")}if(i.selected){g.push("result-selected")}if(i.group_array_index!=null){g.push("group-option")}if(i.classes!==""){g.push(i.classes)}h=i.style.cssText!==""?' style="'+i.style+'"':"";return'<li class="'+(g.join(" "))+'"'+h+' data-option-array-index="'+i.array_index+'">'+i.search_text+"</li>"};f.prototype.result_add_group=function(g){if(!(g.search_match||g.group_match)){return""}if(!(g.active_options>0)){return""}return'<li class="group-result">'+g.search_text+"</li>"};f.prototype.results_update_field=function(){this.set_default_text();if(!this.is_multiple){this.results_reset_cleanup()}this.result_clear_highlight();this.result_single_selected=null;this.results_build();if(this.results_showing){return this.winnow_results()}};f.prototype.results_toggle=function(){if(this.results_showing){return this.results_hide()}else{return this.results_show()}};f.prototype.results_search=function(g){if(this.results_showing){return this.winnow_results()}else{return this.results_show()}};f.prototype.winnow_results=function(){var s,l,o,p,k,g,r,m,q,h,i,n,j;this.no_results_clear();k=0;r=this.get_search_text();s=r.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&");p=this.search_contains?"":"^";o=new RegExp(p+s,"i");h=new RegExp(s,"i");j=this.results_data;for(i=0,n=j.length;i<n;i++){l=j[i];l.search_match=false;g=null;if(this.include_option_in_results(l)){if(l.group){l.group_match=false;l.active_options=0}if((l.group_array_index!=null)&&this.results_data[l.group_array_index]){g=this.results_data[l.group_array_index];if(g.active_options===0&&g.search_match){k+=1}g.active_options+=1}if(!(l.group&&!this.group_search)){l.search_text=l.group?l.label:l.html;l.search_match=this.search_string_match(l.search_text,o);if(l.search_match&&!l.group){k+=1}if(l.search_match){if(r.length){m=l.search_text.search(h);q=l.search_text.substr(0,m+r.length)+"</em>"+l.search_text.substr(m+r.length);l.search_text=q.substr(0,m)+"<em>"+q.substr(m)}if(g!=null){g.group_match=true}}else{if((l.group_array_index!=null)&&this.results_data[l.group_array_index].search_match){l.search_match=true}}}}}this.result_clear_highlight();if(k<1&&r.length){this.update_results_content("");return this.no_results(r)}else{this.update_results_content(this.results_option_build());return this.winnow_results_set_highlight()}};f.prototype.search_string_match=function(l,i){var h,k,j,g;if(i.test(l)){return true}else{if(this.enable_split_word_search&&(l.indexOf(" ")>=0||l.indexOf("[")===0)){k=l.replace(/\[|\]/g,"").split(" ");if(k.length){for(j=0,g=k.length;j<g;j++){h=k[j];if(i.test(h)){return true}}}}}};f.prototype.choices_count=function(){var h,j,g,i;if(this.selected_option_count!=null){return this.selected_option_count}this.selected_option_count=0;i=this.form_field.options;for(j=0,g=i.length;j<g;j++){h=i[j];if(h.selected){this.selected_option_count+=1}}return this.selected_option_count};f.prototype.choices_click=function(g){g.preventDefault();if(!(this.results_showing||this.is_disabled)){return this.results_show()}};f.prototype.keyup_checker=function(g){var i,h;i=(h=g.which)!=null?h:g.keyCode;this.search_field_scale();switch(i){case 8:if(this.is_multiple&&this.backstroke_length<1&&this.choices_count()>0){return this.keydown_backstroke()}else{if(!this.pending_backstroke){this.result_clear_highlight();return this.results_search()}}break;case 13:g.preventDefault();if(this.results_showing){return this.result_select(g)}break;case 27:if(this.results_showing){this.results_hide()}return true;case 9:case 38:case 40:case 16:case 91:case 17:break;default:return this.results_search()}};f.prototype.container_width=function(){if(this.options.width!=null){return this.options.width}else{return""+this.form_field.offsetWidth+"px"}};f.prototype.include_option_in_results=function(g){if(this.is_multiple&&(!this.display_selected_options&&g.selected)){return false}if(!this.display_disabled_options&&g.disabled){return false}if(g.empty){return false}return true};f.browser_is_supported=function(){if(window.navigator.appName==="Microsoft Internet Explorer"){return document.documentMode>=8}if(/iP(od|hone)/i.test(window.navigator.userAgent)){return false}if(/Android/i.test(window.navigator.userAgent)){if(/Mobile/i.test(window.navigator.userAgent)){return false}}return true};f.default_multiple_text="Select Some Options";f.default_single_text="Select an Option";f.default_no_result_text="No results match";return f})();this.Chosen=(function(f){c(g,f);function g(){e=g.__super__.constructor.apply(this,arguments);return e}g.prototype.setup=function(){this.current_selectedIndex=this.form_field.selectedIndex;return this.is_rtl=this.form_field.hasClassName("chosen-rtl")};g.prototype.set_default_values=function(){g.__super__.set_default_values.call(this);this.single_temp=new Template('<a class="chosen-single chosen-default" tabindex="-1"><span>#{default}</span><div><b></b></div></a><div class="chosen-drop"><div class="chosen-search"><input type="text" autocomplete="off" /></div><ul class="chosen-results"></ul></div>');this.multi_temp=new Template('<ul class="chosen-choices"><li class="search-field"><input type="text" value="#{default}" class="default" autocomplete="off" style="width:25px;" /></li></ul><div class="chosen-drop"><ul class="chosen-results"></ul></div>');return this.no_results_temp=new Template('<li class="no-results">'+this.results_none_found+' "<span>#{terms}</span>"</li>')};g.prototype.set_up_html=function(){var h,i;h=["chosen-container"];h.push("chosen-container-"+(this.is_multiple?"multi":"single"));if(this.inherit_select_classes&&this.form_field.className){h.push(this.form_field.className)}if(this.is_rtl){h.push("chosen-rtl")}i={"class":h.join(" "),style:"width: "+(this.container_width())+";",title:this.form_field.title};if(this.form_field.id.length){i.id=this.form_field.id.replace(/[^\w]/g,"_")+"_chosen"}this.container=this.is_multiple?new Element("div",i).update(this.multi_temp.evaluate({"default":this.default_text})):new Element("div",i).update(this.single_temp.evaluate({"default":this.default_text}));this.form_field.hide().insert({after:this.container});this.dropdown=this.container.down("div.chosen-drop");this.search_field=this.container.down("input");this.search_results=this.container.down("ul.chosen-results");this.search_field_scale();this.search_no_results=this.container.down("li.no-results");if(this.is_multiple){this.search_choices=this.container.down("ul.chosen-choices");this.search_container=this.container.down("li.search-field")}else{this.search_container=this.container.down("div.chosen-search");this.selected_item=this.container.down(".chosen-single")}this.results_build();this.set_tab_index();this.set_label_behavior();return this.form_field.fire("chosen:ready",{chosen:this})};g.prototype.register_observers=function(){var h=this;this.container.observe("mousedown",function(i){return h.container_mousedown(i)});this.container.observe("mouseup",function(i){return h.container_mouseup(i)});this.container.observe("mouseenter",function(i){return h.mouse_enter(i)});this.container.observe("mouseleave",function(i){return h.mouse_leave(i)});this.search_results.observe("mouseup",function(i){return h.search_results_mouseup(i)});this.search_results.observe("mouseover",function(i){return h.search_results_mouseover(i)});this.search_results.observe("mouseout",function(i){return h.search_results_mouseout(i)});this.search_results.observe("mousewheel",function(i){return h.search_results_mousewheel(i)});this.search_results.observe("DOMMouseScroll",function(i){return h.search_results_mousewheel(i)});this.form_field.observe("chosen:updated",function(i){return h.results_update_field(i)});this.form_field.observe("chosen:activate",function(i){return h.activate_field(i)});this.form_field.observe("chosen:open",function(i){return h.container_mousedown(i)});this.search_field.observe("blur",function(i){return h.input_blur(i)});this.search_field.observe("keyup",function(i){return h.keyup_checker(i)});this.search_field.observe("keydown",function(i){return h.keydown_checker(i)});this.search_field.observe("focus",function(i){return h.input_focus(i)});if(this.is_multiple){return this.search_choices.observe("click",function(i){return h.choices_click(i)})}else{return this.container.observe("click",function(i){return i.preventDefault()})}};g.prototype.destroy=function(){document.stopObserving("click",this.click_test_action);this.form_field.stopObserving();this.container.stopObserving();this.search_results.stopObserving();this.search_field.stopObserving();if(this.form_field_label!=null){this.form_field_label.stopObserving()}if(this.is_multiple){this.search_choices.stopObserving();this.container.select(".search-choice-close").each(function(h){return h.stopObserving()})}else{this.selected_item.stopObserving()}if(this.search_field.tabIndex){this.form_field.tabIndex=this.search_field.tabIndex}this.container.remove();return this.form_field.show()};g.prototype.search_field_disabled=function(){this.is_disabled=this.form_field.disabled;if(this.is_disabled){this.container.addClassName("chosen-disabled");this.search_field.disabled=true;if(!this.is_multiple){this.selected_item.stopObserving("focus",this.activate_action)}return this.close_field()}else{this.container.removeClassName("chosen-disabled");this.search_field.disabled=false;if(!this.is_multiple){return this.selected_item.observe("focus",this.activate_action)}}};g.prototype.container_mousedown=function(h){if(!this.is_disabled){if(h&&h.type==="mousedown"&&!this.results_showing){h.stop()}if(!((h!=null)&&h.target.hasClassName("search-choice-close"))){if(!this.active_field){if(this.is_multiple){this.search_field.clear()}document.observe("click",this.click_test_action);this.results_show()}else{if(!this.is_multiple&&h&&(h.target===this.selected_item||h.target.up("a.chosen-single"))){this.results_toggle()}}return this.activate_field()}}};g.prototype.container_mouseup=function(h){if(h.target.nodeName==="ABBR"&&!this.is_disabled){return this.results_reset(h)}};g.prototype.search_results_mousewheel=function(h){var i;i=-h.wheelDelta||h.detail;if(i!=null){h.preventDefault();if(h.type==="DOMMouseScroll"){i=i*40}return this.search_results.scrollTop=i+this.search_results.scrollTop}};g.prototype.blur_test=function(h){if(!this.active_field&&this.container.hasClassName("chosen-container-active")){return this.close_field()}};g.prototype.close_field=function(){document.stopObserving("click",this.click_test_action);this.active_field=false;this.results_hide();this.container.removeClassName("chosen-container-active");this.clear_backstroke();this.show_search_field_default();return this.search_field_scale()};g.prototype.activate_field=function(){this.container.addClassName("chosen-container-active");this.active_field=true;this.search_field.value=this.search_field.value;return this.search_field.focus()};g.prototype.test_active_click=function(h){if(h.target.up(".chosen-container")===this.container){return this.active_field=true}else{return this.close_field()}};g.prototype.results_build=function(){this.parsing=true;this.selected_option_count=null;this.results_data=d.select_to_array(this.form_field);if(this.is_multiple){this.search_choices.select("li.search-choice").invoke("remove")}else{if(!this.is_multiple){this.single_set_selected_text();if(this.disable_search||this.form_field.options.length<=this.disable_search_threshold){this.search_field.readOnly=true;this.container.addClassName("chosen-container-single-nosearch")}else{this.search_field.readOnly=false;this.container.removeClassName("chosen-container-single-nosearch")}}}this.update_results_content(this.results_option_build({first:true}));this.search_field_disabled();this.show_search_field_default();this.search_field_scale();return this.parsing=false};g.prototype.result_do_highlight=function(i){var m,l,j,k,h;this.result_clear_highlight();this.result_highlight=i;this.result_highlight.addClassName("highlighted");j=parseInt(this.search_results.getStyle("maxHeight"),10);h=this.search_results.scrollTop;k=j+h;l=this.result_highlight.positionedOffset().top;m=l+this.result_highlight.getHeight();if(m>=k){return this.search_results.scrollTop=(m-j)>0?m-j:0}else{if(l<h){return this.search_results.scrollTop=l}}};g.prototype.result_clear_highlight=function(){if(this.result_highlight){this.result_highlight.removeClassName("highlighted")}return this.result_highlight=null};g.prototype.results_show=function(){if(this.is_multiple&&this.max_selected_options<=this.choices_count()){this.form_field.fire("chosen:maxselected",{chosen:this});return false}this.container.addClassName("chosen-with-drop");this.form_field.fire("chosen:showing_dropdown",{chosen:this});this.results_showing=true;this.search_field.focus();this.search_field.value=this.search_field.value;return this.winnow_results()};g.prototype.update_results_content=function(h){return this.search_results.update(h)};g.prototype.results_hide=function(){if(this.results_showing){this.result_clear_highlight();this.container.removeClassName("chosen-with-drop");this.form_field.fire("chosen:hiding_dropdown",{chosen:this})}return this.results_showing=false};g.prototype.set_tab_index=function(i){var h;if(this.form_field.tabIndex){h=this.form_field.tabIndex;this.form_field.tabIndex=-1;return this.search_field.tabIndex=h}};g.prototype.set_label_behavior=function(){var h=this;this.form_field_label=this.form_field.up("label");if(this.form_field_label==null){this.form_field_label=$$("label[for='"+this.form_field.id+"']").first()}if(this.form_field_label!=null){return this.form_field_label.observe("click",function(i){if(h.is_multiple){return h.container_mousedown(i)}else{return h.activate_field()}})}};g.prototype.show_search_field_default=function(){if(this.is_multiple&&this.choices_count()<1&&!this.active_field){this.search_field.value=this.default_text;return this.search_field.addClassName("default")}else{this.search_field.value="";return this.search_field.removeClassName("default")}};g.prototype.search_results_mouseup=function(h){var i;i=h.target.hasClassName("active-result")?h.target:h.target.up(".active-result");if(i){this.result_highlight=i;this.result_select(h);return this.search_field.focus()}};g.prototype.search_results_mouseover=function(h){var i;i=h.target.hasClassName("active-result")?h.target:h.target.up(".active-result");if(i){return this.result_do_highlight(i)}};g.prototype.search_results_mouseout=function(h){if(h.target.hasClassName("active-result")||h.target.up(".active-result")){return this.result_clear_highlight()}};g.prototype.choice_build=function(i){var h,j,k=this;h=new Element("li",{"class":"search-choice"}).update("<span>"+i.html+"</span>");if(i.disabled){h.addClassName("search-choice-disabled")}else{j=new Element("a",{href:"#","class":"search-choice-close",rel:i.array_index});j.observe("click",function(l){return k.choice_destroy_link_click(l)});h.insert(j)}return this.search_container.insert({before:h})};g.prototype.choice_destroy_link_click=function(h){h.preventDefault();h.stopPropagation();if(!this.is_disabled){return this.choice_destroy(h.target)}};g.prototype.choice_destroy=function(h){if(this.result_deselect(h.readAttribute("rel"))){this.show_search_field_default();if(this.is_multiple&&this.choices_count()>0&&this.search_field.value.length<1){this.results_hide()}h.up("li").remove();return this.search_field_scale()}};g.prototype.results_reset=function(){this.form_field.options[0].selected=true;this.selected_option_count=null;this.single_set_selected_text();this.show_search_field_default();this.results_reset_cleanup();if(typeof Event.simulate==="function"){this.form_field.simulate("change")}if(this.active_field){return this.results_hide()}};g.prototype.results_reset_cleanup=function(){var h;this.current_selectedIndex=this.form_field.selectedIndex;h=this.selected_item.down("abbr");if(h){return h.remove()}};g.prototype.result_select=function(i){var k,j,h;if(this.result_highlight){k=this.result_highlight;this.result_clear_highlight();if(this.is_multiple&&this.max_selected_options<=this.choices_count()){this.form_field.fire("chosen:maxselected",{chosen:this});return false}if(this.is_multiple){k.removeClassName("active-result")}else{if(this.result_single_selected){this.result_single_selected.removeClassName("result-selected");h=this.result_single_selected.getAttribute("data-option-array-index");this.results_data[h].selected=false}this.result_single_selected=k}k.addClassName("result-selected");j=this.results_data[k.getAttribute("data-option-array-index")];j.selected=true;this.form_field.options[j.options_index].selected=true;this.selected_option_count=null;if(this.is_multiple){this.choice_build(j)}else{this.single_set_selected_text(j.text)}if(!((i.metaKey||i.ctrlKey)&&this.is_multiple)){this.results_hide()}this.search_field.value="";if(typeof Event.simulate==="function"&&(this.is_multiple||this.form_field.selectedIndex!==this.current_selectedIndex)){this.form_field.simulate("change")}this.current_selectedIndex=this.form_field.selectedIndex;return this.search_field_scale()}};g.prototype.single_set_selected_text=function(h){if(h==null){h=this.default_text}if(h===this.default_text){this.selected_item.addClassName("chosen-default")}else{this.single_deselect_control_build();this.selected_item.removeClassName("chosen-default")}return this.selected_item.down("span").update(h)};g.prototype.result_deselect=function(i){var h;h=this.results_data[i];if(!this.form_field.options[h.options_index].disabled){h.selected=false;this.form_field.options[h.options_index].selected=false;this.selected_option_count=null;this.result_clear_highlight();if(this.results_showing){this.winnow_results()}if(typeof Event.simulate==="function"){this.form_field.simulate("change")}this.search_field_scale();return true}else{return false}};g.prototype.single_deselect_control_build=function(){if(!this.allow_single_deselect){return}if(!this.selected_item.down("abbr")){this.selected_item.down("span").insert({after:'<abbr class="search-choice-close"></abbr>'})}return this.selected_item.addClassName("chosen-single-with-deselect")};g.prototype.get_search_text=function(){if(this.search_field.value===this.default_text){return""}else{return this.search_field.value.strip().escapeHTML()}};g.prototype.winnow_results_set_highlight=function(){var h;if(!this.is_multiple){h=this.search_results.down(".result-selected.active-result")}if(h==null){h=this.search_results.down(".active-result")}if(h!=null){return this.result_do_highlight(h)}};g.prototype.no_results=function(h){return this.search_results.insert(this.no_results_temp.evaluate({terms:h}))};g.prototype.no_results_clear=function(){var i,h;i=null;h=[];while(i=this.search_results.down(".no-results")){h.push(i.remove())}return h};g.prototype.keydown_arrow=function(){var h;if(this.results_showing&&this.result_highlight){h=this.result_highlight.next(".active-result");if(h){return this.result_do_highlight(h)}}else{return this.results_show()}};g.prototype.keyup_arrow=function(){var i,h,j;if(!this.results_showing&&!this.is_multiple){return this.results_show()}else{if(this.result_highlight){j=this.result_highlight.previousSiblings();i=this.search_results.select("li.active-result");h=j.intersect(i);if(h.length){return this.result_do_highlight(h.first())}else{if(this.choices_count()>0){this.results_hide()}return this.result_clear_highlight()}}}};g.prototype.keydown_backstroke=function(){var h;if(this.pending_backstroke){this.choice_destroy(this.pending_backstroke.down("a"));return this.clear_backstroke()}else{h=this.search_container.siblings().last();if(h&&h.hasClassName("search-choice")&&!h.hasClassName("search-choice-disabled")){this.pending_backstroke=h;if(this.pending_backstroke){this.pending_backstroke.addClassName("search-choice-focus")}if(this.single_backstroke_delete){return this.keydown_backstroke()}else{return this.pending_backstroke.addClassName("search-choice-focus")}}}};g.prototype.clear_backstroke=function(){if(this.pending_backstroke){this.pending_backstroke.removeClassName("search-choice-focus")}return this.pending_backstroke=null};g.prototype.keydown_checker=function(i){var j,h;j=(h=i.which)!=null?h:i.keyCode;this.search_field_scale();if(j!==8&&this.pending_backstroke){this.clear_backstroke()}switch(j){case 8:this.backstroke_length=this.search_field.value.length;break;case 9:if(this.results_showing&&!this.is_multiple){this.result_select(i)}this.mouse_on_container=false;break;case 13:i.preventDefault();break;case 38:i.preventDefault();this.keyup_arrow();break;case 40:i.preventDefault();this.keydown_arrow();break}};g.prototype.search_field_scale=function(){var i,m,l,j,p,q,o,k,n;if(this.is_multiple){l=0;o=0;p="position:absolute; left: -1000px; top: -1000px; display:none;";q=["font-size","font-style","font-weight","font-family","line-height","text-transform","letter-spacing"];for(k=0,n=q.length;k<n;k++){j=q[k];p+=j+":"+this.search_field.getStyle(j)+";"}i=new Element("div",{style:p}).update(this.search_field.value.escapeHTML());document.body.appendChild(i);o=Element.measure(i,"width")+25;i.remove();m=this.container.getWidth();if(o>m-10){o=m-10}return this.search_field.setStyle({width:o+"px"})}};return g})(a)}).call(this);