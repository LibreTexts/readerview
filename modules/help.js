function renderHelp() {
  //const docsURL = 'https://dev.libretexts.org/Sandboxes/yasin_at_libretexts.org/Help_and_Documentation';
  //const docsURL = 'https://studio.libretexts.org/h5p/10963/embed'
  const additionalInfo = `
    <div id="helpInfo">
      <h3>Still have questions?</h3>
      <p>You should first contact your instructor regarding any issues with this book if it assigned reading.</p>
      <p>If you are still running into issues or have questions, please send your query to <a href="mailto:info@libretexts.org">info@libretexts.org</a>.</p>
      <p>You can also refer to the <a href="#" target="_blank">LibreTexts Documentation</a> for tutorials and guides on using the LibreTexts platform.
    </div>
  `;
  return `
  <iframe src="https://studio.libretexts.org/h5p/10963/embed" width="980" height="612" frameborder="0" allowfullscreen="allowfullscreen" lang="en"></iframe><script src="https://studio.libretexts.org/modules/contrib/h5p/vendor/h5p/h5p-core/js/h5p-resizer.js" charset="UTF-8"></script>
  ${additionalInfo}
  `;
}

export { renderHelp };