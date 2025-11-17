# MCloud 小程序自动化 - 用户手册

## 目录
- [项目概述](#项目概述)
- [功能特性](#功能特性)
- [安装](#安装)
- [快速开始](#快速开始)
- [使用方法](#使用方法)
- [故障排除](#故障排除)

## 项目概述
MCloud 小程序自动化是在阿里云 MCloud 平台上对微信小程序进行自动化测试的全面解决方案。该解决方案利用 Playwright 连接到您现有的浏览器实例，并自动执行测试工作流程。

## 功能特性
- 连接到已有的 Edge 浏览器实例
- 自动化小程序上传
- 配置测试参数
- 监控测试进度
- 生成测试报告
- 多语言支持（10种语言）

## 安装
1. 安装 Node.js（版本 14 或更高）
2. 安装 Playwright：
   ```bash
   npm install playwright
   npx playwright install
   ```
3. 克隆或下载项目
4. 安装项目依赖：
   ```bash
   npm install
   ```

## 快速开始
1. 启动启用远程调试的 Edge 浏览器：
   ```bash
   msedge --remote-debugging-port=9222
   ```
2. 在浏览器中手动登录阿里云 MCloud
3. 设置小程序包路径环境变量：
   ```bash
   set MINIPROGRAM_PACKAGE_PATH=C:/path/to/your/package.zip
   ```
4. 运行自动化脚本：
   ```bash
   node advanced_mcloud_automation.js
   ```

## 使用方法
该解决方案提供多种自动化级别：

### 简化版自动化
使用 `simple_automation.js` 进行基本自动化任务。

### 高级自动化
使用 `advanced_mcloud_automation.js` 进行包含错误处理的全面自动化。

### 分步自动化
使用 `step_by_step_automation.js` 对每个自动化步骤进行详细控制。

## 故障排除
### 连接问题
- 确保 Edge 启动时使用 `--remote-debugging-port=9222`
- 验证端口未被其他应用程序使用
- 确保在运行脚本前浏览器已完全加载

### 元素未找到
- MCloud 界面可能已更改
- 在自动化脚本中更新选择器
- 确保浏览器窗口足够大

### 身份验证问题
- 验证您是否登录到正确的账户
- 确保会话未过期
- 如有必要，请重新登录后再运行脚本