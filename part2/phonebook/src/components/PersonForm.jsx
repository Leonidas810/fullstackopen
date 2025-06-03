const PersonForm = ({handleSubmit,onChange,valueName,valueNumber}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                Name: <input data-input={"name"} onChange={onChange} value={valueName} />
                Tel: <input data-input={"number"} onChange={onChange} value={valueNumber} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm;