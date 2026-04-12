$f = [System.IO.File]::ReadAllText("e:\HM Constructions\hm-site\src\App.css")
# Try both line endings
$pat1 = "`r`n/* ==="
$pat2 = "`n/* ==="
$idx1 = $f.IndexOf($pat1, 100)
$idx2 = $f.IndexOf($pat2, 100)
Write-Host "CRLF pattern at: $idx1, LF pattern at: $idx2, File length: $($f.Length)"
# Use the mobile bottom contact bar section end as cut point
# Find "MOBILE BOTTOM CONTACT BAR" section
$mobIdx = $f.IndexOf("MOBILE BOTTOM CONTACT BAR")
Write-Host "Mobile bar section at: $mobIdx"
# Find the last closing } after MOBILE section
$lastClose = $f.LastIndexOf("}")
Write-Host "Last } at: $lastClose"
