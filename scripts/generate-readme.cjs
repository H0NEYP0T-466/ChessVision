#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Get repository information dynamically
function getRepoInfo() {
  try {
    const remoteUrl = execSync('git remote get-url origin', { encoding: 'utf8' }).trim();
    const match = remoteUrl.match(/github\.com[\/:]([^\/]+)\/([^\/]+?)(?:\.git)?$/);
    if (match) {
      return {
        owner: match[1],
        name: match[2]
      };
    }
  } catch (error) {
    console.warn('Could not determine repository info from git remote');
  }
  
  // Fallback to current directory name
  const currentDir = path.basename(process.cwd());
  return {
    owner: 'YOUR-USERNAME',
    name: currentDir
  };
}

// Detect project technologies
function detectTechnologies() {
  const technologies = [];
  
  if (fs.existsSync('package.json')) {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    const deps = { ...packageJson.dependencies, ...packageJson.devDependencies };
    
    if (deps.react) technologies.push('React');
    if (deps.vue) technologies.push('Vue');
    if (deps.angular) technologies.push('Angular');
    if (deps.express) technologies.push('Express.js');
    if (deps['socket.io']) technologies.push('Socket.IO');
    if (deps['chess.js']) technologies.push('Chess.js');
    if (deps.vite) technologies.push('Vite');
    if (deps.webpack) technologies.push('Webpack');
    if (deps.typescript) technologies.push('TypeScript');
    if (deps.tailwindcss) technologies.push('Tailwind CSS');
    if (deps.mongodb || deps.mongoose) technologies.push('MongoDB');
    if (deps.postgresql || deps.pg) technologies.push('PostgreSQL');
  }
  
  if (fs.existsSync('backend/package.json')) {
    technologies.push('Node.js');
    const backendPackageJson = JSON.parse(fs.readFileSync('backend/package.json', 'utf8'));
    const backendDeps = { ...backendPackageJson.dependencies, ...backendPackageJson.devDependencies };
    
    if (backendDeps.express) technologies.push('Express.js');
    if (backendDeps['socket.io']) technologies.push('Socket.IO');
    if (backendDeps['chess.js']) technologies.push('Chess.js');
    if (backendDeps.ejs) technologies.push('EJS');
  }
  
  if (fs.existsSync('requirements.txt') || fs.existsSync('setup.py')) {
    technologies.push('Python');
  }
  
  if (fs.existsSync('Cargo.toml')) {
    technologies.push('Rust');
  }
  
  if (fs.existsSync('go.mod')) {
    technologies.push('Go');
  }
  
  // Remove duplicates
  return [...new Set(technologies)];
}

// Generate folder structure
function generateFolderStructure(dirPath = '.', level = 0, maxLevel = 3) {
  const structure = [];
  const indent = '│   '.repeat(level);
  
  if (level > maxLevel) return structure;
  
  try {
    const items = fs.readdirSync(dirPath)
      .filter(item => !item.startsWith('.') && item !== 'node_modules' && item !== 'dist')
      .sort((a, b) => {
        const aIsDir = fs.statSync(path.join(dirPath, a)).isDirectory();
        const bIsDir = fs.statSync(path.join(dirPath, b)).isDirectory();
        if (aIsDir && !bIsDir) return -1;
        if (!aIsDir && bIsDir) return 1;
        return a.localeCompare(b);
      });
    
    items.forEach((item, index) => {
      const itemPath = path.join(dirPath, item);
      const stats = fs.statSync(itemPath);
      const isDirectory = stats.isDirectory();
      const isLastItem = index === items.length - 1;
      const prefix = level === 0 ? '' : (isLastItem ? '└── ' : '├── ');
      
      let emoji = '📄';
      if (isDirectory) emoji = '📁';
      else if (item.endsWith('.js') || item.endsWith('.jsx')) emoji = '⚡';
      else if (item.endsWith('.ts') || item.endsWith('.tsx')) emoji = '🔷';
      else if (item.endsWith('.css')) emoji = '🎨';
      else if (item.endsWith('.json')) emoji = '⚙️';
      else if (item.endsWith('.md')) emoji = '📖';
      
      structure.push(`${indent}${prefix}${emoji} ${item}${isDirectory ? '/' : ''}`);
      
      if (isDirectory && level < maxLevel) {
        const subStructure = generateFolderStructure(itemPath, level + 1, maxLevel);
        structure.push(...subStructure);
      }
    });
  } catch (error) {
    console.warn(`Could not read directory: ${dirPath}`);
  }
  
  return structure;
}

