#!/usr/bin/env python3
# Script to fix mobile menu CSS in index.html

import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Find and replace the mobile menu CSS
old_css = '''        /* Full-screen mobile menu */
        .mobile-menu-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.9);
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
            transform: translateX(100%);
            transition: transform 0.3s ease-in-out;
        }
        .mobile-menu-overlay.active {
            transform: translateX(0);
        }
        .mobile-menu-content {
            background: white;
            padding: 2rem;
            border-radius: 10px;
            text-align: center;
            max-width: 300px;
            width: 90%;
        }
        .mobile-menu-close {
            position: absolute;
            top: 20px;
            right: 20px;
            background: none;
            border: none;
            font-size: 2rem;
            color: white;
            cursor: pointer;
        }
        .mobile-menu-links {
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }
        .mobile-menu-links a {
            display: block;
            padding: 1rem;
            background: #1a1a1a;
            color: #b8941f;
            text-decoration: none;
            border-radius: 5px;
            transition: all 0.3s ease;
        }
        .mobile-menu-links a:hover {
            background: #b8941f;
            color: #1a1a1a;
        }
        /* Mobile menu button styling to match links */
        .mobile-menu-links button.mobile-menu-link,
        nav button.mobile-menu-link {
            display: block;
            padding: 1rem;
            background: #1a1a1a;
            color: #c9a55c;
            text-decoration: none;
            border-radius: 5px;
            transition: all 0.3s ease;
            width: 100%;
            text-align: right;
            font-size: 1.125rem;
            line-height: 1.75rem;
            border: none;
            cursor: pointer;
        }
        .mobile-menu-links button.mobile-menu-link:hover,
        nav button.mobile-menu-link:hover {
            background: #c9a55c;
            color: #1a1a1a;
        }
        /* Navigation dropdown styles */'''

new_css = '''        /* Full-screen mobile menu */
        .mobile-menu-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: #ffffff;
            z-index: 9999;
            transform: translateX(100%);
            transition: transform 0.3s ease-in-out;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
        }
        .mobile-menu-overlay.active {
            transform: translateX(0);
        }
        /* Header section with logo and close button */
        .mobile-menu-overlay > .flex.justify-between {
            background: #ffffff;
            border-bottom: 1px solid #e5e7eb;
        }
        /* Main nav section */
        .mobile-menu-overlay nav {
            background: #ffffff;
            flex: 1;
        }
        .mobile-menu-overlay nav ul {
            list-style: none;
            margin: 0;
            padding: 0;
        }
        .mobile-menu-overlay nav ul li a.mobile-menu-link {
            display: block;
            padding: 1rem;
            background: #1a1a1a !important;
            color: #c9a55c !important;
            text-decoration: none;
            border-radius: 5px;
            margin-bottom: 0.5rem;
            transition: all 0.3s ease;
        }
        .mobile-menu-overlay nav ul li a.mobile-menu-link:hover {
            background: #c9a55c !important;
            color: #1a1a1a !important;
        }
        /* Category dropdown buttons - 2nd hierarchy - MUST be visible */
        .mobile-menu-overlay button[onclick*="toggleCategoryDropdown"],
        #mobile-practice-dropdown .mb-2 > button {
            display: flex !important;
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
        .mobile-menu-overlay button[onclick*="toggleCategoryDropdown"] span,
        #mobile-practice-dropdown .mb-2 > button span {
            color: #c9a55c !important;
        }
        .mobile-menu-overlay button[onclick*="toggleCategoryDropdown"]:hover,
        #mobile-practice-dropdown .mb-2 > button:hover {
            background-color: #c9a55c !important;
            color: #1a1a1a !important;
        }
        .mobile-menu-overlay button[onclick*="toggleCategoryDropdown"]:hover span,
        #mobile-practice-dropdown .mb-2 > button:hover span {
            color: #1a1a1a !important;
        }
        /* Main dropdown button */
        .mobile-menu-overlay button[onclick*="toggleNavDropdown"] {
            display: block !important;
            width: 100% !important;
            padding: 1rem !important;
            background: #1a1a1a !important;
            color: #c9a55c !important;
            border: none !important;
            border-radius: 5px !important;
            font-size: 1.125rem !important;
            text-align: right !important;
            cursor: pointer !important;
        }
        /* Dropdown container */
        #mobile-practice-dropdown {
            background: #2a2a2a;
            padding: 1rem;
            border-radius: 0.5rem;
            margin-top: 0.5rem;
        }
        /* Sub-links inside category dropdowns */
        #mobile-practice-dropdown a {
            color: #e5e7eb !important;
        }
        #mobile-practice-dropdown a:hover {
            color: #c9a55c !important;
            background: #3a3a3a !important;
        }
        .mobile-menu-close {
            position: absolute;
            top: 20px;
            right: 20px;
            background: none;
            border: none;
            font-size: 2rem;
            color: #333;
            cursor: pointer;
        }
        .mobile-menu-links {
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }
        .mobile-menu-links a {
            display: block;
            padding: 1rem;
            background: #1a1a1a;
            color: #b8941f;
            text-decoration: none;
            border-radius: 5px;
            transition: all 0.3s ease;
        }
        .mobile-menu-links a:hover {
            background: #b8941f;
            color: #1a1a1a;
        }
        /* Mobile menu button styling to match links */
        .mobile-menu-links button.mobile-menu-link,
        nav button.mobile-menu-link {
            display: block;
            padding: 1rem;
            background: #1a1a1a;
            color: #c9a55c;
            text-decoration: none;
            border-radius: 5px;
            transition: all 0.3s ease;
            width: 100%;
            text-align: right;
            font-size: 1.125rem;
            line-height: 1.75rem;
            border: none;
            cursor: pointer;
        }
        .mobile-menu-links button.mobile-menu-link:hover,
        nav button.mobile-menu-link:hover {
            background: #c9a55c;
            color: #1a1a1a;
        }
        /* Navigation dropdown styles */'''

if old_css in content:
    content = content.replace(old_css, new_css)
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(content)
    print('CSS updated successfully')
else:
    print('Old CSS not found exactly - trying to update anyway')
    # Try to find and update just the key parts
    # Update background-color from dark to white
    content = re.sub(
        r'\.mobile-menu-overlay \{\s*position: fixed;\s*top: 0;\s*left: 0;\s*width: 100%;\s*height: 100%;\s*background-color: rgba\(0, 0, 0, 0\.9\);',
        '''.mobile-menu-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: #ffffff;''',
        content
    )
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(content)
    print('Partial CSS update attempted')
