/**
 * Google Ads & GA4 Conversion Tracking
 * Tracks: Phone calls, WhatsApp clicks, Form submissions, Thank you page
 */

(function() {
    'use strict';

    // Wait for gtag to be available
    function waitForGtag(callback) {
        if (typeof gtag !== 'undefined') {
            callback();
        } else {
            setTimeout(function() { waitForGtag(callback); }, 100);
        }
    }

    waitForGtag(function() {

        // Track phone call clicks
        document.querySelectorAll('a[href^="tel:"]').forEach(function(link) {
            link.addEventListener('click', function() {
                // GA4 Event
                gtag('event', 'generate_lead', {
                    'event_category': 'contact',
                    'event_label': 'phone_call',
                    'value': 1
                });

                // Google Ads Conversion (will work once you set up conversion ID)
                gtag('event', 'conversion', {
                    'send_to': 'AW-CONVERSION_ID/CONVERSION_LABEL',
                    'event_callback': function() {
                        console.log('Phone call conversion tracked');
                    }
                });

                console.log('Phone call click tracked');
            });
        });

        // Track WhatsApp clicks
        document.querySelectorAll('a[href*="wa.me"], a[href*="whatsapp"]').forEach(function(link) {
            link.addEventListener('click', function() {
                // GA4 Event
                gtag('event', 'generate_lead', {
                    'event_category': 'contact',
                    'event_label': 'whatsapp',
                    'value': 1
                });

                console.log('WhatsApp click tracked');
            });
        });

        // Track form submissions
        document.querySelectorAll('form').forEach(function(form) {
            form.addEventListener('submit', function() {
                // GA4 Event
                gtag('event', 'generate_lead', {
                    'event_category': 'contact',
                    'event_label': 'form_submission',
                    'value': 1
                });

                console.log('Form submission tracked');
            });
        });

        // Track if on thank you page
        if (window.location.pathname.includes('thanks') ||
            window.location.pathname.includes('thank-you') ||
            window.location.pathname.includes('todah')) {

            gtag('event', 'generate_lead', {
                'event_category': 'contact',
                'event_label': 'thank_you_page',
                'value': 1
            });

            console.log('Thank you page conversion tracked');
        }

        // Track CTA button clicks (mobile bar)
        document.querySelectorAll('.cta-call, .cta-whatsapp, .mobile-cta-bar a').forEach(function(btn) {
            btn.addEventListener('click', function() {
                var label = btn.classList.contains('cta-whatsapp') ? 'cta_whatsapp' : 'cta_call';

                gtag('event', 'generate_lead', {
                    'event_category': 'cta',
                    'event_label': label,
                    'value': 1
                });

                console.log('CTA click tracked: ' + label);
            });
        });

        console.log('Conversion tracking initialized');
    });
})();
