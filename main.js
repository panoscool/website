// DOM Elements
const header = document.querySelector("header");
const intro = document.querySelector(".showcase");
const cards = document.getElementById("cards");
const copyright = document.getElementById("year");
const menuBtn = document.getElementById("menu-btn");
const links = document.querySelectorAll(".link");

AOS.init({
  offset: 120,
  duration: 1000
});

const introOptions = {
  rootMargin: "-100px 0px 0px 0px",
  threshold: 0.5
};

const introObserver = new IntersectionObserver(sectionCheck, introOptions);

function sectionCheck(entries, observer) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      header.classList.add("navbar-scrolled");
    } else {
      header.classList.remove("navbar-scrolled");
    }
  })
}

introObserver.observe(intro);

fetchData();

async function fetchData() {
  try {
    const res = await fetch('./data.json')
    const data = await res.json()
    setupCards(data);
    return data;
  } catch (error) {
    console.log(error);
  }
}

const handleCheck = () => {
  if (menuBtn.checked) {
    menuBtn.checked = !menuBtn.checked;
  }
}

links.forEach(link => link.addEventListener('click', handleCheck));

const setupCards = (data) => {
  let card = '';
  data.forEach(({ img, url, brand, service, social }) => {
    let socialLinks = '';
    social.map(({ link, name }, idx, social) => {
      socialLinks += `<a key=${name} href=${link} target="_blank" rel="noopener noreferrer">${social.length + 1 !== idx && idx !== 0 ? `, ${name}` : name}</a>`
    });

    card += `
      <div class="card">
       <div class="card-inner">
          <div class="card-front">
            <img src=${img} alt="logo">
          </div>
          <div class="card-back">
            <h4>${brand}</h4>
            <p><strong>Website:</strong> <a href="https://${url}" target="_blank" rel="noopener noreferrer">${url}</a></p>
            <p><strong>Social:</strong> ${socialLinks}</p>
            <p><strong>Services:</strong> ${service}</p>
          </div>
        </div>
      </div>
    `;
  })
  cards.innerHTML = card;
}

copyright.innerHTML = new Date().getFullYear();