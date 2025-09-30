# Implementation Tasks

## Overview

このドキュメントは、SNS会話履歴作成Webアプリケーションの実装タスクを段階的に定義します。各タスクはコード生成エージェントが直接実行可能な形式で記述されており、テスト駆動開発(TDD)アプローチを採用しています。

**実装方針:**
- 段階的な構築 (Phase 1 → Phase 13)
- テスト優先 (可能な限りテストを先に書く)
- 要件へのトレーサビリティ維持
- 各タスク完了時に動作確認

---

## Phase 1: プロジェクト基盤

### Task 1.1: Vite + React + TypeScript プロジェクトのセットアップ

**プロンプト:**
```
Vite 5.0+を使用してReact 18.3+ + TypeScript 5.3+のプロジェクトを作成してください。

**要件:**
1. プロジェクト名: sns-chat-mockup-generator
2. 以下の依存関係をインストール:
   - react@^18.3.0
   - react-dom@^18.3.0
   - typescript@^5.3.0
   - vite@^5.0.0
   - @vitejs/plugin-react@^4.2.0

3. TypeScript設定:
   - strict mode有効
   - target: ES2020
   - jsx: react-jsx
   - moduleResolution: bundler

4. Vite設定:
   - port: 5173
   - build.target: es2020
   - build.minify: terser

5. プロジェクト構造を作成:
   ```
   src/
   ├── components/
   │   ├── atoms/
   │   ├── molecules/
   │   ├── organisms/
   │   ├── templates/
   │   └── pages/
   ├── services/
   ├── stores/
   ├── types/
   ├── utils/
   ├── styles/
   ├── App.tsx
   └── main.tsx
   ```

6. package.json に以下のスクリプトを追加:
   - dev: vite
   - build: tsc && vite build
   - preview: vite preview
   - lint: eslint . --ext ts,tsx
   - type-check: tsc --noEmit

**完了条件:**
- `npm run dev` でアプリケーションが起動する
- `npm run build` でエラーなくビルドできる
- `npm run type-check` でエラーがない
```

_Requirements: 4.1, 4.3_

---

### Task 1.2: Tailwind CSS セットアップとモバイルファースト設定

**プロンプト:**
```
Tailwind CSS 3.4+をインストールし、モバイルファースト設計の基本設定を行ってください。

**要件:**
1. 依存関係をインストール:
   - tailwindcss@^3.4.0
   - postcss@^8.4.0
   - autoprefixer@^10.4.0

2. Tailwind設定 (tailwind.config.js):
   - content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}']
   - theme.screens:
     - sm: '390px'  (iPhone 14基準)
     - md: '428px'  (iPhone 14 Pro Max基準)
     - lg: '768px'  (タブレット)
     - xl: '1024px' (デスクトップ)
   - theme.extend.spacing: 44px (最小タップ領域)
   - theme.extend.fontSize:
     - body: '16px'
     - button: '14px'
     - small: '12px'
   - darkMode: 'class'

3. グローバルスタイル (src/styles/index.css):
   - @tailwind base/components/utilities
   - モバイルファーストのリセットCSS
   - タッチ操作最適化 (touch-action, -webkit-tap-highlight-color)

4. App.tsxでCSSをインポート

**完了条件:**
- Tailwindクラスが正しく適用される
- ダークモード切り替えが動作する
- モバイルデバイスで表示確認
```

_Requirements: 4.1, 3.2_

---

### Task 1.3: ESLint + Prettier セットアップ

**プロンプト:**
```
ESLintとPrettierをセットアップして、コード品質を維持してください。

**要件:**
1. 依存関係をインストール:
   - eslint@^8.0.0
   - @typescript-eslint/parser@^6.0.0
   - @typescript-eslint/eslint-plugin@^6.0.0
   - eslint-plugin-react@^7.33.0
   - eslint-plugin-react-hooks@^4.6.0
   - prettier@^3.0.0
   - eslint-config-prettier@^9.0.0

2. ESLint設定 (.eslintrc.cjs):
   - TypeScript対応
   - React推奨ルール
   - Hooks検証
   - アクセシビリティルール (eslint-plugin-jsx-a11y)

3. Prettier設定 (.prettierrc.json):
   - printWidth: 100
   - tabWidth: 2
   - semi: true
   - singleQuote: true
   - trailingComma: 'es5'

4. .eslintignore, .prettierignore ファイル作成

5. package.json にスクリプト追加:
   - format: prettier --write "src/**/*.{ts,tsx}"
   - format:check: prettier --check "src/**/*.{ts,tsx}"

**完了条件:**
- `npm run lint` でエラーがない
- `npm run format` が正しく動作する
```

_Requirements: 4.3_

---

## Phase 2: 型定義とデータモデル

### Task 2.1: コアエンティティの型定義

**プロンプト:**
```
src/types/entities.ts を作成し、アプリケーションのコアエンティティの型を定義してください。

**要件:**
以下のインターフェースを定義:

1. Message:
   - id: string (UUID)
   - content: string
   - sender: 'user' | 'other'
   - type: 'text' | 'image' | 'stamp' | 'system'
   - timestamp: Date
   - customTimestamp?: Date
   - isRead: boolean
   - imageUrl?: string (Base64)
   - stampId?: string
   - order: number
   - createdAt: Date
   - updatedAt: Date

2. Profile:
   - userName: string
   - otherName: string
   - userAvatar?: string (Base64)
   - otherAvatar?: string (Base64)
   - onlineStatus: boolean

3. Platform:
   - type: 'line' | 'instagram' | 'twitter' | 'whatsapp' | 'messenger' | 'generic'

4. PlatformStyle:
   - platform: Platform
   - headerColor: string (HEX)
   - backgroundColor: string (HEX)
   - backgroundImage?: string (Base64)
   - userBubbleColor: string (HEX)
   - otherBubbleColor: string (HEX)
   - fontFamily: string
   - fontSize: number (px)
   - showTimestamp: boolean
   - timestampFormat: '12h' | '24h'
   - showDate: boolean

5. ExportSettings:
   - format: 'png' | 'jpeg' | 'json' | 'csv' | 'html'
   - resolution: 'social' | 'print' | 'custom'
   - customWidth?: number
   - customHeight?: number
   - quality?: number (60-100)
   - transparent?: boolean
   - rangeStart?: number
   - rangeEnd?: number

6. AppState:
   - messages: Message[]
   - profile: Profile
   - style: PlatformStyle
   - darkMode: boolean
   - previewDevice: 'mobile' | 'tablet' | 'desktop'
   - version: string

7. ValidationResult:
   - isValid: boolean
   - errors: ValidationError[]

8. ValidationError:
   - field: string
   - message: string

**完了条件:**
- すべての型がエクスポートされている
- 型チェックでエラーがない
- JSDocコメントが適切に記述されている
```

_Requirements: REQ-1, REQ-2, REQ-3, REQ-6, REQ-7_

---

### Task 2.2: ユーティリティ型とヘルパー型の定義

