'use client'

import React, { useState, useEffect } from 'react';

// Main App component for the Invoice
const InvoicePage = () => {
  // State for vendor (your) information
  const [vendorInfo, setVendorInfo] = useState({
    name: 'Agency #990',
    address: '',
    cityStateZip: '',
    email: 'admin@990.agency',
    phone: '(917) 765 8475',
  });

  // State for client information
  const [clientInfo, setClientInfo] = useState({
    name: 'Client Company Name',
    address: '456 Client St, Apt 2B',
    cityStateZip: 'Clientville, NY 10001',
    email: 'client.email@example.com',
    phone: '(555) 987-6543',
  });

  // State for invoice details
  const [invoiceDetails, setInvoiceDetails] = useState({
    invoiceNumber: 'INV-2024-001',
    invoiceDate: new Date().toISOString().slice(0, 10), // YYYY-MM-DD
    dueDate: new Date(new Date().setDate(new Date().getDate() + 30)).toISOString().slice(0, 10), // 30 days from now
  });

  // State for line items
  const [items, setItems] = useState([
    { id: 1, description: '4K Filming (8 hours)', quantity: 8, rate: 60.00 },
    { id: 2, description: 'Drone Fee (DJI Mini 3 Pro)', quantity: 1, rate: 70.00 },
    { id: 3, description: 'Web Design (10 hours)', quantity: 10, rate: 45.00 },
  ]);

  // State for tax rate (as a percentage)
  const [taxRate, setTaxRate] = useState(0); // 0% by default

  // State for calculated totals
  const [subtotal, setSubtotal] = useState(0);
  const [taxAmount, setTaxAmount] = useState(0);
  const [total, setTotal] = useState(0);

  // Effect hook to recalculate totals whenever items or taxRate change
  useEffect(() => {
    calculateTotals();
  }, [items, taxRate]);

  // Function to handle changes in vendor or client info fields
  const handleInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, type: 'vendor' | 'client', field: string) => {
    if (type === 'vendor') {
      setVendorInfo({ ...vendorInfo, [field]: e.target.value });
    } else {
      setClientInfo({ ...clientInfo, [field]: e.target.value });
    }
  };

  // Function to handle changes in invoice details fields
  const handleInvoiceDetailChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    setInvoiceDetails({ ...invoiceDetails, [field]: e.target.value });
  };

  // Function to handle changes in item fields (description, quantity, rate)
  const handleItemChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, id: number, field: string) => {
    const newItems = items.map(item =>
      item.id === id ? { ...item, [field]: field === 'description' ? e.target.value : parseFloat(e.target.value) || 0 } : item
    );
    setItems(newItems);
  };

  // Function to add a new blank item row
  const addItem = () => {
    setItems([...items, { id: Date.now(), description: '', quantity: 0, rate: 0.00 }]);
  };

  // Function to remove an item row
  const removeItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  // Function to calculate subtotal, tax, and total
  const calculateTotals = () => {
    const newSubtotal = items.reduce((sum, item) => sum + (item.quantity * item.rate), 0);
    const newTaxAmount = newSubtotal * (taxRate / 100);
    const newTotal = newSubtotal + newTaxAmount;

    setSubtotal(newSubtotal);
    setTaxAmount(newTaxAmount);
    setTotal(newTotal);
  };

  // Function to handle printing the invoice
  const handlePrint = () => {
    window.print();
  };

  // Helper function to format numbers as currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8 font-inter">
      {/* Tailwind CSS CDN for styling */}
      <script src="https://cdn.tailwindcss.com"></script>
      {/* Inter font from Google Fonts */}
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />

      <style>
        {`
          body { font-family: 'Inter', sans-serif; }
          @media print {
            body * {
              visibility: hidden;
            }
            .invoice-container, .invoice-container * {
              visibility: visible;
            }
            .invoice-container {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              padding: 20px;
              box-shadow: none;
              border-radius: 0;
            }
            .no-print {
              display: none;
            }
          }
        `}
      </style>

      <div className="invoice-container bg-white rounded-lg shadow-lg p-6 sm:p-10 max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-start mb-8 border-b pb-4">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">INVOICE</h1>
            <input
              type="text"
              className="text-sm text-gray-600 bg-transparent border-none focus:outline-none focus:ring-0 p-0 m-0"
              value={`# ${invoiceDetails.invoiceNumber}`}
              onChange={(e) => handleInvoiceDetailChange(e, 'invoiceNumber')}
            />
          </div>
          <div className="text-right">
            <h2 className="text-xl font-semibold text-gray-700 mb-1">
              <input
                type="text"
                className="font-semibold text--700 bg-transparent border-none focus:outline-none focus:ring-0 p-0 m-0 text-right"
                value={vendorInfo.name}
                onChange={(e) => handleInfoChange(e, 'vendor', 'name')}
              />
            </h2>
            <input
              type="text"
              className="text-sm text-gray-600 bg-transparent border-none focus:outline-none focus:ring-0 p-0 m-0 text-right"
              value={vendorInfo.address}
              onChange={(e) => handleInfoChange(e, 'vendor', 'address')}
            />
            <br />
            <input
              type="text"
              className="text-sm text-gray-600 bg-transparent border-none focus:outline-none focus:ring-0 p-0 m-0 text-right"
              value={vendorInfo.cityStateZip}
              onChange={(e) => handleInfoChange(e, 'vendor', 'cityStateZip')}
            />
            <br />
            <input
              type="email"
              className="text-sm text-gray-600 bg-transparent border-none focus:outline-none focus:ring-0 p-0 m-0 text-right"
              value={vendorInfo.email}
              onChange={(e) => handleInfoChange(e, 'vendor', 'email')}
            />
            <br />
            <input
              type="tel"
              className="text-sm text-gray-600 bg-transparent border-none focus:outline-none focus:ring-0 p-0 m-0 text-right"
              value={vendorInfo.phone}
              onChange={(e) => handleInfoChange(e, 'vendor', 'phone')}
            />
          </div>
        </div>

        {/* Dates and Bill To */}
        <div className="flex flex-col sm:flex-row justify-between mb-8">
          <div className="mb-4 sm:mb-0">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Bill To:</h3>
            <input
              type="text"
              className="font-medium text-gray-800 bg-transparent border-none focus:outline-none focus:ring-0 p-0 m-0"
              value={clientInfo.name}
              onChange={(e) => handleInfoChange(e, 'client', 'name')}
            />
            <br />
            <input
              type="text"
              className="text-sm text-gray-600 bg-transparent border-none focus:outline-none focus:ring-0 p-0 m-0"
              value={clientInfo.address}
              onChange={(e) => handleInfoChange(e, 'client', 'address')}
            />
            <br />
            <input
              type="text"
              className="text-sm text-gray-600 bg-transparent border-none focus:outline-none focus:ring-0 p-0 m-0"
              value={clientInfo.cityStateZip}
              onChange={(e) => handleInfoChange(e, 'client', 'cityStateZip')}
            />
            <br />
            <input
              type="email"
              className="text-sm text-gray-600 bg-transparent border-none focus:outline-none focus:ring-0 p-0 m-0"
              value={clientInfo.email}
              onChange={(e) => handleInfoChange(e, 'client', 'email')}
            />
            <br />
            <input
              type="tel"
              className="text-sm text-gray-600 bg-transparent border-none focus:outline-none focus:ring-0 p-0 m-0"
              value={clientInfo.phone}
              onChange={(e) => handleInfoChange(e, 'client', 'phone')}
            />
          </div>

          <div className="text-left sm:text-right">
            <div className="mb-2">
              <span className="font-semibold text-gray-700">Invoice Date: </span>
              <input
                type="date"
                className="text-gray-600 bg-transparent border-none focus:outline-none focus:ring-0 p-0 m-0"
                value={invoiceDetails.invoiceDate}
                onChange={(e) => handleInvoiceDetailChange(e, 'invoiceDate')}
              />
            </div>
            <div>
              <span className="font-semibold text-gray-700">Due Date: </span>
              <input
                type="date"
                className="text-gray-600 bg-transparent border-none focus:outline-none focus:ring-0 p-0 m-0"
                value={invoiceDetails.dueDate}
                onChange={(e) => handleInvoiceDetailChange(e, 'dueDate')}
              />
            </div>
          </div>
        </div>

        {/* Items Table */}
        <div className="overflow-x-auto mb-8">
          <table className="w-full text-left table-auto">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="py-3 px-4 text-gray-600 font-semibold text-sm rounded-tl-lg">Description</th>
                <th className="py-3 px-4 text-gray-600 font-semibold text-sm w-24">Qty</th>
                <th className="py-3 px-4 text-gray-600 font-semibold text-sm w-32">Rate</th>
                <th className="py-3 px-4 text-gray-600 font-semibold text-sm text-right w-32 rounded-tr-lg">Amount</th>
                <th className="py-3 px-2 text-gray-600 font-semibold text-sm w-12 no-print"></th> {/* For remove button */}
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item.id} className="border-b border-gray-100 last:border-b-0">
                  <td className="py-3 px-4">
                    <textarea
                      className="w-full bg-transparent text-black border-none focus:outline-none focus:ring-0 p-0 m-0 resize-none overflow-hidden"
                      value={item.description}
                      onChange={(e) => handleItemChange(e, item.id, 'description')}
                      rows={1} // Start with 1 row, let CSS handle auto-grow if needed
                      onInput={(e) => {
                        e.currentTarget.style.height = 'auto';
                        e.currentTarget.style.height = e.currentTarget.scrollHeight + 'px';
                      }}
                    />
                  </td>
                  <td className="py-3 px-4">
                    <input
                      type="number"
                      className="w-full bg-transparent text-black border-none focus:outline-none focus:ring-0 p-0 m-0 text-center"
                      value={item.quantity}
                      onChange={(e) => handleItemChange(e, item.id, 'quantity')}
                      min="0"
                    />
                  </td>
                  <td className="py-3 px-4">
                    <input
                      type="number"
                      className="w-full bg-transparent text-black border-none focus:outline-none focus:ring-0 p-0 m-0 text-center"
                      value={item.rate}
                      onChange={(e) => handleItemChange(e, item.id, 'rate')}
                      step="0.01"
                      min="0"
                    />
                  </td>
                  <td className="py-3 px-4 text-right text-black">
                    {formatCurrency(item.quantity * item.rate)}
                  </td>
                  <td className="py-3 px-2 no-print">
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-100 transition-colors"
                      aria-label="Remove item"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 011-1h4a1 1 0 110 2H8a1 1 0 01-1-1zm4 3a1 1 0 10-2 0v4a1 1 0 102 0v-4z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add Item Button */}
        <div className="flex justify-center mb-8 no-print">
          <button
            onClick={addItem}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow transition-colors flex items-center space-x-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            <span>Add Item</span>
          </button>
        </div>

        {/* Totals Section */}
        <div className="flex justify-end mb-8">
          <div className="w-full sm:w-1/2 md:w-1/3">
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-gray-700 font-medium">Subtotal:</span>
              <span className="text-gray-800 font-semibold">{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-gray-700 font-medium">Tax Rate (%):</span>
              <input
                type="number"
                className="text-gray-800 font-semibold bg-transparent border-none focus:outline-none focus:ring-0 p-0 m-0 text-right w-20"
                value={taxRate}
                onChange={(e) => setTaxRate(parseFloat(e.target.value) || 0)}
                min="0"
                max="100"
                step="0.1"
              />
            </div>
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-gray-700 font-medium">Tax Amount:</span>
              <span className="text-gray-800 font-semibold">{formatCurrency(taxAmount)}</span>
            </div>
            <div className="flex justify-between py-3 mt-2 bg-blue-50 text-blue-800 rounded-md px-4">
              <span className="text-lg font-bold">Total:</span>
              <span className="text-lg font-bold">{formatCurrency(total)}</span>
            </div>
          </div>
        </div>

        {/* Notes/Terms */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Notes / Terms:</h3>
          <textarea
            className="w-full p-3 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 resize-y"
            rows={4}
            defaultValue="Payment is due within 30 days of the invoice date. Late payments may incur a fee of 1.5% per month."
          ></textarea>
        </div>

        {/* Print Button */}
        <div className="flex justify-center no-print">
          <button
            onClick={handlePrint}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg shadow transition-colors flex items-center space-x-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5 4V2a2 2 0 012-2h6a2 2 0 012 2v2h2a2 2 0 012 2v8a2 2 0 01-2 2H3a2 2 0 01-2-2V6a2 2 0 012-2h2zm0 2h10v6H5V6zm0 8v2h10v-2H5z" clipRule="evenodd" />
            </svg>
            <span>Print Invoice</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvoicePage;