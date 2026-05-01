'use strict';

{
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.error('GSAP or ScrollTrigger is not loaded.');
  } else {
    gsap.registerPlugin(ScrollTrigger);

    // 最初から「SCROLL↓」を見せておく
    gsap.to('.js-animate-scroll', { 
      opacity: 1, visibility: 'visible', duration: 1, delay: 0.5 
    });

    // ▼ ★追加：2回連続でページ移動しないためのストッパー ▼
    let isNavigating = false;

    // ページ遷移の共通処理
    const goToNextPage = () => {
      if (isNavigating) return; // すでに移動中なら何もしない
      isNavigating = true;      // 移動中に切り替え
      document.querySelector('.page-transition-curtain').classList.add('is-active');
      setTimeout(() => {
        window.location.href = 'home.html';
      }, 1000); 
    };

    // 画面や文字を「タップ」しても次のページに進めるようにする
    document.querySelector('.js-animate-scroll').addEventListener('click', goToNextPage);
    document.querySelector('.hero').addEventListener('click', goToNextPage);

    // ==================================================
    // ★ ここから画面サイズによって動きを分ける魔法 ★
    // ==================================================
    let mm = gsap.matchMedia();

    // --------------------------------------------------
    // ▼【スマホ用】
    // --------------------------------------------------
    mm.add("(max-width: 767px)", () => {
      
      const tlMobile = gsap.timeline({
        scrollTrigger: {
          trigger: '.hero', 
          start: 'top top', 
          end: '+=100%', 
          scrub: 1, 
          pin: true,
          // ▼ ★変更！95%までスクロールしたらゴールとみなす！ ▼
          onUpdate: (self) => {
            if (self.progress > 0.95) {
              goToNextPage();
            }
          }
        }
      });

      tlMobile.fromTo('.veg-1', { x: -120, y: -200, rotation: 0 }, { x: 130, y: 320, rotation: 360, duration: 2, ease: 'power2.out' }, 'start')
        .fromTo('.veg-2', { x: -100, y: 130, rotation: 0 }, { x: 200, y: 150, rotation: -360, duration: 2, ease: 'power2.out' }, 'start')
        .fromTo('.veg-3', { x: -50, y: -90, rotation: 0 }, { x: 120, y: -450, rotation: 360, duration: 2, ease: 'power2.out' }, 'start')
        .fromTo('.veg-4', { x: 130, y: -70, rotation: 0 }, { x: -120, y: 300, rotation: -360, duration: 2, ease: 'power2.out' }, 'start')
        .fromTo('.veg-5', { x: 80, y: 100, rotation: 0 }, { x: -180, y: -320, rotation: 360, duration: 2, ease: 'power2.out' }, 'start')
        .fromTo('.veg-6', { x: 120, y: -200, rotation: 0 }, { x: 150, y: -300, rotation: -360, duration: 2, ease: 'power2.out' }, 'start')
        .fromTo('.veg-7', { x: 0, y: -100, rotation: 0 }, { x: -200, y: 200, rotation: 360, duration: 2, ease: 'power2.out' }, 'start');

      tlMobile.to('.js-animate-scroll', { opacity: 0, visibility: 'hidden', duration: 0.5 }, 'start+=1');
      tlMobile.fromTo('.logo-wrapper', { opacity: 0, visibility: 'hidden' }, { opacity: 1, visibility: 'visible', duration: 0.5, ease: 'power2.out' }, '-=0.5');
    });

    // --------------------------------------------------
    // ▼【PC用】
    // --------------------------------------------------
    mm.add("(min-width: 768px)", () => {
      
      const tlPC = gsap.timeline({
        scrollTrigger: {
          trigger: '.hero', 
          start: 'top top', 
          end: '+=100%', 
          scrub: 1, 
          pin: true,
          // ▼ ★変更！PC版も同様に95%でゴールとみなす！ ▼
          onUpdate: (self) => {
            if (self.progress > 0.95) {
              goToNextPage();
            }
          }
        }
      });

      tlPC.fromTo('.veg-1', { x: -300, y: 270, rotation: 0 }, { x: 0, y: -350, rotation: 360, duration: 2, ease: 'power2.out' }, 'start')
        .fromTo('.veg-2', { x: 300, y: 250, rotation: 0 }, { x: 250, y: -300, rotation: -360, duration: 2, ease: 'power2.out' }, 'start')
        .fromTo('.veg-3', { x: -140, y: -250, rotation: 0 }, { x: 420, y: -200, rotation: 360, duration: 2, ease: 'power2.out' }, 'start')
        .fromTo('.veg-4', { x: 250, y: 0, rotation: 0 }, { x: -250, y: -250, rotation: -360, duration: 2, ease: 'power2.out' }, 'start')
        .fromTo('.veg-5', { x: -30, y: -30, rotation: 0 }, { x: -250, y: 260, rotation: 360, duration: 2, ease: 'power2.out' }, 'start')
        .fromTo('.veg-6', { x: 200, y: -300, rotation: 0 }, { x: -500, y: -200, rotation: -360, duration: 2, ease: 'power2.out' }, 'start')
        .fromTo('.veg-7', { x: -400, y: -350, rotation: 0 }, { x: 250, y: 200, rotation: 360, duration: 2, ease: 'power2.out' }, 'start');

      tlPC.to('.js-animate-scroll', { opacity: 0, visibility: 'hidden', duration: 0.5 }, 'start+=1');
      tlPC.fromTo('.logo-wrapper', { opacity: 0, visibility: 'hidden' }, { opacity: 1, visibility: 'visible', duration: 0.5, ease: 'power2.out' }, '-=0.5');
    });
  }
}