import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';


export default function City() {
    const {cityName} = useParams()
    console.log(cityName)

return(
    <>
        <h1>Welcome to {cityName}</h1>
    </>
)

}