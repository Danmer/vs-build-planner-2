import { readdir, readFile, writeFile } from 'node:fs/promises'

prepare()

interface TData {
  arcanas: object[]
  characters: object[]
  drops: object[]
  maps: object[]
  other: object[]
  passives: object[]
  powerups: object[]
  weapons: object[]
  aliases: object,
  emotes: object,
}

async function prepare() {
  console.log('> Preparing data...')
  const data = {} as TData
  const libraryPath = './Vampire-Survivors-Bot/library'
  try {
    const dirPaths = await readdir(`${libraryPath}`) as (keyof TData)[]
    for (const dirPath of dirPaths) {
      if (dirPath.includes('.')) {
        const [key] = dirPath.split('.')
        if (key === 'aliases' || key === 'emotes') {
          const content = await readFile(`${libraryPath}/${dirPath}`)
          const jsonContent = JSON.parse(content.toString())
          data[key] = jsonContent
        }
      } else {
        data[dirPath] = []
        const filePaths = await readdir(`${libraryPath}/${dirPath}`)
        for (const filePath of filePaths) {
          if (filePath.includes('.json') && dirPath !== 'aliases' && dirPath !== 'emotes') {
            const content = await readFile(`${libraryPath}/${dirPath}/${filePath}`)
            const jsonContent = JSON.parse(content.toString())
            data[dirPath].push(jsonContent)
          }
        }
      }
    }
    writeFile('./public/data.json', JSON.stringify(data, null, 2))
    writeFile('./public/data.min.json', JSON.stringify(data))
  } catch (err) {
    console.error(err)
  }
}
