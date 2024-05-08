const generateInitialState = (size: number) => {
  const initial = new Array(size);
  for (let i = 0; i < size; i++) {
    const layer = i;
    // const layer = Math.ceil(i / 10);
    initial[i] = new Array(size);
    let limitLive = 10;

    for (let j = 0; j < size; j++) {
      if (layer % 2 === 0) {
        limitLive--;
        initial[i][j] = limitLive > 0 ? Math.round(Math.random()) : 0;
      } else {
        initial[i][j] = 0;
      }
    }
  }

  return initial;
};
const generateInit = (size: number) => {
  const init = new Array(size);
  for (let i = 0; i < size; i++) {
    init[i] = new Array(size);
    for (let j = 0; j < size; j++) {
      init[i][j] = 0;
    }
  }

  return init;
};

export { generateInitialState, generateInit };
