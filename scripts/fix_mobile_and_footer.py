#!/usr/bin/env python3
"""
Fix mobile menu 2nd hierarchy buttons and footer text color across all pages
"""

import os
import re
import glob

# Get all HTML files in the root directory
html_files = glob.glob('*.html')

# CSS to add for mobile menu category buttons - this will be injected before </style>
mobile_menu_css = '''
        /* CRITICAL: Force 2nd hierarchy category buttons to be visible */
        #mobile-practice-dropdown .mb-2 > button,
        .mobile-menu-overlay .mb-2 > button,
        button[onclick*="toggleCategoryDropdown"] {
            display: flex !important;
            visibility: visible !important;
            opacity: 1 !important;
            width: 100% !important;
            padding: 0.75rem 1rem !important;
            background-color: #1a1a1a !important;
            color: #c9a55c !important;
            border: 1px solid #c9a55c !important;
            border-radius: 0.5rem !important;
            font-size: 1rem !important;
            font-weight: 600 !important;
            text-align: right !important;
            cursor: pointer !important;
            justify-content: space-between !important;
            align-items: center !important;
        }
        #mobile-practice-dropdown .mb-2 > button span,
        .mobile-menu-overlay .mb-2 > button span,
        button[onclick*="toggleCategoryDropdown"] span {
            color: #c9a55c !important;
            visibility: visible !important;
            opacity: 1 !important;
        }
'''

# Footer text fix - make sure footer links are readable
footer_css = '''
        /* Footer text visibility fix */
        footer a, footer p, footer li, footer span, footer div {
            color: #d1d5db !important;
        }
        footer h3 {
            color: #ffffff !important;
        }
        footer a:hover {
            color: #c9a55c !important;
        }
'''

processed_count = 0
skipped_count = 0

for html_file in html_files:
    # Skip backup/temp files
    if any(x in html_file for x in ['backup', 'temp', 'old', 'before', 'check', 'full-content']):
        skipped_count += 1
        continue

    try:
        with open(html_file, 'r', encoding='utf-8') as f:
            content = f.read()

        modified = False

        # Check if this file has a mobile menu
        if 'mobile-practice-dropdown' in content or 'toggleCategoryDropdown' in content:
            # Check if we already added our fix
            if 'CRITICAL: Force 2nd hierarchy category buttons' not in content:
                # Find the </style> tag and inject CSS before it
                # Look for the last </style> before </head>
                head_end = content.find('</head>')
                if head_end > 0:
                    # Find the last </style> before </head>
                    style_end_pattern = r'(</style>)\s*</head>'
                    match = re.search(style_end_pattern, content[:head_end+10], re.IGNORECASE)
                    if match:
                        insert_pos = match.start()
                        content = content[:insert_pos] + mobile_menu_css + content[insert_pos:]
                        modified = True
                        print(f"Added mobile menu CSS to {html_file}")

        # Check if file has footer that needs fixing
        if '<footer' in content:
            # Check if footer CSS fix already exists
            if 'Footer text visibility fix' not in content:
                # Find the </style> tag and inject footer CSS
                head_end = content.find('</head>')
                if head_end > 0:
                    style_end_pattern = r'(</style>)\s*</head>'
                    match = re.search(style_end_pattern, content[:head_end+10], re.IGNORECASE)
                    if match:
                        insert_pos = match.start()
                        content = content[:insert_pos] + footer_css + content[insert_pos:]
                        modified = True
                        print(f"Added footer CSS to {html_file}")

        if modified:
            with open(html_file, 'w', encoding='utf-8') as f:
                f.write(content)
            processed_count += 1

    except Exception as e:
        print(f"Error processing {html_file}: {e}")

print(f"\nProcessed {processed_count} files, skipped {skipped_count} backup files")
