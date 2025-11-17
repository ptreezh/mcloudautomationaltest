# MCloud Mini Program Automation - User Manual

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Installation](#installation)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Troubleshooting](#troubleshooting)

## Project Overview
MCloud Mini Program Automation is a comprehensive solution for automated testing of WeChat Mini Programs on the Alibaba Cloud MCloud platform. The solution leverages Playwright to connect to your existing browser instance and automate the testing workflow.

## Features
- Connect to existing Edge browser instance
- Automate mini program upload
- Configure test parameters
- Monitor test progress
- Generate test reports
- Multi-language support (10 languages)

## Installation
1. Install Node.js (version 14 or higher)
2. Install Playwright:
   ```bash
   npm install playwright
   npx playwright install
   ```
3. Clone or download the project
4. Install project dependencies:
   ```bash
   npm install
   ```

## Getting Started
1. Start Edge browser with remote debugging:
   ```bash
   msedge --remote-debugging-port=9222
   ```
2. Manually log into Alibaba Cloud MCloud in the browser
3. Set the mini program package path as environment variable:
   ```bash
   export MINIPROGRAM_PACKAGE_PATH=/path/to/your/package.zip
   ```
4. Run the automation script:
   ```bash
   node advanced_mcloud_automation.js
   ```

## Usage
The solution provides multiple automation levels:

### Simple Automation
Use `simple_automation.js` for basic automation tasks.

### Advanced Automation
Use `advanced_mcloud_automation.js` for comprehensive automation with error handling.

### Step-by-step Automation
Use `step_by_step_automation.js` for detailed control over each automation step.

## Troubleshooting
### Connection Issues
- Ensure Edge is started with `--remote-debugging-port=9222`
- Verify the port is not used by other applications
- Check that the browser has fully loaded before running the script

### Element Not Found
- The MCloud interface might have changed
- Update selectors in the automation scripts
- Ensure the browser window is large enough

### Authentication Problems
- Verify you're logged in to the correct account
- Make sure the session hasn't expired
- Re-login if necessary before running the script