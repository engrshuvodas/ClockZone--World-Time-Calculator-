# ⏰ ClockZone – World Time Calculator

<div align="center">

![ClockZone](https://img.shields.io/badge/ClockZone-World%20Time%20Calculator-purple?style=for-the-badge)
![Version](https://img.shields.io/badge/version-2.2-blue?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)

**A premium, modern dashboard for managing multiple timezones and converting meeting times across the globe.**

[Features](#-features) • [Demo](#-demo) • [Installation](#-installation) • [Usage](#-usage) • [Technology](#-technology) • [About](#-about)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Demo](#-demo)
- [Installation](#-installation)
- [Usage](#-usage)
- [Technology Stack](#-technology-stack)
- [Project Structure](#-project-structure)
- [Key Features Explained](#-key-features-explained)
- [Browser Support](#-browser-support)
- [Contributing](#-contributing)
- [License](#-license)
- [Author](#-author)

---

## 🎯 Overview

**Time Atlas** is a sophisticated, premium timezone management dashboard designed for professionals who work with international clients and teams. It provides an elegant solution for tracking multiple world clocks, converting meeting times between timezones, and managing your global schedule.

### Why Time Atlas?

- 🌍 **Multi-Timezone Support**: Track unlimited world clocks simultaneously
- 🔄 **Bidirectional Conversion**: Convert times both ways (Client → Local & Local → Client)
- 💎 **Premium Design**: Beautiful glassmorphism effects with 3D animations
- ⚡ **Real-Time Updates**: Live synchronized clocks updating every second
- 💾 **Persistent Storage**: Your pinned clocks and settings are saved locally
- 📱 **Fully Responsive**: Works seamlessly on desktop, tablet, and mobile devices

---

## ✨ Features

### 🕐 World Clock Management
- **Pin Multiple Clocks**: Add and remove world clocks for cities you care about
- **Live Synchronization**: All clocks update in real-time with browser time
- **Smart Detection**: Automatically detects your local timezone
- **Customizable Display**: Choose between 12-hour and 24-hour formats

### 🔄 Time Converter
- **Forward Conversion**: Convert client meeting times to your local timezone
- **Reverse Conversion**: Convert your local time to client's timezone
- **Multi-Timezone Display**: See converted time across all pinned clocks
- **Instant Results**: Real-time conversion with beautiful result cards

### 🎨 Premium Design
- **3D Card Animations**: Interactive tilt effects on hover
- **Glassmorphism UI**: Modern frosted glass design elements
- **Smooth Transitions**: Premium animations and micro-interactions
- **Dark Theme**: Easy on the eyes with professional color scheme
- **Gradient Effects**: Beautiful color gradients and glowing effects

### ⚙️ Customization
- **Time Format**: Toggle between 12-hour and 24-hour formats
- **Date Format**: Choose from short, long, or numeric date formats
- **Persistent Settings**: All preferences saved in browser storage
- **Responsive Layout**: Adapts beautifully to any screen size

---

## 🎬 Demo

### Screenshots

#### Main Dashboard
![Dashboard View](demo%20clock%20design.png)

*Clean, modern interface with local time and world clocks*

#### Time Converter
- **Forward Mode**: Convert client times to your local timezone
- **Reverse Mode**: Convert your local time to client timezones

#### Features Showcase
- Real-time clock updates
- 3D interactive card animations
- Glassmorphism design elements
- Smooth transitions and animations

### Live Demo
Visit the [live demo](https://clockzone-ten.vercel.app/)

**About Page**: [View Version History & Developer Info](https://clockzone-ten.vercel.app/about.html)

---

## 🚀 Installation

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No server or backend required - runs entirely in the browser!

### Quick Start

1. **Clone the repository**  
   ```bash
   git clone https://github.com/engrshuvodas/ClockZone--World-Time-Calculator-.git
   cd Multi-Country-Time
   ```

2. **Open in browser**
   ```bash
   # Simply open index.html in your browser
   # Or use a local server:
   python -m http.server 8000
   # Then visit http://localhost:8000
   ```

3. **That's it!** No build process, no dependencies, just open and use.

### Alternative: Direct Download
1. Download the repository as ZIP
2. Extract the files
3. Open `index.html` in your browser

---

## 📖 Usage

### Adding World Clocks

1. Click the **"+ Add Clock"** button
2. Search for a city or timezone
3. Click on the desired location
4. The clock will appear in your world clocks grid

### Removing Clocks

1. Hover over any world clock card
2. Click the **"−"** button in the bottom right
3. The clock will be removed

### Converting Times

#### Forward Conversion (Client → Local)
1. Ensure the toggle is set to **"Client → Local"**
2. Enter the client's meeting time
3. Select the date
4. Choose the client's timezone
5. Click **"Convert"** or wait for auto-conversion
6. View the converted time in your local timezone and all pinned clocks

#### Reverse Conversion (Local → Client)
1. Toggle to **"Local → Client"** mode
2. Enter your local meeting time
3. Select the date
4. Choose the client's timezone
5. View what that time is in the client's timezone

### Customizing Display Settings

1. **Time Format**: Use the dropdown to switch between 12-hour and 24-hour formats
2. **Date Format**: Choose from:
   - Short: `Mon, 24 Nov 2025`
   - Long: `Monday, November 24, 2025`
   - Numeric: `11/24/2025`

All settings are automatically saved and persist across sessions.

---

## 🛠 Technology Stack

### Core Technologies
- **HTML5**: Semantic markup structure
- **CSS3**: Modern styling with animations and effects
  - CSS Grid & Flexbox for layouts
  - CSS Custom Properties (Variables)
  - Backdrop filters for glassmorphism
  - 3D transforms for animations
- **Vanilla JavaScript**: No frameworks, pure JavaScript
  - ES6+ features
  - LocalStorage API for persistence
  - Intl API for timezone handling
  - Date manipulation

### Key APIs Used
- **Intl.DateTimeFormat**: Timezone conversions and formatting
- **LocalStorage**: Persistent data storage
- **Date API**: Time calculations and manipulations

### Design Principles
- **Mobile-First**: Responsive design approach
- **Progressive Enhancement**: Works without JavaScript (basic functionality)
- **Performance**: Optimized animations using CSS transforms
- **Accessibility**: Semantic HTML and ARIA labels

---

## 📁 Project Structure

```
Multi-Country-Time/
│
├── index.html              # Main HTML file
├── css/
│   └── styles.css          # All styles and animations
├── js/
│   └── script.js          # Application logic
├── demo clock design.png   # Design reference
└── README.md              # This file
```

### File Descriptions

- **index.html**: Main structure with semantic HTML
- **css/styles.css**: Complete styling including:
  - Global styles and variables
  - Component styles
  - Animations and transitions
  - Responsive breakpoints
- **js/script.js**: Core functionality including:
  - Timezone data management
  - Clock updates and synchronization
  - Time conversion logic
  - LocalStorage management
  - 3D animation handlers

---

## 🔑 Key Features Explained

### Real-Time Synchronization
All clocks update every second using `setInterval`, ensuring accurate time display synchronized with your browser's system clock.

### Timezone Conversion Algorithm
The conversion system uses an iterative approach:
1. Creates a date object representing the source time
2. Uses `Intl.DateTimeFormat` to format in target timezone
3. Calculates differences and adjusts iteratively
4. Ensures accurate conversion accounting for DST and timezone offsets

### 3D Card Animations
Interactive tilt effects are achieved using:
- Mouse position tracking
- CSS 3D transforms (`rotateX`, `rotateY`)
- Perspective transforms
- Smooth transitions

### Glassmorphism Effects
Modern frosted glass appearance created with:
- `backdrop-filter: blur()`
- Semi-transparent backgrounds
- Border highlights
- Layered shadows

### Persistent Storage
Uses `localStorage` to save:
- Pinned world clocks
- Display preferences (time/date format)
- User settings

---

## 🌐 Browser Support

| Browser | Version | Support |
|---------|---------|---------|
| Chrome  | 76+     | ✅ Full |
| Firefox | 78+     | ✅ Full |
| Safari  | 14+     | ✅ Full |
| Edge    | 79+     | ✅ Full |
| Opera   | 63+     | ✅ Full |

### Feature Support
- **Backdrop Filter**: Required for glassmorphism effects (all modern browsers)
- **CSS Grid**: Required for layouts (all modern browsers)
- **LocalStorage**: Required for persistence (all modern browsers)
- **Intl API**: Required for timezone conversions (all modern browsers)

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

### How to Contribute

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
5. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
6. **Open a Pull Request**

### Contribution Guidelines

- Follow the existing code style
- Add comments for complex logic
- Test your changes across different browsers
- Update documentation if needed
- Keep commits atomic and well-described

### Ideas for Contributions

- 🌍 Add more timezones/cities
- 🎨 New theme options
- 📱 Mobile app version
- 🔔 Meeting reminders/alerts
- 📅 Calendar integration
- 🌙 Dark/Light mode toggle
- 🔍 Enhanced search functionality
- 📊 Timezone statistics/analytics

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2025 Time Atlas

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 👤 Author

**Engr. Shuvo Das**

- 💬 WhatsApp: [Chat Now](https://wa.me/+8801765245872)
- 💼 LinkedIn: [Profile](https://www.linkedin.com/in/engrshuvoda/)
- 📺 YouTube: [Channel](https://www.youtube.com/channel/UCEJ0R871tF2PLT27q9azYWg)
- 💻 GitHub: [Repositories](https://github.com/engrshuvodas)
- 🎯 Fiverr: [Hire Me](https://www.fiverr.com/shuvo_das74886)
- 🌐 Portfolio: [About Me](https://engrshuvodas.github.io/me/)
- 📧 Email: [engrshuvoda@gmail.com](mailto:engrshuvoda@gmail.com)
- 🐦 X (Twitter): [@engrshuvodas](https://x.com/engrshuvodas)
- 👥 Facebook: [Engr Shuvo](https://www.facebook.com/engr.shuvo74886/)

### Acknowledgments

- Design inspiration from modern UI/UX trends
- Timezone data from IANA Time Zone Database
- Icons from Flaticon
- Fonts from Google Fonts (Inter)

---

## ⭐ Show Your Support

If you find this project helpful, please consider:

- ⭐ **Starring** this repository
- 🍴 **Forking** the project
- 🐛 **Reporting** bugs
- 💡 **Suggesting** new features
- 📢 **Sharing** with others

---

## 📊 Project Status

![GitHub stars](https://img.shields.io/github/stars/engrshuvodas/Multi-Country-Time?style=social)
![GitHub forks](https://img.shields.io/github/forks/engrshuvodas/Multi-Country-Time?style=social)
![GitHub issues](https://img.shields.io/github/issues/engrshuvodas/Multi-Country-Time)
![GitHub pull requests](https://img.shields.io/github/issues-pr/engrshuvodas/Multi-Country-Time)

**Current Version**: 2.2  
**Status**: ✅ Active Development  
**Last Updated**: February 18, 2025

## 📝 Version History

View detailed version history and changelog:
- [About Page](about.html) - Interactive version dropdown with details
- [CHANGELOG.md](CHANGELOG.md) - Complete changelog
- [PROMPT.md](PROMPT.md) - Project creation prompts and documentation

## 🔗 Quick Links

- 🌐 [Live Demo](https://clockzone-ten.vercel.app/)
- 📖 [About & Version History](https://clockzone-ten.vercel.app/about.html)
- 📝 [Changelog](CHANGELOG.md)
- 💻 [GitHub Repository](https://github.com/engrshuvodas/ClockZone--World-Time-Calculator-.git)

---

<div align="center">

**Made with ❤️ by [Engr. Shuvo Das](https://github.com/engrshuvodas) for global professionals**

© 2025 ClockZone – World Time Calculator v2.2

[⬆ Back to Top](#-clockzone--world-time-calculator)

</div>