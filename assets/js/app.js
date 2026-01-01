/* -----------------------------------------------
/* How to use? : Check the GitHub README
/* ----------------------------------------------- */

/* To load a config file (particles.json) you need to host this demo (MAMP/WAMP/local)... */
/*
particlesJS.load('particles-js', 'particles.json', function() {
  console.log('particles.js loaded - callback');
});
*/

/* Otherwise just put the config content (json): */

// Function to get particles color based on theme
function getParticlesColor() {
  const theme = document.documentElement.getAttribute('data-theme');
  return theme === 'dark' ? '#ffffff' : '#000000';
}

// Function to get particles line color based on theme
function getParticlesLineColor() {
  const theme = document.documentElement.getAttribute('data-theme');
  return theme === 'dark' ? '#ffffff' : '#000000';
}

// Function to get particles opacity based on theme
function getParticlesOpacity() {
  const theme = document.documentElement.getAttribute('data-theme');
  return theme === 'dark' ? 0.8 : 0.5;
}

// Function to get line opacity based on theme
function getLineOpacity() {
  const theme = document.documentElement.getAttribute('data-theme');
  return theme === 'dark' ? 0.6 : 0.4;
}

// Initialize particles with theme-based colors
function initParticles() {
  // Check if particlesJS is available
  if (typeof particlesJS === 'undefined') {
    console.error('particlesJS is not loaded');
    setTimeout(initParticles, 100);
    return;
  }
  
  // Check if container exists
  const container = document.getElementById('particles-js');
  if (!container) {
    console.error('particles-js container not found');
    return;
  }
  
  const particlesColor = getParticlesColor();
  const lineColor = getParticlesLineColor();
  const particlesOpacity = getParticlesOpacity();
  const lineOpacity = getLineOpacity();
  const theme = document.documentElement.getAttribute('data-theme') || 'light';
  
  console.log('Initializing particles with theme:', theme, 'color:', particlesColor);
  
  try {
    // Make sure we're calling particlesJS correctly
    if (typeof particlesJS === 'function') {
      particlesJS('particles-js',
    {
      "particles": {
        "number": {
          "value": theme === 'dark' ? 60 : 80,
          "density": {
            "enable": true,
            "value_area": theme === 'dark' ? 1000 : 800
          }
        },
        "color": {
          "value": particlesColor
        },
      "shape": {
        "type": "circle",
        "stroke": {
          "width": 0,
          "color": particlesColor
        },
        "polygon": {
          "nb_sides": 5
        },
        "image": {
          "src": "img/github.svg",
          "width": 100,
          "height": 100
        }
      },
      "opacity": {
        "value": particlesOpacity,
        "random": false,
        "anim": {
          "enable": false,
          "speed": 1,
          "opacity_min": theme === 'dark' ? 0.3 : 0.1,
          "sync": false
        }
      },
      "size": {
        "value": theme === 'dark' ? 5 : 5,
        "random": true,
        "anim": {
          "enable": false,
          "speed": 40,
          "size_min": theme === 'dark' ? 3 : 0.1,
          "sync": false
        }
      },
      "line_linked": {
        "enable": true,
        "distance": theme === 'dark' ? 180 : 150,
        "color": lineColor,
        "opacity": lineOpacity,
        "width": theme === 'dark' ? 1.5 : 1
      },
      "move": {
        "enable": true,
        "speed": 6,
        "direction": "none",
        "random": false,
        "straight": false,
        "out_mode": "out",
        "attract": {
          "enable": false,
          "rotateX": 600,
          "rotateY": 1200
        }
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": true,
          "mode": "repulse"
        },
        "onclick": {
          "enable": true,
          "mode": "push"
        },
        "resize": true
      },
      "modes": {
        "grab": {
          "distance": 400,
          "line_linked": {
            "opacity": 1
          }
        },
        "bubble": {
          "distance": 400,
          "size": 40,
          "duration": 2,
          "opacity": 8,
          "speed": 3
        },
        "repulse": {
          "distance": 200
        },
        "push": {
          "particles_nb": 4
        },
        "remove": {
          "particles_nb": 2
        }
      }
    },
    "retina_detect": true,
    "config_demo": {
      "hide_card": false,
      "background_color": "#000000",
      "background_image": "",
      "background_position": "50% 50%",
      "background_repeat": "no-repeat",
      "background_size": "cover"
    }
  }
      );
      console.log('Particles initialized successfully');
    } else {
      console.error('particlesJS is not a function');
    }
  } catch (error) {
    console.error('Error initializing particles:', error);
    // Retry after error
    setTimeout(function() {
      if (document.getElementById('particles-js')) {
        initParticles();
      }
    }, 500);
  }
}

