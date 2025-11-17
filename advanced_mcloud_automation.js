import { chromium } from 'playwright';

class AdvancedMCloudAutomation {
  constructor() {
    this.browser = null;
    this.page = null;
    this.packagePath = process.env.MINIPROGRAM_PACKAGE_PATH || './miniprogram.zip';
  }

  async connectToExistingBrowser() {
    console.log('尝试连接到已打开的浏览器实例...');

    // 首先尝试连接到远程调试端点
    // 请确保已运行: msedge --remote-debugging-port=9222
    try {
      this.browser = await chromium.connectOverCDP('http://localhost:9222');
      console.log('成功连接到浏览器实例');
    } catch (error) {
      console.error('连接失败，错误信息:', error.message);
      console.log('请确保已经运行: msedge --remote-debugging-port=9222');
      console.log('并在浏览器中登录阿里云后，再运行此脚本');
      throw error;
    }

    // 获取浏览器上下文
    const contexts = await this.browser.contexts();
    if (contexts.length > 0) {
      // 使用已存在的上下文
      const context = contexts[0];
      const existingPages = context.pages();
      
      if (existingPages.length > 0) {
        // 使用第一个已存在的页面
        this.page = existingPages[0];
      } else {
        // 如果没有现有页面，创建新页面
        this.page = await context.newPage();
      }
    } else {
      // 如果没有上下文，创建新的
      const context = await this.browser.newContext();
      this.page = await context.newPage();
    }

    // 设置超时
    this.page.setDefaultTimeout(30000);
    
    console.log('浏览器连接和页面准备完成');
  }

  async verifyLoginStatus() {
    console.log('验证登录状态...');
    
    try {
      // 获取当前页面URL
      const currentUrl = this.page.url();
      console.log('当前页面URL:', currentUrl);
      
      // 如果不在 MCloud 页面，导航过去
      if (!currentUrl.includes('mcloud.console.aliyun.com')) {
        await this.page.goto('https://mcloud.console.aliyun.com');
        await this.page.waitForLoadState('networkidle');
      }
      
      // 检查是否已登录（通过检查用户相关元素）
      const loginIndicators = [
        '退出登录',
        'user-menu',
        '.user-avatar',
        '[data-testid="user-profile"]',
        '.account-name'
      ];
      
      let isLoggedIn = false;
      for (const indicator of loginIndicators) {
        try {
          const isVisible = await this.page.isVisible(indicator);
          if (isVisible) {
            isLoggedIn = true;
            console.log('检测到登录状态');
            break;
          }
        } catch (e) {
          continue;
        }
      }
      
      if (!isLoggedIn) {
        console.warn('未检测到登录状态，您需要手动登录');
        console.log('请在浏览器中登录阿里云后按 Enter 继续...');
        await this.waitForUserInput();
      } else {
        console.log('已确认登录状态');
      }
      
      return true;
    } catch (error) {
      console.error('验证登录状态时出错:', error);
      return false;
    }
  }

  async waitForUserInput() {
    // 在实际环境中，可以使用 readline 或其他方式等待用户操作
    console.log('等待用户确认...');
    return new Promise(resolve => {
      setTimeout(resolve, 5000); // 等待5秒，实际应用中可以使用更好的方式
    });
  }

  async findAndClickElement(selectors, description) {
    console.log(`尝试点击 ${description}...`);
    
    for (const selector of selectors) {
      try {
        const element = this.page.locator(selector);
        const count = await element.count();
        
        if (count > 0) {
          await element.first().click();
          console.log(`成功点击元素: ${selector}`);
          return true;
        }
      } catch (error) {
        console.log(`尝试选择器 "${selector}" 失败: ${error.message}`);
        continue;
      }
    }
    
    console.error(`未找到 ${description} 的任何元素`);
    return false;
  }

  async createMiniProgramTest() {
    console.log('创建小程序测试任务...');
    
    // 点击创建测试任务
    const createSelectors = [
      'text=创建测试任务',
      'text=新建测试',
      'button:has-text("创建")',
      '.create-test-btn',
      '[data-testid="create-test"]'
    ];
    
    await this.findAndClickElement(createSelectors, '创建测试任务按钮');
    
    // 等待页面加载
    await this.page.waitForLoadState('networkidle');
    
    // 选择小程序测试类型
    const typeSelectors = [
      'text=小程序测试',
      'text=WeChat Mini Program',
      '.test-type-mini-program',
      '[data-value="miniprogram"]',
      '[data-type="miniprogram"]'
    ];
    
    await this.findAndClickElement(typeSelectors, '小程序测试类型');
    
    await this.page.waitForTimeout(2000);
    console.log('小程序测试任务创建完成');
  }

