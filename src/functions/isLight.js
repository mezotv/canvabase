const isLight = (color) => {
  let r, g, b, color_match, hsp;
  if (color.match(/^rgb/)) {
    color_match = color.match(
      /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/
    );
    r = +color_match[1];
    g = +color_match[2];
    b = +color_match[3];
  } else {
    color_match = +(
      '0x' + color.slice(1).replace(color.length < 5 && /./g, '$&$&')
    );
    r = color_match >> 16;
    g = (color_match >> 8) & 255;
    b = color_match & 255;
  }
  hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b));

  return hsp > 127.5;
};
module.exports = { isLight };
