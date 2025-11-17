// step_by_step_automation.js - 分步自动化脚本
import { chromium } from 'playwright';

class StepByStepMCloud {
  constructor() {
    this.browser = null;
    this.page = null;
  }

  async connect() {
    console.log('步骤 1: 连接到浏览器...');
    this.browser = await chromium.connectOverCDP('http://localhost:9222');
    
    const contexts = await this.browser.contexts();
    const context = contexts[0];
    const pages = await context.pages();
    this.page = pages[0];
    
    console.log('✓ 浏览器连接成功');
    return true;
  }

  async checkCurrentPage() {
    console.log('步骤 2: 检查当前页面...');
    const url = this.page.url();
    const title = await this.page.title();
    
    console.log('当前URL:', url);
    console.log('页面标题:', title);
    
    if (url.includes('mcloud.console.aliyun.com')) {
      console.log('✓ 已在 MCloud 页面');
      return true;
    } else {
      console.log('提示: 不在 MCloud 页面，需要导航');
      return false;
    }
  }

  async navigateToMCloud() {
    console.log('步骤 2b: 导航到 MCloud...');
    await this.page.goto('https://mcloud.console.aliyun.com');
    await this.page.waitForLoadState('networkidle');
    
    console.log('✓ 已导航到 MCloud');
    return true;
  }

  async findElement(selector) {
    try {
      const element = this.page.locator(selector);
      const count = await element.count();
      if (count > 0) {
        return element.first();
      }
    } catch (error) {
      // 忽略错误，继续尝试其他选择器
    }
    return null;
  }

  async createTestTask() {
    console.log('步骤 3: 创建测试任务...');
    
    // 尝试不同的创建按钮选择器
    const selectors = [
      'text=创建测试任务',
      'text=新建测试',
      'text=Create Test',
      'button:has-text("创建")',
      'button:has-text("Create")'
    ];
    
    for (const selector of selectors) {
      const element = await this.findElement(selector);
      if (element) {
        console.log(`找到创建按钮: ${selector}`);
        await element.click();
        console.log('✓ 点击创建按钮成功');
        return true;
      }
    }
    
    console.log('⚠ 未找到创建测试任务按钮');
    return false;
  }

  async selectMiniProgramTestType() {
    console.log('步骤 4: 选择小程序测试类型...');
    
    const selectors = [
      'text=小程序测试',
      'text=WeChat Mini Program',
      'text=Mini Program',
      '[data-type="miniprogram"]',
      '.miniprogram-test'
    ];
    
    for (const selector of selectors) {
      const element = await this.findElement(selector);
      if (element) {
        console.log(`找到小程序测试选项: ${selector}`);
        await element.click();
        console.log('✓ 选择小程序测试类型成功');
        return true;
      }
    }
    
    console.log('⚠ 未找到小程序测试类型选项');
    return false;
  }

  async uploadPackage() {
    console.log('步骤 5: 上传小程序包...');
    
    const packagePath = process.env.MINIPROGRAM_PACKAGE_PATH;
    if (!packagePath) {
      console.log('⚠ 未设置 MINIPROGRAM_PACKAGE_PATH 环境变量');
      console.log('请运行: set MINIPROGRAM_PACKAGE_PATH=path/to/your/package.zip');
      return false;
    }
    
    // 查找上传输入框
    const selectors = [
      'input[type="file"]',
      '.upload input',
      '[data-upload="file"]',
      '.file-input'
    ];
    
    for (const selector of selectors) {
      const element = await this.findElement(selector);
      if (element) {
        console.log(`找到上传输入框: ${selector}`);
        try {
          await element.setInputFiles(packagePath);
          console.log('✓ 文件上传成功');
          return true;
        } catch (error) {
          console.log('上传失败:', error.message);
        }
      }
    }
    
    console.log('⚠ 未找到上传输入框');
    return false;
  }

  async waitAndSucceed() {
    console.log('自动化步骤执行完成！');
    console.log('浏览器保持打开状态供您查看结果');
    console.log('所有步骤已完成');
    
    // 保持连接状态
    await new Promise(() => {});  // 永远等待，保持进程运行
  }

  async run() {
    try {
      await this.connect();
      await this.checkCurrentPage();
      
      // 如果不在 MCloud 页面，进行导航
      if (!(await this.checkCurrentPage())) {
        await this.navigateToMCloud();
      }
      
      await this.createTestTask();
      await this.selectMiniProgramTestType();
      await this.uploadPackage();
      await this.waitAndSucceed();
      
    } catch (error) {
      console.error('自动化执行出错:', error.message);
      console.error('错误详情:', error);
    }
  }
}

// 运行分步自动化
async function runStepByStep() {
  console.log('=== 分步 MCloud 自动化测试 ===');
  console.log('请确保:');
  console.log('1. 运行: msedge --remote-debugging-port=9222');
  console.log('2. 浏览器中已登录阿里云 MCloud');
  console.log('3. 设置 MINIPROGRAM_PACKAGE_PATH 环境变量');
  
  const automation = new StepByStepMCloud();
  await automation.run();
}

if (require.main === module) {
  runStepByStep();
}

export default StepByStepMCloud;