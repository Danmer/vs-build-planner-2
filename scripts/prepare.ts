import { readdir } from 'node:fs/promises'

prepare()

async function prepare() {
  console.log('> Preparing data...')
  const data = {}
  const libraryPath = './Vampire-Survivors-Bot/library'
  try {
    const files = await readdir(libraryPath)
    for (const file of files) console.log(file)
  } catch (err) {
    console.error(err)
  }
}
