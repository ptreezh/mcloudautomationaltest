# MCloud Mini Program Automation

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Language Support: 10](https://img.shields.io/badge/Languages-10-green.svg)](i18n/)

## 🌍 International Support
Available in 10 languages: English 🇺🇸 | Chinese 🇨🇳 | Japanese 🇯🇵 | Korean 🇰🇷 | French 🇫🇷 | German 🇩🇪 | Italian 🇮🇹 | Spanish 🇪🇸 | Russian 🇷🇺 | Thai 🇹🇭

**Read this in other languages:** 
- [中文](README_zh.md)
- [日本語](README_ja.md)
- [한국어](README_ko.md)
- [Français](README_fr.md)
- [Deutsch](README_de.md)
- [Italiano](README_it.md)
- [Español](README_es.md)
- [Русский](README_ru.md)
- [ไทย](README_th.md)

## 📖 Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

## Overview
This project provides a comprehensive solution for automated testing of WeChat Mini Programs on Alibaba Cloud's MCloud platform. It leverages Playwright to connect to your existing browser instance and automate the entire testing workflow from upload to result analysis.

## Features
- 🌐 **Multi-language Support**: Available in 10 languages
- 🔗 **Browser Connection**: Connects to existing Edge browser instance
- 🚀 **Automated Upload**: Automates mini program package upload
- ⚙️ **Configuration**: Configures test parameters automatically
- 👁️ **Monitoring**: Monitors test progress in real-time
- 📊 **Reporting**: Generates detailed test reports
- 🛡️ **Error Handling**: Comprehensive error handling and recovery
- 📁 **File Management**: Handles package preparation and validation

## Installation
1. **Prerequisites**
   - Node.js (version 14 or higher)
   - npm package manager

2. **Clone the repository**
   ```bash
   git clone https://github.com/ptreezh/mcloudautomationaltest.git
   ```

3. **Install dependencies**
   ```bash
   cd mcloudautomationaltest
   npm install
   ```

4. **Install Playwright browsers**
   ```bash
   npx playwright install
   ```

## Getting Started
1. **Start Edge browser with remote debugging**
   ```bash
   msedge --remote-debugging-port=9222
   ```

2. **Manually log in to Alibaba Cloud MCloud**
   - Open the browser instance started in step 1
   - Navigate to https://mcloud.console.aliyun.com
   - Log in with your Alibaba Cloud account

3. **Set environment variables**
   ```bash
   # Set the path to your mini program package (ZIP file)
   export MINIPROGRAM_PACKAGE_PATH=/path/to/your/mini-program.zip
   ```

4. **Run the automation**
   ```bash
   # For advanced automation with full error handling
   node advanced_mcloud_automation.js
   
   # For simple automation
   node simple_automation.js
   
   # For step-by-step automation
   node step_by_step_automation.js
   ```

## Usage

### Advanced Automation
The primary automation script provides comprehensive functionality:

```javascript
import AdvancedMCloudAutomation from './advanced_mcloud_automation.js';

const automation = new AdvancedMCloudAutomation();
automation.runFullAutomation();
```

### Internationalization
The project includes full i18n support for 10 languages:

```javascript
import i18n from './i18n/i18nManager.js';

// Get text in current language
const projectTitle = i18n.t('projectName'); // Returns translation based on current language

// Get text in specific language
const description = i18n.t('projectDescription', 'zh'); // Returns Chinese translation

// Change default language
i18n.changeLanguage('ja'); // Switch to Japanese
```

## Project Structure
```
mcloud-automation/
├── advanced_mcloud_automation.js     # Main automation script
├── simple_automation.js             # Simple automation script
├── step_by_step_automation.js       # Step-by-step automation
├── test_connection.js               # Connection testing utility
├── package.json                     # Project configuration
├── LICENSE                          # MIT License
├── README.md                        # This file
├── i18n/                           # Internationalization files
│   ├── en.json
│   ├── zh.json
│   ├── ja.json
│   ├── ko.json
│   ├── fr.json
│   ├── de.json
│   ├── it.json
│   ├── es.json
│   ├── ru.json
│   └── th.json
└── docs/                           # Documentation
    ├── en/
    ├── zh/
    ├── ja/
    ├── ko/
    ├── fr/
    ├── de/
    ├── it/
    ├── es/
    ├── ru/
    └── th/
```

## Troubleshooting

### Common Issues
1. **Connection Problems**
   - Ensure Edge is started with `--remote-debugging-port=9222`
   - Check that the port is not used by other applications
   - Verify the browser is fully loaded before running scripts

2. **Element Not Found**
   - The MCloud interface might have been updated
   - Update selectors in the automation scripts
   - Ensure the browser window size is adequate

3. **Authentication Issues**
   - Verify you're logged in to the correct account
   - Ensure your session hasn't expired
   - Re-login if necessary before running the script

### Environment Variables
- `MINIPROGRAM_PACKAGE_PATH`: Path to the mini program package ZIP file

## Contributing
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact
- **AI Personality Lab**: [https://agentpsy.com](https://agentpsy.com)
- **Contact**: contact@agentpsy.com
- **Project Link**: [https://github.com/ptreezh/mcloudautomationaltest](https://github.com/ptreezh/mcloudautomationaltest)

## Copyright
Copyright (c) 2025 ptreezh  
AI Personality Lab (https://agentpsy.com)