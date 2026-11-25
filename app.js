'use strict';

const colors = {
  pine: { name: 'Pine', hex: '#34524a', ink: '#eee0b9' },
  natural: { name: 'Natural', hex: '#e6dcc8', ink: '#275047' },
  navy: { name: 'Lake navy', hex: '#334b5c', ink: '#e6c395' },
  clay: { name: 'Clay', hex: '#b9785b', ink: '#f4e5c5' },
  mist: { name: 'Mist', hex: '#a6babc', ink: '#244b45' },
  oatmeal: { name: 'Oatmeal', hex: '#d6ccba', ink: '#314c43' }
};
const products = [
  { id:'cove-club', name:'The Cove Club Tee', category:'tees', type:'Graphic tee', shape:'tee', art:'cove', tag:'The lake uniform', description:'A little cove-club energy. No membership required.', detail:'A sun-faded lake graphic, a familiar shoreline, and a reminder to take the long way back. This original design puts the lake state of mind front and center.', colors:['natural','pine','clay'] },
  { id:'last-light', name:'The Last Light Tee', category:'tees', type:'Graphic tee', shape:'tee', art:'sunset', tag:'One more sunset', description:'For the days you wish would last a little longer.', detail:'Inspired by the last warm light on the water. A bold, retro sun-and-waves graphic in a mellow palette, made for a future everyday favorite.', colors:['navy','natural','pine'] },
  { id:'dockside', name:'The Dockside Cap', category:'hats', type:'Cap concept', shape:'cap', art:'badge', tag:'Dock to downtown', description:'Lake state. Anywhere you go.', detail:'An understated LOTO Life badge on a classic cap silhouette. A low-key design direction for dock mornings and days away from the water.', colors:['oatmeal','pine','navy'] },
  { id:'cove-crew', name:'The Afterglow Crew', category:'layers', type:'Crewneck concept', shape:'crew', art:'wordmark', tag:'After the sun goes down', description:'The lake-day feeling doesn’t end at sunset.', detail:'A simple, collegiate-inspired LOTO Life wordmark. We’re exploring a relaxed crewneck direction for cool mornings and the ride back to the dock.', colors:['oatmeal','navy','pine'] },
  { id:'long-way-home', name:'The Long Way Home', category:'layers', type:'Long-sleeve concept', shape:'longsleeve', art:'cove', tag:'Take the scenic route', description:'A graphic for the one-more-cove crowd.', detail:'The Cove Club graphic, imagined on a long-sleeve silhouette. An easy layer concept that carries the lake-day spirit into the rest of the week.', colors:['mist','natural','navy'] },
  { id:'shore-leave', name:'The Shore Leave Cap', category:'hats', type:'Cap concept', shape:'cap', art:'sunset', tag:'Off the clock', description:'Less hurry. More lake.', detail:'A warm sunset patch and a decidedly off-duty mood. This cap concept pairs our original sun-and-water artwork with a simple everyday shape.', colors:['pine','clay','oatmeal'] }
];
const productById = new Map(products.map(p => [p.id,p]));
const storageKey = 'lotolife.favorites.v1';
let storageAvailable = true;
let favorites = new Set();
try {
  const stored = JSON.parse(localStorage.getItem(storageKey) || '[]');
  if (Array.isArray(stored)) favorites = new Set(stored.filter(id => productById.has(id)));
} catch { storageAvailable = false; }
let currentFilter = 'all';
let searchTerm = '';
let selectedProduct = null;
let selectedColor = null;
let selectedSize = 'M';
let dialogView = null;
let artworkSerial = 0;
let returnFocus = null;
const grid = document.querySelector('#product-grid');
const dialog = document.querySelector('#preview-dialog');
const dialogContent = document.querySelector('#dialog-content');
const statusRegion = document.querySelector('#site-status');
const heart = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z"/></svg>';

