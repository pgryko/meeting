/*
 * Based on the template in Web Starter Kit : https://github.com/google/web-starter-kit/blob/master/app/index.html
 * To add to the config, add an object:
 * {
 *  type: 'link' | 'meta',
 *  sizes: 'widthxheight',
 *  rel: 'rel value'
 *  filename: <Name of your file'
 * }
 */

// Import all your needed files first (webpack will grab the url)
// import chromecon from 'images/chrome-ninja192-precomposed.png';
// import applecon from 'images/apple-ninja152-precomposed.png';
// import mscon from 'images/ms-ninja144-precomposed.png';
// import favicon from 'images/favicon.png';

const config = {
  link: [
    { rel: 'icon', href: "/img/favicon.ico?v=2" },

    { rel: 'stylesheet', href: '/css/index.css' }

  ],
  meta: [
    { charset: 'utf-8' },
    // Setting IE=edge tells Internet Explorer to use the latest engine to render the page and execute Javascript
    { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
    //  Meta descriptions are commonly used on search engine result pages to display preview snippets for a given page.
    { name: 'description', content: 'Unipart Digital Comm Cell' },

  ]
};
