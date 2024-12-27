import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'
import phoneService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')

  const [newNumber, setNewNumber] = useState('')

  const [newFilter, setNewFilter] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  useEffect(() => {
    phoneService
      .getAll()
      .then(initialPhonebook => { setPersons(initialPhonebook) })
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!persons.some(person => person.name == newName)) {
      const newPersonObject = {
        name: newName,
        number: newNumber,
        // id: persons.length + 1
      }
      phoneService.create(newPersonObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
    } else {
      if (confirm(`${newName} is already added to phonebook, replace the old one with a new one?`)) {
        const person = persons.find(p => p.name === newName)
        const newPersonObject = { ...person, number: newNumber }
        phoneService.update(person.id, newPersonObject)
          .then(returnedPerson => {
            setPersons(persons.map(p => {
              if (p.name === returnedPerson.name) {
                return { ...p, number: returnedPerson.number }
              } else {
                return p
              }
            }))
            setNewName('')
            setNewNumber('')
          })
      }
    }
  }

  const handleFilter = (event) => {
    setNewFilter(event.target.value)
  }

  const deleteItemOf = (id) => {
    const person = persons.find(p => p.id === id)

    if (confirm(`Delete ${person.name}?`)) {
      phoneService.deleteItem(id)
        .then((res) => {
          setPersons(persons.filter(p => p.id !== res.id))
        })
        .catch(error => {
          alert(`the person ${person.name} was already deleted from the server`)
        })
      setPersons(persons.filter(p => p.id !== id))
    }
  }

  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(newFilter.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} handleFilter={handleFilter} />
      <h2>add a new</h2>
      <PersonForm
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
        handleSubmit={handleSubmit} />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} deleteItemOf={deleteItemOf} />
    </div>
  )
}

export default App