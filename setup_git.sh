#!/bin/bash
cd /Users/khuswantrajpurohit/Desktop/fashion-e-commerce-main

rm -rf .git
git init 

# Set up git user
git config user.name "Khuswant Rajpurohit"
git config user.email "khuswant18@gmail.com"

# Add the origin
git remote add origin https://github.com/khuswant18/E-Commerce-Devops.git

# Core backend ignore file
cat << 'EOF' > .gitignore
node_modules/
.env
.env.*
!.env.example
dist/
build/
.DS_Store
coverage/
EOF

# Make sure we don't accidentally commit .env
rm -f .env.local

git checkout -b main

# 1. Initialize E-Commerce project and docs
git add .gitignore ARCHITECTURE.md README.md 2>/dev/null
git commit -m "init: initialize E-Commerce project and docs"

# 2. setup node backend project structure and Prisma schema
git add server/package.json server/package-lock.json server/prisma server/src/index.js server/.eslintrc.cjs 2>/dev/null
git commit -m "feat: setup node backend project structure and Prisma schema"

# 3. implement backend API controllers and authentication middleware
git add server/src/controllers server/src/lib server/src/middleware server/src/routes server/src/utils 2>/dev/null
git commit -m "feat: implement backend API controllers and authentication middleware"

# 4. test: add integration tests for backend services
git add server/tests server/jest.config.cjs 2>/dev/null
git commit -m "test: add integration tests for backend services"

# 5. feat: bootstrap React client with Vite and tailwindcss
git add client/package.json client/package-lock.json client/vite.config.ts client/tsconfig.json client/postcss.config.js client/index.html client/vite-plugin-meta-images.ts client/vercel.json 2>/dev/null
git commit -m "feat: bootstrap React client with Vite and tailwindcss"

# 6. feat: configure Tailwind theme and primitive UI components
git add client/src/index.css client/src/main.tsx client/src/App.tsx client/src/vite-env.d.ts client/src/components/ui/ client/.eslintrc.cjs 2>/dev/null
git commit -m "feat: configure Tailwind theme and primitive UI components"

# 7. feat: implement frontend routing, page views and API hooks
git add client/src/contexts client/src/hooks client/src/lib client/src/pages client/shared client/components.json client/vitest.config.ts 2>/dev/null
git commit -m "feat: implement frontend routing, page views and API hooks"

# 8. feat: add specialized layout and shop components
git add client/src/components/home client/src/components/layout client/src/components/shop client/src/components/admin client/public 2>/dev/null
git commit -m "feat: add specialized layout and shop components"

# 9. chore: setup code formatting and dependency bots
git add .prettierrc.json .prettierignore .github/dependabot.yml 2>/dev/null
git commit -m "chore: setup code formatting and dependency bots"

# 10. ci: automate linting, testing, and EC2 deployment via GitHub Actions
git add .github/workflows 2>/dev/null
git commit -m "ci: automate linting, testing, and EC2 deployment via GitHub Actions"

# 11. fix: resolve residual application typings and uncommitted items
git add . 2>/dev/null
git commit -m "fix: resolve residual application typings and uncommitted items"

# Push and override remote
git push -u origin main --force
