// ham
const $ham = document.querySelector(".ham");
const $gnb = document.querySelector(".gnb");
const $gnbLi = document.querySelectorAll(".gnb > li");
const $sub = document.querySelectorAll(".sub");

$ham.addEventListener("click", () => {
  $ham.classList.toggle("on");
  $gnb.classList.toggle("on");
  $sub.forEach((e) => {
    e.classList.remove("on");
  });
});

$gnbLi.forEach((btn, i) => {
  btn.addEventListener("click", () => {
    $sub[i].classList.toggle("on");
    $sub.forEach((e) => {
      e.classList.remove("on");
    });
    $sub[i].classList.add("on");
  });
});

// 시설소개 슬라이드
var swiper = new Swiper(".content_box", {
  spaceBetween: 0,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  loop: true,
  pagination: {
    el: ".pg",
    clickable: true,
  },
});
