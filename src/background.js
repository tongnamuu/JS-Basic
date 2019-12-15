const body = document.querySelector("body");

const IMAGE_NUMBER = 5;

function paintImage(number) {
  const image = new Image();
  image.src = `img/${number}.jpg`;
  image.classList.add("bgImage");
  body.prepend(image);
}

function genRandom() {
  return Math.floor(Math.random() * IMAGE_NUMBER) + 1;
}
function init() {
  const number = genRandom();
  paintImage(number);
}

init();
