const wrapper =document.querySelector(".Player-items");
musicImg = wrapper.querySelector('.Artist img');
musicName = wrapper.querySelector('.Artist h6');
musicAud = document.querySelector('#main-audio')
playPause = wrapper.querySelector('.Play-pause')
pause = wrapper.querySelector('.fa-pause-circle');
play = wrapper.querySelector('.fa-play-circle')
nextAud = wrapper.querySelector('.fa-arrow-alt-circle-right')
preAud =wrapper.querySelector('.fa-arrow-alt-circle-left')
progresBar = document.querySelector('.progress-bar') 
progArea = document.querySelector('.progress-area')
let musicIndex = 3;
console.log(allmusic.length);
window.addEventListener('load',()=>{
    loadMusic(musicIndex);
});


function loadMusic(index){
    musicImg.src = `D:/Wynk/Photos/Songsimg/${allmusic[index-1].img}.webp`; 
    musicName.innerText  = allmusic[index-1].name;
    musicAud.src = `D:/Wynk/Songs/${allmusic[index-1].song}.mp3`
}
//play music 
function playMusic (){
  wrapper.classList.add('paused');
  play.style.display='none'
  pause.style.display='block'
  musicAud.play();
};
//pause Music 
function pauseMusic(){
    wrapper.classList.remove('paused');
    pause.style.display='none'
    play.style.display='block'
    musicAud.pause();
 }
// play Pause Event
playPause.addEventListener('click',()=>{
 const isMusPaused = wrapper.classList.contains('paused');
 if (isMusPaused===true) pauseMusic()
 else playMusic();
});

// Next Music
function next(){
 musicIndex++;
 if (musicIndex > allmusic.length) musicIndex = 1; 
 loadMusic(musicIndex);
 playMusic();
}
function pre(){
musicIndex--;
if (musicIndex < 1) musicIndex = allmusic.length
 loadMusic(musicIndex);
 playMusic();
}
// Progress bar Events
musicAud.addEventListener('timeupdate',(e)=>{
   let current = e.target.currentTime;
   let duration = e.target.duration;
   let progWidth = (current/duration)*100;
   progresBar.style.width=`${progWidth}%`
   
   let curTim = wrapper.querySelector('#current');
   let totDur =wrapper.querySelector('#duration')
   
   musicAud.addEventListener('loadeddata',()=>{
       audDur = musicAud.duration;
       let totalMin = Math.floor(audDur/60);
       let totalSec = Math.floor(audDur%60);
       if(totalSec<10) totalSec =`0${totalSec}`
       totDur.innerText= `${totalMin}:${totalSec}`;
    });
    let curMin = Math.floor(current/60);
    let curSec = Math.floor(current%60);
    if(curSec<10) curSec =`0${curSec}`
    curTim.innerText=`${curMin}:${curSec}/`    
})

progArea.addEventListener('click',(e)=>{
   let progWidth =progArea.clientWidth;
   clickOffset = e.offsetX
   let songDur = musicAud.duration;
   musicAud.currentTime = (clickOffset/progWidth) * songDur;
});
//Reapet 
let reapet = wrapper.querySelector('.fa-circle-notch');
reapet.addEventListener('click',()=>{
    reapet.classList.toggle('repCol')
    loadMusic(musicIndex);
    playMusic();
}) ;
nextAud.addEventListener('click',()=>{next();} )
preAud.addEventListener('click',()=>{pre();})