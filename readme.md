# Glue!

Glue is a micro templating library which uses the HTML5 data attributes to make HTML from your template.

Here's how you create a Glue template:

    <script type="text/x-glue" id="glue">
	  <h1 data-glue-name></h1>
    </script>
	
	<script>
	  $('#glue').glue([ { name: 'Glue tastes good' } ]).appendTo($('#body'));
    </script>
	
Glue also allows you to set attributes rather than the innerHTML of an element:

    <script type="text/x-glue" id="glue">
	  <h1 data-glue-name='title'>Psst, check out the title</h1>
    </script>
	
	<script>
	  $('#glue').glue([ { name: 'Glue tastes good' } ]).appendTo($('#body'));
    </script>

	
# Why Glue?

I don't like templating libraries which require their own syntax like `${SomeProperty}`, and I don't see why you should hijack an existing property like `class` to specify your template operation. Instead Glue will take `data-glue-*` and map that into your objects property.