// Router class for handling navigation between slides
class Router {
  constructor() {
    this.routes = {
      "/": "slide-welcome",
      "/about": "slide-about",
      "/responsibilities": "slide-responsibilities",
      "/contact": "slide-contact",
    };

    this.currentSlide = "";
    this.init();
  }

  init() {
    // Handle browser back/forward buttons
    window.addEventListener("popstate", () => {
      this.navigate(window.location.pathname, false);
    });

    // Initial route
    const initialPath = window.location.pathname || "/";
    this.navigate(initialPath, false);
  }

  navigate(path, addToHistory = true) {
    const slideId = this.routes[path] || this.routes["/"];

    if (addToHistory) {
      window.history.pushState({}, "", path);
    }

    this.showSlide(slideId);
    this.updateNavigation();
  }

  showSlide(slideId) {
    // Hide all slides
    document.querySelectorAll(".slide").forEach((slide) => {
      slide.classList.remove("active");
    });

    // Show target slide
    const targetSlide = document.getElementById(slideId);
    if (targetSlide) {
      targetSlide.classList.add("active");
      this.currentSlide = slideId;
    }
  }

  updateNavigation() {
    // Update active dot in navigation
    document.querySelectorAll(".nav-dot").forEach((dot) => {
      dot.classList.remove("active");
      if (dot.dataset.slide === this.currentSlide) {
        dot.classList.add("active");
      }
    });
  }

  getCurrentSlide() {
    return this.currentSlide;
  }

  getSlideIndex() {
    const slideIds = Object.values(this.routes);
    return slideIds.indexOf(this.currentSlide);
  }

  nextSlide() {
    const slideIds = Object.values(this.routes);
    const currentIndex = this.getSlideIndex();
    const nextIndex = (currentIndex + 1) % slideIds.length;
    const nextPath = Object.keys(this.routes)[nextIndex];

    this.navigate(nextPath);
  }

  prevSlide() {
    const slideIds = Object.values(this.routes);
    const currentIndex = this.getSlideIndex();
    const prevIndex = (currentIndex - 1 + slideIds.length) % slideIds.length;
    const prevPath = Object.keys(this.routes)[prevIndex];

    this.navigate(prevPath);
  }
}

export default Router;
