$(document).ready(function () {

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
    });
});

document.addEventListener('visibilitychange',
    function () {
        if (document.visibilityState === "visible") {
            document.title = "Projects | Portfolio Ajay Kumar";
            $("#favicon").attr("href", "../assets/images/favicon.png");
        }
        else {
            document.title = "Come Back To Portfolio";
            $("#favicon").attr("href", "../assets/images/favhand.png");
        }
    });


// fetch projects start
function getProjects() {
    return fetch("projects.json")
        .then(response => response.json())
        .then(data => {
            return data
        });
}


function showProjects(projects) {
    let projectsContainer = document.querySelector(".work .box-container");
    let projectsHTML = "";
    projects.forEach(project => {
        projectsHTML += `
        <div class="grid-item ${project.category}">
        <div class="box tilt" style="width: 380px; margin: 1rem">
      <img draggable="false" src="../assets/images/projects/${project.image}.png" alt="project" />
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
    </div>
    </div>`
    });
    projectsContainer.innerHTML = projectsHTML;

    // vanilla tilt.js
    // VanillaTilt.init(document.querySelectorAll(".tilt"), {
    //     max: 20,
    // });
    // // vanilla tilt.js  

    // /* ===== SCROLL REVEAL ANIMATION ===== */
    // const srtop = ScrollReveal({
    //     origin: 'bottom',
    //     distance: '80px',
    //     duration: 1000,
    //     reset: true
    // });

    // /* SCROLL PROJECTS */
    // srtop.reveal('.work .box', { interval: 200 });

    // isotope filter products
    var $grid = $('.box-container').isotope({
        itemSelector: '.grid-item',
        layoutMode: 'fitRows',
        masonry: {
            columnWidth: 200
        }
    });

    // filter items on button click
    $('.button-group').on('click', 'button', function () {
        $('.button-group').find('.is-checked').removeClass('is-checked');
        $(this).addClass('is-checked');
        var filterValue = $(this).attr('data-filter');
        $grid.isotope({ filter: filterValue });
    });
}

getProjects().then(data => {
    showProjects(data);
})


// 2nd

// let paramsDefault = {
//     optionsPopup: {
//         background: '#095E54',
//         color: '#FFFFFF'
//     },
//     optionsIcon: {
//         background: '#24CD63',
//         color: '#FFFFFF'
//     },
//     optionsChat: {
//         buttonTarget: `https://api.whatsapp.com/send?`,
//         message:'Hello everyone',
//         phone:'+',
//         text: 'Send'
//     },
//     optionsBot: {
//         name: 'Ajay',
//         image: 'https://lh3.googleusercontent.com/ogw/AAEL6sgcsafw0lkpcq47S-AnAjpl3EHUZ4R2LRRb5eOp=s32-c-mo',
//         messageDefault: 'Hi, 👋 how can I help you?',
//         messageTyping: 'is typing...'
//     }
// };

let timer;

function initWidget(params)  {

    document.addEventListener("DOMContentLoaded", function(e) {
        const wpp = document.createElement('div');
        wpp.setAttribute("id", "whatsapp-widget");
        wpp.classList.add('whatsapp-widget');

        const body = document.querySelector('body');
        body.appendChild(wpp);

        createElements(params);
    })
}

