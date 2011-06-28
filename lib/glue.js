(function() {
  var createTemplate, glue, isString, isjQuery;
  var __hasProp = Object.prototype.hasOwnProperty;
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
          field = field.cloneNode(true);
          field.textContent = value;
          res.push(field);
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
