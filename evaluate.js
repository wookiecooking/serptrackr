'use strict';

module.exports = () => {
  const gatherResultsDom = Array.from(document.querySelectorAll('#search .g h3 a'));
  return gatherResultsDom.map( (anchor, key) => {
    let urlHref = anchor.getAttribute('href');
    let urlTitle = anchor.textContent;
    let rankPosition = key+1;
    let obj = { url: urlHref, position: rankPosition, pageTitle: urlTitle };
      return obj
  });
}