// Initialize particles when everything is ready
function initializeParticlesOnReady() {
  // Check if particlesJS library is loaded
  if (typeof particlesJS === 'undefined') {
    console.log('Waiting for particlesJS to load...');
    setTimeout(initializeParticlesOnReady, 100);
    return;
  }
  
  // Check if particles container exists
  const particlesContainer = document.getElementById('particles-js');
  if (!particlesContainer) {
    console.log('Waiting for particles-js container...');
    setTimeout(initializeParticlesOnReady, 100);
    return;
  }
  
  // Make sure theme attribute is set
  if (!document.documentElement.getAttribute('data-theme')) {
    document.documentElement.setAttribute('data-theme', 'light');
  }
  
  // Check if particles already initialized
  if (window.pJSDom && window.pJSDom.length > 0) {
    console.log('Particles already initialized');
    return;
  }
  
  // Initialize particles
  console.log('Initializing particles...');
  initParticles();
}

// Try multiple initialization strategies
function tryInitializeParticles() {
  if (typeof particlesJS !== 'undefined' && document.getElementById('particles-js')) {
    if (!window.pJSDom || window.pJSDom.length === 0) {
      if (!document.documentElement.getAttribute('data-theme')) {
        document.documentElement.setAttribute('data-theme', 'light');
      }
      initParticles();
    }
  } else {
    // Retry if not ready
    setTimeout(tryInitializeParticles, 200);
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initializeParticlesOnReady, 500);
  });
} else {
  setTimeout(initializeParticlesOnReady, 500);
}

// Backup initialization on window load
window.addEventListener('load', function() {
  setTimeout(function() {
    tryInitializeParticles();
  }, 800);
});

// Also try after jQuery ready (since script.js uses jQuery)
if (typeof jQuery !== 'undefined') {
  jQuery(document).ready(function() {
    setTimeout(function() {
      tryInitializeParticles();
    }, 600);
  });
} else {
  // If jQuery not loaded yet, wait for it
  var checkJQuery = setInterval(function() {
    if (typeof jQuery !== 'undefined') {
      clearInterval(checkJQuery);
      jQuery(document).ready(function() {
        setTimeout(function() {
          tryInitializeParticles();
        }, 600);
      });
    }
    // Stop checking after 5 seconds
    if (checkJQuery && checkJQuery._timeout) {
      clearInterval(checkJQuery);
    }
  }, 100);
  
  // Fallback: try one more time after 2 seconds
  setTimeout(function() {
    tryInitializeParticles();
  }, 2000);
}

// Update particles when theme changes
function updateParticlesTheme() {
  console.log('Updating particles theme...');
  
  // Destroy all existing particles instances
  if (window.pJSDom && window.pJSDom.length > 0) {
    for (let i = 0; i < window.pJSDom.length; i++) {
      if (window.pJSDom[i] && window.pJSDom[i].pJS) {
        const pJS = window.pJSDom[i].pJS;
        if (pJS.fn && pJS.fn.vendors && pJS.fn.vendors.destroypJS) {
          try {
            pJS.fn.vendors.destroypJS();
          } catch (e) {
            console.log('Error destroying particles:', e);
          }
        }
      }
    }
  }
  
  // Clear all canvas elements
  const container = document.getElementById('particles-js');
  if (container) {
    const canvases = container.querySelectorAll('canvas');
    canvases.forEach(function(canvas) {
      if (canvas.parentNode) {
        canvas.parentNode.removeChild(canvas);
      }
    });
  }
  
  // Clear pJSDom array
  window.pJSDom = [];
  
  // Wait a bit then reinitialize particles with new theme colors
  setTimeout(function() {
    const particlesContainer = document.getElementById('particles-js');
    if (particlesContainer && typeof particlesJS !== 'undefined') {
      console.log('Reinitializing particles with new theme...');
      initParticles();
    } else {
      console.error('Cannot reinitialize particles - container or library not found');
    }
  }, 200);
}

// Make function globally accessible
window.updateParticlesTheme = updateParticlesTheme;

// Listen for theme changes
const observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
      updateParticlesTheme();
    }
  });
});

// Observe theme changes on document element
observer.observe(document.documentElement, {
  attributes: true,
  attributeFilter: ['data-theme']
});