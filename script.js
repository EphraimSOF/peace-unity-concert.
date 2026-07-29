const eventDate=new Date("2026-08-08T14:00:00+02:00");
function updateCountdown(){const now=new Date();let diff=eventDate-now;const message=document.getElementById("countdown-message");if(diff<=0){document.getElementById("countdown").style.display="none";message.textContent="The Peace and Unity Concert is here!";return}const days=Math.floor(diff/86400000);diff%=86400000;const hours=Math.floor(diff/3600000);diff%=3600000;const minutes=Math.floor(diff/60000);const seconds=Math.floor((diff%60000)/1000);daysEl=document.getElementById("days");daysEl.textContent=String(days).padStart(2,"0");document.getElementById("hours").textContent=String(hours).padStart(2,"0");document.getElementById("minutes").textContent=String(minutes).padStart(2,"0");document.getElementById("seconds").textContent=String(seconds).padStart(2,"0")}
updateCountdown();setInterval(updateCountdown,1000);

const title="Peace and Unity Concert";
const eventText="Peace and Unity Concert — free entry, 8 August 2026 at 14:00, Show Grounds Main Arena, Lusaka.";
document.getElementById("share-button").addEventListener("click",async()=>{if(navigator.share){try{await navigator.share({title,text:eventText,url:location.href})}catch(_){}}else{window.open("https://wa.me/?text="+encodeURIComponent(eventText+" "+location.href),"_blank","noopener")}});
const calendarUrl="https://calendar.google.com/calendar/render?action=TEMPLATE&text="+encodeURIComponent(title)+"&dates=20260808T120000Z/20260808T180000Z&details="+encodeURIComponent(eventText)+"&location="+encodeURIComponent("Show Grounds Main Arena, Lusaka, Zambia");
document.getElementById("calendar-link").href=calendarUrl;


let currentTicketDataUrl="";

function fitText(ctx,text,maxWidth,startSize,minSize){
  let size=startSize;
  while(size>minSize){
    ctx.font=`900 ${size}px Arial`;
    if(ctx.measureText(text).width<=maxWidth) return size;
    size-=2;
  }
  return minSize;
}

