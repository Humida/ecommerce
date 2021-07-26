const queryString = require('querystring');
let url = 'https://shopee.vn/search?keyword=hackers%20toeic%20vocabulary&locations=H%C3%A0%20N%E1%BB%99i&maxPrice=100000&minPrice=1000&noCorrection=true&page=0&shippingOptions=1&utm_campaign=4jcz9mgzpk8w-&utm_content=96a316e41a7a4f2d964f7f9c4415055b-38793-101654&utm_medium=affiliates&utm_source=an_17209090000';


console.log(decodeURIComponent(url));

console.log(queryString.parse(url));