# Deploying Next.js E-Commerce App to a Contabo VPS

This guide outlines the steps to deploy your Next.js application (using Prisma and SQLite) to a Contabo Virtual Private Server (VPS) running Ubuntu/Debian.

## Prerequisites

- A Contabo VPS with root access.
- Your code hosted on a Git repository (GitHub, GitLab, or Bitbucket).
- A domain name (optional, but recommended for SSL).

## Step 1: Connect to your VPS

Open your terminal or PowerShell and connect to your VPS using SSH:

```bash
ssh root@YOUR_VPS_IP_ADDRESS
```

## Step 2: Install Required Software

Once logged in, update your package lists and install Node.js, Git, PM2, and Nginx.

```bash
# Update system packages
apt update && apt upgrade -y

# Install Node.js (v20)
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs

# Install Git, build tools, and Nginx
apt install -y git build-essential nginx

# Install PM2 (Process Manager)
npm install -g pm2
```

## Step 3: Clone Your Project

Navigate to `/var/www` and clone your repository.

```bash
mkdir -p /var/www
cd /var/www
git clone https://github.com/yourusername/your-repo-name.git e-commerce-app
cd e-commerce-app
```

## Step 4: Set Up Environment Variables

Create your production environment file.

```bash
nano .env
```

Paste your production variables inside. For SQLite, ensure your database URL points to a production file:
`DATABASE_URL="file:./prod.db"`

Save and exit (`Ctrl+O`, `Enter`, `Ctrl+X`).

## Step 5: Install Dependencies and Build

Install the necessary npm packages, prepare your database, and build the Next.js application.

```bash
# Install dependencies
npm install

# Generate Prisma Client
npx prisma generate

# Create the SQLite database and tables based on your schema
npx prisma db push

# Build the Next.js application
npm run build
```

## Step 6: Start the Application with PM2

Run your application in the background using PM2 so it stays active even when you close the SSH session.

```bash
pm2 start npm --name "ecommerce" -- start
```

Ensure PM2 restarts your app automatically if the VPS reboots:

```bash
pm2 startup
# (Run the exact command that PM2 outputs here)
pm2 save
```

## Step 7: Configure Nginx as a Reverse Proxy

Nginx will listen for HTTP traffic on port 80 and forward it to your Next.js app running on port 3000.

Create an Nginx configuration file:

```bash
nano /etc/nginx/sites-available/ecommerce
```

Paste the following configuration (replace `your_domain.com` with your domain or VPS IP):

```nginx
server {
    listen 80;
    server_name your_domain.com www.your_domain.com; # Or your VPS IP address

    location / {
        proxy_pass http://localhost:3000; # Port where Next.js runs
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable the site and restart Nginx:

```bash
# Create symlink to enable the config
ln -s /etc/nginx/sites-available/ecommerce /etc/nginx/sites-enabled/

# Test Nginx configuration for syntax errors
nginx -t

# Restart Nginx
systemctl restart nginx
```

## Step 8: Secure with SSL (Optional but Recommended)

If you have a domain pointed to your VPS, use Let's Encrypt to enable HTTPS.

```bash
apt install certbot python3-certbot-nginx -y
certbot --nginx -d your_domain.com -d www.your_domain.com
```

Follow the prompts to complete the SSL configuration.

---

## Future Updates

When deploying updates to your code, follow these steps to avoid overwriting your production SQLite database (`prod.db`):

1. `cd /var/www/e-commerce-app`
2. `git pull`
3. `npm install` (if package.json changed)
4. `npx prisma generate` && `npx prisma db push` (if schema.prisma changed)
5. `npm run build`
6. `pm2 restart ecommerce`
