import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";




const startBTN = document.querySelector("button[data-start]");

const inputField = document.querySelector("#datetime-picker");
startBTN.disabled = true;
let timer;
let userSelectedDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];

   
    if (userSelectedDate && userSelectedDate.getTime() < Date.now()) {
      startBTN.disabled = true; 
      iziToast.error({
        title: "Error",
        message: "Please choose a date in the future",
        iconUrl: "../img/error.svg",
        titleColor: 'white', 
        messageColor: 'white', 
         color: "#ef4040",
});
    } else {
      startBTN.disabled = false; 
    }
  },
};


const pad = (value) => {
  
  return value < 10 ? '0' + value : value;
};

flatpickr('#datetime-picker', options);

startBTN.addEventListener("click", function() {
  if (userSelectedDate) {
    timerChanger(userSelectedDate);
  }
});


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



function timerChanger(userSelectedDate) {

    if (timer) { 
        clearInterval(timer);
    }
   
    
    timer = setInterval(() => {
    const currTime = Date.now();
    const timeDiff = userSelectedDate - currTime;
        
        if (timeDiff <= 0) {
            clearInterval(timer);
    
        }
        else { 
          startBTN.disabled = true;
          inputField.disabled = true;
          inputField.style.cursor = "default";
            const { days, hours, minutes, seconds } = convertMs(timeDiff);
        document.querySelector("[data-days]").innerText = pad(days);
        document.querySelector("[data-hours]").innerText = pad(hours);
        document.querySelector("[data-minutes]").innerText = pad(minutes);
        document.querySelector("[data-seconds]").innerText = pad(seconds);    

        }
   }, 1000);
    
     
}
