// import { useState } from 'react'
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function App() {
  const weatherKey = import.meta.env.VITE_WEATHER_API_KEY;
  const unsplashKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

  return (
    <>
      <h3>The Weather App BABY!</h3>
    </>
  )
}


// NOTE: Checklist for UNSPLASH
// Hotlink photos so photos must be hotlinked to the original image URL on Unsplash
// Attribute photographer and Unsplash, photographer’s full name and Unsplash are properly attributed and linked (ex: Photo by Annie Spratt on Unsplash)