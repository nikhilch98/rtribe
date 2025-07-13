#!/bin/bash

# RTRIBE Dance Studio Deployment Script for AWS Linux 2
# This script sets up nginx, SSL certificates, and the Flask application

set -e  # Exit on any error

echo "🚀 Starting RTRIBE Dance Studio deployment on AWS Linux 2..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if running as root
if [[ $EUID -eq 0 ]]; then
   print_error "This script should not be run as root. Please run as ec2-user."
   exit 1
fi

# Update system packages
print_status "Updating system packages..."
sudo yum update -y

# Install required packages
print_status "Installing required packages..."
sudo yum install -y nginx python3 python3-pip git

# Install EPEL repository for additional packages
sudo yum install -y epel-release

# Install additional packages
sudo yum install -y certbot python3-certbot-nginx

# Create application directory
print_status "Setting up application directory..."
sudo mkdir -p /var/www/rtribe
sudo chown ec2-user:ec2-user /var/www/rtribe

# Copy application files (assuming you're running this from the project directory)
print_status "Copying application files..."
cp -r . /var/www/rtribe/
cd /var/www/rtribe

# Set up Python virtual environment
print_status "Setting up Python virtual environment..."
python3 -m venv venv
source venv/bin/activate

# Install Python dependencies
print_status "Installing Python dependencies..."
pip install --upgrade pip
pip install -r requirements.txt

# Create SSL directory
print_status "Setting up SSL directory..."
sudo mkdir -p /etc/ssl/certs /etc/ssl/private
sudo chmod 755 /etc/ssl/certs /etc/ssl/private

# Copy nginx configuration
print_status "Setting up nginx configuration..."
sudo cp nginx.conf /etc/nginx/nginx.conf

# Test nginx configuration
print_status "Testing nginx configuration..."
sudo nginx -t

# Copy systemd service file
print_status "Setting up systemd service..."
sudo cp rtribe.service /etc/systemd/system/

# Reload systemd and enable services
print_status "Enabling services..."
sudo systemctl daemon-reload
sudo systemctl enable nginx
sudo systemctl enable rtribe

# Set proper permissions
print_status "Setting proper permissions..."
sudo chown -R ec2-user:ec2-user /var/www/rtribe
sudo chmod -R 755 /var/www/rtribe

# Configure firewall (if using firewalld)
if command -v firewall-cmd &> /dev/null; then
    print_status "Configuring firewall..."
    sudo firewall-cmd --permanent --add-service=http
    sudo firewall-cmd --permanent --add-service=https
    sudo firewall-cmd --reload
fi

# Configure security groups (AWS CLI required)
if command -v aws &> /dev/null; then
    print_warning "AWS CLI detected. You may need to configure security groups manually."
    print_warning "Ensure ports 80, 443, and 8000 are open in your EC2 security group."
else
    print_warning "AWS CLI not found. Please configure security groups manually:"
    print_warning "- Port 80 (HTTP)"
    print_warning "- Port 443 (HTTPS)"
    print_warning "- Port 8000 (Flask app - optional, for direct access)"
fi

print_success "Deployment completed successfully!"
echo ""
print_status "Next steps:"
echo "1. Update the domain name in /etc/nginx/nginx.conf"
echo "2. Obtain SSL certificates using Let's Encrypt:"
echo "   sudo certbot --nginx -d yourdomain.com"
echo "3. Start the services:"
echo "   sudo systemctl start rtribe"
echo "   sudo systemctl start nginx"
echo "4. Check service status:"
echo "   sudo systemctl status rtribe"
echo "   sudo systemctl status nginx"
echo ""
print_status "For SSL certificate setup, run:"
echo "sudo certbot --nginx -d yourdomain.com"
echo ""
print_status "To view logs:"
echo "sudo journalctl -u rtribe -f"
echo "sudo tail -f /var/log/nginx/error.log" 