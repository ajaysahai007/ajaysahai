

$(document).ready(function () {

    // Dark Mode Toggle Functionality
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const html = document.documentElement;

    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    if (currentTheme === 'dark') {
        html.setAttribute('data-theme', 'dark');
        if (themeIcon) {
            themeIcon.src = './assets/images/sun.png';
            themeIcon.alt = 'Light Mode';
        }
    } else {
        html.setAttribute('data-theme', 'light');
        if (themeIcon) {
            themeIcon.src = './assets/images/moon.png';
            themeIcon.alt = 'Dark Mode';
        }
    }

    // Toggle theme on button click
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const currentTheme = html.getAttribute('data-theme');
            if (currentTheme === 'light') {
                html.setAttribute('data-theme', 'dark');
                if (themeIcon) {
                    themeIcon.src = './assets/images/sun.png';
                    themeIcon.alt = 'Light Mode';
                }
                localStorage.setItem('theme', 'dark');
            } else {
                html.setAttribute('data-theme', 'light');
                if (themeIcon) {
                    themeIcon.src = './assets/images/moon.png';
                    themeIcon.alt = 'Dark Mode';
                }
                localStorage.setItem('theme', 'light');
            }
            
            // Update particles theme after a short delay to ensure DOM is updated
            setTimeout(function() {
                if (typeof window.updateParticlesTheme === 'function') {
                    window.updateParticlesTheme();
                } else {
                    console.error('updateParticlesTheme function not found');
                    // Fallback: reload page if function not available
                    setTimeout(function() {
                        if (typeof window.updateParticlesTheme === 'undefined') {
                            console.log('Reloading page to update particles...');
                            window.location.reload();
                        }
                    }, 500);
                }
            }, 200);
        });
    }

    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    $(window).on('scroll load', function () {
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        if (window.scrollY > 60) {
            document.querySelector('#scroll-top').classList.add('active');
        } else {
            document.querySelector('#scroll-top').classList.remove('active');
        }

        // scroll spy
        $('section').each(function () {
            let height = $(this).height();
            let offset = $(this).offset().top - 200;
            let top = $(window).scrollTop();
            let id = $(this).attr('id');

            if (top > offset && top < offset + height) {
                $('.navbar ul li a').removeClass('active');
                $('.navbar').find(`[href="#${id}"]`).addClass('active');
            }
        });
    });

    // smooth scrolling
    $('a[href*="#"]').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top,
        }, 500, 'linear')
    });

    // <!-- emailjs to mail contact form data -->
    // Initialize EmailJS when page loads
    function initEmailJS() {
        if (typeof emailjs !== 'undefined') {
            try {
                emailjs.init("54TF7wvtcb4ctE1uY");
                console.log("EmailJS initialized successfully");
            } catch (e) {
                console.error("EmailJS init error:", e);
            }
        } else {
            // Retry after a short delay if EmailJS hasn't loaded yet
            setTimeout(initEmailJS, 100);
        }
    }
    
    // Initialize EmailJS when DOM is ready
    initEmailJS();
    
    $("#contact-form").submit(function (event) {
        event.preventDefault();
        
        // Check if EmailJS is loaded
        if (typeof emailjs === 'undefined') {
            alert("Email service is not available. Please refresh the page and try again, or contact me directly at ajaysahai007@gmail.com");
            return;
        }
        
        // Basic form validation
        const name = $("#fullname").val().trim();
        const email = $("#email_id").val().trim();
        const message = $("#message").val().trim();
        
        if (!name || !email || !message) {
            alert("Please fill in all required fields.");
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert("Please enter a valid email address.");
            return;
        }
        
        // Disable submit button to prevent double submission
        const submitBtn = $(this).find('button[type="submit"]');
        const originalText = submitBtn.html();
        submitBtn.prop('disabled', true).html('Sending... <i class="fa fa-spinner fa-spin"></i>');
        
        // Ensure EmailJS is initialized
        try {
            emailjs.init("54TF7wvtcb4ctE1uY");
        } catch (e) {
            console.error("EmailJS init error:", e);
        }
        
        // Prepare form data with multiple possible template variable names
        // This covers most common EmailJS template variable naming conventions
        const phoneValue = $("#phone").val().trim() || "Not provided";
        const formData = {
            // Standard EmailJS template variables
            from_name: name,
            from_email: email,
            phone: phoneValue,
            message: message,
            // Alternative common variable names
            name: name,
            email: email,
            user_name: name,
            user_email: email,
            user_message: message,
            user_phone: phoneValue,
            reply_to: email,
            subject: "New Contact Form Submission from " + name
        };
        
        // Use send method with explicit parameters (more reliable than sendForm)
        emailjs.send('service_jg5xjnr', 'template_s0izn4m', formData)
            .then(function (response) {
                console.log('SUCCESS!', response.status, response.text);
                $("#contact-form")[0].reset();
                submitBtn.prop('disabled', false).html(originalText);
                alert("Form Submitted Successfully! I'll get back to you soon.");
            }, function (error) {
                console.error('EmailJS Error Details:', error);
                submitBtn.prop('disabled', false).html(originalText);
                
                // Show detailed error message for debugging
                let errorMsg = "Form Submission Failed!\n\n";
                
                if (error.status) {
                    errorMsg += "Status Code: " + error.status + "\n";
                }
                
                if (error.text) {
                    errorMsg += "Error: " + error.text + "\n";
                }
                
                // Specific handling for different error types
                if (error.status === 404 || (error.text && error.text.includes("Account not found"))) {
                    errorMsg += "\n⚠️ EmailJS Account/Service Not Found:\n";
                    errorMsg += "The EmailJS service or account doesn't exist or is incorrect.\n\n";
                    errorMsg += "To fix this:\n";
                    errorMsg += "1. Go to https://dashboard.emailjs.com/\n";
                    errorMsg += "2. Check if your EmailJS account is active\n";
                    errorMsg += "3. Verify the Service ID: service_jg5xjnr\n";
                    errorMsg += "4. Verify the Template ID: template_s0izn4m\n";
                    errorMsg += "5. Verify the Public Key: 54TF7wvtcb4ctE1uY\n";
                    errorMsg += "6. If service doesn't exist, create a new Email Service\n";
                    errorMsg += "7. Update the IDs in the code if they changed\n\n";
                    errorMsg += "Note: You need to create/configure EmailJS service first.";
                } else if (error.text && error.text.includes("Gmail_API") && error.text.includes("Invalid grant")) {
                    errorMsg += "\n⚠️ Gmail Account Connection Issue:\n";
                    errorMsg += "Your EmailJS Gmail account needs to be reconnected.\n\n";
                    errorMsg += "To fix this:\n";
                    errorMsg += "1. Go to https://dashboard.emailjs.com/\n";
                    errorMsg += "2. Navigate to 'Email Services'\n";
                    errorMsg += "3. Find your Gmail service (service_jg5xjnr)\n";
                    errorMsg += "4. Click 'Reconnect' or 'Re-authorize' Gmail account\n";
                    errorMsg += "5. Follow the OAuth authorization steps\n\n";
                    errorMsg += "This is a server-side configuration issue, not a code problem.";
                } else if (error.text && error.text.includes("Invalid")) {
                    errorMsg += "\nPossible issues:\n";
                    errorMsg += "- Service ID or Template ID might be incorrect\n";
                    errorMsg += "- Public key might be invalid\n";
                    errorMsg += "- EmailJS account might need verification\n";
                }
                
                errorMsg += "\n\nIn the meantime, please contact me directly at: ajaysahai007@gmail.com";
                alert(errorMsg);
            });
    });
    // <!-- emailjs to mail contact form data -->

});

