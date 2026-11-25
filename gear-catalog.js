'use strict';

// Public catalog previews only. Never add private supplier costs to this file.
(() => {
  const catalog = [
    {id:'ao-canvas-24',brand:'AO Coolers',group:'ao',name:'Expedition Canvas 24 Can Cooler',kind:'cooler',accent:'#49646a',tag:'The everyday lake cooler',description:'A soft-sided classic for a day on the dock or an afternoon on the water.',specs:['24-can capacity, plus ice.','Canvas series; color selection to be confirmed.'],options:'We’re finalizing colors and LOTO Life branding options.',source:'https://aocoolers.com/collections/24-can-coolers'},
    {id:'ao-carbon-24',brand:'AO Coolers',group:'ao',name:'Expedition Carbon 24 Can Cooler',kind:'cooler',accent:'#5c6267',tag:'A little more polished',description:'Carbon-look vinyl and a compact soft-sided shape for your boat-day essentials.',specs:['24 cans plus 14 lb of ice, per manufacturer.','Exterior dimensions: 17 × 10 × 12 inches.','Removable shoulder strap.'],options:'Black and silver are under consideration. Final colors and embroidery options are pending.',source:'https://aocoolers.com/collections/coolers/products/carbon-cooler-24-pack'},
    {id:'ao-stow-38',brand:'AO Coolers',group:'ao',name:'Stow-N-Go Canvas 38 Can Cooler',kind:'low-cooler',accent:'#344941',tag:'Made for the boat',description:'A low-profile cooler to make the most of those shallower storage spaces.',specs:['38 cans plus 20 lb of ice, per manufacturer.','Exterior dimensions: 23 × 15 × 8.5 inches.','Measure your storage space before choosing a cooler.'],options:'Black is the initial listing direction. Final availability is pending.',source:'https://aocoolers.com/collections/canvas-1/products/stow-n-go-cooler'},
    {id:'sl-dock',brand:'Soft Lines',group:'softlines',name:'Floating Dock Lines',kind:'rope',accent:'#345e71',tag:'Dock-day essentials',description:'Floating polypropylene lines for your dockside setup, with personalization options under review.',specs:['Manufactured from multifilament polypropylene.','Diameter and length combinations will be confirmed before launch.'],options:'Reviewing 3/8, 1/2 and 5/8 inch diameters, standard lengths and custom colors. Not every size pairs with every length. Boat-name labeling is being evaluated.',source:'https://softlinesinc.com/category/boats-floating-dock-lines'},
    {id:'sl-fender',brand:'Soft Lines',group:'softlines',name:'Floating Fender Lines',kind:'pair',accent:'#a45e47',tag:'Alongside the dock',description:'Dedicated floating lines for hanging your boat’s fenders.',specs:['Polypropylene fender lines.','Final package quantity, sizes and lengths to be confirmed.'],options:'Reviewing 5 and 7 ft lengths in multiple diameters. Color choices and paired packaging will be confirmed with the supplier.',source:'https://softlinesinc.com/category/boats-floating-fender-lines'},
    {id:'sl-anchor',brand:'Soft Lines',group:'softlines',name:'Floating Anchor Lines',kind:'rope',accent:'#46604c',tag:'Your next cove',description:'Soft Lines’ floating anchor-line range, with lengths and colors being finalized.',specs:['Polypropylene rope.','Final line diameter, length and intended-use guidance pending.'],options:'Reviewing standard and custom lengths. We’ll publish exact configurations and supplier guidance before ordering opens.',source:'https://softlinesinc.com/category/boats-floating-anchor-lines'},
    {id:'sl-launch',brand:'Soft Lines',group:'softlines',name:'Floating Boat Launch Lines',kind:'hook',accent:'#38575b',tag:'From ramp to water',description:'A floating line with a stainless steel spring hook for the boat-launch routine.',specs:['Spring-hook attachment.','Length, diameter and color options to be confirmed.'],options:'Reviewing standard lengths from the supplier’s launch-line range. Final hook and line configurations are pending.',source:'https://softlinesinc.com/category/boats-floating-boat-launch-lines'},
    {id:'sl-locator',brand:'Soft Lines',group:'softlines',name:'Floating Dock Locator Lines',kind:'rope',accent:'#977a4e',tag:'A familiar spot',description:'The dock locator range for a repeatable dockside setup.',specs:['A separate product family from transient dock lines.','Configuration and installation guidance to be confirmed.'],options:'Reviewing available diameters, lengths and colors. Exact choices will follow supplier confirmation.',source:'https://softlinesinc.com/category/boats-floating-dock-locator-lines'},
    {id:'sl-safety',brand:'Soft Lines',group:'softlines',name:'Fishing Rod & Reel Safety Lines',kind:'hook',accent:'#50674c',tag:'Keep gear close',description:'Tether options for your fishing rod and reel while you’re out on the water.',specs:['Rod-and-reel tether product family.','Final lengths and attachment options pending.'],options:'We’re confirming the full selection of lengths, colors and fittings. This is a gear tether, not a personal safety line.',source:'https://softlinesinc.com/category/boats-fishing-rod-and-reel-safety-lines'},
    {id:'sl-bags',brand:'Soft Lines',group:'softlines',name:'Nylon Mesh Storage & Drying Bags',kind:'bag',accent:'#4e5659',tag:'A place for your lines',description:'Keep your dock lines together with a breathable mesh storage bag.',specs:['Nylon mesh storage and drying bag range.','Final bag dimensions and closure details pending.'],options:'We’re confirming the current sizes so you can choose a bag for your line collection.',source:'https://softlinesinc.com/product/7-by-10-dock-line-storage-bag'}
  ];

  function illustration(p) {
    let drawing;
    if (p.kind.includes('cooler')) {
      const low=p.kind==='low-cooler';
      drawing=`<g transform="${low?'translate(-25 75) scale(1.1 .65)':'translate(0 5)'}"><path d="M119 120Q250 96 381 120L398 295Q250 322 102 295Z" fill="${p.accent}"/><path d="M119 120q131-30 262 0l-7 29q-124-22-248 0Z" fill="#ffffff30"/><path d="M200 113V73q50-20 100 0v40" fill="none" stroke="#263b37" stroke-width="14"/><path d="M112 171q138 25 277 0" stroke="#c5ccba" stroke-width="3" fill="none"/><rect x="188" y="209" width="124" height="55" rx="5" fill="#e7dcc3"/><text x="250" y="242" text-anchor="middle" font-size="19" font-family="Arial" font-weight="bold" fill="#24473f">COOLER</text></g>`;
    } else if(p.kind==='bag') {
      drawing=`<path d="M161 114q90-17 179 0l26 194q-114 30-232 0Z" fill="${p.accent}" opacity=".85"/><path d="M162 111q87 22 177 0M174 108l-11-39m164 40 13-41" fill="none" stroke="#254a41" stroke-width="7"/><path d="M155 155h196m-201 24h206m-211 24h216m-221 24h226m-229 24h234m-237 24h240m-207-137-11 166m42-166-6 171m37-171v174m32-174 5 171m26-171 11 165" stroke="#d9e0d3" stroke-width="2" opacity=".6"/>`;
    } else {
      const coil=`<g fill="none" stroke="${p.accent}" stroke-width="15"><ellipse cx="263" cy="208" rx="117" ry="78"/><ellipse cx="263" cy="208" rx="94" ry="57"/><ellipse cx="263" cy="208" rx="71" ry="36"/><path d="M147 207q-70 20-52 70t66 3"/></g><path d="m245 130 28-2 2 158-28-2Z" fill="#d1a16a"/>`;
      drawing=p.kind==='pair'?`<g transform="translate(-25 -32) scale(.86)">${coil}</g><g transform="translate(62 93) scale(.72)">${coil}</g>`:coil;
      if(p.kind==='hook')drawing+='<path d="M378 208q38-1 30-49-6-22-22-12-17 11-7 29" fill="none" stroke="#8b9997" stroke-width="10"/><path d="m381 152 13 30" stroke="#dbe2dd" stroke-width="4"/>';
    }
    return `<svg viewBox="0 0 500 390" role="img" aria-label="Illustration for ${p.name}; not a product photograph" xmlns="http://www.w3.org/2000/svg"><ellipse cx="250" cy="333" rx="156" ry="14" fill="#143b35" opacity=".08"/>${drawing}</svg>`;
  }

  const host=document.querySelector('#gear-catalog');
  if(!host)return;
  host.innerHTML=catalog.map(p=>`<article class="gear-product" data-gear-brand="${p.group}" id="${p.id}"><div class="gear-product-art">${illustration(p)}<span class="gear-art-label">Illustration · product photos coming soon</span></div><div class="gear-product-copy"><p class="eyebrow">${p.brand}</p><h3>${p.name}</h3><p class="gear-product-tag">${p.tag}</p><p>${p.description}</p><p class="gear-price">Pricing coming soon</p><details><summary>Explore product details</summary><ul>${p.specs.map(s=>`<li>${s}</li>`).join('')}</ul><p>${p.options}</p><p class="gear-pending">Listing preview. Final options, pricing, availability and shipping will be confirmed before ordering opens.</p></details></div></article>`).join('');

  document.querySelectorAll('[data-gear-filter]').forEach(button=>button.addEventListener('click',()=>{
    const group=button.dataset.gearFilter;
    document.querySelectorAll('[data-gear-filter]').forEach(b=>{
      const active=b===button;
      b.classList.toggle('active',active);
      b.setAttribute('aria-pressed',String(active));
    });
    host.querySelectorAll('[data-gear-brand]').forEach(card=>{card.hidden=group!=='all'&&card.dataset.gearBrand!==group;});
    document.querySelector('#gear-results-count').textContent=`${catalog.filter(p=>group==='all'||p.group===group).length} listings to explore`;
  }));
  document.querySelector('#gear-results-count').textContent=`${catalog.length} listings to explore`;
})();
