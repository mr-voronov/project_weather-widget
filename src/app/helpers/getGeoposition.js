async function getGeoposition() {
    const data = await new Promise((resolve, reject) => {
        // throw new Error("Geolocation API is not supported in your browser");

        if (!navigator.geolocation) {
            throw new Error("Geolocation API is not supported in your browser");
        } else {
            const options = {"enableHighAccuracy": true};

            function success(pos) {
                resolve(pos);
            }

            function error(err) {
                reject(new Error(`${err.code}: ${err.message}`));
            }

            navigator.geolocation.getCurrentPosition(success, error, options);
        }
    });

    return data;
}

export default getGeoposition;