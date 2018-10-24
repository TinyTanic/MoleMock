const createContainer = document.querySelector('.create-route-container')
const noRoutesContainer = document.querySelector('.no-route')
const routesContainer = document.querySelector('.routes-container')

let createName = ''
let createDescription = ''

function validateCreate() {
  const button = document.querySelector('button.create-cta.button')
  if (button) {
    if (createName && createDescription) {
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
  if (noRoutesContainer) {
    noRoutesContainer
      .classList
      .add('hidden')
    createContainer.classList.remove('hidden')
  }
  if (routesContainer) {
    routesContainer
      .classList
      .add('hidden')
    createContainer.classList.remove('hidden')
  }
}

function createRoute() {
  const name = document.querySelector('input[name="name"').value
  const description = document.querySelector('input[name="description"]').value
  const workspace = document.querySelector('input[name="workspace"]').value

  if (name && description && workspace) {
    const body = { name, description, workspace }
    fetch('/api/routes', {
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
}

function removeRoute(event, routeId) {
  event.preventDefault()
  fetch(`/api/routes/${ routeId }`, {
    method: 'DELETE',
  })
    .then(() => {
      location.reload();
    })
}

function closeCreate() {
  createContainer.classList.add('hidden')
  if (routesContainer) {
    routesContainer.classList.remove('hidden')
  }
  if (noRoutesContainer) {
    noRoutesContainer.classList.remove('hidden')
  }
}

validateCreate()