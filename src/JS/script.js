gsap.registerPlugin(ScrollTrigger);
/*****************************Start Header Menu**********************************/
const MenuBar = document.getElementById("menuBar");
const HeaderArrows = document.querySelectorAll("header nav ul li > a.flex > div > i");
const DropDowns = document.querySelectorAll("header nav ul li div.z-50");

let isOpened = [];
let LastOpenedIndex = -1;
let menuBarIsOpen = false;

DropDowns.forEach((ele, index) => {
  isOpened[index] = false;
});

function OpenDropDown(index)
{
  gsap.to(`header nav ul li:nth-child(${index < 3 ? index + 1 : index + 2}) > a.flex > div > i`,{
    rotate: 90,
    duration: .5,
  });
  DropDowns[index].classList.add(`active-arrow${index}`);
  isOpened[index] = !isOpened[index];
  LastOpenedIndex = index;
}

function CloseDropDown(index)
{
  gsap.to(`header nav ul li:nth-child(${index < 3 ? index + 1 : index + 2}) > a.flex > div > i`,{
    rotate: 0,
    duration: .5,
  });
  DropDowns[index].classList.remove(`active-arrow${index}`);
  isOpened[index] = !isOpened[index];
  LastOpenedIndex = -1;
}

function ClosePrevDropDown(index)
{
  if(index == -1) return;
  gsap.to(`header nav ul li:nth-child(${index < 3 ? index + 1 : index + 2}) > a.flex > div > i`,{
    rotate: 0,
    duration: .5,
  });
  DropDowns[index].classList.remove(`active-arrow${index}`);
  isOpened[index] = !isOpened[index];
}

HeaderArrows.forEach((arrow,index) => {
  arrow.addEventListener("click", () => {
    if(isOpened[index])
    { 
      CloseDropDown(index);
    }
    else
    {
      ClosePrevDropDown(LastOpenedIndex);
      OpenDropDown(index);
    }
  });
});

MenuBar.addEventListener('click',() => {
  if(!menuBarIsOpen)
  {
    gsap.to("header nav ul",{
      y: 413,
      opacity:1,
      duration: 1
    });
    menuBarIsOpen = true;
  }
  else
  {
    HeaderArrows.forEach((arrow,index) => { CloseDropDown(index) });
    gsap.to("header nav ul",{
      y: -100,
      opacity:0,
      duration: 1
    });
    menuBarIsOpen = false;
  }
});
/*****************************End Header Menu**********************************/
/*******************************Start Slider***********************************/
const SliderEle = document.querySelectorAll(".slider .slide");
const Slider = document.querySelector(".slider");
let ActiveIndex = 2;
let PrevIndex = 1;

function SliderAnimation()
{
  gsap.fromTo(`.slider > div:nth-child(${ActiveIndex})`,{
    scale:0.3,
    opacity:0,
    ease: "power2.inOut",
  }
  ,{
    scale:1,
    opacity:1,
    zIndex: 10,
    ease: "power2.inOut",
    duration:5
  });
  gsap.fromTo(`.slider > div:nth-child(${PrevIndex})`,{
    opacity:1,
    ease: "power2.inOut",
  }
  ,{
    scale:1,
    zIndex: 5,
    opacity:0,
    ease: "power2.inOut",
    duration:5
  });
  ImageZoom(ActiveIndex);
  TextAnimation(ActiveIndex);
}
function InitImageZoom(index)
{
  gsap.to(`.slider > div:nth-child(${index})`,{ 
    scale:1.05,
    duration:12
  });
}
function ImageZoom(index)
{
  gsap.to(`.slider > div`,{ 
    scale:1.05,
    duration:9,
    delay:4.8
  });
}
function TextAnimation(index)
{
  let text = new SplitType(`.slider > .slide:nth-child(${index}) > div h1`, { types: 'words, chars' });
  gsap.from(text.chars, {
    delay:1,
    rotate : 90,
    x:750,
    duration: 1.5,
    stagger: { amount: 2 },
    ease: "power2.inOut"
  });
}
function ActivateSlider()
{
  SliderAnimation();
  PrevIndex = ActiveIndex;
  ActiveIndex = ActiveIndex % SliderEle.length + 1;
}
window.addEventListener("DOMContentLoaded",() => {
  InitImageZoom(1);
  TextAnimation(1);
});
setInterval(ActivateSlider,12000);
/*******************************End Slider***********************************/
/*****************************Start Services***********************************/
gsap.from("#servicesLeft",{
  scrollTrigger: {
    trigger: '#servicesLeft',
    start: '-65% top',
    end: '75% top',
    toggleActions: "play reverse restart reverse"
  },
  xPercent: -200,
});
gsap.from("#servicesRight",{
  scrollTrigger: {
    trigger: '#servicesRight',
    start: '-65% top',
    end: '75% top',
    toggleActions: "play reverse restart reverse"
  },
  xPercent: 200,
})
/*******************************End Services***********************************/
/*******************************Start About Us*********************************/
gsap.from("#aboutUSinfo",{
  scrollTrigger: {
    trigger: '.about-us',
    start: '-45% top',
  },
  rotationZ: -90,
  x:-600,
  y:-200
});
/*******************************End About Us*********************************/
/*******************************Start Guarantee******************************/
const mediaQueryObj = window.matchMedia("(max-width: 640px)");
function ResponsiveAnimation()
{
  if(mediaQueryObj.matches)
  {
      gsap.from("#animated_part",{
        scrollTrigger: {
          trigger:'.get-in-touch',
          start:'40% top',
          end: "110% top",
          toggleActions: "play reverse restart reverse"
        },
        xPercent:-150,
        duration:0.5  
      });
    }
    else
    {
      gsap.from("#animated_part",{
        scrollTrigger: {
          trigger:'.guarantee',
          start:'-25% top',
          end:"70% top",
          toggleActions: "play reverse restart reverse"
        },
        xPercent:-150,
        duration:0.5
      });
  }
}
ResponsiveAnimation();
/*******************************End Guarantee******************************/
/**************************Start Data Cards***************************/
const swiper = new Swiper(".data-cards .mySwiper", {
  slidesPerView: 4,
  lazy: true,
  spaceBetween: 20,
  loop: true,
  autoplay: {
    delay: 4000,
    pauseOnMouseEnter: true
  },
});

