function SelectCity(props) {
    const data = props.data.data;
    const cities = props.data.cities;
    const setCityName = props.setState.setCityName;
    const setCoordinates = props.setState.setCoordinates;

    function updateState(event) {
        setCityName(event.target.value);
        
        setCoordinates({
            latitude: data[event.target.value].coord.lat,
            longitude: data[event.target.value].coord.lon
        });
    }

    return(
        <select id="select-city" className="location__select" onChange={(event) => updateState(event)}>
            {cities.map( (element, index) => {
                return (
                    <option key={`${index}_${element}`} value={element}>{element}</option>
                );
            })}
        </select>
    )
}

export default SelectCity;