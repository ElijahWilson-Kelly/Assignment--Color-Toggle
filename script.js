// Element references
const menuIcon = document.getElementById("menu-icon");
const container = menuIcon.parentElement;
const colorMenu = menuIcon.nextElementSibling;
const heading = document.getElementById("heading");

// Variable to allow for deleting of old classes on color change
let oldBodyClass = "default-bg";

// Helper Functions
const slideInMenu = function () {
  colorMenu.classList.add("show-menu");
};

const slideOutMenu = function () {
  colorMenu.classList.remove("show-menu");
};

const changeBackgroundColor = function (e) {
  const classColor = e.currentTarget.classList[0];
  document.body.classList.add(classColor);
  document.body.classList.remove(oldBodyClass);
  oldBodyClass = classColor;
};

const onColorSelect = function (e) {
  // Check Radio Button
  const input = e.currentTarget.querySelector("input");
  input.checked = true;

  //Change Heading
  const headingText = e.currentTarget.querySelector("label").textContent;
  heading.textContent = `Background Color: ${headingText}`;

  changeBackgroundColor(e);

  // Slide out menu. Remove mouseover listener.
  slideOutMenu();
  container.removeEventListener("mouseenter", slideInMenu);
  // When transition is finished add mouseover listener back onto menu icon
  colorMenu.addEventListener("transitionend", addListenerForMouseEnterMenuIcon);
};

// Use this function to re add mouseenter listener after menu has been closed after selection
const addListenerForMouseEnterMenuIcon = function () {
  colorMenu.removeEventListener(
    "transitionend",
    addListenerForMouseEnterMenuIcon
  );
  container.addEventListener("mouseenter", slideInMenu);
};

// Add Listener Functions

const addListenersToMenuIcon = function () {
  // I added the listener to parent container to prevent the menu from closing as soon as the mouse left the menu icon. Making it impossible to select a color.
  container.addEventListener("mouseenter", slideInMenu);
  container.addEventListener("mouseleave", slideOutMenu);
};

const addListenersForListItems = function () {
  const liItems = document.getElementById("menu").children;

  for (const listItem of liItems) {
    listItem.addEventListener("click", onColorSelect);
  }
};

addListenersToMenuIcon();
addListenersForListItems();
