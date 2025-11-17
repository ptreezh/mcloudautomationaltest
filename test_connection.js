// test_connection.js - 浏览器连接测试脚本
import { chromium } from 'playwright';

async function testBrowserConnection() {
  console.log('测试浏览器连接功能...');
  
  try {
    // 尝试连接到本地运行的浏览器调试实例
    const browser = await chromium.connectOverCDP({
      endpointURL: 'http://localhost:9222'
    });
    
    console.log('✓ 成功连接到浏览器实例');
    
    // 获取页面
    const pages = await browser.contexts()[0]?.pages() || [];
    const page = pages.length > 0 ? pages[0] : await browser.newPage();
    
    // 测试基本操作
    console.log('当前页面URL:', page.url());
    
    // 获取页面标题
    const title = await page.title();
    console.log('页面标题:', title);
    
    // 获取页面内容片段
    const content = await page.content();
    console.log('页面内容长度:', content.length);
    
    // 检查是否有阿里云相关元素
    const hasAliyun = content.includes('aliyun') || content.includes('阿里云');
    console.log('是否检测到阿里云内容:', hasAliyun);
    
    // 测试点击操作（安全的，不会修改任何内容）
    const url = page.url();
    console.log('测试连接成功，当前URL:', url);
    
    return { success: true, url, title, hasAliyun };
    
  } catch (error) {
    console.error('✗ 连接失败:', error.message);
    console.log('\\n请确保:');
    console.log('1. 运行: msedge --remote-debugging-port=9222');
    console.log('2. 浏览器中已打开阿里云 MCloud 页面');
    console.log('3. 已完成登录');
    return { success: false, error: error.message };
  }
}

// 执行测试
async function main() {
  console.log('开始浏览器连接测试...');
  const result = await testBrowserConnection();
  console.log('\\n测试结果:', result);
}

// 直接运行测试
if (require.main === module) {
  main();
}

export default testBrowserConnection;