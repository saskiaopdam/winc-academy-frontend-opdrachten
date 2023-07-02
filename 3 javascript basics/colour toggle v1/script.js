// Variables (element selectie)
const hamburger = document.querySelector(".hamburger");
const menuItemGrey = document.querySelector(".menuItem-grey");
const menuItemRed = document.querySelector(".menuItem-red");
const menuItemOrange = document.querySelector(".menuItem-orange");
const menuItemPurple = document.querySelector(".menuItem-purple");
const menuItemGreen = document.querySelector(".menuItem-green");

const colorName = document.querySelector(".colorName");
const colorNameGrey = document.querySelector(".colorName-grey");
const colorNameRed = document.querySelector(".colorName-red");
const colorNameOrange = document.querySelector(".colorName-orange");
const colorNamePurple = document.querySelector(".colorName-purple");
const colorNameGreen = document.querySelector(".colorName-green");

const body = document.querySelector("body");
const menu = document.querySelector(".menu");

// Functions
const toggleMenu = function () {
  menu.classList.toggle("menu-opened");
};
const openMenu = function () {
  menu.classList.add("menu-opened");
};
const closeMenu = function () {
  menu.classList.remove("menu-opened");
};
const makeBodyBackgroundGrey = function () {
  body.classList.remove("body-red", "body-orange", "body-purple", "body-green");
  body.classList.add("body-grey");
};
const makeBodyBackgroundRed = function () {
  body.classList.remove(
    "body-grey",
    "body-orange",
    "body-purple",
    "body-green"
  );
  body.classList.add("body-red");
};
const makeBodyBackgroundOrange = function () {
  body.classList.remove("body-grey", "body-red", "body-purple", "body-green");
  body.classList.add("body-orange");
};
const makeBodyBackgroundPurple = function () {
  body.classList.remove("body-grey", "body-red", "body-orange", "body-green");
  body.classList.add("body-purple");
};
const makeBodyBackgroundGreen = function () {
  body.classList.remove("body-grey", "body-red", "body-orange", "body-purple");
  body.classList.add("body-green");
};

const hideDisplayedColorName = function () {
  const colorNames = document.getElementsByClassName("colorName");
  for (i = 0; i < colorNames.length; i++) {
    colorNames[i].classList.remove("colorName-visible");
  }
};

const displayColorNameGrey = function () {
  colorNameGrey.classList.add("colorName-visible");
};
const displayColorNameRed = function () {
  colorNameRed.classList.add("colorName-visible");
};
const displayColorNameOrange = function () {
  colorNameOrange.classList.add("colorName-visible");
};
const displayColorNamePurple = function () {
  colorNamePurple.classList.add("colorName-visible");
};
const displayColorNameGreen = function () {
  colorNameGreen.classList.add("colorName-visible");
};

// Event-listeners hamburger
hamburger.addEventListener("click", toggleMenu);
hamburger.addEventListener("mouseover", openMenu);
// hamburger.addEventListener("mouseout", closeMenu);
// Als menu sluit bij mouseout dan kan de gebruiker niet in het menu klikken //

// Event-listeners menu
menuItemGrey.addEventListener("click", makeBodyBackgroundGrey);
menuItemGrey.addEventListener("click", hideDisplayedColorName);
menuItemGrey.addEventListener("click", displayColorNameGrey);
menuItemGrey.addEventListener("click", closeMenu);

menuItemRed.addEventListener("click", makeBodyBackgroundRed);
menuItemRed.addEventListener("click", hideDisplayedColorName);
menuItemRed.addEventListener("click", displayColorNameRed);
menuItemRed.addEventListener("click", closeMenu);

menuItemOrange.addEventListener("click", makeBodyBackgroundOrange);
menuItemOrange.addEventListener("click", hideDisplayedColorName);
menuItemOrange.addEventListener("click", displayColorNameOrange);
menuItemOrange.addEventListener("click", closeMenu);

menuItemPurple.addEventListener("click", makeBodyBackgroundPurple);
menuItemPurple.addEventListener("click", hideDisplayedColorName);
menuItemPurple.addEventListener("click", displayColorNamePurple);
menuItemPurple.addEventListener("click", closeMenu);

menuItemGreen.addEventListener("click", makeBodyBackgroundGreen);
menuItemGreen.addEventListener("click", hideDisplayedColorName);
menuItemGreen.addEventListener("click", displayColorNameGreen);
menuItemGreen.addEventListener("click", closeMenu);

// Laatste bonus - achtergrondkleur pagina veranderen door specifieke toetsen in te drukken - misschien later nog proberen. Kom er nu niet uit.
