// Available timezones with city/country names
const timezonesData = [
  { timezone: 'America/Los_Angeles', city: 'Cupertino', country: 'United States', offset: -8 },
  { timezone: 'America/New_York', city: 'New York', country: 'United States', offset: -5 },
  { timezone: 'America/Chicago', city: 'Chicago', country: 'United States', offset: -6 },
  { timezone: 'America/Denver', city: 'Denver', country: 'United States', offset: -7 },
  { timezone: 'America/Toronto', city: 'Toronto', country: 'Canada', offset: -5 },
  { timezone: 'America/Vancouver', city: 'Vancouver', country: 'Canada', offset: -8 },
  { timezone: 'Europe/London', city: 'London', country: 'United Kingdom', offset: 0 },
  { timezone: 'Europe/Paris', city: 'Paris', country: 'France', offset: 1 },
  { timezone: 'Europe/Berlin', city: 'Berlin', country: 'Germany', offset: 1 },
  { timezone: 'Europe/Rome', city: 'Rome', country: 'Italy', offset: 1 },
  { timezone: 'Europe/Madrid', city: 'Madrid', country: 'Spain', offset: 1 },
  { timezone: 'Europe/Amsterdam', city: 'Amsterdam', country: 'Netherlands', offset: 1 },
  { timezone: 'Europe/Stockholm', city: 'Stockholm', country: 'Sweden', offset: 1 },
  { timezone: 'Europe/Zurich', city: 'Zurich', country: 'Switzerland', offset: 1 },
  { timezone: 'Europe/Vienna', city: 'Vienna', country: 'Austria', offset: 1 },
  { timezone: 'Asia/Tokyo', city: 'Tokyo', country: 'Japan', offset: 9 },
  { timezone: 'Asia/Shanghai', city: 'Shanghai', country: 'China', offset: 8 },
  { timezone: 'Asia/Hong_Kong', city: 'Hong Kong', country: 'Hong Kong', offset: 8 },
  { timezone: 'Asia/Singapore', city: 'Singapore', country: 'Singapore', offset: 8 },
  { timezone: 'Asia/Dubai', city: 'Dubai', country: 'United Arab Emirates', offset: 4 },
  { timezone: 'Asia/Kolkata', city: 'Mumbai', country: 'India', offset: 5.5 },
  { timezone: 'Asia/Dhaka', city: 'Dhaka', country: 'Bangladesh', offset: 6 },
  { timezone: 'Asia/Karachi', city: 'Karachi', country: 'Pakistan', offset: 5 },
  { timezone: 'Asia/Bangkok', city: 'Bangkok', country: 'Thailand', offset: 7 },
  { timezone: 'Asia/Jakarta', city: 'Jakarta', country: 'Indonesia', offset: 7 },
  { timezone: 'Asia/Seoul', city: 'Seoul', country: 'South Korea', offset: 9 },
  { timezone: 'Australia/Sydney', city: 'Sydney', country: 'Australia', offset: 11 },
  { timezone: 'Australia/Melbourne', city: 'Melbourne', country: 'Australia', offset: 11 },
  { timezone: 'Australia/Brisbane', city: 'Brisbane', country: 'Australia', offset: 10 },
  { timezone: 'Pacific/Auckland', city: 'Auckland', country: 'New Zealand', offset: 13 },
  { timezone: 'America/Sao_Paulo', city: 'São Paulo', country: 'Brazil', offset: -3 },
  { timezone: 'America/Mexico_City', city: 'Mexico City', country: 'Mexico', offset: -6 },
  { timezone: 'America/Buenos_Aires', city: 'Buenos Aires', country: 'Argentina', offset: -3 },
  { timezone: 'Africa/Johannesburg', city: 'Johannesburg', country: 'South Africa', offset: 2 },
  { timezone: 'Africa/Cairo', city: 'Cairo', country: 'Egypt', offset: 2 },
  { timezone: 'Asia/Riyadh', city: 'Riyadh', country: 'Saudi Arabia', offset: 3 },
  { timezone: 'Asia/Tel_Aviv', city: 'Tel Aviv', country: 'Israel', offset: 2 },
  { timezone: 'Europe/Moscow', city: 'Moscow', country: 'Russia', offset: 3 },
  { timezone: 'Asia/Istanbul', city: 'Istanbul', country: 'Turkey', offset: 3 }
];

