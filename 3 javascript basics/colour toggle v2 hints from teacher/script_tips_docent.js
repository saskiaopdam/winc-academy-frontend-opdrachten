// De code is nu flink korter en overzichtelijker, dankzij tips van Winc-docent

// Variables (element selectie)
const hamburger = document.querySelector(".hamburger");
const menuItemGrey = document.querySelector(".menuItem-grey input");
const menuItemRed = document.querySelector(".menuItem-red input");
const menuItemOrange = document.querySelector(".menuItem-orange input");
const menuItemPurple = document.querySelector(".menuItem-purple input");
const menuItemGreen = document.querySelector(".menuItem-green input");

const colorLabel = document.querySelector(".colorName");

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
const changeBodyBackgroundColor = function (colorName) {
  document.body.removeAttribute("class");
  document.body.classList.add(`body-${colorName}`);
};

const displayColorLabel = function (colorName) {
  colorLabel.innerHTML = colorName;
};

const onMenuItemClick = function (e) {
  const colorName = e.target.id;
  const colorNameCapitalized = colorName[0].toUpperCase() + colorName.slice(1);
  console.log(colorName);

  changeBodyBackgroundColor(colorName);
  displayColorLabel(colorNameCapitalized);
  closeMenu();
};

// Event-listeners hamburger
hamburger.addEventListener("click", toggleMenu);
hamburger.addEventListener("mouseover", openMenu);
// hamburger.addEventListener("mouseout", closeMenu);
// Als menu sluit bij mouseout dan kan de gebruiker niet in het menu klikken //

// Event-listeners menu
menuItemGrey.addEventListener("click", (e) => onMenuItemClick(e));

menuItemRed.addEventListener("click", (e) => onMenuItemClick(e));

menuItemOrange.addEventListener("click", (e) => onMenuItemClick(e));

menuItemPurple.addEventListener("click", (e) => onMenuItemClick(e));

menuItemGreen.addEventListener("click", (e) => onMenuItemClick(e));

// Laatste bonus - achtergrondkleur pagina veranderen door specifieke toetsen in te drukken - misschien later nog proberen. Kom er nu niet uit.
