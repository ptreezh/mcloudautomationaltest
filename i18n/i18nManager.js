// i18n/i18nManager.js
import fs from 'fs';
import path from 'path';

class I18nManager {
  constructor(defaultLanguage = 'en') {
    this.defaultLanguage = defaultLanguage;
    this.translations = new Map();
    this.supportedLanguages = ['en', 'zh', 'ja', 'ko', 'fr', 'de', 'it', 'es', 'ru', 'th'];
    
    // 加载所有语言资源
    this.loadTranslations();
  }

  loadTranslations() {
    const i18nDir = './i18n';
    
    for (const lang of this.supportedLanguages) {
      try {
        const filePath = path.join(i18nDir, `${lang}.json`);
        if (fs.existsSync(filePath)) {
          const content = fs.readFileSync(filePath, 'utf8');
          this.translations.set(lang, JSON.parse(content));
        }
      } catch (error) {
        console.error(`Failed to load translation for ${lang}:`, error);
      }
    }
  }

  t(key, language = this.defaultLanguage, ...params) {
    // 获取翻译文本
    let translation = this.getNestedValue(this.translations.get(language) || this.translations.get(this.defaultLanguage), key);
    
    if (!translation) {
      // 如果当前语言没有找到翻译，尝试默认语言
      translation = this.getNestedValue(this.translations.get(this.defaultLanguage), key);
    }
    
    if (!translation) {
      // 如果默认语言也没有，返回键名
      return key;
    }
    
    // 处理参数替换
    if (params.length > 0) {
      for (let i = 0; i < params.length; i++) {
        translation = translation.replace(new RegExp(`\\{${i}\\}`, 'g'), params[i]);
      }
    }
    
    return translation;
  }

  getNestedValue(obj, path) {
    return path.split('.').reduce((current, key) => {
      return current && current[key] !== undefined ? current[key] : undefined;
    }, obj);
  }

  getSupportedLanguages() {
    return this.supportedLanguages;
  }

  changeLanguage(language) {
    if (this.supportedLanguages.includes(language)) {
      this.defaultLanguage = language;
    } else {
      console.warn(`Language ${language} is not supported. Using default: ${this.defaultLanguage}`);
    }
  }
  
  // 新增：获取版权信息
  getCopyright(language = this.defaultLanguage) {
    return this.t('copyright', language);
  }
  
  // 新增：获取联系信息
  getContactInfo(language = this.defaultLanguage) {
    return {
      title: this.t('contact.title', language),
      website: this.t('contact.website', language),
      email: this.t('contact.email', language),
      lab: this.t('contact.lab', language)
    };
  }
}

// 创建全局实例
const i18n = new I18nManager();

export default i18n;