**プロンプト:**
```
src/types/utils.ts を作成し、アプリケーション全体で使用するユーティリティ型を定義してください。

**要件:**
1. StoredData:
   - appState: AppState
   - savedAt: string (ISO 8601)
   - version: string

2. ErrorCode (enum):
   - MSG_LIMIT_EXCEEDED
   - FILE_TOO_LARGE
   - INVALID_FILE_TYPE
   - EXPORT_FAILED
   - IMPORT_INVALID_JSON
   - STORAGE_QUOTA_EXCEEDED
   - CANVAS_RENDER_FAILED

3. ErrorSeverity (type):
   - 'info' | 'warning' | 'error' | 'critical'

4. DeviceType (type):
   - 'mobile' | 'tablet' | 'desktop'

5. SenderType (type):
   - 'user' | 'other'

6. MessageType (type):
   - 'text' | 'image' | 'stamp' | 'system'

7. ExportFormat (type):
   - 'png' | 'jpeg' | 'json' | 'csv' | 'html'

**完了条件:**
- すべての型がエクスポートされている
- entities.tsから型をインポートできる
```

_Requirements: 設計文書のエラーハンドリング、データモデル_

---

## Phase 3: 状態管理 (Zustand Stores)

### Task 3.1: MessageStore の実装

**プロンプト:**
```
Zustand 4.5+を使用して、src/stores/messageStore.ts を実装してください。

**要件:**
1. 依存関係をインストール:
   - zustand@^4.5.0
   - uuid@^9.0.0

2. MessageStore state:
   - messages: Message[]

3. MessageStore actions:
   - addMessage(content: string, sender: SenderType, type?: MessageType): void
   - updateMessage(id: string, updates: Partial<Message>): void
   - deleteMessage(id: string): void
   - reorderMessages(fromIndex: number, toIndex: number): void
   - clearMessages(): void
   - canAddMessage(): boolean

4. ビジネスルール:
   - 最大メッセージ数: 1000件
   - orderフィールドは自動採番
   - createdAt/updatedAtは自動設定
   - idはuuid()で生成
   - 1000件到達時は追加不可 (エラースロー)

5. LocalStorage永続化:
   - persistミドルウェア使用
   - key: 'sns-chat-messages'

**完了条件:**
- `npm run type-check` でエラーがない
- Storeが正しくエクスポートされている
```

_Requirements: REQ-1 (2.1.1 会話作成機能)_

---

### Task 3.2: StyleStore の実装

**プロンプト:**
```
src/stores/styleStore.ts を実装してください。

**要件:**
1. StyleStore state:
   - currentStyle: PlatformStyle
   - platform: Platform

2. StyleStore actions:
   - setPlatform(platform: Platform): void
   - updateStyle(updates: Partial<PlatformStyle>): void
   - resetToDefault(): void
   - loadPlatformPreset(platform: Platform): void

3. 6つのプラットフォームのデフォルトスタイル定義:
   - line: グリーン系
   - instagram: グラデーション (紫→オレンジ)
   - twitter: ブルー系
   - whatsapp: ティール系
   - messenger: ブルー系
   - generic: グレー系

4. LocalStorage永続化:
   - key: 'sns-chat-style'

**完了条件:**
- 6つのプリセットスタイルが定義されている
- setPlatform()でプリセットが自動適用される
```

_Requirements: REQ-2 (2.1.2 プラットフォーム選択), REQ-4 (外観カスタマイズ)_

---

### Task 3.3: ProfileStore の実装

**プロンプト:**
```
src/stores/profileStore.ts を実装してください。

**要件:**
1. ProfileStore state:
   - profile: Profile

2. ProfileStore actions:
   - updateProfile(updates: Partial<Profile>): void
   - setUserName(name: string): void
   - setOtherName(name: string): void
   - setUserAvatar(avatar: string | undefined): void
   - setOtherAvatar(avatar: string | undefined): void
   - toggleOnlineStatus(): void
   - resetProfile(): void

3. デフォルト値:
   - userName: 'あなた'
   - otherName: '相手'
   - onlineStatus: true

4. LocalStorage永続化:
   - key: 'sns-chat-profile'

**完了条件:**
- すべてのアクションが正しく動作する
```

_Requirements: REQ-3 (2.1.2 プロフィール設定)_

---

### Task 3.4: UIStore の実装

**プロンプト:**
```
src/stores/uiStore.ts を実装して、UI状態を管理してください。

**要件:**
1. UIStore state:
   - darkMode: boolean
   - previewDevice: DeviceType
   - isBottomSheetOpen: boolean
   - currentEditingMessageId: string | null
   - isExportDialogOpen: boolean

2. UIStore actions:
   - toggleDarkMode(): void
   - setPreviewDevice(device: DeviceType): void
   - openBottomSheet(): void
   - closeBottomSheet(): void
   - setEditingMessage(id: string | null): void
   - openExportDialog(): void
   - closeExportDialog(): void

3. LocalStorage永続化:
   - key: 'sns-chat-ui'
   - darkModeとpreviewDeviceのみ永続化

**完了条件:**
- UI状態が正しく管理される
```

_Requirements: REQ-9 (プレビュー機能), REQ-10 (モバイルUI)_

---

## Phase 4: Atoms コンポーネント

### Task 4.1: Button コンポーネント

**プロンプト:**
```
src/components/atoms/Button.tsx を実装してください。

**要件:**
1. Props:
   - variant: 'primary' | 'secondary' | 'danger' | 'ghost'
   - size: 'sm' | 'md' | 'lg'
   - disabled?: boolean
   - loading?: boolean
   - children: ReactNode
   - onClick?: () => void
   - className?: string

2. デザイン:
   - 最小タップ領域: 44×44px
   - ボーダー半径: 8px
   - フォントサイズ: 14px以上
   - ローディング時はSpinnerアイコン表示
   - disabled時は透明度50%

3. アクセシビリティ:
   - role="button"
   - aria-disabled属性
   - aria-busy属性 (loading時)

4. Tailwind CSS使用
   - hover/active/focus状態
   - ダークモード対応

**完了条件:**
- 4つのvariantが正しく表示される
- アクセシビリティ検証を通過
```

_Requirements: REQ-10 (モバイルUI), REQ-12 (アクセシビリティ)_

---

### Task 4.2: Input コンポーネント

**プロンプト:**
```
src/components/atoms/Input.tsx を実装してください。

**要件:**
1. Props:
   - type?: 'text' | 'email' | 'number'
   - value: string
   - onChange: (value: string) => void
   - placeholder?: string
   - disabled?: boolean
   - error?: string
   - label?: string
   - maxLength?: number
   - className?: string

2. デザイン:
   - 高さ: 44px以上
   - フォントサイズ: 16px (iOSズーム防止)
   - ボーダー: 1px solid
   - エラー時: 赤ボーダー

3. アクセシビリティ:
   - label要素とid属性の関連付け
   - aria-invalid (error時)
   - aria-describedby (error message)

4. 文字数カウンター (maxLength指定時)

**完了条件:**
- バリデーションが正しく動作する
- アクセシビリティ検証を通過
```

