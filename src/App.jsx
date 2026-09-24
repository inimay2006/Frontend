import { useState } from 'react'
import './App.css'

function App() {
  const [formData, setFormData] = useState({
    itemName: '',
    category: '',
    description: '',
    lostLocation: '',
    lostDate: '',
    lostTime: '',
    identificationMarks: '',
    reporterName: '',
    reporterRole: '',
    department: '',
    rollNumber: '',
    contactNumber: '',
  })

  const [submitted, setSubmitted] = useState(false)
  const [jsonData, setJsonData] = useState(null)

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }))
  }

  // Submit form and send data to Backend
  const handleSubmit = async (event) => {
    event.preventDefault()

    const lostItemJSON = {
      itemName: formData.itemName,
      category: formData.category,
      description: formData.description,
      lostLocation: formData.lostLocation,
      lostDate: formData.lostDate,
      lostTime: formData.lostTime,
      identificationMarks: formData.identificationMarks,

      reportedBy: {
        name: formData.reporterName,
        role: formData.reporterRole,
        department: formData.department,
        rollNumber: formData.rollNumber,
        contactNumber: formData.contactNumber,
      },

      status: 'lost',
    }

    try {
      // Send data to Backend
      const response = await fetch('http://localhost:5000/api/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(lostItemJSON),
      })

      const data = await response.json()

      if (response.ok) {
        setJsonData(data.item)
        setSubmitted(true)

        console.log('Data saved successfully:', data.item)

        alert('Lost item submitted successfully!')
      } else {
        console.error(data)
        alert(data.message || 'Failed to save item')
      }
    } catch (error) {
      console.error('Backend Error:', error)

      alert(
        'Cannot connect to backend. Please make sure server.js is running.'
      )
    }
  }

  return (
    <div className="app">
      <div className="form-container">

        <div className="form-header">
          <p className="small-heading">COLLEGE LOST & FOUND</p>

          <h1>Report a Lost Item</h1>

          <p className="subtitle">
            Provide the details below to report an item lost on campus.
          </p>
        </div>

        <form onSubmit={handleSubmit}>

          {/* LOST ITEM DETAILS */}

          <div className="section">
            <h2>Lost Item Details</h2>

            <div className="form-grid">

              <div className="form-group">
                <label htmlFor="itemName">Item Name *</label>

                <input
                  id="itemName"
                  type="text"
                  name="itemName"
                  placeholder="Example: Samsung Galaxy A34"
                  value={formData.itemName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="category">Category *</label>

                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select category</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Books">Books</option>
                  <option value="ID Card">ID Card</option>
                  <option value="Wallet">Wallet</option>
                  <option value="Bag">Bag</option>
                  <option value="Keys">Keys</option>
                  <option value="Clothing">Clothing</option>
                  <option value="Accessories">Accessories</option>
                  <option value="Other">Other</option>
                </select>
              </div>

            </div>

            <div className="form-group">
              <label htmlFor="description">Description *</label>

              <textarea
                id="description"
                name="description"
                placeholder="Describe the lost item..."
                value={formData.description}
                onChange={handleChange}
                rows="4"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="identificationMarks">
                Identification Marks
              </label>

              <textarea
                id="identificationMarks"
                name="identificationMarks"
                placeholder="Colour, scratches, stickers, case, unique marks, etc."
                value={formData.identificationMarks}
                onChange={handleChange}
                rows="3"
              />
            </div>

            <div className="form-grid">

              <div className="form-group">
                <label htmlFor="lostLocation">
                  Where did you lose it? *
                </label>

                <input
                  id="lostLocation"
                  type="text"
                  name="lostLocation"
                  placeholder="Example: College Library"
                  value={formData.lostLocation}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="lostDate">Date Lost *</label>

                <input
                  id="lostDate"
                  type="date"
                  name="lostDate"
                  value={formData.lostDate}
                  onChange={handleChange}
                  required
                />
              </div>

            </div>

            <div className="form-group">
              <label htmlFor="lostTime">Approximate Time</label>

              <input
                id="lostTime"
                type="time"
                name="lostTime"
                value={formData.lostTime}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="divider"></div>

          {/* REPORTER DETAILS */}

          <div className="section">
            <h2>Reporter Details</h2>

            <div className="form-grid">

              <div className="form-group">
                <label htmlFor="reporterName">Name *</label>

                <input
                  id="reporterName"
                  type="text"
                  name="reporterName"
                  placeholder="Your name"
                  value={formData.reporterName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="reporterRole">Role *</label>

                <select
                  id="reporterRole"
                  name="reporterRole"
                  value={formData.reporterRole}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select role</option>
                  <option value="Student">Student</option>
                  <option value="Faculty">Faculty</option>
                  <option value="Staff">Staff</option>
                </select>
              </div>

            </div>

            <div className="form-grid">

              <div className="form-group">
                <label htmlFor="department">Department *</label>

                <input
                  id="department"
                  type="text"
                  name="department"
                  placeholder="Example: Information Technology"
                  value={formData.department}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="rollNumber">
                  Roll Number / Employee ID
                </label>

                <input
                  id="rollNumber"
                  type="text"
                  name="rollNumber"
                  placeholder="Example: 24IT123"
                  value={formData.rollNumber}
                  onChange={handleChange}
                />
              </div>

            </div>

            <div className="form-group">
              <label htmlFor="contactNumber">Contact Number *</label>

              <input
                id="contactNumber"
                type="tel"
                name="contactNumber"
                placeholder="Your contact number"
                value={formData.contactNumber}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <button type="submit" className="submit-button">
            Submit Lost Item
          </button>

        </form>

        {/* JSON OUTPUT */}

        {submitted && jsonData && (
          <div className="success-box">
            <h2>✓ Lost Item Reported</h2>

            <p>
              The submitted information has been converted into JSON.
            </p>

            <pre>
              {JSON.stringify(jsonData, null, 2)}
            </pre>
          </div>
        )}

      </div>
    </div>
  )
}

export default App