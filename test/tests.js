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
  var tmpl = '<div data-glue-bar><span data-glue-foo></span></div>',
      res = glue(tmpl, [ { 
        bar: [
          { foo: 'bar' },
          { foo: 'baz' }
        ] 
      } ]),
      childNodes;

  ok(res.length === 1);
  childNodes = res[0].childNodes;
  ok(childNodes.length === 2);
  ok(childNodes[0].innerHTML === 'bar');
  ok(childNodes[1].innerHTML === 'baz');
});

test('simple array value maps to "value"', function() {
  var tmpl = '<span data-glue-value></span>',
    data = [1,2,3],
    res;
    
  res = glue(tmpl, data);
  
  ok(res.length === 3);
  ok(res[0].innerHTML == 1);
});

test('complex data test', function() {
  var tmpl = '<span data-glue-foo data-glue-bar="title"></span>',
    data = [ { foo: 'foo', bar: 'bar' }],
    res;
    
  res = glue(tmpl, data);
  
  ok(res.length === 1);
  ok(res[0].title === 'bar');
  ok(res[0].innerHTML === 'foo');
});

test('complex template test', function() {
  var tmpl = $('#complexTemplate'),
    data = [],
    dataCount = 5,
    res;
    
  for(var i=0; i < dataCount; i++) {
    data.push( { value: i, text: 'item ' + i } );
  }
  
  res = glue(tmpl, data);
  
  ok(res.length === 1);
  ok(res[0].tagName === 'UL');
  ok(res[0].childNodes === dataCount);
});