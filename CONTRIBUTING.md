# 🤝 Contributing to ChessVision

Thank you for considering contributing to ChessVision! We welcome contributions from the community and appreciate your help in making this project better.

## 📋 Table of Contents

- [🚀 Getting Started](#-getting-started)
- [🔧 Development Setup](#-development-setup)
- [📝 How to Contribute](#-how-to-contribute)
- [🎯 Code Style & Guidelines](#-code-style--guidelines)
- [🐛 Bug Reports](#-bug-reports)
- [💡 Feature Requests](#-feature-requests)
- [🧪 Testing](#-testing)
- [📚 Documentation](#-documentation)
- [❓ Questions](#-questions)

## 🚀 Getting Started

### Fork and Clone the Repository

1. **Fork the repository** by clicking the "Fork" button on GitHub
2. **Clone your fork** to your local machine:
   ```bash
   git clone https://github.com/YOUR-USERNAME/ChessVision.git
   cd ChessVision
   ```

3. **Add the original repository as a remote**:
   ```bash
   git remote add upstream https://github.com/H0NEYP0T-466/ChessVision.git
   ```

## 🔧 Development Setup

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager
- Git

### Installation

1. **Install frontend dependencies**:
   ```bash
   npm install
   ```

2. **Install backend dependencies**:
   ```bash
   cd backend
   npm install
   cd ..
   ```

3. **Start the development servers**:

   **Frontend** (in one terminal):
   ```bash
   npm run dev
   ```

   **Backend** (in another terminal):
   ```bash
   cd backend
   node index.js
   ```

## 📝 How to Contribute

### Step-by-Step Process

1. **Create a feature branch** from `main`:
   ```bash
   git checkout -b feature/amazing-feature
   ```

2. **Make your changes**:
   - Write clean, readable code
   - Follow our coding standards
   - Add tests if applicable
   - Update documentation as needed

3. **Test your changes**:
   ```bash
   npm run lint
   npm run build
   ```

4. **Commit your changes**:
   ```bash
   git add .
   git commit -m "Add amazing feature"
   ```

5. **Push to your fork**:
   ```bash
   git push origin feature/amazing-feature
   ```

6. **Create a Pull Request**:
   - Go to your fork on GitHub
   - Click "New Pull Request"
   - Provide a clear title and description
   - Reference any related issues

### Pull Request Guidelines

- Provide a clear description of the changes
- Include screenshots for UI changes
- Reference related issues using `#issue-number`
- Ensure all tests pass
- Make sure your code follows our style guidelines
- Keep pull requests focused and atomic

## 🎯 Code Style & Guidelines

### JavaScript/JSX Style

- Use ES6+ features
- Follow existing code formatting
- Use meaningful variable and function names
- Write descriptive comments for complex logic
- Use consistent indentation (2 spaces)

### Linting

We use ESLint to maintain code quality. Run the linter before committing:

```bash
npm run lint
```

### Commit Messages

Use clear, descriptive commit messages:

```bash
# Good
git commit -m "Add drag-and-drop functionality to chess pieces"
git commit -m "Fix socket connection timeout issue"
git commit -m "Update README with installation instructions"

# Bad
git commit -m "fix bug"
git commit -m "update stuff"
git commit -m "wip"
```

### Code Organization

- Keep components small and focused
- Use proper file naming conventions
- Organize imports logically
- Remove unused code and imports

## 🐛 Bug Reports

When reporting a bug, please include:

### Required Information

- **Bug description**: Clear, concise description of the issue
- **Steps to reproduce**: Detailed steps to reproduce the behavior
- **Expected behavior**: What you expected to happen
- **Actual behavior**: What actually happened
- **Environment details**:
  - Browser and version
  - Operating system
  - Node.js version
  - Project version

### Bug Report Template

```markdown
**Bug Description**
A clear and concise description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected Behavior**
A clear and concise description of what you expected to happen.

**Screenshots**
If applicable, add screenshots to help explain your problem.

**Environment**
- Browser: [e.g. Chrome 91, Firefox 89]
- OS: [e.g. Windows 10, macOS 11.4, Ubuntu 20.04]
- Node.js version: [e.g. 16.3.0]
- Project version: [e.g. 1.0.0]

**Additional Context**
Add any other context about the problem here.
```

## 💡 Feature Requests

We welcome feature requests! When suggesting a new feature:

### Include This Information

- **Feature description**: Clear description of the proposed feature
- **Use case**: Why this feature would be useful
- **Proposed implementation**: How you think it should work
- **Alternatives considered**: Other solutions you've considered

### Feature Request Template

```markdown
**Feature Description**
A clear and concise description of the feature you'd like to see.

**Problem/Use Case**
Describe the problem this feature would solve or the use case it addresses.

**Proposed Solution**
Describe the solution you'd like to see implemented.

**Alternative Solutions**
Describe any alternative solutions or features you've considered.

**Additional Context**
Add any other context, mockups, or examples about the feature request.
```

## 🧪 Testing

### Running Tests

Currently, we're working on expanding our test coverage. When tests are available:

```bash
npm test
```

### Writing Tests

When adding new features:
- Write unit tests for new functions
- Add integration tests for new components
- Test edge cases and error conditions
- Ensure tests are readable and maintainable

## 📚 Documentation

### Updating Documentation

When making changes that affect usage:
- Update the README.md if needed
- Add inline code comments for complex logic
- Update this CONTRIBUTING.md if you change the contribution process
- Consider adding examples for new features

### Documentation Style

- Use clear, concise language
- Include code examples where helpful
- Keep documentation up-to-date with code changes
- Use proper markdown formatting

## ❓ Questions

### Getting Help

If you have questions about contributing:

1. **Check existing issues**: Search for similar questions or problems
2. **Read the documentation**: Check the README and this guide
3. **Ask on GitHub**: Open an issue with the `question` label
4. **Join discussions**: Participate in GitHub Discussions if available

### Communication Guidelines

- Be respectful and constructive
- Provide context for your questions
- Be patient waiting for responses
- Help others when you can

---

## 🙏 Thank You

Thank you for contributing to ChessVision! Your contributions help make this project better for everyone.

### Recognition

- Contributors will be acknowledged in the project
- Significant contributions may be highlighted in release notes
- We appreciate all forms of contribution, big and small

---

<div align="center">

**Questions?** Feel free to [open an issue](https://github.com/H0NEYP0T-466/ChessVision/issues) or reach out to the maintainers.

**Happy Contributing! 🎯**

</div>