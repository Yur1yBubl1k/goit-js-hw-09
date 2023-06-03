import Notiflix from 'notiflix';

const formField = document.querySelector('.form')
const firstDelay = document.querySelector('input[name=delay]');
const delayStep = document.querySelector('input[name=step]');
const inputAmount = document.querySelector('input[name=amount]');

function createPromise(position, delay) {
  return new Promise ((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

      setTimeout(() => {
        if (shouldResolve) {
        resolve({position, delay});
        } else {
        reject({position, delay});
        }
      }, delay);
  })
}

function formSubmit(evt) {
  evt.preventDefault();

  const amount = parseInt(inputAmount.value);
  const delay = parseInt(firstDelay.value);
  const step = parseInt(delayStep.value);

  let currentDelay = delay; 

  for (let i = 1; i <= amount; i+=1) {
    createPromise(i, currentDelay)
    .then(({ position, delay }) => {
      Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    }); 

    currentDelay+= step;
  }
};
  
formField.addEventListener('submit', formSubmit)