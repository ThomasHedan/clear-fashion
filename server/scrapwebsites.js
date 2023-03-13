
const dedicatedbrand = require('./eshops/circle');
const fs =require('fs');

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

            productsList.push(products);
            console.log('done');
          } catch (e) {
            console.error(e);
          }
        
    }

    console.log(productsList);

    return productsList;
  
};

async function saveInJsonFile(data){
  fs.unlink('products.json', (err) => {                   
      if (err && err.code !== 'ENOENT') throw err; 
      fs.writeFile('products.json', data, (err) => {
          if (err) throw err;
          console.log('Products have been saved on a JSON file!');
      });
  });
}

async function scrapeAndSaveProductsFrom(websites){
  data = await scrapeWebsites(websites);
  string_data = JSON.stringify(data,null,1)
  saveInJsonFile(string_data);
}



scrapeAndSaveProductsFrom(websites);