_Requirements: REQ-10, REQ-12_

---

### Task 4.3: Avatar コンポーネント

**プロンプト:**
```
src/components/atoms/Avatar.tsx を実装してください。

**要件:**
1. Props:
   - src?: string (Base64またはURL)
   - alt: string
   - size: 'sm' | 'md' | 'lg'
   - online?: boolean
   - className?: string

2. サイズ:
   - sm: 32px
   - md: 40px
   - lg: 48px

3. デフォルトアイコン:
   - 画像がない場合はイニシャル表示
   - 背景色はランダムまたはハッシュベース

4. オンラインステータス:
   - 右下に緑色のドット (online=true時)

5. アクセシビリティ:
   - alt属性必須
   - role="img"

**完了条件:**
- 3つのサイズが正しく表示される
- デフォルトアイコンが表示される
```

_Requirements: REQ-3 (プロフィール設定)_

---

### Task 4.4: Icon コンポーネント

**プロンプト:**
```
src/components/atoms/Icon.tsx を実装してください。

**要件:**
1. 依存関係:
   - lucide-react@^0.300.0

2. Props:
   - name: IconName (lucide-reactのアイコン名)
   - size?: number
   - color?: string
   - className?: string

3. 使用するアイコン:
   - Plus, Edit, Trash, Download, Upload, Settings
   - Image, MessageSquare, User, Check, X
   - ChevronDown, ChevronUp, Moon, Sun

4. アクセシビリティ:
   - aria-hidden="true" (装飾的な場合)
   - role="img" (意味のある場合)

**完了条件:**
- 各アイコンが正しく表示される
- サイズとカラーが適用される
```

_Requirements: 4.2 (ライブラリ)_

---

### Task 4.5: Badge と Spinner コンポーネント

**プロンプト:**
```
src/components/atoms/Badge.tsx と Spinner.tsx を実装してください。

**Badge要件:**
1. Props:
   - variant: 'info' | 'success' | 'warning' | 'error'
   - children: ReactNode
   - size?: 'sm' | 'md'

2. デザイン:
   - 小さなピル型
   - 背景色はvariantに応じて変化

**Spinner要件:**
1. Props:
   - size?: 'sm' | 'md' | 'lg'
   - color?: string

2. デザイン:
   - CSSアニメーション (回転)
   - アクセシビリティ: aria-label="Loading"

**完了条件:**
- BadgeとSpinnerが正しく動作する
```

_Requirements: UIコンポーネント基盤_

---

## Phase 5: Molecules コンポーネント

### Task 5.1: MessageBubble コンポーネント

**プロンプト:**
```
src/components/molecules/MessageBubble.tsx を実装してください。

**要件:**
1. Props:
   - message: Message
   - bubbleColor: string
   - showTimestamp: boolean
   - timestampFormat: '12h' | '24h'
   - onClick?: () => void

2. デザイン:
   - sender='user': 右寄せ、青系背景
   - sender='other': 左寄せ、グレー系背景
   - 最大幅: 75%
   - ボーダー半径: 16px
   - パディング: 12px 16px
   - type='image': 画像表示
   - type='stamp': スタンプ表示
   - type='system': 中央寄せ、薄いグレー背景

3. タイムスタンプ表示:
   - バブル下部に小さなテキスト
   - 12h: "3:45 PM"
   - 24h: "15:45"
   - Day.js使用

4. 依存関係:
   - dayjs@^1.11.0

5. 既読表示:
   - isRead=true: ダブルチェックマーク
   - isRead=false: シングルチェックマーク

**完了条件:**
- 4つのメッセージタイプすべてが正しく表示される
- タイムスタンプが正しくフォーマットされる
```

_Requirements: REQ-1, REQ-5 (追加コンテンツ)_

---

### Task 5.2: ColorPicker コンポーネント

**プロンプト:**
```
src/components/molecules/ColorPicker.tsx を実装してください。

**要件:**
1. Props:
   - value: string (HEX)
   - onChange: (color: string) => void
   - label: string
   - showAccessibilityWarning?: boolean

2. 機能:
   - プリセットカラー表示 (8色)
   - カスタム入力 (HEX形式)
   - カラーピッカーダイアログ

3. アクセシビリティ警告:
   - コントラスト比計算
   - WCAG AA基準未満の場合に警告表示
   - 警告アイコン + ツールチップ

4. デザイン:
   - カラースウォッチ (32×32px)
   - グリッドレイアウト

**完了条件:**
- カラー選択が正しく動作する
- アクセシビリティ警告が表示される
```

_Requirements: REQ-4 (外観カスタマイズ), REQ-12 (アクセシビリティ)_

---

### Task 5.3: FontSizeSlider コンポーネント

**プロンプト:**
```
src/components/molecules/FontSizeSlider.tsx を実装してください。

**要件:**
1. Props:
   - value: number (px)
   - onChange: (size: number) => void
   - min: number (デフォルト: 12)
   - max: number (デフォルト: 24)
   - step: number (デフォルト: 1)

2. 機能:
   - スライダー入力
   - 現在値表示 ("16px")
   - プレビューテキスト (現在のフォントサイズで表示)

3. アクセシビリティ:
   - aria-label
   - aria-valuemin/max/now

4. デザイン:
   - スライダーバー
   - タッチフレンドリー (ハンドル44×44px)

**完了条件:**
- スライダーが正しく動作する
- プレビューが更新される
```

_Requirements: REQ-4 (外観カスタマイズ)_

---

### Task 5.4: PlatformSelector コンポーネント

**プロンプト:**
```
src/components/molecules/PlatformSelector.tsx を実装してください。

**要件:**
1. Props:
   - selected: Platform
   - onChange: (platform: Platform) => void

2. 6つのプラットフォーム:
   - LINE
   - Instagram
   - Twitter
   - WhatsApp
   - Messenger
   - Generic

3. デザイン:
   - グリッドレイアウト (2列)
   - 各プラットフォームのロゴアイコン
   - 選択中: ボーダー強調
   - ホバー: 背景色変化

4. アクセシビリティ:
   - role="radiogroup"
   - 各オプション: role="radio", aria-checked

**完了条件:**
- 6つのプラットフォームが選択可能
- 選択状態が視覚的に明確
```

_Requirements: REQ-2 (プラットフォーム選択)_

---

### Task 5.5: ImageUploader と TimestampDisplay コンポーネント

**プロンプト:**
```
src/components/molecules/ImageUploader.tsx と TimestampDisplay.tsx を実装してください。

**ImageUploader要件:**
1. Props:
   - onUpload: (base64: string) => void
   - maxSize?: number (デフォルト: 5MB)
   - accept?: string (デフォルト: 'image/*')

2. 機能:
   - ファイル選択ボタン
   - ドラッグ&ドロップエリア
   - プレビュー表示
   - バリデーション (サイズ、形式)

3. エラーハンドリング:
   - FILE_TOO_LARGE
   - INVALID_FILE_TYPE

**TimestampDisplay要件:**
1. Props:
   - timestamp: Date
   - format: '12h' | '24h'
   - showDate?: boolean

2. 表示形式:
   - 12h + 日付: "Jan 15, 3:45 PM"
   - 24h + 日付: "1月15日 15:45"
   - 時刻のみ: "3:45 PM"

**完了条件:**
- 画像アップロードが正しく動作する
- タイムスタンプが正しくフォーマットされる
```

