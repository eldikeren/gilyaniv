/**
 * /js/form-validation.js - Contact form validation with Hebrew error messages
 * Provides inline validation with visual feedback
 */
(function() {
  'use strict';

  const forms = document.querySelectorAll('form[data-validate]');
  if (!forms.length) return;

  // Hebrew error messages
  const messages = {
    required: 'שדה חובה',
    email: 'אנא הזן כתובת אימייל תקינה',
    tel: 'אנא הזן מספר טלפון תקין',
    minLength: function(len) { return `מינימום ${len} תווים`; },
    maxLength: function(len) { return `מקסימום ${len} תווים`; },
    pattern: 'הערך שהוזן אינו תקין',
    checkbox: 'יש לסמן שדה זה'
  };

  forms.forEach(function(form) {
    const inputs = form.querySelectorAll('input, textarea, select');

    // Validate on blur
    inputs.forEach(function(input) {
      input.addEventListener('blur', function() {
        validateField(input);
      });

      // Re-validate on input if already invalid
      input.addEventListener('input', function() {
        if (input.classList.contains('is-invalid')) {
          validateField(input);
        }
      });
    });

    // Validate all on submit
    form.addEventListener('submit', function(e) {
      let isValid = true;

      inputs.forEach(function(input) {
        if (!validateField(input)) {
          isValid = false;
        }
      });

      if (!isValid) {
        e.preventDefault();
        // Focus first invalid field
        const firstInvalid = form.querySelector('.is-invalid');
        if (firstInvalid) {
          firstInvalid.focus();
        }
      }
    });
  });

  function validateField(field) {
    const wrapper = field.closest('.form-group') || field.parentElement;

    // Remove existing error
    field.classList.remove('is-valid', 'is-invalid');
    const existingError = wrapper.querySelector('.error-message');
    if (existingError) {
      existingError.remove();
    }

    // Skip validation for non-required empty fields
    if (!field.required && !field.value.trim()) {
      return true;
    }

    // Check validity
    if (!field.checkValidity()) {
      field.classList.add('is-invalid');

      const error = document.createElement('span');
      error.className = 'error-message';
      error.setAttribute('role', 'alert');
      error.textContent = getErrorMessage(field);
      wrapper.appendChild(error);

      return false;
    }

    field.classList.add('is-valid');
    return true;
  }

  function getErrorMessage(field) {
    const validity = field.validity;

    if (validity.valueMissing) {
      if (field.type === 'checkbox') {
        return messages.checkbox;
      }
      return messages.required;
    }

    if (validity.typeMismatch) {
      if (field.type === 'email') return messages.email;
      if (field.type === 'tel') return messages.tel;
    }

    if (validity.tooShort) {
      return messages.minLength(field.minLength);
    }

    if (validity.tooLong) {
      return messages.maxLength(field.maxLength);
    }

    if (validity.patternMismatch) {
      return field.dataset.errorPattern || messages.pattern;
    }

    return messages.pattern;
  }

  // Add validation styles dynamically if not already in CSS
  if (!document.getElementById('form-validation-styles')) {
    const style = document.createElement('style');
    style.id = 'form-validation-styles';
    style.textContent = `
      .form-group input.is-valid,
      .form-group textarea.is-valid {
        border-color: #22c55e;
      }
      .form-group input.is-invalid,
      .form-group textarea.is-invalid {
        border-color: #ef4444;
        background-color: #fef2f2;
      }
      .error-message {
        display: block;
        color: #ef4444;
        font-size: 0.875rem;
        margin-top: 4px;
      }
    `;
    document.head.appendChild(style);
  }
})();
