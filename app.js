// Ayushi Akshay Urja Shop - Interactive Web Application Logic

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // 2. Set Current Year in Footer
  const currentYearEl = document.getElementById('currentYear');
  if (currentYearEl) {
    currentYearEl.textContent = new Date().getFullYear();
  }

  // 3. Mobile Navigation Menu Toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      const isHidden = mobileMenu.classList.toggle('hidden');
      mobileMenuBtn.setAttribute('aria-expanded', !isHidden);
    });

    // Close menu when a navigation link is clicked
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }

  // 4. Header Shadow on Scroll
  const header = document.getElementById('mainHeader');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header?.classList.add('shadow-md');
    } else {
      header?.classList.remove('shadow-md');
    }
  });

  // 5. Interactive Solar Savings ROI Calculator
  initSolarCalculator();

  // 6. FAQ Accordion
  initFaqAccordion();

  // 7. Lead Generation Form Handler
  initLeadForm();
});

/**
 * Solar ROI & System Size Calculator Logic
 */
function initSolarCalculator() {
  const billSlider = document.getElementById('billSlider');
  const billDisplay = document.getElementById('billDisplay');
  const currencySelector = document.getElementById('currencySelector');
  const propertyToggle = document.getElementById('propertyTypeToggle');
  const batteryCheckbox = document.getElementById('batteryBackupCheck');
  
  const calcSystemSize = document.getElementById('calcSystemSize');
  const calcRoofArea = document.getElementById('calcRoofArea');
  const calcYearlySavings = document.getElementById('calcYearlySavings');
  const calcLifetimeSavings = document.getElementById('calcLifetimeSavings');
  const calcCO2 = document.getElementById('calcCO2');
  const calcTrees = document.getElementById('calcTrees');
  const applyEstimateBtn = document.getElementById('applyEstimateBtn');
  const sliderMinLabel = document.getElementById('sliderMinLabel');
  const sliderMaxLabel = document.getElementById('sliderMaxLabel');

  let activePropertyType = 'residential';
  let currencySymbol = '₹';

  // Currency multiplier & config
  const currencyConfigs = {
    '$': { min: 50, max: 1500, step: 25, defaultVal: 250, ratePerKwh: 0.16 },
    '₹': { min: 2000, max: 60000, step: 1000, defaultVal: 8000, ratePerKwh: 8.5 },
    '€': { min: 50, max: 1500, step: 25, defaultVal: 220, ratePerKwh: 0.28 },
    '£': { min: 40, max: 1200, step: 20, defaultVal: 180, ratePerKwh: 0.30 },
    'A$': { min: 60, max: 1800, step: 30, defaultVal: 280, ratePerKwh: 0.26 },
  };

  function updateSliderBounds() {
    const config = currencyConfigs[currencySymbol] || currencyConfigs['$'];
    const multiplier = activePropertyType === 'commercial' ? 3.5 : 1;

    const min = Math.round(config.min * multiplier);
    const max = Math.round(config.max * multiplier);
    const step = Math.round(config.step * multiplier);
    const currentVal = Math.min(Math.max(billSlider.value * multiplier, min), max);

    billSlider.min = min;
    billSlider.max = max;
    billSlider.step = step;
    billSlider.value = Math.round(config.defaultVal * multiplier);

    if (sliderMinLabel) sliderMinLabel.textContent = `${currencySymbol}${min.toLocaleString()} / mo`;
    if (sliderMaxLabel) sliderMaxLabel.textContent = `${currencySymbol}${max.toLocaleString()}+ / mo`;

    recalculate();
  }

  function recalculate() {
    const bill = parseFloat(billSlider.value);
    const config = currencyConfigs[currencySymbol] || currencyConfigs['$'];
    
    // Update Slider Display
    if (billDisplay) {
      billDisplay.textContent = `${currencySymbol}${bill.toLocaleString()}`;
    }

    // Solar calculation formulas
    // Monthly consumption (kWh) = Bill / Electricity Rate
    const monthlyKwh = bill / config.ratePerKwh;
    
    // Daily kWh needed
    const dailyKwh = monthlyKwh / 30;
    
    // Sizing: based on ~4.5 peak sun hours per day & 80% system efficiency factor
    const peakSunHours = 4.5;
    const systemSizeKw = (dailyKwh / peakSunHours) * 0.95;
    const roundedKw = Math.max(1.5, Math.round(systemSizeKw * 10) / 10);

    // Shadow-free rooftop needed (~65 sq. ft. per kW of modern bifacial panels)
    const roofAreaSqFt = Math.round(roundedKw * 62);

    // Savings calculation: Solar offsets ~88% of bill on average
    const monthlySavings = bill * 0.88;
    const firstYearSavings = Math.round(monthlySavings * 12);
    
    // 25-Year cumulative savings with conservative 3.5% utility escalation
    let lifetimeTotal = 0;
    let runningYearly = firstYearSavings;
    for (let yr = 1; yr <= 25; yr++) {
      lifetimeTotal += runningYearly;
      runningYearly *= 1.035; // 3.5% annual utility inflation
    }
    const lifetimeSavings = Math.round(lifetimeTotal);

    // Environmental metrics
    // ~0.85 tons of CO2 offset per kW installed per year
    const co2Tons = (roundedKw * 0.88).toFixed(1);
    const treesEquivalent = Math.round(roundedKw * 16);

    // Update DOM
    if (calcSystemSize) calcSystemSize.textContent = roundedKw.toFixed(1);
    if (calcRoofArea) calcRoofArea.textContent = `${roofAreaSqFt.toLocaleString()} sq. ft.`;
    if (calcYearlySavings) calcYearlySavings.textContent = `${currencySymbol}${firstYearSavings.toLocaleString()}`;
    if (calcLifetimeSavings) calcLifetimeSavings.textContent = `${currencySymbol}${lifetimeSavings.toLocaleString()}`;
    if (calcCO2) calcCO2.textContent = `${co2Tons} Tons`;
    if (calcTrees) calcTrees.textContent = `${treesEquivalent} Trees`;
  }

  // Event Listeners
  if (billSlider) {
    billSlider.addEventListener('input', recalculate);
  }

  if (currencySelector) {
    currencySelector.addEventListener('change', (e) => {
      currencySymbol = e.target.value;
      updateSliderBounds();
    });
  }

  // Property type buttons
  if (propertyToggle) {
    const buttons = propertyToggle.querySelectorAll('button');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => {
          b.classList.remove('bg-white', 'shadow-xs', 'text-navy-950');
          b.classList.add('text-slate-600');
        });
        btn.classList.add('bg-white', 'shadow-xs', 'text-navy-950');
        btn.classList.remove('text-slate-600');
        
        activePropertyType = btn.dataset.type;
        updateSliderBounds();
      });
    });
  }

  // Roof Type Radio cards styling
  const roofOptions = document.querySelectorAll('.roof-option');
  roofOptions.forEach(opt => {
    opt.addEventListener('click', () => {
      roofOptions.forEach(o => {
        o.classList.remove('border-solar-500', 'bg-solar-50/50');
        o.classList.add('border-slate-200');
        const icon = o.querySelector('i');
        if (icon) icon.classList.replace('text-solar-600', 'text-slate-500');
      });
      opt.classList.add('border-solar-500', 'bg-solar-50/50');
      opt.classList.remove('border-slate-200');
      const icon = opt.querySelector('i');
      if (icon) icon.classList.replace('text-slate-500', 'text-solar-600');
    });
  });

  // "Lock In This Solar Estimate" CTA
  if (applyEstimateBtn) {
    applyEstimateBtn.addEventListener('click', () => {
      const contactSection = document.getElementById('contact');
      const leadMonthlyBill = document.getElementById('leadMonthlyBill');
      const leadPropertyType = document.getElementById('leadPropertyType');
      const leadNotes = document.getElementById('leadNotes');

      if (leadMonthlyBill) {
        leadMonthlyBill.value = `${currencySymbol}${billSlider.value} / month`;
      }
      if (leadPropertyType) {
        leadPropertyType.value = activePropertyType === 'commercial' ? 'Commercial' : 'Residential';
      }
      if (leadNotes) {
        const sysKw = calcSystemSize?.textContent || '6.8';
        leadNotes.value = `Calculator Estimate: Target ~${sysKw} kW system. Estimated first year savings: ${calcYearlySavings?.textContent}.`;
      }

      // Smooth scroll to lead form
      contactSection?.scrollIntoView({ behavior: 'smooth' });

      // Highlight input temporarily
      if (leadMonthlyBill) {
        leadMonthlyBill.classList.add('ring-2', 'ring-solar-400');
        setTimeout(() => leadMonthlyBill.classList.remove('ring-2', 'ring-solar-400'), 2500);
      }
    });
  }

  // Initial calculation trigger with default currency bounds
  updateSliderBounds();
}

