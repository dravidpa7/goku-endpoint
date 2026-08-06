export function buildSvg(streak, { width = 800, height = 450, padding = 20, gifUrl = 'https://goku-git-count.vercel.app/goku.gif' } = {}) {
  const days = streak.day_count;

  return `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <image href="https://goku-git-count.vercel.app/goku.gif" xlink:href="https://goku-git-count.vercel.app/goku.gif" x="0" y="0" width="${width}" height="${height}" preserveAspectRatio="xMidYMid slice"/>

    <rect x="0" y="${height - padding * 2}" width="${width}" height="${padding * 2}" fill="rgba(0,0,0,0.55)"/>
    <text x="${width / 2}" y="${height - padding}" text-anchor="middle" fill="#fff" font-size="24" font-family="monospace">
      last ${days} day streak
    </text>
  </svg>`;
}