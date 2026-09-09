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

  // Load images for the main gallery (images.json used earlier) and per-section galleries (images_by_section.json)
  async function loadImages(){
    // populate main gallery from images/gallery/index.json if present (preferred)
    const mainGallery = document.getElementById('galleryGrid')
    if(mainGallery){
      mainGallery.innerHTML = ''
      try{
        const galleryIndexRes = await fetch('images/gallery/index.json')
        if(galleryIndexRes.ok){
          const list = await galleryIndexRes.json()
          list.forEach(item=>{
            const figure = document.createElement('figure')
            const img = document.createElement('img')
            img.src = item.src
            img.alt = item.alt || ''
            img.setAttribute('data-full', item.src)
            img.loading = 'lazy'
            figure.appendChild(img)
            if(item.credit){
              const figcap = document.createElement('figcaption')
              figcap.textContent = item.credit
              figure.appendChild(figcap)
            }
            mainGallery.appendChild(figure)
          })
        }else{
          // fallback to images.json
          const res = await fetch('images.json')
          if(res.ok){
            const list = await res.json()
            list.forEach(item=>{
              const figure = document.createElement('figure')
              const img = document.createElement('img')
              img.src = item.src
              img.alt = item.alt || ''
              img.setAttribute('data-full', item.src)
              img.loading = 'lazy'
              figure.appendChild(img)
              if(item.credit){
                const figcap = document.createElement('figcaption')
                figcap.textContent = item.credit
                figure.appendChild(figcap)
              }
              mainGallery.appendChild(figure)
            })
          }
        }
      }catch(err){
        console.warn('Could not load main gallery index or images.json', err)
      }
    }

    // populate section galleries from images_by_section.json
    try{
      const res2 = await fetch('images_by_section.json')
      if(!res2.ok) throw new Error('Failed to load images_by_section.json')
      const map = await res2.json()
      Object.keys(map).forEach(sectionKey=>{
        const container = document.getElementById('gallery-' + sectionKey)
        if(!container) return
        container.innerHTML = ''
        map[sectionKey].forEach(item=>{
          const figure = document.createElement('figure')
          const img = document.createElement('img')
          img.src = item.src
          img.alt = item.alt || ''
          img.setAttribute('data-full', item.src)
          img.loading = 'lazy'
          if(item.credit) img.setAttribute('data-credit', item.credit)
          figure.appendChild(img)
          if(item.credit){
            const figcap = document.createElement('figcaption')
            figcap.textContent = item.credit
            figure.appendChild(figcap)
          }
          container.appendChild(figure)
        })
      })
    }catch(err){
      console.warn('Could not load images_by_section.json', err)
    }
  }

  gallery?.addEventListener('click',(e)=>{
    const t = e.target
    if(t && t.tagName === 'IMG'){
      const full = t.getAttribute('data-full') || t.src
      const credit = t.getAttribute('data-credit') || ''
      openLightbox(full, t.alt)
      const captionEl = document.getElementById('lightboxCaption')
      if(captionEl) captionEl.textContent = credit
    }
  })

  closeBtn?.addEventListener('click',closeLight)

  lightbox?.addEventListener('click',(e)=>{ if(e.target === lightbox) closeLight() })

  loadImages()
})
