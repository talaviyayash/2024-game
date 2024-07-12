export const createArray = (num, insertData) => {
  const newArray = [];
  for (let index = 0; index < num; index++) {
    newArray.push(insertData);
  }
  return newArray;
};

export const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
};
