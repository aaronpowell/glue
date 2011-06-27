isString = (obj) ->
  obj.constructor == String

isjQuery = (obj) ->
  obj.constructor == jQuery
  
glue = (template, data) ->
  return data if !data || !data.length
  data.reverse()
  res = []
  tmpl = $(template) if isString template
  tmpl = $('<div></div>').html template.html() if isjQuery template
  while data.length
    curr = data.pop()
    for own key, value of curr
      field = tmpl.find('[data-glue-' + key.toLowerCase() + ']').get 0
      if field
        field = field.cloneNode true
        field.textContent = value
        res.push field
	
  jQuery res
  
jQuery.fn.extend 
  glue: (data) ->
    glue this, data
	
this.glue = glue