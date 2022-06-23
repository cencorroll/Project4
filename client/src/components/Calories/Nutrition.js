
// import React, { useState, useEffect } from 'react'
// import axios from 'axios'

// const nutritionix   = require("nutritionix-api");

// const YOUR_APP_ID   = '99e19e1c'; // Your APP ID
// const YOUR_API_KEY  = '3fc3155b37ae55a2abc1b041ad384159'; // Your KEY

// nutritionix.init(YOUR_APP_ID,YOUR_API_KEY);

// nutritionix.natural.search('Apple').then(result => {
//   console.log(result);
// })

// export default function Nutrition() {

//   const [information, setInformation] = useState([])

//   useEffect(() => {
//     const getInformation = async () => {
//       try {
//         const { data } = await axios.get('https://trackapi.nutritionix.com/v2/natural/exercise')
//         console.log(data)
//         setInformation(data)
//       } catch (error) {
//         console.log(error.response.data)
//       }
//     }
//     getInformation()
//   }, [])

//   return (
//     <div>Nutrition</div>
//   )
// }
