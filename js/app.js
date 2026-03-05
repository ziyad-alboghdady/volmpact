// projects code 
document.querySelectorAll('.flip-card').forEach(card => {
    const flipButtons = card.querySelectorAll('.flip-btn');
    flipButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        card.classList.toggle('flipped');
      });
    });
  });

// -*-*-*-*-*-*-*-*-*-*-*-*-
// ABOUT CODE

document.addEventListener("DOMContentLoaded", function() {
  // Variables for slider
  const slider = document.getElementById("slider");
  const indicatorsContainer = document.getElementById("indicators");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const slides = document.querySelectorAll(".slide");
  
  // Set CSS variable for slides-per-view based on window width
  function updateSlidesPerViewCSS() {
    const width = window.innerWidth;
    if (width < 768) {
      document.documentElement.style.setProperty('--slides-per-view', '1');
      return 1;
    } else if (width < 992) {
      document.documentElement.style.setProperty('--slides-per-view', '2');
      return 2;
    } else {
      document.documentElement.style.setProperty('--slides-per-view', '3');
      return 3;
    }
  }
  
  // Initialize variables
  let currentIndex = 0;
  let slidesPerView = updateSlidesPerViewCSS();
  let maxIndex = 0; // Will be calculated in initSlider
  
  // Initialize the slider
  initSlider();
  
  // Update slidesPerView on window resize
  window.addEventListener("resize", function() {
    const newSlidesPerView = updateSlidesPerViewCSS();
    if (newSlidesPerView !== slidesPerView) {
      slidesPerView = newSlidesPerView;
      
      // Calculate new max index
      const newMaxIndex = calculateMaxIndex();
      
      // Adjust currentIndex if needed
      if (currentIndex > newMaxIndex) {
        currentIndex = newMaxIndex;
      }
      
      // Reinitialize slider with new slidesPerView
      initSlider();
    }
  });
  
  // Initialize slider and indicators
  function initSlider() {
    // Calculate max index based on current slides per view
    maxIndex = calculateMaxIndex();
    
    // Create indicators
    indicatorsContainer.innerHTML = "";
    
    for (let i = 0; i <= maxIndex; i++) {
      const indicator = document.createElement("div");
      indicator.className = "indicator" + (i === currentIndex ? " active" : "");
      indicator.setAttribute("data-index", i);
      indicator.addEventListener("click", function() {
        currentIndex = parseInt(this.getAttribute("data-index"));
        updateSliderPosition();
      });
      indicatorsContainer.appendChild(indicator);
    }
    
    // Update button states
    updateButtonStates();
    
    // Initial slider position update
    updateSliderPosition();
  }
        
  // Calculate maximum viewable index
  function calculateMaxIndex() {
    return Math.max(0, Math.ceil(slides.length / slidesPerView) - 1);
  }
  
  // Update slider position
  function updateSliderPosition() {
    // Calculate how many slides to show per "page"
    const slidesToShow = slidesPerView;
    
    // Calculate how many total "pages" we have (0-indexed)
    maxIndex = calculateMaxIndex();
    
    // Calculate percentage to move
    const slideWidth = 100 / slidesToShow;
    const offset = currentIndex * slidesToShow * slideWidth;
    
    // Move the slider
    slider.style.transform = `translateX(-${offset}%)`;
    
    // Update indicators
    const indicators = document.querySelectorAll(".indicator");
    indicators.forEach((ind, i) => {
      ind.classList.toggle("active", i === currentIndex);
    });
    
    // Update button states
    updateButtonStates();
  }
  
  // Update button states (enable/disable)
  function updateButtonStates() {
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === maxIndex;
  }
  
  // Move slide function - placed outside event listener to be globally accessible
  window.moveSlide = function(direction) {
    const newIndex = currentIndex + direction;
    
    if (newIndex >= 0 && newIndex <= maxIndex) {
      currentIndex = newIndex;
      updateSliderPosition();
    }
  };
  
  // Add event listeners to the buttons
  prevBtn.addEventListener("click", function() {
    moveSlide(-1);
    stopAutoplay();
  });
  
  nextBtn.addEventListener("click", function() {
    moveSlide(1);
    stopAutoplay();
  });
  
  // Function to flip cards
  window.flipCard = function(button) {
    const card = button.closest('.flip-card');
    card.classList.toggle('flipped');
  };
  
  // Auto-play functionality
  let autoplayInterval;
  
  function startAutoplay() {
    stopAutoplay(); // Clear any existing interval
    autoplayInterval = setInterval(() => {
      if (currentIndex < maxIndex) {
        moveSlide(1);
      } else {
        currentIndex = 0;
        updateSliderPosition();
      }
    }, 5000);
  }
  
  function stopAutoplay() {
    if (autoplayInterval) clearInterval(autoplayInterval);
  }
  
  // Start autoplay
  startAutoplay();
  
  // Pause autoplay on hover
  slider.parentElement.addEventListener("mouseenter", stopAutoplay);
  slider.parentElement.addEventListener("mouseleave", startAutoplay);
  
  // Stop autoplay when user interacts with indicators
  indicatorsContainer.addEventListener("click", stopAutoplay);
});

