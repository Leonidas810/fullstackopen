const Filter = ({
    onChange, value
}) => {
    return (
        <>
            <span>filter shown with: </span><input onChange={onChange} value={value} />
        </>
    )
}

export default Filter;