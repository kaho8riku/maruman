// js/gift.js

// HTMLの読み込みがすべて終わってから魔法（JS）を実行するおまじない
document.addEventListener('DOMContentLoaded', function() {
  
  // 1. 必要なパーツ（HTMLの要素）をあらかじめ探して取得しておく
  const items = document.querySelectorAll('.gift-lp-catalog .item'); // すべての商品カード
  const selectedList = document.getElementById('selected-items-list'); // 選択した商品が並ぶエリア
  const totalPriceDisplay = document.getElementById('total-price-display'); // 合計金額を表示するエリア

  // 2. 選ばれた商品を覚えておくための「空の箱（配列）」を用意する
  let selectedItems = [];

  // 3. すべての商品カードに対して「クリックされた時のルール」を設定する
  items.forEach(item => {
    item.addEventListener('click', function() {
      
      // クリックされた商品のID（K-1など）と価格を取得する
      const id = this.getAttribute('data-id');
      const price = parseInt(this.getAttribute('data-price')); // parseIntで文字を数字に変換
      
      // 選ばれた時の見た目（CSSの .is-selected）を付け外しする
      this.classList.toggle('is-selected');

      // もし今クリックして「選択状態（is-selected）」になったなら…
      if (this.classList.contains('is-selected')) {
        // 覚えておく箱（selectedItems）に、商品情報を追加する
        selectedItems.push({ id: id, price: price });
      } 
      // もし今クリックして「選択解除」になったなら…
      else {
        // 覚えておく箱の中から、今の商品のIDと同じものを探して削除する
        selectedItems = selectedItems.filter(target => target.id !== id);
      }

      // 4. 箱の中身が変わったので、下の計算エリアの表示を更新する関数を呼ぶ
      updateDisplay();
    });
  });

  // 5. 画面下の計算エリアを最新の状態に書き換える関数
  function updateDisplay() {
    // 一旦、リストの表示をすべて空っぽにリセットする
    selectedList.innerHTML = '';
    let total = 0; // 合計金額の初期値は0円

    // もし何も選ばれていなかったら
    if (selectedItems.length === 0) {
      selectedList.innerHTML = '<p style="text-align:center; color:#999; font-size:0.8rem;">商品を選択してください</p>';
    } 
    // 何か選ばれていたら
    else {
      // 覚えておく箱（selectedItems）の中身を1つずつ取り出して表示を作る
      selectedItems.forEach(item => {
        // 新しい <div> を作って、クラス名と中身（商品名と価格）を入れる
        const row = document.createElement('div');
        row.className = 'mockup-row';
        // toLocaleString() で 4900 を 4,900 のようにカンマ区切りにする
        row.innerHTML = `<span>${item.id}</span><span>¥${item.price.toLocaleString()}-</span>`;
        
        // 作った <div> を画面のリストエリアに追加する
        selectedList.appendChild(row);
        
        // 合計金額に今回の商品の価格を足し算する
        total += item.price;
      });
    }

    // 最後に、計算し終わった合計金額の文字を画面に表示する
    totalPriceDisplay.textContent = `¥ ${total.toLocaleString()}-`;
  }
});