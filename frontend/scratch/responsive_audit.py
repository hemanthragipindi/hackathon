import os
import re
import json

def audit_directory(dir_path):
    issues = {}
    
    # Common patterns that cause horizontal scrolling or clipping on small viewports
    fixed_widths = re.compile(r'w-\[?\d+(px|rem)?\]?|w-(64|72|80|96)')
    fixed_min_widths = re.compile(r'min-w-\[?\d+(px|rem)?\]?|min-w-(64|72|80|96)')
    table_pattern = re.compile(r'<table')
    
    for root, _, files in os.walk(dir_path):
        for file in files:
            if not file.endswith('.jsx'):
                continue
                
            path = os.path.join(root, file)
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()
                
            file_issues = []
            
            # Check for fixed widths that might not be responsive
            # E.g., if a component has w-96 and no md:w-96 or max-w-full
            widths = fixed_widths.finditer(content)
            for match in widths:
                context = content[max(0, match.start() - 30):min(len(content), match.end() + 30)]
                # If there's no responsive override like md: or max-w-full, it might be an issue
                if 'md:w' not in context and 'max-w-full' not in context and 'sm:w' not in context and 'w-full' not in context:
                    file_issues.append(f"Fixed width without responsive override: {match.group(0)}")
                    
            min_widths = fixed_min_widths.finditer(content)
            for match in min_widths:
                context = content[max(0, match.start() - 30):min(len(content), match.end() + 30)]
                file_issues.append(f"Fixed min-width: {match.group(0)}")
                
            if table_pattern.search(content):
                if 'overflow-x-auto' not in content:
                    file_issues.append("Table without overflow-x-auto wrapper")
                    
            # Check flex containers
            # A flex row that doesn't wrap and doesn't change direction on mobile might overflow
            # We look for "flex " but not "flex-wrap" or "flex-col" or "sm:flex-col"
            # This is a bit noisy, but we can look for "flex gap-" or "flex items-"
            # Actually, just search for tables and hardcoded widths for now.
            
            if file_issues:
                # Group by route (folder)
                route = root.replace(dir_path, '')
                if route not in issues:
                    issues[route] = {}
                issues[route][file] = list(set(file_issues))
                
    return issues

if __name__ == "__main__":
    src_dir = r"c:\Users\ADMIN\OneDrive\Desktop\hackathon\frontend\src"
    issues = audit_directory(src_dir)
    print(json.dumps(issues, indent=2))