gsap.from('.data-cards .text-center span,.data-cards .text-center h1',{
  scrollTrigger:{
    trigger:".data-cards",
    start: "-70% top",
    end: "+=1",
  },
  scale: 0,
  ease: "elastic.out(1,0.3)",
  duration: 2
});
/**************************End Data Cards***************************/
/****************************Start Get In Touch****************************/
let TimeData = [1,2,3,4,5,6];
let Selected_Cars = ["Aston Martin", "Bentley" ,"Buggati"];
const SelectTimeInputs = document.querySelectorAll("input[placeholder = 'Select time']");
const InputDates = document.querySelectorAll("input[type = 'date']");
const SelectCarInput = document.getElementById("select_car_input");
const Select_Car_Ul = document.getElementById("select_car_ul");
const InputDates_Ul = document.querySelectorAll("#select_time");
const form = document.querySelector("form");

form.addEventListener('submit',(e) => {
  e.preventDefault();
  e.target.reset();
});

InputDates[0].valueAsDate = new Date();
InputDates[1].valueAsDate = new Date();

Selected_Cars.forEach((car) => {
  Select_Car_Ul.innerHTML += `
    <li class="mb-5 text-slate-400 hover:text-[#C2A56B] hover:translate-x-5 duration-300 cursor-pointer">${car}</li>
  `;
});

document.querySelectorAll("form div > ul li").forEach((data) => {
  data.addEventListener('click',() => {
    SelectCarInput.value = data.innerHTML;
  });
});

InputDates_Ul.forEach((ul) => {
  TimeData.forEach((time) => {
    ul.innerHTML += `
    <li class="mb-5 text-slate-400 hover:text-[#C2A56B] hover:translate-x-5 duration-300 cursor-pointer">${time}</li>
    `;
  });
});


document.querySelectorAll("#select_time0 ul li").forEach((time) => {
  time.addEventListener('click',() => {
    SelectTimeInputs[0].value = time.innerHTML;
  });
});

document.querySelectorAll("#select_time1 ul li").forEach((time) => {
  time.addEventListener('click',() => {
    SelectTimeInputs[1].value = time.innerHTML;
  });
});

gsap.from(".get-in-touch .container .right-part",{
  scrollTrigger: {
    trigger: ".get-in-touch .container .right-part",
    start: "-100% top"
  },
  xPercent: 150,
  duration: 0.8
})

