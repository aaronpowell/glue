test('glue returns compiled template', function() {
    var foo = $('#simpleTemplate')
				.glue([ { foo: 'bar' } ]);
	
	ok(foo);
});

test('no data returns nothing', function() {
	var res = $('#simpleTemplate')
				.glue([]);
	ok(!res.length);
});

test('inplace template will parse out', function() {
	var tmpl = '<span data-glue-foo></span>',
		res = glue(tmpl, [ { foo: 'bar' } ]);
		;
	
	ok(res.length);
	ok(res.length === 1);
});