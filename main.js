function toRect(magnitude, angleDeg) {
  const angleRad = angleDeg * Math.PI / 180;
  return math.complex({
    re: magnitude * Math.cos(angleRad),
    im: magnitude * Math.sin(angleRad)
  });
}

function calcularDesequilibrio(i1, i2, i3, divisor) {
  const a = math.complex({ re: -0.5, im: Math.sqrt(3)/2 });  // 120°
  const a2 = math.complex({ re: -0.5, im: -Math.sqrt(3)/2 }); // 240°

  const I_pos = math.divide(math.add(i1, math.multiply(a, i2), math.multiply(a2, i3)), 3);
  const I_neg = math.divide(math.add(i1, math.multiply(a2, i2), math.multiply(a, i3)), 3);

  const I_neg_mag = math.abs(I_neg);
  const desequilibrio_pct = (I_neg_mag / divisor) * 100;

  return { I_neg_mag: I_neg_mag.toFixed(2), desequilibrio: desequilibrio_pct.toFixed(2) };
}

document.getElementById('calcForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const i1 = toRect(+i1_mag.value, +i1_ang.value);
  const i2 = toRect(+i2_mag.value, +i2_ang.value);
  const i3 = toRect(+i3_mag.value, +i3_ang.value);
  const divisor = +divisor.value;

  const resultado = calcularDesequilibrio(i1, i2, i3, divisor);

  document.getElementById('i_neg').textContent = resultado.I_neg_mag;
  document.getElementById('desequilibrio').textContent = resultado.desequilibrio;
  document.getElementById('resultado').classList.remove('hidden');
});
