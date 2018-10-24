const createContainer = document.querySelector('.create-ws-container')

document
  .querySelector('.no-ws-cta.button')
  .addEventListener('click', (event) => {
    event.target.classList.add('hidden')
    createContainer.classList.remove('hidden')
  })

  document
    .querySelector('.create-cta.button')
    .addEventListener('click', () => {
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
    })