_Requirements: REQ-5 (画像メッセージ), REQ-5 (タイムスタンプ)_

---

## Phase 6: Organisms コンポーネント

### Task 6.1: ChatHeader コンポーネント

**プロンプト:**
```
src/components/organisms/ChatHeader.tsx を実装してください。

**要件:**
1. Props:
   - profile: Profile
   - headerColor: string
   - onBackClick?: () => void

2. レイアウト:
   - 高さ: 60px
   - 左: 戻るボタン (optional)
   - 中央: アバター + 名前 + オンラインステータス
   - 右: メニューボタン (3点ドット)

3. オンラインステータス:
   - profile.onlineStatus=true: "オンライン"
   - profile.onlineStatus=false: "最終接続: xx分前"

4. レスポンシブ:
   - モバイル: 幅100%
   - デスクトップ: 最大幅428px

5. デザイン:
   - 背景色: headerColor
   - テキストカラー: 白または黒 (コントラスト自動計算)

**完了条件:**
- ヘッダーが正しく表示される
- オンラインステータスが更新される
```

_Requirements: REQ-3 (プロフィール), REQ-10 (モバイルUI)_

---

### Task 6.2: MessageList コンポーネント

**プロンプト:**
```
src/components/organisms/MessageList.tsx を実装してください。

**要件:**
1. 依存関係:
   - react-window@^1.8.10

2. Props:
   - messages: Message[]
   - onEdit: (id: string) => void
   - onDelete: (id: string) => void
   - onReorder: (fromIndex: number, toIndex: number) => void
   - bubbleColor: string
   - showTimestamp: boolean
   - timestampFormat: '12h' | '24h'

3. 仮想スクロール:
   - react-windowのFixedSizeList使用
   - 500件以上で有効化
   - itemSize: 80px (動的計算推奨)

4. インタラクション:
   - タップ: 編集モード
   - 長押し: コンテキストメニュー (編集/削除)
   - スワイプ: 削除アクション

5. ドラッグ&ドロップ:
   - @dnd-kit/core使用 (Phase 10で実装)

6. パフォーマンス:
   - React.memo使用
   - MessageBubbleをメモ化

**完了条件:**
- 1000件のメッセージが滑らかにスクロールする
- 仮想スクロールが正しく動作する
```

_Requirements: REQ-1 (メッセージ管理), REQ-11 (パフォーマンス)_

---

### Task 6.3: EditorPanel コンポーネント

**プロンプト:**
```
src/components/organisms/EditorPanel.tsx を実装してください。

**要件:**
1. Props:
   - mode: 'add' | 'edit'
   - initialValue?: Message
   - onSubmit: (content: string, type: MessageType) => void
   - onCancel: () => void

2. フォーム要素:
   - テキスト入力 (Textarea)
   - 送信者選択 (ラジオボタン: 自分/相手)
   - メッセージタイプ選択 (テキスト/画像/スタンプ/システム)
   - 画像アップロード (type=image時)
   - タイムスタンプカスタマイズ (オプション)

3. バリデーション:
   - 空のメッセージ不可
   - 最大10,000文字
   - 画像サイズ5MB以下

4. UX:
   - リアルタイムプレビュー
   - 送信ボタン: 右下固定
   - キャンセルボタン: 左下固定

5. アクセシビリティ:
   - フォームラベル
   - エラーメッセージ

**完了条件:**
- メッセージ追加/編集が正しく動作する
- バリデーションが動作する
```

_Requirements: REQ-1 (メッセージ追加/編集)_

---

### Task 6.4: BottomSheet コンポーネント

**プロンプト:**
```
src/components/organisms/BottomSheet.tsx を実装してください。

**要件:**
1. 依存関係:
   - @use-gesture/react@^10.3.0

2. Props:
   - isOpen: boolean
   - onClose: () => void
   - children: ReactNode
   - snapPoints?: number[] (デフォルト: [300, 600])

3. 機能:
   - 下からスライドアップ
   - スワイプダウンで閉じる
   - オーバーレイタップで閉じる
   - スナップポイント対応

4. アニメーション:
   - spring animation (react-spring使用可)
   - スムーズな開閉

5. アクセシビリティ:
   - role="dialog"
   - aria-modal="true"
   - フォーカストラップ

**完了条件:**
- BottomSheetが正しくアニメーションする
- スワイプ操作が動作する
```

_Requirements: REQ-10 (モバイルUI)_

---

### Task 6.5: ExportDialog コンポーネント

**プロンプト:**
```
src/components/organisms/ExportDialog.tsx を実装してください。

**要件:**
1. Props:
   - isOpen: boolean
   - onExport: (settings: ExportSettings) => Promise<void>
   - onCancel: () => void

2. 設定オプション:
   - フォーマット選択: PNG/JPEG/JSON/CSV/HTML
   - 解像度プリセット: SNS用/印刷用/カスタム
   - カスタム幅/高さ (カスタム時)
   - JPEG画質 (JPEG時)
   - 透過背景 (PNG時)
   - 範囲指定 (開始/終了メッセージ)

3. プレビュー:
   - 選択した設定でのプレビュー表示
   - 推定ファイルサイズ

4. エクスポートボタン:
   - ローディング状態
   - エラーハンドリング

5. アクセシビリティ:
   - ダイアログのフォーカス管理
   - キーボードナビゲーション

**完了条件:**
- エクスポート設定が正しく動作する
- ダイアログが正しく開閉する
```

_Requirements: REQ-6 (画像エクスポート), REQ-7 (データエクスポート)_

---

### Task 6.6: StyleEditor コンポーネント

**プロンプト:**
```
src/components/organisms/StyleEditor.tsx を実装してください。

**要件:**
1. Props:
   - style: PlatformStyle
   - onChange: (style: Partial<PlatformStyle>) => void

2. 編集可能な項目:
   - ヘッダーカラー (ColorPicker)
   - 背景色 (ColorPicker)
   - 背景画像 (ImageUploader)
   - 自分のバブル色 (ColorPicker)
   - 相手のバブル色 (ColorPicker)
   - フォントサイズ (FontSizeSlider)
   - タイムスタンプ表示 (Toggle)
   - タイムスタンプ形式 (Select: 12h/24h)
   - 日付表示 (Toggle)

3. レイアウト:
   - セクション分け (色/フォント/タイムスタンプ)
   - アコーディオン形式

4. リアルタイムプレビュー:
   - 変更が即座に反映

5. リセットボタン:
   - デフォルトに戻す

**完了条件:**
- すべての設定が正しく動作する
- リアルタイムプレビューが動作する
```

_Requirements: REQ-4 (外観カスタマイズ)_

---

## Phase 7: Templates と Pages

