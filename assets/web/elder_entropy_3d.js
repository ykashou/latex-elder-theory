// Elder Heliosystem - 3D Orbital Thermodynamics Visualization

// Scene setup
let scene, camera, renderer, controls;
let elder, mentors = [], erudites = [];
let gravitationalFields = [];
let learningActive = false;
let particles = [];
let entropyParticles = [];
let time = 0;

// System parameters
const config = {
    learningRate: 0.5,
    diffusionStrength: 0.3,
    temperature: 1.0,
    elderMass: 1.0,
    mentorCount: 7,
    eruditePerMentor: 5,
    entropyParticleCount: 500,
    maxEntropy: 5,
    currentEntropy: 3.5
};

// Color schemes
const colors = {
    elder: 0xffcc00,  // Golden
    mentor: 0x00aaff,  // Blue
    erudite: 0x44ff88, // Green
    particleHot: 0xff3300, // Red/orange for high entropy
    particleCold: 0x0066ff, // Blue for low entropy
    gravityField: 0xffffff  // White with opacity
};

// Initialize the scene
function init() {
    // Create scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000819);
    
    // Create camera
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 2000);
    camera.position.set(0, 100, 200);
    
    // Create renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    document.body.appendChild(renderer.domElement);
    
    // Add orbit controls
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    
    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);
    
    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(10, 10, 10);
    scene.add(directionalLight);
    
    // Create entities
    createElder();
    createMentors();
    createErudites();
    createGravitationalFields();
    createEntropyParticles();
    
    // Add event listeners
    window.addEventListener('resize', onWindowResize);
    
    // Set up controls
    setupControls();
    
    // Start animation loop
    animate();
}

// Create Elder (central sun)
function createElder() {
    const geometry = new THREE.SphereGeometry(15, 32, 32);
    const material = new THREE.MeshPhongMaterial({
        color: colors.elder,
        emissive: colors.elder,
        emissiveIntensity: 0.5,
        shininess: 100
    });
    
    elder = new THREE.Mesh(geometry, material);
    scene.add(elder);
    
    // Add glow effect
    const glowGeometry = new THREE.SphereGeometry(16, 32, 32);
    const glowMaterial = new THREE.MeshBasicMaterial({
        color: colors.elder,
        transparent: true,
        opacity: 0.2
    });
    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    elder.add(glow);
    
    // Create a pulsing light at the center
    const light = new THREE.PointLight(colors.elder, 2, 300);
    light.position.set(0, 0, 0);
    elder.add(light);
    
    // Store properties
    elder.userData = {
        type: 'elder',
        mass: config.elderMass,
        phase: 0,
        phaseVelocity: 0.005,
        originalScale: elder.scale.clone()
    };
}

// Create Mentors (planets)
function createMentors() {
    const mentorGeometry = new THREE.SphereGeometry(5, 24, 24);
    
    for (let i = 0; i < config.mentorCount; i++) {
        // Calculate position based on Fibonacci spiral for better distribution
        const goldenRatio = (1 + Math.sqrt(5)) / 2;
        const angle = i * (2 * Math.PI / goldenRatio);
        const radius = 60 + (i * 5); // Increasing radius for better visualization
        const x = radius * Math.cos(angle);
        const z = radius * Math.sin(angle);
        const y = (Math.random() - 0.5) * 30; // Some variation in y-axis
        
        // Unique color variation for each mentor
        const hue = i / config.mentorCount;
        const mentorColor = new THREE.Color().setHSL(hue, 0.7, 0.6);
        
        const material = new THREE.MeshPhongMaterial({
            color: mentorColor,
            shininess: 70
        });
        
        const mentor = new THREE.Mesh(mentorGeometry, material);
        mentor.position.set(x, y, z);
        scene.add(mentor);
        
        // Add orbit visualization
        const orbitGeometry = new THREE.TorusGeometry(radius, 0.2, 16, 100);
        const orbitMaterial = new THREE.MeshBasicMaterial({
            color: mentorColor,
            transparent: true,
            opacity: 0.2
        });
        const orbit = new THREE.Mesh(orbitGeometry, orbitMaterial);
        orbit.rotation.x = Math.PI / 2;
        scene.add(orbit);
        
        // Store properties
        mentor.userData = {
            type: 'mentor',
            id: i,
            mass: 0.3 + (Math.random() * 0.3),
            orbitRadius: radius,
            orbitCenter: new THREE.Vector3(0, 0, 0),
            phase: angle,
            phaseVelocity: 0.01 - (i * 0.001),
            originalScale: mentor.scale.clone(),
            orbitVisual: orbit,
            color: mentorColor,
            entropy: 0.5
        };
        
        mentors.push(mentor);
    }
}

