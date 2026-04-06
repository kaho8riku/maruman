'use strict';

{
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.error('GSAP or ScrollTrigger is not loaded.');
  } else {
    gsap.registerPlugin(ScrollTrigger);

    // ==================================================
    // ★追加：ページ読み込み時に「SCROLL↓」をフワッと表示する
    // （スクロールを促すために、最初から見せておきます）
    // ==================================================
    gsap.to('.js-animate-scroll', { 
      opacity: 1, 
      visibility: 'visible', 
      duration: 1, 
      delay: 0.5 // 画面が開いて0.5秒後に表示
    });

    // タイムラインを作成（スクロールと連動）
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.hero',     
        start: 'top top',     
        end: 'bottom top',   
        scrub: 1,             
        pin: true,            
        // markers: true,     
      },
      onComplete: () => {
        // ページ遷移の魔法
        document.querySelector('.page-transition-curtain').classList.add('is-active');
        
        setTimeout(() => {
          window.location.href = 'home.html';
        }, 1000); 
      }
    });

    // 野菜のアニメーション（ご自身で調整された位置をそのまま使用しています！）
    tl.fromTo('.veg-1', { x: -250, y: 300, }, { x: 0, y: -350, duration: 2, ease: 'power2.out' }, 'start')
      .fromTo('.veg-2', { x: 200, y: 250, }, { x: 250, y: -300, duration: 2, ease: 'power2.out' }, 'start')
      .fromTo('.veg-3', { x: 0, y: -450, }, { x: 420, y: -200, duration: 2, ease: 'power2.out' }, 'start')
      .fromTo('.veg-4', { x: 190, y: -150, }, { x: -190, y: -350, duration: 2, ease: 'power2.out' }, 'start')
      .fromTo('.veg-5', { x: -50, y: 0, }, { x: -250, y: 260, duration: 2, ease: 'power2.out' }, 'start')
      .fromTo('.veg-6', { x: 200, y: -500, }, { x: -300, y: -420, duration: 2, ease: 'power2.out' }, 'start')
      .fromTo('.veg-7', { x: -250, y: -550, }, { x: 150, y: 0, duration: 2, ease: 'power2.out' }, 'start')

    // ==================================================
    // ★追加：スクロールすると、ロゴが出る前に「SCROLL↓」が消える
    // ==================================================
    // 野菜のアニメーション(duration: 2)の半分くらい(1秒経過時)で消え始めます
    tl.to('.js-animate-scroll', { opacity: 0, visibility: 'hidden', duration: 0.5 }, 'start+=1')

    // ロゴのアニメーション（そのまま）
    tl.fromTo('.logo-wrapper', 
      { opacity: 0, visibility: 'hidden' }, 
      { opacity: 1, visibility: 'visible', duration: 0.5, ease: 'power2.out' }, 
      '-=0.5' 
    );
  }
}