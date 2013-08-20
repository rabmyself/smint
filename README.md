SMINT
=====

SMINT is a simple plugin for lovers of one page websites

What exactly does it do again?
Smint is a simple jQuery plugin that helps with the navigation on one page style websites.

It has 2 main elements, a sticky navigation bar that stays at the top of the page while you scroll down and menu buttons that automatically scroll the page to the section you clicked on.


So how do I use it?
Create a 'div' for your menu and give it a class name.

Inside this you put your 'a' tags and give each one an #id. This is your menu wrapper and it should be set to position:absolute

Next, add a class to each of the sections of your one page site. The class names must match the #ids of the 'a' links you created above. So if your first link has an id of #section1 you then add the class .section1 to your first div. Repeat this for each link you have.

Add jQuery to the head section of your page.

Add the jquery.smint.js to the head section of your page.

Call the function with the following script:

$(document).ready( function() {
$('.subMenu').smint();
});

You can replace .subMenu with the class name of your menu

To give you a littl emore flexability, the class.fxd gets added to your menu when it becomes fixed to the top of the screen, allowing some extra styleing to be added if needed.

Options
SMINT is a simple plugin, so only has an option for how fast the page scrolls.

$('.subMenu').smint({
'scrollSpeed' : 1000 
});

The default speed is 500 (half a second) but you can now set that to be whatever you like.
