const createContainer = document.querySelector('.create-ws-container')
const noWsContainer = document.querySelector('.no-ws')
const wsContainer = document.querySelector('.workspaces-container')

let createName = ''
let createDescription = ''

function validateCreate() {
  const button = document.querySelector('button.create-cta.button')
  if (button) {
    if (createName) {
      button.classList.remove('disabled')
      button.disabled = false
    } else {
      button.classList.add('disabled')
      button.disabled = true
    }
  }
}

function changeName(event) {
  createName = event.target.value;
  validateCreate();
}

function changeDescription(event) {
  createDescription = event.target.value;
  validateCreate();
}

function clickCreate() {
  if (noWsContainer) {
    noWsContainer.classList.add('hidden')
  }
  if (wsContainer) {
    wsContainer.classList.add('hidden')
  }
  createContainer.classList.remove('hidden')
}

function closeCreate() {
  if (noWsContainer) {
    noWsContainer.classList.remove('hidden')
  }
  if (wsContainer) {
    wsContainer.classList.remove('hidden')
  }
  createContainer.classList.add('hidden')
}

function createWorkspace() {
  const name = document.querySelector('input[name="name"').value
  const description = document.querySelector('input[name="description"]').value

  const body = { name, description }
  fetch('/api/workspaces', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(body),
  })
    .then(() => {
      location.reload();
    })
}

function removeWorkspace(event, workspaceId) {
  event.preventDefault()
  fetch(`/api/workspaces/${ workspaceId }`, {
    method: 'DELETE',
  })
    .then(() => {
      location.reload();
    })
}

validateCreate()