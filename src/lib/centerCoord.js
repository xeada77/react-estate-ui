export const centerCoord = (items) => {
  //console.log(items);
  const centerPos = [
    parseFloat(items[0].latitude),
    parseFloat(items[0].longitude),
  ];
  items.map((item) => {
    centerPos[0] = (centerPos[0] + parseFloat(item.latitude)) / 2;
    centerPos[1] = (centerPos[1] + parseFloat(item.longitude)) / 2;
  });
  //console.log(centerPos);
  return centerPos;
};