### Task 7.1: MobileLayout と DesktopLayout テンプレート

**プロンプト:**
```
src/components/templates/MobileLayout.tsx と DesktopLayout.tsx を実装してください。

**MobileLayout要件:**
1. Props:
   - header: ReactNode
   - preview: ReactNode
   - controls: ReactNode

2. レイアウト:
   - 幅: 100% (最大428px)
   - 高さ: 100vh
   - ヘッダー: 60px固定
   - プレビュー: flex-grow
   - コントロール: BottomSheet

3. レスポンシブ:
   - 390px以下: full width
   - 391-428px: centered

**DesktopLayout要件:**
1. Props:
   - children: ReactNode

2. レイアウト:
   - 画面中央にスマホサイズ (390px)
   - 左右に余白 (グラデーション背景)
   - オプション: スマホフレーム表示

3. デザイン:
   - 背景: ぼかし効果またはグラデーション
   - 影: デバイスに深度を追加

**完了条件:**
- モバイルレイアウトが正しく動作する
- デスクトップレイアウトが正しく動作する
```

_Requirements: REQ-10 (モバイルファースト), 5.3 (PC表示レイアウト)_

---

### Task 7.2: MainEditor ページ

**プロンプト:**
```
src/components/pages/MainEditor.tsx を実装してください。

**要件:**
1. すべてのストアを統合:
   - useMessageStore()
   - useStyleStore()
   - useProfileStore()
   - useUIStore()

2. レイアウト構成:
   - ChatHeader (ヘッダー)
   - MessageList (プレビューエリア)
   - FloatingActionButton (メッセージ追加)
   - BottomSheet + EditorPanel (編集パネル)
   - ExportDialog (エクスポートダイアログ)
   - StyleEditor (スタイル編集パネル)

3. イベントハンドリング:
   - onAddMessage: BottomSheet開く
   - onEditMessage: EditorPanelに既存データ渡す
   - onDeleteMessage: 確認ダイアログ → 削除
   - onExport: ExportDialog開く

4. レスポンシブ:
   - モバイル: MobileLayout
   - デスクトップ: DesktopLayout

5. デバイス検出:
   - window.innerWidth < 768: モバイル
   - window.innerWidth >= 768: デスクトップ

**完了条件:**
- アプリケーション全体が統合される
- すべての機能が動作する
```

_Requirements: 全要件の統合_

---

### Task 7.3: App.tsx の更新

**プロンプト:**
```
src/App.tsx を更新して、MainEditorページを統合してください。

**要件:**
1. ダークモード設定:
   - useUIStore().darkMode
   - <html>タグにclass="dark"を追加/削除

2. グローバルエラーハンドリング:
   - ErrorBoundary追加
   - window.onerror
   - window.onunhandledrejection

3. Suspense:
   - React.lazy使用
   - Loading fallback

4. 初期化処理:
   - LocalStorageからデータ読み込み
   - バージョンマイグレーション

**完了条件:**
- アプリケーションが正しく起動する
- エラーハンドリングが動作する
```

_Requirements: アプリケーション統合_

---

## Phase 8: サービス層

### Task 8.1: MessageService の実装

**プロンプト:**
```
src/services/MessageService.ts を実装してください。

**要件:**
1. クラスメソッド:
   - addMessage(content: string, sender: SenderType, type?: MessageType): Message
   - updateMessage(id: string, updates: Partial<Message>): void
   - deleteMessage(id: string): void
   - reorderMessage(fromIndex: number, toIndex: number): void
   - canAddMessage(): boolean
   - validateMessage(content: string): ValidationResult

2. ビジネスロジック:
   - メッセージ数制限 (1000件)
   - バリデーション (空文字、最大10,000文字)
   - XSS対策 (SecurityServiceと統合)
   - タイムスタンプ自動設定

3. エラーハンドリング:
   - MSG_LIMIT_EXCEEDED
   - バリデーションエラー

**完了条件:**
- すべてのメソッドが正しく動作する
- バリデーションが動作する
```

_Requirements: REQ-1 (メッセージ管理)_

---

### Task 8.2: SecurityService の実装

**プロンプト:**
```
src/services/SecurityService.ts を実装してください。

**要件:**
1. 依存関係:
   - dompurify@^3.0.0

2. クラスメソッド:
   - sanitizeInput(input: string): string
   - sanitizeForDisplay(input: string): string
   - validateFileType(file: File, allowedTypes: string[]): boolean
   - validateFileSize(file: File, maxSize: number): boolean

3. XSS対策:
   - DOMPurify.sanitize()
   - HTMLタグのエスケープ
   - 絵文字・改行のみ許可 (display時)

4. ファイルバリデーション:
   - MIMEタイプチェック
   - サイズチェック (5MB)

**テストケース (先に書く):**
```typescript
// SecurityService.test.ts
describe('SecurityService', () => {
  it('should sanitize XSS attack', () => {
    const input = '<script>alert("XSS")</script>';
    const result = service.sanitizeInput(input);
    expect(result).not.toContain('<script>');
  });

  it('should allow safe content', () => {
    const input = 'Hello 👋\nWorld';
    const result = service.sanitizeForDisplay(input);
    expect(result).toContain('Hello');
    expect(result).toContain('World');
  });
});
```

**完了条件:**
- XSS攻撃が防御される
- テストが通過する
```

_Requirements: REQ-13 (セキュリティ - XSS対策)_

---

### Task 8.3: ExportService の実装

**プロンプト:**
```
src/services/ExportService.ts を実装してください。

**要件:**
1. 依存関係:
   - html2canvas@^1.4.0
   - file-saver@^2.0.0

2. クラスメソッド:
   - exportImage(settings: ExportSettings): Promise<Blob>
   - exportJSON(): string
   - exportCSV(): string
   - exportHTML(): string
   - downloadFile(blob: Blob, filename: string): void

3. exportImage実装:
   - html2canvasでプレビューをキャプチャ
   - 解像度プリセット:
     - social: 1080×1920
     - print: 2480×3508 (A4, 300dpi)
     - custom: ユーザー指定
   - JPEG画質: 60-100
   - PNG透過背景対応

4. exportJSON実装:
   - AppState全体をJSON化
   - Date → ISO 8601形式
   - Base64画像を含む

5. exportCSV実装:
   - ヘッダー: ID, Content, Sender, Type, Timestamp
   - UTF-8 BOM付き
   - カンマ・改行エスケープ

6. exportHTML実装:
   - 自己完結型HTML (インラインCSS)
   - プレビューと同じ見た目

**完了条件:**
- 各フォーマットが正しくエクスポートされる
- ファイルダウンロードが動作する
```

_Requirements: REQ-6 (画像エクスポート), REQ-7 (データエクスポート)_

---

### Task 8.4: ImportService の実装

