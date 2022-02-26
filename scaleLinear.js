function scaleLinear(opts) {
  const istart = opts.domain[0];
  const istop = opts.domain[1];
  const ostart = opts.range[0];
  const ostop = opts.range[1];

  return function scale(value) {
    return ostart + (ostop - ostart) * ((value - istart) / (istop - istart));
  };
}

module.exports = { scaleLinear };