// Index javascript
const canvas = document.getElementById("bgCanvas");
    const ctx = canvas.getContext("2d");
    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    let particles = [];
    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5
      });
    }
    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
        ctx.fill();
      });
      requestAnimationFrame(animateParticles);
    }
    animateParticles();

    document.addEventListener("DOMContentLoaded", function () {
      const data = [
        { icon: "fas fa-seedling", title: "Environmental Projects", text: "From tree planting to ocean cleanups, we support nature through meaningful action.", img: "https://source.unsplash.com/400x300/?forest" },
        { icon: "fas fa-book-reader", title: "Educational Support", text: "We offer tutoring programs and workshops to help students succeed.", img: "https://source.unsplash.com/400x300/?education" },
        { icon: "fas fa-hands", title: "Community Aid", text: "Our team regularly organizes food drives, charity events, and support services.", img: "https://source.unsplash.com/400x300/?charity" },
        { icon: "fas fa-globe", title: "Global Initiatives", text: "Join our global outreach projects connecting volunteers across borders.", img: "https://source.unsplash.com/400x300/?global" },
        { icon: "fas fa-paint-brush", title: "Creative Workshops", text: "Explore creativity through art programs, crafts, and digital media events.", img: "https://source.unsplash.com/400x300/?art" },
        { icon: "fas fa-heart", title: "Health Campaigns", text: "We organize blood donation, mental health awareness, and wellness drives.", img: "https://source.unsplash.com/400x300/?health" },
        { icon: "fas fa-music", title: "Cultural Events", text: "Celebrate music, dance, and traditions through vibrant cultural festivals.", img: "https://source.unsplash.com/400x300/?culture" },
        { icon: "fas fa-code", title: "Tech for Good", text: "Build software, websites, and tools that benefit the community.", img: "https://source.unsplash.com/400x300/?technology" }
      ];

      const container = document.getElementById("whatWeDoContent");
      data.forEach(item => {
        const col = document.createElement("div");
        col.className = "col-md-6 col-lg-3";
        col.innerHTML = `
          <div class="impact-stat-box">
            <img src="${item.img}" alt="${item.title}" class="img-fluid mb-3 rounded" loading="lazy" onerror="this.src='https://via.placeholder.com/400x300?text=Image+Unavailable'">
            <div class="impact-icon">
              <i class="${item.icon}"></i>
            </div>
            <div class="impact-number">${item.title}</div>
            <div class="impact-text">${item.text}</div>
          </div>`;
        container.appendChild(col);
      });

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });

      setTimeout(() => {
        document.querySelectorAll('.impact-stat-box').forEach(el => observer.observe(el));
      }, 300);
    });