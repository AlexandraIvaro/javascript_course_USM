/**
   * @description function to get random activity from API and update HTML doc
   * @throws {Error} in case of error updates HTML doc with error message
   * @returns {String} a random activity option string
   */

export async function getRandomActivity() {
    try {
        const response = await fetch("https://bored-api.appbrewery.com/random");
        if (!response.ok) {
          throw new Error("К сожалению, произошла ошибка");
        }
    
        const json = await response.json();
        console.log(json.activity);
        // document.getElementById("activity").textContent = json.activity;
        return json.activity;
      } catch (error) {
        console.error(error.message);
        // document.getElementById("activity").textContent = error.message;
      }
}

// getRandomActivity();







