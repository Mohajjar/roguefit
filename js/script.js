document.addEventListener("DOMContentLoaded", () => {
  // 1. Mobile Navbar Toggle
  const mobileToggle = document.querySelector(".header__mobile-toggle");
  const navMenu = document.querySelector(".header__nav");
  const navLinks = document.querySelectorAll(".header__nav-link");

  mobileToggle.addEventListener("click", () => {
    navMenu.classList.toggle("header__nav--active");
    mobileToggle.classList.toggle("active"); // For hamburger animation
  });

  // Close nav when a link is clicked (for single page applications or smooth scroll)
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("header__nav--active");
      mobileToggle.classList.remove("active");
    });
  });

  // 2. Sticky Header
  const header = document.querySelector(".header");
  const headerHeight = header.offsetHeight; // Get initial header height

  window.addEventListener("scroll", () => {
    if (window.scrollY > headerHeight) {
      header.classList.add("sticky");
    } else {
      header.classList.remove("sticky");
    }
  });

  // 3. Smooth Scroll Navigation (for anchor links)
  // This will apply to any link that starts with '#'
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    });
  });

  // 4. Scroll Animations (Intersection Observer)
  const scrollElements = document.querySelectorAll(
    ".scroll-fade-in, .scroll-slide-left, .scroll-slide-right"
  );

  const observerOptions = {
    root: null, // relative to the viewport
    rootMargin: "0px",
    threshold: 0.1, // Percentage of the target element which is visible
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animated");
        observer.unobserve(entry.target); // Stop observing once animated
      }
    });
  }, observerOptions);

  scrollElements.forEach((el) => observer.observe(el));

  // 5. Optional: Testimonial Slider (Example, implement on results.html)
  // You would need to add specific HTML for this on results.html
  // For brevity, here's a conceptual outline:
  /*
    const testimonialSlider = document.querySelector('.testimonial-slider');
    if (testimonialSlider) {
        let currentSlide = 0;
        const slides = testimonialSlider.querySelectorAll('.testimonial-slide');
        const totalSlides = slides.length;

        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.style.display = 'none';
                if (i === index) {
                    slide.style.display = 'block';
                }
            });
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % totalSlides;
            showSlide(currentSlide);
        }

        // Auto-advance
        setInterval(nextSlide, 5000); // Change slide every 5 seconds
        showSlide(currentSlide); // Show initial slide
    }
    */
});

// FAQ Toggle
const faqQuestions = document.querySelectorAll(".faq-question");

faqQuestions.forEach((question) => {
  question.addEventListener("click", () => {
    const faqItem = question.closest(".faq-item");
    faqItem.classList.toggle("active");
  });
});

// Apparel Filters (on apparel.html)
const productGrid = document.getElementById("product-grid");
const productTypeFilter = document.getElementById("product-type-filter");
const productSizeFilter = document.getElementById("product-size-filter");

if (productGrid && productTypeFilter && productSizeFilter) {
  function filterProducts() {
    const selectedType = productTypeFilter.value;
    const selectedSize = productSizeFilter.value;
    const products = productGrid.querySelectorAll(".product-card");

    products.forEach((product) => {
      const productType = product.dataset.type;
      const productSize = product.dataset.size;

      const typeMatch = selectedType === "all" || productType === selectedType;
      const sizeMatch = selectedSize === "all" || productSize === selectedSize;

      if (typeMatch && sizeMatch) {
        product.style.display = "block";
      } else {
        product.style.display = "none";
      }
    });
  }

  productTypeFilter.addEventListener("change", filterProducts);
  productSizeFilter.addEventListener("change", filterProducts);

  filterProducts(); // Apply filters on page load
}

// Testimonial Slider (on results.html)
const testimonialSlider = document.querySelector(".testimonial-slider");
const prevButton = document.querySelector(".slider-nav--prev");
const nextButton = document.querySelector(".slider-nav--next");

if (testimonialSlider) {
  let currentSlide = 0;
  const slides = testimonialSlider.querySelectorAll(".testimonial-slide");
  const totalSlides = slides.length;

  function showSlide(index) {
    testimonialSlider.style.transform = `translateX(-${index * 100}%)`;
  }

  function goToNextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
  }

  function goToPrevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(currentSlide);
  }

  nextButton.addEventListener("click", goToNextSlide);
  prevButton.addEventListener("click", goToPrevSlide);

  // Optional: Auto-advance slides
  // setInterval(goToNextSlide, 7000); // Change slide every 7 seconds

  showSlide(currentSlide); // Initialize slider position
}

// Contact Form Pre-fill (if coming from coaching page)
const contactForm = document.querySelector(".contact-form");
const urlParams = new URLSearchParams(window.location.search);
const planParam = urlParams.get("plan");

if (contactForm && planParam) {
  const goalInput = contactForm.querySelector("#goal");
  if (goalInput) {
    goalInput.value = `Inquiry about ${
      planParam.charAt(0).toUpperCase() + planParam.slice(1)
    } Plan`;
  }
}
