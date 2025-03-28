'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });

// Project variables
const projectItems = document.querySelectorAll("[data-project-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// Modal elements
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");
const modalDate = document.querySelector("[data-modal-date]");

// Modal toggle function
const toggleModal = function () {
  document.body.classList.toggle("modal-open");
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
};


// Add click event to all project items
projectItems.forEach(item => {
  item.addEventListener("click", function () {
    // Get project data from clicked item
    const projectImg = this.querySelector("[data-project-avatar]").src;
    const projectTitle = this.querySelector("[data-project-title]").textContent;
    const projectCategory = this.querySelector(".projects-category").textContent;
    const projectDetails = this.querySelector("[data-project-text]").innerHTML;

    // Set modal content
    modalImg.src = projectImg;
    modalImg.alt = this.querySelector("[data-project-avatar]").alt;
    modalTitle.textContent = projectTitle;
    modalDate.textContent = projectCategory;
    modalDate.datetime = new Date().toISOString();
    modalText.innerHTML = projectDetails;

    // Show modal
    toggleModal();
  });
});
// Close modal events
modalCloseBtn.addEventListener("click", toggleModal);
overlay.addEventListener("click", toggleModal);

// Close modal with Escape key
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && modalContainer.classList.contains("active")) {
    toggleModal();
  }
});



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}


// Initialize EmailJS first
(function() {
  emailjs.init("eQPtNh1O8NDf6qc7h"); // Your User ID
})();

// Contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// Form validation
formInputs.forEach(input => {
  input.addEventListener("input", function() {
    formBtn.disabled = !form.checkValidity();
  });
});

// Form submission
form.addEventListener("submit", function(e) {
  e.preventDefault();

  // Disable button during submission
  formBtn.innerHTML = '<ion-icon name="paper-plane"></ion-icon> <span>Sending...</span>';
  formBtn.disabled = true;

  // Send email via EmailJS
  emailjs.sendForm(
    "service_dhr5tp7",   // Your Service ID
    "template_7fn0o28",  // Your Template ID
    e.target,            // The form element
    "eQPtNh1O8NDf6qc7h"  // Your User ID
  )
  .then(() => {
    // Success
    formBtn.innerHTML = '<ion-icon name="checkmark"></ion-icon> <span>Sent!</span>';
    form.reset();
    
    setTimeout(() => {
      formBtn.innerHTML = '<ion-icon name="paper-plane"></ion-icon> <span>Send Message</span>';
      formBtn.disabled = false;
    }, 3000);
  })
  .catch((error) => {
    console.error("Email error:", error);
    formBtn.innerHTML = '<ion-icon name="warning"></ion-icon> <span>Failed! Try Again</span>';
    
    setTimeout(() => {
      formBtn.innerHTML = '<ion-icon name="paper-plane"></ion-icon> <span>Send Message</span>';
      formBtn.disabled = false;
    }, 3000);
  });
});



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}


