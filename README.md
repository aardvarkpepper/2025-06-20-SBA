## Reflection

1.  Challenges faced during the project.

I originally designed the product to be fully dynamic with ability to add new fields for each task, and a more expansive feature set.  However, some time into the project, features were taking longer to implement and debug than I thought, so I changed the design to be less dynamic with less features.  This in turn had me writing code that wasn't particularly well planned, with pieces fitting together in ways different to what I'd originally considered, causing new issues to pop up.  Being in a bit of a rush, I ended up taking more time debugging than should have been necessary.

I expect I'll revisit the project in time.  I'll have to change the original specifications to account for extensive user filter combinations of "and" and "or", and rethink how information may be simply shown (e.g. massive dropdowns if lots of categories), changing categories to accept multiple arguments with inputs separated by commas, generally integrating spreadsheet and email features and trying to design unique characteristics that make the tasklist project distinct to either.  

2.  How you approached solving those challenges.

I regularly tested code - too frequently, perhaps; in retrospect I think it would have been better to take more time thoroughly planning in the beginning, then writing and testing components as a whole, rather than every few lines of components.  When running into emergent issues, I'd use console.log to compare actual to expected to track down issues.
  
3.  What you would improve if given more time.

General redesign of the entire product.  Apart from decreased memory use, what makes this product better to use than a spreadsheet?  Change project away from assignment requirements towards user utility, get some users to give feedback on design and use over some months, suggest features, etc.

Make more dynamic, add ability to add custom fields per task, change customization of dropdowns.  Include standalone field, perhaps, for extended user filtering using "and" and "or" and user-specified number of fields, change "category" to accept multiple comma separated arguments.  All keeping in mind ease of use and simple presentation.

CSS styling, control flow.

Selection of animations for user to customize look.

Import and export data.

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