**プロンプト:**
```
src/services/ImportService.ts を実装してください。

**要件:**
1. クラスメソッド:
   - importJSON(file: File): Promise<void>
   - importCSV(file: File): Promise<void>
   - loadTemplate(templateId: string): void
   - validateJSON(data: unknown): ValidationResult

2. importJSON実装:
   - FileReader使用
   - JSON.parse()
   - スキーマバリデーション
   - マイグレーション処理
   - ストア更新

3. importCSV実装:
   - CSVパーサー (Papa Parse推奨)
   - 列マッピング
   - メッセージ作成

4. テンプレート:
   - 3つのプリセット会話
   - 'demo-conversation': サンプル会話
   - 'empty': 空の会話
   - 'tutorial': チュートリアル会話

5. エラーハンドリング:
   - IMPORT_INVALID_JSON
   - バリデーションエラー

**完了条件:**
- JSON/CSVインポートが動作する
- テンプレートが読み込まれる
```

_Requirements: REQ-8 (インポート機能)_

---

## Phase 9: テーマとスタイリング

### Task 9.1: 6つのプラットフォームスタイルの定義

**プロンプト:**
```
src/styles/platformThemes.ts を作成し、6つのSNSプラットフォームのスタイルを定義してください。

**要件:**
各プラットフォームのPlatformStyleオブジェクト:

1. **LINE**:
   - headerColor: '#06C755' (LINEグリーン)
   - backgroundColor: '#FFFFFF'
   - userBubbleColor: '#06C755'
   - otherBubbleColor: '#E8E8E8'
   - fontFamily: 'Hiragino Sans, sans-serif'
   - fontSize: 16

2. **Instagram**:
   - headerColor: linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)
   - backgroundColor: '#FFFFFF'
   - userBubbleColor: '#0095F6'
   - otherBubbleColor: '#EFEFEF'
   - fontFamily: 'Helvetica Neue, sans-serif'
   - fontSize: 14

3. **Twitter**:
   - headerColor: '#1DA1F2' (Twitterブルー)
   - backgroundColor: '#FFFFFF'
   - userBubbleColor: '#1DA1F2'
   - otherBubbleColor: '#E1E8ED'
   - fontFamily: 'Helvetica Neue, sans-serif'
   - fontSize: 15

4. **WhatsApp**:
   - headerColor: '#25D366' (WhatsAppグリーン)
   - backgroundColor: '#ECE5DD' (チャット背景)
   - userBubbleColor: '#DCF8C6'
   - otherBubbleColor: '#FFFFFF'
   - fontFamily: 'Roboto, sans-serif'
   - fontSize: 14

5. **Messenger**:
   - headerColor: '#0084FF' (Messengerブルー)
   - backgroundColor: '#FFFFFF'
   - userBubbleColor: '#0084FF'
   - otherBubbleColor: '#E4E6EB'
   - fontFamily: 'Helvetica Neue, sans-serif'
   - fontSize: 15

6. **Generic**:
   - headerColor: '#6B7280' (グレー)
   - backgroundColor: '#F3F4F6'
   - userBubbleColor: '#3B82F6' (青)
   - otherBubbleColor: '#E5E7EB' (グレー)
   - fontFamily: 'Inter, sans-serif'
   - fontSize: 16

**完了条件:**
- 6つのテーマがエクスポートされている
- StyleStore.loadPlatformPreset()で使用される
```

_Requirements: REQ-2 (プラットフォームスタイル)_

---

### Task 9.2: ダークモード対応

**プロンプト:**
```
ダークモードのスタイル定義を追加してください。

**要件:**
1. src/styles/darkThemes.ts を作成
   - 各プラットフォームのダークバージョン
   - 背景色: ダーク系
   - テキストカラー: 明るい系
   - バブル色: 暗めの調整

2. Tailwind設定更新:
   - dark:クラスの活用
   - カスタムダークカラー

3. コンポーネント更新:
   - darkMode状態に応じてclass切り替え
   - <html class="dark">

**完了条件:**
- ダークモードが正しく動作する
- すべてのプラットフォームでダークモード対応
```

_Requirements: REQ-9 (ダークモード対応)_

---

### Task 9.3: アクセシビリティ対応スタイル

**プロンプト:**
```
WCAG 2.1 Level AA準拠のアクセシビリティスタイルを実装してください。

**要件:**
1. コントラスト比計算ユーティリティ:
   - src/utils/contrast.ts
   - calculateContrast(fg: string, bg: string): number
   - meetsWCAGAA(contrast: number): boolean

2. フォーカスインジケーター:
   - focus-visible:outline
   - 2px solid, 高コントラスト色

3. タッチターゲットサイズ:
   - 最小44×44px
   - Tailwind utility: min-h-[44px] min-w-[44px]

4. リーダビリティ:
   - line-height: 1.5
   - letter-spacing: normal
   - max-width: 75ch (本文)

**完了条件:**
- WCAG AA基準を満たす
- Lighthouse Accessibility Score > 90
```

_Requirements: REQ-12 (アクセシビリティ)_

---

## Phase 10: インタラクションとジェスチャー

### Task 10.1: ドラッグ&ドロップによるメッセージ並び替え

**プロンプト:**
```
@dnd-kit/coreを使用して、メッセージのドラッグ&ドロップ並び替えを実装してください。

**要件:**
1. 依存関係:
   - @dnd-kit/core@^6.1.0
   - @dnd-kit/sortable@^8.0.0

2. MessageList更新:
   - DndContext追加
   - SortableContextでメッセージラップ
   - onDragEnd: reorderMessages()

3. タッチデバイス対応:
   - TouchSensor有効化
   - 長押しで開始 (500ms)

4. ビジュアルフィードバック:
   - ドラッグ中: 不透明度50%
   - ドロップゾーン: ボーダー表示

5. アクセシビリティ:
   - キーボード操作対応 (KeyboardSensor)
   - aria-grabbed属性

**完了条件:**
- メッセージが正しく並び替えられる
- タッチデバイスで動作する
```

_Requirements: REQ-1 (メッセージ並び替え)_

---

### Task 10.2: スワイプ操作によるメッセージ削除

**プロンプト:**
```
@use-gesture/reactを使用して、スワイプ操作を実装してください。

**要件:**
1. MessageBubbleにスワイプ機能追加:
   - 左スワイプ: 削除ボタン表示
   - 右スワイプ: 編集ボタン表示 (optional)

2. useSwipe hook:
   - threshold: 50px
   - velocity考慮
   - スワイプ方向検出

3. アニメーション:
   - スムーズなスライド
   - バウンスバック

4. 確認ダイアログ:
   - 削除前に確認
   - "元に戻す" オプション (optional)

**完了条件:**
- スワイプ操作が正しく動作する
- 削除が正常に実行される
```

_Requirements: 5.6 (スワイプ操作)_

---

### Task 10.3: 長押し操作によるコンテキストメニュー

**プロンプト:**
```
長押し操作でコンテキストメニューを表示してください。

**要件:**
1. useLongPress hook:
   - 閾値: 500ms
   - touchstart → touchend判定
   - 移動キャンセル (10px以内)

2. コンテキストメニュー:
   - 編集
   - 削除
   - コピー
   - タイムスタンプ変更

3. メニュー位置:
   - タップ位置の近く
   - 画面外はみ出し防止

4. アクセシビリティ:
   - role="menu"
   - キーボードナビゲーション

**完了条件:**
- 長押しでメニューが表示される
- すべてのアクションが動作する
```

