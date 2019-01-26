export let radiantResTime = 130
export let direResTime = 130

/* Takes one parameter string returns a string without 
  any spaces, apostrophes, or extra characters */
export const CLEANSE_INPUT = input => {
  const regex = /[A-Za-z]/
  let cleansedInput = []
  let arr = input.split('')

  arr.filter(letter => {
    if (letter.search(regex) === 0) cleansedInput.push(letter)
  })
  
  return cleansedInput.join('')
}

export const HERO_NAME_CLEANSE = input => {
  return input.slice(14)
}

export const randomNumber = arg => {
  let random = x => Math.floor(Math.random() * Math.floor( x ))

  if (typeof arg === 'object' || 'string') return random( arg.length )
  return random(arg)
}

// const run = () => {
//   let 
// }