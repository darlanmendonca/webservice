'use strict';

module.exports = function (req, res, next) {
  // return next()
  var resJson = res.json;
  res.json = fielterFields;
  next();

  function fielterFields(data) {
    data = data && data.toJSON ? data.toJSON() : data;

    if (data) {
      var fields = Array.isArray(data) ? Object.keys(data[0].toJSON ? data[0].toJSON() : data[0]).join(',') : Object.keys(data).join(', ');

      res.header('Allow-filters', fields);
    }

    var filtered = Array.isArray(data) ? data.map(function (item) {
      return filter(item);
    }) : filter(data);

    resJson.call(this, filtered);
  }

  function filter(data) {
    var filters = req.headers.filters;
    if (filters) {
      (function () {
        var fields = filters.replace(/\s+/, '').split(',');

        var newObj = {};

        fields.forEach(function (field) {
          return newObj[field] = data[field];
        });
        data = newObj;
      })();
    }

    return data;
  }
};