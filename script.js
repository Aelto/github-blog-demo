
const app = document.querySelector('.app')

function get_meta() {
  return fetch('posts/meta.json')
    .then(r => r.json())
}

async function main() {
  const meta = await get_meta()
  const { posts } = meta
  
  if (!posts.length) {
    return app.innerHTML = `<h1>No posts found :(</h1>`
  }

  let current_post_index = read_post_at(posts, 0)

  const next_button = document.querySelector('button.next')
  next_button.addEventListener('click', e => {
    const { target } = e

    if (current_post_index === posts.length - 1) {
      return
    }

    current_post_index = read_post_at(posts, current_post_index + 1)

    if (current_post_index === posts.length - 1) {
      target.classList.add('limit')
    }
  })

  const previous_button = document.querySelector('button.previous')
  previous_button.addEventListener('click', e => {
    const { target } = e

    if (!current_post_index) {
      return
    }

    current_post_index = read_post_at(posts, current_post_index - 1)

    if (!current_post_index) {
      target.classList.add('limit')
    }
  })
}

async function read_post_at(posts, index) {
  const post_file = posts[index]
  const post_markdown = await fetch(`posts/${post_file}`)
    .then(r => r.text())

  const converter = new showdown.Converter()
  const html = converter.makeHtml(post_markdown)

  app.innerHTML = html

  return index
}

requestAnimationFrame(main)