document.addEventListener('visibilitychange',
    function () {
        if (document.visibilityState === "visible") {
            document.title = "Portfolio | Ajay Kumar";
            $("#favicon").attr("href", "assets/images/favicon.png");
        }
        else {
            document.title = "Come Back To Portfolio";
            $("#favicon").attr("href", "assets/images/favhand.png");
        }
    });


// <!-- typed js effect starts -->
var typed = new Typed(".typing-text", {
    strings: ["devops engineer", "cloud engineer", "system engineer", "network engineer", "full stack developer"],
    loop: true,
    typeSpeed: 50,
    backSpeed: 25,
    backDelay: 500,
});
// <!-- typed js effect ends -->

async function fetchData(type = "skills") {
    let response
    type === "skills" ?
        response = await fetch("skills.json")
        :
        response = await fetch("./projects/projects.json")
    const data = await response.json();
    return data;
}

function showSkills(skills) {
    let skillsContainer = document.getElementById("skillsContainer");
    let skillHTML = "";
    skills.forEach(skill => {
        skillHTML += `
        <div class="bar">
              <div class="info">
                <img src="${skill.icon}" alt="${skill.name} icon" loading="lazy" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                <div class="icon-fallback" style="display:none; width:48px; height:48px; background:rgba(255,255,255,0.1); border-radius:8px; align-items:center; justify-content:center; font-size:2rem;">${skill.name.charAt(0)}</div>
                <span>${skill.name}</span>
              </div>
            </div>`
    });
    skillsContainer.innerHTML = skillHTML;
}

