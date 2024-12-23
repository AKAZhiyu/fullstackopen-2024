import PersonItem from "./PersonItem"

const Persons = ({ persons }) => {
    return (
        persons.map(person => <PersonItem key={person.id} person={person}/>)
    )
}

export default Persons