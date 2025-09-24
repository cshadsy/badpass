function pwStrength(pw) {
  let pool = 0;
  if (/[a-z]/.test(pw)) pool += 26;
  if (/[A-Z]/.test(pw)) pool += 26;
  if (/[0-9]/.test(pw)) pool += 10;
  if (/[^a-zA-Z0-9]/.test(pw)) pool += 32;

  let entropy = pool ? pw.length * Math.log2(pool) : 0;

  const commons = ["123","password","qwerty","abc","letmein","admin","welcome","login","iloveyou","monkey","dragon","baseball","football","shadow","master","superman","hello","freedom","whatever","qazwsx","trustno1"];
  for (let c of commons) if (pw.toLowerCase().includes(c)) entropy -= 25;

  if (entropy > 0) {
    const repeats = pw.length - new Set(pw).size;
    if (repeats > 0) entropy -= repeats; 

    const seqs = /(012|123|234|345|456|567|678|789|890|abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz|zyx)/i;
    if (seqs.test(pw)) entropy -= 5;

    let types = 0;
    if (/[a-z]/.test(pw)) types++;
    if (/[A-Z]/.test(pw)) types++;
    if (/[0-9]/.test(pw)) types++;
    if (/[^a-zA-Z0-9]/.test(pw)) types++;
    if (types >= 3 && !seqs.test(pw) && repeats === 0) entropy += 5; 
  }

  entropy = Math.min(entropy, 999);

  let text;
  if (entropy < 10) text = "garbage";
  else if (entropy < 17) text = "weak";
  else if (entropy < 36) text = "medium";
  else if (entropy < 60) text = "strong";
  else if (entropy < 80) text = "very strong";
  else if (entropy < 100) text = "ultra strong";
  else if (entropy < 150) text = "omega strong";
  else if (entropy < 200) text = "insanely strong";
  else if (entropy < 500) text = "too strong";
  else text = "this is not your password";

  let score = Math.min(999, Math.max(0, Math.round(entropy)));

  return { text, score };
}
