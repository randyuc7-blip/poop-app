const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
const publicPath = path.join(__dirname, 'public');
const dataFilePath = path.join(__dirname, 'data.json');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(publicPath));

function loadRequests() {
  if (!fs.existsSync(dataFilePath)) {
    fs.writeFileSync(dataFilePath, '[]');
    return [];
  }

  try {
    const fileContents = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    console.error('Could not read data.json. Starting with an empty list.');
    return [];
  }
}

function saveRequests(requests) {
  fs.writeFileSync(dataFilePath, JSON.stringify(requests, null, 2));
}

let requests = loadRequests();

function notifyNewRequest(request) {
  console.log('\n========== NEW LEAD ==========');
  console.log(`Name    : ${request.name}`);
  console.log(`PHONE   : ${request.phone}`);
  console.log(`Email   : ${request.email}`);
  console.log(`Address : ${request.address}`);
  console.log(`Vehicle : ${request.vehicle}`);
  console.log(`Date    : ${request.date}`);
  console.log(`SERVICE : ${request.serviceType}`);
  console.log(`Notes   : ${request.notes}`);
  console.log(`Status  : ${request.status}`);
  console.log('------------------------------');
  console.log(
    `Quick Copy: ${request.name} | ${request.phone} | ${request.vehicle} | ${request.serviceType} | ${request.date}`
  );
  console.log('==============================\n');
}

function isFutureDate(dateString) {
  const selectedDate = new Date(`${dateString}T00:00:00`);
  const tomorrow = new Date();

  tomorrow.setHours(0, 0, 0, 0);
  tomorrow.setDate(tomorrow.getDate() + 1);

  return selectedDate >= tomorrow;
}

app.post('/api/requests', (req, res) => {
  const name = req.body.name ? req.body.name.trim() : '';
  const phone = req.body.phone ? req.body.phone.trim() : '';
  const email = req.body.email ? req.body.email.trim() : '';
  const address = req.body.address ? req.body.address.trim() : '';
  const vehicle = req.body.vehicle ? req.body.vehicle.trim() : '';
  const date = req.body.date ? req.body.date.trim() : '';
  const serviceType = req.body.serviceType ? req.body.serviceType.trim() : '';
  const notes = req.body.notes ? req.body.notes.trim() : '';

  if (!name || !phone || !email || !address || !vehicle || !serviceType) {
    return res.status(400).json({
      message: 'Name, phone, email, address, vehicle, and service type are required.'
    });
  }

  if (!date) {
    return res.status(400).json({
      message: 'Pickup date is required.'
    });
  }

  if (!isFutureDate(date)) {
    return res.status(400).json({
      message: 'Please choose a date starting tomorrow.'
    });
  }

  const newRequest = {
    id: requests.length > 0 ? requests[requests.length - 1].id + 1 : 1,
    name,
    phone,
    email,
    address,
    vehicle,
    date,
    serviceType,
    notes,
    status: 'pending'
  };

  requests.push(newRequest);
  saveRequests(requests);
  notifyNewRequest(newRequest);

  res.status(201).json({
    message: 'Request submitted successfully.',
    request: newRequest
  });
});

app.get('/api/requests', (req, res) => {
  res.json(requests);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