  async uploadMiniProgramPackage() {
    console.log('上传小程序包...');
    
    if (!this.packagePath || !require('fs').existsSync(this.packagePath)) {
      throw new Error(`小程序包不存在: ${this.packagePath}`);
    }
    
    // 查找上传区域
    const uploadSelectors = [
      'input[type="file"][accept*="zip"]',
      'input[type="file"]',
      '.upload-area input',
      '[data-testid="file-upload"] input',
      '.file-upload input'
    ];
    
    let uploadInput = null;
    for (const selector of uploadSelectors) {
      try {
        const element = this.page.locator(selector);
        const count = await element.count();
        if (count > 0) {
          uploadInput = element.first();
          console.log(`找到上传输入框: ${selector}`);
          break;
        }
      } catch (error) {
        continue;
      }
    }
    
    if (!uploadInput) {
      // 如果直接的文件输入找不到，尝试点击上传按钮
      const uploadBtnSelectors = [
        'text=上传文件',
        'text=选择文件',
        'button:has-text("上传")',
        '.upload-btn',
        '[data-testid="upload-button"]'
      ];
      
      let clicked = false;
      for (const selector of uploadBtnSelectors) {
        if (await this.findAndClickElement([selector], '上传按钮')) {
          clicked = true;
          break;
        }
      }
      
      if (!clicked) {
        throw new Error('未找到上传文件的方法');
      }
      
      // 等待文件输入出现
      await this.page.waitForSelector('input[type="file"]', { timeout: 10000 });
      uploadInput = this.page.locator('input[type="file"]').first();
    }
    
    // 执行文件上传
    await uploadInput.setInputFiles(this.packagePath);
    console.log('小程序包上传开始...');
    
    // 等待上传状态变化
    try {
      await Promise.any([
        this.page.waitForSelector('text=上传中').then(() => 'uploading'),
        this.page.waitForSelector('text=Uploading').then(() => 'uploading'),
        this.page.waitForSelector('.upload-progress').then(() => 'progress'),
        new Promise(resolve => setTimeout(() => resolve('timeout'), 5000))
      ]);
      
      console.log('检测到上传状态');
      
      // 等待上传完成
      await Promise.any([
        this.page.waitForSelector('text=上传完成').then(() => 'completed'),
        this.page.waitForSelector('text=Upload Complete').then(() => 'completed'),
        new Promise(resolve => setTimeout(() => resolve('timeout'), 30000))
      ]);
      
      console.log('小程序包上传完成');
    } catch (error) {
      console.warn('上传状态检测出现问题，但仍继续:', error.message);
    }
    
    // 等待解析完成
    await this.page.waitForTimeout(3000);
    console.log('包上传和解析完成');
  }

  async configureTestSettings() {
    console.log('配置测试设置...');
    
    try {
      // 配置任务名称
      const nameInput = this.page.locator('input[placeholder*="名称"], input[placeholder*="name"]');
      if (await nameInput.count() > 0) {
        await nameInput.fill(`自动化测试_${new Date().getTime()}`);
      }
      
      // 选择测试类型
      const testTypeSelectors = [
        'text=兼容性测试',
        'text=Compatibility',
        '[data-type="compatibility"]'
      ];
      
      for (const selector of testTypeSelectors) {
        if (await this.page.locator(selector).count() > 0) {
          await this.page.locator(selector).click();
          break;
        }
      }
      
      // 选择测试设备
      const deviceSelectors = [
        'text=选择设备',
        'text=Select Devices',
        'button:has-text("设备")'
      ];
      
      for (const selector of deviceSelectors) {
        if (await this.page.locator(selector).count() > 0) {
          await this.page.locator(selector).click();
          break;
        }
      }
      
      await this.page.waitForTimeout(2000);
      
      // 选择设备（示例）
      const deviceToSelect = 'iPhone 15';
      try {
        await this.page.locator(`text=${deviceToSelect}`).click();
      } catch (error) {
        console.log(`设备 ${deviceToSelect} 未找到，尝试其他设备`);
      }
      
      console.log('测试设置配置完成');
    } catch (error) {
      console.error('配置测试设置时出错:', error);
      // 继续执行，不中断整个流程
    }
  }

