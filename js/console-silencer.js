// This script completely silences all console output
// It must be loaded before any other scripts

(function() {
  // Store original console methods
  var noop = function() {};
  
  // Override all console methods with empty functions
  console.log = noop;
  console.error = noop;
  console.warn = noop;
  console.info = noop;
  console.debug = noop;
  console.trace = noop;
  console.dir = noop;
  console.dirxml = noop;
  console.group = noop;
  console.groupCollapsed = noop;
  console.groupEnd = noop;
  console.time = noop;
  console.timeEnd = noop;
  console.timeStamp = noop;
  console.profile = noop;
  console.profileEnd = noop;
  console.count = noop;
  console.assert = noop;
  console.clear = noop;
  
  // Override window.onerror to catch all JavaScript errors
  window.onerror = function(message, source, lineno, colno, error) {
    // Suppress all errors
    return true; // Prevents the error from being shown in console
  };
  
  // Prevent console.log from being restored
  Object.defineProperty(console, 'log', {
    get: function() { return noop; },
    set: function() {},
    configurable: false
  });
  
  // Prevent console.error from being restored
  Object.defineProperty(console, 'error', {
    get: function() { return noop; },
    set: function() {},
    configurable: false
  });
  
  // Prevent console.warn from being restored
  Object.defineProperty(console, 'warn', {
    get: function() { return noop; },
    set: function() {},
    configurable: false
  });
  
  // Prevent console.info from being restored
  Object.defineProperty(console, 'info', {
    get: function() { return noop; },
    set: function() {},
    configurable: false
  });
  
  // Prevent console.debug from being restored
  Object.defineProperty(console, 'debug', {
    get: function() { return noop; },
    set: function() {},
    configurable: false
  });
})();
