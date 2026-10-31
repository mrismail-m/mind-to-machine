# Registration collection

1. Create a form in the organizer's Formspree account: https://formspree.io/.
2. Copy its form endpoint, for example `https://formspree.io/f/abcdefgh`.
3. Set `endpoint` in `public/mtm/registration-config.json` to that URL.
4. Confirm whether the displayed PKR 2,500 / 3,000 fee is per participant or per team. Update the text across the landing page, handbook, and registration page, then set `feeBasisConfirmed` to `true`.
5. Configure the form's spam protection and restrict dashboard access to authorized organizers. Set a retention/deletion policy for CNICs and WhatsApp numbers.
6. Deploy, then send one clearly marked synthetic test submission and verify it in the dashboard before announcing registration.

No secret API key is needed in the frontend. Never put account tokens or participant records in GitHub. The current submission control stays disabled until setup is complete. No real registration has been submitted during development.

Formspree submissions can be reviewed in its dashboard. This implementation collects a payment transaction reference, not a receipt file; receipt uploads require a compatible paid Formspree plan. Payment is manually verified by the organizers, not by this form.

Organizer photos could not be retrieved from LinkedIn. Supply authorized photos to replace the labeled portrait placeholders. Names and profile links use the details supplied by the event organizer.
