async function getForecast(latitude, longitude) {
    const url = "https://api.openweathermap.org/data/2.5/forecast?";

    const response = await fetch(`${url}lat=${latitude}&lon=${longitude}&units=metric&appid=271c873e4fe3f9efc3dbed3d931af60b`);

    // throw new Error("undefined error");
    
    if (!response.ok) {
        const message = `status: ${response.status}, text: ${response.statusText}`;

        throw new Error(message);
    } else {
        const data = await response.json();

        return data;
    }
}

export default getForecast;