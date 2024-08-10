"use strict";

document.addEventListener("DOMContentLoaded", function () {
  /* Filter By Type */
  if (document.getElementById("sort_by") != null) {
    document.querySelector("#sort_by").addEventListener("change", function (e) {
      var url = new URL(window.location.href);
      url.searchParams.set("sort_by", e.currentTarget.value);

      window.location = url.href;
    });
  }

  if (window.location.href.includes("collection")) {
    /* Filter By Price Range */
    document.querySelector("#range").addEventListener("mouseup", function (e) {
      var priceLeft = document
        .querySelector("#range")
        .lastElementChild.childNodes[1].childNodes[0].getAttribute(
          "aria-valuetext"
        );
      var priceRight = document
        .querySelector("#range")
        .lastElementChild.childNodes[2].childNodes[0].getAttribute(
          "aria-valuetext"
        );

      priceLeft = priceLeft.slice(1, priceLeft.length);
      priceRight = priceRight.slice(1, priceRight.length);

      var url = new URL(window.location.href);
      url.searchParams.set("filter.v.price.gte", priceLeft);
      url.searchParams.set("filter.v.price.lte", priceRight);

      window.location = url.href;
    });

    // /* Two Column View */
    document.querySelector("#two_col").addEventListener("click", function (e) {
      document.querySelectorAll("[id=target_col]").forEach((element) => {
        element.classList.remove("col-lg-4");
        element.classList.add("col-lg-6");
      });
    });

    /* Three Column View */
    document
      .querySelector("#three_col")
      .addEventListener("click", function (e) {
        document.querySelectorAll("[id=target_col]").forEach((element) => {
          element.classList.remove("col-lg-6");
          element.classList.add("col-lg-4");
        });
      });
  }

  /* ===============================================================
		CUSTOM SELECT [CHOICES.JS]
	=============================================================== */
  function injectClassess(x) {
    let pickerCustomClass = x.dataset.customclass;
    let pickerSevClasses = pickerCustomClass.split(" ");
    x.parentElement.classList.add.apply(
      x.parentElement.classList,
      pickerSevClasses
    );
  }

  const selectPicker = document.querySelectorAll(".selectpicker");
  if (selectPicker.length) {
    selectPicker.forEach((el) => {
      const customSelect = new Choices(el, {
        placeholder: true,
        searchEnabled: false,
        itemSelectText: "",
        callbackOnInit: () => injectClassess(el),
      });
    });
  }

  /* ===============================================================
    	 COUNTRY SELECT BOX FILLING
  	=============================================================== */
  const request = new XMLHttpRequest();
  request.open("GET", "js/countries.json");
  request.onload = function () {
    if (request.status >= 200 && request.status < 400) {
      const response = JSON.parse(request.responseText);

      var selectOption = "";
      response.forEach((country) => {
        selectOption +=
          "<option value='" +
          country.name +
          "' data-dial-code='" +
          country.dial_code +
          "'>" +
          country.name +
          "</option>";
      });
      document.querySelectorAll("select.country").forEach((el) => {
        el.insertAdjacentHTML("beforeend", selectOption);
      });

      const countryChoices = document.querySelectorAll(".country");
      if (countryChoices.length) {
        countryChoices.forEach((el) => {
          const choices = new Choices(el, {
            placeholder: true,
            searchEnabled: false,
            itemSelectText: "",
            callbackOnInit: () => injectClassess(el),
          });
        });
      }
    }
  };
  request.send();

  /* ===============================================================
		GLIGHTBOX
	=============================================================== */
  const lightbox = GLightbox({
    touchNavigation: true,
  });

  /* ===============================================================
		PRODUCT DETAIL SLIDER
	=============================================================== */
  var productSliderThumbs = new Swiper(".product-slider-thumbs", {
    direction: "horizontal",
    slidesPerView: 5,
    spaceBetween: 10,
    breakpoints: {
      560: {
        direction: "vertical",
        slidesPerView: 1,
        spaceBetween: 0,
      },
    },
  });

  var productsSlider = new Swiper(".product-slider", {
    slidesPerView: 1,
    spaceBetween: 0,
    thumbs: {
      swiper: productSliderThumbs,
    },
  });

  /* ===============================================================
		DISABLE UNWORKED ANCHORS
	=============================================================== */
  document.querySelectorAll('a[href="#').forEach((el) => {
    el.addEventListener("click", function (e) {
      e.preventDefault();
    });
  });

  /* ===============================================================
         PRODUCT QUNATITY
      =============================================================== */
  document.querySelectorAll(".dec-btn").forEach((el) => {
    el.addEventListener("click", () => {
      var siblings = el.parentElement.querySelector("input");
      if (parseInt(siblings.value, 10) >= 1) {
        siblings.value = parseInt(siblings.value, 10) - 1;
      }
    });
  });
  document.querySelectorAll(".inc-btn").forEach((el) => {
    el.addEventListener("click", () => {
      var siblings = el.parentElement.querySelector("input");
      siblings.value = parseInt(siblings.value, 10) + 1;
    });
  });
});