/**
 * FAQ Accordion Expansion
 */
function initFaqAccordion() {
  const faqToggles = document.querySelectorAll('.faq-toggle');

  faqToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const card = toggle.closest('.faq-card');
      const answer = card.querySelector('.faq-answer');
      const isOpen = card.classList.contains('open');

      // Close all other accordions
      document.querySelectorAll('.faq-card').forEach(c => {
        c.classList.remove('open');
        const ans = c.querySelector('.faq-answer');
        if (ans) ans.classList.add('hidden');
      });

      // Toggle current accordion
      if (!isOpen) {
        card.classList.add('open');
        answer.classList.remove('hidden');
      }
    });
  });
}

/**
 * Lead Generation Form Processing
 */
function initLeadForm() {
  const form = document.getElementById('solarLeadForm');
  const successAlert = document.getElementById('leadSuccessAlert');
  const resetBtn = document.getElementById('resetLeadFormBtn');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const leadData = {
      id: 'SOLAR-' + Date.now().toString().slice(-6),
      timestamp: new Date().toISOString(),
      fullName: document.getElementById('leadFullName')?.value.trim(),
      phone: document.getElementById('leadPhone')?.value.trim(),
      email: document.getElementById('leadEmail')?.value.trim(),
      cityZip: document.getElementById('leadCityZip')?.value.trim(),
      propertyType: document.getElementById('leadPropertyType')?.value,
      monthlyBill: document.getElementById('leadMonthlyBill')?.value.trim(),
      notes: document.getElementById('leadNotes')?.value.trim(),
    };

    // 1. Store in localStorage for business owner retrieval
    try {
      const existingLeads = JSON.parse(localStorage.getItem('ayushi_solar_leads') || '[]');
      existingLeads.unshift(leadData);
      localStorage.setItem('ayushi_solar_leads', JSON.stringify(existingLeads));
      console.log('✅ Solar Lead Saved Successfully:', leadData);
    } catch (err) {
      console.warn('LocalStorage error:', err);
    }

    // 2. Hide form and show thank you confirmation
    form.classList.add('hidden');
    if (successAlert) {
      successAlert.classList.remove('hidden');
      if (window.lucide) window.lucide.createIcons();
    }

    // 3. Optional: Create ready-to-send email backup draft in background
    const subject = encodeURIComponent(`Solar Consultation Request: ${leadData.fullName} (${leadData.cityZip})`);
    const body = encodeURIComponent(
      `Name: ${leadData.fullName}\nPhone: ${leadData.phone}\nEmail: ${leadData.email}\nCity/Zip: ${leadData.cityZip}\nProperty: ${leadData.propertyType}\nBill: ${leadData.monthlyBill}\nNotes: ${leadData.notes}\nTimestamp: ${leadData.timestamp}`
    );
    console.log(`Lead notification ready: mailto:solargreenpower.ij@gmail.com?subject=${subject}&body=${body}`);
  });

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      form.reset();
      form.classList.remove('hidden');
      if (successAlert) successAlert.classList.add('hidden');
    });
  }
}
