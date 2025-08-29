#!/bin/bash

# 部署脚本
# 构建项目
echo "Building project..."
npm run build

# 检查是否成功构建
if [ $? -eq 0 ]; then
    echo "Build successful!"
    
    # 部署到GitHub Pages的说明
    echo "To deploy to GitHub Pages:"
    echo "1. Create a new repository on GitHub"
    echo "2. Add the remote repository:"
    echo "   git remote add origin https://github.com/your-username/your-repo-name.git"
    echo "3. Push the code:"
    echo "   git push -u origin master"
    echo "4. Enable GitHub Pages in repository settings"
    echo "   - Go to Settings -> Pages"
    echo "   - Select gh-pages branch as source"
    echo ""
    echo "Alternatively, you can use the gh-pages package:"
    echo "1. Install gh-pages:"
    echo "   npm install gh-pages --save-dev"
    echo "2. Add these scripts to package.json:"
    echo "   \"predeploy\": \"npm run build\","
    echo "   \"deploy\": \"gh-pages -d dist\""
    echo "3. Deploy with:"
    echo "   npm run deploy"
else
    echo "Build failed!"
    exit 1
fi
