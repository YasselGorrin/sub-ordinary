// JavaScript code for the carousel
document.addEventListener("DOMContentLoaded", function () {
  const imagesContainer = document.querySelector(".carousel-images");
  const carouselItems = document.querySelectorAll(".carousel-item");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  let index = 0; // Current slide index
  let autoScroll; // Variable to store the interval ID

  // Function to update the carousel position
  function updateCarousel() {
    const width = carouselItems[0].clientWidth; // Get the width of a single carousel item
    imagesContainer.style.transform = `translateX(${-index * width}px)`; // Move the carousel

    // Remove the 'active' class from all carousel items
    carouselItems.forEach((item) => item.classList.remove("active"));

    // Add the 'active' class to the current carousel item
    carouselItems[index].classList.add("active");
  }

  // Function to move to the next slide
  function moveToNextSlide() {
    index = (index + 1) % carouselItems.length; // Loop back to the first slide
    updateCarousel();
  }

  // Function to move to the previous slide
  function moveToPrevSlide() {
    index = (index - 1 + carouselItems.length) % carouselItems.length; // Loop back to the last slide
    updateCarousel();
  }

  // Function to start auto-scrolling
  function startAutoScroll() {
    autoScroll = setInterval(moveToNextSlide, 7000); // Set interval to 7 seconds
  }

  // Function to stop auto-scrolling
  function stopAutoScroll() {
    clearInterval(autoScroll); // Clear the interval
  }

  // Event listeners for manual navigation
  if (prevBtn && nextBtn) {
    nextBtn.addEventListener("click", function () {
      stopAutoScroll(); // Stop auto-scrolling when manually navigating
      moveToNextSlide();
      startAutoScroll(); // Restart auto-scrolling
    });

    prevBtn.addEventListener("click", function () {
      stopAutoScroll(); // Stop auto-scrolling when manually navigating
      moveToPrevSlide();
      startAutoScroll(); // Restart auto-scrolling
    });
  } else {
    console.error("Navigation buttons not found in the DOM.");
  }

  // Pause auto-scrolling on hover
  if (imagesContainer) {
    imagesContainer.addEventListener("mouseenter", stopAutoScroll);
    imagesContainer.addEventListener("mouseleave", startAutoScroll);
  } else {
    console.error("Carousel container not found in the DOM.");
  }

  // Update carousel on window resize
  window.addEventListener("resize", updateCarousel);

  // Initialize the carousel and start auto-scrolling
  updateCarousel();
  startAutoScroll();
});

// JavaScript code for the image modal
document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("image-modal");
  const modalImage = document.getElementById("modal-image");
  const closeModal = document.querySelector(".modal .close");
  const imageContainers = document.querySelectorAll(".album-container img");

  // Open modal when an image is clicked
  imageContainers.forEach((img) => {
    img.addEventListener("click", function () {
      modal.style.display = "flex"; // Show the modal
      modalImage.src = this.src; // Set the modal image source
    });
  });

  // Close modal when the close button is clicked
  closeModal.addEventListener("click", function () {
    modal.style.display = "none";
  });

  // Close modal when clicking outside the image
  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });

  // Close modal when pressing the Escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      modal.style.display = "none";
    }
  });
});
// JavaScript code for the hamburger menu
document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");

  // Toggle the nav-links visibility
  hamburger.addEventListener("click", function () {
    navLinks.classList.toggle("active");
  });
});
// JavaScript code for Navbar
document.addEventListener("DOMContentLoaded", function () {
  const navbarContainer = document.getElementById("navbar");

  // Fetch the navbar.html file and insert it into the #navbar div
  fetch("navbar.html")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to load navbar.html");
      }
      return response.text();
    })
    .then((html) => {
      navbarContainer.innerHTML = html;

      // Reinitialize any JavaScript functionality for the navbar (e.g., hamburger menu)
      const hamburger = document.getElementById("hamburger");
      const navLinks = document.getElementById("nav-links");

      hamburger.addEventListener("click", function () {
        navLinks.classList.toggle("active");
      });
    })
    .catch((error) => {
      console.error("Error loading navbar:", error);
    });
});