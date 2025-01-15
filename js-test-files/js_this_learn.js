const arto = {
    name: 'Arto Hellas',
    greet: function() {
      console.log('hello, my name is ' + this.name)
    },
  }

const jason = {
    name: 'Jason',
    greet: arto.greet,
  }
  
// setTimeout(jason.greet, 1000)
jason.greet()   

console.log('')
console.log('')