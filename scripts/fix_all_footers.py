#!/usr/bin/env python3
"""
Fix footer text visibility on all pages
"""

import glob
import re

footer_css = '''
        /* Footer text visibility fix */
        footer, footer * {
            color: #d1d5db !important;
        }
        footer h3, footer h4 {
            color: #ffffff !important;
        }
        footer a:hover {
            color: #c9a55c !important;
        }
'''

html_files = glob.glob('*.html')

for html_file in html_files:
    # Skip backup files
    if any(x in html_file for x in ['backup', 'temp', 'old', 'before', 'check', 'full-content', 'blog-with']):
        continue

    try:
        with open(html_file, 'r', encoding='utf-8') as f:
            content = f.read()

        # Check if footer exists and fix not applied yet
        if '<footer' in content and 'Footer text visibility fix' not in content:
            # Find </style> before </head>
            head_end = content.find('</head>')
            if head_end > 0:
                style_end = content.rfind('</style>', 0, head_end)
                if style_end > 0:
                    content = content[:style_end] + footer_css + content[style_end:]
                    with open(html_file, 'w', encoding='utf-8') as f:
                        f.write(content)
                    print(f"Fixed footer in: {html_file}")
        else:
            if 'Footer text visibility fix' in content:
                print(f"Already fixed: {html_file}")

    except Exception as e:
        print(f"Error processing {html_file}: {e}")

print("Done!")
