import Router from "./router.js";
import SlidesManager from "./slidesManager.js";

// Main application class
class TAIntroductionApp {
  constructor() {
    this.router = null;
    this.slidesManager = null;
    this.init();
  }

  init() {
    // Initialize router and slides manager
    this.router = new Router();
    this.slidesManager = new SlidesManager(this.router);

    console.log("TA Introduction App initialized!");
  }
}

// Initialize app when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new TAIntroductionApp();
});
