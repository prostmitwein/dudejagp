/* ==========================================================================
   DUDEJA GRAND PRIX (DGP) - McLAREN F1 TECHNICAL PARTNER LAUNCH FILM
   ENGINE & INTERACTION SCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------------------------
    // 1. STATE & COLOR CONSTANTS
    // ----------------------------------------------------------------------
    const COLORS = {
        matteBlack: '#090909',
        carbonBlack: '#111111',
        graphite: '#1B1B1B',
        chromeSilver: '#D9D9D9',
        pureWhite: '#F8F8F8',
        primaryRed: '#C8102E',
        secondaryRed: '#E10600'
    };

    let audioEnabled = false;
    let audioCtx = null;

    // ----------------------------------------------------------------------
    // 2. CUSTOM CURSOR
    // ----------------------------------------------------------------------
    const cursorDot = document.getElementById('cursor-dot');
    const cursorCircle = document.getElementById('cursor-circle');
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let circleX = mouseX;
    let circleY = mouseY;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        if (cursorDot) {
            cursorDot.style.left = `${mouseX}px`;
            cursorDot.style.top = `${mouseY}px`;
        }
    });

    function animateCursor() {
        circleX += (mouseX - circleX) * 0.15;
        circleY += (mouseY - circleY) * 0.15;
        if (cursorCircle) {
            cursorCircle.style.left = `${circleX}px`;
            cursorCircle.style.top = `${circleY}px`;
        }
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover elements trigger cursor expansion
    const interactiveSelectors = 'a, button, .hotspot, .comp-item, .gallery-item, .angle-btn, .partner-card, .official-card, .tilt-card, .note-pin';
    document.querySelectorAll(interactiveSelectors).forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });

    // ----------------------------------------------------------------------
    // 3. WEB AUDIO API SYNTHESIZER (SYNTHETIC SOUND EFFECTS)
    // ----------------------------------------------------------------------
    const soundToggle = document.getElementById('sound-toggle');
    const iconSoundOff = soundToggle.querySelector('.icon-sound-off');
    const iconSoundOn = soundToggle.querySelector('.icon-sound-on');
    const soundLabel = soundToggle.querySelector('.sound-label');

    function initAudio() {
        if (!audioCtx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (AudioContext) {
                audioCtx = new AudioContext();
            }
        }
        if (audioCtx && audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
    }

    soundToggle.addEventListener('click', () => {
        initAudio();
        audioEnabled = !audioEnabled;
        if (audioEnabled) {
            iconSoundOff.classList.add('hidden');
            iconSoundOn.classList.remove('hidden');
            soundLabel.textContent = 'AUDIO ON';
            playBeep(880, 0.1);
        } else {
            iconSoundOff.classList.remove('hidden');
            iconSoundOn.classList.add('hidden');
            soundLabel.textContent = 'AUDIO OFF';
        }
    });

    function playBeep(freq = 440, duration = 0.1, type = 'sine') {
        if (!audioEnabled || !audioCtx) return;
        try {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.type = type;
            osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
            gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start();
            osc.stop(audioCtx.currentTime + duration);
        } catch (e) { console.error(e); }
    }

    function playStarterMotor() {
        if (!audioEnabled || !audioCtx) return;
        try {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(60, audioCtx.currentTime);
            osc.frequency.linearRampToValueAtTime(140, audioCtx.currentTime + 1.2);
            gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
            gain.gain.linearRampToValueAtTime(0.2, audioCtx.currentTime + 1.0);
            gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.3);
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start();
            osc.stop(audioCtx.currentTime + 1.3);
        } catch (e) { console.error(e); }
    }

    function playEngineScream() {
        if (!audioEnabled || !audioCtx) return;
        try {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(150, audioCtx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(800, audioCtx.currentTime + 1.8);
            gain.gain.setValueAtTime(0.25, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 2.0);
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start();
            osc.stop(audioCtx.currentTime + 2.0);
        } catch (e) { console.error(e); }
    }

    // Play metallic click on button interactions
    document.querySelectorAll('button, .hotspot, .angle-btn').forEach(btn => {
        btn.addEventListener('click', () => playBeep(1200, 0.04, 'triangle'));
    });

    // ----------------------------------------------------------------------
    // 4. LAUNCH SEQUENCE ENGINE (PRELUDE -> DISINTEGRATION -> STROBE -> GANTRY)
    // ----------------------------------------------------------------------
    const launchOverlay = document.getElementById('launch-overlay');
    const preludeContent = document.getElementById('prelude-content');
    const preludeTitle = document.getElementById('prelude-title');
    const disintegrationCanvas = document.getElementById('disintegration-canvas');
    const strobeScreen = document.getElementById('strobe-screen');
    const strobeText = document.getElementById('strobe-text');
    const speedmarkSvg = document.getElementById('mclaren-speedmark-svg');
    const f1Gantry = document.getElementById('f1-gantry');
    const mainNav = document.getElementById('main-nav');
    const dCtx = disintegrationCanvas.getContext('2d');

    function resizeDisintegrationCanvas() {
        disintegrationCanvas.width = window.innerWidth;
        disintegrationCanvas.height = window.innerHeight;
    }
    resizeDisintegrationCanvas();
    window.addEventListener('resize', resizeDisintegrationCanvas);

    // 1 second after load -> Fade in Prelude Text
    setTimeout(() => {
        if (preludeContent) preludeContent.classList.add('visible');
    }, 1000);

    let launchStarted = false;

    // Attach click and keypress handlers to window, document, and elements
    ['click', 'touchstart', 'keydown'].forEach(evt => {
        window.addEventListener(evt, startLaunchSequence);
        document.addEventListener(evt, startLaunchSequence);
    });

    if (launchOverlay) launchOverlay.addEventListener('click', startLaunchSequence);
    if (preludeContent) preludeContent.addEventListener('click', startLaunchSequence);

    function startLaunchSequence() {
        if (launchStarted) return;
        launchStarted = true;

        initAudio();
        if (preludeContent) preludeContent.style.opacity = '0';

        // Exactly 0.6 seconds freeze (absolute silence)
        setTimeout(() => {
            runPixelDisintegration();
        }, 600);
    }

    function runPixelDisintegration() {
        if (preludeContent) preludeContent.style.display = 'none';
        
        // Generate particle fragments
        const particles = [];
        const numParticles = 2500;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        for (let i = 0; i < numParticles; i++) {
            particles.push({
                x: centerX + (Math.random() - 0.5) * 450,
                y: centerY + (Math.random() - 0.5) * 120,
                vx: (Math.random() - 0.5) * 6,
                vy: Math.random() * -4 - 1, // upward initial pop then fall
                gravity: 0.25 + Math.random() * 0.2,
                size: Math.random() * 3 + 1,
                life: 1.0,
                decay: 0.008 + Math.random() * 0.01,
                bounce: Math.random() * 0.4 + 0.2,
                colorStage: 0 // 0: White, 1: Chrome, 2: Dark Red, 3: Black
            });
        }

        let animFrame;
        let strobeFired = false;

        function proceedToStrobe() {
            if (strobeFired) return;
            strobeFired = true;
            if (animFrame) cancelAnimationFrame(animFrame);
            dCtx.clearRect(0, 0, disintegrationCanvas.width, disintegrationCanvas.height);
            triggerDgpStrobeReveal();
        }

        // Safety fallback timer (2.5 seconds maximum)
        setTimeout(proceedToStrobe, 2500);

        function renderParticles() {
            if (strobeFired) return;

            dCtx.fillStyle = 'rgba(0, 0, 0, 0.25)';
            dCtx.fillRect(0, 0, disintegrationCanvas.width, disintegrationCanvas.height);

            let activeCount = 0;
            particles.forEach(p => {
                if (p.life > 0) {
                    activeCount++;
                    p.x += p.vx;
                    p.y += p.vy;
                    p.vy += p.gravity;
                    p.life -= p.decay;

                    // Bounce off bottom floor
                    if (p.y >= disintegrationCanvas.height - 20) {
                        p.y = disintegrationCanvas.height - 20;
                        p.vy = -p.vy * p.bounce;
                    }

                    // Color progression: White -> Chrome -> Dark Red -> Black
                    let color = COLORS.pureWhite;
                    if (p.life < 0.75 && p.life >= 0.5) color = COLORS.chromeSilver;
                    else if (p.life < 0.5 && p.life >= 0.2) color = COLORS.primaryRed;
                    else if (p.life < 0.2) color = COLORS.carbonBlack;

                    dCtx.fillStyle = color;
                    dCtx.globalAlpha = Math.max(0, p.life);
                    dCtx.beginPath();
                    dCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                    dCtx.fill();
                }
            });

            if (activeCount > 30) {
                animFrame = requestAnimationFrame(renderParticles);
            } else {
                proceedToStrobe();
            }
        }
        renderParticles();
    }

    // DGP Strobe Sequence (0.08s flashes)
    function triggerDgpStrobeReveal() {
        strobeScreen.classList.add('active');

        const strobeSteps = [
            { text: 'DGP', color: COLORS.pureWhite, bg: '#000000', svg: false },
            { text: '', color: '#000', bg: '#000000', svg: false },
            { text: 'DGP', color: COLORS.chromeSilver, bg: '#000000', svg: false },
            { text: '', color: '#000', bg: '#000000', svg: false },
            { text: 'DGP', color: COLORS.primaryRed, bg: '#000000', svg: false },
            { text: '', color: '#000', bg: '#000000', svg: false },
            { text: '', color: COLORS.pureWhite, bg: '#000000', svg: true },
            { text: '', color: '#000', bg: '#000000', svg: false },
            { text: '', color: COLORS.chromeSilver, bg: '#000000', svg: true },
            { text: '', color: '#000', bg: '#000000', svg: false }
        ];

        let index = 0;
        const interval = setInterval(() => {
            if (index < strobeSteps.length) {
                const step = strobeSteps[index];
                strobeScreen.style.backgroundColor = step.bg;
                if (step.svg) {
                    strobeText.style.display = 'none';
                    speedmarkSvg.classList.remove('hidden');
                    speedmarkSvg.style.color = step.color;
                } else {
                    speedmarkSvg.classList.add('hidden');
                    strobeText.style.display = 'block';
                    strobeText.textContent = step.text;
                    strobeText.style.color = step.color;
                }
                playBeep(200 + index * 100, 0.04, 'square');
                index++;
            } else {
                clearInterval(interval);
                strobeScreen.classList.remove('active');
                triggerF1LightsSequence();
            }
        }, 80);
    }

    // F1 5 Red Lights Sequence
    function triggerF1LightsSequence() {
        f1Gantry.classList.remove('hidden');
        playStarterMotor();

        const lights = [
            document.getElementById('light-1'),
            document.getElementById('light-2'),
            document.getElementById('light-3'),
            document.getElementById('light-4'),
            document.getElementById('light-5')
        ];

        let currentLight = 0;
        const gantryStatus = document.getElementById('gantry-status');

        const lightInterval = setInterval(() => {
            if (currentLight < 5) {
                lights[currentLight].classList.add('on');
                gantryStatus.textContent = `LIGHT ${currentLight + 1} ON`;
                playBeep(520, 0.15, 'sawtooth');
                currentLight++;
            } else {
                clearInterval(lightInterval);
                gantryStatus.textContent = 'HOLD... READY FOR LAUNCH';

                // Hold 1 Second -> Lights Out!
                setTimeout(() => {
                    lights.forEach(l => l.classList.remove('on'));
                    gantryStatus.textContent = 'LIGHTS OUT! GO!';
                    playEngineScream();

                    // Camera violently pushes forward into homepage
                    launchOverlay.style.transform = 'scale(1.5)';
                    launchOverlay.style.opacity = '0';
                    
                    setTimeout(() => {
                        launchOverlay.style.display = 'none';
                        document.body.classList.remove('in-launch');
                        mainNav.classList.remove('transparent');
                    }, 800);
                }, 1000);
            }
        }, 800);
    }

    // Replay Launch Sequence Button
    document.getElementById('restart-launch-btn').addEventListener('click', () => {
        location.reload();
    });

    // ----------------------------------------------------------------------
    // 5. HERO 2D/3D CANVAS CAR RENDERER & SCROLL CAMERA REVEAL
    // ----------------------------------------------------------------------
    const carHeroCanvas = document.getElementById('car-hero-canvas');
    const hCtx = carHeroCanvas.getContext('2d');

    function resizeHeroCanvas() {
        carHeroCanvas.width = window.innerWidth;
        carHeroCanvas.height = window.innerHeight;
    }
    resizeHeroCanvas();
    window.addEventListener('resize', resizeHeroCanvas);

    let targetScrollProgress = 0;
    let currentScrollProgress = 0;

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const heroHeight = window.innerHeight;
        targetScrollProgress = Math.min(1, Math.max(0, scrollTop / heroHeight));
    });

    function drawHeroCar() {
        const w = carHeroCanvas.width;
        const h = carHeroCanvas.height;
        hCtx.clearRect(0, 0, w, h);

        // Smooth Lerp for cinematic inertia camera control
        currentScrollProgress += (targetScrollProgress - currentScrollProgress) * 0.08;

        // Camera zoom level: 3.8 (macro close-up on front wing) down to 1.0 (full chassis)
        const zoom = 3.8 - currentScrollProgress * 2.8;
        const offsetX = (w / 2) + (currentScrollProgress * 80);
        const offsetY = (h / 2) + (currentScrollProgress * 20);

        hCtx.save();
        hCtx.translate(offsetX, offsetY);
        hCtx.scale(zoom, zoom);

        // Car Base Geometry (Centered around 0,0)
        const carLen = 640;
        const startX = -carLen / 2;
        const time = Date.now() * 0.0015;

        // 1. Ambient Shadow & Ground Downforce Glow
        const groundGrad = hCtx.createRadialGradient(0, 45, 10, 0, 45, carLen * 0.55);
        groundGrad.addColorStop(0, 'rgba(200, 16, 46, 0.2)');
        groundGrad.addColorStop(0.4, 'rgba(0, 0, 0, 0.9)');
        groundGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        hCtx.fillStyle = groundGrad;
        hCtx.beginPath();
        hCtx.ellipse(0, 45, carLen * 0.55, 24, 0, 0, Math.PI * 2);
        hCtx.fill();

        // 2. Main Carbon Fiber Chassis Underbody
        hCtx.fillStyle = COLORS.carbonBlack;
        hCtx.beginPath();
        hCtx.moveTo(startX, 20);
        hCtx.lineTo(startX + 130, -12);
        hCtx.lineTo(startX + 370, -28);
        hCtx.lineTo(startX + 550, -42);
        hCtx.lineTo(startX + carLen, 10);
        hCtx.lineTo(startX + carLen - 20, 38);
        hCtx.lineTo(startX + 30, 38);
        hCtx.closePath();
        hCtx.fill();
        hCtx.strokeStyle = 'rgba(217, 217, 217, 0.2)';
        hCtx.lineWidth = 1.5;
        hCtx.stroke();

        // Carbon weave texture lines
        hCtx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
        hCtx.lineWidth = 1;
        for (let lx = startX + 50; lx < startX + carLen - 50; lx += 15) {
            hCtx.beginPath();
            hCtx.moveTo(lx, -10);
            hCtx.lineTo(lx + 20, 30);
            hCtx.stroke();
        }

        // 3. Sidepod Livery - DGP Racing Red (#C8102E) Downwash Blade
        const redGrad = hCtx.createLinearGradient(startX + 160, -30, startX + 480, 20);
        redGrad.addColorStop(0, COLORS.primaryRed);
        redGrad.addColorStop(0.7, COLORS.secondaryRed);
        redGrad.addColorStop(1, '#900018');
        hCtx.fillStyle = redGrad;
        hCtx.beginPath();
        hCtx.moveTo(startX + 190, -5);
        hCtx.bezierCurveTo(startX + 290, -38, startX + 420, -32, startX + 500, 5);
        hCtx.lineTo(startX + 470, 32);
        hCtx.lineTo(startX + 210, 28);
        hCtx.closePath();
        hCtx.fill();

        // 4. Polished Chrome Silver Engine Cover & Specular Sweep Reflection
        const sweepPos = (Math.sin(time) + 1) * 0.5;
        const chromeGrad = hCtx.createLinearGradient(startX + 100, -30, startX + 420, 0);
        chromeGrad.addColorStop(0, '#777777');
        chromeGrad.addColorStop(Math.max(0, sweepPos - 0.15), COLORS.chromeSilver);
        chromeGrad.addColorStop(sweepPos, '#FFFFFF'); // Specular Light Sweep
        chromeGrad.addColorStop(Math.min(1, sweepPos + 0.15), COLORS.chromeSilver);
        chromeGrad.addColorStop(1, '#666666');

        hCtx.fillStyle = chromeGrad;
        hCtx.beginPath();
        hCtx.moveTo(startX + 130, -12);
        hCtx.lineTo(startX + 270, -32);
        hCtx.lineTo(startX + 400, -22);
        hCtx.lineTo(startX + 370, -5);
        hCtx.lineTo(startX + 190, -5);
        hCtx.closePath();
        hCtx.fill();

        // 5. Titanium Halo Cockpit Arch
        hCtx.strokeStyle = COLORS.chromeSilver;
        hCtx.lineWidth = 5;
        hCtx.beginPath();
        hCtx.moveTo(startX + 250, -16);
        hCtx.lineTo(startX + 300, -48);
        hCtx.lineTo(startX + 340, -16);
        hCtx.stroke();

        // Halo Red Accent Bar
        hCtx.strokeStyle = COLORS.primaryRed;
        hCtx.lineWidth = 2;
        hCtx.stroke();

        // 6. Wheels & Carbon Aero Rim Covers (Front & Rear)
        const drawWheel = (wx, wy, radius) => {
            // Outer Pirelli Rubber Tyre
            hCtx.fillStyle = '#0b0b0b';
            hCtx.beginPath();
            hCtx.arc(wx, wy, radius, 0, Math.PI * 2);
            hCtx.fill();
            hCtx.lineWidth = 3;
            hCtx.strokeStyle = '#222222';
            hCtx.stroke();

            // Aero Carbon Cover
            hCtx.fillStyle = COLORS.carbonBlack;
            hCtx.beginPath();
            hCtx.arc(wx, wy, radius * 0.68, 0, Math.PI * 2);
            hCtx.fill();

            // DGP Crimson Accent Ring (NO YELLOW/BLUE!)
            hCtx.lineWidth = 4;
            hCtx.strokeStyle = COLORS.primaryRed;
            hCtx.beginPath();
            hCtx.arc(wx, wy, radius * 0.58, 0, Math.PI * 2);
            hCtx.stroke();

            // Center Lock Nut
            hCtx.fillStyle = COLORS.chromeSilver;
            hCtx.beginPath();
            hCtx.arc(wx, wy, radius * 0.16, 0, Math.PI * 2);
            hCtx.fill();
        };

        drawWheel(startX + 110, 26, 46); // Front Wheel
        drawWheel(startX + 520, 26, 50); // Rear Wheel

        // 7. DGP & McLaren Partner Branding
        hCtx.fillStyle = COLORS.pureWhite;
        hCtx.font = '900 24px "Outfit", sans-serif';
        hCtx.fillText('DGP', startX + 290, 10);

        hCtx.fillStyle = COLORS.chromeSilver;
        hCtx.font = '700 9px "JetBrains Mono", monospace';
        hCtx.fillText('McLAREN TECHNICAL PARTNER', startX + 225, 25);

        hCtx.restore();

        requestAnimationFrame(drawHeroCar);
    }
    drawHeroCar();

    // ----------------------------------------------------------------------
    // 6. McLAREN LEGACY STATS ANIMATED COUNTER
    // ----------------------------------------------------------------------
    const statCards = document.querySelectorAll('.stat-card');
    const animatedCards = new Set();

    function animateStatNumber(cardEl) {
        const numEl = cardEl.querySelector('.stat-number');
        if (!numEl || animatedCards.has(numEl)) return;
        animatedCards.add(numEl);

        const target = parseInt(numEl.getAttribute('data-target'));
        if (isNaN(target)) return;

        let current = 0;
        const step = Math.max(1, Math.ceil(target / 30));
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                numEl.textContent = target + (target >= 188 ? '+' : '');
                clearInterval(timer);
            } else {
                numEl.textContent = current;
            }
        }, 30);
    }

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStatNumber(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -20px 0px' });

    statCards.forEach(card => statsObserver.observe(card));

    // ----------------------------------------------------------------------
    // 7. FROM CONCEPT TO CHAMPION (7 STAGES METALLIC SCHEMATIC RENDERER)
    // ----------------------------------------------------------------------
    const sketchCanvases = document.querySelectorAll('.sketch-canvas');
    sketchCanvases.forEach(canvas => {
        const stage = parseInt(canvas.getAttribute('data-stage'));
        const ctx = canvas.getContext('2d');
        canvas.width = 480;
        canvas.height = 300;

        // Dark Silvery Metallic Background
        ctx.fillStyle = '#0F1217';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Technical Grid Background
        ctx.strokeStyle = 'rgba(226, 228, 232, 0.06)';
        ctx.lineWidth = 1;
        for (let x = 0; x < canvas.width; x += 20) {
            ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
        }
        for (let y = 0; y < canvas.height; y += 20) {
            ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
        }

        ctx.save();
        ctx.translate(240, 150);

        if (stage === 1) {
            // Stage 1: Initial Graphite Contour Sketch
            ctx.strokeStyle = '#D9D9D9';
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(-180, 20); ctx.lineTo(-80, -20); ctx.lineTo(120, -35); ctx.lineTo(180, 10);
            ctx.stroke();
            ctx.strokeStyle = COLORS.primaryRed;
            ctx.beginPath(); ctx.arc(-100, 20, 26, 0, Math.PI * 2); ctx.arc(120, 20, 26, 0, Math.PI * 2); ctx.stroke();
            ctx.fillStyle = COLORS.chromeSilver;
            ctx.font = '10px "JetBrains Mono"';
            ctx.fillText('L: 5400mm | W: 2000mm | GRAPHITE SILHOUETTE', -170, 70);
        } else if (stage === 2) {
            // Stage 2: Aerodynamic Wireframe & Venturi Flow
            ctx.strokeStyle = COLORS.primaryRed;
            ctx.lineWidth = 1;
            for (let x = -180; x <= 180; x += 18) {
                ctx.beginPath(); ctx.moveTo(x, -50); ctx.lineTo(x + 10, 50); ctx.stroke();
            }
            ctx.fillStyle = COLORS.pureWhite;
            ctx.font = 'bold 11px "JetBrains Mono"';
            ctx.fillText('VENTURI PRESSURE: -4.2 kPa | VORTICES: 18', -160, -65);
        } else if (stage === 3) {
            // Stage 3: Sponsor Grid Hierarchy
            ctx.strokeStyle = COLORS.chromeSilver;
            ctx.strokeRect(-180, -50, 360, 100);
            ctx.fillStyle = COLORS.primaryRed;
            ctx.fillRect(-170, -40, 100, 30);
            ctx.fillStyle = COLORS.pureWhite;
            ctx.font = 'bold 12px "Outfit"';
            ctx.fillText('OKX', -140, -20);
            ctx.fillText('MASTERCARD', -30, -20);
            ctx.fillText('GOOGLE', 85, -20);
            ctx.fillText('RICHARD MILLE', -140, 20);
            ctx.fillText('DELL', 30, 20);
        } else if (stage === 4) {
            // Stage 4: Color Exploration Swatch (Chrome + Crimson)
            const chromeGrad = ctx.createLinearGradient(-180, 0, 0, 0);
            chromeGrad.addColorStop(0, '#888888'); chromeGrad.addColorStop(0.5, '#FFFFFF'); chromeGrad.addColorStop(1, '#D9D9D9');
            ctx.fillStyle = chromeGrad;
            ctx.fillRect(-180, -40, 175, 80);
            ctx.fillStyle = COLORS.primaryRed;
            ctx.fillRect(5, -40, 175, 80);
            ctx.fillStyle = COLORS.pureWhite;
            ctx.font = 'bold 11px "JetBrains Mono"';
            ctx.fillText('MIRROR CHROME (94% REFLECT)', -165, 55);
            ctx.fillText('DGP RACING RED (#C8102E)', 20, 55);
        } else if (stage === 5) {
            // Stage 5: CAD Specification & Monocoque Load
            ctx.strokeStyle = '#4182e4';
            ctx.strokeRect(-190, -60, 380, 120);
            ctx.beginPath(); ctx.moveTo(-190, 0); ctx.lineTo(190, 0); ctx.stroke();
            ctx.fillStyle = '#FFFFFF';
            ctx.font = 'bold 10px "JetBrains Mono"';
            ctx.fillText('SCALE 1:1 CAD BLUEPRINT | MONOCOQUE: 105 KG | FIA LOAD: 125 kN', -180, -45);
        } else if (stage === 6) {
            // Stage 6: Wind Tunnel CFD Simulation
            ctx.fillStyle = COLORS.primaryRed;
            for (let i = 0; i < 30; i++) {
                const px = (Math.sin(i) * 180);
                const py = (Math.cos(i * 2) * 40);
                ctx.beginPath(); ctx.arc(px, py, 3, 0, Math.PI * 2); ctx.fill();
            }
            ctx.fillStyle = COLORS.chromeSilver;
            ctx.font = 'bold 11px "JetBrains Mono"';
            ctx.fillText('CFD DRAG COEFFICIENT Cd: 0.68 | VELOCITY: 350 KM/H', -165, 70);
        } else if (stage === 7) {
            // Stage 7: Photorealistic F1 Chassis Render (MCL-DGP25 #27)
            ctx.fillStyle = COLORS.carbonBlack;
            ctx.fillRect(-180, -20, 360, 40);
            ctx.fillStyle = COLORS.primaryRed;
            ctx.fillRect(-80, -20, 160, 20);
            ctx.fillStyle = COLORS.pureWhite;
            ctx.font = 'bold 22px "Outfit"';
            ctx.fillText('27', -40, 2);
            ctx.fillStyle = COLORS.chromeSilver;
            ctx.font = 'bold 12px "JetBrains Mono"';
            ctx.fillText('MCL-DGP25 CHAMPIONSHIP LIVERY READY', -140, 55);
        }
        ctx.restore();
    });

    // ----------------------------------------------------------------------
    // 8. LIVERY INTERACTIVE VISUALIZER & MULTI-ANGLE SCHEMATIC RENDERER
    // ----------------------------------------------------------------------
    const liveryCanvas = document.getElementById('livery-canvas');
    const lCtx = liveryCanvas ? liveryCanvas.getContext('2d') : null;
    const angleBtns = document.querySelectorAll('.angle-btn');
    const hotspotModal = document.getElementById('hotspot-modal');
    const hotspotTitle = document.getElementById('hotspot-modal-title');
    const hotspotDesc = document.getElementById('hotspot-modal-desc');
    const hotspotClose = document.getElementById('hotspot-modal-close');

    function resizeLiveryCanvas() {
        if (!liveryCanvas) return;
        liveryCanvas.width = liveryCanvas.parentElement.clientWidth;
        liveryCanvas.height = liveryCanvas.parentElement.clientHeight;
    }
    resizeLiveryCanvas();
    window.addEventListener('resize', resizeLiveryCanvas);

    let currentAngle = 'side';

    function renderLiveryView(angle) {
        if (!lCtx) return;
        const w = liveryCanvas.width;
        const h = liveryCanvas.height;
        lCtx.clearRect(0, 0, w, h);

        // Dark Silvery Floor Shadow Gradient
        const floorGrad = lCtx.createLinearGradient(0, h * 0.7, 0, h);
        floorGrad.addColorStop(0, '#151921');
        floorGrad.addColorStop(1, '#0b0c0e');
        lCtx.fillStyle = floorGrad;
        lCtx.fillRect(0, h * 0.7, w, h * 0.3);

        lCtx.save();
        lCtx.translate(w / 2, h / 2);

        if (angle === 'side') {
            // Render High Resolution Side Profile (Matching McLaren DGP Launch Model #27)
            const carL = 580;
            const sX = -carL / 2;

            // Ground reflection shadow
            lCtx.fillStyle = 'rgba(0, 0, 0, 0.7)';
            lCtx.beginPath(); lCtx.ellipse(0, 45, carL * 0.52, 18, 0, 0, Math.PI * 2); lCtx.fill();

            // Carbon floor
            lCtx.fillStyle = COLORS.carbonBlack;
            lCtx.fillRect(sX, 15, carL, 20);

            // Red Upper Engine Cover & Rear Wing (#C8102E)
            lCtx.fillStyle = COLORS.primaryRed;
            lCtx.beginPath();
            lCtx.moveTo(sX + 150, -10);
            lCtx.lineTo(sX + 300, -35);
            lCtx.lineTo(sX + 440, -30);
            lCtx.lineTo(sX + 460, -55); // Rear wing pillar
            lCtx.lineTo(sX + 540, -55);
            lCtx.lineTo(sX + 540, 10);
            lCtx.lineTo(sX + 200, 15);
            lCtx.closePath();
            lCtx.fill();

            // Mirror Chrome Sidepod Sweep
            const chromeG = lCtx.createLinearGradient(sX + 100, -20, sX + 380, 10);
            chromeG.addColorStop(0, '#888888'); chromeG.addColorStop(0.5, '#FFFFFF'); chromeG.addColorStop(1, '#B0B0B0');
            lCtx.fillStyle = chromeG;
            lCtx.beginPath();
            lCtx.moveTo(sX + 100, -5);
            lCtx.bezierCurveTo(sX + 200, -25, sX + 350, -20, sX + 420, 5);
            lCtx.lineTo(sX + 380, 20);
            lCtx.lineTo(sX + 160, 15);
            lCtx.closePath();
            lCtx.fill();

            // Number 27 in bold white
            lCtx.fillStyle = '#FFFFFF';
            lCtx.font = 'bold 36px "Outfit"';
            lCtx.fillText('27', sX + 360, -5);

            // Primary Logo DGP
            lCtx.fillStyle = COLORS.primaryRed;
            lCtx.font = '900 28px "Outfit"';
            lCtx.fillText('DGP', sX + 240, 8);

            // Wheels & Rim Accent Ring
            const drawW = (x, y) => {
                lCtx.fillStyle = '#080808';
                lCtx.beginPath(); lCtx.arc(x, y, 44, 0, Math.PI * 2); lCtx.fill();
                lCtx.fillStyle = COLORS.carbonBlack;
                lCtx.beginPath(); lCtx.arc(x, y, 30, 0, Math.PI * 2); lCtx.fill();
                lCtx.strokeStyle = COLORS.primaryRed; lCtx.lineWidth = 3;
                lCtx.beginPath(); lCtx.arc(x, y, 26, 0, Math.PI * 2); lCtx.stroke();
                lCtx.fillStyle = COLORS.chromeSilver;
                lCtx.beginPath(); lCtx.arc(x, y, 8, 0, Math.PI * 2); lCtx.fill();
            };
            drawW(sX + 90, 25);
            drawW(sX + 480, 25);

        } else if (angle === 'front') {
            // Front View Nose
            lCtx.fillStyle = COLORS.carbonBlack;
            lCtx.fillRect(-180, 20, 360, 15); // Front Wing
            lCtx.fillStyle = COLORS.primaryRed;
            lCtx.beginPath(); lCtx.arc(0, -10, 70, 0, Math.PI * 2); lCtx.fill();
            lCtx.fillStyle = COLORS.chromeSilver;
            lCtx.beginPath(); lCtx.arc(0, -10, 45, 0, Math.PI * 2); lCtx.fill();
            lCtx.fillStyle = COLORS.primaryRed;
            lCtx.font = 'bold 20px "Outfit"'; lCtx.textAlign = 'center';
            lCtx.fillText('DGP', 0, -5);
        } else if (angle === 'top') {
            // Top Down View
            lCtx.fillStyle = COLORS.carbonBlack;
            lCtx.fillRect(-50, -200, 100, 400);
            lCtx.fillStyle = COLORS.primaryRed;
            lCtx.fillRect(-35, -90, 70, 180);
            lCtx.fillStyle = COLORS.chromeSilver;
            lCtx.fillRect(-45, -40, 90, 80);
        } else if (angle === 'rear') {
            // Rear Diffuser View
            lCtx.fillStyle = COLORS.carbonBlack;
            lCtx.fillRect(-160, -70, 320, 140);
            lCtx.fillStyle = COLORS.primaryRed;
            lCtx.fillRect(-140, -60, 280, 25);
        }
        lCtx.restore();
    }
    renderLiveryView('side');

    angleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            angleBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentAngle = btn.getAttribute('data-view');
            renderLiveryView(currentAngle);
        });
    });

    // Hotspot Clicks
    document.querySelectorAll('.hotspot').forEach(spot => {
        spot.addEventListener('click', () => {
            const title = spot.getAttribute('data-title');
            const desc = spot.getAttribute('data-desc');
            if (hotspotTitle) hotspotTitle.textContent = title;
            if (hotspotDesc) hotspotDesc.textContent = desc;
            if (hotspotModal) hotspotModal.classList.remove('hidden');
        });
    });

    if (hotspotClose) {
        hotspotClose.addEventListener('click', () => {
            if (hotspotModal) hotspotModal.classList.add('hidden');
        });
    }

    // ----------------------------------------------------------------------
    // 9. THE CAR EXPLODED VIEW COMPONENT ARCHITECTURE HUB
    // ----------------------------------------------------------------------
    const explodedCanvas = document.getElementById('exploded-canvas');
    const eCtx = explodedCanvas ? explodedCanvas.getContext('2d') : null;
    const compItems = document.querySelectorAll('.comp-item');
    const compTitle = document.getElementById('comp-title');
    const compDesc = document.getElementById('comp-desc');
    const spec1 = document.getElementById('spec-1');
    const spec2 = document.getElementById('spec-2');

    const COMPONENT_DATA = {
        'front-wing': { name: 'Front Wing Assembly', desc: 'Ground effect downforce generator with outwash endplates.', s1: '1,200 kg @ 300km/h', s2: 'Autoclave Carbon' },
        'sidepod': { name: 'Sidepod & Inlets', desc: 'Undercut radiator intake channels directing airflow into downwash ramps.', s1: '350 km/h Airflow', s2: 'DGP Red Composite' },
        'floor': { name: 'Venturi Floor', desc: 'Underbody ground effect tunnels with 3D sculpted rear diffuser.', s1: '65% Total Downforce', s2: 'Honeycomb Carbon' },
        'halo': { name: 'Titanium Halo', desc: 'Cockpit protection ring capable of withstanding 125 kN of static force.', s1: '125 kN Load Cap', s2: 'Grade 5 Titanium' },
        'suspension': { name: 'Pushrod Suspension', desc: 'Front pushrod and rear pullrod wishbone system for optimum ride height.', s1: '0.01mm Tolerance', s2: 'Carbon Wishbones' },
        'wheel-cover': { name: 'Aero Wheel Covers', desc: 'Enclosed carbon rim covers mitigating wheel wash turbulence.', s1: '-8% Air Drag', s2: 'Crimson Trim Ring' },
        'rear-wing': { name: 'DRS Rear Wing', desc: 'Hydraulic drag reduction flap providing +25 km/h top speed boost.', s1: '0.4s Actuation', s2: 'Hydraulic DRS' },
        'power-unit': { name: 'V6 Turbo Power Unit', desc: '1.6L V6 Turbo Hybrid engine coupled with MGU-K & MGU-H energy recovery.', s1: '1,050+ BHP', s2: 'Hybrid Turbo V6' }
    };

    function renderExplodedComponent(compKey) {
        if (!eCtx) return;
        explodedCanvas.width = explodedCanvas.parentElement.clientWidth;
        explodedCanvas.height = explodedCanvas.parentElement.clientHeight;
        const w = explodedCanvas.width;
        const h = explodedCanvas.height;
        eCtx.clearRect(0, 0, w, h);

        eCtx.save();
        eCtx.translate(w / 2, h / 2);

        // Technical Silvery Dark Stage Base
        eCtx.fillStyle = '#11141a';
        eCtx.fillRect(-w/2, -h/2, w, h);

        // Draw Full Car Outline in Silvery Chrome
        eCtx.strokeStyle = 'rgba(226, 228, 232, 0.2)';
        eCtx.lineWidth = 1.5;
        eCtx.strokeRect(-240, -50, 480, 100);

        // Highlight Selected Component in Glowing DGP Racing Red (#C8102E)
        eCtx.shadowColor = COLORS.primaryRed;
        eCtx.shadowBlur = 35;
        eCtx.fillStyle = COLORS.primaryRed;

        if (compKey === 'front-wing') eCtx.fillRect(-240, -40, 60, 80);
        else if (compKey === 'sidepod') eCtx.fillRect(-80, -35, 120, 70);
        else if (compKey === 'floor') eCtx.fillRect(-180, 20, 360, 30);
        else if (compKey === 'halo') eCtx.fillRect(-30, -50, 60, 30);
        else if (compKey === 'suspension') eCtx.fillRect(-160, -20, 40, 40);
        else if (compKey === 'wheel-cover') { eCtx.arc(-160, 15, 25, 0, Math.PI * 2); eCtx.arc(160, 15, 25, 0, Math.PI * 2); eCtx.fill(); }
        else if (compKey === 'rear-wing') eCtx.fillRect(180, -55, 50, 70);
        else if (compKey === 'power-unit') eCtx.fillRect(30, -40, 90, 60);

        eCtx.shadowBlur = 0;
        eCtx.fillStyle = COLORS.pureWhite;
        eCtx.font = 'bold 16px "JetBrains Mono"';
        eCtx.textAlign = 'center';
        eCtx.fillText(compKey.toUpperCase() + ' [SYSTEM ACTIVE]', 0, 75);

        eCtx.restore();
    }

    compItems.forEach(item => {
        item.addEventListener('click', () => {
            compItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            const key = item.getAttribute('data-comp');
            const data = COMPONENT_DATA[key];
            if (data) {
                compTitle.textContent = data.name;
                compDesc.textContent = data.desc;
                spec1.textContent = data.s1;
                spec2.textContent = data.s2;
                renderExplodedComponent(key);
            }
        });
    });
    renderExplodedComponent('front-wing');

    // ----------------------------------------------------------------------
    // 10. DRIVER EQUIPMENT 3D TILT CARDS
    // ----------------------------------------------------------------------
    const tiltCards = document.querySelectorAll('.tilt-card');
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            const glass = card.querySelector('.card-glass');
            if (glass) {
                glass.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            }
        });

        card.addEventListener('mouseleave', () => {
            const glass = card.querySelector('.card-glass');
            if (glass) {
                glass.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
            }
        });
    });

    // ----------------------------------------------------------------------
    // 11. GALLERY LIGHTBOX MODAL
    // ----------------------------------------------------------------------
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightboxModal = document.getElementById('lightbox-modal');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxPrev = document.getElementById('lightbox-prev');
    const lightboxNext = document.getElementById('lightbox-next');
    const lightboxCanvas = document.getElementById('lightbox-canvas');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lbCtx = lightboxCanvas ? lightboxCanvas.getContext('2d') : null;

    let currentGalleryIndex = 0;

    function renderGalleryCanvas(canvas, type) {
        const ctx = canvas.getContext('2d');
        canvas.width = canvas.parentElement ? canvas.parentElement.clientWidth : 800;
        canvas.height = canvas.parentElement ? canvas.parentElement.clientHeight : 450;
        const w = canvas.width;
        const h = canvas.height;

        // Dark Silvery Gradient
        const g = ctx.createLinearGradient(0, 0, w, h);
        g.addColorStop(0, '#151921');
        g.addColorStop(0.5, '#0d0f13');
        g.addColorStop(1, '#08090b');
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, w, h);

        // Technical Grid Line
        ctx.strokeStyle = 'rgba(226, 228, 232, 0.08)';
        ctx.lineWidth = 1;
        ctx.strokeRect(20, 20, w - 40, h - 40);

        // Render Shot Schematic
        ctx.save();
        ctx.translate(w / 2, h / 2);

        ctx.fillStyle = COLORS.carbonBlack;
        ctx.fillRect(-180, -25, 360, 50);
        ctx.fillStyle = COLORS.primaryRed;
        ctx.fillRect(-90, -25, 180, 25);
        ctx.fillStyle = COLORS.chromeSilver;
        ctx.fillRect(-30, -35, 60, 10);

        ctx.fillStyle = COLORS.pureWhite;
        ctx.font = '900 28px "Outfit"';
        ctx.textAlign = 'center';
        ctx.fillText('27', -40, 0);

        ctx.fillStyle = COLORS.chromeSilver;
        ctx.font = 'bold 13px "JetBrains Mono"';
        ctx.fillText(`MCL-DGP25 CINEMATIC ARCHIVE: ${type.toUpperCase()}`, 0, 45);

        ctx.restore();
    }

    document.querySelectorAll('.gallery-canvas').forEach(c => {
        renderGalleryCanvas(c, c.getAttribute('data-type'));
    });

    function openLightbox(index) {
        currentGalleryIndex = index;
        const item = galleryItems[index];
        const caption = item.getAttribute('data-caption');
        const type = item.querySelector('.gallery-canvas').getAttribute('data-type');

        if (lightboxCaption) lightboxCaption.textContent = caption;
        if (lbCtx) {
            lightboxCanvas.width = 800;
            lightboxCanvas.height = 450;
            const w = 800; const h = 450;

            const g = lbCtx.createLinearGradient(0, 0, w, h);
            g.addColorStop(0, '#1c222c');
            g.addColorStop(0.6, '#0d0f13');
            g.addColorStop(1, '#050608');
            lbCtx.fillStyle = g;
            lbCtx.fillRect(0, 0, w, h);

            lbCtx.strokeStyle = 'rgba(226, 228, 232, 0.2)';
            lbCtx.lineWidth = 2;
            lbCtx.strokeRect(30, 30, w - 60, h - 60);

            lbCtx.fillStyle = COLORS.primaryRed;
            lbCtx.font = '900 32px "Outfit"';
            lbCtx.textAlign = 'center';
            lbCtx.fillText(`CHASSIS MCL-DGP25 [${type.toUpperCase()}]`, 400, 200);

            lbCtx.fillStyle = COLORS.chromeSilver;
            lbCtx.font = 'bold 12px "JetBrains Mono"';
            lbCtx.fillText('STUDIO TELEMETRY: 50mm ISO 100 f/2.8 &bull; SHUTTER 1/1000s &bull; McLAREN HERITAGE', 400, 240);
        }
        if (lightboxModal) lightboxModal.classList.remove('hidden');
    }

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const idx = parseInt(item.getAttribute('data-index'));
            openLightbox(idx);
        });
    });

    if (lightboxClose) {
        lightboxClose.addEventListener('click', () => lightboxModal.classList.add('hidden'));
    }

    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', () => {
            currentGalleryIndex = (currentGalleryIndex - 1 + galleryItems.length) % galleryItems.length;
            openLightbox(currentGalleryIndex);
        });
    }

    if (lightboxNext) {
        lightboxNext.addEventListener('click', () => {
            currentGalleryIndex = (currentGalleryIndex + 1) % galleryItems.length;
            openLightbox(currentGalleryIndex);
        });
    }

    window.addEventListener('keydown', (e) => {
        if (!lightboxModal.classList.contains('hidden')) {
            if (e.key === 'Escape') lightboxModal.classList.add('hidden');
            else if (e.key === 'ArrowLeft') lightboxPrev.click();
            else if (e.key === 'ArrowRight') lightboxNext.click();
        }
    });

    // ----------------------------------------------------------------------
    // 12. ENDING SECTION (SYMMETRIC LAUNCH CLOSURE)
    // ----------------------------------------------------------------------
    const endingSection = document.getElementById('ending');
    const endingLogo = document.getElementById('ending-logo');
    const endingRestartContainer = document.getElementById('ending-restart-container');
    const endingReplayBtn = document.getElementById('ending-replay-btn');
    let endingTriggered = false;

    const endingCarCanvas = document.getElementById('ending-car-canvas');
    const endCtx = endingCarCanvas ? endingCarCanvas.getContext('2d') : null;
    let endingCarPos = 0;

    function animateEndingCar() {
        if (!endCtx || !endingTriggered) return;
        endingCarCanvas.width = window.innerWidth;
        endingCarCanvas.height = window.innerHeight;
        const w = endingCarCanvas.width;
        const h = endingCarCanvas.height;
        endCtx.clearRect(0, 0, w, h);

        endingCarPos += 1.2; // Car slowly rolls backwards into darkness

        endCtx.save();
        endCtx.translate(w / 2 + endingCarPos, h / 2 + 80);
        endCtx.scale(0.85, 0.85);
        endCtx.globalAlpha = Math.max(0, 1 - endingCarPos / (w * 0.45));

        // Draw F1 Silhouette rolling back into dark garage
        endCtx.fillStyle = COLORS.carbonBlack;
        endCtx.fillRect(-260, -25, 520, 50);
        endCtx.fillStyle = COLORS.primaryRed;
        endCtx.fillRect(-120, -25, 240, 25);
        endCtx.fillStyle = COLORS.chromeSilver;
        endCtx.fillRect(-40, -40, 80, 15);

        // Wheels
        endCtx.fillStyle = '#0a0a0a';
        endCtx.beginPath();
        endCtx.arc(-160, 25, 38, 0, Math.PI * 2);
        endCtx.arc(160, 25, 40, 0, Math.PI * 2);
        endCtx.fill();

        endCtx.restore();

        requestAnimationFrame(animateEndingCar);
    }

    const endingObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !endingTriggered) {
                endingTriggered = true;

                // Nav fades away
                if (mainNav) mainNav.style.opacity = '0';

                // Start Car rolling backwards
                animateEndingCar();

                // Chrome logo changes to DGP Racing Red (#C8102E)
                setTimeout(() => {
                    if (endingLogo) {
                        endingLogo.classList.remove('chrome-text');
                        endingLogo.classList.add('red-text');
                    }
                }, 1800);

                // 5 seconds hold in silence -> Show replay button
                setTimeout(() => {
                    if (endingRestartContainer) endingRestartContainer.classList.remove('hidden');
                }, 5000);
            }
        });
    }, { threshold: 0.5 });

    if (endingSection) endingObserver.observe(endingSection);

    if (endingReplayBtn) {
        endingReplayBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setTimeout(() => location.reload(), 600);
        });
    }
});
