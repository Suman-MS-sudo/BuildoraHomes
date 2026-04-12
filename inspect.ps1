$enc = New-Object System.Text.UTF8Encoding($false)
$allLines = [System.IO.File]::ReadAllLines("e:\HM Constructions\hm-site\src\PlannerPage.tsx", $enc)

# Check what's around the boundary
Write-Host "Line 197 (index): $($allLines[197])"
Write-Host "Line 198 (index): $($allLines[198])"
Write-Host "Line 199 (index): $($allLines[199])"
Write-Host "Line 200 (index): $($allLines[200])"
