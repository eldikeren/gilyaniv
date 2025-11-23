/**
 * Script to add accessibility button to all HTML pages
 * Run: node scripts/add-accessibility-button.js
 */

const fs = require('fs');
const path = require('path');

const accessibilityButtonCSS = `
        /* Accessibility floating button */
        .accessibility-btn {
            position: fixed;
            bottom: 20px;
            left: 20px;
            z-index: 1000;
            width: 60px;
            height: 60px;
            background: #005fcc;
            color: white;
            border: none;
            border-radius: 50%;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
            text-decoration: none;
        }
        .accessibility-btn:hover {
            background: #004499;
            transform: scale(1.1);
            box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4);
        }
        .accessibility-btn:focus {
            outline: 3px solid #005fcc;
            outline-offset: 3px;
        }
        .accessibility-btn svg {
            width: 30px;
            height: 30px;
            fill: currentColor;
        }
        @media (max-width: 768px) {
            .accessibility-btn {
                width: 50px;
                height: 50px;
                bottom: 15px;
                left: 15px;
            }
            .accessibility-btn svg {
                width: 24px;
                height: 24px;
            }
        }
        
        /* Focus outlines for accessibility */
        a:focus,
        button:focus,
        input:focus,
        select:focus,
        textarea:focus {
            outline: 3px solid #005fcc !important;
            outline-offset: 2px;
        }
`;

const accessibilityButtonHTML = `
    <!-- Accessibility Floating Button -->
    <a href="accessibility.html" class="accessibility-btn" aria-label="הצהרת נגישות - גישה לדף נגישות האתר" title="הצהרת נגישות">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2"/>
            <path d="M9 12l2 2 4-4" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    </a>
`;

const pages = [
    'practice-areas.html',
    'articles.html',
    'blog.html',
    'media.html'
];

pages.forEach(page => {
    const filePath = path.join(__dirname, '..', page);
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Add CSS if not already present
        if (!content.includes('.accessibility-btn')) {
            // Find the last </style> tag and add CSS before it
            const styleEndIndex = content.lastIndexOf('</style>');
            if (styleEndIndex !== -1) {
                content = content.slice(0, styleEndIndex) + accessibilityButtonCSS + '\n    ' + content.slice(styleEndIndex);
            } else {
                // If no style tag, add before </head>
                const headEndIndex = content.indexOf('</head>');
                if (headEndIndex !== -1) {
                    content = content.slice(0, headEndIndex) + '    <style>' + accessibilityButtonCSS + '\n    </style>\n' + content.slice(headEndIndex);
                }
            }
        }
        
        // Add HTML button if not already present
        if (!content.includes('accessibility-btn')) {
            const bodyEndIndex = content.lastIndexOf('</body>');
            if (bodyEndIndex !== -1) {
                content = content.slice(0, bodyEndIndex) + accessibilityButtonHTML + '\n' + content.slice(bodyEndIndex);
            }
        }
        
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ Updated ${page}`);
    } else {
        console.log(`❌ File not found: ${page}`);
    }
});

console.log('\n✅ Done!');

