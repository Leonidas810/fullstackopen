const Persons = ({ personsFilter, persons }) => {
    return (
        <ol>
            {
                personsFilter.filter === ""
                    ? persons.map((e) =>
                        <li key={e.id}>
                            <span>{e?.name ?? "S/N"}</span> - <span>{e?.number ?? "S/N"}</span>
                        </li>
                    )
                    : personsFilter.persons.map((e) =>
                        <li key={e.id}>
                            <span>{e?.name ?? "S/N"}</span> - <span>{e?.number ?? "S/N"}</span>
                        </li>
                    )
            }
        </ol>

    )
}

export default Persons;