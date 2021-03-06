 export const randomColor = () => `rgb(${randomNum()}, ${randomNum()}, ${randomNum()}, 0.3)`

 const randomNum = () => Math.random() * (255 - 0) + 0;

