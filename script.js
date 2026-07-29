const eventDate=new Date("2026-08-08T14:00:00+02:00");
function updateCountdown(){const now=new Date();let diff=eventDate-now;const message=document.getElementById("countdown-message");if(diff<=0){document.getElementById("countdown").style.display="none";message.textContent="The Peace and Unity Concert is here!";return}const days=Math.floor(diff/86400000);diff%=86400000;const hours=Math.floor(diff/3600000);diff%=3600000;const minutes=Math.floor(diff/60000);const seconds=Math.floor((diff%60000)/1000);daysEl=document.getElementById("days");daysEl.textContent=String(days).padStart(2,"0");document.getElementById("hours").textContent=String(hours).padStart(2,"0");document.getElementById("minutes").textContent=String(minutes).padStart(2,"0");document.getElementById("seconds").textContent=String(seconds).padStart(2,"0")}
updateCountdown();setInterval(updateCountdown,1000);

const title="Peace and Unity Concert";
const eventText="Peace and Unity Concert — free entry, 8 August 2026 at 14:00, Show Grounds Main Arena, Lusaka.";
document.getElementById("share-button").addEventListener("click",async()=>{if(navigator.share){try{await navigator.share({title,text:eventText,url:location.href})}catch(_){}}else{window.open("https://wa.me/?text="+encodeURIComponent(eventText+" "+location.href),"_blank","noopener")}});
const calendarUrl="https://calendar.google.com/calendar/render?action=TEMPLATE&text="+encodeURIComponent(title)+"&dates=20260808T120000Z/20260808T180000Z&details="+encodeURIComponent(eventText)+"&location="+encodeURIComponent("Show Grounds Main Arena, Lusaka, Zambia");
document.getElementById("calendar-link").href=calendarUrl;

let currentTicketDataUrl="";
function makeTicketId(){const now=Date.now().toString(36).toUpperCase();const rnd=Math.random().toString(36).slice(2,7).toUpperCase();return "PU-"+now.slice(-6)+"-"+rnd}
function drawTicket(name,id){
  const c=document.getElementById("ticket-canvas"),ctx=c.getContext("2d");
  const g=ctx.createLinearGradient(0,0,c.width,c.height);g.addColorStop(0,"#101010");g.addColorStop(.55,"#2b1900");g.addColorStop(1,"#002b18");ctx.fillStyle=g;ctx.fillRect(0,0,c.width,c.height);
  ctx.strokeStyle="#f4b43a";ctx.lineWidth=6;ctx.strokeRect(28,28,c.width-56,c.height-56);
  ctx.fillStyle="#f4b43a";ctx.font="700 34px Arial";ctx.textAlign="center";ctx.fillText("EPHRAIM MUSIC PROMOTIONS PRESENTS",600,95);
  ctx.fillStyle="#fff";ctx.font="900 72px Arial";ctx.fillText("PEACE & UNITY",600,205);
  ctx.fillStyle="#f4b43a";ctx.font="italic 900 88px Arial";ctx.fillText("CONCERT",600,300);
  ctx.fillStyle="#fff";ctx.font="700 35px Arial";ctx.fillText("FREE DIGITAL TICKET",600,365);
  ctx.textAlign="left";ctx.font="700 30px Arial";ctx.fillText("NAME:",90,455);ctx.fillStyle="#f4b43a";ctx.fillText(name.toUpperCase(),245,455);
  ctx.fillStyle="#fff";ctx.fillText("DATE:",90,515);ctx.fillText("8 AUGUST 2026",245,515);
  ctx.fillText("TIME:",90,570);ctx.fillText("14:00",245,570);
  ctx.fillText("VENUE:",600,455);ctx.fillText("SHOW GROUNDS MAIN ARENA",760,455);
  ctx.fillText("TICKET:",600,515);ctx.fillStyle="#1eb35b";ctx.fillText(id,760,515);
  ctx.fillStyle="#ccc";ctx.font="24px Arial";ctx.textAlign="center";ctx.fillText("Admission is free • Keep this ticket on your phone",600,635);
  currentTicketDataUrl=c.toDataURL("image/png");
}
document.getElementById("ticket-form").addEventListener("submit",(e)=>{
  e.preventDefault();
  const name=document.getElementById("ticket-name").value.trim();
  if(!name)return;
  let id=localStorage.getItem("peaceUnityTicketId");
  if(!id){id=makeTicketId();localStorage.setItem("peaceUnityTicketId",id)}
  localStorage.setItem("peaceUnityTicketName",name);
  drawTicket(name,id);
  document.getElementById("ticket-result").hidden=false;
  document.getElementById("ticket-result").scrollIntoView({behavior:"smooth",block:"center"});
});
document.getElementById("download-ticket").addEventListener("click",()=>{
  const a=document.createElement("a");a.href=currentTicketDataUrl;a.download="peace-unity-concert-ticket.png";a.click();
});
document.getElementById("share-ticket").addEventListener("click",async()=>{
  if(!currentTicketDataUrl)return;
  const blob=await (await fetch(currentTicketDataUrl)).blob();
  const file=new File([blob],"peace-unity-concert-ticket.png",{type:"image/png"});
  if(navigator.canShare&&navigator.canShare({files:[file]})){try{await navigator.share({title:"My Peace and Unity Concert Ticket",text:eventText,files:[file]})}catch(_){}}else{document.getElementById("download-ticket").click()}
});
const savedName=localStorage.getItem("peaceUnityTicketName"),savedId=localStorage.getItem("peaceUnityTicketId");
if(savedName&&savedId){document.getElementById("ticket-name").value=savedName;drawTicket(savedName,savedId);document.getElementById("ticket-result").hidden=false}