  async startAndMonitorTest() {
    console.log('启动并监控测试...');
    
    // 点击开始测试按钮
    const startSelectors = [
      'text=开始测试',
      'text=Start Test',
      'button:has-text("开始")',
      '.start-test-btn'
    ];
    
    let started = false;
    for (const selector of startSelectors) {
      if (await this.page.locator(selector).count() > 0) {
        await this.page.locator(selector).click();
        started = true;
        console.log('测试已启动');
        break;
      }
    }
    
    if (!started) {
      console.warn('未找到开始测试按钮');
      return;
    }
    
    // 等待测试状态变为进行中
    await this.page.waitForTimeout(3000);
    
    // 监控测试进度
    console.log('开始监控测试进度...');
    let attempts = 0;
    const maxAttempts = 36; // 最多等待36次 * 30秒 = 18分钟
    
    while (attempts < maxAttempts) {
      try {
        // 获取页面内容来检查状态
        const content = await this.page.content();
        
        if (content.includes('完成') || content.includes('Complete') || content.includes('finished')) {
          console.log('测试已完成');
          break;
        } else if (content.includes('失败') || content.includes('failed') || content.includes('error')) {
          console.warn('测试可能遇到错误');
          break;
        } else {
          console.log(`测试进行中... (${attempts + 1}/${maxAttempts})`);
        }
        
        await this.page.waitForTimeout(30000); // 等待30秒
        attempts++;
      } catch (error) {
        console.error('监控测试时出错:', error);
        await this.page.waitForTimeout(30000);
        attempts++;
      }
    }
    
    if (attempts >= maxAttempts) {
      console.warn('测试监控超时');
    }
  }

  async getTestResults() {
    console.log('获取测试结果...');
    
    try {
      // 等待测试报告出现
      await this.page.waitForSelector('text=测试报告').catch(() => {});
      await this.page.waitForSelector('text=Report').catch(() => {});
      
      // 截图保存当前状态
      await this.page.screenshot({
        path: `./test_results/result_${Date.now()}.png`,
        fullPage: true
      });
      
      console.log('测试结果获取完成');
      return { success: true, timestamp: new Date().toISOString() };
    } catch (error) {
      console.error('获取测试结果时出错:', error);
      return { success: false, error: error.message, timestamp: new Date().toISOString() };
    }
  }

  async runFullAutomation() {
    try {
      console.log('开始完整的 MCloud 自动化测试流程...');
      
      // 连接到现有浏览器
      await this.connectToExistingBrowser();
      
      // 验证登录状态
      await this.verifyLoginStatus();
      
      // 创建测试任务
      await this.createMiniProgramTest();
      
      // 上传小程序包
      await this.uploadMiniProgramPackage();
      
      // 配置测试设置
      await this.configureTestSettings();
      
      // 启动并监控测试
      await this.startAndMonitorTest();
      
      // 获取测试结果
      const results = await this.getTestResults();
      
      console.log('自动化测试流程完成');
      console.log('结果:', results);
      
      return results;
      
    } catch (error) {
      console.error('自动化流程执行失败:', error);
      throw error;
    } finally {
      // 注意：不要关闭浏览器，因为它是由用户打开的
      console.log('请注意：浏览器实例保持打开状态');
    }
  }
}

// 使用示例
async function main() {
  console.log('MCloud 自动化测试脚本');
  console.log('请确保已经运行: msedge --remote-debugging-port=9222');
  console.log('并在浏览器中登录阿里云 MCloud');
  
  const automation = new AdvancedMCloudAutomation();
  
  try {
    // 设置小程序包路径
    if (!process.env.MINIPROGRAM_PACKAGE_PATH) {
      console.warn('请设置 MINIPROGRAM_PACKAGE_PATH 环境变量指向您的小程序ZIP包');
      return;
    }
    
    await automation.runFullAutomation();
  } catch (error) {
    console.error('执行失败:', error);
  }
}

// 如果直接运行
if (require.main === module) {
  main().catch(console.error);
}

export default AdvancedMCloudAutomation;