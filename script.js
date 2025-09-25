document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

window.addEventListener("scroll", () => {
  const header = document.querySelector(".header")
  if (window.scrollY > 100) {
    header.style.background = "rgba(15, 23, 42, 0.98)"
  } else {
    header.style.background = "rgba(15, 23, 42, 0.95)"
  }
})

window.addEventListener("scroll", () => {
  let current = ""
  const sections = document.querySelectorAll("section")

  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.clientHeight
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute("id")
    }
  })

  document.querySelectorAll(".nav-link").forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active")
    }
  })
})

const contactForm = document.getElementById("contactForm")

contactForm.addEventListener("submit", function (e) {
  e.preventDefault()

  const formData = new FormData(this)
  const name = formData.get("name")
  const email = formData.get("email")
  const subject = formData.get("subject")
  const message = formData.get("message")

  if (!name || !email || !subject || !message) {
    showNotification("Por favor, preencha todos os campos.", "error")
    return
  }

  if (!isValidEmail(email)) {
    showNotification("Por favor, insira um email válido.", "error")
    return
  }

  const submitBtn = this.querySelector('button[type="submit"]')
  const originalText = submitBtn.textContent

  submitBtn.innerHTML = '<span class="loading"></span> Enviando...'
  submitBtn.disabled = true

  fetch('https://web-production-85276e.up.railway.app/send-email', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name,
      email,
      subject,
      message
    })
  })
    .then(res => {
      if (!res.ok) throw new Error('Falha ao enviar mensagem.')
      return res.text()
    })
    .then(msg => {
      showNotification(msg, "success")
      contactForm.reset()
    })
    .catch(() => {
      showNotification("Erro ao enviar mensagem. Tente novamente mais tarde.", "error")
    })
    .finally(() => {
      submitBtn.textContent = originalText
      submitBtn.disabled = false
    })
})

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

function showNotification(message, type = "info") {

  const existingNotification = document.querySelector(".notification")
  if (existingNotification) {
    existingNotification.remove()
  }

  const notification = document.createElement("div")
  notification.className = `notification notification-${type}`
  notification.textContent = message

  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
        word-wrap: break-word;
    `

  switch (type) {
    case "success":
      notification.style.backgroundColor = "#10b981"
      break
    case "error":
      notification.style.backgroundColor = "#ef4444"
      break
    default:
      notification.style.backgroundColor = "#3b82f6"
  }

  document.body.appendChild(notification)

  setTimeout(() => {
    notification.style.transform = "translateX(0)"
  }, 100)

  setTimeout(() => {
    notification.style.transform = "translateX(400px)"
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification)
      }
    }, 300)
  }, 5000)
}

const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-in-up")
    }
  })
}, observerOptions)

document.addEventListener("DOMContentLoaded", () => {
  const animateElements = document.querySelectorAll(".skill-category, .project-card, .about-stats .stat")
  animateElements.forEach((el) => observer.observe(el))
})

function typeWriter(element, text, speed = 100) {
  let i = 0
  element.textContent = ""

  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i)
      i++
      setTimeout(type, speed)
    }
  }

  type()
}

document.addEventListener("DOMContentLoaded", () => {
  const subtitle = document.querySelector(".hero-subtitle")
  const originalText = subtitle.textContent

  setTimeout(() => {
    typeWriter(subtitle, originalText, 80)
  }, 1000)
})

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
}

window.addEventListener("scroll", () => {
  const scrollBtn = document.querySelector(".scroll-to-top")
  if (scrollBtn) {
    if (window.scrollY > 300) {
      scrollBtn.style.display = "block"
    } else {
      scrollBtn.style.display = "none"
    }
  }
})

document.addEventListener("DOMContentLoaded", () => {
  const scrollBtn = document.createElement("button")
  scrollBtn.className = "scroll-to-top"
  scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>'
  scrollBtn.onclick = scrollToTop

  scrollBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: #3b82f6;
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: none;
        z-index: 1000;
        transition: all 0.3s ease;
        font-size: 1.2rem;
    `

  scrollBtn.addEventListener("mouseenter", () => {
    scrollBtn.style.background = "#2563eb"
    scrollBtn.style.transform = "translateY(-3px)"
  })

  scrollBtn.addEventListener("mouseleave", () => {
    scrollBtn.style.background = "#3b82f6"
    scrollBtn.style.transform = "translateY(0)"
  })

  document.body.appendChild(scrollBtn)
})

console.log("[v0] Portfolio JavaScript loaded successfully")
