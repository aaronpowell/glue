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