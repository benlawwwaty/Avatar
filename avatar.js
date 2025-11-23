document.addEventListener('DOMContentLoaded', function() {
  // --------------------------
  // تأثير الماوس على الزجاج
  // --------------------------
  const glassElements = document.querySelectorAll('.glass-sidebar');
  const displacementMap = document.querySelector('#glass-distortion feDisplacementMap');

  glassElements.forEach(element => {
    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);
  });

  function handleMouseMove(e) {
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (displacementMap) {
      const scaleX = (x / rect.width) * 100;
      const scaleY = (y / rect.height) * 100;
      displacementMap.setAttribute('scale', Math.min(scaleX, scaleY));
    }

    const specular = this.querySelector('.glass-specular');
    if (specular) {
      specular.style.background = `radial-gradient(
        circle at ${x}px ${y}px,
        rgba(255,255,255,0.15) 0%,
        rgba(255,255,255,0.05) 30%,
        rgba(255,255,255,0) 60%
      )`;
    }
  }

  function handleMouseLeave() {
    if (displacementMap) displacementMap.setAttribute('scale', '77');
    const specular = this.querySelector('.glass-specular');
    if (specular) specular.style.background = 'none';
  }

  // --------------------------
  // Active link
  // --------------------------
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    item.addEventListener('click', function(e) {
      e.preventDefault();
      navItems.forEach(navItem => navItem.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // --------------------------
  // Hamburger Menu Toggle
  // --------------------------
  const menuToggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("menu");

  if (menuToggle && menu) {
    menuToggle.addEventListener("click", () => {
      menu.classList.toggle("show");

      // تغيير الأيقونة (☰ ⇄ ✖)
      const icon = menuToggle.querySelector("i");
      if (menu.classList.contains("show")) {
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-times");
      } else {
        icon.classList.remove("fa-times");
        icon.classList.add("fa-bars");
      }
    });
  }
});
