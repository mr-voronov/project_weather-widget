function SelectCountry(props) {
    const data = props.data;
    const setState = props.setState;

    function selectOption() {
        const inp = document.querySelector('#select-country');

        setState(inp.value);
    }

    return(
        <div>
            <input list="country-list" id="select-country" className="location__select" onChange={(event) => {event.target.value = event.target.value.toUpperCase()}}></input>
            <datalist id="country-list">
                {data.map( (element, index) => {
                    return (
                        <option key={`${index}_${element}`} value={element}>{element}</option>
                    );
                })}
            </datalist>
            <button onClick={() => {selectOption()}}>Select</button>
        </div> 
    );
}

export default SelectCountry;