// Generate description based on detected technologies
function generateDescription(repoName, technologies) {
  const techString = technologies.join(', ');
  
  if (technologies.includes('Chess.js') && technologies.includes('Socket.IO')) {
    return `A modern, full-stack chess application built with React and Node.js, featuring real-time multiplayer gameplay, interactive chessboard with drag-and-drop functionality, and Socket.IO-powered live game sessions. This project combines the classic game of chess with modern web technologies to deliver an engaging gaming experience.`;
  } else if (technologies.includes('React') && technologies.includes('Socket.IO')) {
    return `A modern, full-stack ${repoName.toLowerCase()} application built with React and Node.js, featuring real-time multiplayer functionality, interactive user interface, and Socket.IO-powered live sessions. This project combines cutting-edge web technologies to deliver an engaging user experience.`;
  } else if (technologies.includes('Chess.js')) {
    return `A chess application built with ${techString}, featuring chess game logic, move validation, and an interactive chessboard interface. Perfect for chess enthusiasts and developers interested in game development.`;
  } else if (technologies.includes('React')) {
    return `A modern React application for ${repoName.toLowerCase()}, featuring a responsive user interface and interactive components. Built with modern web technologies for optimal performance and user experience.`;
  } else if (technologies.includes('Node.js')) {
    return `A Node.js application for ${repoName.toLowerCase()}, featuring server-side functionality and robust backend architecture. Built with modern JavaScript technologies and best practices.`;
  } else if (technologies.includes('Python')) {
    return `A Python application for ${repoName.toLowerCase()}, featuring clean code architecture and powerful functionality. Built with Python best practices and modern development workflows.`;
  } else {
    return `A modern ${repoName.toLowerCase()} application built with ${techString}. This project combines modern technologies to deliver a robust and scalable solution.`;
  }
}

// Generate installation instructions based on detected technologies
function generateInstallation(technologies) {
  const hasNodeJs = technologies.includes('Node.js') || technologies.includes('React') || technologies.includes('Express.js');
  const hasPython = technologies.includes('Python');
  const hasBackend = fs.existsSync('backend');
  
  let instructions = `### Prerequisites\n`;
  
  if (hasNodeJs) {
    instructions += `- Node.js (v14 or higher)\n`;
    instructions += `- npm or yarn package manager\n`;
  }
  if (hasPython) {
    instructions += `- Python 3.7 or higher\n`;
    instructions += `- pip package manager\n`;
  }
  
  instructions += `\n### Quick Start\n\n`;
  instructions += `1. **Clone the repository**\n`;
  instructions += `   \`\`\`bash\n`;
  instructions += `   git clone https://github.com/{{OWNER}}/{{REPO_NAME}}.git\n`;
  instructions += `   cd {{REPO_NAME}}\n`;
  instructions += `   \`\`\`\n\n`;
  
  if (hasNodeJs) {
    if (hasBackend) {
      instructions += `2. **Install frontend dependencies**\n`;
      instructions += `   \`\`\`bash\n`;
      instructions += `   npm install\n`;
      instructions += `   \`\`\`\n\n`;
      instructions += `3. **Install backend dependencies**\n`;
      instructions += `   \`\`\`bash\n`;
      instructions += `   cd backend\n`;
      instructions += `   npm install\n`;
      instructions += `   cd ..\n`;
      instructions += `   \`\`\`\n\n`;
    } else {
      instructions += `2. **Install dependencies**\n`;
      instructions += `   \`\`\`bash\n`;
      instructions += `   npm install\n`;
      instructions += `   \`\`\`\n\n`;
    }
  }
  
  if (hasPython) {
    instructions += `2. **Install Python dependencies**\n`;
    instructions += `   \`\`\`bash\n`;
    instructions += `   pip install -r requirements.txt\n`;
    instructions += `   \`\`\`\n\n`;
  }
  
  if (hasNodeJs) {
    if (hasBackend) {
      instructions += `4. **Start the development servers**\n\n`;
      instructions += `   **Frontend (in one terminal):**\n`;
      instructions += `   \`\`\`bash\n`;
      instructions += `   npm run dev\n`;
      instructions += `   \`\`\`\n\n`;
      instructions += `   **Backend (in another terminal):**\n`;
      instructions += `   \`\`\`bash\n`;
      instructions += `   cd backend\n`;
      instructions += `   node index.js\n`;
      instructions += `   \`\`\`\n\n`;
    } else {
      instructions += `3. **Start the development server**\n`;
      instructions += `   \`\`\`bash\n`;
      instructions += `   npm run dev\n`;
      instructions += `   \`\`\`\n\n`;
    }
  }
  
  return instructions;
}

