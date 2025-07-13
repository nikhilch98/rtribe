# RTRIBE Dance Studio - AWS Linux 2 Deployment Guide

This guide will help you deploy the RTRIBE Dance Studio website on AWS Linux 2 with nginx, SSL certificates, and proper service management.

## 📋 Prerequisites

- AWS Linux 2 EC2 instance
- Domain name pointing to your EC2 instance
- SSH access to your EC2 instance
- Python 3.7+ (included with AWS Linux 2)

## 🚀 Quick Deployment

### 1. Connect to your EC2 instance
```bash
ssh -i your-key.pem ec2-user@your-ec2-ip
```

### 2. Clone or upload your project
```bash
# Option 1: Clone from Git
git clone <your-repository-url>
cd rtribe

# Option 2: Upload files via SCP
# (Upload files from your local machine)
```

### 3. Run the deployment script
```bash
chmod +x deploy.sh
./deploy.sh
```

## 🔧 Manual Setup (Alternative)

If you prefer to set up manually or the script fails, follow these steps:

### 1. Update system and install packages
```bash
sudo yum update -y
sudo yum install -y nginx python3 python3-pip git epel-release
sudo yum install -y certbot python3-certbot-nginx
```

### 2. Set up application directory
```bash
sudo mkdir -p /var/www/rtribe
sudo chown ec2-user:ec2-user /var/www/rtribe
cp -r . /var/www/rtribe/
cd /var/www/rtribe
```

### 3. Set up Python environment
```bash
python3 -m venv venv
source venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt
```

### 4. Configure nginx
```bash
sudo cp nginx.conf /etc/nginx/nginx.conf
sudo nginx -t
```

### 5. Set up systemd service
```bash
sudo cp rtribe.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable rtribe
sudo systemctl enable nginx
```

### 6. Set permissions
```bash
sudo chown -R ec2-user:ec2-user /var/www/rtribe
sudo chmod -R 755 /var/www/rtribe
```

## 🔒 SSL Certificate Setup

### Using Let's Encrypt (Recommended)

1. **Update domain name in nginx config:**
   ```bash
   sudo nano /etc/nginx/nginx.conf
   # Replace "server_name _;" with "server_name yourdomain.com;"
   ```

2. **Obtain SSL certificate:**
   ```bash
   sudo certbot --nginx -d yourdomain.com
   ```

3. **Test certificate renewal:**
   ```bash
   sudo certbot renew --dry-run
   ```

### Using Custom SSL Certificate

1. **Upload your certificate files:**
   ```bash
   sudo cp your-certificate.crt /etc/ssl/certs/rtribe.crt
   sudo cp your-private-key.key /etc/ssl/private/rtribe.key
   ```

2. **Set proper permissions:**
   ```bash
   sudo chmod 644 /etc/ssl/certs/rtribe.crt
   sudo chmod 600 /etc/ssl/private/rtribe.key
   ```

## 🚦 Start Services

```bash
# Start Flask application
sudo systemctl start rtribe

# Start nginx
sudo systemctl start nginx

# Check status
sudo systemctl status rtribe
sudo systemctl status nginx
```

## 🔧 Configuration Files

### nginx.conf
- **Location:** `/etc/nginx/nginx.conf`
- **Purpose:** Main nginx configuration
- **Key features:**
  - HTTP to HTTPS redirect
  - SSL/TLS configuration
  - Proxy to Flask app on port 8000
  - Static file caching
  - Security headers
  - Rate limiting

### rtribe.service
- **Location:** `/etc/systemd/system/rtribe.service`
- **Purpose:** Systemd service for Flask app
- **Features:**
  - Auto-restart on failure
  - Proper user permissions
  - Security restrictions
  - Logging integration

## 🔍 Monitoring and Logs

### View application logs
```bash
# Flask application logs
sudo journalctl -u rtribe -f

# nginx access logs
sudo tail -f /var/log/nginx/access.log

# nginx error logs
sudo tail -f /var/log/nginx/error.log
```

### Check service status
```bash
sudo systemctl status rtribe
sudo systemctl status nginx
```

### Test nginx configuration
```bash
sudo nginx -t
```

## 🔧 Troubleshooting

### Common Issues

1. **Port 8000 not accessible:**
   - Check if Flask app is running: `sudo systemctl status rtribe`
   - Check logs: `sudo journalctl -u rtribe -f`

2. **SSL certificate issues:**
   - Verify certificate paths in nginx.conf
   - Check certificate validity: `sudo certbot certificates`

3. **Permission denied errors:**
   - Ensure proper ownership: `sudo chown -R ec2-user:ec2-user /var/www/rtribe`

4. **nginx configuration errors:**
   - Test configuration: `sudo nginx -t`
   - Check syntax: `sudo nginx -T`

### Security Group Configuration

Ensure your EC2 security group allows:
- **Port 80** (HTTP) - Inbound
- **Port 443** (HTTPS) - Inbound
- **Port 22** (SSH) - Inbound (your IP only)

## 🔄 Maintenance

### Update application
```bash
cd /var/www/rtribe
git pull origin main
source venv/bin/activate
pip install -r requirements.txt
sudo systemctl restart rtribe
```

### Update SSL certificates
```bash
sudo certbot renew
sudo systemctl reload nginx
```

### Backup configuration
```bash
sudo cp /etc/nginx/nginx.conf /etc/nginx/nginx.conf.backup
sudo cp /etc/systemd/system/rtribe.service /etc/systemd/system/rtribe.service.backup
```

## 📊 Performance Optimization

The nginx configuration includes:
- **Gzip compression** for faster loading
- **Static file caching** (1 year for assets)
- **Connection pooling** with keepalive
- **Rate limiting** for API endpoints
- **Security headers** for protection

## 🔐 Security Features

- **HTTP to HTTPS redirect**
- **Security headers** (X-Frame-Options, X-Content-Type-Options, etc.)
- **Rate limiting** on API and login endpoints
- **Hidden file protection**
- **SSL/TLS 1.2+ only**
- **HSTS headers**

## 📞 Support

If you encounter issues:
1. Check the logs first
2. Verify all prerequisites are met
3. Ensure proper permissions
4. Test nginx configuration
5. Verify SSL certificate setup

## 🎯 Quick Commands Reference

```bash
# Start services
sudo systemctl start rtribe nginx

# Stop services
sudo systemctl stop rtribe nginx

# Restart services
sudo systemctl restart rtribe nginx

# Check status
sudo systemctl status rtribe nginx

# View logs
sudo journalctl -u rtribe -f
sudo tail -f /var/log/nginx/error.log

# Test nginx config
sudo nginx -t

# Reload nginx
sudo systemctl reload nginx
``` 