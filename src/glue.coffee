isString = (obj) ->
  obj.constructor == String

isjQuery = (obj) ->
  obj.constructor == jQuery
  
createTemplate = (tmpl) ->
  tmpl = tmpl.html() if isjQuery tmpl
  div = document.createElement 'div'
  div.innerHTML = tmpl
  jQuery div
  
findDataAttr = (field, key) ->
  dataAttr = ''
  if field.dataset
    dataAttr = field.dataset['glue' + key[0].toUpperCase() + key.split('').splice(1,key.length).join '']
  else
    dataAttr = attr for attr in field.attributes when attr.name == 'data-glue-' + key
  dataAttr.value || dataAttr
  
parse = (field, key, value) ->
  field = field.cloneNode true
  dataAttr = findDataAttr field, key
  if(dataAttr)
    field[dataAttr] = value
  else
    field.textContent = value
  field
  
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
        res.push parse field, key, value
	
  res
  
jQuery.fn.extend 
  glue: (data) ->
    jQuery glue this, data
	
this.glue = glue