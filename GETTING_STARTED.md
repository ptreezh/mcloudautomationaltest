# Getting Started Guide

## Quick Start Steps

### 1. Prerequisites
- **Node.js** (version 14 or higher)
- **Alibaba Cloud Account** with MCloud access
- **WeChat Mini Program Package** (ZIP format)
- **Microsoft Edge Browser**

### 2. Initial Setup
1. Download and extract the project files
2. Open a terminal/command prompt in the project directory
3. Install dependencies:
   ```bash
   npm install
   npx playwright install
   ```

### 3. Environment Preparation
1. Start Edge with remote debugging enabled:
   ```bash
   msedge --remote-debugging-port=9222
   ```
2. In the opened Edge browser, log into Alibaba Cloud MCloud:
   - Go to https://mcloud.console.aliyun.com
   - Use your Alibaba Cloud credentials to log in
   - Navigate to the mini program testing section to ensure access

### 4. Configuration
Set the environment variable for your mini program package:
```bash
# On Windows Command Prompt:
set MINIPROGRAM_PACKAGE_PATH=C:\path\to\your\miniprogram.zip

# On Windows PowerShell:
$env:MINIPROGRAM_PACKAGE_PATH="C:\path\to\your\miniprogram.zip"

# On Linux/macOS:
export MINIPROGRAM_PACKAGE_PATH=/path/to/your/miniprogram.zip
```

### 5. First Run
Execute the step-by-step automation to familiarize yourself with the process:
```bash
node step_by_step_automation.js
```

## Understanding the Automation Scripts

### Available Scripts
- **`advanced_mcloud_automation.js`** - Full-featured automation with comprehensive error handling
- **`simple_automation.js`** - Basic automation for quick tasks
- **`step_by_step_automation.js`** - Verbose automation with detailed progress reporting
- **`test_connection.js`** - Simple script to verify browser connection

### Selecting the Right Script
- **New Users**: Start with `step_by_step_automation.js` to understand the process
- **Regular Use**: Use `advanced_mcloud_automation.js` for production tasks
- **Quick Tests**: Use `simple_automation.js` for fast validation
- **Troubleshooting**: Use `test_connection.js` to verify setup

## First Automation Run

1. Ensure your mini program package is ready and the path is set correctly
2. Run the step-by-step automation:
   ```bash
   node step_by_step_automation.js
   ```
3. Watch the console output for status updates
4. Observe the automation performing these steps:
   - Connect to your Edge browser
   - Navigate to MCloud if needed
   - Create a test task
   - Select mini program test type
   - Upload your package
   - Monitor the test execution
   - Collect results

## Language Selection

To run the automation in your preferred language, you can modify the default language setting. The project supports 10 languages:

- English (default)
- Chinese
- Japanese  
- Korean
- French
- German
- Italian
- Spanish
- Russian
- Thai

For example, to use Chinese interface messages, you would modify the i18nManager initialization in your script to use 'zh' as the default language.

## Verification Steps

After your first run, verify the following:

1. ✅ Browser connected successfully
2. ✅ Package uploaded to MCloud
3. ✅ Test started in MCloud
4. ✅ Progress was monitored
5. ✅ Results were collected

## Next Steps

Once your first automation run is successful, you can:

1. **Explore Advanced Features**: Try using the advanced automation script
2. **Customize Configuration**: Adjust settings for your specific needs
3. **Set Up CI/CD**: Integrate the automation into your development workflow
4. **Review Reports**: Analyze the generated test reports
5. **Troubleshoot Issues**: Use the troubleshooting guide if needed

## Need Help?

If you encounter any issues during setup:

- Check the [Troubleshooting](#troubleshooting) section
- Verify all prerequisites are met
- Ensure correct environment variables are set
- Confirm your MCloud account has necessary permissions
- Review the console output for error messages

---

## Troubleshooting Quick Fixes

### Common Issues

**Issue: Cannot connect to browser**
- Solution: Ensure Edge was started with `--remote-debugging-port=9222`

**Issue: Upload fails**
- Solution: Verify `MINIPROGRAM_PACKAGE_PATH` is set correctly and file exists

**Issue: Not logged in to MCloud**
- Solution: Manually log in to MCloud in the Edge browser before running automation

**Issue: Elements not found**
- Solution: MCloud interface might have updated; report the issue or update selectors

This quick start guide should get you up and running with MCloud Mini Program Automation in just a few minutes!