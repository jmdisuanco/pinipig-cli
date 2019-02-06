/**
 *  Parser parse template literal templates
 * @param {Object} data 
 * @param {String} response //Template Literals 
 */
const parser = (data, response) => {
    return new Function(`{${Object.keys(data)}}`,'return`'+ response+ '`')(data, response)
  }

module.exports = parser