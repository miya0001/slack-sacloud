# Slack sacloud

Slackを使用して、さくらのクラウド上のインスタンスをコントロールすることができます。

## Usage

```
/sacloud list # インスタンスの一覧を見る
```

```
/sacloud up <id> # 指定したインスタンスを起動する
```

```
/sacloud halt <id> # 指定したインスタンスを停止する
```

```
/sacloud destroy <id> # 指定したインスタンスを削除する
```

## セットアップ

### 各種APIキーの設定

`local.yml` というファイルをプロジェクトルートに以下のような内容で作成してください。
各種のAPIトークンはそこらへんからかき集めてください。

```
sacloud:
  SACLOUD_API: https://secure.sakura.ad.jp/cloud/zone/is1b/api/cloud/1.1/
  SACLOUD_ACCESS_TOKEN: "xxxx"
  SACLOUD_ACCESS_TOKEN_SECRET: "xxxx"
slack:
  slack_client_id: "xxxx"
  slack_client_secret: "xxxx"
  slack_verification_token: "xxxx"
  slack_allowed_channel: "general"
```

#### SlackのAPI取得画面

![](https://www.evernote.com/l/ABWPpnznXvZBbJGQXYMXfyF63aGAqALuVpEB/image.png)

#### さくらのクラウドのAPI取得画面

![](https://www.evernote.com/l/ABU5iAo6GnZBOLTEBJVWUf_Ov9IdOPJcxFkB/image.png)

### 各種ライブラリのインストール

#### Serverlessフレームワークをインストール

```
$ npm install -g serverless
```

インストール後に `sls config credentials` でAWSのcredentialを設定してください。

#### 依存関係があるライブラリをインストール

```
$ npm install
```

#### AWSにデプロイ

```
$ sls deploy
```

デプロイ後に以下のように出力されます。

```
Serverless: Packaging service...
Serverless: Uploading CloudFormation file to S3...
Serverless: Uploading artifacts...
Serverless: Uploading service .zip file to S3 (5.68 MB)...
Serverless: Validating template...
Serverless: Updating Stack...
Serverless: Checking Stack update progress...
..............
Serverless: Stack update finished...
Service Information
service: slack-sacloud
stage: dev
region: us-east-1
api keys:
  None
endpoints:
  POST - https://94yrylm7b7.execute-api.us-east-1.amazonaws.com/dev/slack
  GET - https://94yrylm7b7.execute-api.us-east-1.amazonaws.com/dev/slack
functions:
  slack: slack-sacloud-dev-slack
Serverless: Removing old service versions...
```

この中のエンドポイントのURLを以下の画面で入力してください。

![](https://www.evernote.com/l/ABUBLGAXa4dM-L_wfug8Q2zC-t7e2Va4PhcB/image.png)

![](https://www.evernote.com/l/ABXAgrVzni1JWrdHorI63WsdjrafAbSgtO8B/image.png)

![](https://www.evernote.com/l/ABVJI9eHbfpLD6IGZDcK2CNEptL3E3DTzNQB/image.png)
