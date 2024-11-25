import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

function createPromise(result, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (result === 'fulfilled') {
        resolve(`Fulfilled promise in ${delay} ms`);
      } else {
        reject(`Rejected promise in ${delay} ms`);
      }
    }, delay);
  });
}


const subBTN = document.querySelector(".subBTN");

subBTN.addEventListener("click", (event) => {
    event.preventDefault();

    const selectedResult = document.querySelector('input[name="state"]:checked');
    const delayValue = document.querySelector(".inputField").value;

    if (!selectedResult) {
        iziToast.warning({
            title: "Caution", message: "You forgot important data!",
            iconUrl: "../img/caution.svg",
            titleColor: 'white', 
            messageColor: 'white', 
         color: "#FFA000"});
        return;
    }

    if (!delayValue)
    {iziToast.warning({
            title: "Caution", message: "You forgot important data!",
            iconUrl: "../img/caution.svg",
            titleColor: 'white', 
            messageColor: 'white', 
         color: "#FFA000"});
        return;
    }

    createPromise(selectedResult.value, delayValue)
        .then((message) => {
            iziToast.success({
                title: "Ok", message,
                iconUrl: "../img/ok.svg",
                titleColor: 'white', 
            messageColor: 'white', 
         color: "#59A10D" });
        })
        .catch((error) => {
            iziToast.error({ title: "Error", message: error,iconUrl: "../img/error.svg",
                titleColor: 'white', 
            messageColor: 'white', 
         color: "#EF4040" });
        });
});
