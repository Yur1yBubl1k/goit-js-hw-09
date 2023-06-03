import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const startBtn = document.querySelector('[data-start]')
const inputDate = document.getElementById('datetime-picker');
const fieldsHour = document.querySelector('[data-hours]');
const fieldMin =document.querySelector('[data-minutes]');
const fieldSec =document.querySelector('[data-seconds]');
const fieldDay =document.querySelector('[data-days]');

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      console.log(selectedDates[0]);

      const selectedDate = new Date(selectedDates[0]).valueOf();
      const currentDate = Date.now();

      if (selectedDate <= currentDate) {
        alert('Please choose a date in the future');
        startBtn.disabled = true;
      } else {
        startBtn.disabled = false;
      }
    },
  };
flatpickr(inputDate, options)

startBtn.addEventListener('click', ()=> {
  startBtn.disabled = true;
      const  inputPlace = inputDate.value;
      const selectedDate = new Date(inputPlace).valueOf();
      
      const interval = setInterval(()=> {
        const currentDate = Date.now();
        let timeExist = selectedDate-currentDate;
        if (currentDate > selectedDate) {
          clearInterval(interval);
          timeExist = 0;
        }
        const {days, hours, minutes, seconds} = convertMs(timeExist);
        fieldDay.textContent = addLeadingZero(days);
        fieldMin.textContent = addLeadingZero(minutes);
        fieldSec.textContent = addLeadingZero(seconds);
        fieldsHour.textContent = addLeadingZero(hours);
    }, 1000)
})
 
function addLeadingZero (value) {
   return String(value).padStart(2,"0");
  
}

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  

    return { days, hours, minutes, seconds };

  }
  
  