camelCaseRegex = /-([a-z])/ig
camelCase = (s) ->
  s.replace camelCaseRegex, (all, x) -> x.toUpperCase()
  
isString = (obj) ->
  obj.constructor == String

isjQuery = (obj) ->
  obj.constructor == jQuery
  
isArray = (obj) ->
  obj.constructor == Array
  
createTemplate = (tmpl) ->
  tmpl = tmpl.html() if isjQuery tmpl
  div = document.createElement 'div'
  div.innerHTML = tmpl
  jQuery div
  
findDataAttr = (field, key) ->
  dataAttr = ''
  if field.dataset
    dataAttr = field.dataset[camelCase 'glue-' + key]
  else
    dataAttr = attr for attr in field.attributes when attr.name == 'data-glue-' + key
  dataAttr.value || dataAttr
  
parse = (field, key, value) ->
  if isArray value
    parse field, key, x for own key, x of v for v in value
  else
    field = field.cloneNode true
    dataAttr = findDataAttr field, key
    if(dataAttr)
      field[dataAttr] = value
    else
      field.textContent = value
    field
    
flatten = (a) ->
  result = []
  while a.length
    first = a.shift()
    if isArray first
      a = first.concat a
    else
      result.push first
  result
 
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
        parsed = parse field, key, value
        res.push p for p in flatten parsed if isArray parsed
        res.push parsed if !isArray parsed
  res
  
jQuery.fn.extend 
  glue: (data) ->
    jQuery glue this, data
	
this.glue = glue