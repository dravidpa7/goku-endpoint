export function buildSvg(streak, { width = 300, height = 350, padding = 20 } = {}) {
  const days = streak.day_count;

  return `
 <svg id="fire-svg" width="${width}" height="${height}" viewBox="0 0 600 700" class="overflow-visible drop-shadow-[0_10px_35px_rgba(255,60,0,0.25)]" xmlns="http://www.w3.org/2000/svg"><style>
                    .flame-sway-slow { transform-origin: 300px 620px; animation: swaySlow 3.333333333333333s infinite ease-in-out alternate; }
                    .flame-sway-medium { transform-origin: 300px 620px; animation: swayMedium 2.5s infinite ease-in-out alternate; }
                    .flame-sway-fast { transform-origin: 300px 620px; animation: swayFast 1.6666666666666665s infinite ease-in-out alternate; }
                    .flame-pulse { transform-origin: 300px 580px; animation: pulseGlow 1.8s infinite ease-in-out alternate; }
                    @keyframes swaySlow { 0% { transform: rotate(2deg) scaleY(0.98); } 100% { transform: rotate(0deg) scaleY(0.96); } }
                    @keyframes swayMedium { 0% { transform: rotate(5deg); } 100% { transform: rotate(6deg); } }
                    @keyframes swayFast { 0% { transform: rotate(0deg); } 100% { transform: rotate(7deg); } }
                    @keyframes pulseGlow { 0% { opacity: 0.85; transform: scale(0.97); } 100% { opacity: 1; transform: scale(1.04); } }
                </style>
                    <defs>
                        <!-- ================= FILTER DEFINITIONS ================= -->
                        <!-- Fluid Turbulence Heat Distortion Filter -->
                        <filter id="heat-turbulence" x="-30%" y="-30%" width="160%" height="160%" filterUnits="userSpaceOnUse">
                            <feTurbulence id="fe-turb" type="fractalNoise" baseFrequency="0.015 0.045" numOctaves="3" result="noise">
                                <animate attributeName="baseFrequency" dur="3s" values="0.012 0.035; 0.018 0.055; 0.012 0.035" repeatCount="indefinite"></animate>
                            </feTurbulence>
                            <!-- Animated Displacement Displacement Offset -->
                            <feOffset id="fe-offset" dx="0" dy="0" result="offsetNoise">
                                <animate attributeName="dy" dur="1.8s" values="0; -120" repeatCount="indefinite"></animate>
                            </feOffset>
                            <feDisplacementMap id="fe-displace" in="SourceGraphic" in2="offsetNoise" scale="10" xChannelSelector="R" yChannelSelector="G" result="displaced"></feDisplacementMap>
                            <feGaussianBlur id="fe-blur" stdDeviation="1.5" result="blurred"></feGaussianBlur>
                        </filter>

                        <!-- Soft Base Glow Filter -->
                        <filter id="soft-glow" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur stdDeviation="24" result="blur"></feGaussianBlur>
                            <feMerge>
                                <feMergeNode in="blur"></feMergeNode>
                                <feMergeNode in="SourceGraphic"></feMergeNode>
                            </feMerge>
                        </filter>

                        <!-- Dense Heat Haze Filter (For Ambient Background) -->
                        <filter id="haze-filter" x="-20%" y="-20%" width="140%" height="140%">
                            <feTurbulence type="turbulence" baseFrequency="0.02 0.08" numOctaves="2" result="hazeNoise">
                                <animate attributeName="baseFrequency" dur="4s" values="0.02 0.06; 0.025 0.09; 0.02 0.06" repeatCount="indefinite"></animate>
                            </feTurbulence>
                            <feDisplacementMap in="SourceGraphic" in2="hazeNoise" scale="18"></feDisplacementMap>
                            <feGaussianBlur stdDeviation="8"></feGaussianBlur>
                        </filter>

                        <!-- ================= GRADIENT PALETTES ================= -->
                        <!-- Layer 1: Outer Smoke/Ember Atmosphere -->
                        <radialGradient id="grad-atmosphere" cx="50%" cy="80%" r="65%">
                            <stop offset="0%" stop-color="var(--c-glow-inner, #ff3300)" stop-opacity="0.5"></stop>
                            <stop offset="50%" stop-color="var(--c-glow-outer, #aa0000)" stop-opacity="0.15"></stop>
                            <stop offset="100%" stop-color="#000000" stop-opacity="0"></stop>
                        </radialGradient>

                        <!-- Layer 2: Deep Outer Body Flame -->
                        <linearGradient id="grad-outer-flame" x1="0%" y1="100%" x2="0%" y2="0%">
                            <stop offset="0%" stop-color="var(--c-outer-base, #990000)"></stop>
                            <stop offset="35%" stop-color="var(--c-outer-mid, #ff2200)"></stop>
                            <stop offset="75%" stop-color="var(--c-outer-top, #ff6600)"></stop>
                            <stop offset="100%" stop-color="var(--c-outer-tip, #ffaa00)" stop-opacity="0.8"></stop>
                        </linearGradient>

                        <!-- Layer 3: Vibrant Mid Flame -->
                        <linearGradient id="grad-mid-flame" x1="0%" y1="100%" x2="0%" y2="0%">
                            <stop offset="0%" stop-color="var(--c-mid-base, #ff3300)"></stop>
                            <stop offset="50%" stop-color="var(--c-mid-center, #ff9900)"></stop>
                            <stop offset="90%" stop-color="var(--c-mid-top, #ffcc00)"></stop>
                        </linearGradient>

                        <!-- Layer 4: Intense Bright Core Flame -->
                        <linearGradient id="grad-inner-core" x1="0%" y1="100%" x2="0%" y2="0%">
                            <stop offset="0%" stop-color="var(--c-inner-base, #ffaa00)"></stop>
                            <stop offset="60%" stop-color="var(--c-inner-mid, #ffee44)"></stop>
                            <stop offset="100%" stop-color="var(--c-inner-top, #ffffff)"></stop>
                        </linearGradient>

                        <!-- Layer 5: White Hot Heart -->
                        <radialGradient id="grad-white-heart" cx="50%" cy="70%" r="50%">
                            <stop offset="0%" stop-color="#ffffff" stop-opacity="1"></stop>
                            <stop offset="65%" stop-color="var(--c-heart-edge, #ffffaa)" stop-opacity="0.9"></stop>
                            <stop offset="100%" stop-color="var(--c-heart-fade, #ffaa00)" stop-opacity="0"></stop>
                        </radialGradient>

                        <!-- Layer 6: Blue Complete Combustion Base Flame -->
                        <linearGradient id="grad-blue-base" x1="0%" y1="100%" x2="0%" y2="0%">
                            <stop offset="0%" stop-color="var(--c-blue-bottom, #0055ff)" stop-opacity="0.9"></stop>
                            <stop offset="40%" stop-color="var(--c-blue-mid, #00d4ff)" stop-opacity="0.6"></stop>
                            <stop offset="100%" stop-color="#00ffff" stop-opacity="0"></stop>
                        </linearGradient>
                    </defs>

                    <!-- BACKGROUND AMBIENT GLOW LAYER -->
                    <circle cx="300" cy="500" r="220" fill="url(#grad-atmosphere)" filter="url(#soft-glow)"></circle>

                    <!-- FILTERED FLAME GROUP (APPLIES REALISTIC DISPLACEMENT & TURBULENCE) -->
                    <g filter="url(#heat-turbulence)">
                        
                        <!-- LAYER 1: Deep Crimson Outer Flame Body (Wide Silhouette) -->
                        <path id="flame-layer-outer" class="flame-sway-slow" fill="url(#grad-outer-flame)" d="
                            M 300 620 
                            C 180 620, 110 500, 120 380 
                            C 128 280, 200 210, 250 120 
                            C 270 180, 280 200, 310 150 
                            C 350 220, 470 270, 480 390 
                            C 490 510, 420 620, 300 620 Z"></path>

                        <!-- LAYER 2: Secondary Outer Flame Tongue (Offset Dynamic Detail) -->
                        <path id="flame-layer-outer-detail" class="flame-sway-medium" fill="url(#grad-outer-flame)" opacity="0.85" d="
                            M 300 615 
                            C 210 615, 150 520, 160 410 
                            C 170 300, 230 230, 280 160 
                            C 300 210, 340 250, 360 210 
                            C 410 280, 440 370, 430 470 
                            C 420 570, 370 615, 300 615 Z"></path>
                    
                        <!-- LAYER 3: Warm Vibrant Orange Body Flame -->
                        <path id="flame-layer-mid" class="flame-sway-medium" fill="url(#grad-mid-flame)" d="
                            M 300 610 
                            C 220 610, 170 510, 180 410 
                            C 190 310, 260 240, 290 200 
                            C 310 240, 330 260, 360 220 
                            C 400 300, 420 400, 410 490 
                            C 400 580, 360 610, 300 610 Z"></path>

                        <!-- LAYER 4: Bright Yellow Inner Core Flame -->
                        <path id="flame-layer-inner" class="flame-sway-fast" fill="url(#grad-inner-core)" d="
                            M 300 600 
                            C 240 600, 200 520, 210 440 
                            C 220 350, 270 290, 295 240 
                            C 310 280, 340 310, 350 270 
                            C 380 340, 390 430, 380 500 
                            C 370 570, 340 600, 300 600 Z"></path>

                        <!-- LAYER 5: White Hot Heart Glow (Intense Center) -->
                        <ellipse id="flame-layer-heart" class="flame-pulse" cx="300" cy="520" rx="65" ry="95" fill="url(#grad-white-heart)"></ellipse>

                        <!-- LAYER 6: Blue Complete Combustion Flame Root -->
                        <path id="flame-layer-blue" class="flame-pulse" fill="url(#grad-blue-base)" d="
                            M 300 625 
                            C 230 625, 210 580, 220 540 
                            C 240 500, 280 490, 300 480 
                            C 320 490, 360 500, 380 540 
                            C 390 580, 370 625, 300 625 Z"></path>

                        <!-- CENTERED DAY COUNT TEXT -->
                        <text x="300" y="520" text-anchor="middle" dominant-baseline="middle"
                            font-family="Inter, ui-sans-serif, system-ui, sans-serif"
                            font-size="96" font-weight="800" fill="#b20b0b" opacity="0.95"
                            filter="url(#soft-glow)">
                            ${days}
                        </text>
                    </g>

                    <!-- DYNAMIC EMBERS & SPARKS LAYER (ANIMATED VIA JS/CSS) -->
                    <g id="embers-group"><circle cx="606.108245868357" cy="286.07833204543476" r="2.948606548150699" fill="#ffffff" opacity="0.09140581321066768"></circle><circle cx="517.6126800468517" cy="277.95473353391" r="2.485264887237565" fill="#ff3300" opacity="0.003962251548508079"></circle><circle cx="512.5500089706683" cy="299.50248738416656" r="2.1174852974730802" fill="#ff3300" opacity="0.082580765963024"></circle><circle cx="539.8093532900137" cy="277.87580385645447" r="1.4536970468854922" fill="#ff6600" opacity="0.14231898671085194"></circle><circle cx="439.7606799971915" cy="285.76588612792193" r="2.694631238836765" fill="#ff3300" opacity="0.1354692628749198"></circle><circle cx="605.1630069253389" cy="311.630669115135" r="2.759468206663457" fill="#ff6600" opacity="0.36383851495145475"></circle><circle cx="535.0094459390004" cy="362.9904674031392" r="1.0307529835321543" fill="#ffcc00" opacity="0.07503542972067825"></circle><circle cx="517.0585730074258" cy="346.4987050180657" r="1.1504045208815" fill="#ff6600" opacity="0.3001916085493866"></circle><circle cx="516.9877626053765" cy="394.0811731811498" r="3.127773624706256" fill="#ffcc00" opacity="0.11825271610576378"></circle><circle cx="453.3607488640964" cy="385.2127029850137" r="2.207473716934036" fill="#ff3300" opacity="0.3751218330644874"></circle><circle cx="452.9557441742694" cy="364.40577459546944" r="2.1924127824629522" fill="#ffffff" opacity="0.33764846838856966"></circle><circle cx="504.0236393397031" cy="407.8556843954434" r="2.5306087662064543" fill="#ff6600" opacity="0.07706100620089776"></circle><circle cx="437.54914874063155" cy="469.5970823301022" r="1.0644421256392098" fill="#ff6600" opacity="0.27263829020074104"></circle><circle cx="375.52283015153375" cy="466.10823758983054" r="1.8828969977699963" fill="#ff3300" opacity="0.08195298303960241"></circle><circle cx="352.0696232802228" cy="509.47464807141756" r="3.24808880742975" fill="#ff3300" opacity="0.4461657409424722"></circle><circle cx="322.89842696492485" cy="467.2110099271233" r="1.4553406612170343" fill="#ff6600" opacity="0.6745330747640413"></circle><circle cx="280.6206639877215" cy="528.3873182121803" r="1.6461203354891554" fill="#ffcc00" opacity="0.5902911183680924"></circle><circle cx="291.8019765777218" cy="569.906174093835" r="1.9545407132901853" fill="#ffffff" opacity="0.5775585595047901"></circle></g>

                    <!-- HEARTH / LOGS ACCENT (OPTIONAL VISUAL BASE) -->
                    <g id="hearth-base" class="transition-opacity duration-300 opacity-90" style="opacity: 0;">
                        <ellipse cx="300" cy="622" rx="140" ry="18" fill="#0f172a" opacity="0.8"></ellipse>
                        <!-- Burning Coals Glow -->
                        <ellipse cx="300" cy="620" rx="110" ry="12" fill="#ff3300" opacity="0.6" filter="url(#soft-glow)"></ellipse>
                        <!-- Wooden Logs -->
                        <path d="M 180 625 L 310 605 L 330 620 L 200 640 Z" fill="#291d18" stroke="#170f0c" stroke-width="2"></path>
                        <path d="M 420 625 L 290 605 L 270 620 L 400 640 Z" fill="#241814" stroke="#120b08" stroke-width="2"></path>
                    </g>
                    
                </svg>`;
}