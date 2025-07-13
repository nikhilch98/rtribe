# RTRIBE Dance Studio - beinrtribe.com Deployment Guide

This guide will help you deploy the RTRIBE Dance Studio website on AWS EC2 with the domain `beinrtribe.com`.

## 🌐 Domain Configuration

### DNS Setup
1. **Point your domain to EC2:**
   - Go to your domain registrar (GoDaddy, Namecheap, etc.)
   - Create an A record: `beinrtribe.com` → Your EC2 public IP
   - Create an A record: `www.beinrtribe.com` → Your EC2 public IP
   - Wait for DNS propagation (can take up to 48 hours)

### Find Your EC2 Public IP
```bash
# On your EC2 instance
curl http://169.254.169.254/latest/meta-data/public-ipv4
```

## 🚀 Quick Deployment

### 1. Connect to your EC2 instance
```bash
ssh -i your-key.pem ec2-user@your-ec2-public-ip
```

### 2. Upload project files
```bash
# From your local machine
scp -i your-key.pem -r . ec2-user@your-ec2-public-ip:~/
```

### 3. Run deployment script
```bash
# On EC2 instance
cd ~
chmod +x deploy-simple.sh
./deploy-simple.sh
```

## 🔧 Manual Setup (If script fails)

Run these commands one by one:

```bash
# 1. Update system
sudo yum update -y

# 2. Install packages
sudo yum install -y nginx python3 python3-pip git epel-release
sudo yum install -y certbot python3-certbot-nginx

# 3. Create app directory
sudo mkdir -p /var/www/rtribe
sudo chown ec2-user:ec2-user /var/www/rtribe

# 4. Copy files
cp -r . /var/www/rtribe/
cd /var/www/rtribe

# 5. Setup Python environment
python3 -m venv venv
source venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt

# 6. Setup nginx
sudo cp nginx.conf /etc/nginx/nginx.conf
sudo nginx -t

# 7. Setup systemd service
sudo cp rtribe.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable rtribe nginx

# 8. Set permissions
sudo chown -R ec2-user:ec2-user /var/www/rtribe
sudo chmod -R 755 /var/www/rtribe

# 9. Configure firewall
sudo firewall-cmd --permanent --add-service=http
sudo firewall-cmd --permanent --add-service=https
sudo firewall-cmd --reload
```

## 🔒 SSL Certificate Setup

### Wait for DNS Propagation
Before getting SSL certificates, ensure your domain points to your EC2 instance:
```bash
# Test DNS resolution
nslookup beinrtribe.com
nslookup www.beinrtribe.com
```

### Get SSL Certificates
```bash
# Get certificates for both domain and www subdomain
sudo certbot --nginx -d beinrtribe.com -d www.beinrtribe.com
```

### Test Certificate Renewal
```bash
sudo certbot renew --dry-run
```

## 🚦 Start Services

```bash
# Start Flask app
sudo systemctl start rtribe

# Start nginx
sudo systemctl start nginx

# Check status
sudo systemctl status rtribe
sudo systemctl status nginx
```

## 🔍 Testing

### Test Local Access
```bash
# Test Flask app directly
curl http://localhost:8000

# Test nginx
curl http://localhost
```

### Test Domain Access
```bash
# Test HTTP redirect
curl -I http://beinrtribe.com

# Test HTTPS
curl -I https://beinrtribe.com
```

## 🔧 Configuration Details

### Port Configuration
- **Port 8000**: Flask application (internal only)
- **Port 80**: HTTP → Redirects to HTTPS
- **Port 443**: HTTPS → Serves your website

### File Locations
- **Application**: `/var/www/rtribe/`
- **Nginx Config**: `/etc/nginx/nginx.conf`
- **SSL Certificates**: `/etc/letsencrypt/live/beinrtribe.com/`
- **Service File**: `/etc/systemd/system/rtribe.service`

## 🔍 Monitoring

### View Logs
```bash
# Flask app logs
sudo journalctl -u rtribe -f

# Nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

### Check Services
```bash
# Service status
sudo systemctl status rtribe nginx

# Test nginx config
sudo nginx -t

# Check SSL certificate
sudo certbot certificates
```

## 🔧 Troubleshooting

### Common Issues

1. **Domain not resolving:**
   - Check DNS settings at your registrar
   - Wait for DNS propagation
   - Test with: `nslookup beinrtribe.com`

2. **SSL certificate issues:**
   - Ensure domain points to EC2 before running certbot
   - Check certificate status: `sudo certbot certificates`
   - Renew if needed: `sudo certbot renew`

3. **Port 8000 not accessible:**
   - Check Flask app: `sudo systemctl status rtribe`
   - View logs: `sudo journalctl -u rtribe -f`

4. **Permission errors:**
   - Fix ownership: `sudo chown -R ec2-user:ec2-user /var/www/rtribe`

### Security Group Configuration

Ensure your EC2 security group allows:
- **Port 22** (SSH) - Your IP only
- **Port 80** (HTTP) - 0.0.0.0/0
- **Port 443** (HTTPS) - 0.0.0.0/0

## 🔄 Maintenance

### Update Application
```bash
cd /var/www/rtribe
git pull origin main
source venv/bin/activate
pip install -r requirements.txt
sudo systemctl restart rtribe
```

### Update SSL Certificates
```bash
sudo certbot renew
sudo systemctl reload nginx
```

### Backup Configuration
```bash
sudo cp /etc/nginx/nginx.conf /etc/nginx/nginx.conf.backup
sudo cp /etc/systemd/system/rtribe.service /etc/systemd/system/rtribe.service.backup
```

## 🎯 Quick Commands

```bash
# Start everything
sudo systemctl start rtribe nginx

# Stop everything
sudo systemctl stop rtribe nginx

# Restart everything
sudo systemctl restart rtribe nginx

# Check status
sudo systemctl status rtribe nginx

# View logs
sudo journalctl -u rtribe -f
sudo tail -f /var/log/nginx/error.log

# Test website
curl -I https://beinrtribe.com
```

## ✅ Final Checklist

- [ ] DNS points `beinrtribe.com` to EC2 public IP
- [ ] DNS points `www.beinrtribe.com` to EC2 public IP
- [ ] Security group allows ports 80 and 443
- [ ] Flask app running on port 8000
- [ ] Nginx running and configured
- [ ] SSL certificates obtained
- [ ] Website accessible at https://beinrtribe.com
- [ ] HTTP redirects to HTTPS
- [ ] All services start on boot

Your RTRIBE Dance Studio website should now be live at **https://beinrtribe.com**! 🎉 