// Settings
let settings = {
  timeFormat: '24', // '24' or '12'
  dateFormat: 'short' // 'short', 'long', or 'numeric'
};

// Pinned clocks (stored in localStorage)
let pinnedClocks = JSON.parse(localStorage.getItem('pinnedClocks') || '[]');

// Initialize default clocks if none exist
if (pinnedClocks.length === 0) {
  pinnedClocks = [
    { timezone: 'America/Los_Angeles', city: 'Cupertino', country: 'United States', offset: -8 },
    { timezone: 'Asia/Tokyo', city: 'Tokyo', country: 'Japan', offset: 9 },
    { timezone: 'Australia/Sydney', city: 'Sydney', country: 'Australia', offset: 11 },
    { timezone: 'Europe/Paris', city: 'Paris', country: 'France', offset: 1 }
  ];
  localStorage.setItem('pinnedClocks', JSON.stringify(pinnedClocks));
}

// DOM Elements
const localTimeElement = document.getElementById('local-time');
const localDateElement = document.getElementById('local-date');
const localTimezoneTag = document.getElementById('local-timezone-tag');
const localFormatIndicator = document.getElementById('local-format-indicator');
const worldClocksGrid = document.getElementById('world-clocks-grid');
const timeFormatSelect = document.getElementById('time-format');
const dateFormatSelect = document.getElementById('date-format');
const addClockBtn = document.getElementById('add-clock-btn');
const modalOverlay = document.getElementById('modal-overlay');
const modalClose = document.getElementById('modal-close');
const clockSearchInput = document.getElementById('clock-search');
const clockOptions = document.getElementById('clock-options');

// Detect user's local timezone
function detectLocalTimezone() {
  try {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const tzData = timezonesData.find(tz => tz.timezone === timezone);
    
    if (tzData) {
      localTimezoneTag.textContent = timezone.replace(/_/g, ' ');
    } else {
      // Format timezone name nicely
      localTimezoneTag.textContent = timezone.split('/').pop().replace(/_/g, ' ');
    }
  } catch (error) {
    localTimezoneTag.textContent = 'Local Timezone';
  }
}

// Format time based on settings
function formatTime(date, timezone = null) {
  const options = {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: settings.timeFormat === '12'
  };
  
  if (timezone) {
    options.timeZone = timezone;
  }
  
  return new Intl.DateTimeFormat('en-US', options).format(date);
}

// Format date based on settings
function formatDate(date, timezone = null) {
  let options;
  
  switch (settings.dateFormat) {
    case 'long':
      options = {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      };
      break;
    case 'numeric':
      options = {
        month: 'numeric',
        day: 'numeric',
        year: 'numeric'
      };
      break;
    case 'short':
    default:
      options = {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      };
      break;
  }
  
  if (timezone) {
    options.timeZone = timezone;
  }
  
  return new Intl.DateTimeFormat('en-US', options).format(date);
}

// Get UTC offset string
function getUTCOffset(offset) {
  const sign = offset >= 0 ? '+' : '';
  return `UTC${sign}${offset}`;
}

// Update local time display
function updateLocalTime() {
  const now = new Date();
  localTimeElement.textContent = formatTime(now);
  localDateElement.textContent = formatDate(now);
  localFormatIndicator.textContent = `${settings.timeFormat === '24' ? '24' : '12'}-hour format`;
}

