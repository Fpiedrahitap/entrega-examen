document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('energy-form');
    const tableBody = document.querySelector('#energy-table tbody');
    let appliances = JSON.parse(localStorage.getItem('appliances')) || [];

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const power = parseFloat(document.getElementById('power').value);
        const hours = parseFloat(document.getElementById('hours').value);

        const appliance = { name, power, hours };
        appliances.push(appliance);
        localStorage.setItem('appliances', JSON.stringify(appliances));
        addApplianceToTable(appliance);
        form.reset();
    });

    function addApplianceToTable(appliance) {
        const row = document.createElement('tr');
        const monthlyConsumption = ((appliance.power * appliance.hours * 30) / 1000).toFixed(2);

        row.innerHTML = `
            <td>${appliance.name}</td>
            <td>${appliance.power}</td>
            <td>${appliance.hours}</td>
            <td>${monthlyConsumption}</td>
        `;
        tableBody.appendChild(row);
    }

    function loadAppliances() {
        appliances.forEach(appliance => addApplianceToTable(appliance));
    }

    loadAppliances();
});