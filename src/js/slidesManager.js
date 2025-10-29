// SlidesManager class for handling slides content and navigation
class SlidesManager {
  constructor(router) {
    this.router = router;
    this.slides = [
      {
        id: "slide-welcome",
        title: "Hi, I'm Sadegh",
        subtitle: "Teaching Assistant for HTML & CSS Course @ Karyar",
        content: "",
      },
      {
        id: "slide-about",
        title: "About Me",
        content:
          "I'm a Frontend Developer passionate about creating beautiful and functional web interfaces. With my background in language studies, I bring a unique perspective to teaching technical concepts in an accessible way. I'm here to support your learning journey in web development.",
      },
      {
        id: "slide-responsibilities",
        title: "Our Learning Journey",
        content:
          "• <strong>Pair Coding Sessions</strong> - Hands-on collaborative coding<br>• <strong>Resource Sharing</strong> - Curated learning materials and references<br>• <strong>Progress Guidance</strong> - Personalized support for your learning path<br>• <strong>Community Support</strong> - Learning together as a team",
      },
      {
        id: "slide-contact",
        title: "Get In Touch",
        content: `
          <div class="contact-links">
            <div class="contact-item">
              <i class="fas fa-envelope contact-icon"></i>
              <a href="mailto:sadeghdehyadgari@gmail.com" class="contact-link">sadeghdehyadgari@gmail.com</a>
            </div>
            <div class="contact-item">
              <i class="fab fa-linkedin contact-icon"></i>
              <a href="https://www.linkedin.com/in/sadegh-dehyadgari" target="_blank" class="contact-link">linkedin.com/in/sadegh-dehyadgari</a>
            </div>
            <div class="contact-item">
              <i class="fab fa-telegram contact-icon"></i>
              <a href="#" class="contact-link">[You know where our Telegram is ;)]</a>
            </div>
          </div>
          <p style="margin-top: 2rem; font-style: italic;">Let's connect and code together!</p>
        `,
      },
    ];

    this.init();
  }

  init() {
    this.createNavigationDots();
    this.setupEventListeners();
    this.initializeSlidesContent();
  }

  createNavigationDots() {
    const navContainer = document.getElementById("slideNav");
    navContainer.innerHTML = "";

    this.slides.forEach((slide, index) => {
      const dot = document.createElement("button");
      dot.className = "nav-dot";
      dot.dataset.slide = slide.id;
      dot.innerHTML = `&nbsp;`;
      dot.addEventListener("click", () => {
        const path = Object.keys(this.router.routes)[index];
        this.router.navigate(path);
      });

      navContainer.appendChild(dot);
    });
  }

  setupEventListeners() {
    // Navigation arrows
    document.getElementById("prevBtn").addEventListener("click", () => {
      this.router.prevSlide();
    });

    document.getElementById("nextBtn").addEventListener("click", () => {
      this.router.nextSlide();
    });

    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") {
        this.router.prevSlide();
      } else if (e.key === "ArrowRight") {
        this.router.nextSlide();
      }
    });
  }

  initializeSlidesContent() {
    this.slides.forEach((slide) => {
      const slideElement = document.getElementById(slide.id);
      if (slideElement) {
        const contentElement = slideElement.querySelector(".slide-content");
        if (contentElement && !contentElement.querySelector("h1, h2")) {
          if (slide.id === "slide-welcome") {
            contentElement.innerHTML = `
                            <h1 class="typing-effect">${slide.title}</h1>
                            <p class="subtitle">${slide.subtitle}</p>
                        `;
          } else {
            contentElement.innerHTML = `
                            <h2>${slide.title}</h2>
                            ${
                              slide.id === "slide-contact"
                                ? slide.content
                                : `<p>${slide.content}</p>`
                            }
                        `;
          }
        }
      }
    });
  }
}

export default SlidesManager;
