import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { continentFilter, getActivities, activitiesFilter, orderByName, orderByPopulation } from "../../Redux/actions/index.js";
import styles from "./ButtonFilter.module.css"
import flecha from "./../../flecha.png"

function ButtonFilter({setCurrentPage, setMinPageNumberLimit, setMaxPageNumberLimit}){

    const dispatch = useDispatch();
    const { activities } = useSelector(state => state)
    const arrActivities = activities && activities.map(activity => {
        return (
            activity.name
        )
    });
    const activityName = [...new Set(arrActivities)]


    useEffect(() => {
        dispatch(getActivities())
    }, [dispatch])

    const handleContinentFilter = (event) => {
        dispatch(continentFilter(event.target.value))
        setCurrentPage(1)
        setMinPageNumberLimit(0)
        setMaxPageNumberLimit(5)
    };

    const handleActivitiesFilter = (event) => {
        dispatch(activitiesFilter(event.target.value))
        setCurrentPage(1)
        setMinPageNumberLimit(0)
        setMaxPageNumberLimit(5)
    };

    const handleOrderByName = (event) => {
        dispatch(orderByName(event.target.value))
        setCurrentPage(1)
        setMinPageNumberLimit(0)
        setMaxPageNumberLimit(5)
    };

    const handleOrderByPopulation = (event) => {
        dispatch(orderByPopulation(event.target.value))
        setCurrentPage(1)
        setMinPageNumberLimit(0)
        setMaxPageNumberLimit(5)
    };

    return (
        <div className={styles.container}>
            <div className={styles.selectbox}>
                <p className={styles.tittles}>FILTER BY CONTINENT:</p>
            <select className={styles.select} onChange={(event) => handleContinentFilter(event)}>
                <option value="All Continents">All Continents</option>
                <option value='Europe'>Europe</option>
                <option value='North America'>North America</option>
                <option value='South America'>South America</option>
                <option value='Antarctica'>Antarctica</option>
                <option value='Asia'>Asia</option>
                <option value='Africa'>Africa</option>
                <option value='Oceania'>Oceania</option>
            </select>
            <div className={styles.iconcontainer}>
                <img className={styles.icon} src={flecha} alt="Deploy..."/>
            </div>
            </div>

            <div className={styles.selectbox}>
                <p className={styles.tittles}>FILTER BY ACTIVITY:</p>
            <select className={styles.select} onChange={(event) => handleActivitiesFilter(event)}>
                <option value='All Activities'>All Activities</option>
                {activityName && activityName.map(name => {
                    return (
                        <option key={name} value={name}>{name}</option>
                    )
                })}
            </select>
            <div className={styles.iconcontainer}>
                <img className={styles.icon} src={flecha} alt="Deploy..."/>
            </div>
            </div>

            <div className={styles.selectbox}>
                <p className={styles.tittles}>SORT BY COUNTRY NAME</p>
            <select className={styles.select} onChange={(event => handleOrderByName(event))}>
                <option value='Nothing'>Nothing</option>
                <option value='Ascending'>Ascending</option>
                <option value='Descending'>Descending</option>
            </select>
            <div className={styles.iconcontainer}>
                <img className={styles.icon} src={flecha} alt="Deploy..."/>
            </div>
            </div>

            <div className={styles.selectbox}>
                <p className={styles.tittles}>SORT BY COUNTRY POPULATION:</p>
            <select className={styles.select} onChange={(event => handleOrderByPopulation(event))}>
                <option value='Nothing'>Nothing</option>
                <option value='Higher'>Higher</option>
                <option value='Lower'>Lower</option>
            </select>
            <div className={styles.iconcontainer}>
                <img className={styles.icon} src={flecha} alt="Deploy..."/>
            </div>
            </div>

        </div>
    )
}

export default ButtonFilter;