function showProjects(projects) {
    let projectsContainer = document.querySelector("#work .box-container");
    let projectHTML = "";
    projects.slice(0, 10).filter(project => project.category != "android").forEach(project => {
        projectHTML += `
        <div class="box tilt">
      <img draggable="false" src="/assets/images/projects/${project.image}.png" alt="project" />
      <div class="content">
        <div class="tag">
        <h3>${project.name}</h3>
        </div>
        <div class="desc">
          <p>${project.desc}</p>
          <div class="btns">
            <a href="${project.links.view}" class="btn" target="_blank"><i class="fas fa-eye"></i> View</a>
            <a href="${project.links.code}" class="btn" target="_blank">Code <i class="fas fa-code"></i></a>
          </div>
        </div>
      </div>
    </div>`
    });
    projectsContainer.innerHTML = projectHTML;

    // <!-- tilt js effect starts -->
    VanillaTilt.init(document.querySelectorAll(".tilt"), {
        max: 15,
    });
    // <!-- tilt js effect ends -->

    /* SCROLL PROJECTS */
    if (typeof srtop !== 'undefined') {
        srtop.reveal('.work .box', { interval: 200 });
    }

}

fetchData().then(data => {
    showSkills(data);
});

fetchData("projects").then(data => {
    showProjects(data);
});

// <!-- tilt js effect starts -->
VanillaTilt.init(document.querySelectorAll(".tilt"), {
    max: 15,
});
// <!-- tilt js effect ends -->


// pre loader start
// function loader() {
//     document.querySelector('.loader-container').classList.add('fade-out');
// }
// function fadeOut() {
//     setInterval(loader, 500);
// }
// window.onload = fadeOut;
// pre loader end

// disable developer mode
// document.onkeydown = function (e) {
//     if (e.keyCode == 123) {
//         return false;
//     }
//     if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
//         return false;
//     }
//     if (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
//         return false;
//     }
//     if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
//         return false;
//     }
//     if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
//         return false;
//     }
// }

// Start of Tawk.to Live Chat
//<script type="text/javascript">
// var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
// (function(){
// var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
// s1.async=true;
// s1.src='https://embed.tawk.to/63f7699d31ebfa0fe7eee96a/1gpv794b3';
// s1.charset='UTF-8';
// s1.setAttribute('crossorigin','*');
// s0.parentNode.insertBefore(s1,s0);
// })();
//</script>
// End of Tawk.to Live Chat


/* ===== SCROLL REVEAL ANIMATION ===== */
const srtop = ScrollReveal({
    origin: 'top',
    distance: '80px',
    duration: 800,
    reset: false
});
/* ===== SCROLL REVEAL ANIMATION ===== */

/* SCROLL HOME */
srtop.reveal('.home .content h3', { delay: 200 });
srtop.reveal('.home .content p', { delay: 200 });
srtop.reveal('.home .content .btn', { delay: 200 });

srtop.reveal('.home .image', { delay: 400 });
srtop.reveal('.home .linkedin', { interval: 600 });
srtop.reveal('.home .github', { interval: 800 });
srtop.reveal('.home .twitter', { interval: 1000 });
srtop.reveal('.home .telegram', { interval: 600 });
srtop.reveal('.home .instagram', { interval: 600 });
srtop.reveal('.home .dev', { interval: 600 });

/* SCROLL ABOUT */
srtop.reveal('.about .content h3', { delay: 200 });
srtop.reveal('.about .content .tag', { delay: 200 });
srtop.reveal('.about .content p', { delay: 200 });
srtop.reveal('.about .content .box-container', { delay: 200 });
srtop.reveal('.about .content .resumebtn', { delay: 200 });


/* SCROLL SKILLS */
srtop.reveal('.skills .container', { interval: 200 });
srtop.reveal('.skills .container .bar', { delay: 400 });

/* SCROLL EDUCATION */
srtop.reveal('.education .box', { interval: 200 });

/* SCROLL PROJECTS */
srtop.reveal('.work .box', { interval: 200 });

/* SCROLL EXPERIENCE */
srtop.reveal('.experience .timeline', { delay: 400 });
srtop.reveal('.experience .timeline .container', { interval: 400 });

/* SCROLL CONTACT */
srtop.reveal('.contact .container', { delay: 400 });
srtop.reveal('.contact .container .form-group', { delay: 400 });






