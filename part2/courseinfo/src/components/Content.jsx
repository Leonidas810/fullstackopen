import Part from "./Part";

const Content = ({ parts }) => {
    console.log(parts)
    return (
        parts.map((e, i) => <Part key={i} part={e}/>)
    )
}

export default Content;