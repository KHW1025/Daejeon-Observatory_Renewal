////////////////////// ham
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

////////////////////// tab menu
const $tabMenu = document.querySelectorAll(".tab_menu>li");
const $tabList = document.querySelectorAll(".tab_list");

$tabMenu.forEach((btn, i) => {
  btn.addEventListener("click", function () {
    $tabMenu.forEach((a) => {
      a.classList.remove("on");
    });
    $tabMenu[i].classList.add("on");

    $tabList.forEach((b) => {
      b.classList.remove("on");
    });
    $tabList[i].classList.add("on");
  });
});

////////////////////// 달력1
function CalendarControl1() {
  const calendar = new Date();
  const calendarControl1 = {
    localDate: new Date(),
    prevMonthLastDate: null,
    dateToday: null,
    calWeekDays: ["일", "월", "화", "수", "목", "금", "토"],
    calMonthName: [
      "1월",
      "2월",
      "3월",
      "4월",
      "5월",
      "6월",
      "7월",
      "8월",
      "9월",
      "10월",
      "11월",
      "12월",
    ],
    daysInMonth: function (month, year) {
      return new Date(year, month, 0).getDate();
    },
    firstDay: function () {
      return new Date(calendar.getFullYear(), calendar.getMonth(), 1);
    },
    lastDay: function () {
      return new Date(calendar.getFullYear(), calendar.getMonth() + 1, 0);
    },
    firstDayNumber: function () {
      return calendarControl1.firstDay().getDay() + 1;
    },
    lastDayNumber: function () {
      return calendarControl1.lastDay().getDay() + 1;
    },
    getPreviousMonthLastDate: function () {
      let lastDate = new Date(
        calendar.getFullYear(),
        calendar.getMonth(),
        0
      ).getDate();
      return lastDate;
    },
    navigateToPreviousMonth: function () {
      calendar.setDate(1);
      calendar.setMonth(calendar.getMonth() - 1);
      calendarControl1.attachEventsOnNextPrev();
    },
    navigateToNextMonth: function () {
      calendar.setDate(1);
      calendar.setMonth(calendar.getMonth() + 1);
      calendarControl1.attachEventsOnNextPrev();
    },
    navigateToCurrentMonth: function () {
      let currentDate = calendarControl1.localDate.getDate();
      let currentMonth = calendarControl1.localDate.getMonth();
      let currentYear = calendarControl1.localDate.getFullYear();
      calendar.setDate(currentDate);
      calendar.setMonth(currentMonth);
      calendar.setYear(currentYear);
      calendarControl1.attachEventsOnNextPrev();
    },
    displayYear: function () {
      let yearLabel = document.querySelector(".calendar1 .calendar-year-label");
      yearLabel.innerHTML = calendar.getFullYear();
    },
    displayMonth: function () {
      let monthLabel = document.querySelector(
        ".calendar1 .calendar-month-label"
      );
      monthLabel.innerHTML = calendarControl1.calMonthName[calendar.getMonth()];
    },
    selectDate: function (e) {
      console.log(
        `${e.target.textContent} ${
          calendarControl1.calMonthName[calendar.getMonth()]
        } ${calendar.getFullYear()}`
      );
    },
    plotSelectors: function () {
      document.querySelector(
        ".calendar1"
      ).innerHTML += `<div class="calendar-inner"><div class="calendar-controls">
        <div class="calendar-prev"><a href="#"><i class="fa-solid fa-chevron-left"></i></a></div>
        <div class="calendar-year-month">
        <div class="calendar-year-label"></div>
        <div class="yearKo">년</div>
        <div class="calendar-month-label"></div>&nbsp;(개인예약)
        </div>
        <div class="calendar-next"><a href="#"><i class="fa-solid fa-angle-right"></i></a></div>
        </div>
        <div class="calendar-today-date"> 
        ${calendarControl1.localDate.getFullYear()}년
        ${calendarControl1.calMonthName[calendarControl1.localDate.getMonth()]} 
        ${calendarControl1.localDate.getDate()}일 
        (${
          calendarControl1.calWeekDays[calendarControl1.localDate.getDay()]
        })   
        </div>
        <div class="calendar-body"></div></div>`;
    },
    plotDayNames: function () {
      for (let i = 0; i < calendarControl1.calWeekDays.length; i++) {
        document.querySelector(
          ".calendar1 .calendar-body"
        ).innerHTML += `<div>${calendarControl1.calWeekDays[i]}</div>`;
      }
    },
    plotDates: function () {
      document.querySelector(".calendar1 .calendar-body").innerHTML = "";
      calendarControl1.plotDayNames();
      calendarControl1.displayMonth();
      calendarControl1.displayYear();
      let count = 1;
      let prevDateCount = 0;

      calendarControl1.prevMonthLastDate =
        calendarControl1.getPreviousMonthLastDate();
      let prevMonthDatesArray = [];
      let calendarDays = calendarControl1.daysInMonth(
        calendar.getMonth() + 1,
        calendar.getFullYear()
      );
      // dates of current month
      for (let i = 1; i < calendarDays; i++) {
        if (i < calendarControl1.firstDayNumber()) {
          prevDateCount += 1;
          document.querySelector(
            ".calendar1 .calendar-body"
          ).innerHTML += `<div class="prev-dates"></div>`;
          prevMonthDatesArray.push(calendarControl1.prevMonthLastDate--);
        } else {
          document.querySelector(
            ".calendar1 .calendar-body"
          ).innerHTML += `<div class="number-item" data-num=${count}><a class="dateNumber" href="#">${count++}</a></div>`;
        }
      }
      //remaining dates after month dates
      for (let j = 0; j < prevDateCount + 1; j++) {
        document.querySelector(
          ".calendar1 .calendar-body"
        ).innerHTML += `<div class="number-item" data-num=${count}><a class="dateNumber" href="#">${count++}</a></div>`;
      }
      calendarControl1.highlightToday();
      calendarControl1.plotPrevMonthDates(prevMonthDatesArray);
      calendarControl1.plotNextMonthDates();
    },
    attachEvents: function () {
      let prevBtn = document.querySelector(".calendar1 .calendar-prev a");
      let nextBtn = document.querySelector(".calendar1 .calendar-next a");
      let todayDate = document.querySelector(".calendar1 .calendar-today-date");
      let dateNumber = document.querySelectorAll(".calendar1 .dateNumber");
      prevBtn.addEventListener(
        "click",
        calendarControl1.navigateToPreviousMonth
      );
      nextBtn.addEventListener("click", calendarControl1.navigateToNextMonth);
      todayDate.addEventListener(
        "click",
        calendarControl1.navigateToCurrentMonth
      );
      for (var i = 0; i < dateNumber.length; i++) {
        dateNumber[i].addEventListener(
          "click",
          calendarControl1.selectDate,
          false
        );
      }
    },
    highlightToday: function () {
      this.dateToday = calendarControl1.localDate.getDate();
      let currentMonth = calendarControl1.localDate.getMonth() + 1;
      let changedMonth = calendar.getMonth() + 1;
      let currentYear = calendarControl1.localDate.getFullYear();
      let changedYear = calendar.getFullYear();
      if (
        currentYear === changedYear &&
        currentMonth === changedMonth &&
        document.querySelectorAll(".number-item")
      ) {
        document
          .querySelectorAll(".number-item")
          [this.dateToday - 1].classList.add("calendar-today");
      }
    },
    plotPrevMonthDates: function (dates) {
      dates.reverse();
      for (let i = 0; i < dates.length; i++) {
        if (document.querySelectorAll(".prev-dates")) {
          document.querySelectorAll(".prev-dates")[i].textContent = dates[i];
        }
      }
    },
    plotNextMonthDates: function () {
      let childElemCount =
        document.querySelector(".calendar-body").childElementCount;
      //7 lines
      if (childElemCount > 42) {
        let diff = 49 - childElemCount;
        calendarControl1.loopThroughNextDays(diff);
      }

      //6 lines
      if (childElemCount > 35 && childElemCount <= 42) {
        let diff = 42 - childElemCount;
        calendarControl1.loopThroughNextDays(42 - childElemCount);
      }
    },
    loopThroughNextDays: function (count) {
      if (count > 0) {
        for (let i = 1; i <= count; i++) {
          document.querySelector(
            ".calendar-body"
          ).innerHTML += `<div class="next-dates">${i}</div>`;
        }
      }
    },
    attachEventsOnNextPrev: function () {
      calendarControl1.plotDates();
      calendarControl1.attachEvents();
    },
    init: function () {
      calendarControl1.plotSelectors();
      calendarControl1.plotDates();
      calendarControl1.attachEvents();
    },
  };
  calendarControl1.init();

  // 시간표
  const timeTableDay1 = document.querySelector(".time_table_today1");

  timeTableDay1.innerHTML = `
    <div class="calendar-today-date"> 
    ${calendarControl1.localDate.getFullYear()}년
    ${calendarControl1.calMonthName[calendarControl1.localDate.getMonth()]} 
    ${calendarControl1.localDate.getDate()}일 
    (${calendarControl1.calWeekDays[calendarControl1.localDate.getDay()]})   
    </div>
    `;
}
const calendarControl1 = new CalendarControl1();

