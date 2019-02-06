let generateSecret = (stringLength) => {
  let secret = ''
  let set = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-+#$&@!'
  for (var i = 0; i < stringLength; i++)
    secret += set.charAt(Math.floor(Math.random() * set.length))
  return secret
}
module.exports = generateSecret