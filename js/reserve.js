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
const $lastBtn = document.querySelectorAll(".last_btn");

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

    $lastBtn.forEach((c) => {
      c.classList.remove("on");
    });
    $lastBtn[i].classList.add("on");
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
// step1
////////////////////// 입력 오류
// 관람시간을 선택하지 않았을때 (예약자정보>) 버튼누르면 작동 X
// (관람시간 선택하면 버튼 클릭 시 현재 title에 done, 다음 title에 on클래스 추가)
const $timeSelect1 = document.querySelectorAll(".p_time_s");
const $btn1to1 = document.querySelector(".btn1-1");
const $pStep1 = document.querySelector(".p_step.step1");
const $pStep2 = document.querySelector(".p_step.step2");
const $selectError1 = document.querySelector(".p_timeselect_error");

$btn1to1.addEventListener("click", () => {
  for (let i = 0; i < $timeSelect1.length; i++) {
    if ($timeSelect1[i].checked) {
      $pStep1.classList.remove("on");
      $pStep1.classList.add("done");
      $pStep2.classList.add("on");
      $selectError1.textContent = "";
      break;
    } else {
      $selectError1.textContent = "관람시간을 선택해주세요";
    }
  }
});

// 단체예약

const $timeSelect2 = document.querySelectorAll(".o_time_s");
const $btn2to1 = document.querySelector(".btn2-1");
const $oStep1 = document.querySelector(".o_step.step1");
const $oStep2 = document.querySelector(".o_step.step2");
const $selectError2 = document.querySelector(".o_timeselect_error");

$btn2to1.addEventListener("click", () => {
  for (let i = 0; i < $timeSelect2.length; i++) {
    if ($timeSelect2[i].checked) {
      $oStep1.classList.remove("on");
      $oStep1.classList.add("done");
      $oStep2.classList.add("on");
      $selectError2.textContent = "";
      break;
    } else {
      $selectError2.textContent = "관람시간을 선택해주세요";
    }
  }
});

// step2
/////////////// (개인정보수집및이용동의>)버튼 클릭 시
// 현재 title에 done, 다음 title에 on클래스 추가
// 각 input에 있는 값이 없으면 error가 뜬다.
const $btn1to2 = document.querySelector(".btn1-2");
const $pStep3 = document.querySelector(".p_step.step3");

const $step2Inputs1 = document.querySelectorAll(".p_step.step2 input");
const $noInputError1 = document.querySelector(".p_noinput_error");

const $pName = document.querySelector("#p_name");
const $pNameError = document.querySelector(".p_name_error");

const $pPhone = document.querySelector("#p_phone");
const $pPhoneError = document.querySelector(".p_phone_error");

const $pEmail1 = document.querySelector("#p_email1");
const $pEmail2 = document.querySelector("#p_email2");
const $pEmailError = document.querySelector(".p_email_error");

const $pPassword = document.querySelector("#p_password");
const $pPasswordError = document.querySelector(".p_password_error");

$btn1to2.addEventListener("click", () => {
  if (!$pName.value) {
    $pNameError.textContent = "이름을 입력해주세요";
  } else {
    $pNameError.textContent = "";
  }
  if (!$pPhone.value) {
    $pPhoneError.textContent = "연락처를 입력해주세요";
  } else {
    $pPhoneError.textContent = "";
  }
  if (!$pEmail1.value || !$pEmail2.value) {
    $pEmailError.textContent = "이메일을 입력해주세요";
  } else {
    $pEmailError.textContent = "";
  }
  if (!$pPassword.value) {
    $pPasswordError.textContent = "비밀번호를 입력해주세요";
  } else {
    $pPasswordError.textContent = "";
  }

  for (let i = 0; i < $step2Inputs1.length; i++) {
    if (!$step2Inputs1[i].value) {
      $noInputError1.textContent = "입력정보를 확인해주세요";
      $pStep2.classList.add("on");
      $pStep2.classList.remove("done");
      $pStep3.classList.remove("on");
      break;
    } else {
      $pStep2.classList.remove("on");
      $pStep2.classList.add("done");
      $pStep3.classList.add("on");
      $noInputError1.textContent = "";
    }
  }
});

$pName.addEventListener("input", () => {
  $pNameError.textContent = "";
});
$pPhone.addEventListener("input", () => {
  $pPhoneError.textContent = "";
});
$pEmail1.addEventListener("input", () => {
  $pEmailError.textContent = "";
});
$pEmail2.addEventListener("input", () => {
  $pEmailError.textContent = "";
});
$pPassword.addEventListener("input", () => {
  $pPasswordError.textContent = "";
});

// 단체예약

const $btn2to2 = document.querySelector(".btn2-2");
const $oStep3 = document.querySelector(".o_step.step3");

const $step2Inputs2 = document.querySelectorAll(".o_step.step2 input");
const $noInputError2 = document.querySelector(".o_noinput_error");

