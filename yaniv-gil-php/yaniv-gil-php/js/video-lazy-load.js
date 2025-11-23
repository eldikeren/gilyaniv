/**
 * Video Lazy Loading with IntersectionObserver
 * Loads hero videos only when they become visible
 */

document.addEventListener('DOMContentLoaded', function() {
    // Find all hero videos
    const heroVideos = document.querySelectorAll('video[preload="none"]');
    
    if (heroVideos.length === 0) return;
    
    // Create intersection observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const video = entry.target;
                
                // Load the video
                video.load();
                
                // Remove the observer for this video
                observer.unobserve(video);
                
                // Optional: Add a class to indicate video is loaded
                video.classList.add('video-loaded');
            }
        });
    }, {
        // Start loading when video is 50% visible
        threshold: 0.5,
        // Start loading when video is 100px away from viewport
        rootMargin: '100px'
    });
    
    // Observe all hero videos
    heroVideos.forEach(video => {
        observer.observe(video);
    });
    
    // Optional: Add loading states
    heroVideos.forEach(video => {
        video.addEventListener('loadstart', function() {
            this.classList.add('video-loading');
        });
        
        video.addEventListener('canplay', function() {
            this.classList.remove('video-loading');
            this.classList.add('video-ready');
        });
        
        video.addEventListener('error', function() {
            this.classList.add('video-error');
            console.warn('Video failed to load:', this.src);
        });
    });
});
