// task 3: turn contribution days into a basic SVG line graph
// No theming, no fancy labels — just a working polyline.

export function buildSvg(days, { width = 800, height = 250, padding = 20 } = {}) {
  console.log(days);
  const counts = days
  const max = Math.max(...counts, 1); // avoid divide-by-zero

  const innerW = width - padding * 2;
  const innerH = height - padding * 2;
  const stepX = innerW / (counts.length - 1);

  // Map each day to an (x, y) coordinate
  const points = counts.map((count, i) => {
    const x = padding + i * stepX;
    const y = padding + innerH - (count / max) * innerH;
    return `${x.toFixed(2)},${y.toFixed(2)}`;
  });

  const polyline = points.join(" ");

  return `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 600" width="100%" height="100%">
    <defs>
    <!-- Background Gradient -->
    <radialGradient id="bgGrad" cx="50%" cy="50%" r="70%">
      <stop offset="0%" stop-color="#ff4500" />
      <stop offset="40%" stop-color="#8b0000" />
      <stop offset="80%" stop-color="#2a0000" />
      <stop offset="100%" stop-color="#0f0000" />
      </radialGradient>

    <!-- Super Saiyan Hair Gradient -->
    <linearGradient id="ssjHair" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="25%" stop-color="#fff7a1" />
      <stop offset="70%" stop-color="#ffd700" />
      <stop offset="100%" stop-color="#d48800" />
    </linearGradient>

    <!-- Skin Gradient -->
    <linearGradient id="skinGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ffeedd" />
      <stop offset="60%" stop-color="#ffcb9a" />
      <stop offset="100%" stop-color="#e09664" />
    </linearGradient>

    <!-- Gi (Orange Shirt) Gradient -->
    <linearGradient id="giGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ff7700" />
      <stop offset="70%" stop-color="#cc3b00" />
      <stop offset="100%" stop-color="#801800" />
    </linearGradient>

    <!-- Undershirt (Blue) Gradient -->
    <linearGradient id="blueShirtGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#1a4275" />
      <stop offset="100%" stop-color="#091833" />
    </linearGradient>

    <!-- Lava Pool Gradient -->
    <linearGradient id="lavaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ffee55" />
      <stop offset="20%" stop-color="#ff7700" />
      <stop offset="60%" stop-color="#aa0000" />
      <stop offset="100%" stop-color="#4a0000" />
    </linearGradient>

    <!-- Aura Flame Gradient -->
    <linearGradient id="auraGrad" x1="0%" y1="100%" x2="0%" y2="0%">
      <stop offset="0%" stop-color="#ff1100" stop-opacity="0.8"/>
      <stop offset="50%" stop-color="#ff7700" stop-opacity="0.6"/>
      <stop offset="90%" stop-color="#ffee00" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </linearGradient>

    <!-- Glow Filter -->
    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
    
    <!-- Intense Glow -->
    <filter id="intenseGlow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="15" result="blur1"/>
      <feGaussianBlur stdDeviation="30" result="blur2"/>
      <feMerge>
        <feMergeNode in="blur2"/>
        <feMergeNode in="blur1"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
    </defs>

  <style>
    /* Continuous Energy Pulsing and Flame Motion */
    .aura-bg {
      animation: pulseAura 1.2s infinite alternate ease-in-out;
      transform-origin: center bottom;
    }
    
    .aura-flame-1 {
      animation: flameMotion 0.8s infinite alternate ease-in-out;
      transform-origin: 500px 400px;
    }

    .aura-flame-2 {
      animation: flameMotion 1.1s infinite alternate-reverse ease-in-out;
      transform-origin: 500px 400px;
    }

    /* Floating Fire Embers Animation */
    .ember {
      animation: floatUp 3s infinite linear;
      opacity: 0;
    }
    .e1 { animation-delay: 0s; animation-duration: 2.5s; }
    .e2 { animation-delay: 0.7s; animation-duration: 3.2s; }
    .e3 { animation-delay: 1.3s; animation-duration: 2.1s; }
    .e4 { animation-delay: 1.8s; animation-duration: 3.7s; }
    .e5 { animation-delay: 0.4s; animation-duration: 2.8s; }

    /* Lava Surface Wave */
    .lava-wave {
      animation: wave 2s infinite alternate ease-in-out;
    }

    /* Keyframes */
    @keyframes pulseAura {
      0% { transform: scale(0.97) translateY(2px); opacity: 0.85; }
      100% { transform: scale(1.03) translateY(-4px); opacity: 1; }
    }

    @keyframes flameMotion {
      0% { transform: scaleY(0.95) skewX(-2deg); }
      100% { transform: scaleY(1.05) skewX(2deg); }
    }

    @keyframes floatUp {
      0% { transform: translateY(0) scale(1); opacity: 0; }
      20% { opacity: 1; }
      80% { opacity: 0.8; }
      100% { transform: translateY(-400px) scale(0.3); opacity: 0; }
    }

    @keyframes wave {
      0% { transform: translateY(0); }
      100% { transform: translateY(4px); }
    }
  </style>

  <!-- Dynamic Background -->
  <rect width="1000" height="600" fill="url(#bgGrad)" />

  <!-- Background Fiery Pillars / Aura Glow -->
  <g filter="url(#intenseGlow)">
    <path class="aura-flame-1" d="M 200,600 Q 180,300 250,150 Q 220,300 350,600 Z" fill="#ff3300" opacity="0.4"/>
    <path class="aura-flame-2" d="M 800,600 Q 820,300 750,150 Q 780,300 650,600 Z" fill="#ff3300" opacity="0.4"/>
    <circle cx="500" cy="300" r="280" fill="#ff4500" opacity="0.25" />
  </g>

  <!-- MAIN GOKU AURA (Fitted around silhouette) -->
  <g class="aura-bg" filter="url(#glow)">
    <!-- Outer Red Energy -->
    <path d="M 500 50 
             C 420 80, 380 150, 320 220 
             C 260 290, 220 350, 240 500 
             L 760 500 
             C 780 350, 740 290, 680 220 
             C 620 150, 580 80, 500 50 Z" 
          fill="url(#auraGrad)" />
    
    <!-- Inner Yellow/Orange Energetic Flames -->
    <path class="aura-flame-1" d="M 500 90 
             Q 410 180 360 260 
             Q 310 340 330 480 
             L 670 480 
             Q 690 340 640 260 
             Q 590 180 500 90 Z" 
          fill="#ffaa00" opacity="0.5" />
  </g>

  <!-- CHARACTER: GOKU SUPER SAIYAN -->
  <g id="goku">

    <!-- Undershirt & Chest -->
    <path d="M 430 360 L 570 360 L 590 470 L 410 470 Z" fill="url(#blueShirtGrad)" />
    
    <!-- Chest / Muscular Neck Details -->
    <path d="M 460 360 Q 500 390 540 360 L 550 430 Q 500 460 450 430 Z" fill="url(#skinGrad)" />
    <path d="M 500 385 L 500 440" stroke="#c47043" stroke-width="3" /> <!-- Sternum line -->
    <path d="M 470 410 Q 500 420 530 410" fill="none" stroke="#c47043" stroke-width="3" /> <!-- Pectoral line -->

    <!-- Neck & Clavicle -->
    <path d="M 465 310 L 535 310 L 545 375 L 455 375 Z" fill="url(#skinGrad)" />
    <!-- Neck Muscles (Traps/Sternocleidomastoid) -->
    <path d="M 470 310 L 485 365 M 530 310 L 515 365" stroke="#d67b48" stroke-width="4" stroke-linecap="round"/>

    <!-- Orange Gi (Torso/Shoulders) -->
    <!-- Left Gi Strap -->
    <path d="M 455 350 L 380 365 L 400 470 L 455 450 L 470 375 Z" fill="url(#giGrad)" />
    <!-- Right Gi Strap -->
    <path d="M 545 350 L 620 365 L 600 470 L 545 450 L 530 375 Z" fill="url(#giGrad)" />

    <!-- Blue Sash / Belt -->
    <path d="M 400 465 L 600 465 L 610 500 L 390 500 Z" fill="url(#blueShirtGrad)" />
    <path d="M 430 465 C 470 485, 530 485, 570 465" fill="none" stroke="#091833" stroke-width="3" />

    <!-- Arms (Biceps/Triceps Submerged in Lava) -->
    <!-- Left Arm -->
    <path d="M 380 365 Q 330 400 310 490 L 395 480 Q 405 420 410 450 Z" fill="url(#skinGrad)" />
    <path d="M 345 420 Q 360 450 355 480" fill="none" stroke="#c47043" stroke-width="3" />
    <!-- Right Arm -->
    <path d="M 620 365 Q 670 400 690 490 L 605 480 Q 595 420 590 450 Z" fill="url(#skinGrad)" />
    <path d="M 655 420 Q 640 450 645 480" fill="none" stroke="#c47043" stroke-width="3" />

    <!-- Kame Symbol (Kanji Emblem on Chest) -->
    <circle cx="565" cy="425" r="22" fill="#ffffff" stroke="#000000" stroke-width="2.5" />
    <!-- Kanji Representation -->
    <text x="565" y="433" font-family="sans-serif" font-weight="900" font-size="22" text-anchor="middle" fill="#000000">悟</text>

    <!-- Face Structure -->
    <polygon points="450,260 460,325 500,345 540,325 550,260" fill="url(#skinGrad)" />
    <!-- Chin/Jawline outlines -->
    <polyline points="450,260 460,325 500,345 540,325 550,260" fill="none" stroke="#b05c2e" stroke-width="2.5" stroke-linejoin="round" />

    <!-- Ears -->
    <path d="M 450 265 C 435 270, 435 295, 455 305" fill="url(#skinGrad)" stroke="#b05c2e" stroke-width="2" />
    <path d="M 550 265 C 565 270, 565 295, 545 305" fill="url(#skinGrad)" stroke="#b05c2e" stroke-width="2" />

    <!-- Facial Features (Intense Super Saiyan Expression) -->
    <!-- Eyebrows (Gold/Yellow Sharp Angle) -->
    <polygon points="455,260 495,275 495,268 460,255" fill="#ffe600" stroke="#d48800" stroke-width="1.5" />
    <polygon points="545,260 505,275 505,268 540,255" fill="#ffe600" stroke="#d48800" stroke-width="1.5" />
    
    <!-- Eyes (Teal/Cyan Super Saiyan) -->
    <polygon points="462,266 490,276 488,284 466,276" fill="#00ffff" stroke="#008888" stroke-width="1.5" filter="url(#glow)" />
    <polygon points="538,266 510,276 512,284 534,276" fill="#00ffff" stroke="#008888" stroke-width="1.5" filter="url(#glow)" />
    <!-- Pupils -->
    <circle cx="478" cy="273" r="2" fill="#000" />
    <circle cx="522" cy="273" r="2" fill="#000" />

    <!-- Nose -->
    <polygon points="500,280 494,300 500,298" fill="#c47043" />
    <polyline points="496,295 500,300 504,295" fill="none" stroke="#8a3c14" stroke-width="2" stroke-linecap="round" />

    <!-- Smirk / Mouth -->
    <path d="M 480 318 Q 495 325 515 315" fill="none" stroke="#501c04" stroke-width="3.5" stroke-linecap="round" />
    <path d="M 510 313 L 520 318" fill="none" stroke="#501c04" stroke-width="2.5" stroke-linecap="round" /> <!-- Smirk crease -->
    
    <!-- Forehead Wrinkles (Intensity) -->
    <path d="M 493 268 L 493 280 M 507 268 L 507 280" stroke="#b05c2e" stroke-width="2" />

    <!-- SUPER SAIYAN HAIR (Massive Spiky Silhouette) -->
    <g id="hair" filter="url(#glow)">
      <!-- Base Layer / Outer Spikes -->
      <path d="M 450 255 
               C 430 230, 360 210, 370 160 
               C 390 170, 420 190, 435 210 
               C 410 160, 380 100, 430 70 
               C 450 100, 460 140, 465 170 
               C 460 110, 470 50,  500 20 
               C 520 60,  530 110, 535 170 
               C 540 140, 550 100, 570 70 
               C 620 100, 590 160, 565 210 
               C 580 190, 610 170, 630 160 
               C 640 210, 570 230, 550 255 
               Z" 
            fill="url(#ssjHair)" stroke="#d48800" stroke-width="3" />

      <!-- Front Bangs -->
      <!-- Left Bang -->
      <path d="M 455 255 Q 480 240 495 260 Q 470 230 455 255 Z" fill="url(#ssjHair)" stroke="#d48800" stroke-width="2" />
      <!-- Center-Left Bang -->
      <path d="M 470 245 Q 495 210 500 255 Q 485 220 470 245 Z" fill="#ffea66" stroke="#d48800" stroke-width="2" />
      <!-- Right Bang -->
      <path d="M 545 255 Q 520 240 505 260 Q 530 230 545 255 Z" fill="url(#ssjHair)" stroke="#d48800" stroke-width="2" />
    </g>

  </g> <!-- End Goku -->

  <!-- FOREGROUND LAVA POOL (Goku is standing inside it) -->
  <g id="lava-pool">
    <!-- Lava Surface Wave 1 -->
    <path class="lava-wave" d="M 0 470 Q 250 450 500 470 T 1000 470 L 1000 600 L 0 600 Z" fill="url(#lavaGrad)" opacity="0.9" />
    
    <!-- Bright Yellow Hot Lava Highlights -->
    <path class="lava-wave" d="M 0 480 Q 300 500 600 475 T 1000 490 L 1000 600 L 0 600 Z" fill="#ffcc00" opacity="0.4" filter="url(#glow)" />
    
    <!-- Fiery Lava Ripples around Goku -->
    <ellipse cx="500" cy="480" rx="220" ry="15" fill="none" stroke="#ffee55" stroke-width="4" filter="url(#glow)" />
    <ellipse cx="500" cy="485" rx="160" ry="8" fill="none" stroke="#ff4500" stroke-width="3" />
  </g>

  <!-- ANIMATED FLOATING FIRE EMBERS / PARTICLES -->
  <g id="embers" filter="url(#glow)">
    <!-- Left Side Embers -->
    <circle class="ember e1" cx="250" cy="500" r="4" fill="#ffeeaa" />
    <path class="ember e2" d="M 320 480 Q 315 470 320 460 Q 325 470 320 480 Z" fill="#ff7700" />
    <circle class="ember e3" cx="180" cy="450" r="6" fill="#ff3300" />
    
    <!-- Center / Around Goku Embers -->
    <circle class="ember e4" cx="450" cy="420" r="3.5" fill="#ffffff" />
    <path class="ember e5" d="M 550 450 Q 545 435 550 420 Q 555 435 550 450 Z" fill="#ffee00" />
    <circle class="ember e1" cx="520" cy="380" r="5" fill="#ff5500" />

    <!-- Right Side Embers -->
    <circle class="ember e2" cx="720" cy="490" r="4.5" fill="#ffbb00" />
    <path class="ember e3" d="M 800 460 Q 795 445 800 430 Q 805 445 800 460 Z" fill="#ff2200" />
    <circle class="ember e5" cx="680" cy="400" r="3" fill="#ffffff" />
  </g>
</svg>

  `;
}

