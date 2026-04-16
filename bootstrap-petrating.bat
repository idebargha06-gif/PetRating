@echo off
REM PetRating Bootstrap Script for Windows CMD

cd /d "c:\Projects\Fun project"

REM Check if petrating directory exists
if not exist "petrating" (
    echo Creating PetRating project...
    call npx create-next-app@latest petrating --typescript --tailwind --eslint --app --no-git --import-alias "@/*"--yes
) else (
    echo PetRating directory already exists
)

cd petrating

echo.
echo Installing dependencies...
call npm install

echo.
echo Creating environment file...
if not exist ".env.local" (
    (
        echo # Supabase
        echo NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
        echo NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
        echo SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
        echo.
        echo # OpenAI
        echo OPENAI_API_KEY=your-openai-api-key
        echo.
        echo # Cloudinary
        echo NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
        echo CLOUDINARY_API_KEY=your-api-key
        echo CLOUDINARY_API_SECRET=your-api-secret
        echo.
        echo # NextAuth
        echo NEXTAUTH_URL=http://localhost:3000
        echo NEXTAUTH_SECRET=your-nextauth-secret
        echo GOOGLE_CLIENT_ID=your-google-client-id
        echo GOOGLE_CLIENT_SECRET=your-google-client-secret
        echo.
        echo # Stripe
        echo NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your-pk-key
        echo STRIPE_SECRET_KEY=your-sk-key
    ) > .env.local
    echo .env.local created
)

echo.
echo ✅ PetRating project setup complete!
echo.
echo Next steps:
echo 1. Update .env.local with your actual API keys
echo 2. Run: npm run dev
echo 3. Open: http://localhost:3000
echo.
pause
