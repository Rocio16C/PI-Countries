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
} from '../actions/actionTypes.js';

const initialState = {
    countries: [],
    allCountries: [],
    countryDetail: {},
    activities: [],
    nameError: '',
    isLoading: undefined,
};

export default function reducer(state = initialState, {type, payload}){
    switch(type){
        case GET_COUNTRIES:
            return {
                ...state,
                countries: payload,
                allCountries: payload,
            };
        case GET_COUNTRY_DETAIL:
            return {
                ...state,
                countryDetail: payload,
            };
        case GET_COUNTRY_NAME:
            return {
                ...state,
                countries: payload,
            };
        case CLEAR_STATE:
            return {
                ...state,
                countryDetail: {},
            };
        case GET_COUNTRY_NAME_ERROR:
            return {
                ...state,
                nameError: payload,
            };
        case CLEAR_NAME_ERROR:
            return {
                ...state,
                nameError: ''
            };
        case FILTER_BY_CONTINENT:
            const allCountries = state.allCountries
            const continentFilter = payload === 'All Continents' ? allCountries : allCountries.filter(country => country.continent === payload)
            return {
                ...state,
                countries: continentFilter,
            };
        case GET_ACTIVITIES:
            return {
                ...state,
                activities: payload
            };
        case FILTER_BY_ACTIVITY:
            const totalCountries = state.allCountries
            const allActivities = totalCountries.filter(country => {
                return country.Activities.map(activity => activity.name).includes(payload)
            });
            const activitiesFilter = payload === 'All Activities' 
            ? totalCountries : allActivities
            return {
                ...state,
                countries: activitiesFilter,
            };
        case ORDER_BY_NAME:
            const copyCountries = [...state.countries]
            const orderByName = payload === 'Ascending' ?
            copyCountries.sort(function (a, b){
                if(a.name < b.name){
                    return -1
                }
                if(a.name > b.name){
                    return 1
                }
                return 0
            }) :
            copyCountries.sort(function (a, b){
                if(a.name < b.name){
                    return 1
                }
                if(a.name > b.name){
                    return -1
                }
                return 0
            });
            return {
                ...state,
                countries: payload === 'Nothing' ? state.allCountries : orderByName,
            };
        case ORDER_BY_POPULATION:
            const copyAllCountries = [...state.countries]
            const orderByPopulation = payload === 'Lower' ? copyAllCountries.sort(function (a, b){
                if(a.population < b.population){
                    return -1
                }
                if(a.population > b.population){
                    return 1
                }
                return 0
            }) :
            copyAllCountries.sort(function (a, b){
                if(a.population < b.population){
                    return 1
                }
                if(a.population > b.population){
                    return -1
                }
                return 0
            });
            return {
                ...state,
                countries: payload === 'Nothing' ? state.allCountries : orderByPopulation,
            };
        case IS_LOADING:
            return {
                ...state,
                isLoading: payload
            };
        default:
            return state
    }
};