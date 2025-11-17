// simple_automation.js - 简化版自动化脚本
import { chromium } from 'playwright';

async function simpleMiniProgramTest() {
  console.log('开始简化版小程序测试自动化...');

  try {
    // 连接到现有的浏览器实例
    console.log('连接到浏览器...');
    const browser = await chromium.connectOverCDP('http://localhost:9222');
    
    // 获取当前页面
    const contexts = await browser.contexts();
    const context = contexts[0];
    const pages = await context.pages();
    const page = pages[0]; // 使用第一个页面
    
    console.log('浏览器连接成功，当前URL:', page.url());
    
    // 验证是否在正确的页面
    if (!page.url().includes('mcloud.console.aliyun.com')) {
      console.log('导航到 MCloud 控制台...');
      await page.goto('https://mcloud.console.aliyun.com');
      await page.waitForLoadState('networkidle');
    }
    
    // 创建测试任务 - 尝试多种可能的元素
    console.log('寻找创建测试任务按钮...');
    const createSelectors = [
      'text=创建测试任务',
      'text=新建测试',
      'button:has-text("创建")',
      '.create-btn',
      '[class*="create"]'
    ];
    
    let createButtonFound = false;
    for (const selector of createSelectors) {
      try {
        const element = page.locator(selector);
        if (await element.count() > 0) {
          console.log(`找到创建按钮，使用选择器: ${selector}`);
          await element.click();
          createButtonFound = true;
          break;
        }
      } catch (e) {
        continue;
      }
    }
    
    if (!createButtonFound) {
      console.log('警告: 未找到创建测试任务按钮');
      // 继续执行，但记录状态
    } else {
      console.log('已点击创建测试任务');
      await page.waitForTimeout(2000);
    }
    
    // 上传文件 - 寻找文件上传输入框
    console.log('寻找文件上传区域...');
    const uploadSelectors = [
      'input[type="file"]',
      '.upload input',
      '[data-type="file"]'
    ];
    
    let uploadFound = false;
    for (const selector of uploadSelectors) {
      try {
        const element = page.locator(selector);
        if (await element.count() > 0) {
          console.log(`找到上传输入框: ${selector}`);
          
          // 检查是否设置了小程序包路径
          const packagePath = process.env.MINIPROGRAM_PACKAGE_PATH;
          if (packagePath) {
            console.log('准备上传文件:', packagePath);
            await element.setInputFiles(packagePath);
            console.log('文件上传命令已发送');
          } else {
            console.log('请设置环境变量 MINIPROGRAM_PACKAGE_PATH 指向您的小程序包');
          }
          
          uploadFound = true;
          break;
        }
      } catch (e) {
        continue;
      }
    }
    
    if (!uploadFound) {
      console.log('未找到文件上传区域');
    }
    
    console.log('简化版自动化测试执行完成');
    
    // 等待用户查看结果
    console.log('脚本执行完毕，请在浏览器中查看结果...');
    console.log('按 Ctrl+C 停止脚本');
    
    // 保持脚本运行，让用户查看结果
    await new Promise(() => {});
    
  } catch (error) {
    console.error('脚本执行失败:', error.message);
    console.error('详细错误:', error);
  }
}

// 运行简化版自动化
async function runSimpleAutomation() {
  console.log('简化版 MCloud 自动化测试');
  console.log('确保已运行: msedge --remote-debugging-port=9222');
  console.log('确保已登录阿里云 MCloud');
  
  await simpleMiniProgramTest();
}

if (require.main === module) {
  runSimpleAutomation();
}

export default simpleMiniProgramTest;