export const timeFormat = (t: number): string => {
  var hms = '';
  var h = (t / 3600) | 0;
  var m = ((t % 3600) / 60) | 0;
  var s = t % 60;

  if (h != 0) {
    hms = h + ':' + zeroFill(m) + ':' + zeroFill(s);
  } else if (m != 0) {
    hms = '00:' + zeroFill(m) + ':' + zeroFill(s);
  } else {
    hms = '00:00:' + zeroFill(s);
  }
  return hms;
};

const zeroFill = (v: number) => {
  return v < 10 ? '0' + v : v;
};
