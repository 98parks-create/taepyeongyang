const projectData = [
  { 
    img: 'lecoq.png', 
    title: 'LECOQ SPORTIF', 
    desc: '\n  \n 스크롤을 내려서 상세한 내용을 확인하세요.',
    subImages: ['lecoq.png','lecoq3.png', 'lecoq4.png', 'lecoq2.png', 'lecoq5.png', 'lecoq11.png','lecoq9.png','lecoq6.png', 'lecoq12.png', 'lecoq13.png'] 
  },
  { 
    img: 'descente_g10.png',
    title: 'DESCENTE GOLF',
    desc: '\n \n 스크롤을 내려서 상세한 내용을 확인하세요. ',
    subImages: ['descente_g10.png','descente_g8.png','descente_g7.png', 'descente_g9.png', 'descente_g3.png'] 
  },
  { 
    img: 'toptenbs.png', 
    title: 'TOPTEN10 BUSAN POP UP',
    desc: '\n  \n 스크롤을 내려서 상세한 내용을 확인하세요.',
    subImages: ['toptenbs.png','toptenbs1.png', 'toptenbs2.png', 'toptenbs3.png', 'toptenbs4.png', 'toptenbs5.png', 'toptenbs6.png', 'toptenbs7.png','toptenbs8.png', 'toptenbs9.png', 'toptenbs10.png', 'toptenbs11.png', 'toptenbs12.png', 'toptenbs13.png', 'toptenbs14.png', 'toptenbs15.png'] 
  },
  { 
    img: 'descente_gs8.png', 
    title: 'DESCENTE GOLF 신세계 강남',
    desc: '\n  \n 스크롤을 내려서 상세한 내용을 확인하세요.',
    subImages: ['descente_gs8.png', 'descente_gs.png', 'descente_gs7.png', 'descente_gs5.png', 'descente_gs4.png', 'descente_gs2.png', 'descente_gs1.png', 'descente_gs9.png'] 
  },
  { 
    img: 'lecoq_g1.png', 
    title: 'LECOQ SPORTIF GOLF',
    desc: '\n  \n 스크롤을 내려서 상세한 내용을 확인하세요.',
    subImages: ['lecoq_g1.png','lecoq_g.png', 'lecoq_g2.png'] 
  },
  { 
    img: 'snowpeak.png', 
    title: 'SNOWPEAK',
    desc: '\n  \n 스크롤을 내려서 상세한 내용을 확인하세요.',
    subImages: ['snowpeak.png', 'snowpeak2.png', 'snowpeak3.png', 'snowpeak1.png', 'snowpeak4.png', 'snowpeak6.png', 'snowpeak7.png'] 
  },
  { 
    img: 'skcs.png', 
    title: 'SKECHERS LOTTE',
    desc: '\n  \n 스크롤을 내려서 상세한 내용을 확인하세요.',
    subImages: ['skcs.png', 'skcs1.png', 'skcs2.png', 'skcs3.png', 'skcs4.png', 'skcs5.png', 'skcs6.png'] 
  },
  { 
    img: 'umbro.png', 
    title: 'UMBRO',
    desc: '\n  \n 스크롤을 내려서 상세한 내용을 확인하세요.',
    subImages: ['umbro.png','umbro1.png','umbro2.png', 'umbro..png', 'umbro4.png', 'umbro5.png','umbro6.png','umbro7.png','umbro8.png','umbro10.png','umbro.png11','umbro12.png',] 
  },
  { 
    img: 'topten2.png',
    title: 'TOPTEN10',
    desc: '\n  \n 스크롤을 내려서 상세한 내용을 확인하세요.',
    subImages: ['topten2.png', 'topten1.png', 'topten.png','topten3.png','topten4.png','topten6.png','topten7.png','topten8.png','topten9.png','topten10.png','topten11.png','topten12.png','topten13.png','topten14.png','topten15.png','topten16.png','topten17.png','topten18.png','topten19.png','topten20.png','topten21.png','topten22.png','topten23.png'] 
  },
  { 
    img: 'kodak.png',
    title: 'KODAK',
    desc: '\n  \n 스크롤을 내려서 상세한 내용을 확인하세요.',
    subImages: ['kodak.png', 'kodak1.png','kodak2.png','kodak3.png','kodak4.png'] 
  }
];

let xPos = 0;
let startX, startY;
const dragThreshold = 5;

