function scaleLinear(opts) {
    const istart = opts.domain[0],
        istop = opts.domain[1],
        ostart = opts.range[0],
        ostop = opts.range[1];

    return function scale(value) {
        return ostart + (ostop - ostart) * ((value - istart) / (istop - istart));
    }
};


module.exports = { scaleLinear }