(function() {
  var glue, isString, isjQuery;
  var __hasProp = Object.prototype.hasOwnProperty;
  isString = function(obj) {
    return obj.constructor === String;
  };
  isjQuery = function(obj) {
    return obj.constructor === jQuery;
  };
  glue = function(template, data) {
    var curr, field, key, res, tmpl, value;
    if (!data || !data.length) {
      return data;
    }
    data.reverse();
    res = [];
    if (isString(template)) {
      tmpl = $(template);
    }
    if (isjQuery(template)) {
      tmpl = $('<div></div>').html(template.html());
    }
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
    return jQuery(res);
  };
  jQuery.fn.extend({
    glue: function(data) {
      return glue(this, data);
    }
  });
  this.glue = glue;
}).call(this);
