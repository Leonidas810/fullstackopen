const Persons = ({ personsFilter, persons, handleDeletePerson }) => {
    return (
        <ol>
            {
                personsFilter.filter === ""
                    ? persons.map((e) =>
                        <li key={e.id}>
                            <span>{e?.name ?? "S/N"}</span> - <span>{e?.number ?? "S/N"}</span>
                            <button onClick={()=>handleDeletePerson(e)}>Delete</button>
                        </li>
                    )
                    : personsFilter.persons.map((e) =>
                        <li key={e.id}>
                            <span>{e?.name ?? "S/N"}</span> - <span>{e?.number ?? "S/N"}</span>
                            <button onClick={()=>handleDeletePerson(e)}>Delete</button>
                        </li>
                    )
            }
        </ol>

    )
}

export default Persons;