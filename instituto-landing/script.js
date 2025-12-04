// Mobile Menu Toggle
const menuToggle = document.getElementById("menuToggle")
const navMenu = document.getElementById("navMenu")

menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active")
})

// Close menu when clicking on a link
navMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active")
  })
})

// FAQ Accordion
const faqItems = document.querySelectorAll(".faq-item")

faqItems.forEach((item) => {
  const question = item.querySelector(".faq-question")

  question.addEventListener("click", () => {
    const isActive = item.classList.contains("active")

    // Close all items
    faqItems.forEach((faqItem) => {
      faqItem.classList.remove("active")
    })

    // Open clicked item if it wasn't active
    if (!isActive) {
      item.classList.add("active")
    }
  })
})

// Contact Form Submission
const contactForm = document.getElementById("contactForm")
const formSuccess = document.getElementById("formSuccess")
const TU_SERVICE_ID = "service_t94eiut"
const TU_TEMPLATE_ID = "template_0qxrvqq"
contactForm.addEventListener("submit", (e) => {
  e.preventDefault()

  const formData = {
    nombre: document.getElementById("nombre").value,
    email: document.getElementById("email").value,
    telefono: document.getElementById("telefono").value,
    asunto: document.getElementById("asunto").value,
    mensaje: document.getElementById("mensaje").value
  }

  emailjs.send(TU_SERVICE_ID, TU_TEMPLATE_ID, formData)
    .then((response) => {
      contactForm.style.display = "none"
      formSuccess.classList.add("show")
      
      setTimeout(() => {
        contactForm.reset()
        contactForm.style.display = "block"
        formSuccess.classList.remove("show")
      }, 5000)
    }, (error) => {
      console.log("Error al enviar correo:", error)
    })
})



// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      const headerOffset = 72
      const elementPosition = target.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
  })
})

// Add scroll effect to header
let lastScroll = 0
const header = document.querySelector(".header")

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset

  if (currentScroll > 100) {
    header.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.1)"
  } else {
    header.style.boxShadow = "none"
  }

  lastScroll = currentScroll
})

// Testimonios Carousel
let currentSlide = 0
const slides = document.querySelectorAll(".testimonios-slide")
const indicators = document.querySelectorAll(".indicator")
const totalSlides = slides.length
const autoPlayInterval = 30000 // 30 segundos

function showSlide(index) {
  // Remover clase active de todos los slides e indicadores
  slides.forEach((slide) => slide.classList.remove("active"))
  indicators.forEach((indicator) => indicator.classList.remove("active"))

  // Agregar clase active al slide e indicador actual
  slides[index].classList.add("active")
  indicators[index].classList.add("active")
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % totalSlides
  showSlide(currentSlide)
}

// Auto-play del carrusel
let carouselTimer = setInterval(nextSlide, autoPlayInterval)

// Click en indicadores para cambiar slide manualmente
indicators.forEach((indicator, index) => {
  indicator.addEventListener("click", () => {
    currentSlide = index
    showSlide(currentSlide)

    // Reiniciar el timer cuando se cambia manualmente
    clearInterval(carouselTimer)
    carouselTimer = setInterval(nextSlide, autoPlayInterval)
  })
})
