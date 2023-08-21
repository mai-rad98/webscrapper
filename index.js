const fs = require('fs');
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.apple.com/ipad');

  const figureElementsWithBackgroundImages = await page.evaluate(() => {
    const figureElements = document.querySelectorAll('figure'); // Select all <figure> elements
    const images = new Set(); // Use a Set to store unique URLs

    figureElements.forEach(figure => {
      const style = getComputedStyle(figure);
      const backgroundImage = style.backgroundImage;

      if (backgroundImage && backgroundImage !== 'none') {
        const imageUrl = backgroundImage.replace(/url\(['"]?(.*?)['"]?\)/i, '$1');
        images.add(imageUrl);
      }
    });

    return Array.from(images); // Convert Set to an array
  });

  console.log(figureElementsWithBackgroundImages);

  await browser.close();

  // Write unique links to a CSV file
  const csvData = figureElementsWithBackgroundImages.join('\n');
  fs.writeFileSync('links2.csv', csvData);
  console.log('Links written to links.csv');
  
})();