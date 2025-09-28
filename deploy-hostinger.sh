#!/bin/bash
# Deploy Next.js app for Hostinger (Node.js hosting)
# Usage: bash deploy-hostinger.sh

set -e

# 1. Install dependencies
npm install

# 2. Build the app
npm run build

# 3. Remove dev dependencies (optional, for smaller upload)
npm prune --production

# 4. Zip necessary files for upload
zip -r nextjs-deploy.zip .next public node_modules package.json Procfile next.config.* tsconfig.json README.md package-lock.json 2>/dev/null || true

echo "\nDeployment package 'nextjs-deploy.zip' created.\n"
echo "Upload this zip to your Hostinger server, extract, and run 'npm run start' (or use the Procfile)."
