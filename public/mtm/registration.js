const form = document.querySelector('#event-registration');
const type = document.querySelector('#participation');
const members = document.querySelector('#members');
const button = document.querySelector('#submit-registration');
const status = document.querySelector('#form-status');
let endpoint = '';
function updateMembers() {
  const team = type.value === 'team';
  members.hidden = !team;
  members.disabled = !team;
  form.elements.member_1_name.required = team;
  form.elements.member_1_cnic.required = team;
  form.elements.team_name.required = team;
}
type.addEventListener('change', updateMembers);
updateMembers();
const secondName = form.elements.member_2_name;
const secondCnic = form.elements.member_2_cnic;
function pairMember() {
  secondName.required = !!secondCnic.value.trim();
  secondCnic.required = !!secondName.value.trim();
}
secondName.addEventListener('input', pairMember);
secondCnic.addEventListener('input', pairMember);
fetch('/mtm/registration-config.json').then(r => {
  if (!r.ok) throw new Error('Configuration unavailable');
  return r.json();
}).then(config => {
  if (/^https:\/\/formspree\.io\/f\/[a-zA-Z0-9]+$/.test(config.endpoint)) {
    endpoint = config.endpoint;
    button.disabled = false;
    button.textContent = 'Submit registration ↗';
    document.querySelector('#connection-status').textContent = 'Registration data is sent privately to the organizers through Formspree. Payment is verified separately by the organizers.';
  }
}).catch(() => { status.textContent = 'Registration setup is unavailable. Please try again later.'; });
form.addEventListener('submit', async event => {
  event.preventDefault();
  if (!endpoint) { status.textContent = 'Registration is not connected yet. Nothing has been sent.'; return; }
  if (!form.reportValidity()) return;
  const cnics = ['cnic', ...(type.value === 'team' ? ['member_1_cnic', 'member_2_cnic'] : [])].map(key => form.elements[key].value.replace(/\D/g,'')).filter(Boolean);
  if (new Set(cnics).size !== cnics.length) { status.textContent = 'Each participant must have a different CNIC.'; return; }
  const screenshot = form.elements.payment_screenshot.files[0];
  if (!screenshot || !['image/png','image/jpeg','image/webp'].includes(screenshot.type) || screenshot.size > 5 * 1024 * 1024) {
    status.textContent = 'Choose a PNG, JPG, or WebP payment screenshot no larger than 5 MB.';
    return;
  }
  button.disabled = true;
  status.textContent = 'Submitting…';
  try {
    const response = await fetch(endpoint, {method:'POST', body:new FormData(form), headers:{Accept:'application/json'}});
    if (!response.ok) {
      const payload = await response.json().catch(() => ({}));
      const messages = (payload.errors || []).map(error => error.message).filter(Boolean).join(' ');
      throw new Error(messages || 'The registration service could not accept this submission. Please contact the organizers.');
    }
    form.reset(); updateMembers(); pairMember();
    status.textContent = 'Registration received. Your place and payment are subject to organizer verification.';
  } catch (error) {
    status.textContent = 'Submission was not confirmed. ' + error.message + ' Your details remain here; contact the organizers before retrying.';
  } finally { button.disabled = false; }
});
