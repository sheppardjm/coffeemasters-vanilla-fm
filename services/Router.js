const Router = {
  init: () => {
    document.querySelectorAll("a.navlink").forEach((a) => {
      a.addEventListener("click", (e) => {
        e.preventDefault();
        const url = e.target.getAttribute("href");
        Router.go(url);
      });
    });
    window.addEventListener("popstate", (e) => {
      if (e.state) {
        Router.go(e.state.route, false);
      }
    });
    Router.go(location.pathname);
  },
  go: (route, addToHistory = true) => {
    console.log(`Going to ${route}`);

    if (addToHistory) {
      history.pushState({ route }, null, route);
    }
    let pageElement = null;
    switch (route) {
      case "/":
        pageElement = document.createElement("menu-page");
        pageElement.textContent = "Menu";
        break;
      case "/order":
        pageElement = document.createElement("order-page");
        pageElement.textContent = "Order";
        break;
      default:
        if (route.startsWith("/product-")) {
          pageElement = document.createElement("details-page");
          const paramId = route.substring(route.lastIndexOf("-") + 1);
          pageElement.dataset.productId = paramId;
        }
    }
    if (pageElement === null) {
      pageElement = document.createElement("h1");
      pageElement.textContent = "404 Not Found";
    } else {
      const cache = document.querySelector("main");
      cache.innerHTML = "";
      cache.appendChild(pageElement);
      window.scrollX = 0;
      window.scrollY = 0;
    }
  },
};
export default Router;
