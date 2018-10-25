var saveButton = document.getElementById('save-button');

let startJSON = {}

function setRouteInfo(json) {
  startJSON = json
  editorTree.set(json.payload);
  editorCode.set(json.payload);
}

function saveRoute() {
  try {
    const body = {
      ...startJSON,
      payload: editorCode.get(),
    };
    fetch('/api/routes', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(body),
    })
      .then(() => {
        saveButton.classList.add('hidden');
      });
  } catch (e) {}
}

// create the editor
var containerCode = document.getElementById('payload-code');
var containerTree = document.getElementById('payload-tree');
var optionsCode = {
  mode: 'code',
  onChange: value => {
    try {
      editorTree.set(editorCode.get());
      saveButton.classList.remove('hidden');
    } catch (e) {
      saveButton.classList.add('hidden');
    }
  },
};
var optionsTree = {
  mode: 'tree',
  onChange: value => {
    try {
      saveButton.classList.remove('hidden');
      editorCode.set(editorTree.get());
    } catch (e) {}
  },
};
var editorCode = new JSONEditor(containerCode, optionsCode);
var editorTree = new JSONEditor(containerTree, optionsTree);
