$srcDir = "c:\Users\ADMIN\OneDrive\Desktop\hackathon\frontend\src"

$files = Get-ChildItem -Path $srcDir -Recurse -Filter *.jsx

$issues = @{}

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    
    $fileIssues = @()
    
    # Check for hardcoded widths
    if ($content -match 'w-\[?\d+(px|rem)?\]?') {
        # we check if it has md: or max-w-full
        if ($content -notmatch 'md:w' -and $content -notmatch 'max-w-full') {
            $fileIssues += "Hardcoded width without responsive override"
        }
    }

    # Check for hardcoded min-widths
    if ($content -match 'min-w-\[?\d+(px|rem)?\]?') {
        if ($content -notmatch 'md:min-w' -and $content -notmatch 'max-w-full') {
            $fileIssues += "Hardcoded min-width without responsive override"
        }
    }

    # Check for tables without overflow wrapper
    if ($content -match '<table') {
        if ($content -notmatch 'overflow-x-auto') {
            $fileIssues += "Table without overflow-x-auto wrapper"
        }
    }
    
    # Check for non-wrapping flex containers with many children
    # It's hard to accurately find this with regex in JSX, but we can try
    
    if ($fileIssues.Count -gt 0) {
        $relativePath = $file.FullName.Substring($srcDir.Length)
        $issues[$relativePath] = $fileIssues
    }
}

$issues | ConvertTo-Json -Depth 3