const $oName = document.querySelector("#o_name");
const $oNameError = document.querySelector(".o_name_error");

const $oPhone = document.querySelector("#o_phone");
const $oPhoneError = document.querySelector(".o_phone_error");

const $oRegion = document.querySelector("#o_region");
const $oRegionError = document.querySelector(".o_region_error");

const $oPassword = document.querySelector("#o_password");
const $oPasswordError = document.querySelector(".o_password_error");

const $oNum = document.querySelector("#o_num");
const $oNumError = document.querySelector(".o_num_error");

const $oLeader = document.querySelector("#o_leader");
const $oLeaderError = document.querySelector(".o_leader_error");

const $oEmail1 = document.querySelector("#o_email1");
const $oEmail2 = document.querySelector("#o_email2");
const $oEmailError = document.querySelector(".o_email_error");

const $oAge = document.querySelector("#o_age");
const $oAgeError = document.querySelector(".o_age_error");

$btn2to2.addEventListener("click", () => {
  if (!$oName.value) {
    $oNameError.textContent = "단체명을 입력해주세요";
  } else {
    $oNameError.textContent = "";
  }
  if (!$oPhone.value) {
    $oPhoneError.textContent = "연락처를 입력해주세요";
  } else {
    $oPhoneError.textContent = "";
  }
  if ($oRegion.value == "none") {
    $oRegionError.textContent = "지역을 선택해주세요";
  } else {
    $oRegionError.textContent = "";
  }
  if (!$oPassword.value) {
    $oPasswordError.textContent = "비밀번호를 입력해주세요";
  } else {
    $oPasswordError.textContent = "";
  }
  if ($oNum.value == "none") {
    $oNumError.textContent = "관람인원수를 선택해주세요";
  } else {
    $oNumError.textContent = "";
  }
  if ($oLeader.value == "none") {
    $oLeaderError.textContent = "인솔자 유/무를 선택해주세요";
  } else {
    $oLeaderError.textContent = "";
  }
  if (!$oEmail1.value || !$oEmail2.value) {
    $oEmailError.textContent = "이메일을 입력해주세요";
  } else {
    $oEmailError.textContent = "";
  }
  if (!$oAge.value) {
    $oAgeError.textContent = "연령을 입력해주세요";
  } else if (!/^[0-9]*$/.test($oAge.value)) {
    $oAgeError.textContent = "숫자로 입력해주세요";
  } else {
    $oAgeError.textContent = "";
  }

  for (let i = 0; i < $step2Inputs2.length; i++) {
    if (
      !$step2Inputs2[i].value ||
      $oRegion.value == "none" ||
      $oNum.value == "none" ||
      $oLeader.value == "none" ||
      !/^[0-9]*$/.test($oAge.value) == true
    ) {
      $noInputError2.textContent = "입력정보를 확인해주세요";
      $oStep2.classList.add("on");
      $oStep2.classList.remove("done");
      $oStep3.classList.remove("on");
      break;
    } else {
      $oStep2.classList.remove("on");
      $oStep2.classList.add("done");
      $oStep3.classList.add("on");
      $noInputError2.textContent = "";
    }
  }
});

$oName.addEventListener("input", () => {
  $oNameError.textContent = "";
});
$oPhone.addEventListener("input", () => {
  $oPhoneError.textContent = "";
});
$oRegion.addEventListener("change", () => {
  $oRegionError.textContent = "";
});
$oPassword.addEventListener("input", () => {
  $oPasswordError.textContent = "";
});
$oNum.addEventListener("change", () => {
  $oNumError.textContent = "";
});
$oLeader.addEventListener("change", () => {
  $oLeaderError.textContent = "";
});
$oEmail1.addEventListener("input", () => {
  $oEmailError.textContent = "";
});
$oEmail2.addEventListener("input", () => {
  $oEmailError.textContent = "";
});
$oAge.addEventListener("input", () => {
  $oAgeError.textContent = "";
});

// step3
////////////////////// 동의에 체크하면 예약신청버튼 활성화
const $agreeCheck1 = document.querySelector("#checkbox1");
const $agreeCheck2 = document.querySelector("#checkbox2");

const $fnBtn1 = document.querySelector(".p_last_btn .reserve_final_btn");
const $fnBtn2 = document.querySelector(".o_last_btn .reserve_final_btn");

$fnBtn1.addEventListener("click", () => {
  if ($agreeCheck1.checked == true) {
    alert("예약신청이 완료되었습니다.");
  } else {
    alert("개인정보 수집에 동의해주세요.");
  }
});
$fnBtn2.addEventListener("click", () => {
  if ($agreeCheck2.checked == true) {
    alert("예약신청이 완료되었습니다.");
  } else {
    alert("개인정보 수집에 동의해주세요.");
  }
});