gsap.from(".get-in-touch .container .left-part .flex .phone",{
  scrollTrigger: {
    trigger:".get-in-touch",
    start: "-20% top"
  },
  opacity:0,
  xPercent:50,
  yPercent:-50,
  rotationZ: 90,
  duration:1
});
gsap.from(".get-in-touch .container .left-part .flex .email",{
  scrollTrigger:{
    trigger:".get-in-touch",
    start: "-20% top"
  },
  opacity:0,
  xPercent:50,
  yPercent:-50,
  rotationZ: 90,
  duration:1
});
/****************************End Get In Touch****************************/
//Start Buying logic
let i = 0;
let AllCars = [1,2,3,4,5,6,7];
const IsStockAvailable = AllCars.length != 0;
let DesiredCars = [];
const cart_var = document.querySelector(":root");
const CartDiv = document.getElementById("desired_cars");
const SliderData = document.getElementById("swiper_slider");
const AddInCartButtons = document.querySelectorAll(".data-cards > .swiper .swiper-slide > .card > .back-face > div > button");
/***************************Start Cart Logic****************************/
function ManifestAllCarsData()
{
  if(!IsStockAvailable)
  {
    SliderData.innerHTML = `
      <div class="flex gap-2 justify-center items-center w-[100%] p-5 text-[#C2A56B]">
        <i class="fa-solid fa-ban w-[2rem]"></i>
        <p class="text-[17px] w-[9rem]">No Stock Right Now</p>
      </div>
    `;
  }
  else
  {
    AllCars.forEach((car,index) => {
      SliderData.innerHTML += `
        <div class="swiper-slide">
          <div class="card h-[25rem] w-[100%] relative">
            <div class="front-face w-[100%] p-3 h-[100%] flex items-end bg-[url('../Images/CarsImages/cars${index % 4 + 1}.jpg')] bg-cover">
              <h1 class="text-[1rem] md:text-[1.5rem] lg:text-[2rem] text-white capitalize">toyota corolla 1973</h1>
            </div>
            <div class="back-face absolute top-0 -z-10 w-[100%] h-[100%] bg-[url('../Images/CarsImages/back-face-wallpaper.jpg')] bg-cover after:content-[''] after:absolute after:inset-0 after:bg-[#00000087]">
              <div class="w-[100%] flex flex-col h-[100%] relative z-40 px-3">
                <div class="mb-auto">
                  <p class="text-[0.7rem] md:text-[1rem] lg:text-[1.5rem] my-2 text-[#C2A56B]">City _mpg: 23</p>
                  <p class="text-[0.7rem] md:text-[1rem] lg:text-[1.5rem] my-2 text-[#C2A56B]">Class: Compact Car</p>
                  <p class="text-[0.7rem] md:text-[1rem] lg:text-[1.5rem] my-2 text-[#C2A56B]">Combination mpg: 24</p>
                  <p class="text-[0.7rem] md:text-[1rem] lg:text-[1.5rem] my-2 text-[#C2A56B]">Cylinders: 4</p>
                  <p class="text-[0.7rem] md:text-[1rem] lg:text-[1.5rem] my-2 text-[#C2A56B]">Displacement: 1.6</p>
                  <p class="text-[0.7rem] md:text-[1rem] lg:text-[1.5rem] my-2 text-[#C2A56B]">Drive: "fwd"</p>
                  <p class="text-[0.7rem] md:text-[1rem] lg:text-[1.5rem] my-2 text-[#C2A56B]">Fuel type: "gas"</p>
                  <p class="text-[0.7rem] md:text-[1rem] lg:text-[1.5rem] my-2 text-[#C2A56B]">Highway mpg: 26</p>
                </div>
                <button onclick="Add_To_Cart()" class="text-center mb-2 hover:bg-[#C2A56B] text-white hover:text-black duration-500 transition-colors w-fit mx-auto block px-5 py-1 border-2 border-[#C2A56B]">Add In Cart</button>
              </div>
            </div>
          </div>
        </div>
      `
    });
  }
}
ManifestAllCarsData();

function ManifesDesiredCarstData()
{
  if(IsStockAvailable)
    if(!DesiredCars.length)
    {
      CartDiv.innerHTML = `<p class="text-center">No Cars Yet</p>`;
    }
    else
    {
      CartDiv.innerHTML = "";
      DesiredCars.forEach((car,index) => {
        CartDiv.innerHTML += `
          <div class="flex flex-wrap md:w-[15rem] lg:w-[20rem] p-3">
            <div class="image-container h-[7rem] md:w-[100%] lg:w-[75%] pr-[5%]" style="background-image: url(../Images/CarsImages/cars1.jpg); background-size: cover;"></div>
            <div class="text md:mt-2 lg:m-0 flex lg:flex-col justify-center items-center md:w-[100%] lg:w-[25%] pl-[5%]">
              <p class="text-center md:pr-2 lg:p-0">Toyota Corolla 1973</p>
              <div class="md:pr-2 lg:p-0">
                <button onclick="Remove_From_Cart(${index})" class="text-center text-[0.7rem] lg:mt-2 hover:bg-[#C2A56B] hover:text-white duration-500 transition-colors px-3 md:py-1 lg:py-0 rounded-3xl border-2 border-[#C2A56B]">Remove</button>
              </div>
            </div>
          </div>
        `
      });
    }
  else
  {
    CartDiv.innerHTML = `
      <div class="flex gap-2 justify-center items-center w-[100%] p-5 text-[#C2A56B]">
        <i class="fa-solid fa-ban w-[2rem]"></i>
        <p class="text-[17px] w-[9rem]">No Stock Right Now</p>
      </div>
    `
  }
}
ManifesDesiredCarstData();
function Add_To_Cart()
{
  cart_var.style.setProperty('--cart-after-content', `"${++i}"`);
  DesiredCars.push("Mohamed");
  ManifesDesiredCarstData();
}
function Remove_From_Cart(index)
{
  cart_var.style.setProperty('--cart-after-content', `"${--i}"`);
  DesiredCars.splice(index, 1);
  ManifesDesiredCarstData();
}
AddInCartButtons.forEach((button) => button.addEventListener("click", Add_To_Cart));
/***************************End Cart Logic****************************/
//End Buying logic
/**************************Start Scroll Smoother*****************************/
const lenis = new Lenis();
function raf(time) 
{
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);
/**************************End Scroll Smoother*****************************/

