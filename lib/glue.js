(function() {
  var camelCase, camelCaseRegex, createTemplate, findDataAttr, flatten, glue, isArray, isObject, isString, isjQuery, parse;
  var __hasProp = Object.prototype.hasOwnProperty;
  camelCaseRegex = /-([a-z])/ig;
  camelCase = function(s) {
    return s.replace(camelCaseRegex, function(all, x) {
      return x.toUpperCase();
    });
  };
  isObject = function(obj) {
    return obj.constructor === Object;
  };
  isString = function(obj) {
    return obj.constructor === String;
  };
  isjQuery = function(obj) {
    return obj.constructor === jQuery;
  };
  isArray = function(obj) {
    return obj.constructor === Array;
  };
  createTemplate = function(tmpl) {
    var div;
    if (isjQuery(tmpl)) {
      tmpl = tmpl.html();
    }
    div = document.createElement('div');
    div.innerHTML = tmpl;
    return div;
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
    var dataAttr, key, v, x, _i, _len, _results;
    if (isArray(value)) {
      _results = [];
      for (_i = 0, _len = value.length; _i < _len; _i++) {
        v = value[_i];
        _results.push((function() {
          var _results2;
          _results2 = [];
          for (key in v) {
            if (!__hasProp.call(v, key)) continue;
            x = v[key];
            _results2.push(parse(field, key, x));
          }
          return _results2;
        })());
      }
      return _results;
    } else {
      dataAttr = findDataAttr(field, key);
      if (dataAttr) {
        field[dataAttr] = value;
      } else {
        field.textContent = value;
      }
      return field;
    }
  };
  flatten = function(a) {
    var first, result;
    result = [];
    while (a.length) {
      first = a.shift();
      if (isArray(first)) {
        a = first.concat(a);
      } else {
        result.push(first);
      }
    }
    return result;
  };
  glue = function(template, data) {
    var curr, currTmpl, field, key, p, parsed, res, tmpl, value, _i, _len, _ref;
    if (!data || !data.length) {
      return data;
    }
    data.reverse();
    res = [];
    tmpl = createTemplate(template);
    while (data.length) {
      curr = data.pop();
      currTmpl = jQuery(tmpl.cloneNode(true));
      parsed;
      if (!isObject(curr)) {
        curr = {
          value: curr
        };
      }
      for (key in curr) {
        if (!__hasProp.call(curr, key)) continue;
        value = curr[key];
        field = currTmpl.find('[data-glue-' + key.toLowerCase() + ']').get(0);
        if (field) {
          parsed = parse(field, key, value);
          if (isArray(parsed)) {
            _ref = flatten(parsed);
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              p = _ref[_i];
              res.push(p);
            }
          }
        }
      }
      if (!isArray(parsed)) {
        res.push(parsed);
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