// Update world clocks
function updateWorldClocks() {
  worldClocksGrid.innerHTML = '';
  
  pinnedClocks.forEach(clock => {
    const card = document.createElement('div');
    card.className = 'clock-card';
    
    const now = new Date();
    const time = formatTime(now, clock.timezone);
    const date = formatDate(now, clock.timezone);
    const utcOffset = getUTCOffset(clock.offset);
    
    card.innerHTML = `
      <div class="clock-header">
        <div class="clock-location">
          <span class="location-dot"></span>
          <span class="location-text">${clock.city} / ${clock.country}</span>
        </div>
        <span class="pinned-label">Pinned zone</span>
      </div>
      <div class="clock-time">${time}</div>
      <div class="clock-date">${date}</div>
      <div class="clock-footer">
        <span class="clock-utc">${utcOffset}</span>
        <button class="remove-clock-btn" onclick="removeClock('${clock.timezone}')" title="Remove clock">
          <span style="font-size: 1rem;">−</span>
        </button>
      </div>
    `;
    
    worldClocksGrid.appendChild(card);
  });
}

// Remove clock
function removeClock(timezone) {
  pinnedClocks = pinnedClocks.filter(clock => clock.timezone !== timezone);
  localStorage.setItem('pinnedClocks', JSON.stringify(pinnedClocks));
  updateWorldClocks();
}

// Open add clock modal
function openAddClockModal() {
  modalOverlay.classList.add('active');
  clockSearchInput.value = '';
  populateClockOptions();
  clockSearchInput.focus();
}

// Close add clock modal
function closeAddClockModal() {
  modalOverlay.classList.remove('active');
}

// Populate clock options
function populateClockOptions(searchQuery = '') {
  clockOptions.innerHTML = '';
  
  const query = searchQuery.toLowerCase().trim();
  const filtered = timezonesData.filter(tz => {
    if (!query) return true;
    return tz.city.toLowerCase().includes(query) ||
           tz.country.toLowerCase().includes(query) ||
           tz.timezone.toLowerCase().includes(query);
  });
  
  // Filter out already pinned clocks
  const available = filtered.filter(tz => 
    !pinnedClocks.some(pinned => pinned.timezone === tz.timezone)
  );
  
  if (available.length === 0) {
    clockOptions.innerHTML = '<div style="padding: 20px; text-align: center; color: #E0E0E0; opacity: 0.6;">No available clocks found</div>';
    return;
  }
  
  available.forEach(tz => {
    const option = document.createElement('div');
    option.className = 'clock-option';
    option.innerHTML = `
      <div>
        <div class="clock-option-name">${tz.city} / ${tz.country}</div>
        <div class="clock-option-timezone">${tz.timezone}</div>
      </div>
    `;
    
    option.addEventListener('click', () => {
      addClock(tz);
      closeAddClockModal();
    });
    
    clockOptions.appendChild(option);
  });
}

// Add clock
function addClock(clockData) {
  // Check if already pinned
  if (pinnedClocks.some(c => c.timezone === clockData.timezone)) {
    return;
  }
  
  pinnedClocks.push(clockData);
  localStorage.setItem('pinnedClocks', JSON.stringify(pinnedClocks));
  updateWorldClocks();
}

// Update all clocks
function updateAllClocks() {
  updateLocalTime();
  updateWorldClocks();
}

// Event Listeners
timeFormatSelect.addEventListener('change', (e) => {
  settings.timeFormat = e.target.value;
  localStorage.setItem('settings', JSON.stringify(settings));
  updateAllClocks();
});

dateFormatSelect.addEventListener('change', (e) => {
  settings.dateFormat = e.target.value;
  localStorage.setItem('settings', JSON.stringify(settings));
  updateAllClocks();
});

addClockBtn.addEventListener('click', openAddClockModal);
modalClose.addEventListener('click', closeAddClockModal);

modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) {
    closeAddClockModal();
  }
});

clockSearchInput.addEventListener('input', (e) => {
  populateClockOptions(e.target.value);
});

// Load saved settings
const savedSettings = localStorage.getItem('settings');
if (savedSettings) {
  settings = { ...settings, ...JSON.parse(savedSettings) };
  timeFormatSelect.value = settings.timeFormat;
  dateFormatSelect.value = settings.dateFormat;
}

// Initialize
detectLocalTimezone();
updateAllClocks();

// Update every second
setInterval(updateAllClocks, 1000);

// Handle keyboard shortcuts
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
    closeAddClockModal();
  }
});