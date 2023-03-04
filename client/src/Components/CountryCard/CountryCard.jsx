import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCountryId, clearState } from "../../Redux/actions";


function CountryCard(){

    const {id} = useParams();
    const dispatch = useDispatch();
    const country = useSelector(state => state.countryDetail);

    useEffect(() => {
        dispatch(getCountryId(id))

        return () => {
            dispatch(clearState())
        }
    }, [dispatch, id]);

    return (
        <div>
            {country.id && <h4>ID: {country.id}</h4>}
            {country.name && <h4>Country Name: {country.name}</h4>}
            {country.flag_image && <img src={country.flag_image} alt={country.name}/>}
            {country.Continent && <h4>Continent: {country.continent}</h4>}
            {country.capital && <h4>Capital: {country.capital}</h4>}
            {country.subregion && <h4>Subregion: {country.subregion}</h4>}
            {country.area >= 0 && <h4>Area: {country.area}</h4>}
            {country.population >= 0 && <h4>Population: {country.population}</h4>}
            <ol>
                {country.Activities && country.Activities.map(activity => {
                <h4>Activities:</h4>
                    return (
                    <li key={activity.id}>
                        <p>Name: {activity.name}</p>
                        <p>Difficulty: {activity.difficulty}</p>
                        <p>Duration: {activity.duration}</p>
                        <p>Season: {activity.season}</p>
                    </li>
                    )
                })}
            </ol>
        </div>
    );
};

export default CountryCard;