Respiration.Functions.Arrhenius = function (R0, E0, Rg, T0, Ta) {
    var inner = ( (1/T0) - (1/Ta));
    var right = (E0 / Rg) * inner;
    var Rval = R0 * Math.exp(right);
    return Math.round(Rval*1000)/1000;
}