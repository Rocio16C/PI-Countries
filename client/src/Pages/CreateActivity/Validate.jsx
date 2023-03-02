export function validate(state, touch){
    const error = {}

    if(!state.name){
        error.name = 'Activity name is required'
    } else if(!/^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s()-]+$/.test(state.name)){
        error.name = 'The name cannot contain symbols, only - and ()'
    } else if(!/^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s()-]{1,60}$/.test(state.name)){
        error.name = 'The name is too long'
    }

    if(!state.difficulty){
        error.difficulty = 'Difficulty is required'
    } else if(!/^[1-5]$/.test(state.difficulty)){
        error.difficulty = 'Health score must be from 1 to 5'
    }

    if(!state.duration){
        error.duration = ''
    } else if(!/^[0-9]([0-9]*(\.[0-9]{1,2})?)?$/.test(state.duration)){
        error.duration = 'The duration must be in hours'
    }
    
    if(!state.season){
        error.season = 'Season is required'
    } else if(state.season !== "Summer" && state.season !== "Autumn" && state.season !== "Winter" && state.season !== "Spring"){
        error.season = 'The season can only be "Summer" or "Autumn" or "Winter" or "Spring"'
    }

    if(state.countries.length === 0){
        error.countries = 'Select at least one country'
    }

    return error
}