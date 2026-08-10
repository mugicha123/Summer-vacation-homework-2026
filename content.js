//ロックするURLのリスト
const lockList = [
    "https://www.youtube.com/",
    "https://www.example.com/"
];

//lockPage関数を定義
function lockPage() {
    //LockDivを作成
    const lockDiv = document.createElement('div');
    //html,bodyを取得
    const html = document.querySelector("html");
    const body = document.querySelector("body");
    //html,bodyを100%のサイズに設定
    html.style.width = "100%";
    html.style.height = "100%";
    body.style.width = "100%";
    body.style.height = "100%";
    //余白を削除
    const style = document.createElement('style');
    style.textContent = '* { margin: 0; padding: 0; }';
    document.head.appendChild(style);
    //LockDivのスタイルを設定
    lockDiv.style.position = "fixed";
    lockDiv.style.bottom = "20px";
    lockDiv.style.width = "100%";
    lockDiv.style.height = "100%";
    lockDiv.style.top = '0';
    lockDiv.style.left = '0';
    lockDiv.style.zIndex = '9999';
    lockDiv.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    //LockDivをbodyに追加
    document.body.appendChild(lockDiv);
};

//ロック判定関数を定義
function lockJudgement() {
    //現在のURLを取得
    const currentUrl = window.location.href;
    //現在のURLがロックリストに含まれているか判定する
    const judgement = lockList.some(item => currentUrl.includes(item));
    //判定結果がtrueの場合、lockPage関数を実行
    if (judgement) {
        lockPage();
    }
};

//ページ読み込み時にlockJudgement関数を実行
window.addEventListener('load', lockJudgement);