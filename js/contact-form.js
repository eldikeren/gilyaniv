(() => {
  const SERVICE_ID = 'service_3vdbcvb';
  const TEMPLATE_ID = 'template_bbqt03j';
  const PUBLIC_KEY = 'bZa2jc2c_0IfnuYK4';
  const RECIPIENT_EMAIL = 'yanivgil@gmail.com';

  let isEmailJsReady = false;

  const SUBJECT_MAP = {
    family: 'דיני משפחה',
    bankruptcy: 'חדלות פירעון',
    civil: 'סדר דין אזרחי',
    'real-estate': 'מקרקעין',
    commercial: 'משפט מסחרי',
    labor: 'דיני עבודה',
    consultation: 'ייעוץ כללי',
    other: 'אחר'
  };

  function initEmailJS() {
    if (typeof emailjs === 'undefined' || isEmailJsReady) {
      return typeof emailjs !== 'undefined';
    }

    emailjs.init(PUBLIC_KEY);
    isEmailJsReady = true;
    return true;
  }

  function setStatus(el, message, type = 'info') {
    if (!el) return;
    el.textContent = message;
    el.classList.remove('hidden', 'text-gray-600', 'text-green-600', 'text-red-600');

    if (type === 'success') {
      el.classList.add('text-green-600');
    } else if (type === 'error') {
      el.classList.add('text-red-600');
    } else {
      el.classList.add('text-gray-600');
    }
  }

  function hideStatus(el) {
    if (!el) return;
    el.textContent = '';
    el.classList.add('hidden');
    el.classList.remove('text-gray-600', 'text-green-600', 'text-red-600');
  }

  function buildTemplateParams(formData, options) {
    const rawSubject =
      formData.get('subject') ||
      formData.get('topic') ||
      options.defaultSubject ||
      'פנייה חדשה מהאתר';

    const normalizedSubject = SUBJECT_MAP[rawSubject] || rawSubject;

    return {
      from_name: formData.get('name') || formData.get('from_name') || '',
      from_phone: formData.get('phone') || formData.get('from_phone') || '',
      from_email: formData.get('email') || formData.get('from_email') || '',
      subject: normalizedSubject,
      message: formData.get('message') || '',
      page: options.pageLabel || document.title,
      to_email: RECIPIENT_EMAIL,
      reply_to: formData.get('email') || formData.get('from_email') || ''
    };
  }

  function registerForm(selector, options = {}) {
    const form = typeof selector === 'string' ? document.querySelector(selector) : selector;
    if (!form) return;

    const statusEl = form.querySelector('[data-form-status]');
    const submitButton = form.querySelector('button[type="submit"]');

    form.addEventListener('submit', async (event) => {
      event.preventDefault();

      if (!initEmailJS()) {
        setStatus(
          statusEl,
          'לא ניתן להגיש את הטופס כרגע. אנא נסו שוב בעוד מספר דקות או התקשרו למשרד.',
          'error'
        );
        return;
      }

      const originalButtonText = submitButton ? submitButton.textContent : '';
      if (submitButton) {
        submitButton.textContent = 'שולח...';
        submitButton.disabled = true;
      }

      setStatus(statusEl, 'שולח את ההודעה...', 'info');

      const formData = new FormData(form);
      const templateParams = buildTemplateParams(formData, options);
      const emailParams = {
        ...templateParams,
        email: RECIPIENT_EMAIL
      };

      try {
        await emailjs.send(SERVICE_ID, TEMPLATE_ID, emailParams);
        setStatus(statusEl, 'ההודעה נשלחה בהצלחה! נחזור אליכם בהקדם.', 'success');
        form.reset();

        if (typeof options.onSuccess === 'function') {
          options.onSuccess();
        } else if (options.redirect) {
          setTimeout(() => {
            window.location.href = options.redirect;
          }, 1200);
        }
      } catch (error) {
        console.error('EmailJS error:', error);
        setStatus(
          statusEl,
          'אירעה תקלה בשליחת ההודעה. ניתן לנסות שוב או לפנות אלינו בטלפון 03-6092414.',
          'error'
        );

        if (options.enableMailtoFallback !== false) {
          const fallbackSubject = encodeURIComponent('פנייה מהאתר - Yaniv Gil Law');
          const fallbackBody = encodeURIComponent(
            [
              'שלום עו״ד יניב גיל,',
              '',
              'יש פנייה חדשה מהאתר:',
              `שם: ${templateParams.from_name}`,
              `טלפון: ${templateParams.from_phone}`,
              `אימייל: ${templateParams.from_email}`,
              `נושא: ${templateParams.subject}`,
              '',
              templateParams.message
            ].join('\n')
          );

          window.open(`mailto:${RECIPIENT_EMAIL}?subject=${fallbackSubject}&body=${fallbackBody}`, '_blank');
        }
      } finally {
        if (submitButton) {
          submitButton.textContent = originalButtonText;
          submitButton.disabled = false;
        }
      }
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    registerForm('#contact-form', {
      pageLabel: 'contact-page',
      defaultSubject: 'פנייה מעמוד צור קשר',
      redirect: 'thanks.html'
    });

    registerForm('#home-contact-form', {
      pageLabel: 'home-page',
      defaultSubject: 'פנייה מהעמוד הראשי',
      enableMailtoFallback: true
    });
  });
})();
