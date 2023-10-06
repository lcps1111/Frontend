import AsyncStorage from '@react-native-async-storage/async-storage';

//export const serverUrl = 'http://192.168.0.108:8004/';
export const serverUrl = 'http://52.86.173.90:8004/';


export const addToItineraryList = async (itinerary) => {
  try {
    var jsonValue = await AsyncStorage.getItem('itineraryList');
    if (jsonValue != null) {
      var value = JSON.parse(jsonValue);
    } else {
      var value = [];
    }

    //generate random id with length 10
    const id = Math.random().toString(36).substr(2, 10);
    itinerary.id = id;
    value.push(itinerary);
    await AsyncStorage.setItem('itineraryList', JSON.stringify(value));
    console.log('Itinerary added successfully');
    return id;
  } catch (e) {
    console.log('Failed to add itinerary');
  }
};

export const replaceItinerary = async (id, itinerary) => {
  try {
    const jsonValue = await AsyncStorage.getItem('itineraryList');
    if (jsonValue != null) {
      const value = JSON.parse(jsonValue);
      const i = value.findIndex((item) => item.id === id);
      if (i !== -1) {
        value[i]["itineraryData"] = itinerary;
        await AsyncStorage.setItem('itineraryList', JSON.stringify(value));
        console.log('Itinerary replaced successfully');
      } else {
        console.log("Itinerary not found, id:", id);
      }
    }
  } catch (e) {
    console.log('Failed to replace itinerary');
  }
};

export const removeFromItineraryList = async (id) => {
  try {
    const jsonValue = await AsyncStorage.getItem('itineraryList');
    if (jsonValue != null) {
      const value = JSON.parse(jsonValue);
      const newList = value.filter((item) => item.id != id);
      await AsyncStorage.setItem('itineraryList', JSON.stringify(newList));
      console.log('Itinerary removed successfully');
    }
  } catch (e) {
    console.log('Failed to remove itinerary');
  }
};

export const getItinerary = async (id) => {
  await orderItinerayBytime(id);
  await updateLatLng(id);
  try {
    const jsonValue = await AsyncStorage.getItem('itineraryList');
    if (jsonValue != null) {
      var value = JSON.parse(jsonValue);
      var i = value.findIndex((item) => item.id === id);
      if (i !== -1) {
        return value[i]["itineraryData"];
      } else {
        console.log("Itinerary not found, id:", id);
        return null;
      }

    }
  } catch (e) {
    console.log(e);
    console.log('Failed to get itinerary');
  }
}

export const addItinerary = async (id, day, tourist_spot) => {
  try {
    const jsonValue = await AsyncStorage.getItem('itineraryList');

    if (jsonValue != null) {
      var value = JSON.parse(jsonValue);
      var i = value.findIndex((item) => item.id === id);
      if (i !== -1) {
        value[i]["itineraryData"][day].push(tourist_spot);
        await AsyncStorage.setItem('itineraryList', JSON.stringify(value));
      }
      console.log('Spot added to itinerary successfully');
    }
  } catch (e) {
    console.log(e);
    console.log('Failed to add spot to itinerary');
  }
};

export const removeFromItinerary = async (id, day, tourist_spot) => {
  try {
    const jsonValue = await AsyncStorage.getItem('itineraryList');
    if (jsonValue != null) {
      var value = JSON.parse(jsonValue);
      var i = value.findIndex((item) => item.id === id);
      if (i !== -1) {
        value[i]["itineraryData"][day] = value[i]["itineraryData"][day].filter((item) => item.tourist_spot != tourist_spot && item.restaurant != tourist_spot);
        await AsyncStorage.setItem('itineraryList', JSON.stringify(value));
      }
      console.log('Spot removed successfully');
    }
  } catch (e) {
    console.log(e);
    console.log('Failed to remove spot');
  }
};

