// Get DOM elements
        const eventLog = document.getElementById('eventLog');
        const textInput = document.getElementById('textInput');
        const textStatus = document.getElementById('textStatus');
        const emailInput = document.getElementById('emailInput');
        const emailStatus = document.getElementById('emailStatus');
        const colorSelect = document.getElementById('colorSelect');
        const colorFeedback = document.getElementById('colorFeedback');

        // Checkbox elements
        const newsletter = document.getElementById('newsletter');
        const terms = document.getElementById('terms');
        const notifications = document.getElementById('notifications');
        const checkboxFeedback = document.getElementById('checkboxFeedback');
        const checkboxStatus = document.getElementById('checkboxStatus');

        // Dropdown elements
        const countrySelect = document.getElementById('countrySelect');
        const citySelect = document.getElementById('citySelect');
        const locationFeedback = document.getElementById('locationFeedback');
        const locationStatus = document.getElementById('locationStatus');

        // Event logger function
        function logEvent(eventName, details) {
            const now = new Date();
            const timeString = `[${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}]`;
            
            const logEntry = document.createElement('div');
            logEntry.className = 'log-entry';
            logEntry.innerHTML = `
                <span class="log-time">${timeString}</span>
                <span class="log-event">${eventName}:</span>
                <span class="log-details">${details}</span>
            `;
            
            eventLog.appendChild(logEntry);
            eventLog.scrollTop = eventLog.scrollHeight;
        }

        // 1. OnChange Event Examples
        textInput.addEventListener('change', function(event) {
            textStatus.textContent = `Changed to: "${event.target.value}"`;
            textStatus.className = 'status active';
            logEvent('TEXT_CHANGE', `Value: "${event.target.value}"`);
        });

        emailInput.addEventListener('input', function(event) {
            const email = event.target.value;
            if (email.length > 0) {
                emailStatus.textContent = `Typing: ${email}`;
                emailStatus.className = 'status active';
            } else {
                emailStatus.textContent = 'Start typing...';
                emailStatus.className = 'status inactive';
            }
            logEvent('EMAIL_INPUT', `Current: "${email}"`);
        });

        colorSelect.addEventListener('change', function(event) {
            const color = event.target.value;
            if (color) {
                colorFeedback.textContent = `You selected: ${color.toUpperCase()}`;
                colorFeedback.style.background = `linear-gradient(135deg, var(--${color}), #764ba2)`;
                logEvent('COLOR_SELECT', `Selected: ${color}`);
            } else {
                colorFeedback.textContent = 'Select a color above';
                colorFeedback.style.background = 'linear-gradient(135deg, #667eea, #764ba2)';
            }
        });

        // 2. Checkbox Event Listeners
        function updateCheckboxStatus() {
            const selected = [];
            if (newsletter.checked) selected.push('Newsletter');
            if (terms.checked) selected.push('Terms');
            if (notifications.checked) selected.push('Notifications');

            if (selected.length > 0) {
                checkboxFeedback.textContent = `Selected: ${selected.join(', ')}`;
                checkboxStatus.textContent = `${selected.length} option(s) selected`;
                checkboxStatus.className = 'status active';
            } else {
                checkboxFeedback.textContent = 'Select some options';
                checkboxStatus.textContent = 'No options selected';
                checkboxStatus.className = 'status inactive';
            }
        }

        newsletter.addEventListener('change', function(event) {
            logEvent('CHECKBOX', `Newsletter: ${event.target.checked}`);
            updateCheckboxStatus();
        });

        terms.addEventListener('change', function(event) {
            logEvent('CHECKBOX', `Terms: ${event.target.checked}`);
            updateCheckboxStatus();
        });

        notifications.addEventListener('change', function(event) {
            logEvent('CHECKBOX', `Notifications: ${event.target.checked}`);
            updateCheckboxStatus();
        });

        // 3. Dropdown Menu Events
        const cities = {
            usa: ['New York', 'Los Angeles', 'Chicago', 'Houston'],
            canada: ['Toronto', 'Vancouver', 'Montreal', 'Calgary'],
            uk: ['London', 'Manchester', 'Birmingham', 'Liverpool'],
            australia: ['Sydney', 'Melbourne', 'Brisbane', 'Perth'],
            germany: ['Berlin', 'Munich', 'Hamburg', 'Cologne'],
            japan: ['Tokyo', 'Osaka', 'Kyoto', 'Yokohama']
        };

        countrySelect.addEventListener('change', function(event) {
            const country = event.target.value;
            
            // Clear city dropdown
            citySelect.innerHTML = '<option value="">Select a city</option>';
            
            if (country && cities[country]) {
                // Add cities for selected country
                cities[country].forEach(city => {
                    const option = document.createElement('option');
                    option.value = city.toLowerCase();
                    option.textContent = city;
                    citySelect.appendChild(option);
                });
                
                locationFeedback.textContent = `Selected country: ${country.toUpperCase()}`;
                locationStatus.textContent = `Now select a city from ${cities[country].length} options`;
                locationStatus.className = 'status active';
                logEvent('COUNTRY_SELECT', `Selected: ${country}`);
            } else {
                locationFeedback.textContent = 'Select a country to see cities';
                locationStatus.textContent = 'No location selected';
                locationStatus.className = 'status inactive';
            }
        });

        citySelect.addEventListener('change', function(event) {
            const city = event.target.value;
            if (city) {
                locationFeedback.textContent = `Selected: ${countrySelect.options[countrySelect.selectedIndex].text} → ${event.target.options[event.target.selectedIndex].text}`;
                logEvent('CITY_SELECT', `Selected: ${city}`);
            }
        });

        // CSS Variables for colors
        document.documentElement.style.setProperty('--red', '#ff6b6b');
        document.documentElement.style.setProperty('--blue', '#667eea');
        document.documentElement.style.setProperty('--green', '#4ecdc4');
        document.documentElement.style.setProperty('--yellow', '#ffd93d');
        document.documentElement.style.setProperty('--purple', '#764ba2');

        // Initial log
        logEvent('SYSTEM', 'All event listeners are active');