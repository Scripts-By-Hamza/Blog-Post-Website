// Navigation Toggle
const navToggle = document.getElementById("navToggle");
const navLinks = document.querySelector(".nav-links");

navToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
  if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
    navLinks.classList.remove("active");
  }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
      });
      // Close mobile menu after clicking a link
      navLinks.classList.remove("active");
    }
  });
});

// Newsletter Form Submission
const newsletterForm = document.querySelector(".newsletter-form");
if (newsletterForm) {
  newsletterForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = newsletterForm.querySelector('input[type="email"]').value;

    // Add animation class to button
    const submitButton = newsletterForm.querySelector("button");
    submitButton.innerHTML = "Subscribed!";
    submitButton.style.backgroundColor = "#059669";

    // Reset form after 2 seconds
    setTimeout(() => {
      newsletterForm.reset();
      submitButton.innerHTML = "Subscribe";
      submitButton.style.backgroundColor = "";
    }, 2000);
  });
}

// Animate post cards on scroll
const observeElements = (elements, className) => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(className);
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  elements.forEach((element) => {
    observer.observe(element);
  });
};

// Add fade-in animation to post cards
const postCards = document.querySelectorAll(".post-card");
postCards.forEach((card) => {
  card.style.opacity = "0";
  card.style.transform = "translateY(20px)";
  card.style.transition = "opacity 0.5s ease, transform 0.5s ease";
});

observeElements(postCards, "fade-in");

// Add CSS class for fade-in animation
const style = document.createElement("style");
style.textContent = `
        .fade-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
document.head.appendChild(style);

// Add hover effect to post images
document.querySelectorAll(".post-image img").forEach((img) => {
  img.addEventListener("mouseenter", function () {
    this.style.transform = "scale(1.05)";
  });

  img.addEventListener("mouseleave", function () {
    this.style.transform = "scale(1)";
  });
});

// Handle like button clicks
document.querySelectorAll(".post-meta .fa-heart").forEach((heart) => {
  heart.addEventListener("click", function () {
    this.classList.toggle("fas");
    this.classList.toggle("far");
    const likeCount = this.parentElement.textContent;
    const currentCount = parseInt(likeCount);
    this.parentElement.textContent = this.classList.contains("fas")
      ? currentCount + 1
      : currentCount - 1;
  });
});
