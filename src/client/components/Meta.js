import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Helmet from 'react-helmet';

// import config from '../helmconfig.js';

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

// Remove stylesheets because we do not extract them into a css file
// in development mode
// if (__DEVSERVER__) {
//   config.link = config.link.filter(l => l.rel !== 'stylesheet');
// }

const Meta = () => (
  <Helmet
    htmlAttributes={{"lang": "en", "amp": undefined}}
    title="React Webpack Node" meta={config.meta}
    link={config.link}
  />
)


ReactDOMServer.renderToString(<Meta />);
const header = Helmet.rewind();

export default header;
