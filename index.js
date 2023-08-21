const fs = require('fs');
const writeStream = fs.createWriteStream('new.csv');
const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');

const app = express();
const port = 8000;

const url = 'https://www.apple.com/'

axios(url)
.then(response => {
    const html = response.data;
    const $ = cheerio.load(html);
    

    fs.writeFile('new.csv', html, 'utf8', err => {
        if (err) {
          console.error('Error writing HTML to file:', err);
        } else {
          console.log('HTML content saved to new.csv');
        }
      });

      const links = [];

      // Extract links using Cheerio selectors
      $('a').each((index, element) => {
        const link = $(element).attr('href');
        if (link && link.startsWith('http')) {
          links.push(link);
        }
      });
  
      // Write the links to links.csv
      fs.writeFile('links.csv', links.join('\n'), 'utf8', err => {
        if (err) {
          console.error('Error writing links to file:', err);
        } else {
          console.log('Links saved to links.csv');
        }
      })

      const images = [];

      $('.image-wrap figure[data-anim-lazy-image]').each((index, element) => {
        const imageUrl = $(element).attr('data-anim-lazy-image');
        if (imageUrl) {
          images.push(imageUrl);
        }
      });
  

     fs.writeFile('images.csv', images.join('\n'), 'utf8', err => {
         if (err) {
           console.error('Error writing images to file:', err);
         } else {
           console.log('Links saved to images.csv');
         }
       })


    })
    
    //brokers
    const firms = [];
    const url1 = 'https://www.ibba.org/state/california/'
    axios(url1)
    .then(response => {
        const html = response.data
        const $ = cheerio.load(html)

       

    // Extract firm details using Cheerio selectors
    $('.brokers__item').each((index, element) => {
      const firmName = $(element).find('.brokers__item--company').text();
      const contactName = $(element).find('.brokers__item--topTitle').text();
      const email = $(element).find('.email').text();

      if (firmName && contactName && email) {
        firms.push({
          firmName,
          contactName,
          email,
        });
      }
    });
    
    })

    fs.writeFile('brokers.csv', firms.join('\n'), 'utf8', err => {
        if (err) {
          console.error('Error writing images to file:', err);
        } else {
          console.log('Links saved to images.csv');
        }
      })


   



app.listen(port, () => {
  console.log(`Server has  started on http://localhost:${port}`);
});



































































          

