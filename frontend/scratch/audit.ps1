$rootDir = "c:\Users\ADMIN\OneDrive\Desktop\hackathon\frontend\src"
$files = Get-ChildItem -Path $rootDir -Recurse -Filter *.jsx | Where-Object { $_.FullName -notmatch '\\volunteer\\' }

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    $newContent = $content

    $newContent = $newContent -replace 'text-\[10px\]', 'text-xs'
    $newContent = $newContent -replace 'text-\[11px\]', 'text-xs'
    $newContent = $newContent -replace 'text-\[12px\]', 'text-xs'
    $newContent = $newContent -replace 'text-\[13px\]', 'text-sm'
    $newContent = $newContent -replace 'text-\[15px\]', 'text-base'
    $newContent = $newContent -replace 'text-\[17px\]', 'text-lg'
    $newContent = $newContent -replace 'text-\[20px\]', 'text-xl'
    $newContent = $newContent -replace 'text-\[22px\]', 'text-xl'
    $newContent = $newContent -replace 'text-\[26px\]', 'text-3xl'
    $newContent = $newContent -replace 'text-\[28px\]', 'text-3xl'
    $newContent = $newContent -replace 'text-\[34px\]', 'text-3xl'

    if ($newContent -cne $content) {
        Set-Content -Path $file.FullName -Value $newContent -NoNewline -Encoding UTF8
        Write-Host "Updated $($file.FullName)"
    }
}
Write-Host "Done"
