const CountryCard = ({ data }) => {
    return (
        <div>
            <h1>{data.name.official}</h1>
            <div>
                <h3>Capital : {data?.capital[0] ?? "S/D"}</h3>
                <h3>Area : {data?.area ?? "S/D"}</h3>
            </div>
            <div>
                <h3>Languages</h3>
                <ol>
                    {Object.keys(data.languages).map((key)=>(<ul key={key}>{data.languages[key]}</ul>))}
                </ol>

            </div>
            <img src={`${data.flags.png}`} alt={`${data.flags.alt}`} />
        </div>
    )

}

export default CountryCard