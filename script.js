const phoneHref = "tel:+420602880022";

const vehicles = [
  {
    name: "Škoda Octavia III Kombi",
    transmission: "automat",
    engine: "1.6 TDI",
    power: "77 kW",
    day: "1 600 Kč",
    month: "18 000 Kč",
    deposit: "5 000 Kč",
    type: "kombi",
    image: "assets/car-octavia-iii-kombi.jpg"
  },
  {
    name: "Škoda Octavia III",
    transmission: "manuál",
    engine: "1.6 TDI",
    power: "66 kW",
    day: "1 400 Kč",
    month: "16 000 Kč",
    deposit: "5 000 Kč",
    type: "sedan",
    image: "assets/car-octavia-iii-tdi.jpg"
  },
  {
    name: "Škoda Octavia III",
    transmission: "manuál",
    engine: "1.2 TSI",
    power: "66 kW",
    day: "1 400 Kč",
    month: "16 000 Kč",
    deposit: "5 000 Kč",
    type: "sedan",
    image: "assets/car-octavia-iii-tsi.jpg"
  },
  {
    name: "Škoda Fabia III Kombi",
    transmission: "manuál",
    engine: "1.4 TDI",
    power: "66 kW",
    day: "1 000 Kč",
    month: "14 000 Kč",
    deposit: "5 000 Kč",
    type: "kombi",
    image: "assets/car-fabia-iii-kombi.jpg"
  },
  {
    name: "Škoda Rapid",
    transmission: "manuál",
    engine: "1.2 TSI",
    power: "81 kW",
    day: "1 100 Kč",
    month: "16 000 Kč",
    deposit: "5 000 Kč",
    type: "sedan",
    image: "assets/car-rapid.jpg"
  },
  {
    name: "Škoda Octavia II Kombi",
    transmission: "manuál",
    engine: "1.6 TDI",
    power: "77 kW",
    day: "1 000 Kč",
    month: "14 000 Kč",
    deposit: "5 000 Kč",
    type: "kombi",
    image: "assets/car-octavia-ii-kombi.jpg"
  },
  {
    name: "Mercedes-Benz Citan",
    transmission: "manuál",
    engine: "1.5 CDI",
    power: "66 kW",
    day: "1 100 Kč",
    month: "16 000 Kč",
    deposit: "5 000 Kč",
    type: "van",
    image: "assets/car-citan.jpg"
  },
  {
    name: "VW Crafter L1H1",
    transmission: "manuál",
    engine: "2.5 TDI",
    power: "dodávka",
    day: "1 600 Kč",
    month: "18 000 Kč",
    deposit: "5 000 Kč",
    type: "van",
    image: "assets/car-crafter.jpg"
  }
];

const fleetGrid = document.querySelector("#fleet-grid");

if (fleetGrid) {
  fleetGrid.innerHTML = vehicles
    .map(
      (car) => `
        <article class="fleet-card ${car.type === "van" ? "is-van" : ""}">
          <div class="car-photo">
            <img src="${car.image}" alt="${car.name} v bílé barvě pro půjčení auta v Mostě u OKAUTA" loading="lazy" decoding="async" width="443" height="443">
          </div>
          <div class="fleet-content">
            <h3>${car.name}</h3>
            <ul class="fleet-meta">
              <li>${car.transmission}</li>
              <li>${car.engine}</li>
              <li>${car.power}</li>
            </ul>
            <div class="price-row">
              <div><span>1 den</span><strong>${car.day}</strong></div>
              <div><span>1 měsíc</span><strong>${car.month}</strong></div>
              <div><span>kauce</span><strong>${car.deposit}</strong></div>
            </div>
            <a class="btn btn-primary" href="${phoneHref}" aria-label="Rezervovat ${car.name} telefonem">Rezervovat</a>
          </div>
        </article>
      `
    )
    .join("");
}

const header = document.querySelector("[data-header]");
const mobileCta = document.querySelector(".mobile-cta");
let isHeaderScrolled = false;
let isMobileCtaVisible = false;
let scrollTicking = false;

const setHeaderState = () => {
  const scrollY = window.scrollY;
  const nextHeaderState = scrollY > 24;
  const nextMobileCtaState = scrollY > 260;

  if (nextHeaderState !== isHeaderScrolled) {
    header?.classList.toggle("is-scrolled", nextHeaderState);
    isHeaderScrolled = nextHeaderState;
  }

  if (nextMobileCtaState !== isMobileCtaVisible) {
    mobileCta?.classList.toggle("is-visible", nextMobileCtaState);
    isMobileCtaVisible = nextMobileCtaState;
  }
};

const requestHeaderState = () => {
  if (scrollTicking) return;

  scrollTicking = true;
  window.requestAnimationFrame(() => {
    setHeaderState();
    scrollTicking = false;
  });
};

requestHeaderState();
window.addEventListener("scroll", requestHeaderState, { passive: true });

const revealTargets = document.querySelectorAll(
  ".section-heading, .reservation-actions, .benefit-card, .fleet-card, .steps article, .rules-grid article, .reviews-grid figure, .reviews-actions, .faq-list details, .contact-card, .parking-photo, .map-wrap"
);

if ("IntersectionObserver" in window) {
  revealTargets.forEach((target, index) => {
    target.classList.add("reveal");
    target.style.transitionDelay = `${Math.min(index % 8, 5) * 45}ms`;
  });

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
  );

  revealTargets.forEach((target) => revealObserver.observe(target));
} else {
  revealTargets.forEach((target) => target.classList.add("is-visible"));
}