function getLibraryDescription(tech) {
  const descriptions = {
    'React': 'A JavaScript library for building user interfaces',
    'Vue': 'The Progressive JavaScript Framework',
    'Angular': 'Platform for building mobile and desktop web applications',
    'Express.js': 'Fast, unopinionated web framework for Node.js',
    'Socket.IO': 'Real-time bidirectional event-based communication',
    'Vite': 'Next generation frontend tooling',
    'Node.js': 'JavaScript runtime built on Chrome\'s V8 JavaScript engine',
    'TypeScript': 'JavaScript with syntax for types',
    'Chess.js': 'JavaScript chess library for chess move generation/validation',
    'EJS': 'Embedded JavaScript templating engine'
  };
  return descriptions[tech] || 'Modern technology for building applications';
}

// Main function to generate README
function generateReadme() {
  const repoInfo = getRepoInfo();
  const technologies = detectTechnologies();
  const description = generateDescription(repoInfo.name, technologies);
  const installation = generateInstallation(technologies);
  const folderStructure = generateFolderStructure();
  const currentYear = new Date().getFullYear();
  
  const template = `# 🎯 ${repoInfo.name}

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub stars](https://img.shields.io/github/stars/${repoInfo.owner}/${repoInfo.name}.svg?style=social&label=Star)](https://github.com/${repoInfo.owner}/${repoInfo.name})
[![GitHub forks](https://img.shields.io/github/forks/${repoInfo.owner}/${repoInfo.name}.svg?style=social&label=Fork)](https://github.com/${repoInfo.owner}/${repoInfo.name}/fork)
[![Contributions Welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/${repoInfo.owner}/${repoInfo.name}/issues)
[![GitHub issues](https://img.shields.io/github/issues/${repoInfo.owner}/${repoInfo.name}.svg)](https://github.com/${repoInfo.owner}/${repoInfo.name}/issues)

## 📖 Description

${description}

**🚀 Key Technologies:** ${technologies.join(', ')}

---

## 📑 Table of Contents

- [📖 Description](#-description)
- [⚡ Installation](#-installation)
- [🎮 Usage](#-usage)
- [✨ Features](#-features)
- [📂 Folder Structure](#-folder-structure)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)
- [🗺️ Roadmap](#️-roadmap)
- [🙏 Acknowledgements](#-acknowledgements)

---

## ⚡ Installation

${installation.replace(/{{OWNER}}/g, repoInfo.owner).replace(/{{REPO_NAME}}/g, repoInfo.name)}

---

## 🎮 Usage

### Example Commands
\`\`\`bash
# Development mode
npm run dev

# Build for production
npm run build

# Lint the code
npm run lint

# Preview production build
npm run preview
\`\`\`

### Development Workflow
\`\`\`bash
# Start the application in development mode
npm run dev
\`\`\`

---

## ✨ Features

🎯 **Core Features:**
- 🚀 **Modern Architecture** - Built with cutting-edge technologies
- 🎨 **Interactive Interface** - Responsive and user-friendly design
- ⚡ **Real-time Updates** - Live functionality and instant feedback
- 🎮 **Enhanced User Experience** - Smooth and engaging interactions
- 🏁 **Robust Functionality** - Complete feature set with validation

🔧 **Technical Features:**
- 📱 **Responsive Design** - Works seamlessly across all devices
- 🚀 **Modern Tech Stack** - Built with ${technologies.slice(0, 3).join(', ')}${technologies.length > 3 ? ` and ${technologies.length - 3} more` : ''}
- ♻️ **Hot Module Replacement** - Fast development with instant updates
- 🎯 **Code Quality** - ESLint configuration and best practices
- 🎨 **Custom Styling** - Beautiful, modern UI with custom CSS

---

## 📂 Folder Structure

\`\`\`
${repoInfo.name}/
${folderStructure.join('\n')}
\`\`\`

---

## 🤝 Contributing

We welcome contributions from the community! Whether you're fixing bugs, adding features, or improving documentation, your help is appreciated.

### How to Contribute

1. **Fork the repository**
   \`\`\`bash
   # Click the "Fork" button on GitHub or use CLI
   gh repo fork ${repoInfo.owner}/${repoInfo.name}
   \`\`\`

2. **Clone your fork**
   \`\`\`bash
   git clone https://github.com/YOUR-USERNAME/${repoInfo.name}.git
   cd ${repoInfo.name}
   \`\`\`

3. **Create a feature branch**
   \`\`\`bash
   git checkout -b feature/amazing-feature
   \`\`\`

4. **Make your changes**
   - Follow the existing code style
   - Add tests if applicable
   - Update documentation as needed

5. **Commit your changes**
   \`\`\`bash
   git commit -m "Add amazing feature"
   \`\`\`

6. **Push to your fork**
   \`\`\`bash
   git push origin feature/amazing-feature
   \`\`\`

7. **Open a Pull Request**
   - Provide a clear description of your changes
   - Reference any related issues
   - Ensure all tests pass

### Development Guidelines
- Use meaningful commit messages
- Follow the existing code style
- Test your changes thoroughly
- Update documentation for new features

### Reporting Issues
Found a bug or have a feature request? Please [open an issue](https://github.com/${repoInfo.owner}/${repoInfo.name}/issues) with:
- Clear description of the problem/feature
- Steps to reproduce (for bugs)
- Expected vs actual behavior
- Your environment details

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

\`\`\`
MIT License

Copyright (c) ${currentYear} ${repoInfo.name} Team

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
\`\`\`

---

## 🗺️ Roadmap

### 🚀 Current Version (v1.0)
- [x] Core functionality implemented
- [x] Basic user interface
- [x] Essential features working
- [x] Documentation completed

### 🎯 Upcoming Features (v2.0)
- [ ] **Enhanced Features** - Additional functionality and improvements
- [ ] **User Experience** - Better interface and user interactions
- [ ] **Performance** - Optimization and speed improvements
- [ ] **Testing** - Comprehensive test coverage
- [ ] **Documentation** - Expanded guides and tutorials

### 🔮 Future Vision (v3.0+)
- [ ] **Advanced Features** - Cutting-edge functionality
- [ ] **Integration** - Third-party service connections
- [ ] **Scalability** - Enhanced performance and capacity
- [ ] **Mobile Support** - Native mobile applications
- [ ] **Analytics** - Usage tracking and insights

---

## 🙏 Acknowledgements

### Libraries & Frameworks
${technologies.map(tech => {
  const links = {
    'React': '[React](https://reactjs.org/)',
    'Vue': '[Vue.js](https://vuejs.org/)',
    'Angular': '[Angular](https://angular.io/)',
    'Express.js': '[Express.js](https://expressjs.com/)',
    'Socket.IO': '[Socket.IO](https://socket.io/)',
    'Vite': '[Vite](https://vitejs.dev/)',
    'Node.js': '[Node.js](https://nodejs.org/)',
    'TypeScript': '[TypeScript](https://www.typescriptlang.org/)',
    'Chess.js': '[Chess.js](https://github.com/jhlywa/chess.js)',
    'EJS': '[EJS](https://ejs.co/)'
  };
  const link = links[tech] || tech;
  return `- 🔥 **${link}** - ${getLibraryDescription(tech)}`;
}).join('\n')}

### Special Thanks
- Contributors who help improve this project
- The open-source community for inspiration and support
- Users who provide feedback and testing

---

<div align="center">

**🎯 Ready to get started?**

[⭐ Star this repo](https://github.com/${repoInfo.owner}/${repoInfo.name}) • [🐛 Report Bug](https://github.com/${repoInfo.owner}/${repoInfo.name}/issues) • [💡 Request Feature](https://github.com/${repoInfo.owner}/${repoInfo.name}/issues)

**Made with ❤️ by the ${repoInfo.name} team**

</div>`;

  return template;
}

// Generate and write the README
if (require.main === module) {
  const readme = generateReadme();
  fs.writeFileSync('README.md', readme);
  console.log('README.md generated successfully!');
}

module.exports = { generateReadme, getRepoInfo, detectTechnologies };