// Create Erudites (moons)
function createErudites() {
    const eruditeGeometry = new THREE.SphereGeometry(2, 16, 16);
    
    mentors.forEach((mentor, mentorIndex) => {
        for (let i = 0; i < config.eruditePerMentor; i++) {
            // Calculate position as orbiting each mentor
            const angle = (i / config.eruditePerMentor) * Math.PI * 2;
            const distance = 12 + (i * 1.5);
            const x = Math.cos(angle) * distance;
            const z = Math.sin(angle) * distance;
            const y = (Math.random() - 0.5) * 5;
            
            // Derive color from mentor with variation
            const baseColor = mentor.userData.color.clone();
            const hue = (baseColor.getHSL({}).h + (i * 0.1)) % 1;
            const eruditeColor = new THREE.Color().setHSL(hue, 0.8, 0.65);
            
            const material = new THREE.MeshPhongMaterial({
                color: eruditeColor,
                shininess: 50
            });
            
            const erudite = new THREE.Mesh(eruditeGeometry, material);
            // Position relative to mentor
            erudite.position.copy(mentor.position);
            erudite.position.x += x;
            erudite.position.y += y;
            erudite.position.z += z;
            scene.add(erudite);
            
            // Store properties
            erudite.userData = {
                type: 'erudite',
                id: `${mentorIndex}-${i}`,
                parentMentor: mentor,
                mass: 0.05 + (Math.random() * 0.1),
                orbitRadius: distance,
                orbitCenter: mentor.position.clone(),
                phase: angle,
                phaseVelocity: 0.03 + (Math.random() * 0.02),
                originalScale: erudite.scale.clone(),
                color: eruditeColor,
                entropy: 0.8
            };
            
            erudites.push(erudite);
        }
    });
}

// Create gravitational fields visualization
function createGravitationalFields() {
    // Elder's gravitational field
    createGravitationalField(elder, 100, 0.6);
    
    // Mentors' gravitational fields
    mentors.forEach(mentor => {
        createGravitationalField(mentor, 25, 0.4);
    });
}

// Helper to create a gravitational field visualization for an entity
function createGravitationalField(entity, radius, intensity) {
    // Create particles to represent the field
    const particleCount = 200;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    
    // Distribute particles in a spherical volume
    for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const r = radius * Math.cbrt(Math.random()); // Cube root for volume-uniform distribution
        
        positions[i3] = r * Math.sin(phi) * Math.cos(theta);
        positions[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        positions[i3 + 2] = r * Math.cos(phi);
        
        // Size based on distance from center (stronger field closer to the center)
        sizes[i] = 1.5 * (1 - (r / radius));
    }
    
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    
    // Set particle appearance
    const particleMaterial = new THREE.PointsMaterial({
        color: entity.userData.color || colors.gravityField,
        transparent: true,
        opacity: 0.3 * intensity,
        size: 1.5,
        blending: THREE.AdditiveBlending,
        depthWrite: false
    });
    
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    entity.add(particles);
    
    // Store for animation
    gravitationalFields.push({
        entity: entity,
        particles: particles,
        radius: radius,
        intensity: intensity
    });
}

