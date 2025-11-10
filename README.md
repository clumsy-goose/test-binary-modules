# Binary Modules Test - Node Functions on EdgeOne Pages

一个全面的二进制模块测试项目，用于测试各种 Node.js 原生模块在 EdgeOne Pages Node Functions 中的兼容性和运行情况。

## 🚀 功能特点

- **完整的二进制模块测试**: 测试 14+ 个常用的 Node.js 原生/二进制模块
- **分类展示**: 按功能分类（加密、数据库、图像处理、AI/ML、浏览器自动化等）
- **实时测试**: 在线实时测试每个模块的功能
- **现代化 UI**: 采用黑色主题，使用 #1c66e5 作为强调色
- **响应式布局**: 支持桌面和移动设备的最佳体验

## 📦 测试的二进制模块

### 加密模块
- **argon2** - 高安全性密码哈希算法
- **bcrypt** - 密码哈希和验证

### 数据库模块
- **sqlite3** - SQLite 数据库绑定
- **better-sqlite3** - 更快的 SQLite 实现
- **pg-native** - PostgreSQL 原生绑定

### 图像处理
- **skia-canvas** - 2D 图形绘制库
- **sharp** - 高性能图像处理库

### 媒体处理
- **ffmpeg-static** - FFmpeg 静态二进制文件

### AI/机器学习
- **onnxruntime-node** - ONNX Runtime 推理引擎
- **@tensorflow/tfjs-node** - TensorFlow.js Node.js 版本
- **wink-nlp** - 自然语言处理库

### 浏览器自动化
- **puppeteer** - Chrome 无头浏览器控制
- **playwright** - 跨浏览器自动化工具
- **chrome-aws-lambda** - AWS Lambda 优化的 Chrome

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React full-stack framework
- **React 19** - User interface library
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS 4** - Utility-first CSS framework

### UI Components
- **shadcn/ui** - High-quality React components
- **Lucide React** - Beautiful icon library
- **class-variance-authority** - Component style variant management
- **clsx & tailwind-merge** - CSS class name merging utilities

### Backend
- **Express.js** - Node.js web application framework
- **Node Functions** - EdgeOne Pages serverless functions

## 📁 Project Structure

```
express-template/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── globals.css     # Global styles
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Main page
│   ├── components/         # React components
│   │   └── ui/            # UI base components
│   │       ├── button.tsx  # Button component
│   │       └── card.tsx    # Card component
│   └── lib/               # Utility functions
│       └── utils.ts       # Common utilities
├── public/                # Static assets
├── package.json           # Project configuration
└── README.md             # Project documentation
```

## 🚀 Quick Start

### Requirements

- Node.js 18+ 
- npm or yarn

### Install Dependencies

```bash
npm install
# or
yarn install
```

### Development Mode

```bash
edgeone pages dev
```

