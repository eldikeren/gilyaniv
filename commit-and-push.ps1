# Commit and Push Script - Asks for Staging or Production
param(
    [string]$Message = "",
    [string]$Target = ""  # "staging" or "production" or empty to ask
)

cd $PSScriptRoot

# If target not specified, ask the user
if ([string]::IsNullOrWhiteSpace($Target)) {
    Write-Host "`n=== Where do you want to deploy? ===" -ForegroundColor Cyan
    Write-Host "1. Staging (staging branch)"
    Write-Host "2. Production (main branch)"
    $choice = Read-Host "`nEnter your choice (1 or 2)"
    
    if ($choice -eq "1") {
        $Target = "staging"
    } elseif ($choice -eq "2") {
        $Target = "production"
    } else {
        Write-Host "Invalid choice. Exiting." -ForegroundColor Red
        exit 1
    }
}

# Normalize target
$Target = $Target.ToLower()
if ($Target -notin @("staging", "production", "main")) {
    Write-Host "Invalid target. Use 'staging' or 'production'." -ForegroundColor Red
    exit 1
}

# Map to branch
if ($Target -eq "staging") {
    $branch = "staging"
    $env = "STAGING"
} else {
    $branch = "main"
    $env = "PRODUCTION"
}

Write-Host "`n=== Deploying to $env ===" -ForegroundColor Yellow
Write-Host "Branch: $branch" -ForegroundColor Cyan

# Get commit message
if ([string]::IsNullOrWhiteSpace($Message)) {
    $Message = Read-Host "Enter commit message"
}

if ([string]::IsNullOrWhiteSpace($Message)) {
    Write-Host "Commit message cannot be empty!" -ForegroundColor Red
    exit 1
}

# Check current branch
$currentBranch = git rev-parse --abbrev-ref HEAD
Write-Host "`nCurrent branch: $currentBranch" -ForegroundColor Cyan

# Check if we need to switch branches
if ($currentBranch -ne $branch) {
    Write-Host "`nSwitching to $branch branch..." -ForegroundColor Yellow
    git checkout $branch
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Failed to switch to $branch branch!" -ForegroundColor Red
        exit 1
    }
}

# Show status
Write-Host "`n=== Git Status ===" -ForegroundColor Cyan
git status --short

# Stage all changes
Write-Host "`n=== Staging changes ===" -ForegroundColor Cyan
git add .

# Commit
Write-Host "`n=== Committing ===" -ForegroundColor Cyan
git commit -m $Message

if ($LASTEXITCODE -ne 0) {
    Write-Host "Commit failed or no changes to commit." -ForegroundColor Yellow
    $continue = Read-Host "Continue with push? (y/n)"
    if ($continue -ne "y") {
        exit 1
    }
}

# Push
Write-Host "`n=== Pushing to origin/$branch ===" -ForegroundColor Cyan
git push origin $branch

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n=== Success! ===" -ForegroundColor Green
    Write-Host "Changes pushed to $env ($branch branch)" -ForegroundColor Green
    Write-Host "`nVercel will automatically deploy:" -ForegroundColor Cyan
    if ($Target -eq "staging") {
        Write-Host "- Staging URL: https://gilyaniv-staging.vercel.app (or check Vercel dashboard)" -ForegroundColor Yellow
    } else {
        Write-Host "- Production URL: https://www.yanivgil.co.il" -ForegroundColor Yellow
    }
} else {
    Write-Host "`n=== Push Failed! ===" -ForegroundColor Red
    Write-Host "Please check the error messages above." -ForegroundColor Red
    exit 1
}
