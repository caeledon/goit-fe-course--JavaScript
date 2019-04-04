const laptops = [
    {
      size: 13,
      color: 'white',
      price: 28000,
      release_date: 2015,
      name: 'Macbook Air White 13"',
      img: 'http://demo.posthemes.com/pos_zadademo/images/placeholder.png',
      descr:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae.',
    },
    {
      size: 13,
      color: 'gray',
      price: 32000,
      release_date: 2016,
      name: 'Macbook Air Gray 13"',
      img: 'http://demo.posthemes.com/pos_zadademo/images/placeholder.png',
      descr:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae.',
    },
    {
      size: 13,
      color: 'black',
      price: 35000,
      release_date: 2017,
      name: 'Macbook Air Black 13"',
      img: 'http://demo.posthemes.com/pos_zadademo/images/placeholder.png',
      descr:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae.',
    },
    {
      size: 15,
      color: 'white',
      price: 45000,
      release_date: 2015,
      name: 'Macbook Air White 15"',
      img: 'http://demo.posthemes.com/pos_zadademo/images/placeholder.png',
      descr:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae.',
    },
    {
      size: 15,
      color: 'gray',
      price: 55000,
      release_date: 2016,
      name: 'Macbook Pro Gray 15"',
      img: 'http://demo.posthemes.com/pos_zadademo/images/placeholder.png',
      descr:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae.',
    },
    {
      size: 15,
      color: 'black',
      price: 45000,
      release_date: 2017,
      name: 'Macbook Pro Black 15"',
      img: 'http://demo.posthemes.com/pos_zadademo/images/placeholder.png',
      descr:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae.',
    },
    {
      size: 17,
      color: 'white',
      price: 65000,
      release_date: 2015,
      name: 'Macbook Air White 17"',
      img: 'http://demo.posthemes.com/pos_zadademo/images/placeholder.png',
      descr:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae.',
    },
    {
      size: 17,
      color: 'gray',
      price: 75000,
      release_date: 2016,
      name: 'Macbook Pro Gray 17"',
      img: 'http://demo.posthemes.com/pos_zadademo/images/placeholder.png',
      descr:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae.',
    },
    {
      size: 17,
      color: 'black',
      price: 80000,
      release_date: 2017,
      name: 'Macbook Pro Black 17"',
      img: 'http://demo.posthemes.com/pos_zadademo/images/placeholder.png',
      descr:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae.',
    },
  ];

const productsList = document.querySelector('.products-list');
const btnFilter = document.querySelector('.js-filter');
const btnReset = document.querySelector('.js-reset');
const form = document.querySelector('.js-form')

const source = document.querySelector('#product-card').innerHTML.trim();
const template = Handlebars.compile(source);
const markup = laptops.reduce((acc,laptop) => acc + template(laptop),'');

productsList.insertAdjacentHTML('afterbegin', markup);

form.addEventListener('submit', filterLaptops);

function filterLaptops(e){
  e.preventDefault();

function sample(name) {
  if(name === 'size' || name === 'release_date'){
  return Array.from(form.querySelectorAll('input'))
    .filter(item => item.name === name && item.checked)
    .map(item => Number(item.value));
  } else {
    return Array.from(form.querySelectorAll('input'))
    .filter(item => item.name === name && item.checked)
    .map(item => (item.value));
  }
}

let size = sample('size');
let color = sample('color');
let releaseDate = sample('release_date');

  const filteredCards = laptops
  .filter(item => size.length === 0 ? item :  size.includes(item.size))
  .filter(item => color.length === 0 ? item : color.includes(item.color))
  .filter(item => releaseDate.length === 0 ? item : releaseDate.includes(item.release_date));

  console.log(filteredCards);

  productsList.innerHTML = [];
  const newMarkup = filteredCards.reduce((acc,laptop) => acc + template(laptop),'');
  if (filteredCards.length === 0){
    const err = document.createElement('p');
    err.classList.add('err');
    err.textContent = `no match found! please try again!`;
    productsList.appendChild(err)
  }
  productsList.insertAdjacentHTML('afterbegin', newMarkup);
}


btnReset.addEventListener('click', onReset);

function onReset(e){
  e.preventDefault();
  productsList.innerHTML = [];
  productsList.insertAdjacentHTML('afterbegin', markup);
  Array.from(form.querySelectorAll("input")).forEach(item => (item.checked ? item.checked = false : null));
}
