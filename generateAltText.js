/**************************************************
【使い方】
▼ ざっくりサマリ
alt属性を「alt="A画面の Bを Cしている スクリーンショット"」の形で
生成するブックマークレット（予定）

▼ A画面の のデフォルト値
- ホーム画面以外
  - 開いている画面の title から「| freee」を取り去った文字列
- ホーム画面
  - 「ホーム」

▼ Bを のデフォルト値
- コード実行前に文字列を選択している
  - 選択した文字列部分
- コード実行前に文字列を選択していない
  - 「」

▼ Cしている のデフォルト値
「XXXしている」
***************************************************/

/*
ブックマークレットにする際、コードの先頭に付与する↓
javascript:
*/

// 各種値を保存するための変数
var PAGE;
var TARGET;
var DOING;

// 各種情報をチェックするためのメソッド群
var check = {
    cancel: (canceledTarget) => {
        if (canceledTarget === null) {
            canceledTarget = "";
        }
    }
};

// 各種情報を取得するためのメソッド群
var get = {
    page: () => {
        var page = document.title.replace(" | freee","");
        if (page === "freee | 全自動のクラウド会計ソフト") {
            // ホーム画面だけ適切にreplaceされない問題を回避
            page = "ホーム";
        }
        page = prompt("対象の画面を入力してください。\n（例）[A画面の] Bを Cしている スクリーンショット", `「${page}」画面の`);
        // promptでcalcelが押された場合は、pageの中身を空文字とする。
        check.cancel(page);
        console.log(page);
        PAGE = page;
    },
    
    target: () => {
        var target = window.getSelection().toString();
        target = prompt("対象の箇所を入力してください。\n（例）A画面の [Bを] Cしている スクリーンショット", `「${target}」を`);
        // promptでcalcelが押された場合は、targetの中身を空文字とする。
        check.cancel(target);
        console.log(target);
        TARGET = target;
    },
    doing: () => {
        var doing = prompt("対象への操作内容を入力してください。\n（例）A画面の Bを [Cしている] スクリーンショット", "XXXしている");
        // promptでcalcelが押された場合は、targetの中身を空文字とする。
        check.cancel(doing);
        console.log(doing);
        DOING = doing;
    }
};

var main = () => {
    get.page();
    get.target();
    get.doing();
    console.log(PAGE, TARGET, DOING);
    var output = ` alt="${PAGE}${TARGET}${DOING}スクリーンショット"`;
    prompt("このalt属性を<img>タグ内にコピー＆ペーストしてください。", output);
    
};
main();