////////////////////// 달력2
function CalendarControl2() {
  const calendar = new Date();
  const calendarControl2 = {
    localDate: new Date(),
    prevMonthLastDate: null,
    dateToday: null,
    calWeekDays: ["일", "월", "화", "수", "목", "금", "토"],
    calMonthName: [
      "1월",
      "2월",
      "3월",
      "4월",
      "5월",
      "6월",
      "7월",
      "8월",
      "9월",
      "10월",
      "11월",
      "12월",
    ],
    daysInMonth: function (month, year) {
      return new Date(year, month, 0).getDate();
    },
    firstDay: function () {
      return new Date(calendar.getFullYear(), calendar.getMonth(), 1);
    },
    lastDay: function () {
      return new Date(calendar.getFullYear(), calendar.getMonth() + 1, 0);
    },
    firstDayNumber: function () {
      return calendarControl2.firstDay().getDay() + 1;
    },
    lastDayNumber: function () {
      return calendarControl2.lastDay().getDay() + 1;
    },
    getPreviousMonthLastDate: function () {
      let lastDate = new Date(
        calendar.getFullYear(),
        calendar.getMonth(),
        0
      ).getDate();
      return lastDate;
    },
    navigateToPreviousMonth: function () {
      calendar.setDate(1);
      calendar.setMonth(calendar.getMonth() - 1);
      calendarControl2.attachEventsOnNextPrev();
    },
    navigateToNextMonth: function () {
      calendar.setDate(1);
      calendar.setMonth(calendar.getMonth() + 1);
      calendarControl2.attachEventsOnNextPrev();
    },
    navigateToCurrentMonth: function () {
      let currentDate = calendarControl2.localDate.getDate();
      let currentMonth = calendarControl2.localDate.getMonth();
      let currentYear = calendarControl2.localDate.getFullYear();
      calendar.setDate(currentDate);
      calendar.setMonth(currentMonth);
      calendar.setYear(currentYear);
      calendarControl2.attachEventsOnNextPrev();
    },
    displayYear: function () {
      let yearLabel = document.querySelector(".calendar2 .calendar-year-label");
      yearLabel.innerHTML = calendar.getFullYear();
    },
    displayMonth: function () {
      let monthLabel = document.querySelector(
        ".calendar2 .calendar-month-label"
      );
      monthLabel.innerHTML = calendarControl2.calMonthName[calendar.getMonth()];
    },
    selectDate: function (e) {
      console.log(
        `${e.target.textContent} ${
          calendarControl2.calMonthName[calendar.getMonth()]
        } ${calendar.getFullYear()}`
      );
    },
    plotSelectors: function () {
      document.querySelector(
        ".calendar2"
      ).innerHTML += `<div class="calendar-inner"><div class="calendar-controls">
        <div class="calendar-prev"><a href="#"><i class="fa-solid fa-chevron-left"></i></a></div>
        <div class="calendar-year-month">
        <div class="calendar-year-label"></div>
        <div class="yearKo">년</div>
        <div class="calendar-month-label"></div>&nbsp;(단체예약)
        </div>
        <div class="calendar-next"><a href="#"><i class="fa-solid fa-angle-right"></i></a></div>
        </div>
        <div class="calendar-today-date"> 
        ${calendarControl2.localDate.getFullYear()}년
        ${calendarControl2.calMonthName[calendarControl2.localDate.getMonth()]} 
        ${calendarControl2.localDate.getDate()}일 
        (${
          calendarControl2.calWeekDays[calendarControl2.localDate.getDay()]
        })   
        </div>
        <div class="calendar-body calendar-body2"></div></div>`;
    },
    plotDayNames: function () {
      for (let i = 0; i < calendarControl2.calWeekDays.length; i++) {
        document.querySelector(
          ".calendar2 .calendar-body2"
        ).innerHTML += `<div>${calendarControl2.calWeekDays[i]}</div>`;
      }
    },
    plotDates: function () {
      document.querySelector(".calendar2 .calendar-body2").innerHTML = "";
      calendarControl2.plotDayNames();
      calendarControl2.displayMonth();
      calendarControl2.displayYear();
      let count = 1;
      let prevDateCount = 0;

      calendarControl2.prevMonthLastDate =
        calendarControl2.getPreviousMonthLastDate();
      let prevMonthDatesArray = [];
      let calendarDays = calendarControl2.daysInMonth(
        calendar.getMonth() + 1,
        calendar.getFullYear()
      );
      // dates of current month
      for (let i = 1; i < calendarDays; i++) {
        if (i < calendarControl2.firstDayNumber()) {
          prevDateCount += 1;
          document.querySelector(
            ".calendar2 .calendar-body2"
          ).innerHTML += `<div class="prev-dates2"></div>`;
          prevMonthDatesArray.push(calendarControl2.prevMonthLastDate--);
        } else {
          document.querySelector(
            ".calendar2 .calendar-body2"
          ).innerHTML += `<div class="number-item2" data-num=${count}><a class="dateNumber" href="#">${count++}</a></div>`;
        }
      }
      //remaining dates after month dates
      for (let j = 0; j < prevDateCount + 1; j++) {
        document.querySelector(
          ".calendar2 .calendar-body2"
        ).innerHTML += `<div class="number-item2" data-num=${count}><a class="dateNumber" href="#">${count++}</a></div>`;
      }
      calendarControl2.highlightToday();
      calendarControl2.plotPrevMonthDates(prevMonthDatesArray);
      calendarControl2.plotNextMonthDates();
    },
    attachEvents: function () {
      let prevBtn = document.querySelector(".calendar2 .calendar-prev a");
      let nextBtn = document.querySelector(".calendar2 .calendar-next a");
      let todayDate = document.querySelector(".calendar2 .calendar-today-date");
      let dateNumber = document.querySelectorAll(".calendar2 .dateNumber");
      prevBtn.addEventListener(
        "click",
        calendarControl2.navigateToPreviousMonth
      );
      nextBtn.addEventListener("click", calendarControl2.navigateToNextMonth);
      todayDate.addEventListener(
        "click",
        calendarControl2.navigateToCurrentMonth
      );
      for (var i = 0; i < dateNumber.length; i++) {
        dateNumber[i].addEventListener(
          "click",
          calendarControl2.selectDate,
          false
        );
      }
    },
    highlightToday: function () {
      this.dateToday = calendarControl2.localDate.getDate();
      let currentMonth = calendarControl2.localDate.getMonth() + 1;
      let changedMonth = calendar.getMonth() + 1;
      let currentYear = calendarControl2.localDate.getFullYear();
      let changedYear = calendar.getFullYear();
      if (
        currentYear === changedYear &&
        currentMonth === changedMonth &&
        document.querySelectorAll(".number-item2")
      ) {
        document
          .querySelectorAll(".number-item2")
          [this.dateToday - 1].classList.add("calendar-today2");
      }
    },
    plotPrevMonthDates: function (dates) {
      dates.reverse();
      for (let i = 0; i < dates.length; i++) {
        if (document.querySelectorAll(".prev-dates2")) {
          document.querySelectorAll(".prev-dates2")[i].textContent = dates[i];
        }
      }
    },
    plotNextMonthDates: function () {
      let childElemCount =
        document.querySelector(".calendar-body2").childElementCount;
      //7 lines
      if (childElemCount > 42) {
        let diff = 49 - childElemCount;
        calendarControl2.loopThroughNextDays(diff);
      }

      //6 lines
      if (childElemCount > 35 && childElemCount <= 42) {
        let diff = 42 - childElemCount;
        calendarControl2.loopThroughNextDays(42 - childElemCount);
      }
    },
    loopThroughNextDays: function (count) {
      if (count > 0) {
        for (let i = 1; i <= count; i++) {
          document.querySelector(
            ".calendar-body2"
          ).innerHTML += `<div class="next-dates2">${i}</div>`;
        }
      }
    },
    attachEventsOnNextPrev: function () {
      calendarControl2.plotDates();
      calendarControl2.attachEvents();
    },
    init: function () {
      calendarControl2.plotSelectors();
      calendarControl2.plotDates();
      calendarControl2.attachEvents();
    },
  };
  calendarControl2.init();

  // 시간표
  const timeTableDay2 = document.querySelector(".time_table_today2");

  timeTableDay2.innerHTML = `
    <div class="calendar-today-date"> 
    ${calendarControl2.localDate.getFullYear()}년
    ${calendarControl2.calMonthName[calendarControl2.localDate.getMonth()]} 
    ${calendarControl2.localDate.getDate()}일 
    (${calendarControl2.calWeekDays[calendarControl2.localDate.getDay()]})   
    </div>
    `;
}
const calendarControl2 = new CalendarControl2();

////////////////////// 아코디언

// const $pLi = list.querySelectorAll(".p_step");
// const $pTitle = list.querySelectorAll(".p_step_title");

// function toggleAccordion1() {
//   const thisItem1 = this.parentNode;
//   $pLi.forEach((item1) => {
//     item1.classList.remove("on");
//     if (thisItem1 == item1) {
//       thisItem1.classList.add("on");
//       return;
//     }
//   });
// }

// $pTitle.forEach((item) => {
//   event.stopPropagation();
//   item.addEventListener("click", toggleAccordion1);
// });

// const $oLi = list.querySelectorAll(".o_step");
// const $oTitle = list.querySelectorAll(".o_step_title");

// function toggleAccordion2() {
//   const thisItem2 = this.parentNode;
//   $oLi.forEach((item2) => {
//     item2.classList.remove("on");
//     if (thisItem2 == item2) {
//       thisItem2.classList.add("on");
//       return;
//     }
//   });
// }

// $oTitle.forEach((item) => {
//   event.stopPropagation();
//   item.addEventListener("click", toggleAccordion2);
// });
