/**
 * 
 */
//import ls from 'localstorage-slim';

function buildCite(data){
  console.log(data);
  const mtAuthorName = 
    document.querySelector('.mt-author-information > a') ? 
    document.querySelector('.mt-author-information > a').innerText : null;

  const mtCompanyName = 
    document.querySelector('.mt-author-companyname > a')?
    document.querySelector('.mt-author-companyname > a').innerText : null;


  let url = `https://${window.location.host}/@go/page/${data.pageId}`;
  return `
  <div id="cite">
    <h3>Cite</h3> 
    <div>
                <select id="citeSe">
                    <option value="" selected="true" disabled="true">Template Selection</option>
                    <option value="citation-apa">APA</option>
                    <option value="harvard1">Harvard</option>
                    <option value="chicago">Chicago</option>
                    <option value="vancouver">Vancouver</option>
                    <option value="mla">MLA</option>
                    <option value="acs">ACS</option>
                </select>
            </div>
            
    <div class="copy-holder">
      ${citeAuthors(mtAuthorName)} (${citeDate(data.modified.modifiedDate)}). ${data.title}. ${citePublisher(mtCompanyName)}. ${url}.
    </div>

    <div id="citeCont">
                 <a id="citeCopy">Copy Text</a>
                 <a id="citeCopyHTML">Copy HTML</a>
                 <a id="citeBIBTEX">Download BibTeX </a>
                 <a id="citeRIS">Download RIS </a>
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
  console.log(`author obj: ${author}`);
  if (author) {
    let name = author.split(' ');
    let initials = name[name.length - 1] + ', ';
    initials += name[0].substring(0, 1).toUpperCase() + '.';
    if (name.length > 2) {
      initials += ' ' + name[1].substring(0, 1).toUpperCase() + '.';
    }
    return initials;
  } else {
    return '';
  }

}

function citePublisher(company){
  if (company){
    return company + '. LibreTexts';
  } else {
    return 'Libretexts';
  }
}

function buildLicenseAttribution(data) {
  const { license } = LibreTexts.current;
  if (license.title === 'notset') {
    return `
    <p><span class="license-title">${data.title}</span> by <span class="license-author">${data.authorDisplayName ? data.authorDisplayName : 'LibreTexts'}</span> is shared without a specified license.</p>
    `;
  } else {
    return `
    <p><span class="license-title">${data.title}</span> by <span class="license-author">${data.authorDisplayName ? data.authorDisplayName : 'LibreTexts'}</span> is licensed <span class="license-type"><a href="${license.link}" target="_blank" rel="nofollow">${license.title}</a></span>, except where otherwise noted.</p>
    `;
  }
}


export { buildCite };