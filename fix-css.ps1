$f = [System.IO.File]::ReadAllText("e:\HM Constructions\hm-site\src\App.css")
$dupStart = $f.IndexOf("`n/* ===")
if ($dupStart -gt 0) {
    $clean = $f.Substring(0, $dupStart)
    [System.IO.File]::WriteAllText("e:\HM Constructions\hm-site\src\App.css", $clean, [System.Text.Encoding]::UTF8)
    $lines = (Get-Content "e:\HM Constructions\hm-site\src\App.css").Count
    Write-Host "Fixed. Lines: $lines"
} else {
    Write-Host "Pattern not found. Chars: $($f.Length)"
}
