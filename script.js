// =========================
// WEBSITE VISIT HANDLER
// =========================

function visitWebsite(url) {
    if (!url || url.trim() === "") {
        openPopup();
        return;
    }

    window.open(url, "_blank");
}

// =========================
// POPUP CONTROLS
// =========================

function openPopup() {
    const popup = document.getElementById("popup");
    popup.classList.remove("hidden");
    document.body.style.overflow = "hidden";
}

function closePopup() {
    const popup = document.getElementById("popup");
    popup.classList.add("hidden");
    document.body.style.overflow = "auto";
}

// Close popup on outside click
window.addEventListener("click", function (event) {
    const popup = document.getElementById("popup");
    if (event.target === popup) {
        closePopup();
    }
});

// Close popup on ESC key
document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        closePopup();
    }
});

// =========================
// HAMBURGER MENU
// =========================

const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");

if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    });

    // Close menu when a nav link is clicked
    navMenu.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            hamburger.classList.remove("active");
            navMenu.classList.remove("active");
        });
    });
}

// =========================
// NAVBAR SCROLL EFFECT
// =========================

const navbar = document.querySelector("nav");

window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});

// =========================
// NAVBAR ACTIVE LINK
// =========================

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll("nav ul li a");

function updateActiveLink() {
    const scrollY = window.scrollY + 200;

    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute("id");

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            navLinks.forEach((link) => {
                link.classList.remove("active-link");
                if (link.getAttribute("href") === `#${sectionId}`) {
                    link.classList.add("active-link");
                }
            });
        }
    });
}

window.addEventListener("scroll", updateActiveLink);
updateActiveLink();

// =========================
// SCROLL REVEAL ANIMATION
// =========================

const revealElements = document.querySelectorAll(
    ".card, .skill-card, .project-card, .experience-card"
);

const revealOnScroll = () => {
    const windowHeight = window.innerHeight;

    revealElements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;

        if (elementTop < windowHeight - 80) {
            element.classList.add("show-element");
        }
    });
};

window.addEventListener("scroll", revealOnScroll);

// Run once on load
revealOnScroll();

// =========================
// TYPEWRITER EFFECT
// =========================

const heroTitle = document.querySelector(".hero h2");
const phrases = [
    "DevOps Engineer",
    "Cloud Enthusiast",
    "Full Stack Developer",
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 60;

function typeWriter() {
    if (!heroTitle) return;

    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
        heroTitle.innerHTML =
            currentPhrase.substring(0, charIndex - 1) +
            '<span class="cursor"></span>';
        charIndex--;
        typeSpeed = 30;
    } else {
        heroTitle.innerHTML =
            currentPhrase.substring(0, charIndex + 1) +
            '<span class="cursor"></span>';
        charIndex++;
        typeSpeed = 60;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
        typeSpeed = 2000; // Pause at end
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 400; // Pause before next phrase
    }

    setTimeout(typeWriter, typeSpeed);
}

if (heroTitle) {
    heroTitle.innerHTML = '<span class="cursor"></span>';
    window.addEventListener("load", () => {
        setTimeout(typeWriter, 800);
    });
}

// =========================
// ANIMATED STAT COUNTERS
// =========================

function animateCounters() {
    const counters = document.querySelectorAll(".stat-number");

    counters.forEach((counter) => {
        const target = parseInt(counter.getAttribute("data-target"));
        const duration = 1500;
        const startTime = performance.now();

        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);

            counter.textContent = Math.floor(target * eased);

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        }

        requestAnimationFrame(updateCounter);
    });
}

// Trigger counter animation when about section is visible
const aboutSection = document.getElementById("about");
let countersAnimated = false;

if (aboutSection) {
    const counterObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && !countersAnimated) {
                    countersAnimated = true;
                    animateCounters();
                }
            });
        },
        { threshold: 0.3 }
    );

    counterObserver.observe(aboutSection);
}

// =========================
// FLOATING PARTICLES
// =========================

const hero = document.querySelector(".hero");

if (hero) {
    for (let i = 0; i < 25; i++) {
        const particle = document.createElement("span");
        particle.classList.add("particle");

        particle.style.left = Math.random() * 100 + "%";
        particle.style.animationDuration = Math.random() * 12 + 10 + "s";
        particle.style.animationDelay = Math.random() * 8 + "s";

        // Vary particle size
        const size = Math.random() * 3 + 1;
        particle.style.width = size + "px";
        particle.style.height = size + "px";

        // Randomly color some particles purple
        if (Math.random() > 0.6) {
            particle.style.background = "rgba(168, 85, 247, 0.4)";
        }

        hero.appendChild(particle);
    }
}

// =========================
// HIDE SCROLL INDICATOR ON SCROLL
// =========================

const scrollIndicator = document.getElementById("scroll-indicator");

if (scrollIndicator) {
    window.addEventListener("scroll", () => {
        if (window.scrollY > 100) {
            scrollIndicator.style.opacity = "0";
            scrollIndicator.style.pointerEvents = "none";
        } else {
            scrollIndicator.style.opacity = "1";
            scrollIndicator.style.pointerEvents = "auto";
        }
    });
}