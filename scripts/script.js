// Accordion
const accordion = document.getElementsByClassName('acc-container');
for (i = 0; i < accordion.length; i++) {
    accordion[i].addEventListener('click', function () {
        this.classList.toggle('active')
    })
}

//smoothScroll
function smoothScrollTo(element) {
    const targetPosition = element.getBoundingClientRect().top;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 1000;
    let start = null;

    window.requestAnimationFrame(step);

    function step(timestamp) {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        window.scrollTo(0, startPosition + distance * (progress / duration));
        if (progress < duration) window.requestAnimationFrame(step);
    }
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        smoothScrollTo(targetElement);
    });
});

//Marquee
// Выбор элемента списка
const marqueeList = document.querySelector('.marquee-list');

// Создание строки с разделителями 
const splitter = '<span class="splitter"></span>';

// Сбор всех текстов из элементов списка и добавление разделителя
let fullText = '';
const listItems = marqueeList.querySelectorAll('.runnig-line-text');
listItems.forEach((item, index) => {
    fullText += item.textContent.trim();
    if (index < listItems.length - 1) {
        fullText += ` ${splitter} `;
    }
});

// Дублирование текста с разделителями
let text = fullText;
for (let i = 0; i < 5; i++) {
    text += ' ' + fullText;
}

// // Установка обновленного текста в первый элемент списка
marqueeList.innerHTML = `<li>${text}</li>`;

// // Создание эффекта бегущей строки
function startMarquee(element, speed) {
    element.style.whiteSpace = 'nowrap';
    let scrollAmount = 0;

    const step = function () {
        element.scrollLeft += speed;
        scrollAmount += speed;
        if (scrollAmount >= element.scrollWidth / 2) {
            element.scrollLeft = 0;
            scrollAmount = 0;
        }
        window.requestAnimationFrame(step);
    };
    window.requestAnimationFrame(step);
};

// // Запуск бегущей строки
startMarquee(marqueeList, 1.5);

//Modal windows 

const mapBtns = document.getElementsByClassName('map-btn');
const openFormBtn = document.getElementsByClassName('leave-contacts');

const formContent = document.getElementById('contact-form').cloneNode(true);

function mapContent() {
    const content = document.createElement('div');
    const map = document.createElement('div');
    const mapAdress = document.createElement('div');
    const adressLine = document.createElement('adress');
    const adressMetro = document.createElement('span');
    const adressParking = document.createElement('span');

    content.classList.add('map-content');
    mapAdress.classList.add('map-adress');
    map.classList.add('map-visual');
    adressMetro.classList.add('map-metro');
    adressParking.classList.add('map-parking');
    adressLine.innerHTML = "123308, <br> г. Москва, <br> проспект Маршала Жукова, дом 4, этаж 6, офис 600";
    adressMetro.innerText = 'Полежаевская, Хорошево';
    adressParking.innerText = 'Есть парковка';

    content.append(map, mapAdress);
    mapAdress.append(adressLine);
    mapAdress.append(adressMetro);
    mapAdress.append(adressParking);

    return content;
}

Array.from(mapBtns).forEach((btn) => {
    btn.addEventListener('click', () => createModal(mapContent()));
});

Array.from(openFormBtn).forEach((btn) => {
    btn.addEventListener('click', () => createModal(formContent));
});


function createModal(content) {
    const body = document.body;
    const modalWrapper = document.createElement('div');
    const modalBody = document.createElement('div');
    const btnCross = document.createElement('span');


    body.classList.add('modal-opened');
    modalWrapper.classList.add('modal-wrapper');
    modalBody.classList.add('modal-body');
    btnCross.classList.add('btn-cross');

    modalBody.append(content);
    modalBody.append(btnCross);
    modalWrapper.append(modalBody);
    body.append(modalWrapper);

    content === formContent ? modalBody.style.height = '700px' : modalBody.style.height = '600px';

    function handleModalClick(e) {
        const target = e.target;
        if (!target.closest('.modal-body') || target.closest('.btn-cross')) {
            document.body.removeChild(modalWrapper);
            document.body.classList.remove('modal-opened');

            modalWrapper.removeEventListener('click', handleModalClick);
        }
    }
    modalWrapper.addEventListener('click', handleModalClick);
}
