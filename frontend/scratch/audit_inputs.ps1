$rootDir = "c:\Users\ADMIN\OneDrive\Desktop\hackathon\frontend\src"
$files = Get-ChildItem -Path $rootDir -Recurse -Filter *.jsx | Where-Object { $_.FullName -notmatch '\\volunteer\\' }

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    $newContent = $content

    # Target standard inputs in forms
    # We want to change 'rounded-md' to 'rounded-lg' for `<input` and `<select` and `<textarea` 
    # but we can do a generic replace on input elements using regex.
    # A simple regex to replace rounded-md with rounded-lg on input elements:
    $newContent = [regex]::Replace($newContent, '(?is)(<input[^>]+?)rounded-md([^>]*>)', '$1rounded-lg$2')
    $newContent = [regex]::Replace($newContent, '(?is)(<select[^>]+?)rounded-md([^>]*>)', '$1rounded-lg$2')
    $newContent = [regex]::Replace($newContent, '(?is)(<textarea[^>]+?)rounded-md([^>]*>)', '$1rounded-lg$2')

    if ($newContent -cne $content) {
        Set-Content -Path $file.FullName -Value $newContent -NoNewline -Encoding UTF8
        Write-Host "Updated $($file.FullName)"
    }
}
Write-Host "Done"
