# AI-Powered PC Documentation

## Table of Contents
1. [Introduction](#introduction)
2. [Version-Specific Installation Guide](#version-specific-installation-guide)
3. [Frontend Configuration and Setup](#frontend-configuration-and-setup)
4. [Backend Configuration and Setup](#backend-configuration-and-setup)
5. [Troubleshooting](#troubleshooting)

## Introduction

This document provides comprehensive guidelines for setting up the frontend and backend of the AI-Powered PC application, detailing the processes necessary for a smooth deployment.

### Clone the Repository
To begin, clone the project repository:
```
git clone https://github.com/shujaul2100/AI_POWERED_PC.git
```

### System Architecture
- **Front End:**  
  ![Frontend Image](https://github.com/user-attachments/assets/c5ee70ca-397a-4c6e-b5fc-12b0f4ce9393)

- **Back End Server:**  
  ![Backend Server Image](https://github.com/user-attachments/assets/27a95a2c-2aae-4ed4-aca7-0714b24db0de)

- **Current Configuration:**  
  ![Configuration Image](https://github.com/user-attachments/assets/34d66031-c1e7-4cb6-9f19-c01415e40ca7)

**Important Note:** Always start the backend server before launching the frontend UI to avoid network errors.

## Version-Specific Installation Guide

Ensure you install the specific versions of Python, Node.js, npm, and Rust as detailed below to avoid compatibility issues, especially with libraries like the Open Interference library.

### Python (Version 3.12.0)
- **Windows:**
  1. Download Python 3.12.0 from [Python Releases for Windows](https://www.python.org/downloads/windows/).
  2. Run the installer and ensure to select "Add Python to PATH" before installation.

- **macOS and Linux:**
  1. Install and configure `pyenv`:
     ```
     brew install pyenv  # macOS
     pyenv install 3.12.0
     pyenv global 3.12.0
     ```

### Node.js (Version 18.20.6) and npm (Version 10.8.2)
- **All Platforms:**
  1. Install Node.js and npm using `nvm`:
     ```
     nvm install 18.20.6
     nvm use 18.20.6
     npm install -g npm@10.8.2
     ```

### Rust (Version 1.84.0)
- **All Platforms:**
  1. Install Rust using `rustup`:
     ```
     curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
     rustup install 1.84.0
     rustup default 1.84.0
     ```

**Warning:** The Open Interference library requires Python version 3.12.0 or later. Verify the correct Python version is active with `python --version`.

## Frontend Configuration and Setup

Navigate to the `paal-ai-frontend` directory of your cloned repository. Choose one of the following methods to serve or develop the frontend.

### Method 1: Using Pre-built Files
1. **Locate the Build Directory:**
   ```
   cd paal-ai-frontend/build
   ```

2. **Serve the Build Directory:**
   Install `serve` if not present and launch the server:
   ```
   npm install -g serve
   serve -s build
   ```

### Method 2: Using Source Code
1. **Prepare the Environment:**
   ```
   cd paal-ai-frontend
   ```

2. **Install Dependencies:**
   If you encounter package issues:
   ```
   rm -rf node_modules
   npm install
   ```

3. **Launch the Application:**
   ```
   npm start
   ```

## Backend Configuration and Setup

Ensure the backend environment is set up by following these steps:

1. **Install the Open-Interference Library:**
   ```
   pip install open-interpreter
   ```

2. **Configure the OpenAI API Key:**
   Edit `server-backend.py` to include your API key:
   ```python
   interpreter.llm.api_key = "your_openai_api_key_here"
   ```

3. **Launch the Backend Server:**
   ```
   cd paal-ai-backend
   uvicorn server-backend:app --reload
   ```

## Troubleshooting

Address common issues such as dependency errors or port conflicts by verifying installations and configurations, or changing the port as necessary using:
```
PORT=XXXX npm start
```

## Conclusion

This guide provides streamlined instructions for setting up the AI-Powered PC application. For additional support or information, refer to the images and links provided throughout this document.

---
