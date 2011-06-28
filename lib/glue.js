(function() {
  var camelCase, camelCaseRegex, createTemplate, findDataAttr, glue, isString, isjQuery, parse;
  var __hasProp = Object.prototype.hasOwnProperty;
  camelCaseRegex = /-([a-z])/ig;
  camelCase = function(s) {
    return s.replace(camelCaseRegex, function(all, x) {
      return x.toUpperCase();
    });
  };
  isString = function(obj) {
    return obj.constructor === String;
  };
  isjQuery = function(obj) {
    return obj.constructor === jQuery;
  };
  createTemplate = function(tmpl) {
    var div;
    if (isjQuery(tmpl)) {
      tmpl = tmpl.html();
    }
    div = document.createElement('div');
    div.innerHTML = tmpl;
    return jQuery(div);
  };
  findDataAttr = function(field, key) {
    var attr, dataAttr, _i, _len, _ref;
    dataAttr = '';
    if (field.dataset) {
      dataAttr = field.dataset[camelCase('glue-' + key)];
    } else {
      _ref = field.attributes;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        attr = _ref[_i];
        if (attr.name === 'data-glue-' + key) {
          dataAttr = attr;
        }
      }
    }
    return dataAttr.value || dataAttr;
  };
  parse = function(field, key, value) {
    var dataAttr;
    field = field.cloneNode(true);
    dataAttr = findDataAttr(field, key);
    if (dataAttr) {
      field[dataAttr] = value;
    } else {
      field.textContent = value;
    }
    return field;
  };
  glue = function(template, data) {
    var curr, field, key, res, tmpl, value;
    if (!data || !data.length) {
      return data;
    }
    data.reverse();
    res = [];
    tmpl = createTemplate(template);
    while (data.length) {
      curr = data.pop();
      for (key in curr) {
        if (!__hasProp.call(curr, key)) continue;
        value = curr[key];
        field = tmpl.find('[data-glue-' + key.toLowerCase() + ']').get(0);
        if (field) {
          res.push(parse(field, key, value));
        }
      }
    }
    return res;
  };
  jQuery.fn.extend({
    glue: function(data) {
      return jQuery(glue(this, data));
    }
  });
  this.glue = glue;
}).call(this);
