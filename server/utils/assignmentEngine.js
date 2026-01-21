// Simple rule-based assignment engine
// In a real system, this would query officer workloads from DB

const officers = {
    'IT': ['Officer A (Network)', 'Officer B (Hardware)'],
    'HR': ['Officer C (Recruitment)', 'Officer D (Relations)'],
    'Admin': ['Officer E (Facilities)'],
    'Other': ['General Desk']
};

function assignOfficer(category) {
    const availableOfficers = officers[category] || officers['Other'];
    // Simple random assignment for now (Simulating Load Balancing)
    const randomIndex = Math.floor(Math.random() * availableOfficers.length);
    return availableOfficers[randomIndex];
}

module.exports = assignOfficer;
