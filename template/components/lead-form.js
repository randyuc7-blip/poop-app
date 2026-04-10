function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function renderField(field) {
  const required = field.required ? 'required' : '';
  const placeholder = field.placeholder ? `placeholder="${escapeHtml(field.placeholder)}"` : '';

  if (field.type === 'textarea') {
    const rows = field.rows || 4;
    return `
      <label>
        ${escapeHtml(field.label)}
        <textarea name="${escapeHtml(field.name)}" rows="${rows}" ${placeholder} ${required}></textarea>
      </label>
    `;
  }

  if (field.type === 'select') {
    const options = (field.options || [])
      .map((option) => `<option value="${escapeHtml(option)}">${escapeHtml(option)}</option>`)
      .join('');

    return `
      <label>
        ${escapeHtml(field.label)}
        <select name="${escapeHtml(field.name)}" ${required}>
          <option value="">Select an option</option>
          ${options}
        </select>
      </label>
    `;
  }

  const inputMode = field.type === 'tel' ? 'tel' : '';
  const inputModeAttr = inputMode ? `inputmode="${inputMode}"` : '';

  return `
    <label>
      ${escapeHtml(field.label)}
      <input
        type="${escapeHtml(field.type)}"
        name="${escapeHtml(field.name)}"
        ${placeholder}
        ${inputModeAttr}
        ${required}
      >
    </label>
  `;
}

function encodeFormData(data) {
  return new URLSearchParams(data).toString();
}

async function postToWebhook(url, payload) {
  if (!url) {
    return;
  }

  try {
    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      mode: 'no-cors',
      keepalive: true,
      body: JSON.stringify(payload)
    });
  } catch (error) {
    console.warn('Webhook delivery failed.', error);
  }
}

function buildWebhookPayload(formData) {
  return {
    name: formData.get('name') || '',
    phone: formData.get('phone') || '',
    email: formData.get('email') || '',
    service: formData.get('service') || '',
    message: formData.get('message') || '',
    timestamp: new Date().toISOString()
  };
}

export function mountLeadForm(root, formConfig, webhookConfig = {}) {
  root.innerHTML = `
    <form
      id="leadCaptureForm"
      class="lead-form"
      name="${escapeHtml(formConfig.name)}"
      method="POST"
      action="/"
      data-netlify="true"
      netlify-honeypot="bot-field"
    >
      <input type="hidden" name="form-name" value="${escapeHtml(formConfig.name)}">
      <input type="hidden" name="bot-field">
      ${formConfig.fields.map(renderField).join('')}
      <button class="button button-primary button-block" type="submit">
        ${escapeHtml(formConfig.submitLabel)}
      </button>
    </form>
    <div class="message success" id="leadFormSuccess"></div>
    <div class="message error" id="leadFormError"></div>
  `;

  const form = root.querySelector('#leadCaptureForm');
  const successMessage = root.querySelector('#leadFormSuccess');
  const errorMessage = root.querySelector('#leadFormError');
  const submitButton = form.querySelector('button[type="submit"]');
  const webhookEnabled = Boolean(webhookConfig.enabled && webhookConfig.url);

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    successMessage.style.display = 'none';
    errorMessage.style.display = 'none';
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';

    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());
    const body = encodeFormData(payload);
    const webhookPayload = buildWebhookPayload(formData);

    try {
      await fetch(formConfig.endpoint || '/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body
      });

      successMessage.textContent = `${formConfig.successTitle} ${formConfig.successMessage}`.trim();
      successMessage.style.display = 'block';
      form.reset();

      if (webhookEnabled) {
        postToWebhook(webhookConfig.url, webhookPayload);
      }

      if (formConfig.redirectUrl) {
        window.location.href = formConfig.redirectUrl;
      }
    } catch (error) {
      console.warn('Netlify form submission failed.', error);
      errorMessage.textContent = 'Something went wrong while sending the form. Please try again.';
      errorMessage.style.display = 'block';
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = formConfig.submitLabel;
    }
  });
}
