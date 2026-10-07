"use client";
import React, { useState } from "react";

const MortgageCalculator = () => {
  const [formData, setFormData] = useState({
    totalAmount: 250000,
    downPayment: 50000,
    interestRate: 3.5,
    loanTerm: 30,
    propertyTax: 1000,
    homeInsurance: 1000,
  });

  const [results, setResults] = useState(null);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: Number(e.target.value) }));
  };

  const calculate = (e) => {
    e.preventDefault();
    const { totalAmount, downPayment, interestRate, loanTerm, propertyTax, homeInsurance } = formData;

    const principal = totalAmount - downPayment;          // loan amount
    const monthlyRate = interestRate / 100 / 12;          // monthly interest rate
    const numPayments = loanTerm * 12;                    // total payments

    // ✅ Standard mortgage formula: M = P[r(1+r)^n]/[(1+r)^n-1]
    const principalAndInterest =
      monthlyRate === 0
        ? principal / numPayments
        : (principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments))) /
          (Math.pow(1 + monthlyRate, numPayments) - 1);

    const monthlyTax       = propertyTax / 12;
    const monthlyInsurance = homeInsurance / 12;
    const totalMonthly     = principalAndInterest + monthlyTax + monthlyInsurance;

    setResults({
      principalAndInterest: principalAndInterest.toFixed(2),
      propertyTax:          monthlyTax.toFixed(2),
      homeInsurance:        monthlyInsurance.toFixed(2),
      total:                totalMonthly.toFixed(2),
    });
  };

  const fmt = (val) => `₹${Number(val).toLocaleString()}`;

  const resultItems = results
    ? [
        { label: "Principal and Interest", value: fmt(results.principalAndInterest) },
        { label: "Property Taxes",         value: fmt(results.propertyTax) },
        { label: "Homeowners' Insurance",  value: fmt(results.homeInsurance) },
      ]
    : [
        { label: "Principal and Interest", value: "--" },
        { label: "Property Taxes",         value: "--" },
        { label: "Homeowners' Insurance",  value: "--" },
      ];

  return (
    <>
      <div className="col-md-12">
        {/* Result summary */}
        {results && (
          <div className="alert alert-success mb20">
            <strong>Monthly Payment: {fmt(results.total)}</strong>
          </div>
        )}

        <ul className="list-result-calculator d-md-flex flex-wrap justify-content-between bdrb1 mt20 ps-0 pb15 mb-0">
          {resultItems.map((item, index) => (
            <li key={index} className="d-sm-flex align-items-center">
              <span className="name-result text">{item.label}</span>
              <span className="principal-interest-val fw600">{item.value}</span>
            </li>
          ))}
        </ul>

        <form className="comments_form mt30" onSubmit={calculate}>
          <div className="row">
            <div className="col-md-6">
              <div className="mb-4">
                <label className="fw600 ff-heading mb-2">Total Amount (₹)</label>
                <input
                  type="number"
                  name="totalAmount"
                  className="form-control"
                  value={formData.totalAmount}
                  onChange={handleChange}
                  placeholder="₹2500000"
                  required
                />
              </div>
            </div>

            <div className="col-md-6">
              <div className="mb-4">
                <label className="fw600 ff-heading mb-2">Down Payment (₹)</label>
                <input
                  type="number"
                  name="downPayment"
                  className="form-control"
                  value={formData.downPayment}
                  onChange={handleChange}
                  placeholder="₹500000"
                  required
                />
              </div>
            </div>

            <div className="col-md-6">
              <div className="mb-4">
                <label className="fw600 ff-heading mb-2">Interest Rate (%)</label>
                <input
                  type="number"
                  name="interestRate"
                  className="form-control"
                  value={formData.interestRate}
                  onChange={handleChange}
                  placeholder="8.5"
                  step="0.1"
                  required
                />
              </div>
            </div>

            <div className="col-md-6">
              <div className="mb-4">
                <label className="fw600 ff-heading mb-2">Loan Term (Years)</label>
                <input
                  type="number"
                  name="loanTerm"
                  className="form-control"
                  value={formData.loanTerm}
                  onChange={handleChange}
                  placeholder="20"
                  required
                />
              </div>
            </div>

            <div className="col-md-6">
              <div className="mb-4">
                <label className="fw600 ff-heading mb-2">Property Tax (yearly ₹)</label>
                <input
                  type="number"
                  name="propertyTax"
                  className="form-control"
                  value={formData.propertyTax}
                  onChange={handleChange}
                  placeholder="₹12000"
                  required
                />
              </div>
            </div>

            <div className="col-md-6">
              <div className="mb-4">
                <label className="fw600 ff-heading mb-2">Home Insurance (yearly ₹)</label>
                <input
                  type="number"
                  name="homeInsurance"
                  className="form-control"
                  value={formData.homeInsurance}
                  onChange={handleChange}
                  placeholder="₹6000"
                  required
                />
              </div>
            </div>

            <div className="col-md-12">
              <button type="submit" className="ud-btn btn-thm">
                Calculate Monthly EMI
                <i className="fal fa-arrow-right-long" />
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default MortgageCalculator;