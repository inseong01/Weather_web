const inputSkyCode = (skyCode) => {
  let name = '';
  switch (true) {
    case skyCode === 1 :
      name = 'sunny';
      break;
    case skyCode === 3 :
      name = "cloud";
      break;
    case skyCode === 4 :
      name = "cloudy"
      break;
    default :
      console.log('skyCode error')
      return;
  }
  return name;
}

export default inputSkyCode