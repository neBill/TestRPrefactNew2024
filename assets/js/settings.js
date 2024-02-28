'use strict';

function chageFontSize(buttonId){  

  const bodyStyles = window.getComputedStyle(document.body);

  const oldSize = bodyStyles.getPropertyValue('--btn-font-size'); //get

  let newSize = 1.7;    

  if(buttonId == "font-increase"){  

    newSize = (parseFloat(oldSize) + 0.1).toFixed(2);       
  }

  if(buttonId == "font-decrease"){

    newSize = (parseFloat(oldSize) - 0.1).toFixed(2);
  }   

  if(newSize <= 2.0 && newSize >= 1.4){

    document.body.style.setProperty("--btn-font-size", `${newSize}em`);//set

    document.getElementById('fontsize').style.fontSize = `${newSize}em`;

    localStorage.setItem('size', newSize);
  }
}




function clearCaches(){  
  caches.open('s-app-v1').then(cache => {
    cache.keys().then(keys => {
      keys.forEach(request => {
        cache.delete(request);
      });
    });
  });
}

function clearAllHistory() {

  localStorage.clear(); 

}

function clearCurrentHistory() {

  localStorage.removeItem(currentTest.id); 

}



window.addEventListener("load", ()=>{
   
  document.body.className = 'light-theme';

  loadSettings();
 
  createButtons();




});

window.addEventListener('load', function() {
  window.history.pushState({}, '')
});

window.addEventListener('popstate', function() {
  window.history.pushState({}, '')
});







//////////////////////////????????????

//   let deviceId = localStorage.getItem('deviceId');

//   if (!deviceId) {

//     deviceId = generateDeviceId();
//     localStorage.setItem('deviceId', deviceId);

//   }

// }


function showHistoryDropdown(){

  //document.getElementById("dropDown_History").style.display = "block";
  document.getElementById("dropDown_History").classList.toggle("visible");


}

function showMenu() {

  let isMenuShown = document.getElementById("dropDownMenu").classList.toggle("visible");

  if(isMenuShown === false){

    saveSettings();

  }

}

function hideMenu() { 

  document.getElementById("dropDownMenu").classList.remove("visible");  

  

  saveSettings();
}

function showHideHisotryMenu() { 

  let isMenuVisibile = document.getElementById("dropDown_History").classList.contains('visible') ;

  if(isMenuVisibile) {    

   document.getElementById("dropDown_History").classList.remove('visible')

  } else {

    document.getElementById("dropDown_History").classList.add('visible')
  }

 
}

function hideHelpPage() {

  document.getElementById("help_block").style.display = "none"; 
  //alert('hhh')

}

function showHelpPage() {

  document.getElementById("help_block").style.display = "block"; 
  hideMenu();

}


function showProfilePage() {

  //alert("ddd")

  document.getElementById("profile_block").style.display = "block"; 
  //hideMenu();

}

function hideProfilePage() {

  document.getElementById("profile_block").style.display = "none"; 
  //alert('hhh')

}




function loadSettings(){

  if(!localStorage.getItem('settings'))  return

  let togglesState = JSON.parse(localStorage.getItem('settings'));  

  apply(togglesState);

}

function apply(togglesState){  

  document.getElementById('theme_toggle').checked = togglesState.isDarkTheme; 
  document.getElementById('shuffle_toggle').checked = togglesState.isShuffle;
  document.getElementById('learn_mode_toggle').checked = togglesState.isLearn;
  document.getElementById('highlight_toggle').checked = togglesState.isHighlight;
  document.getElementById(togglesState.div).checked = "true";
  document.getElementById(togglesState.lev).checked = "true";


  isLearnMode = togglesState.isLearn;
  isShuffle = togglesState.isShuffle;
  isHighlight = togglesState.isHighlight;

  if (togglesState.isDarkTheme == true) { 

    //document.documentElement.setAttribute('theme', 'dark');
    document.body.className = 'dark-theme';
  }
  else {

     //document.documentElement.removeAttribute('theme'); 
    document.body.className = 'light-theme';
  }



}

