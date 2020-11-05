// DOM Elements
const cards = document.getElementById("cards");
const copyright = document.getElementById("year")

AOS.init({
  offset: 120,
  duration: 1000
});

fetchData();

async function fetchData() {
  try {
    const res = await fetch('./data.json')
    const data = await res.json()
    setupCards(data);
    return data;
  } catch (error) {
    console.log(error)
  }
}

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