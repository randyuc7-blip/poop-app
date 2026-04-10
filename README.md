# Lead Capture System Template

This project is now organized as a reusable, Netlify-ready lead capture system you can clone, rebrand, and deploy for multiple clients.

## Project Structure

```text
template/
  public/
  src/
    app.js
  components/
    lead-form.js
  styles/
    base.css
  config/
    config.js
  index.html
  thank-you.html
```

## What It Does

- captures leads with Netlify Forms
- shows a success state after submission
- optionally forwards leads to a webhook
- lets you change business info, colors, and form fields from one config file

## Fast Start

1. Edit `template/config/config.js`
2. Change the business name, contact details, colors, and form fields
3. Push to GitHub
4. Import the repo into Netlify
5. Deploy

## Netlify Deploy

1. In Netlify, click `Add new site`
2. Import your GitHub repository
3. Netlify will read `netlify.toml`
4. Publish directory should be `template`
5. Deploy the site

## How To Access Leads

After deployment:

1. Open your site in Netlify
2. Go to `Forms`
3. View all submissions there

## Email Notifications

In Netlify:

1. Open your deployed site
2. Go to `Forms`
3. Open form notifications
4. Add the email address that should receive new lead alerts

This is the simplest real-time lead delivery option.

## How To Connect To Notion (via Zapier)

This template can send every lead into Zapier after Netlify Forms captures it.

1. Create a Zapier account
2. Create a new Zap
3. Choose `Webhooks by Zapier`
4. Choose `Catch Hook`
5. Copy the webhook URL Zapier gives you
6. Open `template/config/config.js`
7. Set:

```js
webhook: {
  enabled: true,
  url: "YOUR_ZAPIER_WEBHOOK_URL"
}
```

8. Deploy the site again on Netlify
9. Submit a test form from the live site
10. In Zapier, confirm the sample data was received
11. Add the next Zap step: `Notion`
12. Choose the Notion database you want to use
13. Map these fields:

- `name`
- `phone`
- `email`
- `service`
- `message`
- `timestamp`

This keeps Netlify Forms as the primary lead capture method and sends a second copy to Zapier for automation.

If the webhook is turned off, the template still works normally with Netlify Forms only.

## Rebrand For A New Client

Most client changes happen in one file:

- `template/config/config.js`

That file controls:

- business name
- email
- phone
- primary CTA text
- hero copy
- brand colors
- form fields

## Local Preview

Run:

```bash
npm start
```

Then open:

```text
http://localhost:3000
```

## Beginner Notes

- You do not need a backend server for production
- Netlify Forms handles the lead capture
- The local Express server is only for previewing the template on your machine
