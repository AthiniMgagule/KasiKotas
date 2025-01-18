function toggleMenu(){
    const navLinks = document.getElementById("nav-links");
    const menuIcon = document.getElementById('menu-icon');
    navLinks.classList.toggle("active");
    menuIcon.classList.toggle("active");
}