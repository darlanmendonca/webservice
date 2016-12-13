module.exports = function (req, res, next) {
  // return next()
  const resJson = res.json
  res.json = fielterFields
  next()

  function fielterFields(data) {
    data = data.toJSON
      ? data.toJSON()
      : data

    const filtered = Array.isArray(data)
      ? data.map(item => filter(item))
      : filter(data)

    resJson.call(this, filtered)
  }

  function filter(data) {
    const {filters} = req.headers
    if (filters) {
      const fields = filters
        .replace(/\s+/, '')
        .split(',')

      let newObj = {}

      fields.forEach(field => newObj[field] = data[field])
      data = newObj
    }

    return data
  }
}