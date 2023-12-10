// 햄버거 메뉴 클릭하면 #gnb-mo 등장
const menuToggleBtn = document.querySelector('.menu-toggle-btn');
const menuHide = document.querySelector('.gnb-t-m');
let isHideMenu = false;

menuToggleBtn.addEventListener('click', function() {
  isHideMenu = !isHideMenu;
  if(isHideMenu) {
    menuHide.classList.add('show');
    menuToggleBtn.classList.add('active');
  } else {
    menuHide.classList.remove('show');
    menuToggleBtn.classList.remove('active');
  }
});

const swiperTwo = new Swiper(".see-more-menu .swiper", {
  direction: "horizontal",
  slidesPerView: 4, //한 번에 보여줄 슬라이드 개수
  spaceBetween: 10, //슬라이드 사이 여백
  loop: true,
  autoplay: {
    delay: 3200,
  },
  navigation: {
    // 슬라이드 이전/다음 버튼 사용 여부
    prevEl: ".see-more-menu .swiper-prev", // 이전 버튼 선택자
    nextEl: ".see-more-menu .swiper-next", // 다음 버튼 선택자
  },
  breakpoints: { //반응형 조건 속성
    320: { //320 이상일 경우
      slidesPerView: 1, //레이아웃 2열
    },
    768: {
      slidesPerView: 3,
    },
    1200: {
      slidesPerView: 4,
    },
  }
});


// Scroll Magic
const spyEl = document.querySelectorAll('section.scroll-spy');
spyEl.forEach(function(spyEl) {
  new ScrollMagic.Scene({
    triggerElement: spyEl, // 보여짐 여부를 감지할 요소를 지정
    triggerHook: 0.8, // 시간
  })
  // show를 넣었다 뺐다가
  // .setClassToggle(토글할요소, '넣었다 뺄 class이름')
  .setClassToggle(spyEl, 'show')
  .addTo(new ScrollMagic.Controller());
});


// 아코디언 메뉴
const main = document.querySelectorAll('.main');

for(let i = 0; i < main.length; i++) {
  main[i].addEventListener('click', function() {
    // 다른 메뉴 클릭 시, 기존에 열어 둔 서브 메뉴 비활성화
    for(let j = 0; j < main.length; j++) {
      main[j].classList.remove('active');
      if(this !== main[j]) {  // this는 j
        main[j].nextElementSibling.style.maxHeight = null;
      }
    }
    // 메뉴 클릭시 서브메뉴 활성화
    this.classList.toggle('active');
    const sub = this.nextElementSibling;
    if(sub.style.maxHeight) {
      sub.style.maxHeight = null;
    } else {
      sub.style.maxHeight = sub.scrollHeight + 'px';
    }
  });
}


// 스크롤하면 메뉴 바뀌기
window.addEventListener('scroll', function() {
  if (window.scrollY > 0) {
    document.querySelector('header').classList.add('active');
  } else {
    document.querySelector('header').classList.remove('active');
  }
});


// Order now 이미지 플로팅
function random(min, max) {
  // `.toFixed()`를 통해 반환된 문자 데이터를,
  // `parseFloat()`을 통해 소수점을 가지는 숫자 데이터로 변환
  return parseFloat((Math.random() * (max - min) + min).toFixed(2));
}

function floatingObject(selector, delay, size) {
  gsap.to(selector, random(3, 2), {
    y: size,
    repeat: -1, //몇번 반복할지  설정, -1은 무한반복
    yoyo: true, //한번 재생된 애니메이션을 다시 뒤로 재생
    ease: Power3.easeInOut, //gsap easing
    delay: random(0, delay),
  });
}
floatingObject('.floating1', .2, 15)
floatingObject('.floating2', .4, 15)
floatingObject('.floating3', .6, 15)


// To-top Button
const toTopEl = document.querySelector('#to-top');

window.addEventListener('scroll',_.throttle(function() {
  if(window.scrollY > 500) {
    // 탑 버튼 보이기
    gsap.to(toTopEl, 0.2, {
      x: 0
    })
  } else {
    // 탑 버튼 숨기기
    gsap.to(toTopEl, 0.2, {
      x: 100
    });
  }
}, 300));

toTopEl.addEventListener('click', function() { // top버튼을 클릭하면 상단으로 이동
  gsap.to(window, 0.4, {
    scrollTo: 0
  })
});