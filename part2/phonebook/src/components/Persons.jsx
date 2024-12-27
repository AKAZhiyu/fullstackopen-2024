import PersonItem from "./PersonItem"

const Persons = ({ persons, deleteItemOf }) => {
    return (
        persons.map(person => <PersonItem key={person.id}
            handleDelete={() => deleteItemOf(person.id)} person={person} />)
    )
}

export default Persons