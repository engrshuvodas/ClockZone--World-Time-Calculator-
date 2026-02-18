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

// 3D Tilt Effect for Cards
function add3DTiltEffect(card) {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.02)`;
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
  });
  
  card.addEventListener('mouseenter', () => {
    card.style.transition = 'transform 0.1s ease-out';
  });
}

// 3D Tilt Effect for Local Time Card
function add3DTiltToLocalCard() {
  const localCard = document.querySelector('.local-time-card');
  if (localCard) {
    localCard.addEventListener('mousemove', (e) => {
      const rect = localCard.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 15;
      const rotateY = (centerX - x) / 15;
      
      localCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.02)`;
    });
    
    localCard.addEventListener('mouseleave', () => {
      localCard.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
    });
    
    localCard.addEventListener('mouseenter', () => {
      localCard.style.transition = 'transform 0.1s ease-out';
    });
  }
}

// Store card references for efficient updates
let clockCardElements = new Map();

// Create world clock cards (only called when clocks are added/removed)
function createWorldClockCards() {
  worldClocksGrid.innerHTML = '';
  clockCardElements.clear();
  
  pinnedClocks.forEach((clock, index) => {
    const card = document.createElement('div');
    card.className = 'clock-card';
    card.style.animationDelay = `${index * 0.1}s`;
    card.dataset.timezone = clock.timezone;
    
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
    
    // Store card reference
    clockCardElements.set(clock.timezone, {
      card: card,
      timeElement: card.querySelector('.clock-time'),
      dateElement: card.querySelector('.clock-date'),
      utcElement: card.querySelector('.clock-utc')
    });
    
    // Add 3D tilt effect after a short delay to ensure DOM is ready
    setTimeout(() => {
      add3DTiltEffect(card);
    }, 50);
  });
}

// Update world clocks (only updates time/date, doesn't recreate cards)
function updateWorldClocks() {
  const now = new Date();
  
  pinnedClocks.forEach(clock => {
    const cardData = clockCardElements.get(clock.timezone);
    if (cardData) {
      // Only update the time, date, and UTC text - don't recreate the card
      cardData.timeElement.textContent = formatTime(now, clock.timezone);
      cardData.dateElement.textContent = formatDate(now, clock.timezone);
      cardData.utcElement.textContent = getUTCOffset(clock.offset);
    }
  });
  
  // If cards don't exist yet (first load), create them
  if (clockCardElements.size === 0 && pinnedClocks.length > 0) {
    createWorldClockCards();
  }
}

// Remove clock
function removeClock(timezone) {
  pinnedClocks = pinnedClocks.filter(clock => clock.timezone !== timezone);
  localStorage.setItem('pinnedClocks', JSON.stringify(pinnedClocks));
  // Recreate cards when removing (since structure changes)
  createWorldClockCards();
  add3DTiltToLocalCard();
}

// Make removeClock globally accessible
window.removeClock = removeClock;

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
  // Recreate cards when adding (since structure changes)
  createWorldClockCards();
  add3DTiltToLocalCard();
}

// Update all clocks
function updateAllClocks() {
  updateLocalTime();
  updateWorldClocks();
  // No need to re-initialize 3D effects - they're already attached
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

// Add smooth number transitions for time updates
function animateNumberChange(element, newValue, oldValue) {
  if (oldValue === newValue) return;
  
  const duration = 300;
  const startTime = performance.now();
  
  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Easing function
    const ease = progress < 0.5 
      ? 2 * progress * progress 
      : 1 - Math.pow(-2 * progress + 2, 2) / 2;
    
    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }
  
  requestAnimationFrame(update);
}

// Add parallax effect to background
function initParallaxEffect() {
  let mouseX = 0;
  let mouseY = 0;
  
  document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 20;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 20;
    
    document.body.style.setProperty('--mouse-x', `${mouseX}px`);
    document.body.style.setProperty('--mouse-y', `${mouseY}px`);
  });
}

// Add ripple effect to buttons
function addRippleEffect(button) {
  button.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    this.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
}

// Initialize
detectLocalTimezone();
createWorldClockCards(); // Create cards once on load
updateAllClocks(); // Update times
add3DTiltToLocalCard();
initParallaxEffect();

// Add ripple effects to buttons
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    const buttons = document.querySelectorAll('.add-clock-btn, .dropdown, .clock-option');
    buttons.forEach(btn => addRippleEffect(btn));
  }, 100);
});

// Update every second
setInterval(updateAllClocks, 1000);

// Handle keyboard shortcuts
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
    closeAddClockModal();
  }
});

// Add smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});