_Requirements: 5.6 (長押し操作)_

---

## Phase 11: パフォーマンス最適化

### Task 11.1: React.memo によるコンポーネント最適化

**プロンプト:**
```
パフォーマンスクリティカルなコンポーネントをReact.memoで最適化してください。

**対象コンポーネント:**
1. MessageBubble
2. MessageList
3. ChatHeader
4. EditorPanel

**要件:**
1. React.memo()でラップ
2. カスタム比較関数 (必要な場合)
3. useCallback/useMemoの適切な使用

**検証:**
- React DevTools Profilerで計測
- 不要な再レンダリングがないことを確認

**完了条件:**
- 再レンダリング回数が50%以上削減
```

_Requirements: REQ-11 (パフォーマンス)_

---

### Task 11.2: LocalStorage 書き込みのデバウンス

**プロンプト:**
```
LocalStorage書き込みをデバウンス処理で最適化してください。

**要件:**
1. src/utils/debounce.ts:
   - debounce()関数
   - 遅延: 300ms

2. Zustandミドルウェア:
   - persist()にthrottleオプション
   - 300ms間隔で書き込み

3. メモリキャッシュ:
   - 頻繁な読み込みはメモリから
   - 書き込みのみデバウンス

**完了条件:**
- LocalStorage書き込み頻度が削減される
- 100ms応答要件を満たす
```

_Requirements: REQ-11 (パフォーマンス - 100ms応答)_

---

### Task 11.3: 画像最適化とレイジーローディング

**プロンプト:**
```
画像の読み込みとレンダリングを最適化してください。

**要件:**
1. 画像圧縮:
   - アップロード時にリサイズ
   - 最大幅: 1080px
   - JPEG品質: 85

2. レイジーローディング:
   - <img loading="lazy">
   - Intersection Observer使用

3. プレースホルダー:
   - ブラー画像 (LQIP)
   - スケルトンローダー

4. Base64最適化:
   - 100KB以下: Base64
   - 100KB以上: Object URL

**完了条件:**
- 画像読み込みが高速化される
- 初期読み込み時間 < 3秒
```

_Requirements: REQ-11 (パフォーマンス - 3秒読み込み)_

---

### Task 11.4: バンドルサイズ最適化

**プロンプト:**
```
バンドルサイズを最適化してください。

**要件:**
1. Vite設定更新:
   - rollup-plugin-visualizer
   - manualChunks設定
   - treeshaking有効化

2. コード分割:
   - React.lazy()
   - dynamic import()
   - ルートレベル分割 (必要に応じて)

3. 依存関係最適化:
   - lodash → lodash-es (tree-shakable)
   - moment → Day.js (軽量)
   - 未使用ライブラリの削除

4. ターゲット:
   - Gzip後 < 500KB
   - 個別チャンク < 200KB

**完了条件:**
- バンドルサイズ < 500KB (gzip)
- Lighthouse Performance Score > 90
```

_Requirements: REQ-11 (パフォーマンス)_

---

## Phase 12: テスト実装

### Task 12.1: 単体テストセットアップとStoreテスト

**プロンプト:**
```
Vitestをセットアップし、Zustand Storeの単体テストを書いてください。

**要件:**
1. 依存関係:
   - vitest@^1.0.0
   - @testing-library/react@^14.0.0
   - @testing-library/jest-dom@^6.0.0

2. Vitest設定 (vite.config.ts):
   - test.globals: true
   - test.environment: 'jsdom'
   - test.setupFiles: './src/tests/setup.ts'

3. テスト対象:
   - messageStore.test.ts
   - styleStore.test.ts
   - profileStore.test.ts
   - uiStore.test.ts

4. 各Storeのテストケース:
   - 初期状態
   - 各アクション
   - エッジケース (制限、エラー)

**完了条件:**
- すべてのStoreテストが通過する
- カバレッジ > 80%
```

_Requirements: 4.3 (テスト)_

---

### Task 12.2: コンポーネント単体テスト

**プロンプト:**
```
Atoms/Molecules/Organismsコンポーネントの単体テストを書いてください。

**テスト対象 (優先度順):**
1. MessageBubble.test.tsx
2. Button.test.tsx
3. Input.test.tsx
4. ColorPicker.test.tsx
5. EditorPanel.test.tsx
6. MessageList.test.tsx

**各テストケース:**
- レンダリング確認
- Props受け渡し
- ユーザーインタラクション (click, change)
- アクセシビリティ (aria属性)
- エッジケース

**完了条件:**
- すべてのコンポーネントテストが通過する
- カバレッジ > 80%
```

_Requirements: 4.3 (テスト)_

---

### Task 12.3: サービス層の単体テスト

**プロンプト:**
```
サービスクラスの単体テストを書いてください。

**テスト対象:**
1. MessageService.test.ts
2. SecurityService.test.ts
3. ExportService.test.ts
4. ImportService.test.ts

**SecurityServiceテストケース例:**
```typescript
describe('SecurityService', () => {
  it('should sanitize XSS attack', () => {
    const input = '<script>alert("XSS")</script>';
    const result = service.sanitizeInput(input);
    expect(result).not.toContain('<script>');
  });

  it('should validate file type', () => {
    const validFile = new File([''], 'test.png', { type: 'image/png' });
    const invalidFile = new File([''], 'test.exe', { type: 'application/exe' });
    expect(service.validateFileType(validFile, ['image/png'])).toBe(true);
    expect(service.validateFileType(invalidFile, ['image/png'])).toBe(false);
  });
});
```

**完了条件:**
- すべてのサービステストが通過する
- カバレッジ > 80%
```

_Requirements: 4.3 (テスト), REQ-13 (セキュリティ)_

---

### Task 12.4: E2Eテスト (Playwright)

**プロンプト:**
```
Playwrightを使用してE2Eテストを実装してください。

**要件:**
1. 依存関係:
   - @playwright/test@^1.40.0

2. Playwright設定 (playwright.config.ts):
   - baseURL: 'http://localhost:5173'
   - projects: chromium, webkit (mobile)
   - use.viewport: { width: 390, height: 844 }

3. テストシナリオ:

**e2e/message-flow.spec.ts:**
- メッセージ追加フロー
- メッセージ編集フロー
- メッセージ削除フロー
- メッセージ並び替えフロー

**e2e/export.spec.ts:**
- PNG画像エクスポート
- JSON データエクスポート
- CSV データエクスポート

**e2e/style.spec.ts:**
- プラットフォーム変更
- カラーカスタマイズ
- ダークモード切り替え

**e2e/performance.spec.ts:**
- 100ms応答要件 (メッセージ追加)
- 1000件メッセージ処理

4. アクセシビリティテスト:
   - axe-core統合
   - WCAG AA基準検証

**完了条件:**
- すべてのE2Eテストが通過する
- パフォーマンス要件を満たす
```

