# SeihekiAnalyzer

[yt8492/SeihekiAnalyzer](https://github.com/yt8492/SeihekiAnalyzer)が大変素晴らしく愛用していたのですが、なぜか最近最新12件しか取得できなくなったので全件取得できるものを作りました。`Kotlin`が使えなかったのでコントリビューションはできなかったです:cry:

## usage
nodejsの実行環境がある人は
```
yarn install
yarn start
```
dockerの環境がある人は
```
docker run --rm -it -v $(pwd)/output:/output naporin0624/seiheki_analyzer
```

を実行後[DLSite](https://dlsite.com/maniax)を開きF12から開発者コンソールへ進み、Applicationタブ > Storage > Cookieies > https://www.dlsite.com > __DLsite_SIDのValueを取得し
```
SessionIDを入力してください
> 
```
と出力されたら出力されたら入力して下さい。

しばらくすると解析結果と円グラフが出力されます。