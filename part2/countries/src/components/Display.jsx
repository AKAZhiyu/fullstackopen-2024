const Display = ({ countries }) => {

    if (countries.length === 0) {
        return <div>not found</div>
    } else if (countries.length === 1) {
        const country = countries[0];
        return (
            <div>
                <h1>{country.name.common}</h1>
                <div>capital {country.capital}</div>
                <div>area {country.area}</div>
                <h2>languages:</h2>
                <ul>
                    {Object.values(country.languages).map(lang => <li key={lang}>{lang}</li>)}
                </ul>
            </div>
        );
    } else if (countries.length > 10) {
        return <div>Too many matches, specify another filter</div>
    } else if (countries.length <= 10 && countries.length > 0) {
        return countries.map(country => <div key={country.name.common}>{country.name.common}</div>)
    } else {
        return <div>Some Error Happened......</div>
    }

}

export default Display