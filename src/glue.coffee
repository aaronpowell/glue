isString = (obj) ->
  obj.constructor == String

isjQuery = (obj) ->
  obj.constructor == jQuery
  
createTemplate = (tmpl) ->
  tmpl = tmpl.html() if isjQuery tmpl
  div = document.createElement 'div'
  div.innerHTML = tmpl
  jQuery div
  
glue = (template, data) ->
  return data if !data || !data.length
  data.reverse()
  res = []
  tmpl = createTemplate template
  while data.length
    curr = data.pop()
    for own key, value of curr
      field = tmpl.find('[data-glue-' + key.toLowerCase() + ']').get 0
      if field
        field = field.cloneNode true
        field.textContent = value
        res.push field
	
  res
  
jQuery.fn.extend 
  glue: (data) ->
    jQuery glue this, data
	
this.glue = glue