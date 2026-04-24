const fs = require('fs');

const images = [
  ...Array.from({length: 6}, (_, i) => `tshirt${i+1}.jpg`),
  ...Array.from({length: 5}, (_, i) => `shoes${i+3}.jpg`),
  ...Array.from({length: 5}, (_, i) => `cricket${i+1}.jpg`),
  ...Array.from({length: 8}, (_, i) => `pant${i+1}.jpg`),
  ...Array.from({length: 8}, (_, i) => `jacket${i+1}.jpg`),
  ...Array.from({length: 8}, (_, i) => `swim${i+1}.jpg`),
  ...Array.from({length: 7}, (_, i) => `yogamat${i+1}.jpg`),
  'dumbell1.jpg', 'dumbell2.jpg', 'trademil.jpg', 'wheelroller.jpg', 'exercise.jpg'
];

let html = '<html><body><h1>All Products</h1>';
images.forEach(img => {
  html += `<h2>${img}</h2><img src='${img}' width='300'><hr>`;
});
html += '</body></html>';

fs.writeFileSync('d:/Desktop/CWH_Web_Development/video68/fullstack-ecommerce/frontend/public/images/view_all.html', html);
console.log('HTML file created with 52 images');
