# 康元方舟 - 一键部署到 GitHub Pages
# 双击运行或在 PowerShell 中执行: .\deploy.ps1

$env:PATH = 'C:\Program Files\Git\cmd;' + $env:PATH
Set-Location $PSScriptRoot

$msg = "update: $(Get-Date -Format 'yyyy-MM-dd HH:mm')"
if ($args.Count -gt 0) { $msg = $args[0] }

Write-Host "=== 康元方舟部署 ===" -ForegroundColor Green
Write-Host "提交信息: $msg"
Write-Host ""

git add .
git commit -m $msg
git push origin main

Write-Host ""
Write-Host "=== 推送完成 ===" -ForegroundColor Green
Write-Host "线上地址: https://endian123.github.io/kangyuan-ark/aligner-kangyuan-v3.html" -ForegroundColor Cyan
Write-Host "GitHub Pages 约 1-2 分钟后生效" -ForegroundColor Yellow
Write-Host ""
Read-Host "按回车关闭"
