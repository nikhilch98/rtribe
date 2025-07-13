#!/bin/bash

echo "Starting RTRIBE Dance Studio deployment on AWS Linux 2..."

# Update system packages
echo "Updating system packages..."
sudo yum update -y

# Install required packages
echo "Installing required packages..."
sudo yum install -y nginx python3 python3-pip git epel-release
sudo yum install -y certbot python3-certbot-nginx

# Create application directory
echo "Setting up application directory..."
sudo mkdir -p /var/www/rtribe
sudo chown ec2-user:ec2-user /var/www/rtribe

# Copy application files
echo "Copying application files..."
cp -r . /var/www/rtribe/
cd /var/www/rtribe

# Set up Python virtual environment
echo "Setting up Python virtual environment..."
python3 -m venv venv
source venv/bin/activate

# Install Python dependencies
echo "Installing Python dependencies..."
pip install --upgrade pip
pip install -r requirements.txt

# Create SSL directory
echo "Setting up SSL directory..."
sudo mkdir -p /etc/ssl/certs /etc/ssl/private
sudo chmod 755 /etc/ssl/certs /etc/ssl/private

# Copy nginx configuration
echo "Setting up nginx configuration..."
sudo cp nginx.conf /etc/nginx/nginx.conf

# Test nginx configuration
echo "Testing nginx configuration..."
sudo nginx -t

# Copy systemd service file
echo "Setting up systemd service..."
sudo cp rtribe.service /etc/systemd/system/

# Reload systemd and enable services
echo "Enabling services..."
sudo systemctl daemon-reload
sudo systemctl enable nginx
sudo systemctl enable rtribe

# Set proper permissions
echo "Setting proper permissions..."
sudo chown -R ec2-user:ec2-user /var/www/rtribe
sudo chmod -R 755 /var/www/rtribe

# Configure firewall
if command -v firewall-cmd &> /dev/null; then
    echo "Configuring firewall..."
    sudo firewall-cmd --permanent --add-service=http
    sudo firewall-cmd --permanent --add-service=https
    sudo firewall-cmd --reload
fi

echo "Deployment completed successfully!"
echo ""
echo "Next steps for beinrtribe.com:"
echo "1. Ensure DNS points beinrtribe.com to this EC2 instance"
echo "2. Obtain SSL certificates: sudo certbot --nginx -d beinrtribe.com -d www.beinrtribe.com"
echo "3. Start services: sudo systemctl start rtribe && sudo systemctl start nginx"
echo "4. Check status: sudo systemctl status rtribe && sudo systemctl status nginx"
echo "5. Test website: https://beinrtribe.com" 