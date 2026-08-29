$rootDir = "c:\Users\ADMIN\OneDrive\Desktop\hackathon\frontend\src"
$files = Get-ChildItem -Path $rootDir -Recurse -Filter *.jsx | Where-Object { $_.FullName -notmatch '\\volunteer\\' }

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    $newContent = $content

    # Fix fractional spacing that violates the 4px grid (where 1 unit = 4px).
    # .5 = 2px, which violates the 4px rule unless specifically requested (user said 4,8,12,16...).
    
    # py-1.5 -> py-2 (8px) or py-1 (4px). Let's use py-2 for buttons.
    $newContent = $newContent -replace 'py-1\.5', 'py-2'
    $newContent = $newContent -replace 'px-1\.5', 'px-2'
    
    # px-2.5 -> px-3 (12px)
    $newContent = $newContent -replace 'px-2\.5', 'px-3'
    $newContent = $newContent -replace 'py-2\.5', 'py-3'
    
    # px-3.5 -> px-4 (16px)
    $newContent = $newContent -replace 'px-3\.5', 'px-4'
    $newContent = $newContent -replace 'py-3\.5', 'py-4'
    
    # gap-1.5 -> gap-2 (8px)
    $newContent = $newContent -replace 'gap-1\.5', 'gap-2'
    
    # gap-2.5 -> gap-3 (12px)
    $newContent = $newContent -replace 'gap-2\.5', 'gap-3'

    # m/p fractions
    $newContent = $newContent -replace 'mt-1\.5', 'mt-2'
    $newContent = $newContent -replace 'mb-1\.5', 'mb-2'
    $newContent = $newContent -replace 'mt-3\.5', 'mt-4'

    # rounded-xl for buttons (border radius 8-10px means rounded-lg)
    # The user rule for buttons: rounded-lg. rounded-xl is 12px which is for CARDS.
    # I won't blindly regex replace `rounded-xl` because cards need it!
    # I'll just fix the obvious spacing violations.

    if ($newContent -cne $content) {
        Set-Content -Path $file.FullName -Value $newContent -NoNewline -Encoding UTF8
        Write-Host "Updated $($file.FullName)"
    }
}
Write-Host "Done"
