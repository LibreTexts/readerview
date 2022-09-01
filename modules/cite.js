/**
 * 
 */

function buildCite(data){
  let url = `https://${window.location.host}/@go/page/${data.pageId}`;
  return `
  <div id="cite">
    <h3>Cite (APA)</h3>
    <div class="copy-holder">
      ${citeAuthors(data.authorDisplayName)} (${citeDate(data.modified.modifiedDate)}). ${data.title}. ${citePublisher()}. ${url}.
    </div>
    <button class="btn copy-button" data-clipboard-target="#cite .copy-holder">Copy to clipboard</button>
  </div>
  <div id="attribution">
    <h3>License &amp; Attribution</h3>
    <div class="copy-holder">
      ${buildLicenseAttribution(data)}
    </div>
    <button class="btn copy-button" data-clipboard-target="#attribution .copy-holder">Copy to clipboard</button>
  </div>
  `;
  
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

function buildLicenseAttribution(data) {
  const { license } = LibreTexts.current;
  if (license.title === 'notset') {
    return `
    <p><span class="license-title">${data.title}</span> by <span class="license-author">${data.authorDisplayName}</span> is shared without a specified license.</p>
    `;
  } else {
    return `
    <p><span class="license-title">${data.title}</span> by <span class="license-author">${data.authorDisplayName}</span> is under a <span class="license-type"><a href="${license.link}" target="_blank" rel="nofollow">${license.title}</a></span>, except where otherwise noted.</p>
    `;
  }
}

function copyToClipboard(){
  console.log(this);
}


export { buildCite };