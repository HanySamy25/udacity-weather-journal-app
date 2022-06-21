/* Global Variables */
const baseURL = "https://api.openweathermap.org/data/2.5/weather?";
const apiKey = '008c3cff6f0e9c1273f2fce8543027ee&units=imperial';

const btnGenerate = document.getElementById('generate');

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();

// function to get weather data
const getWeatherData = async () => {

  const zipCode = document.getElementById('zip');
  const feelings = document.getElementById('feelings').value;

  // check zipCode is not empty   
  if (zipCode.value == "" || zipCode.value == "undefined") { alert('Please Enter Zip Code !!'); zipCode.focus(); return false; }

  // get temp data from openWeather site
  const res = await fetch(`${baseURL}zip=${zipCode.value}&appid=${apiKey}`)
  try {

    const data = await res.json();
    if (data.cod != 200)
      return alert(data.message);

    // -----save tempData to server
    const tempData = { newDate, temp: data.main.temp, feelings }
          saveDataOnServer('/postData',tempData).then(()=>updateUi());

  } catch (error) {

    console.log("error", error);

  }
}

// add event lisenter to btngenearat to call function getweatherdata
btnGenerate.addEventListener('click', getWeatherData);


// save data on server
saveDataOnServer = async (url = '',tempData = {})=> {
  const resp = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(tempData)

  });



  try {
    
    if (!resp.ok) {
      alert('Not Saved'); return;
    }
   
    
   
  } catch (error) {
    console.log(error);
  }
}


// updateing data in ui
const updateUi = async  () => {

  // get data from server
  const request = await fetch('/allData');

  try {

    const tempData = await request.json()
    // Write updated data to DOM elements
    document.getElementById("date").innerHTML = `<strong>Date:</strong> ${tempData.newDate}`;
    document.getElementById('temp').innerHTML = `<strong>Temp:</strong> ${Math.round(tempData.temp)} degrees`;
    document.getElementById('content').innerHTML = tempData.feelings ? `<strong>Feelings:</strong> ${tempData.feelings}` : '';
  }
  catch (error) {
    // appropriately handle the error
    console.log("error", error);
  }
}