gsap.timeline()
  .set('.ring', { rotationY: 180, cursor: 'grab' })
  .set('.img', {
    rotateY: (i) => i * -36,
    transformOrigin: '50% 50% 750px',
    z: -750,
    backgroundImage: (i) => `url(images/${encodeURIComponent(projectData[i].img)})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backfaceVisibility: 'hidden'
  })
  .from('.img', {
    duration: 1.5,
    y: 200,
    opacity: 0,
    stagger: 0.1,
    ease: 'expo'
  })
  .add(() => {
    $('.img').on('mouseenter', function () {
      const current = this;
      gsap.to('.img', { opacity: (i, t) => (t === current) ? 1 : 0.35, duration: 0.4, ease: 'power2.out' });
    });

    $('.img').on('mouseleave', () => {
      gsap.to('.img', { opacity: 1, duration: 0.4, ease: 'power2.inOut' });
    });

    $('.img').on('mousedown touchstart', (e) => {
      startX = e.clientX || (e.touches && e.touches[0].clientX);
      startY = e.clientY || (e.touches && e.touches[0].clientY);
    });

    $('.img').on('mouseup touchend', function (e) {
      const endX = e.clientX || (e.changedTouches && e.changedTouches[0].clientX);
      const endY = e.clientY || (e.changedTouches && e.changedTouches[0].clientY);
      const diffX = Math.abs(endX - startX);
      const diffY = Math.abs(endY - startY);

      if (diffX < dragThreshold && diffY < dragThreshold) {
        // 튕김 방지를 위한 기본동작 차단
        if (e.cancelable) e.preventDefault();
        
        const index = $(this).index();
        const project = projectData[index];
        const scrollContainer = document.querySelector('.modal-scroll-container');

        $('#modal-img').attr('src', `images/${project.img}`);
        $('.modal-description h2').text(project.title);
        $('.modal-description p').html(project.desc.replace(/\n/g, '<br>'));

        $('.extra-images-container').remove(); 
        if (project.subImages && project.subImages.length > 0) {
          let subHtml = '<div class="extra-images-container">';
          project.subImages.forEach(src => {
            subHtml += `<img src="images/${src}" class="sub-img">`;
          });
          subHtml += '</div>';
          $('.modal-content-wrapper').append(subHtml); 
        }

        const isMobile = window.innerWidth <= 768;
        const tl = gsap.timeline();
        
        // 모달 열 때 배경 스크롤 고정
        document.body.style.overflow = 'hidden';

        tl.set('#modal', { display: 'block', opacity: 0 })
          .set(['#modal-img', '.modal-description'], { x: 0, y: 0, scale: 0.2, opacity: 0 })
          .set('.extra-images-container', { opacity: 0, y: 30 })
          .to('#modal', { opacity: 1, duration: 0.3 })
          .to('#modal-img', { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.5)" });

        if (!isMobile) {
            tl.to('#modal-img', { x: -280, duration: 0.7, ease: "power3.inOut" })
              .to('.modal-description', { x: 280, opacity: 1, duration: 0.7, ease: "power3.out" }, "-=0.5");
        } else {
            tl.to('.modal-description', { opacity: 1, duration: 0.5 }, "-=0.3");
        }

        tl.to('.extra-images-container', { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, "-=0.2")
          .add(() => { if(scrollContainer) scrollContainer.scrollTop = 0; });
      }
    });
  }, '-=0.5');

$(window).on('mousedown touchstart', dragStart);
$(window).on('mouseup touchend', dragEnd);

function dragStart(e) {
  if (e.touches) e.clientX = e.touches[0].clientX;
  xPos = Math.round(e.clientX);
  gsap.set('.ring', { cursor: 'grabbing' });
  $(window).on('mousemove touchmove', drag);
}

function drag(e) {
  if (e.touches) e.clientX = e.touches[0].clientX;
  gsap.to('.ring', { rotationY: '-=' + ((Math.round(e.clientX) - xPos) % 360) });
  xPos = Math.round(e.clientX);
}

function dragEnd() {
  $(window).off('mousemove touchmove', drag);
  gsap.set('.ring', { cursor: 'grab' });
}

$('#modal, .close').on('click', function (e) {
  if (e.target === this || $(e.target).hasClass('close')) {
    const scrollElem = document.querySelector('.modal-scroll-container');
    
    gsap.to('#modal', {
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        $('#modal').hide();
        document.body.style.overflow = ''; // 배경 스크롤 복원
        if (scrollElem) scrollElem.scrollTop = 0;
        $('.extra-images-container').remove();
        gsap.set(['#modal-img', '.modal-description'], { x: 0, y: 0, scale: 1, opacity: 0 });
      }
    });
  }
});

// 페이지 전환 애니메이션 유지
document.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', e => {
    const href = link.getAttribute('href');
    if (href && !href.startsWith('#') && link.hostname === window.location.hostname) {
      e.preventDefault();
      gsap.to("body", {
        opacity: 0, duration: 0.4, ease: "power2.in",
        onComplete: () => { window.location.href = href; }
      });
    }
  });
});