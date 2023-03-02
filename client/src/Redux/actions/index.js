import { 
    GET_COUNTRIES, 
    GET_COUNTRY_DETAIL, 
    CLEAR_STATE, 
    GET_COUNTRY_NAME, 
    GET_COUNTRY_NAME_ERROR,
    FILTER_BY_CONTINENT,
    GET_ACTIVITIES,
    FILTER_BY_ACTIVITY,
    ORDER_BY_NAME,
    ORDER_BY_POPULATION,
    IS_LOADING,
    CLEAR_NAME_ERROR,
} from './actionTypes.js';
import axios from 'axios';

export const getCountries = () => {
    return async (dispatch) => {
            const allCountries = (await axios.get('http://localhost:3001/countries')).data
            dispatch({type: GET_COUNTRIES, payload: allCountries})
    };
};

export const getCountryId = (id) => {
    return async (dispatch) => {
        const countryId = (await axios.get(`http://localhost:3001/countries/${id}`)).data
        dispatch({type: GET_COUNTRY_DETAIL, payload: countryId})
    };
};

export const getCountryName = (name) => {
    return async (dispatch) => {
        try {
            const countryName = (await axios.get(`http://localhost:3001/countries?name=${name}`)).data
            dispatch({type: GET_COUNTRY_NAME, payload: countryName})
        } catch (error) {
            dispatch({type: GET_COUNTRY_NAME_ERROR, payload: error.response.data})
        }
    };
};

export const clearNameError = () => {
    return {
        type: CLEAR_NAME_ERROR
    };
};

export const clearState = () => {
    return {
        type: CLEAR_STATE
    };
};

export const continentFilter = (payload) => {
    return {
        type: FILTER_BY_CONTINENT,
        payload
    };
};

export const getActivities = () => {
    return async (dispatch) => {
        const allActivities = (await axios.get('http://localhost:3001/activities')).data
        dispatch({type: GET_ACTIVITIES, payload: allActivities})
    };
};

export const activitiesFilter = (payload) => {
    return {
        type: FILTER_BY_ACTIVITY,
        payload
    };
};

export const orderByName = (payload) => {
    return {
        type: ORDER_BY_NAME,
        payload
    };
};

export const orderByPopulation = (payload) => {
    return {
        type: ORDER_BY_POPULATION,
        payload
    };
};

export const isLoading = () => {
    return (dispatch) => {
        dispatch({type: IS_LOADING, payload: true})
        setTimeout(() => {
            dispatch({type: IS_LOADING, payload: false})
        }, 1500)
    };
};