Visit [http://localhost:8088](http://localhost:8088) to view the application.

### Build Production Version

```bash
edgeone pages build
```

## 🎯 核心功能

### 1. 分类测试界面
- 按模块类型分类展示（基础、加密、数据库、图像处理、媒体处理、AI/ML、浏览器）
- 每个模块独立测试按钮
- 实时状态显示（加载中、成功、失败）

### 2. API 端点测试
- **/express** - Express 根路由测试
- **/express/argon2** - Argon2 密码哈希测试
- **/express/bcrypt** - Bcrypt 密码哈希测试
- **/express/sqlite3** - SQLite3 数据库测试
- **/express/better-sqlite3** - Better-SQLite3 测试
- **/express/pg-native** - PostgreSQL Native 测试
- **/express/skia-canvas** - Skia Canvas 图像生成测试
- **/express/sharp** - Sharp 图像处理测试
- **/express/ffmpeg-static** - FFmpeg 测试
- **/express/onnxruntime** - ONNX Runtime 测试
- **/express/winknlp** - WinkNLP 自然语言处理测试
- **/express/tensorflow** - TensorFlow.js 测试
- **/express/puppeteer** - Puppeteer 浏览器自动化测试
- **/express/playwright** - Playwright 测试
- **/express/chrome-aws-lambda** - Chrome AWS Lambda 测试

### 3. 实时结果显示
- 成功/失败状态可视化
- JSON 格式化结果展示
- 图像处理模块显示文件大小

## 🔧 Configuration

### Tailwind CSS Configuration
The project uses Tailwind CSS 4 with custom color variables:

```css
:root {
  --primary: #1c66e5;        /* Primary color */
  --background: #000000;     /* Background color */
  --foreground: #ffffff;     /* Foreground color */
}
```

### Component Styling
Uses `class-variance-authority` to manage component style variants with multiple preset styles.

## 📚 Documentation

- **EdgeOne Pages Official Docs**: [https://pages.edgeone.ai/document/node-functions](https://pages.edgeone.ai/document/node-functions)
- **Next.js Documentation**: [https://nextjs.org/docs](https://nextjs.org/docs)
- **Tailwind CSS Documentation**: [https://tailwindcss.com/docs](https://tailwindcss.com/docs)
- **Express.js Documentation**: [https://expressjs.com](https://expressjs.com)

## 🚀 Deployment Guide

### EdgeOne Pages Deployment

1. Push code to GitHub repository
2. Create new project in EdgeOne Pages console
3. Select GitHub repository as source
4. Configure build command: `edgeone pages build`
5. Deploy project

### Node Functions 配置

项目已配置好 `node-functions/express/[[default]].js`，包含所有二进制模块的测试端点。

关键依赖说明：
- 所有二进制模块必须在 `package.json` 的 `dependencies` 中声明
- 部署时 EdgeOne Pages 会自动构建适配平台的二进制模块
- 某些模块（如 ONNX Runtime）需要额外的模型文件

### 注意事项

1. **数据库连接**: `pg-native` 测试需要有效的 PostgreSQL 连接信息
2. **模型文件**: `onnxruntime` 测试需要提供 ONNX 模型文件路径
3. **浏览器自动化**: Puppeteer 和 Playwright 可能需要特定的运行时环境
4. **内存限制**: 某些 AI/ML 模块可能需要较大内存

## 💡 使用说明

### ⚠️ 重要提示

**项目路径不能包含空格！** 某些原生模块（如 `@tensorflow/tfjs-node`）在编译时无法正确处理包含空格的路径。

✅ 正确：`/Users/username/projects/test-binary-modules`  
❌ 错误：`/Users/username/CLI deploy test/test-binary-modules`

如果你的项目路径包含空格，请移动到不含空格的路径。

### 安装步骤

1. **安装依赖**
```bash
npm install
```

> **关于可选依赖**: 以下模块被标记为可选依赖，安装失败不会影响项目运行：
> - `@tensorflow/tfjs-node` - 需要从源码编译，路径中有空格会失败
> - `onnxruntime-node` - 需要下载大型二进制文件
> - `pg-native` - 需要 PostgreSQL 系统库
> - `skia-canvas` - 需要特定的系统依赖
>
> 在 EdgeOne Pages 部署环境中，这些模块都能正常安装和运行。如果想在本地完整测试，需要：
> 
> ```bash
> # 确保项目路径不含空格
> # macOS 安装 PostgreSQL
> brew install postgresql
> 
> # Ubuntu/Debian
> sudo apt-get install postgresql postgresql-contrib libpq-dev
> ```

2. **本地开发**
```bash
edgeone pages dev
```

3. **访问测试页面**
打开浏览器访问 `http://localhost:8088`

4. **测试模块**
- 点击任意模块的"测试"按钮
- 查看实时测试结果
- 绿色表示成功，红色表示失败

## 🔍 测试结果说明

每个模块的测试会返回不同的结果：
- **加密模块**: 返回哈希字符串
- **数据库模块**: 返回操作结果或查询数据
- **图像处理**: 返回图片数据或处理结果
- **AI/ML 模块**: 返回推理结果或处理后的数据
- **浏览器自动化**: 返回操作状态

## Deploy

[![Deploy with EdgeOne Pages](https://cdnstatic.tencentcs.com/edgeone/pages/deploy.svg)](https://edgeone.ai/pages/new?from=github&template=express-template)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/github/choosealicense.com/blob/gh-pages/_licenses/mit.txt) file for details.
