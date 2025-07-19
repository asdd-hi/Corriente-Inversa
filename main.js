function toRect(mag, angDeg) {
  const angRad = angDeg * Math.PI / 180;
  return math.complex({
    re: mag * Math.cos(angRad),
    im: mag * Math.sin(angRad)
  });
}

function calcularDesequilibrio(i1_mag, i1_ang, i2_mag, i2_ang, i3_mag, i3_ang, i_base) {
  const I1 = toRect(i1_mag, i1_ang);
  const I2 = toRect(i2_mag, i2_ang);
  const I3 = toRect(i3_mag, i3_ang);

  const a  = math.complex({ abs: 1, arg: 2 * Math.PI / 3 });  // 120°
  const a2 = math.complex({ abs: 1, arg: 4 * Math.PI / 3 });  // 240°

  const I_pos = math.divide(math.add(I1, math.multiply(a, I2), math.multiply(a2, I3)), 3);
  const I_neg = math.divide(math.add(I1, math.multiply(a2, I2), math.multiply(a, I3)), 3);

  const I_neg_mag = math.abs(I_neg);
  const desequilibrio_pct = (I_neg_mag / i_base) * 100;

  return {
    I_neg_mag: I_neg_mag.toFixed(2),
    desequilibrio: desequilibrio_pct.toFixed(2)
  };
}

document.getElementById('formulario').addEventListener('submit', function (e) {
  e.preventDefault();

  const i1_mag = +document.getElementById('i1_mag').value;
  const i1_ang = +document.getElementById('i1_ang').value;
  const i2_mag = +document.getElementById('i2_mag').value;
  const i2_ang = +document.getElementById('i2_ang').value;
  const i3_mag = +document.getElementById('i3_mag').value;
  const i3_ang = +document.getElementById('i3_ang').value;
  const divisor = +document.getElementById('divisor').value;

  const { I_neg_mag, desequilibrio } = calcularDesequilibrio(i1_mag, i1_ang, i2_mag, i2_ang, i3_mag, i3_ang, divisor);

  document.getElementById('i_neg').textContent = I_neg_mag;
  document.getElementById('desequilibrio').textContent = desequilibrio;
  document.getElementById('resultado').classList.remove('hidden');
});
