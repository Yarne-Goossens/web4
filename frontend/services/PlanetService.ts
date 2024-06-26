const planetApiURL = process.env.NEXT_PUBLIC_API_URL_PLANET;

const getAllPlanets=()=>{
    const token=sessionStorage.getItem('token')
    
    return fetch(`${planetApiURL}/planetoverview`,{
        method:'GET',
        headers:{
            Authorization:`Bearer ${token}`,
            'Content-Type':'application/json'
            
        },})
}
const getPlanetWithId=(planet_id:any)=>{
    const token=sessionStorage.getItem('token')
    return fetch(`${planetApiURL}/getplanetwithid/${planet_id}`, {
    method: 'GET',
    headers: {
        Authorization:`Bearer ${token}`,
      'Content-Type': 'application/json'
    }})
}
const deletePlanet=(planet_id:any)=>{
    const token=sessionStorage.getItem('token')
    return fetch(`${planetApiURL}/deleteplanet/${planet_id}`,{
        method:'DELETE',
        headers:{
            Authorization:`Bearer ${token}`,
            'Content-Type':'application/json'
        }
    })
}
const addPlanet=(planet:any)=>{
    const token=sessionStorage.getItem('token')
    return fetch(`${planetApiURL}/addplanet`,{
        method:'POST',
        headers:{
            Authorization:`Bearer ${token}`,
            'Content-Type':'application/json'
        },
        body:JSON.stringify(planet)
    })
}
const editPlanet=(planet:any,planet_id:any)=>{
    const token=sessionStorage.getItem('token')
    return fetch(`${planetApiURL}/editplanet/${planet_id}`,{
        method:'PUT',
        headers:{
            Authorization:`Bearer ${token}`,
            'Content-Type':'application/json'
        },
        body:JSON.stringify(planet)
    })
}
const buyPlanet=(planet_id:any,account_id:any)=>{
    const token=sessionStorage.getItem('token')
    return fetch(`${planetApiURL}/buyplanet/${planet_id}/to/${account_id}`,{
        method:'PUT',
        headers:{
            Authorization:`Bearer ${token}`,
            'Content-Type':'application/json'
        }
    })
}

const sellPlanet=(planet_id:any,account_id:any)=>{
    const token=sessionStorage.getItem('token')
    return fetch(`${planetApiURL}/sellplanet/${planet_id}/from/${account_id}`,{
        method:'PUT',
        headers:{
            Authorization:`Bearer ${token}`,
            'Content-Type':'application/json'
        }
    })
}
const PlanetService={
    getAllPlanets,
    addPlanet,deletePlanet,getPlanetWithId,editPlanet,buyPlanet,sellPlanet
}


export default PlanetService