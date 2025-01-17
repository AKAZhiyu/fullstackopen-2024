// Question remains: How to wisely chose the parameter to pass?

const Header = (props) => {
    // console.log("Header props:", props)
    return (
        <div>
            <h2>{props.courseName}</h2>
        </div>
    )
}

const Part = (props) => {
    return (
        <div>
            <p>{props.partName} {props.exercise}</p>
        </div>
    )
}

const Content = ({ parts }) => {
    return (
        <div>
            {parts.map(part => (
                <Part key={part.id} partName={part.name} exercise={part.exercises} />
            ))}
        </div>
    )
}

const Total = ({ parts }) => {
    console.log(parts)

    return (
        <div>
            <b>total of exercises {parts.reduce((acc, curr) => acc + curr.exercises, 0)}</b>
        </div>
    )
}

const Course = ({ course }) => {

    return (
        <div>
            <Header courseName={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )

}

export default Course