## Reflection

1.  Challenges faced during the project.
   
Most of the challenge I faced during the project was repeatedly rewriting code to be less dynamic and include less features as I ran short of time.  Some bits of code expanded, others shrank, everything was in flux.  As it is, I did a lot of things with needlessly dynamic code, though I expect I'll revisit the project to make it a personal reference work.

2.  How you approached solving those challenges.

Mostly I solved challenges through methodical tracking down of issues using console.log and thinking through control flow.  It bears mentioning this isn't great when time is quite limited, and may be avoided by having very clear ideas of what specifically will be built before starting writing any code.  Also bears mentioning it all worked out in the end.
  
3.  What you would improve if given more time.

CSS styling, and control flow, addition of fields per task, customization of dropdowns.  A lot of the structure's already in there to support a lot of that.

Control flow's a little odd.  If I filter a list for multiple categories, then it makes sense I want to view all items that are in one of those categories.  If I filter a list for multiple categories and multiple statuses, though, do I want items that are in one of those categories *or* one of those statuses?  Or do I want items that are in one of those categories *and* one of those statuses?  How do I even represent that in filter terms, where the user doesn't have to reference logic tables and can enter filter commands with ease?  Had I some more time, I think I'd look at how spreadsheets use filters some more, see how they handle it.

Probably have to make a standalone field to hold / edit filter queries too, come to think on it.  Especially if I allow users to add custom fields to tasks.

## Resources

https://www.w3schools.com/jsref/jsref_includes.asp
https://developer.mozilla.org/en-US/docs/Web/API/Element/replaceChildren
https://stackoverflow.com/questions/3955229/remove-all-child-elements-of-a-dom-node-in-javascript
https://www.reddit.com/r/webdev/comments/10d88cg/is_it_a_security_to_risk_to_use_innerhtml_to/
https://medium.com/@sparklewebhelp/understanding-the-risks-of-using-inner-html-in-web-development-30d4fa67f815
https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement
https://developer.mozilla.org/en-US/docs/Web/CSS/:nth-child
https://www.w3schools.com/howto/howto_css_bullet_color.asp
https://stackoverflow.com/questions/27484427/add-border-to-left-of-numbered-bullet-and-indent-text
https://www.w3schools.com/html/html_tables.asp
https://www.w3schools.com/jsref/event_onload.asp
https://stackoverflow.com/questions/3842614/how-do-i-call-a-javascript-function-on-page-load
https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll
https://www.w3schools.com/js/js_switch.asp
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Property_accessors
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
https://www.w3schools.com/js/js_sets.asp
https://www.geeksforgeeks.org/javascript/how-to-convert-set-to-array-in-javascript/
https://www.w3schools.com/tags/att_select_multiple.asp
https://www.w3schools.com/jsref/event_onchange.asp
https://www.w3schools.com/howto/howto_js_dropdown.asp
https://stackoverflow.com/questions/8140862/how-to-select-a-value-in-a-select-dropdown-with-javascript
