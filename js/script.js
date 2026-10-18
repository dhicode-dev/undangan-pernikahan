const $=s=>document.querySelector(s);
const toast=t=>{const e=$('#toast');e.textContent=t;e.classList.add('on');setTimeout(()=>e.classList.remove('on'),1800)};

// Nama tamu dari ?to=
const to=new URLSearchParams(location.search).get('to');
if(to)$('#guest').textContent=to;
document.body.style.overflow='hidden';

// Musik latar (mulai saat Buka Undangan diklik)
const bgm=$('#bgm'),mb=$('#music');
const setMusic=on=>{mb.classList.toggle('play',on);mb.classList.toggle('off',!on)};
bgm.addEventListener('error',()=>{mb.hidden=true});
$('#openBtn').onclick=()=>{
  $('#cover').classList.add('open');document.body.style.overflow='';scrollTo(0,0);
  mb.hidden=false;bgm.play().then(()=>setMusic(true)).catch(()=>setMusic(false));
};
mb.onclick=()=>{if(bgm.paused){bgm.play();setMusic(true)}else{bgm.pause();setMusic(false)}};

// Hitung mundur — ubah tanggal di sini
const target=new Date('2026-12-20T08:00:00+07:00');
function tick(){const d=Math.max(0,target-Date.now())/1000;
$('#cd').innerHTML=[['Hari',d/86400],['Jam',d%86400/3600],['Menit',d%3600/60],['Detik',d%60]]
.map(([l,n])=>`<div><b>${Math.floor(n)}</b><small>${l}</small></div>`).join('')}
tick();setInterval(tick,1000);
$('#cal').href='https://calendar.google.com/calendar/render?action=TEMPLATE&text='+encodeURIComponent('Pernikahan Helena & Awal')+'&dates=20261220T010000Z/20261220T070000Z&location='+encodeURIComponent('Jakarta Selatan');

// Animasi muncul saat scroll
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.15});
document.querySelectorAll('.rv').forEach((el,i)=>{el.style.transitionDelay=(i%4)*80+'ms';io.observe(el)});

// Salin rekening
document.querySelectorAll('[data-copy]').forEach(b=>b.onclick=async()=>{
  try{await navigator.clipboard.writeText(b.dataset.copy);toast('Nomor disalin')}catch(e){toast('Salin manual: '+b.dataset.copy)}});

// Lightbox galeri
const lb=$('#lb');
document.querySelectorAll('.gal img').forEach(im=>im.onclick=()=>{
  lb.querySelector('img').src=im.src;lb.hidden=false});
lb.onclick=()=>lb.hidden=true;

// Ucapan (tersimpan di browser pengunjung)
let msgs=[];try{msgs=JSON.parse(localStorage.getItem('ucapan')||'[]')}catch(e){}
const esc=s=>s.replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const draw=()=>$('#list').innerHTML=msgs.map(m=>`<div class="msg"><b>${esc(m.n)}</b> <small>· ${esc(m.s)}</small><p>${esc(m.t)}</p></div>`).join('');
draw();
$('#rsvp').onsubmit=e=>{e.preventDefault();
  msgs.unshift({n:$('#nm').value.trim(),s:$('#st').value,t:$('#tx').value.trim()});
  try{localStorage.setItem('ucapan',JSON.stringify(msgs))}catch(e){}
  e.target.reset();draw();toast('Terima kasih, konfirmasi terkirim')};