function drawTicket(name){
  const c=document.getElementById("ticket-canvas");
  c.width=1080;
  c.height=1920;
  const ctx=c.getContext("2d");
  const poster=new Image();
  poster.src="concert-poster.png";

  poster.onload=()=>{
    // Poster background, cropped to a tall official-ticket format.
    const scale=Math.max(c.width/poster.width,c.height/poster.height);
    const sw=c.width/scale, sh=c.height/scale;
    const sx=(poster.width-sw)/2, sy=(poster.height-sh)/2;
    ctx.drawImage(poster,sx,sy,sw,sh,0,0,c.width,c.height);

    // Dark overlays keep all ticket details readable while preserving the poster look.
    const topFade=ctx.createLinearGradient(0,0,0,700);
    topFade.addColorStop(0,"rgba(0,0,0,.70)");
    topFade.addColorStop(1,"rgba(0,0,0,.05)");
    ctx.fillStyle=topFade;
    ctx.fillRect(0,0,c.width,760);

    const bottomFade=ctx.createLinearGradient(0,1050,0,1920);
    bottomFade.addColorStop(0,"rgba(0,0,0,.10)");
    bottomFade.addColorStop(.35,"rgba(0,0,0,.78)");
    bottomFade.addColorStop(1,"rgba(0,0,0,.95)");
    ctx.fillStyle=bottomFade;
    ctx.fillRect(0,1000,c.width,920);

    // Decorative border.
    ctx.strokeStyle="#f7b83e";
    ctx.lineWidth=12;
    ctx.strokeRect(34,34,c.width-68,c.height-68);
    ctx.strokeStyle="rgba(255,255,255,.72)";
    ctx.lineWidth=3;
    ctx.strokeRect(54,54,c.width-108,c.height-108);

    ctx.textAlign="center";
    ctx.fillStyle="#f7b83e";
    ctx.font="700 34px Arial";
    ctx.fillText("EPHRAIM MUSIC PROMOTIONS PRESENTS",540,120);

    ctx.fillStyle="#fff";
    ctx.font="900 92px Arial";
    ctx.shadowColor="rgba(0,0,0,.9)";
    ctx.shadowBlur=22;
    ctx.fillText("PEACE & UNITY",540,235);

    ctx.fillStyle="#f7b83e";
    ctx.font="italic 900 112px Arial";
    ctx.fillText("CONCERT",540,355);
    ctx.shadowBlur=0;

    // Official-ticket ribbon.
    ctx.fillStyle="rgba(0,0,0,.76)";
    ctx.fillRect(110,430,860,105);
    ctx.strokeStyle="#f7b83e";
    ctx.lineWidth=4;
    ctx.strokeRect(110,430,860,105);
    ctx.fillStyle="#fff";
    ctx.font="800 44px Arial";
    ctx.fillText("OFFICIAL FREE DIGITAL TICKET",540,500);

    // Attendee panel.
    ctx.fillStyle="rgba(8,8,8,.84)";
    ctx.beginPath();
    ctx.roundRect(88,1250,904,500,34);
    ctx.fill();
    ctx.strokeStyle="rgba(247,184,62,.9)";
    ctx.lineWidth=5;
    ctx.stroke();

    ctx.fillStyle="#f7b83e";
    ctx.font="700 28px Arial";
    ctx.fillText("ADMIT ONE • FREE ENTRY",540,1325);

    ctx.fillStyle="#fff";
    const displayName=name.trim().toUpperCase();
    const nameSize=fitText(ctx,displayName,790,74,36);
    ctx.font=`900 ${nameSize}px Arial`;
    ctx.fillText(displayName,540,1420);

    ctx.strokeStyle="rgba(255,255,255,.35)";
    ctx.lineWidth=2;
    ctx.beginPath();
    ctx.moveTo(170,1460); ctx.lineTo(910,1460); ctx.stroke();

    ctx.textAlign="left";
    ctx.fillStyle="#f7b83e";
    ctx.font="800 28px Arial";
    ctx.fillText("DATE",160,1535);
    ctx.fillText("TIME",160,1610);
    ctx.fillText("VENUE",160,1685);

    ctx.fillStyle="#fff";
    ctx.font="700 30px Arial";
    ctx.fillText("8 AUGUST 2026",350,1535);
    ctx.fillText("14:00 HRS",350,1610);
    ctx.fillText("MAIN ARENA, SHOWGROUNDS",350,1685);

    // Bottom message.
    ctx.textAlign="center";
    ctx.fillStyle="#1fc46b";
    ctx.font="800 30px Arial";
    ctx.fillText("ZAMBIA — A LOVING, PEACEFUL NATION",540,1810);
    ctx.fillStyle="#ddd";
    ctx.font="24px Arial";
    ctx.fillText("Come, let us worship and dance",540,1860);

    currentTicketDataUrl=c.toDataURL("image/png");
  };
}

document.getElementById("ticket-form").addEventListener("submit",(e)=>{
  e.preventDefault();
  const name=document.getElementById("ticket-name").value.trim();
  if(!name)return;
  localStorage.setItem("peaceUnityTicketName",name);
  drawTicket(name);
  document.getElementById("ticket-result").hidden=false;
  setTimeout(()=>document.getElementById("ticket-result").scrollIntoView({behavior:"smooth",block:"start"}),150);
});

document.getElementById("download-ticket").addEventListener("click",()=>{
  if(!currentTicketDataUrl)return;
  const a=document.createElement("a");
  a.href=currentTicketDataUrl;
  a.download="peace-unity-concert-official-ticket.png";
  document.body.appendChild(a);
  a.click();
  a.remove();
});

document.getElementById("share-ticket").addEventListener("click",async()=>{
  if(!currentTicketDataUrl)return;
  const blob=await (await fetch(currentTicketDataUrl)).blob();
  const file=new File([blob],"peace-unity-concert-official-ticket.png",{type:"image/png"});
  if(navigator.canShare && navigator.canShare({files:[file]})){
    try{
      await navigator.share({
        title:"Peace and Unity Concert Ticket",
        text:"My free ticket for the Peace and Unity Concert — 8 August 2026.",
        files:[file]
      });
    }catch(_){}
  }else{
    const a=document.createElement("a");
    a.href=currentTicketDataUrl;
    a.download="peace-unity-concert-official-ticket.png";
    a.click();
  }
});

const savedName=localStorage.getItem("peaceUnityTicketName");
if(savedName){
  document.getElementById("ticket-name").value=savedName;
  drawTicket(savedName);
  document.getElementById("ticket-result").hidden=false;
}