function createElements(params) {
    const mainWhatsappWidget  = document.querySelector('#whatsapp-widget');

    if (params) 
        paramsDefault = params;

    const strTarget = ` <a href="#" id="whatsapp-widget-target" class="whatsapp-widget-target pulse">
                            <img id="whatsapp-widget-icon" class="whatsapp-widget-icon" src="https://imagepng.org/wp-content/uploads/2017/08/WhatsApp-icone.png"/>
                        </a>`;

    const strChat = `<div class="whatsapp-widget-chat" id="whatsapp-widget-chat">
                        <div class="whatsapp-widget-chat-header" id="whatsapp-widget-chat-header" style="background: ${paramsDefault.optionsPopup.background}; color: ${paramsDefault.optionsPopup.color}">
                            <div class="whatsapp-widget-chat-header close" id="close">✖</div>
                            <div class="whatsapp-widget-chat-header bot">
                                <div class="bot-img" id="bot-img">
                                    <img class="whatsapp-widget-chat-header" src="${paramsDefault.optionsBot.image}" />
                                </div>
                                
                                <div style="margin-left: 16px; margin-right: 16px">
                                    <div class="whatsapp-widget-chat-header name" id="nameBot">${paramsDefault.optionsBot.name}</div>
                                    <div class="whatsapp-widget-chat-header status" id="statusBot">ONLINE 🟢</div>
                                </div>
                            </div>
                        </div>
                        <div class="whatsapp-widget-chat-chat" id="whatsapp-widget-chat-chat">
                            <div class="whatsapp-widget-chat-chat message" id="messageBot">
                                <div class="whatsapp-widget-chat-chat header" id="userBot"></div>
                                <div class="whatsapp-widget-chat-chat msg" id="msgBot"></div>
                                <div class="whatsapp-widget-chat-chat date" id="dateBot"></div>
                            </div>
                            <div class="whatsapp-widget-chat-footer" id="whatsapp-widget-chat-footer">
                                <div id="whatsapp-widget-chat-input-container">
                                    <input type="text" placeholder="Write a message here" id="whatsapp-widget-chat-input" />                        
                                </div>
                                <a href="#" id="whatsapp-widget-open-modal" class="whatsapp-widget-open-modal">   
                                    ${paramsDefault.optionsChat.text}       
                                </a>
                            </div>
                        </div>
                    </div>`;

    mainWhatsappWidget.innerHTML = strTarget + strChat;

    setEvents();
}
    
function setEvents() {
    const close = document.getElementById("close");
    const modal = document.getElementById("whatsapp-widget-open-modal");
    const widgetChat = document.getElementById("whatsapp-widget-chat");
    const widgetTarget = document.getElementById("whatsapp-widget-target");

    const setEventClickClose = () => {
        close.addEventListener("click", function() {
            widgetChat.style.cssText = "visibility: hidden; opacity: 0";
        });
    }

    const setEventClickModal = () => {
        modal.addEventListener("click", function(e) {
            e.preventDefault();
            modalWhatsapp();
            widgetChat.style.cssText = "visibility: hidden; opacity: 0";
        });
    }

    const setEventClickWhatsappIcon = () => {
        const simulateMessage = () => {
            const messageBot = document.querySelector('#messageBot');
            const userBot = document.querySelector('#userBot');
            const msgBot = document.querySelector('#msgBot');
            const dateBot= document.querySelector('#dateBot');
            const statusBot = document.querySelector('#statusBot');
            
            messageBot.style.display = 'none';
            userBot.innerHTML = ``;
            msgBot.innerHTML = ``;
            statusBot.innerHTML = paramsDefault.optionsBot.messageTyping;
            dateBot.innerHTML = ``;
            
            clearTimeout(timer)

            timer = setTimeout(() => {
                messageBot.style.display = 'block';
                userBot.innerHTML = paramsDefault.optionsBot.name;
                msgBot.innerHTML = paramsDefault.optionsBot.messageDefault;
                statusBot.innerHTML = `Online`;
                dateBot.innerHTML = timeNow();
            }, 2000);
        }

        widgetTarget.addEventListener("click", function(e) {
            e.preventDefault();

            if (window.getComputedStyle(widgetChat).getPropertyValue("opacity") == '0') {
                widgetChat.style.cssText = "visibility: visible; opacity: 1";
                simulateMessage();
            } else {
                widgetChat.style.cssText = "visibility: hidden; opacity: 0";
            }
        })
    }
    
    setEventClickModal();
    setEventClickWhatsappIcon();
    setEventClickClose();
}

function modalWhatsapp() {
    const x = screen.width  / 2 - 800 / 2;
    const y = screen.height / 2 - 550 / 2;
    const messageInput=document.getElementById("whatsapp-widget-chat-input");

    let message = messageInput.value;

    if (message.length === 0) message = paramsDefault.optionsChat.message;
    
    window.open(
        `${paramsDefault.optionsChat.buttonTarget}phone=${paramsDefault.optionsChat.phone}&text=${encodeURIComponent(message)}`, 
        ``,
        `height=550,width=800,left=${x},top=${y}`
    );
}

function timeNow() {
    const timeString = new Date().toTimeString();

    return timeString.substring(0, 5);
}

// fetch projects end

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