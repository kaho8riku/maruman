'use strict';

// ========================================================
// 1. ページ読み込み時の設定（ヒーローフェードインなど）
// ========================================================
window.addEventListener('load', () => {
  if (typeof gsap !== 'undefined') {
    // ヒーローコンテンツをフワッと表示
    gsap.to('.hero-content', {
      opacity: 1,
      duration: 0.2,
      ease: 'power2.out'
    });
  }
});

// ========================================================
// 2. スクロールによるヘッダーの背景色変更
// ========================================================
window.addEventListener('scroll', () => {
  const header = document.querySelector('.fixed-header');
  if (header) {
    if (window.scrollY > 50) {
      header.classList.add('is-scrolled'); // 白背景クラスを追加
    } else {
      header.classList.remove('is-scrolled'); // 上に戻ったら透明に戻す
    }
  }
});

// ========================================================
// 3. GSAP ScrollTrigger アニメーション群（スクロールの魔法）
// ========================================================
document.addEventListener('DOMContentLoaded', function() {
  
  // GSAPが正しく読み込まれているかチェック
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // ----------------------------------------------------
    // 【A】画像をフワッと表示させる（.js-animate-img）
    // ----------------------------------------------------
    const animateImgs = document.querySelectorAll('.js-animate-img');
    if (animateImgs.length > 0) {
      gsap.to('.js-animate-img', {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.farm-concept',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        }
      });
    }

    // ----------------------------------------------------
    // 【B】斜め下からビュッと拡大する画像（.js-scroll-jump）
    // ----------------------------------------------------
    const jumpImages = document.querySelectorAll('.js-scroll-jump');
    jumpImages.forEach((img) => {
      const isLeft = img.classList.contains('jump-left');
      const xMove = isLeft ? -40 : 40;
      
      gsap.from(img, {
        scrollTrigger: {
          trigger: img,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        scale: 0.2,
        x: xMove,
        y: 40,
        duration: 1,
        ease: "back.out(1.7)",
      });
    });

    // ----------------------------------------------------
    // 【C】文字がふわっと浮き上がる魔法（各ページの h1, h2, p）
    // ----------------------------------------------------
    // ※フォームの注意書きや、次に設定する .text-box の中の文字は除外します！
    const fadeTexts = document.querySelectorAll('main h1:not(.text-box h1), main h2:not(.text-box h2), main p:not(.text-box p):not(.privacy-notice):not(.req-note)');
    fadeTexts.forEach((text) => {
      gsap.from(text, {
        scrollTrigger: {
          trigger: text,
          start: "top 90%",
          toggleActions: "play none none none",
        },
        y: 30,
        opacity: 0,
        duration: 1.2,
        ease: "power2.out"
      });
    });

    // ----------------------------------------------------
    // 【D】★新規★ product_set.html の「地色＋文字」をフワッと！
    // ----------------------------------------------------
    // .text-box（背景色と文字が入った箱全体）をターゲットにします
    const textBoxes = document.querySelectorAll('.text-box');
    textBoxes.forEach((box) => {
      gsap.from(box, {
        scrollTrigger: {
          trigger: box,
          start: "top 85%", // 画面の下から15%見えたら発動
          toggleActions: "play none none none",
        },
        y: 40,         // 下からスッと
        opacity: 0,    // 箱ごと（背景も文字も）透明な状態から現れる
        duration: 1.2,
        ease: "power2.out"
      });
    });

  } else {
    console.error('GSAP or ScrollTrigger is not loaded.');
  }

  // ========================================================
  // 4. 無限ループスライダーを自動で増殖させる魔法
  // ========================================================
  const loopTrack = document.querySelector('.js-loop-track');
  if (loopTrack) {
    const originalHTML = loopTrack.innerHTML;
    // 4セット分に増殖させる
    loopTrack.innerHTML = originalHTML + originalHTML + originalHTML + originalHTML;
  }
});

// ========================================================
document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.querySelector('.hamburger-menu');
  const globalMenu = document.querySelector('.global-menu');

  if (hamburger && globalMenu) {
    // ハンバーガーボタンをクリックした時の処理
    hamburger.addEventListener('click', function() {
      hamburger.classList.toggle('is-active'); // ボタンを「×」にする
      globalMenu.classList.toggle('is-active'); // メニュー画面を出す
    });

    // メニューの中のリンクをクリックしたら、自動的にメニューを閉じる処理
    const menuLinks = document.querySelectorAll('.menu-list a');
    menuLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('is-active');
        globalMenu.classList.remove('is-active');
      });
    });
  }
});