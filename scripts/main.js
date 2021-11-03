/*Menu closed upon load...*/
let menuOpen = false;

/*Projects not yet loaded...*/
let projectsLoaded = false;

/* Function executes upon loading the document...*/
$(document).ready(() => {

        /*Hides developer and student section to prepare for slide in...*/

        $("#programmer").hide();
        $("#student").hide();

        /*NAV Buttons enlarge upon hover... only on desktop browsers, however.*/

        $(".navButtons").mouseenter(function(){
            if(window.innerWidth > 1366){
                $(this).animate({fontSize: '+=50%'}, 100);
            }
        });
        $(".navButtons").mouseleave(function(){
            if(window.innerWidth > 1366){
                $(this).animate({fontSize: '-=50%'}, 100);
            }
        });

        /*Border of FOOTER images becomes white when cursor is over the IMG.*/

        $(".footerImages").mouseenter(function(){
            $(this).animate({borderColor: 'white'}, 150);
        });
        $(".footerImages").mouseleave(function(){
            $(this).animate({borderColor: 'black'}, 150);
        });

        /*Project DIV borders become white when cursor is hovering over them.*/

        $(".project").mouseenter(function(){
            $(this).animate({borderColor: 'white'}, 150);
        });

        $(".project").mouseleave(function(){
            $(this).animate({borderColor: 'black'}, 150);
        });

        /*Buttons that overlay banner video fade into red upon hovering.*/

        $(".vidButton").mouseenter(function(){
            $(this).animate({color:"red"}, 250);
        });
        $(".vidButton").mouseleave(function(){
            $(this).animate({color:"black"}, 250);
        });

        /*Browser scrolls to the top of the window upon clicking the home button.*/

        $("#homeButton").click(()=>{
            window.scrollTo(0, 0);}
        );

        /*Browser scrolls to the top of the about me section upon clicking the about me button.*/

        $("#aboutMeButton").click(()=>{
            window.scrollTo(0, window.innerHeight); 
        });

        /*Browser scrolls to the top of the experience section upon clicking the experience button.*/

        $("#experienceButton").click(()=>{
            window.scrollTo(0, window.innerHeight*2); 
       });

        /*Browser scrolls to the top of the project section upon clicking the project button.*/

        $("#projectsButton").click(()=>{
             window.scrollTo(0, window.innerHeight*3); 
        });

        /*About me modal buttons turn white upon hover.*/

        $(".aboutMeClasses").mouseenter(function(){
            $(this).animate({borderColor: "white"}, 150);
        });
        $(".aboutMeClasses").mouseleave(function(){
            $(this).animate({borderColor: "black"}, 150);
        });

        /*Menu is open/closed upon pressing the hamburger icon on mobile devices. Scroll is disabled when the menu is open.*/

        $("#menu").click(function(){
            if(menuOpen){
              $("#leftSide").animate({left: "100%"}, 250);
              $(this).removeClass('hamburger hamburger--spin is-active');
              $(this).addClass('hamburger hamburger--spin');
              enableScroll();
            }
            else{
              $("#leftSide").animate({left: "0%"}, 250);
              $(this).removeClass('hamburger hamburger--spin');
              $(this).addClass('hamburger hamburger--spin is-active');
              disableScroll();
            }
            menuOpen = !menuOpen;
        });

        /*Left property of #leftSide is ensured to be "0" when on a desktop browser.*/

        window.addEventListener('resize', () => {
            if(window.innerWidth > 1024){
                $("#leftSide").css("left", "0%");
            }
        });
        
        /*Menu is hidden/show upon rotating a mobile device.*/
        window.addEventListener("orientationchange", () => {
            if(window.innerHeight > window.innerWidth)
                $("#leftSide").css("left", "0%");
            else
                $("#leftSide").css("left", "100%");
            menuOpen = false;
            enableScroll();
            $("#menu").removeClass('hamburger hamburger--spin is-active');
            $("#menu").addClass('hamburger hamburger--spin');
        });

        /*Slide-in animations for modal buttons & projects... only on desktop browsers.*/

        window.addEventListener('scroll', () => {
            const scrolledY = window.scrollY;
            if(window.innerWidth < 1366){
                $("#programmer").show();
                $("#student").show();
                $(".project").css('opacity', '50%');
            }
            else{
                if(scrolledY > 0){
                    $("#student").show("slide", {direction: "left"}, 500);
                }
                if(scrolledY >= (window.innerHeight/3)*2){
                    $("#programmer").show("slide", {direction: "right"}, 500);
                }
                if(scrolledY > window.innerHeight && !projectsLoaded){
                    anime({targets: '.project', opacity: '50%', duration: 1000, delay: anime.stagger(250)});
                    projectsLoaded = true;
                }
            }
          });
});

/*
* - Code for enabling/disabling scrolling when the mobile menu is open...
* - Taken from: https://stackoverflow.com/questions/4770025/how-to-disable-scrolling-temporarily/4770059
*/

var keys = {37: 1, 38: 1, 39: 1, 40: 1};

function preventDefault(e) {
  e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
  if (keys[e.keyCode]) {
    preventDefault(e);
    return false;
  }
}

// modern Chrome requires { passive: false } when adding event
var supportsPassive = false;
try {
  window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
    get: function () { supportsPassive = true; } 
  }));
} catch(e) {}

var wheelOpt = supportsPassive ? { passive: false } : false;
var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

// call this to Disable
function disableScroll() {
  window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
  window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
  window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
  window.addEventListener('keydown', preventDefaultForScrollKeys, false);
}

// call this to Enable
function enableScroll() {
  window.removeEventListener('DOMMouseScroll', preventDefault, false);
  window.removeEventListener(wheelEvent, preventDefault, wheelOpt); 
  window.removeEventListener('touchmove', preventDefault, wheelOpt);
  window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
}

