$files = Get-ChildItem -Path .\src -Recurse -Include *.jsx,*.js
foreach ($file in $files) {
    $content = Get-Content -Path $file.FullName -Raw -Encoding UTF8
    if ($content -match 'â€¢') {
        $content = $content -replace 'â€¢', '•'
        Set-Content -Path $file.FullName -Value $content -Encoding UTF8
        Write-Host "Fixed $($file.FullName)"
    }
}
