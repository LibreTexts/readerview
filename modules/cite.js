/**
 * 
 */

function buildCite(data){
  let url = `https://${window.location.host}/@go/page/${data.pageId}`;
  let markup = `
  <div id="cite">
    <h3>Cite (APA)</h3>
    <div class="copy-holder">
      ${citeAuthors(data.authorDisplayName)} (${citeDate(data.modified.modifiedDate)}). ${data.title}. ${citePublisher()}. ${url}.
    </div>
    <button class="btn copy-button">Copy to clipboard</button>
  </div>
  <div id="attribution">
    <h3>License &amp; Attribution</h3>
    <div class="copy-holder">
      ${data.title} by ${data.authorDisplayName} is licensed under [license info here], except where otherwise noted. ${url}.
    </div>
    <button class="btn copy-button">Copy to clipboard</button>
  </div>
  `;

  return markup;
}

function citeDate(date){
  let datestring = new Date(date);
  let year = datestring.getFullYear();
  let month = datestring.toLocaleString('default', { month: 'long' });
  let day = datestring.getDate();
  let formattedDate = `${year}, ${month} ${day}`;
  return formattedDate;
}

function citeAuthors(author){
  let name = author.split(' ');
  let initials = name[name.length - 1] + ', ';
  initials += name[0].substring(0, 1).toUpperCase() + '.';
  if (name.length > 2) {
    initials += ' ' + name[1].substring(0, 1).toUpperCase() + '.';
  }
  return initials;
}

function citePublisher(){
  let bylineElement = document.querySelector('.mt-author-companyname');
  if (bylineElement){
    let publisher = bylineElement.firstChild.text();
    return publisher + '. LibreTexts';
  } else {
    return 'Libretexts';
  }
}

function copyToClipboard(){
  console.log(this);
}


export { buildCite };