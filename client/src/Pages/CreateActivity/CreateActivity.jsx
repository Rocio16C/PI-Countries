import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { validate } from "./Validate";
import { getCountries } from "../../Redux/actions";
import axios from "axios";
import styles from "./CreateActivity.module.css"

function CreateActivity(){
    
    const dispatch = useDispatch();
    const allCountries = useSelector(state => state.countries)
 
    useEffect(() => {
        dispatch(getCountries())
    }, [dispatch])

    const [newActivity, setNewActivity] = useState({
        name:'',
        difficulty:'',
        duration:'',
        season:'',
        countries:[],
    });

    const [error, setError] = useState({
        name:'',
        difficulty:'',
        duration:'',
        season:'',
        countries:'',
    });

    const [showErrors, setShowErrors] = useState({
        name:false,
        difficulty:false,
        duration:false,
        season:false,
        countries:false,
    });

    const [serverResponse, setServerResponse] = useState('');
    
    const handleOnChange = (event) => {
        const name = event.target.name
        const value = event.target.value
        const checked = event.target.checked

        if(name === "countries"){
            if(checked){
                setNewActivity({
                    ...newActivity,
                    countries: [...newActivity.countries, value],
                });
            } else {
                setNewActivity({
                    ...newActivity,
                    countries: (newActivity.countries.filter(countryId => countryId !== value)),
                })
            }
        } else {
            setNewActivity({
                ...newActivity,
                [name]: value,
            })
        }
        setShowErrors({...showErrors, [name]: true});
    };

    useEffect(() => {
        setError(validate(newActivity))
    }, [newActivity])


    function handleSubmit(event){
        event.preventDefault();
        if(newActivity.name && newActivity.difficulty && newActivity.season && Object.values(error).every(value => value === '')){
            axios.post('http://localhost:3001/activities', newActivity)
            .then(response => {
                setServerResponse(response.data)
                if(response.data === 'Activity created successfully'){
                    event.target.reset();
                    setNewActivity({
                        name: '',
                        difficulty: '',
                        duration: '',
                        season: '',
                        countries: [],
                    })
                }
            })
            .catch(error => setServerResponse(error.response.data))
        }
    };

    function handleBeforeUnload(event){
        event.preventDefault();
        event.returnValue = "";
    };

    useEffect(() => {
        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload)
        }
    }, [])

    const notErrors = Object.values(error).every(value => value === '')

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <span>
                    Create Activity
                    {serverResponse && <p>{serverResponse}</p>}
                </span>
            </header>
            <br/>
            
            <form onSubmit={handleSubmit} className={styles.form}>

                <div>
                    <label htmlFor="name">Name of Activity *</label>
                    <input
                    type="text"
                    name="name"
                    value={newActivity.name || ''}
                    onChange={handleOnChange}
                    className={error && styles.error}
                    />
                    {showErrors.name && (error.name && <p className={styles.error}>{error.name}</p>)}
                </div>
                
                <br/>

                <div>
                    <label htmlFor="difficulty">Difficulty *</label>
                    <input 
                    type="number"
                    min="1"
                    max="5"
                    name="difficulty"
                    value={newActivity.difficulty}
                    onChange={handleOnChange}
                    className={error && styles.error}
                    />
                    {showErrors.difficulty && (error.difficulty && <p className={styles.error}>{error.difficulty}</p>)}
                </div>

                <br/>

                <div>
                    <label htmlFor="duration">Duration</label>
                    <input
                    type="text"
                    name="duration"
                    value={newActivity.duration}
                    onChange={handleOnChange}
                    className={error && styles.error}
                    /> <label>hours</label>
                    {showErrors.duration && (error.duration && <p className={styles.error}>{error.duration}</p>)}
                </div>

                <br/>

                <div>
                    <label htmlFor="season">Season *</label>
                    <select id="season" name="season" onChange={handleOnChange} className={error && styles.error}>
                        <option></option>
                        <option value='Summer'>Summer</option>
                        <option value='Autumn'>Autumn</option>
                        <option value='Winter'>Winter</option>
                        <option value='Spring'>Spring</option>
                    </select>
                    {error.season && <p className={styles.error}>{error.season}</p>}
                </div>

                <br/>

                <div className={styles.scroll}>

                   <p className={styles.countriestitle}>Countries *</p>
                   {error.countries && <p className={styles.error}>{error.countries}</p>}

                    {allCountries && allCountries.map(country => {
                        return (
                        <div className={styles.column}>
                            <div key={country.id} className={styles.list}>
                                <div className={styles.item}>
                                    <input
                                    type="checkbox"
                                    name="countries"
                                    value={country.id || ''}
                                    id={country.id}
                                    onChange={handleOnChange}
                                    className={error && styles.error}
                                    />
                                    <label htmlFor={country.id} className={styles.label}>{country.name}</label>
                                </div>
                            </div>
                        </div>
                        )
                    })}
                </div>

                {notErrors ? <button type="submit" className={styles.submit}><span className={styles.titlesubmit}>CREATE ACTIVITY</span></button> : <p className={styles.message}>Apparently there are still errors</p>}
            </form>
        </div>
    );
};

export default CreateActivity;