#Some jQuery Plugins I have developed

###Collapsible Panel
###Focusing Tree View

* [See Demo][1]

##Use Example
```html
<div class="panel_collapsible" title="Library">
	<button style="font-size:8pt;" id="ca">Collapse</button>
	<button style="font-size:8pt;" id="ea">Expand</button>
	<button style="font-size:8pt;" id="st">Save</button>
	<ul id="myTree" class="view_tree" tooltip="PHP Language">
		<li>Node 1</li>
		<li>Node 2</li>
		<li>Branch
			<ul>
				<li>#  Single Line</li>
				<li>// Single Line</li>
				<li>/* Muti Line */</li>
			</ul>
		</li>
		<li>Node 3</li>
		<li expanded="true">
			Comments
			<ul>
				<li>#  Single Line</li>
				<li>// Single Line</li>
				<li>/* Muti Line */
					<ul>
						<li>#  Single Line</li>
						<li>// Single Line</li>
						<li>/* Muti Line */</li>
					</ul>
				</li>
				<li>abc
					<ul>
						<li>#  Single Line</li>
						<li>// Single Line</li>
						<li>/* Muti Line */</li>
					</ul>
				</li>
			</ul>
		</li>
	</ul>
</div>
```

```javascript
$(document).ready(function() {
	$(".panel_collapsible").panel_collapsible();
	$("#myTree").view_tree();
	var myTree = $("#myTree").data('view_tree');
	$("#ca").button().click(function(event){
		event.preventDefault();
		myTree.collapseAll();
	});
	$("#ea").button().click(function(event){
		event.preventDefault();
		myTree.expandAll();
	});
	$("#st").button().click(function(event){
		event.preventDefault();
		console.log(myTree.serialize());
	});
});
```
See Source of Demo Page

  [1]: http://logicsmith.github.io/My-jQuery-Plugins/demo.htm
