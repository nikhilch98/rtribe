# Manual Setup Commands for RTRIBE Dance Studio on AWS Linux 2
# Run these commands one by one on your EC2 instance

# 1. Update system packages
sudo yum update -y

# 2. Install required packages
sudo yum install -y nginx python3 python3-pip git epel-release
sudo yum install -y certbot python3-certbot-nginx

# 3. Create application directory
sudo mkdir -p /var/www/rtribe
sudo chown ec2-user:ec2-user /var/www/rtribe

# 4. Copy application files (run this from your project directory)
cp -r . /var/www/rtribe/
cd /var/www/rtribe

# 5. Set up Python virtual environment
python3 -m venv venv
source venv/bin/activate

# 6. Install Python dependencies
pip install --upgrade pip
pip install -r requirements.txt

# 7. Create SSL directory
sudo mkdir -p /etc/ssl/certs /etc/ssl/private
sudo chmod 755 /etc/ssl/certs /etc/ssl/private

# 8. Copy nginx configuration
sudo cp nginx.conf /etc/nginx/nginx.conf

# 9. Test nginx configuration
sudo nginx -t

# 10. Copy systemd service file
sudo cp rtribe.service /etc/systemd/system/

# 11. Reload systemd and enable services
sudo systemctl daemon-reload
sudo systemctl enable nginx
sudo systemctl enable rtribe

# 12. Set proper permissions
sudo chown -R ec2-user:ec2-user /var/www/rtribe
sudo chmod -R 755 /var/www/rtribe

# 13. Configure firewall (if using firewalld)
sudo firewall-cmd --permanent --add-service=http
sudo firewall-cmd --permanent --add-service=https
sudo firewall-cmd --reload

# 14. Start services
sudo systemctl start rtribe
sudo systemctl start nginx

# 15. Check service status
sudo systemctl status rtribe
sudo systemctl status nginx

# 16. For SSL certificate (beinrtribe.com)
# sudo certbot --nginx -d beinrtribe.com -d www.beinrtribe.com 