import Header from "./Header"
import Content from "./Content"
import Total from "./Total"

const Course = ({course}) => {
    const sumExercises = course.parts.reduce((acc,e)=>acc+e.exercises,0)
    return (
        <div>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total total={sumExercises}/>
        </div>
    )
}

export default Course;