// Create entropy visualization particles
function createEntropyParticles() {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(config.entropyParticleCount * 3);
    const colors = new Float32Array(config.entropyParticleCount * 3);
    const sizes = new Float32Array(config.entropyParticleCount);
    
    // Create randomly distributed particles in a spherical volume
    for (let i = 0; i < config.entropyParticleCount; i++) {
        const i3 = i * 3;
        const phi = Math.acos(2 * Math.random() - 1);
        const theta = Math.random() * Math.PI * 2;
        
        // Random radius within a spherical shell
        const r = 100 + Math.random() * 100;
        
        positions[i3] = r * Math.sin(phi) * Math.cos(theta);
        positions[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        positions[i3 + 2] = r * Math.cos(phi);
        
        // Initial color - will be updated based on entropy
        colors[i3] = 1;
        colors[i3 + 1] = 0.5;
        colors[i3 + 2] = 0;
        
        // Random size
        sizes[i] = 0.5 + Math.random() * 2;
        
        // Store particle data
        entropyParticles.push({
            index: i,
            position: new THREE.Vector3(positions[i3], positions[i3 + 1], positions[i3 + 2]),
            velocity: new THREE.Vector3(
                (Math.random() - 0.5) * 0.2,
                (Math.random() - 0.5) * 0.2,
                (Math.random() - 0.5) * 0.2
            ),
            size: sizes[i],
            disturbance: Math.random()
        });
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    
    const material = new THREE.PointsMaterial({
        size: 2,
        transparent: true,
        opacity: 0.7,
        vertexColors: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false
    });
    
    const points = new THREE.Points(geometry, material);
    scene.add(points);
    
    // Store for animation
    particles = points;
}

// Update the entropy particles based on system entropy
function updateEntropyParticles() {
    const positions = particles.geometry.attributes.position.array;
    const colors = particles.geometry.attributes.color.array;
    const sizes = particles.geometry.attributes.size.array;
    
    // Normalized entropy (0-1)
    const normalizedEntropy = config.currentEntropy / config.maxEntropy;
    
    // Update each particle
    for (let i = 0; i < entropyParticles.length; i++) {
        const particle = entropyParticles[i];
        const i3 = i * 3;
        
        // Movement affected by entropy and learning
        if (learningActive) {
            // When learning is active, particles move more towards order
            // Calculate force towards nearest entity (Elder or Mentor)
            let nearestEntity = elder;
            let minDist = particle.position.distanceTo(elder.position);
            
            mentors.forEach(mentor => {
                const dist = particle.position.distanceTo(mentor.position);
                if (dist < minDist) {
                    minDist = dist;
                    nearestEntity = mentor;
                }
            });
            
            // Direction vector towards the entity
            const dirToEntity = new THREE.Vector3().subVectors(nearestEntity.position, particle.position).normalize();
            
            // Apply force towards entity (reverse diffusion - creates order)
            const learningForce = config.learningRate * (1 - normalizedEntropy);
            particle.velocity.add(dirToEntity.multiplyScalar(learningForce * 0.02));
            
            // Apply small random force (diffusion - creates disorder)
            const diffusionStrength = config.diffusionStrength * normalizedEntropy * 0.01;
            particle.velocity.add(new THREE.Vector3(
                (Math.random() - 0.5) * diffusionStrength,
                (Math.random() - 0.5) * diffusionStrength,
                (Math.random() - 0.5) * diffusionStrength
            ));
        } else {
            // When learning is inactive, natural diffusion dominates
            // Add random motion (diffusion)
            particle.velocity.add(new THREE.Vector3(
                (Math.random() - 0.5) * 0.02 * normalizedEntropy,
                (Math.random() - 0.5) * 0.02 * normalizedEntropy,
                (Math.random() - 0.5) * 0.02 * normalizedEntropy
            ));
        }
        
        // Apply velocity damping based on temperature
        particle.velocity.multiplyScalar(0.98 / config.temperature);
        
        // Update position
        particle.position.add(particle.velocity);
        
        // Keep particles within bounds (spherical container)
        const distFromCenter = particle.position.length();
        const maxRadius = 200;
        if (distFromCenter > maxRadius) {
            particle.position.normalize().multiplyScalar(maxRadius);
            // Reflect velocity (bounce off the boundary)
            const normal = particle.position.clone().normalize();
            const dot = particle.velocity.dot(normal);
            particle.velocity.sub(normal.multiplyScalar(2 * dot));
        }
        
        // Update buffer positions
        positions[i3] = particle.position.x;
        positions[i3 + 1] = particle.position.y;
        positions[i3 + 2] = particle.position.z;
        
        // Update color based on entropy and temperature
        // Hot (high entropy) = red, Cold (low entropy) = blue
        const colorT = normalizedEntropy * config.temperature;
        colors[i3] = Math.min(1, colorT); // R
        colors[i3 + 1] = Math.max(0, Math.min(0.5, 1 - colorT)); // G
        colors[i3 + 2] = Math.max(0, 1 - colorT); // B
        
        // Update size based on entropy "energy"
        const energyFactor = normalizedEntropy * config.temperature;
        sizes[i] = particle.size * (0.5 + energyFactor);
    }
    
    // Update geometry attributes
    particles.geometry.attributes.position.needsUpdate = true;
    particles.geometry.attributes.color.needsUpdate = true;
    particles.geometry.attributes.size.needsUpdate = true;
}

// Update the system entropy based on learning
function updateSystemEntropy() {
    // When learning is active, entropy decreases, otherwise it increases
    if (learningActive) {
        // Reverse diffusion effect: entropy decreases
        config.currentEntropy = Math.max(0.1, config.currentEntropy - (0.01 * config.learningRate / config.temperature));
    } else {
        // Natural diffusion effect: entropy increases
        config.currentEntropy = Math.min(config.maxEntropy, config.currentEntropy + (0.005 * config.temperature));
    }
    
    // Update display
    document.getElementById('entropy-value').textContent = config.currentEntropy.toFixed(2);
    document.getElementById('temperature-value').textContent = config.temperature.toFixed(2);
}

// Update gravitational fields visualization
function updateGravitationalFields() {
    gravitationalFields.forEach(field => {
        // Pulsate the field based on entity properties
        const entity = field.entity;
        const particles = field.particles;
        
        // Scale based on mass and entropy
        let scaleFactor = 1;
        
        if (entity.userData.type === 'elder') {
            scaleFactor = config.elderMass;
        } else if (entity.userData.type === 'mentor') {
            // Mentors become more influential with lower entropy (more ordered)
            const mentoringStrength = 1 - (config.currentEntropy / config.maxEntropy);
            scaleFactor = entity.userData.mass * (1 + mentoringStrength);
        }
        
        // Apply scale - affects the gravitational field visualization
        entity.scale.copy(entity.userData.originalScale).multiplyScalar(0.8 + (0.2 * scaleFactor));
        
        // Slightly animate the field particles
        const positions = particles.geometry.attributes.position.array;
        for (let i = 0; i < positions.length; i += 3) {
            // Add subtle movement based on time
            const noiseScale = 0.05;
            const noise = Math.sin(time + (i * 0.1)) * noiseScale;
            
            // Only apply to a subset of particles for a more natural look
            if ((i % 9) === 0) {
                positions[i] *= (1 + noise * 0.1);
                positions[i + 1] *= (1 + noise * 0.1);
                positions[i + 2] *= (1 + noise * 0.1);
            }
        }
        particles.geometry.attributes.position.needsUpdate = true;
    });
}

// Update entity positions and phases
function updateEntities() {
    // Update Elder rotation
    elder.rotation.y += elder.userData.phaseVelocity * (1 - config.currentEntropy / config.maxEntropy) * 0.5;
    
    // Update Mentors position and rotation
    mentors.forEach(mentor => {
        // Update phase
        mentor.userData.phase += mentor.userData.phaseVelocity / config.temperature;
        
        // Calculate new position based on orbit
        const radius = mentor.userData.orbitRadius;
        mentor.position.x = Math.cos(mentor.userData.phase) * radius;
        mentor.position.z = Math.sin(mentor.userData.phase) * radius;
        
        // Rotation
        mentor.rotation.y += mentor.userData.phaseVelocity * 2;
        
        // Update orbit visualization position
        mentor.userData.orbitVisual.position.copy(mentor.userData.orbitCenter);
    });
    
    // Update Erudites position and rotation
    erudites.forEach(erudite => {
        // Update phase
        erudite.userData.phase += erudite.userData.phaseVelocity / (config.temperature * 0.8);
        
        // Get parent mentor position
        const mentor = erudite.userData.parentMentor;
        
        // Calculate new position based on orbit around mentor
        const radius = erudite.userData.orbitRadius;
        const orbitX = Math.cos(erudite.userData.phase) * radius;
        const orbitZ = Math.sin(erudite.userData.phase) * radius;
        
        // Update position relative to mentor
        erudite.position.copy(mentor.position);
        erudite.position.x += orbitX;
        erudite.position.z += orbitZ;
        
        // Rotation
        erudite.rotation.y += erudite.userData.phaseVelocity * 3;
    });
}

// Set up control interactions
function setupControls() {
    // Learning rate slider
    document.getElementById('learning-rate').addEventListener('input', function(e) {
        config.learningRate = parseFloat(e.target.value);
        document.getElementById('learning-rate-value').textContent = config.learningRate.toFixed(2);
    });
    
    // Diffusion strength slider
    document.getElementById('diffusion').addEventListener('input', function(e) {
        config.diffusionStrength = parseFloat(e.target.value);
        document.getElementById('diffusion-value').textContent = config.diffusionStrength.toFixed(2);
    });
    
    // Temperature slider
    document.getElementById('temperature').addEventListener('input', function(e) {
        config.temperature = parseFloat(e.target.value);
        document.getElementById('temp-value').textContent = config.temperature.toFixed(2);
    });
    
    // Elder mass slider
    document.getElementById('elder-mass').addEventListener('input', function(e) {
        config.elderMass = parseFloat(e.target.value);
        document.getElementById('elder-mass-value').textContent = config.elderMass.toFixed(2);
    });
    
    // Learning toggle button
    document.getElementById('toggle-learning').addEventListener('click', function() {
        learningActive = !learningActive;
        this.textContent = `Toggle Learning (${learningActive ? 'On' : 'Off'})`;
    });
    
    // Reset system button
    document.getElementById('reset').addEventListener('click', function() {
        config.currentEntropy = 3.5;
        
        // Reset entities positions
        mentors.forEach((mentor, index) => {
            const goldenRatio = (1 + Math.sqrt(5)) / 2;
            const angle = index * (2 * Math.PI / goldenRatio);
            const radius = 60 + (index * 5);
            
            mentor.userData.phase = angle;
            mentor.position.x = radius * Math.cos(angle);
            mentor.position.z = radius * Math.sin(angle);
        });
        
        // Reset orbit controls
        controls.reset();
    });
}

// Handle window resize
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    time += 0.01;
    
    // Update controls
    controls.update();
    
    // Update entities position and rotation
    updateEntities();
    
    // Update gravitational fields
    updateGravitationalFields();
    
    // Update entropy and particles
    updateSystemEntropy();
    updateEntropyParticles();
    
    // Render scene
    renderer.render(scene, camera);
}

// Initialize when the page loads
window.onload = init;