export const updateLatLng = async (id) => {
  //update fromLat and fromLng as the last spot's lat and lng for each day, current day's last spot's lat and lng is the next day's first spot's lat and lng
  try {
    const jsonValue = await AsyncStorage.getItem('itineraryList');
    if (jsonValue != null) {
      var value = JSON.parse(jsonValue);
      var i = value.findIndex((item) => item.id === id);
      if (i !== -1) {
        const payload = JSON.stringify({
          'location': value[i]['location'] + " Airport",
        });
        const headers = {
          'Content-Type': 'application/json',
        };

        await fetch(serverUrl + "latlng", {
          method: 'POST',
          headers: headers,
          body: payload
        }).then((response) => response.json())
          .then((json) => {
            value[i]["itineraryData"]["Day 1"][0].fromLat = json.lat;
            value[i]["itineraryData"]["Day 1"][0].fromLng = json.lng;
          })


        console.log("value[i]", value[i])
        for (var day in value[i]["itineraryData"]) {
          for (var spot = 0; spot < value[i]["itineraryData"][day].length; spot++) {
            if (spot == 0 && day == "Day 1") {
              continue;
            } else if (spot == 0 && day != "Day 1") {
              // input: Day 2, output: Day 1
              previousDay = "Day " + (parseInt(day.split(" ")[1]) - 1).toString();
              value[i]["itineraryData"][day][spot].fromLat = value[i]["itineraryData"][previousDay][spot].lat;
              value[i]["itineraryData"][day][spot].fromLng = value[i]["itineraryData"][previousDay][spot].lng;
            }
            else {
              value[i]["itineraryData"][day][spot].fromLat = value[i]["itineraryData"][day][spot - 1].lat;
              value[i]["itineraryData"][day][spot].fromLng = value[i]["itineraryData"][day][spot - 1].lng;
            }
          }
        }
        await AsyncStorage.setItem('itineraryList', JSON.stringify(value));
        console.log('Itinerary Lat Lng updated successfully');
      } else {
        console.log("Itinerary update lat lng not found, id:", id);
      }

    }
  }
  catch (e) {
    console.log(e);
    console.log('Failed to update itinerary Lat Lng');
  }
}

const orderItinerayBytime = async (id) => {
  try {
    const jsonValue = await AsyncStorage.getItem('itineraryList');
    if (jsonValue != null) {
      var value = JSON.parse(jsonValue);
      var i = value.findIndex((item) => item.id === id);
      if (i !== -1) {
        //order each day itinerary by time in asending order, time is string originally: 12:00 AM, need to transform back to Date object for compare
        for (var day in value[i]["itineraryData"]) {
          value[i]["itineraryData"][day].sort(function (a, b) {
            const timeA = parseTime(a["suggested_arrival_time"]);
            const timeB = parseTime(b["suggested_arrival_time"]);
            return timeA - timeB;
          });
        }
        await AsyncStorage.setItem('itineraryList', JSON.stringify(value));
        console.log('Itinerary ordered successfully');
      } else {
        console.log("Itinerary order not found, id:", id);
      }

    }
  } catch (e) {
    console.log(e);
    console.log('Failed to order itinerary');
  }
};

export const saveData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
    console.log('Data saved successfully');
  } catch (e) {
    console.log('Failed to save data');
  }
};

export const retrieveData = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    if (jsonValue != null) {
      const value = JSON.parse(jsonValue);
      return value;
    }
  } catch (e) {
    console.log('Failed to retrieve data');
  }
};

export const removeData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    console.log('Data removed successfully');
  } catch (e) {
    console.log('Failed to remove data');
  }
};

export const clearAll = async () => {
  try {
    await AsyncStorage.clear();
    console.log('All data cleared successfully');
  } catch (e) {
    console.log('Failed to clear all data');
  }
};

export const listAllKeys = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    console.log(keys);
    return keys;
  } catch (e) {
    console.log('Failed to list all keys');
  }
}

export function parseTime(timeString) {
  const date = new Date(Date.UTC(1970, 0, 1));
  const parts = timeString.match(/(\d+):(\d+)(\s)?(AM|PM)?/i);

  // If parts is null, timeString did not match the expected format.
  if (!parts) {
    // console.error('timeString did not have the expected format:', timeString);
    // Handle the error in an appropriate way for your application.
    // You might return a default date, throw an error, or return null.
    return date;
  }

  let hours = parseInt(parts[1], 10);
  const minutes = parseInt(parts[2], 10);
  const ampm = parts[4];

  if (ampm) {
    if (hours === 12) {
      hours = 0;
    }
    if (ampm.toUpperCase() === 'PM') {
      hours += 12;
    }
  }

  date.setUTCHours(hours - 8, minutes);
  return date;
}
