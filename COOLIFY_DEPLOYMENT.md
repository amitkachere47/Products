# Deploying Next.js E-Commerce App using Coolify (IP-Only)

Coolify is an excellent choice for a modern, automated deployment pipeline. It gives you a Vercel-like experience directly on your Contabo VPS.

> **CRITICAL WARNING:** Coolify **must** be installed on a completely fresh, unconfigured operating system (Ubuntu 22.04 or 24.04). If you followed the manual deployment guide previously to install Nginx or Node.js, you should rebuild/reinstall the OS on your Contabo VPS from the Contabo control panel before proceeding.

## Step 1: Install Coolify on the VPS

1. Connect to your fresh Contabo VPS via SSH:
   ```bash
   ssh root@YOUR_VPS_IP_ADDRESS
   ```

2. Run the official Coolify installation script:
   ```bash
   curl -fsSL https://cdn.coollabs.io/coolify/install.sh | bash
   ```
   *This process will take 5-10 minutes. It installs Docker, databases, and the Coolify dashboard automatically.*

## Step 2: Access the Dashboard

1. Once the installation finishes, open your web browser and navigate to:
   **`http://YOUR_VPS_IP_ADDRESS:8000`**
2. Create your admin account (the first account created becomes the admin).
3. Follow the initial onboarding steps.

## Step 3: Connect Your GitHub/GitLab Repository

1. In the Coolify dashboard, go to **Projects** -> **Add New Project**.
2. Select an environment (e.g., "Production").
3. Click **Add New Resource** and choose **Public Repository** or **Private Repository** (depending on your setup).
4. Authenticate with GitHub/GitLab and select your `e-commerce-app` repository.

## Step 4: Configure the Application (For an IP Address)

1. **Build Pack:** Coolify defaults to **Nixpacks**, which is perfect. It will automatically detect Next.js.
2. **Ports Settings:** 
   - Set the `Ports Exposes` to **3000** (This is the port Next.js runs on internally).
3. **FQDN (Domain/IP):** 
   - Since you only have an IP address for now, set the FQDN field to: **`http://YOUR_VPS_IP_ADDRESS`**
   - Coolify's reverse proxy will automatically route port 80 traffic to your Next.js app.

## Step 5: Configure SQLite Persistence (Crucial)

Because Coolify runs your application inside a Docker container, the container is destroyed and recreated every time you push new code. **If you don't configure persistent storage, your SQLite database will be wiped on every deployment.**

1. In your Coolify app settings, go to the **Storage** tab.
2. Add a new Persistent Volume:
   - **Name/Source:** `sqlite-data` (or anything you prefer)
   - **Destination:** `/app/data` (This is where the database will live *inside* the container)
3. Go back to the **Environment Variables** tab.
4. Add your `.env` variables. For the database URL, point it to the persistent folder you just mounted:
   ```env
   DATABASE_URL="file:/app/data/prod.db"
   ```

## Step 6: Configure Prisma Build Steps

Coolify (via Nixpacks) automatically runs `npm run build`, but it needs to know to run your Prisma schema generations before building Next.js.

There are two ways to do this:

**Option A - Add a `postinstall` script to your `package.json` (Recommended):**
Open your `package.json` file in your code editor and add this to the `"scripts"` block:
```json
"scripts": {
  "postinstall": "prisma generate && prisma db push",
  "dev": "next dev",
  ...
}
```
*Commit and push this change to your repository.* When Coolify runs `npm install`, it will automatically trigger the Prisma generation and push the schema to the persistent SQLite database.

**Option B - In Coolify settings:**
In the **Build Options** tab in Coolify, find the "Build Command" field and change it to:
```bash
npx prisma generate && npx prisma db push && npm run build
```

## Step 7: Deploy!

1. Click the purple **Deploy** button in the top right corner of the Coolify dashboard.
2. Coolify will fetch your code, build the Docker image, run the Prisma migrations, and start the Next.js service.
3. Once the deployment light turns green, visit `http://YOUR_VPS_IP_ADDRESS` in your browser.

Your Next.js e-commerce app is now live! Whenever you push new code to your repository, Coolify will automatically catch the webhook, rebuild the app, and re-deploy without any downtime.
