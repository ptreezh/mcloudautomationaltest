#!/bin/bash
# 启动 MCloud 自动化测试的脚本

echo "=== MCloud 微信小程序自动化测试 ==="
echo "请按照以下步骤操作："
echo ""
echo "步骤 1: 启动支持远程调试的 Edge 浏览器"
echo "  运行: msedge --remote-debugging-port=9222"
echo ""
echo "步骤 2: 在浏览器中登录阿里云 MCloud"
echo "  访问: https://mcloud.console.aliyun.com"
echo "  完成登录流程"
echo ""
echo "步骤 3: 设置环境变量（可选，但推荐）"
echo "  export MINIPROGRAM_PACKAGE_PATH='/path/to/your/miniprogram.zip'"
echo ""
echo "步骤 4: 运行自动化脚本"
echo "  npm run mcloud-automation"
echo ""
echo "按 Enter 键继续..."
read

echo "请先在新命令窗口中运行: msedge --remote-debugging-port=9222"
echo "然后登录阿里云 MCloud，之后再运行自动化脚本"