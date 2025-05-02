import {getRandomActivity} from "./activity.js";

/**
   * @description function to call getRandomActivity and update HTML doc and refresh page
   * @throws {error} in case of error updates HTML doc with error message
   */

function updateActivity() {
    try {
        const updatedData = getRandomActivity();
        console.log(updatedData);
        document.getElementById("activity").textContent = updatedData;
    } catch (error) {
        document.getElementById("activity").textContent = "К сожалению, произошла ошибка";
    } finally {
        setTimeout(updateActivity, 60000);
    }
}


updateActivity();