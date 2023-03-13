const fetch = require('node-fetch');
const cheerio = require('cheerio');





function randomDate(start, end) {
  var date = new Date(+start + Math.random() * (end - start));
  return date;
}




/**
 * Parse webpage e-shop
 * @param  {String} data - html response
 * @return {Array} products
 */
const parse = data => {
  const $ = cheerio.load(data);

  return $('.grid__item')
    .map((i, element) => {
      var name = $(element)
        .find('.full-unstyled-link')
        .text()
        .trim()
      name = name.split('\n')[0]
      var price = 
        $(element)
          .find('.money')
          .text()
          .split('€');
        price = parseFloat(price[price.length - 1].replace(',', '.'));
      var brand = 'Circle Sportswear';
      var date = randomDate(new Date()-100*1000*60*60*24,new Date())

      return {name,brand,price,date};
    })
    .get();
};

/**
 * Scrape all the products for a given url page
 * @param  {[type]}  url
 * @return {Array|null}
 */
module.exports.scrape = async url => {
  try {
    const response = await fetch(url);

    if (response.ok) {
      const body = await response.text();

      return parse(body);
    }

    console.error(response);

    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};
