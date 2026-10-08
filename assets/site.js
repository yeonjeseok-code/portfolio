const filters=document.querySelectorAll('[data-filter]');
filters.forEach(button=>button.addEventListener('click',()=>{filters.forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',String(b===button))});document.querySelectorAll('[data-category]').forEach(card=>{card.hidden=button.dataset.filter!=='all'&&card.dataset.category!==button.dataset.filter})}));
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
if(!reduced&&'IntersectionObserver'in window){const reveal=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');reveal.unobserve(entry.target)}}),{threshold:.04});document.querySelectorAll('.wrap>section,.contact').forEach(el=>{el.classList.add('reveal');reveal.observe(el)})}
const progress=document.createElement('div');progress.className='progress';progress.setAttribute('aria-hidden','true');document.body.append(progress);
function updateProgress(){const height=document.documentElement.scrollHeight-innerHeight;progress.style.width=(height>0?scrollY/height*100:0)+'%'}
addEventListener('scroll',updateProgress,{passive:true});addEventListener('resize',updateProgress);updateProgress();
const sections=[...document.querySelectorAll('.case-section')],anchors=[...document.querySelectorAll('.case-index a')];
if(sections.length){function activeSection(){let active=sections[0].id;for(const section of sections){if(section.getBoundingClientRect().top<=190)active=section.id}anchors.forEach(a=>{const current=a.hash==='#'+active;a.classList.toggle('current',current);if(current)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current')})}addEventListener('scroll',activeSection,{passive:true});activeSection()}
const dialog=document.querySelector('.image-dialog');
if(dialog){const full=dialog.querySelector('img');document.querySelectorAll('img.zoomable').forEach(img=>{const button=document.createElement('button');button.className='image-trigger';button.style.cssText='display:block;border:0;padding:0;background:none;cursor:zoom-in;width:100%';button.setAttribute('aria-label',(img.alt||'이미지')+' 확대');img.before(button);button.append(img);button.addEventListener('click',()=>{full.src=img.src;full.alt=img.alt;dialog.showModal()})});dialog.querySelector('button').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()})}
// Reveal individual editorial elements rather than hiding whole sections.
document.querySelectorAll('.reveal').forEach(el=>el.classList.remove('reveal'));
if(!reduced&&'IntersectionObserver' in window){
 const staged=[...document.querySelectorAll('.sectionhead,.feature-story,.insight-story,.workcard,.approach article,.lab-grid>*,.careerrow,.case-section')];
 const stageObserver=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in-view');stageObserver.unobserve(e.target)}}),{threshold:.08,rootMargin:'30px 0px 30px 0px'});
 staged.forEach((el,i)=>{el.classList.add('scroll-stage');el.style.setProperty('--reveal-delay',el.matches('.workcard,.insight-story,.approach article')?(i%2)*100+'ms':'0ms');stageObserver.observe(el)});
 let ticking=false;
 const paint=()=>{const hero=document.querySelector('.editorial-hero');if(hero&&innerWidth>650){const rect=hero.getBoundingClientRect(),progress=Math.min(1,Math.max(0,-rect.top/(rect.height*.8)));const copy=hero.querySelector('.hero-copy'),art=hero.querySelector('.hero-art');copy.style.transform=`translateY(${progress*32}px)`;copy.style.opacity=String(1-progress*.65);art.style.transform=`translateY(${progress*65}px)`;art.style.opacity=String(1-progress*.65)}ticking=false};
 addEventListener('scroll',()=>{if(!ticking){requestAnimationFrame(paint);ticking=true}},{passive:true});paint();
}

// Align each table-of-contents target heading below the fixed header.
anchors.forEach(a=>a.addEventListener('click',e=>{const section=document.getElementById(a.hash.slice(1));if(!section)return;e.preventDefault();const heading=section.querySelector('.chapter')||section;const header=document.querySelector('header');const offset=(header?header.getBoundingClientRect().height:80)+28;const y=heading.getBoundingClientRect().top+scrollY-offset;history.replaceState(null,'',a.hash);window.scrollTo({top:y,behavior:reduced?'instant':'smooth'});}));
