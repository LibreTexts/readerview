/**
 * Sets defaults values for UI in localstorage
 * so defaults persist over page loads.
 */

function getUserSettings() {
  const toolbar = document.querySelector('#toolbar');
  const toolbarToggler = document.querySelector('#toggle_tools');

  const settings = ls.get('userSettings');
  console.log(settings);

}

function setUserSettings(target,value) {
  // let settings = {
  //   toolbar: 'closed',
  //   toc: 'closed',
  //   search: 'closed',
  //   text: {
  //     size: 'default',
  //     color: 'default',
  //     spacing: 'default',
  //     font: 'default'
  //   },
  //   spacing: {
  //     pagewidth: 'default',
  //     margins: 'default',
  //     padding: 'default'
  //   }
  // }

  // ls.set('userSettings', settings);

  ls.set(target, value);
  console.warn(`[ReaderView]: set ${target} to '${value}'`);
}

export {
  getUserSettings,
  setUserSettings
}