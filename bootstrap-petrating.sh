#!/bin/bash
# PetRating Bootstrap Script for macOS/Linux/WSL

set -e  # Exit on error

echo "🐕 PetRating Bootstrap Script"
echo "=============================="
echo ""

# Change to project directory
cd "/c/Projects/Fun project" 2>/dev/null || cd "$(dirname "$0")"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed."
    echo "Please install Node.js from https://nodejs.org/ and try again."
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo "✅ NPM version: $(npm --version)"
echo ""

# Create petrating directory if it doesn't exist
if [ ! -d "petrating" ]; then
    echo "📦 Creating Next.js project..."
    npx create-next-app@latest petrating \
        --typescript \
        --tailwind \
        --eslint \
        --app \
        --no-git \
        --import-alias "@/*" \
        --yes
else
    echo "✅ petrating directory already exists"
fi

echo ""
echo "📂 Entering petrating directory..."
cd petrating

echo ""
echo "📥 Installing dependencies..."
npm install

echo ""
echo "🔧 Creating environment file..."
if [ ! -f ".env.local" ]; then
    cat > .env.local << 'EOF'
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# OpenAI
OPENAI_API_KEY=your-openai-api-key

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=generate-with-openssl-rand-base64-32
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your-pk-key
STRIPE_SECRET_KEY=your-sk-key
EOF
    echo "✅ .env.local created (update with your API keys)"
else
    echo "✅ .env.local already exists"
fi

echo ""
echo "✅ PetRating project setup complete!"
echo ""
echo "📝 Next steps:"
echo "  1. Update .env.local with your actual API keys"
echo "  2. Run: npm run dev"
echo "  3. Open: http://localhost:3000"
echo ""
echo "🚀 Start development server with: npm run dev"
