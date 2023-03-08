
const dedicatedbrand = require('./eshops/circle');

const websites = [[]];
//at each index:
//name = 0
//eshopUrl = 1

websites[0]=['Dedicatedbrand','https://www.dedicatedbrand.com/en/men/news','./eshops/dedicatedbrand'];
websites[1]=['Montlimart','https://www.montlimart.com/99-vetements','./eshops/montlimart'];
websites[2]=['Circle Sportswear','https://shop.circlesportswear.com/collections/collection-homme','./eshops/circle'];


console.log("ready")

async function scrapeWebsites(websites) {

    const productsList = [];

    for(let i=0;i<websites.length;i++){
        console.log(websites[i][2])
        const scraper = require(websites[i][2])
        const eshop = websites[i][1]

        try {
            console.log(`🕵️‍♀️  browsing ${eshop} eshop`);
        
            const products = await scraper.scrape(eshop);
            //console.log(products);

            const jsonData=JSON.stringify(products)

            productsList.push(jsonData);
            console.log('done');
          } catch (e) {
            console.error(e);
          }
        
    }

    console.log(productsList)

    const filePath = 'products.json'; // file path where you want to save the JSON data
      
    fetch(filePath, {
        method: 'PUT', // use PUT method to save data to file
        body: JSON.stringify(productsList)
      })
      .then(response => response.json())
      .then(data => console.log('JSON data saved to file:', data))
      .catch(error => console.error('Error saving JSON data:', error));

    return productsList
  
};

const [,, eshop] = process.argv;

scrapeWebsites(websites)

