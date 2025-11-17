# 使用指南：MCloud 微信小程序自动化测试

## 环境准备

### 1. 安装依赖
```bash
npm install
# 或者
npm install playwright
npx playwright install msedge
```

### 2. 准备小程序包
确保您有一个已构建的微信小程序ZIP包：
```bash
# 在微信开发者工具中构建后压缩
# 确保包含 app.js, app.json 等必要文件
```

## 操作步骤

### 步骤 1: 启动支持远程调试的 Edge 浏览器
打开命令提示符（管理员权限），运行：
```cmd
msedge --remote-debugging-port=9222
```

### 步骤 2: 登录阿里云 MCloud
在打开的 Edge 浏览器中：
1. 访问 https://mcloud.console.aliyun.com
2. 使用您的阿里云账号登录
3. 确认已成功进入 MCloud 控制台

### 步骤 3: 配置环境变量
```bash
# 设置小程序包路径
set MINIPROGRAM_PACKAGE_PATH=C:\path\to\your\miniprogram.zip
```

### 步骤 4: 运行自动化脚本
```bash
npm run mcloud-automation
```

## 高级配置

### 自定义选择器
如果默认的选择器不适用您的 MCloud 界面，可以在代码中修改：
```javascript
// 在代码中更新选择器数组
const customSelectors = [
  // 添加您的自定义选择器
];
```

### 调试模式
运行调试版本以获得更多信息：
```bash
npm run mcloud-dev
```

## 注意事项

1. **浏览器保持开启**：脚本不会关闭您的浏览器，因为它是由您打开的
2. **登录状态**：确保在运行脚本前已完成登录
3. **网络连接**：需要稳定的网络连接
4. **权限要求**：脚本需要读取小程序包文件的权限
5. **时间考虑**：测试过程可能需要较长时间

## 故障排除

### 连接失败
- 确认运行了 `msedge --remote-debugging-port=9222`
- 检查端口是否被其他应用占用
- 确认浏览器已完全启动

### 元素找不到
- 界面可能已更新，选择器需要调整
- 检查浏览器窗口大小是否合适
- 确认页面已完全加载

### 上传失败
- 确认小程序包路径正确
- 检查包文件大小是否符合要求
- 确认包结构正确

## 安全说明

- 此脚本仅与您已授权的阿里云账户交互
- 不会存储您的登录凭据
- 操作完全在您的本地网络环境中进行