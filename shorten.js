const ShortUniqueId = require("short-unique-id");

const generateShortLink = () => {
  var rnd = Math.floor(Math.random() * 100);
  if (rnd < 10) {
    rnd += 10;
  }
  console.log(rnd);
  var str1 = rnd.toString()[0];
  var str2 = rnd.toString()[1];
  const uid = new ShortUniqueId({ length: 3 });
  var finalStr = str1 + uid() + str2;
  //   console.log(finalStr);
  return finalStr;

  // const uid = new ShortUniqueId({ length: 10 });
  // console.log(uid.stamp(10));
  // console.log(uid.stamp(10));
  // console.log(uid.stamp(10));
  // console.log(uid.stamp(10));
  // console.log(uid.stamp(10));
};

module.exports = generateShortLink;