function graphic(p,ink) {
  if (p.art === 'cove') return `<g fill="none" stroke="${ink}" stroke-width="2"><path d="M165 210a85 85 0 0 1 170 0v83H165Z"/><circle cx="250" cy="192" r="29" fill="${ink}" stroke="none"/><path d="m172 226 35-21 30 18 29-18 60 26M175 243q19-10 38 0t38 0t38 0t38 0m-152 15q19-10 38 0t38 0t38 0t38 0m-152 15q19-10 38 0t38 0t38 0t38 0"/></g><g fill="${ink}" font-family="Arial,sans-serif" text-anchor="middle"><text x="250" y="318" font-size="27" font-weight="900" letter-spacing="2">COVE CLUB</text><text x="250" y="336" font-size="9" letter-spacing="3">LOTO LIFE · MISSOURI</text></g>`;
  if (p.art === 'sunset') return `<g fill="none" stroke="${ink}" stroke-width="3"><circle cx="250" cy="220" r="67"/><path d="M190 206h120m-125 13h130m-127 13h124m-118 13h112m-102 13h92m-80 13h68"/></g><g fill="${ink}" font-family="Arial,sans-serif" text-anchor="middle"><text x="250" y="194" font-size="20" font-weight="900">LOTO LIFE</text><text x="250" y="317" font-size="10" letter-spacing="3">CHASE THE LAST LIGHT</text></g>`;
  if (p.art === 'wordmark') return `<g fill="${ink}" font-family="Arial,sans-serif" text-anchor="middle"><text x="250" y="225" font-size="43" font-weight="900" letter-spacing="2">LOTO LIFE</text><path d="M185 247q16-16 32 0t32 0t32 0t32 0" fill="none" stroke="${ink}" stroke-width="3"/><text x="250" y="277" font-size="10" letter-spacing="3">A LAKE STATE OF MIND</text></g>`;
  return `<g stroke="${ink}" fill="none" stroke-width="2"><rect x="180" y="183" width="140" height="96" rx="7"/><path d="M205 245q15-15 30 0t30 0t30 0"/></g><g fill="${ink}" font-family="Arial,sans-serif" text-anchor="middle"><text x="250" y="222" font-size="21" font-weight="900">LOTO LIFE</text><text x="250" y="265" font-size="8" letter-spacing="2">LESS HURRY. MORE LAKE.</text></g>`;
}
function artwork(p,colorKey=p.colors[0]) {
  const c = colors[colorKey];
  const id = 'fabric-' + (++artworkSerial);
  let shape;
  if (p.shape === 'cap') {
    shape = `<ellipse cx="250" cy="362" rx="148" ry="17" fill="#153c2f" opacity=".11"/><path d="M122 285c-2-96 46-153 129-153 88 0 139 62 129 157Z" fill="url(#${id})" stroke="#18332722" stroke-width="2"/><path d="M128 287c60-26 152-34 244-1 28 9 44 24 20 35-99 44-207 43-279 16-45-18-25-32 15-50Z" fill="${c.hex}" stroke="#18332733" stroke-width="2"/><path d="M251 136c-18 39-19 94-16 134m-76-100q-24 42-23 107m191-105q32 40 35 103" stroke="#ffffff29" stroke-width="2" fill="none"/><ellipse cx="250" cy="135" rx="10" ry="5" fill="${c.hex}"/><g transform="translate(94 98) scale(.62)">${graphic(p,c.ink)}</g>`;
  } else {
    const tee = 'M182 105 126 126 77 203 132 237 159 199 150 386Q250 403 350 386L341 199 368 237 423 203 374 126 318 105Q250 145 182 105Z';
    const long = 'M182 105 126 126 60 347 112 363 159 211 150 386Q250 403 350 386L341 211 388 363 440 347 374 126 318 105Q250 145 182 105Z';
    shape = `<ellipse cx="250" cy="412" rx="119" ry="13" fill="#153c2f" opacity=".09"/><path d="${p.shape==='tee'?tee:long}" fill="url(#${id})" stroke="#18332722" stroke-width="1.5"/><path d="M183 106q67 61 134 0" fill="none" stroke="#00000020" stroke-width="11"/><path d="M184 104q66 56 132 0" fill="none" stroke="${c.hex}" stroke-width="8"/><path d="M164 160q-17 91-7 208m179-208q17 91 7 208M155 378q95 15 190 0" fill="none" stroke="#0000000c" stroke-width="2"/>${p.shape==='crew'?`<path d="M151 377q99 15 198 0l1 15q-100 18-200 0Z" fill="${c.hex}" stroke="#0001"/>`:''}${graphic(p,c.ink)}`;
  }
  return `<svg viewBox="0 0 500 470" role="img" aria-label="Illustrative ${p.name} mockup in ${c.name}" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2=".3"><stop stop-color="${c.hex}"/><stop offset=".45" stop-color="${c.hex}"/><stop offset=".55" stop-color="${c.hex}"/><stop offset="1" stop-color="${c.hex}"/></linearGradient></defs>${shape}</svg>`;
}
function renderGrid() {
  const visible = products.filter(p => (currentFilter==='all'||p.category===currentFilter) && `${p.name} ${p.description} ${p.type}`.toLowerCase().includes(searchTerm));
  document.querySelector('#results-count').textContent = `${visible.length} ${visible.length===1?'concept':'concepts'} to explore`;
  grid.innerHTML = visible.length ? visible.map(p => `<article class="product-card"><div class="product-art-wrap"><button type="button" class="product-view" data-open="${p.id}" aria-label="Preview ${p.name}">${artwork(p)}</button><span class="card-tag">${p.tag}</span><button type="button" class="card-save" data-save="${p.id}" aria-pressed="${favorites.has(p.id)}" aria-label="${favorites.has(p.id)?'Unsave':'Save'} ${p.name}">${heart}</button><span class="mockup-label">Concept mockup</span><span class="view-label">Take a closer look</span></div><div class="product-info"><div class="product-name-row"><button type="button" class="product-title" data-open="${p.id}">${p.name}</button><span class="product-kind">${p.type}</span></div><p class="product-description">${p.description}</p><div class="product-meta"><div class="swatches" aria-label="Concept colors: ${p.colors.map(c=>colors[c].name).join(', ')}">${p.colors.map(c=>`<span class="swatch" style="--swatch:${colors[c].hex}" aria-hidden="true"></span>`).join('')}</div><span class="preview-price">In development</span></div></div></article>`).join('') : '<div class="empty-state"><h3>Nothing in this cove.</h3><p>Try another search or explore the whole collection.</p><button type="button" data-reset>Show all concepts</button></div>';
}
function persistFavorites() {
  try { localStorage.setItem(storageKey,JSON.stringify([...favorites])); storageAvailable = true; }
  catch { storageAvailable = false; }
}
function updateSaveButtons() {
  document.querySelector('#saved-count').textContent = favorites.size;
  document.querySelector('#open-saved').setAttribute('aria-label',`View saved concepts, ${favorites.size} saved`);
  document.querySelectorAll('[data-save]').forEach(button => {
    const p = productById.get(button.dataset.save);
    const saved = favorites.has(p.id);
    button.setAttribute('aria-pressed',String(saved));
    button.setAttribute('aria-label',`${saved?'Unsave':'Save'} ${p.name}`);
    if (button.classList.contains('detail-save')) button.textContent = saved ? 'Saved to your lake-day list' : 'Save this concept';
  });
}
function toggleFavorite(id) {
  if (!productById.has(id)) return;
  const added = !favorites.has(id);
  if (added) favorites.add(id); else favorites.delete(id);
  persistFavorites();
  updateSaveButtons();
  statusRegion.textContent = `${productById.get(id).name} ${added?'saved':'removed'}.${storageAvailable?'':' Saved for this visit only; browser storage is unavailable.'}`;
  if (dialogView==='saved') {
    renderSaved();
    (dialogContent.querySelector('.remove-saved') || dialog.querySelector('.dialog-close')).focus();
  }
  const storageNote = document.querySelector('#storage-note');
  if (storageNote) storageNote.textContent = storageAvailable ? 'Your favorites stay in this browser. No account needed.' : 'Browser storage is unavailable. Favorites will last for this visit only.';
}
function showDialog(view) {
  dialogView = view;
  if (!dialog.open) {
    returnFocus = document.activeElement;
    dialog.showModal();
    document.body.classList.add('dialog-open');
  }
  dialog.scrollTop = 0;
  dialog.querySelector('.dialog-close').focus({preventScroll:true});
}
function openProduct(id) {
  const p = productById.get(id);
  if (!p) return;
  selectedProduct = p;
  selectedColor = p.colors[0];
  selectedSize = 'M';
  dialogContent.innerHTML = `<article class="product-detail"><div class="detail-art"><div id="detail-artwork">${artwork(p)}</div><span class="mockup-label">Illustrative concept · not a product photograph</span></div><div class="detail-copy"><p class="eyebrow">${p.type} · Collection preview</p><h2 id="dialog-title">${p.name}</h2><p class="detail-desc">${p.detail}</p><fieldset class="variant-fieldset"><legend>Explore a color</legend><div class="variant-options">${p.colors.map((c,i)=>`<label class="variant-option color-option"><input type="radio" name="concept-color" value="${c}" ${i===0?'checked':''}><span><i style="--swatch:${colors[c].hex}" aria-hidden="true"></i>${colors[c].name}</span></label>`).join('')}</div></fieldset>${p.shape==='cap'?'<p class="detail-note">Fit and sizing to be confirmed after sampling.</p>':`<fieldset class="variant-fieldset"><legend>Concept size options</legend><div class="variant-options">${['S','M','L','XL','2XL'].map(s=>`<label class="variant-option"><input type="radio" name="concept-size" value="${s}" ${s==='M'?'checked':''}><span>${s}</span></label>`).join('')}</div></fieldset>`}<button type="button" class="button button-forest detail-save" data-save="${p.id}" aria-pressed="${favorites.has(p.id)}">${favorites.has(p.id)?'Saved to your lake-day list':'Save this concept'}</button><p class="detail-note">Preview only. Final garment, colors, sizing, pricing, and availability will be confirmed before ordering opens. Favorites save the design, not a size or color reservation.</p><p class="detail-note" id="storage-note">${storageAvailable?'Your favorites stay in this browser. No account needed.':'Browser storage is unavailable. Favorites last for this visit only.'}</p></div></article>`;
  showDialog('product');
}
function renderSaved() {
  const saved = products.filter(p=>favorites.has(p.id));
  dialogContent.innerHTML = `<div class="saved-dialog"><p class="eyebrow">Your lake-day list</p><h2 id="dialog-title">A few good favorites.</h2><p class="saved-explainer">${storageAvailable?'Saved on this device, in this browser. No account, email address, or payment details needed.':'Favorites are available for this visit only because browser storage is unavailable.'} These are collection concepts, not an order or reservation.</p>${saved.length?`<div class="saved-list">${saved.map(p=>`<article class="saved-row"><button type="button" class="saved-row-art" data-open="${p.id}" aria-label="Preview ${p.name}">${artwork(p)}</button><div><button type="button" class="saved-row-title" data-open="${p.id}">${p.name}</button><p>${p.type} · In development</p></div><button type="button" class="remove-saved" data-save="${p.id}" aria-label="Remove ${p.name} from favorites">Remove</button></article>`).join('')}</div>`:'<div class="empty-state"><h3>Your list is taking a little shore leave.</h3><p>Tap a heart in the collection to save a design you like.</p><button type="button" data-browse>Explore the concepts</button></div>'}</div>`;
}
function closeDialog() { dialog.close(); }
dialog.querySelector('.dialog-close').addEventListener('click',closeDialog);
dialog.addEventListener('close',()=>{
  document.body.classList.remove('dialog-open');
  dialogView = null;
  if (returnFocus?.isConnected) returnFocus.focus({preventScroll:true});
});
dialog.addEventListener('click',event=>{
  if (event.target===dialog) {
    const rect=dialog.getBoundingClientRect();
    if (event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom) closeDialog();
  }
});
document.addEventListener('click',event=>{
  const open=event.target.closest('[data-open]');
  const save=event.target.closest('[data-save]');
  if(open) openProduct(open.dataset.open);
  else if(save) toggleFavorite(save.dataset.save);
  else if(event.target.closest('[data-reset]')) resetFilters();
  else if(event.target.closest('[data-browse]')) { closeDialog(); document.querySelector('#collection').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'}); }
});
dialogContent.addEventListener('change',event=>{
  if(event.target.name==='concept-color' && selectedProduct?.colors.includes(event.target.value)) {
    selectedColor=event.target.value;
    document.querySelector('#detail-artwork').innerHTML=artwork(selectedProduct,selectedColor);
    statusRegion.textContent=`${selectedProduct.name} preview in ${colors[selectedColor].name}.`;
  }
  if(event.target.name==='concept-size') selectedSize=event.target.value;
});
function setFilter(filter) {
  currentFilter=filter;
  document.querySelectorAll('[data-filter]').forEach(button=>{
    const active=button.dataset.filter===filter;
    button.classList.toggle('active',active);
    button.setAttribute('aria-pressed',String(active));
  });
  renderGrid();
}
function resetFilters() {
  searchTerm='';
  document.querySelector('#collection-search').value='';
  setFilter('all');
}
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>setFilter(button.dataset.filter)));
document.querySelector('#collection-search').addEventListener('input',event=>{searchTerm=event.target.value.trim().toLowerCase();renderGrid();});
document.querySelector('#open-saved').addEventListener('click',()=>{renderSaved();showDialog('saved');});
const menuButton=document.querySelector('#menu-toggle');
const navigation=document.querySelector('#main-nav');
function closeMenu(){navigation.classList.remove('open');menuButton.setAttribute('aria-expanded','false');menuButton.setAttribute('aria-label','Open navigation');}
menuButton.addEventListener('click',()=>{const open=menuButton.getAttribute('aria-expanded')!=='true';navigation.classList.toggle('open',open);menuButton.setAttribute('aria-expanded',String(open));menuButton.setAttribute('aria-label',open?'Close navigation':'Open navigation');});
navigation.addEventListener('click',event=>{if(event.target.closest('a'))closeMenu();});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&navigation.classList.contains('open')){closeMenu();menuButton.focus();}});
window.addEventListener('storage',event=>{
  if(event.key!==storageKey&&event.key!==null)return;
  try { const stored=JSON.parse(localStorage.getItem(storageKey)||'[]'); favorites=new Set(Array.isArray(stored)?stored.filter(id=>productById.has(id)):[]); updateSaveButtons(); if(dialogView==='saved')renderSaved(); } catch { /* Keep the current visit's shortlist. */ }
});
renderGrid();
updateSaveButtons();
