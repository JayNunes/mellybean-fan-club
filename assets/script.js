window.addEventListener("orientationchange", function () {
  var originalBodyStyle = getComputedStyle(document.body).getPropertyValue(
    "display"
  );
  document.body.style.display = "none";
  setTimeout(function () {
    document.body.style.display = originalBodyStyle;
  }, 10);
});

let mobileNavOpen = false;
let showPlot = false;
const hamburger = document.querySelector(".mobile_btn");
const mobileNav = document.querySelector(".mobile_ul");
const max480 = window.matchMedia("(max-width: 480px)");
const max800 = window.matchMedia("(max-width: 800px)");

// mobile nav...
hamburger.addEventListener("click", () => {
  mobileNavOpen = !mobileNavOpen;
  mobileNavToggle(mobileNavOpen);
});

const mobileNavToggle = (visibility) => {
  if (visibility) {
    hamburger.classList.add("active");
    hamburger.classList.remove("not-active");
    mobileNav.style.transform = "translateX(0%)";
    mobileNav.setAttribute("aria-expanded", "true");
  } else {
    hamburger.classList.remove("active");
    hamburger.classList.add("not-active");
    mobileNav.style.transform = "translateX(100%)";
    mobileNav.setAttribute("aria-expanded", "false");
  }
};

// landing page anims...
if (document.querySelector(".intro_text")) {
  const catWagonDiv = document.querySelector(".intro_text");
  const catWagon = document.querySelector(".wagon");
  const scrollOffset = 300;
  const scrollElement = catWagonDiv;
  const characterDiv = document.querySelector(".characters_text");
  const moreDiv = document.querySelector(".more_text");
  const cardPile = document.querySelector(".card_pile");
  const moreImg = document.querySelector(".more_img");

  const elementInView = (el, offset = 0) => {
    const elementTop = el.getBoundingClientRect().top;
    return (
      elementTop <=
      (window.innerHeight || document.documentElement.clientHeight) - offset
    );
  };

  window.addEventListener("scroll", () => {
    handleScrollAnimation();
  });

  if (max480.matches) {
    characterDiv.setAttribute("data-aos", "fade-left");
    moreDiv.setAttribute("data-aos", "fade-left");
    cardPile.setAttribute("data-aos", "fade-right");
    moreImg.setAttribute("data-aos", "fade-right");
  }

  const wagonRight = () => {
    catWagon.classList.add("wagon_ride");
    catWagonDiv.style.transform = "rotate(2deg)";
  };

  const wagonLeft = () => {
    catWagon.classList.remove("wagon_ride");
    catWagonDiv.style.transform = "rotate(-2deg)";
    mobileNavToggle(false);
  };

  const handleScrollAnimation = () => {
    if (elementInView(scrollElement, scrollOffset)) {
      wagonRight();
    } else {
      wagonLeft();
    }
  };
}

// book pages, hide/reveal plot spoilers and set scroll anchor points
if (document.querySelector(".show_hide")) {
  const showHide = document.querySelector(".show_hide");
  const plot = document.querySelector(".plot");
  const chapterSelect = document.querySelectorAll(".chapter_select");

  showHide.addEventListener("click", () => {
    showPlot = !showPlot;
    plotReveal(showPlot);
  });

  const plotReveal = (show) => {
    if (show) {
      plot.style.height = "auto";
      showHide.innerHTML = "Hide";
      chapterSelect.forEach((chapter, i) => {
        chapter.setAttribute("href", `#chapter${i + 1}`);
      });
    } else if (max800.matches) {
      plot.style.height = "200px";
      showHide.innerHTML = "Show";
      chapterSelect.forEach((chapter) => {
        chapter.setAttribute("href", "#plot");
      });
    } else {
      plot.style.height = "210px";
      showHide.innerHTML = "Show";
      chapterSelect.forEach((chapter) => {
        chapter.setAttribute("href", "#plot");
      });
    }
  };
}

// zoom polaroids on about.html...
if ($(".polaroid").length) {
  const $polaroid = $(".polaroid");
  $polaroid.on("click", function () {
    $(this).toggleClass("polaroid_click");
  });
}

// flip character cards on characters.html
if ($(".flip-card-inner").length) {
  const $flipCardInner = $(".flip-card-inner");
  $flipCardInner.on("click", function () {
    $(this).toggleClass("flipped");
  });
}