// document.getElementById('themeToggle').addEventListener('click', function() {
//     // Этот код будет выполняться при каждом клике на кнопку

//     // Получаем текущий класс, заданный для элемента body (текущую тему)
//     const currentTheme = document.body.className;

//     // Проверяем, является ли текущая тема светлой
//     if (currentTheme === 'light-theme') {
//         // Если да, меняем тему на темную
//         document.body.className = 'dark-theme';
//     } else {
//         // Если текущая тема не светлая (или отсутствует), устанавливаем светлую тему
//         document.body.className = 'light-theme';
//     }
// });

function saveSettings(){  

  const [division, level] = getCheckedTest();

  const togglesState = {
   
    isLearn:document.getElementById('learn_mode_toggle').checked,
    isShuffle:document.getElementById('shuffle_toggle').checked,
    isDarkTheme:document.getElementById('theme_toggle').checked,
    isHighlight:document.getElementById('highlight_toggle').checked,
    div:division,
    lev:level,
   

  }

 // alert(JSON.stringify(togglesState))

  apply(togglesState);

  localStorage.setItem("settings", JSON.stringify(togglesState));
}

// function generateDeviceId() {
//   // generate a random string
//   return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
// }

function getCheckedTest(){

  let div, lev;  

  let radioDevs = document.querySelectorAll('input[type="radio"]');

    for (let radio of radioDevs) {
      if (radio.checked) {
        if(radio.name === "div") {
          div = radio.id;
        }
        else if (radio.name === "lev") {
          lev = radio.id;
        }
      }
	}
 

// alert(div + " -- " + lev )
  return [div, lev];

}

function createButtons(){

  let r = "5p";

  let mt =  `Микротесты ${r}`;    
 
   const buttons5 = [`База ${r}`, `Стандарт ${r}`, `Эксперт ${r}`, "Охрана труда 1", "Охрана труда 2", ];
 
   buttons5.push(mt);

  for(let i = 0; i < buttons5.length; i++){

    let btn = document.createElement('button')
    btn.innerText=buttons5[i]
    btn.className = 'test_button'
    btn.id = i
    document.querySelector('#levels').appendChild(btn)
  }
}


function getButtons(){


  
 
  // const pirolise = {

  //   b5:pir_b5,
  //   s5:pir_s5,
  //   e5:pir_e5,
  //   b6:pir_b6,
  //   s6:pir_s6,
  //   e6:pir_e6,


  // }

  // const buttons5 = {
       
  //   ot1:"Охрана труда 1",
  //   ot2:"Охрана труда 2",
  //   basa5:"База 5р",
  //   standart5:"Стандарт 5 р",
  //   expert5:"Эксперт 5р",
  //   micro5:"Микротесты 5р",

  // }

  // const buttons6 = {

  //   ot1:"Охрана труда 1",
  //   ot2:"Охрана труда 2",    
  //   basa6:"База 6р",
  //   standart6:"Стандарт 6 р",
  //   expert6:"Эксперт 6р",
  //   micro6:"Микротесты 6р",

  // }
  // const buttonsSt = {
   
  //   ot1:"Охрана труда 1",
  //   ot2:"Охрана труда 2",   
  //   basaSt:"База ст.",
  //   standart6:"Стандарт ст.",
  //   expert6:"Эксперт ст.",

  // }
 let r = "5p"

 let mt =  `Микротесты ${r}`



  //const buttonsSt = ["Охрана труда 1", "Охрана труда 2",  `База ст.`, "Стандарт ст.", "Эксперт ст.",]

  const buttons5 = ["Охрана труда 1", "Охрана труда 2", `База ${r}`, `Стандарт ${r}`, `Эксперт ${r}`]

  buttons5.push(mt)
  
  //const buttons6 = ["Охрана труда 1", "Охрана труда 2", "База 6р", "Стандарт 6р", "Эксперт 6р", "Микротесты 6р"]

  createButtons(buttons5)

}





