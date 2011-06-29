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

test('glue attribute rather than innerHTML', function() {
	var tmpl = '<span data-glue-foo="title">bar</span>',
		res = glue(tmpl, [ { foo: 'baz' } ]);
		
	ok(res.length === 1);
	ok(res[0].title === 'baz');
	ok(res[0].innerHTML === 'bar');
});

test('nested arrays', function() {
  var tmpl = '<span data-glue-foo></span>',
      res = glue(tmpl, [ { 
        foo: [
          { foo: 'bar' },
          { foo: 'baz' }
        ] 
      } ]);
      console.log(res);
  ok(res.length === 2);
  ok(res[0].innerHTML === 'bar');
  ok(res[1].innerHTML === 'baz');
});