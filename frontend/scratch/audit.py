import os
import re

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    new_content = content
    
    # Text standardization
    new_content = re.sub(r'text-\[10px\]', 'text-xs', new_content)
    new_content = re.sub(r'text-\[11px\]', 'text-xs', new_content)
    new_content = re.sub(r'text-\[12px\]', 'text-xs', new_content)
    new_content = re.sub(r'text-\[13px\]', 'text-sm', new_content)
    new_content = re.sub(r'text-\[15px\]', 'text-base', new_content)
    new_content = re.sub(r'text-\[17px\]', 'text-lg', new_content)
    new_content = re.sub(r'text-\[20px\]', 'text-xl', new_content)
    new_content = re.sub(r'text-\[22px\]', 'text-xl', new_content)
    new_content = re.sub(r'text-\[26px\]', 'text-3xl', new_content)
    new_content = re.sub(r'text-\[28px\]', 'text-3xl', new_content)
    new_content = re.sub(r'text-\[34px\]', 'text-3xl', new_content)

    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {filepath}")

def main():
    root_dir = r"c:\Users\ADMIN\OneDrive\Desktop\hackathon\frontend\src"
    for dirpath, dirnames, filenames in os.walk(root_dir):
        if "\\volunteer" in dirpath:
            continue
        for filename in filenames:
            if filename.endswith(".jsx"):
                filepath = os.path.join(dirpath, filename)
                process_file(filepath)

if __name__ == "__main__":
    main()
