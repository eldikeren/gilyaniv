/* Play hero only when visible; honor reduced motion */
(function(){
  const v = document.getElementById('heroVideo');
  if (!v) return;

  // Reduce motion: don't run video
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) { try { v.pause(); } catch(e){} return; }

  // Autoplay policy: keep muted+playsinline in HTML; this is just visibility control
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(({isIntersecting})=>{
      if (isIntersecting) { v.play().catch(()=>{}); }
      else { v.pause(); }
    });
  }, { threshold: 0.35 });

  io.observe(v);
})();
