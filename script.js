


function get_meta() {
  return fetch('posts/meta.json')
    .then(r => r.json())
}

async function main() {
  const meta = await get_meta()

  console.log(meta)

  document.write(meta)
}

requestAnimationFrame(main)