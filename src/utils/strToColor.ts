function hashCode(s: string) {
  let hash = 0;
  for (let i = 0; i < s.length; i++) {
    hash = s.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash;
}

function intToRGB(i: number) {
  const c = (i & 0x00ffffff).toString(16).toUpperCase();
  return "#" + "00000".substring(0, 6 - c.length) + c;
}

export function stringToGradient(str: string) {
  const hash1 = hashCode(str);
  const hash2 = hashCode(str.split("").reverse().join(""));

  const color1 = intToRGB(hash1);
  const color2 = intToRGB(hash2);

  return `linear-gradient(135deg, ${color1}, ${color2})`;
}
