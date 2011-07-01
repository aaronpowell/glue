camelCaseRegex = /-([a-z])/ig
camelCase = (s) ->
  s.replace camelCaseRegex, (all, x) -> x.toUpperCase()

isObject = (obj) ->
  obj && obj.constructor == Object
  
isString = (obj) ->
  obj && obj.constructor == String

isjQuery = (obj) ->
  obj && obj.constructor == jQuery
  
isArray = (obj) ->
  obj && obj.constructor == Array
  
createTemplate = (tmpl) ->
  tmpl = tmpl.html() if isjQuery tmpl
  div = document.createElement 'div'
  div.innerHTML = tmpl
  div
  
findDataAttr = (field, key) ->
  dataAttr = ''
  if field.dataset
    dataAttr = field.dataset[camelCase 'glue-' + key]
  else
    dataAttr = attr for attr in field.attributes when attr.name == 'data-glue-' + key
  dataAttr.value || dataAttr
  
process = (tmpl, data) ->
  res = []
  while data.length
    curr = data.pop()
    currTmpl = jQuery tmpl.cloneNode true
    parsed
    if !isObject curr
      curr =
        value: curr
    for own key, value of curr
      field = currTmpl.find('[data-glue-' + key.toLowerCase() + ']').get 0
      if field
        parsed = parse field, key, value
        res.push p for p in flatten parsed if isArray parsed
    res.push parsed if !isArray parsed
  res
  
parse = (field, key, value) ->
  if isArray value
    process field, value.reverse()
  else
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
  tmpl = createTemplate template
  process tmpl, data
  
jQuery.fn.extend 
  glue: (data) ->
    jQuery glue this, data
	
this.glue = glue