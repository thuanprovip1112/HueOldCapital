document.addEventListener('DOMContentLoaded',()=>{
  const gallery = document.getElementById('galleryGrid')
  const lightbox = document.getElementById('lightbox')
  const lightboxImg = document.getElementById('lightboxImg')
  const closeBtn = document.getElementById('closeLightbox')

  function openLightbox(src, alt){
    lightboxImg.src = src
    lightboxImg.alt = alt || ''
    lightbox.setAttribute('aria-hidden','false')
  }

  function closeLight(){
    lightbox.setAttribute('aria-hidden','true')
    lightboxImg.src = ''
    lightboxImg.alt = ''
  }

  async function loadImages(){
    try{
      const res = await fetch('images.json')
      if(!res.ok) throw new Error('Failed to load')
      const list = await res.json()
      gallery.innerHTML = ''
      list.forEach(item=>{
        const img = document.createElement('img')
        img.src = item.src
        img.alt = item.alt || ''
        img.setAttribute('data-full', item.src)
        img.loading = 'lazy'
        gallery.appendChild(img)
      })
    }catch(err){
      console.warn('Could not load images.json, falling back to inline images if present', err)
      // If fetch fails, leave gallery empty (user can add images manually)
      gallery.innerHTML = '<p>Không thể tải danh sách ảnh. Vui lòng mở trang qua HTTP server hoặc kiểm tra images.json.</p>'
    }
  }

  gallery?.addEventListener('click',(e)=>{
    const t = e.target
    if(t && t.tagName === 'IMG'){
      const full = t.getAttribute('data-full') || t.src
      openLightbox(full, t.alt)
    }
  })

  closeBtn?.addEventListener('click',closeLight)

  lightbox?.addEventListener('click',(e)=>{ if(e.target === lightbox) closeLight() })

  loadImages()
})
