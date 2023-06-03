const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
  }

 const changeColorFunc = () => {
    btnStart.disabled=true;
    btnStop.disabled = false;
    timerId = setInterval(()=>{
        document.body.style.background = getRandomHexColor()
    }, 1000);
    }

const stopColorFunc = () => {
    btnStart.disabled = false;
    btnStop.disabled = true;
    clearInterval(timerId);
}
 
btnStart.addEventListener('click', changeColorFunc); 
btnStop.addEventListener('click',stopColorFunc);