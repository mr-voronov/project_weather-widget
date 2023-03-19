function SelectCity(props) {
    const data = props.data.data;
    const cities = props.data.cities;
    const setCityName = props.setState.setCityName;
    const setCoordinates = props.setState.setCoordinates; // props from App.js


    function selectOption() {
        const inp = document.querySelector('#select-city');

        setCityName(inp.value);
        
        // updates props in App.js
        setCoordinates({
            latitude: data.get(inp.value).coord.lat,
            longitude: data.get(inp.value).coord.lon

            // Error (API): status: 400, text: Bad Request
            // latitude: {},
            // longitude: {}
        });
    }

    return(
        <div>
            <input list="city-list" id="select-city" className="location__select" ></input>
            <datalist id="city-list">
                {cities.map( (element, index) => {
                    return (
                        <option key={`${index}_${element}`} value={element}>{element}</option>
                    );
                })}
            </datalist>
            <button onClick={() => {selectOption()}}>Select</button>
        </div>
    )
}

export default SelectCity;