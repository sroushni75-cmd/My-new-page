// ==========================================
// 1. Header & Sidebar Elements
// ==========================================
const menuButton = document.getElementById("menu-btn");
const closeBtn = document.getElementById("close-sidebar-btn");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("sidebar-overlay");
const cartButton = document.getElementById("cart-btn");
const cartBadge = document.getElementById("cart-count");

// Sidebar Open & Close
function openSidebar() {
  if (sidebar && overlay) {
    sidebar.classList.add("active");
    overlay.classList.add("active");
  }
}

function closeSidebar() {
  if (sidebar && overlay) {
    sidebar.classList.remove("active");
    overlay.classList.remove("active");
  }
}

if (menuButton) menuButton.addEventListener("click", openSidebar);
if (closeBtn) closeBtn.addEventListener("click", closeSidebar);
if (overlay) overlay.addEventListener("click", closeSidebar);

// Cart Click
if (cartButton && cartBadge) {
  cartButton.addEventListener("click", () => {
    console.log("Cart clicked. Items count:", cartBadge.textContent);
  });
}

// ==========================================
// 2. Address Bottom Sheet Controls
// ==========================================
const addressBtn = document.getElementById("address-btn");
const displayAddress = document.getElementById("display-address");
const addressSheet = document.getElementById("address-sheet");
const addressOverlay = document.getElementById("address-overlay");
const closeSheetBtn = document.getElementById("close-sheet-btn");
const saveAddressBtn = document.getElementById("save-address-btn");
const addressInputField = document.getElementById("address-input-field");
const savedAddressText = document.getElementById("saved-address-text");
const savedAddressContainer = document.getElementById("saved-address-container");
const useLocationBtn = document.getElementById("use-location-btn");

// Page load hone par saved address dikhana
const storedAddress = localStorage.getItem("userAddress");
if (storedAddress) {
  if (displayAddress) displayAddress.textContent = storedAddress;
  if (savedAddressText) savedAddressText.textContent = storedAddress;
}

// Open & Close Bottom Sheet
function openAddressSheet() {
  if (addressSheet && addressOverlay) {
    addressSheet.classList.add("active");
    addressOverlay.classList.add("active");
  }
}

function closeAddressSheet() {
  if (addressSheet && addressOverlay) {
    addressSheet.classList.remove("active");
    addressOverlay.classList.remove("active");
  }
}

if (addressBtn) addressBtn.addEventListener("click", openAddressSheet);
if (closeSheetBtn) closeSheetBtn.addEventListener("click", closeAddressSheet);
if (addressOverlay) addressOverlay.addEventListener("click", closeAddressSheet);

// Naya Address Save Karna
if (saveAddressBtn && addressInputField) {
  saveAddressBtn.addEventListener("click", () => {
    const val = addressInputField.value.trim();
    if (val !== "") {
      if (displayAddress) displayAddress.textContent = val;
      if (savedAddressText) savedAddressText.textContent = val;
      
      localStorage.setItem("userAddress", val);
      addressInputField.value = "";
      closeAddressSheet();
    }
  });
}

// Saved Address choose karna
if (savedAddressContainer) {
  savedAddressContainer.addEventListener("click", () => {
    const currentSaved = savedAddressText ? savedAddressText.textContent : "";
    if (currentSaved && currentSaved !== "No saved address yet") {
      if (displayAddress) displayAddress.textContent = currentSaved;
      closeAddressSheet();
    }
  });
}

// GPS Location Detection
if (useLocationBtn) {
  useLocationBtn.addEventListener("click", () => {
    if (navigator.geolocation) {
      if (displayAddress) displayAddress.textContent = "Detecting location...";
      navigator.geolocation.getCurrentPosition(
        () => {
          const detectedCity = "Varanasi, UP (GPS)";
          if (displayAddress) displayAddress.textContent = detectedCity;
          if (savedAddressText) savedAddressText.textContent = detectedCity;
          localStorage.setItem("userAddress", detectedCity);
          closeAddressSheet();
        },
        () => {
          alert("Location permission denied. Please type your address manually.");
          if (displayAddress) displayAddress.textContent = storedAddress || "Select your location";
        }
      );
    }
  });
}

// ==========================================
// 3. Typewriter Animation for Search
// ==========================================
const searchInput = document.getElementById("search-input");

const words = [
  "Smartphones...",
  "T-Shirts & Jeans...",
  "Wireless Headphones...",
  "Watches & Accessories..."
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  if (!searchInput) return;

  const currentWord = words[wordIndex];
  
  if (isDeleting) {
    searchInput.placeholder = currentWord.substring(0, charIndex - 1);
    charIndex--;
  } else {
    searchInput.placeholder = currentWord.substring(0, charIndex + 1);
    charIndex++;
  }

  let typeSpeed = isDeleting ? 70 : 100;

  if (!isDeleting && charIndex === currentWord.length) {
    typeSpeed = 1500;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    typeSpeed = 400;
  }

  setTimeout(typeEffect, typeSpeed);
}

typeEffect();
