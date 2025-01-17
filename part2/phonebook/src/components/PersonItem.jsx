const PersonItem = ({ person, handleDelete }) => {
    return (
        <div>
            {person.name} {person.number} 
            <button onClick={handleDelete}>delete</button>
        </div>
    )
}

export default PersonItem