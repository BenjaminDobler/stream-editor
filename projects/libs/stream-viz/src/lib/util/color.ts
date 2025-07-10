const colors = ['#9A2D4B', '#D1DB57', '#4393C9', '#EC9D41', '#75AE55', '#445FA6', '#445FA6', '#EFBD46', '#DC4533'];

export function getRandomColor(index: number) {
    if (index < colors.length) {
        return colors[index];
    }
  const symbols = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += symbols[Math.floor(Math.random() * 16)];
  }
  return color;
}
