const ShortUniqueId = require("short-unique-id");

/**
 * This Function generates an unique string of length 5
 * @param  {None} No param required
 * @return {String}  Unique Shorter link
 */
const generateShortLink = () => {
  var rnd = Math.floor(Math.random() * 100);
  if (rnd < 10) {
    rnd += 10;
  }

  var str1 = rnd.toString()[0];
  var str2 = rnd.toString()[1];
  const uid = new ShortUniqueId({ length: 3 });
  var finalStr = str1 + uid() + str2;
  return finalStr;

  /*
  const uid = new ShortUniqueId({ length: 10 });
   console.log(uid.stamp(10));
   */
};

module.exports = generateShortLink;
