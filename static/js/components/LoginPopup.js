// static/js/components/LoginPopup.js

export class LoginPopup {
    constructor() {
        this.element = null;
        this.visible = false;
    }

    render() {
        this.element = document.createElement('div');
        this.element.className = 'login-popup-overlay';
        this.element.innerHTML = `
            <div class="login-popup">
                <button class="close-button">&times;</button>
                <h2>Login</h2>
                <p>Enter your mobile number to receive an OTP</p>
                <div class="input-group">
                    <span class="country-code">+91</span>
                    <input type="tel" id="phone-number" placeholder="99999 99999" maxlength="10">
                </div>
                <button id="send-otp-button" disabled>Send OTP</button>
            </div>
        `;

        this.addEventListeners();
        return this.element;
    }

    addEventListeners() {
        const phoneNumberInput = this.element.querySelector('#phone-number');
        const sendOtpButton = this.element.querySelector('#send-otp-button');
        const closeButton = this.element.querySelector('.close-button');

        phoneNumberInput.addEventListener('input', () => {
            if (phoneNumberInput.value.length === 10) {
                sendOtpButton.disabled = false;
            } else {
                sendOtpButton.disabled = true;
            }
        });

        sendOtpButton.addEventListener('click', () => {
            const phoneNumber = phoneNumberInput.value;
            this.sendOtp(phoneNumber);
        });

        closeButton.addEventListener('click', () => {
            this.hide();
        });

        this.element.addEventListener('click', (e) => {
            if (e.target === this.element) {
                this.hide();
            }
        });
    }

    sendOtp(phoneNumber) {
        fetch('/api/send-otp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ mobile_number: phoneNumber }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('OTP sent successfully!');
                // Here you would typically show an OTP input field
            } else {
                alert(`Error: ${data.message}`);
            }
        })
        .catch(error => {
            console.error('Error sending OTP:', error);
            alert('An error occurred while sending the OTP.');
        });
    }

    show() {
        this.visible = true;
        this.element.classList.add('visible');
    }

    hide() {
        this.visible = false;
        this.element.classList.remove('visible');
    }
}