_Requirements: 4.3 (テスト), REQ-11 (パフォーマンス), REQ-12 (アクセシビリティ)_

---

## Phase 13: 統合とアクセシビリティ

### Task 13.1: キーボードナビゲーション対応

**プロンプト:**
```
すべてのインタラクティブ要素にキーボードナビゲーションを実装してください。

**要件:**
1. フォーカス管理:
   - tabindex属性
   - focus-visible スタイル
   - フォーカストラップ (ダイアログ)

2. キーボードショートカット:
   - Ctrl/Cmd + N: 新規メッセージ
   - Ctrl/Cmd + S: エクスポート
   - Esc: ダイアログ閉じる
   - ↑/↓: メッセージ選択
   - Enter: 編集モード

3. スクリーンリーダー対応:
   - aria-label
   - aria-describedby
   - role属性
   - live regions

**完了条件:**
- キーボードのみで全機能が使える
- スクリーンリーダーで動作確認
```

_Requirements: REQ-12 (アクセシビリティ)_

---

### Task 13.2: エラーハンドリングと通知システム

**プロンプト:**
```
グローバルエラーハンドリングとトースト通知を実装してください。

**要件:**
1. 依存関係:
   - react-hot-toast@^2.4.0

2. src/utils/ErrorHandler.ts:
   - handleError(error: AppError): void
   - notify(message: string, type: 'success' | 'error' | 'warning'): void

3. エラーカテゴリ別処理:
   - MSG_LIMIT_EXCEEDED → 警告トースト
   - FILE_TOO_LARGE → エラートースト
   - STORAGE_QUOTA_EXCEEDED → クリティカル警告

4. ErrorBoundary コンポーネント:
   - アプリクラッシュ時のフォールバックUI
   - エラー詳細表示
   - リセットボタン

**完了条件:**
- すべてのエラーが適切に処理される
- ユーザーにわかりやすい通知が表示される
```

_Requirements: エラーハンドリング戦略_

---

### Task 13.3: データマイグレーションシステム

**プロンプト:**
```
LocalStorageデータのバージョン管理とマイグレーションを実装してください。

**要件:**
1. src/utils/migration.ts:
   - migrateData(storedData: StoredData): AppState
   - migrations: Record<string, (oldState: any) => any>

2. マイグレーション関数:
   - v1.0.0 → v1.1.0: darkMode, previewDevice追加
   - v1.1.0 → v1.2.0: 新しいフィールド追加 (将来)

3. 起動時のマイグレーション:
   - App.tsxのuseEffect
   - バージョン比較
   - 自動マイグレーション実行
   - エラー時は初期化 + 警告

4. バックアップ:
   - マイグレーション前にバックアップ
   - ローカルストレージに保存

**完了条件:**
- データマイグレーションが正しく動作する
- バージョンアップ時にデータが保持される
```

_Requirements: データマイグレーション戦略_

---

### Task 13.4: ブラウザ互換性テストとPolyfill

**プロンプト:**
```
ブラウザ互換性を確保してください。

**要件:**
1. ターゲットブラウザ:
   - Chrome (最新2バージョン)
   - Firefox (最新2バージョン)
   - Safari (最新2バージョン)
   - Edge (最新2バージョン)

2. Polyfill (必要に応じて):
   - core-js
   - regenerator-runtime

3. テスト:
   - BrowserStack or Sauce Labs
   - 各ブラウザでE2E実行

4. CSS互換性:
   - Autoprefixer (既存)
   - ベンダープレフィックス

5. 機能検出:
   - localStorage対応チェック
   - canvas対応チェック
   - 非対応時のフォールバック

**完了条件:**
- すべての対象ブラウザで動作する
- 互換性テストが通過する
```

_Requirements: REQ-14 (ブラウザ互換性)_

---

### Task 13.5: パフォーマンス検証とLighthouse最適化

**プロンプト:**
```
Lighthouseスコアを最適化してください。

**要件:**
1. Lighthouse CI設定:
   - GitHub Actions統合
   - Performance > 90
   - Accessibility > 90
   - Best Practices > 90
   - SEO > 80

2. Core Web Vitals:
   - LCP < 2.5秒
   - FID < 100ms
   - CLS < 0.1

3. 最適化項目:
   - 画像最適化 (既存)
   - バンドルサイズ削減 (既存)
   - Critical CSS インライン化
   - プリロード/プリフェッチ

4. PWA対応 (optional):
   - Service Worker
   - manifest.json
   - オフライン対応

**完了条件:**
- Lighthouse Score > 90 (すべてのカテゴリ)
- Core Web Vitals を満たす
```

_Requirements: REQ-11 (パフォーマンス要件)_

---

### Task 13.6: 最終統合テストとデプロイ準備

**プロンプト:**
```
本番デプロイの準備を行ってください。

**要件:**
1. 環境変数設定:
   - .env.production
   - VITE_APP_VERSION
   - VITE_APP_NAME

2. ビルド最適化:
   - npm run build
   - dist/フォルダ確認
   - サイズ確認

3. デプロイ設定:
   - vercel.json or netlify.toml
   - セキュリティヘッダー
   - リダイレクト設定

4. CI/CD パイプライン:
   - .github/workflows/deploy.yml
   - Lint → Test → Build → Deploy

5. ドキュメント:
   - README.md
   - CONTRIBUTING.md
   - LICENSE

**完了条件:**
- 本番ビルドが成功する
- デプロイ設定が完了する
- ドキュメントが整備される
```

_Requirements: デプロイメント戦略_

---

## Task Completion Checklist

各フェーズ完了時に以下を確認:

### Phase 1-3: 基盤
- [ ] プロジェクトが正常にビルドされる
- [ ] Lint/TypeCheckがエラーなし
- [ ] Storeが正しく動作する

### Phase 4-7: UI実装
- [ ] すべてのコンポーネントが表示される
- [ ] レスポンシブデザインが動作する
- [ ] アクセシビリティ基準を満たす

### Phase 8-10: 機能実装
- [ ] メッセージ追加/編集/削除が動作する
- [ ] エクスポート/インポートが動作する
- [ ] ジェスチャー操作が動作する

### Phase 11-13: 最適化と品質
- [ ] パフォーマンス要件を満たす
- [ ] すべてのテストが通過する
- [ ] Lighthouseスコア > 90

---

## Implementation Notes

**開発順序:**
1. 依存するタスクから順に実装
2. テスト駆動開発 (可能な箇所)
3. 各Phase完了後に動作確認

**コーディング規約:**
- TypeScript strict mode
- ESLint推奨ルール遵守
- Prettier自動フォーマット
- コンポーネント: PascalCase
- 関数: camelCase
- 定数: UPPER_SNAKE_CASE

**コミット規約:**
- feat: 新機能
- fix: バグ修正
- refactor: リファクタリング
- test: テスト追加
- docs: ドキュメント更新

---

**STATUS**: タスク生成完了
**TOTAL TASKS**: 60タスク (13フェーズ)
**NEXT STEP**: Phase 1から順次実装を開始してください