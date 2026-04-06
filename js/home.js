'use strict';

{// js/home.js の一番上のフェードイン部分を修正
  window.addEventListener('load', () => {
    if (typeof gsap !== 'undefined') {
      
      // ★ターゲットを .hero-content に変更★
      gsap.to('.hero-content', {
        opacity: 1,
        duration: 0.2,
        ease: 'power2.out'
      });
      
    }
  });
  // ★追記ここまで★


  // GSAPとScrollTriggerが読み込まれているかチェック
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    
    // ScrollTriggerを登録
    gsap.registerPlugin(ScrollTrigger);

    // --- 画像をフワッと表示させるアニメーション ---
    // 目印クラス（js-animate-img）をターゲットにします
    
    gsap.to('.js-animate-img', {
      // ▼ ゴール（to）の状態（CSSの初期状態から戻す） ▼
      opacity: 1,               /* 100%見える状態にする */
      y: 0,                    /* 元の高さに戻す（translateY(0)） */
      duration: 1.2,           /* 1.2秒かけてゆっくり */
      ease: 'power3.out',      /* 最初シュッと現れて、最後ゆっくりフワッと止まる */
      
      // ▼ スクロールトリガーの設定 ▼
      scrollTrigger: {
        trigger: '.farm-concept', /* このセクションが画面に入ったらスタート */
        start: 'top 80%',       /* セクションの上が、画面の上から80%の位置に来た時 */
        // markers: true,        /* ★微調整用にマーカーを出します（完成したらコメントアウト） */
        
        // ここの使い分けがプロのポイント！
        // スプラッシュのような「ぬるぬる同期（scrub）」ではなく、
        // 通過したら1回だけ再生される（toggleActions）を使います。
        toggleActions: 'play none none reverse',
        /* play   : 画面に入ったら再生
           none   : 画面から出ても何もしない
           none   : 戻ってきた時も何もしない
           reverse: 画面の一番上まで戻ったら逆再生（消える）
        */
      }
    });
    
  } else {
    console.error('GSAP or ScrollTrigger is not loaded.');
  }

  // --- スクロールしたらヘッダーの背景色を変える処理 ---
window.addEventListener('scroll', () => {
  const header = document.querySelector('.fixed-header');
  
  // 画面が上から 50px 以上スクロールされたら
  if (window.scrollY > 50) {
    header.classList.add('is-scrolled'); // 白背景クラスを追加
  } else {
    header.classList.remove('is-scrolled'); // 上に戻ったら透明に戻す
  }
});
}