"use client";
import React, { useState, useMemo } from "react";

const MortgageCalculator = () => {
  const [activeTab, setActiveTab] = useState("emi"); // 'emi' | 'stamp'

  // EMI State
  const [loanAmount, setLoanAmount] = useState(5000000); // 50 Lakhs
  const [interestRate, setInterestRate] = useState(8.5); // 8.5%
  const [tenureYears, setTenureYears] = useState(20);    // 20 Years

  // Stamp Duty State
  const [propertyPrice, setPropertyPrice] = useState(6000000); // 60 Lakhs
  const [buyerGender, setBuyerGender] = useState("male");      // 'male' | 'female' | 'joint'
  const [stateRegion, setStateRegion] = useState("punjab");

  // Format INR Currency
  const formatInr = (val) => {
    if (isNaN(val) || val === null || val === undefined) return "₹0";
    return `₹${Math.round(val).toLocaleString("en-IN")}`;
  };

  // Convert numbers to readable Lakhs / Crores string
  const toReadableLakhs = (val) => {
    if (val >= 10000000) {
      return `${(val / 10000000).toFixed(2)} Cr`;
    }
    if (val >= 100000) {
      return `${(val / 100000).toFixed(1)} Lakh`;
    }
    return val.toLocaleString("en-IN");
  };

  // EMI Calculations
  const { monthlyEmi, totalInterest, totalPayable, principalRatio, interestRatio } = useMemo(() => {
    const P = Number(loanAmount) || 0;
    const r = (Number(interestRate) || 0) / 12 / 100;
    const n = (Number(tenureYears) || 1) * 12;

    if (P <= 0 || n <= 0) {
      return { monthlyEmi: 0, totalInterest: 0, totalPayable: 0, principalRatio: 50, interestRatio: 50 };
    }

    let emi = 0;
    if (r === 0) {
      emi = P / n;
    } else {
      const pow = Math.pow(1 + r, n);
      emi = (P * r * pow) / (pow - 1);
    }

    const total = emi * n;
    const interest = total - P;
    const pRatio = Math.round((P / total) * 100) || 0;
    const iRatio = 100 - pRatio;

    return {
      monthlyEmi: emi,
      totalInterest: interest,
      totalPayable: total,
      principalRatio: pRatio,
      interestRatio: iRatio,
    };
  }, [loanAmount, interestRate, tenureYears]);

  // Stamp Duty Calculations (Punjab: Male 7%, Female 5%, Joint 6% + 1% Registration)
  const { stampDutyAmount, registrationAmount, totalGovtCharges, stampPercent } = useMemo(() => {
    const price = Number(propertyPrice) || 0;
    let sPercent = 7;
    if (buyerGender === "female") sPercent = 5;
    else if (buyerGender === "joint") sPercent = 6;

    const sDuty = (price * sPercent) / 100;
    const regFee = (price * 1) / 100;
    const total = sDuty + regFee;

    return {
      stampDutyAmount: sDuty,
      registrationAmount: regFee,
      totalGovtCharges: total,
      stampPercent: sPercent,
    };
  }, [propertyPrice, buyerGender]);

  return (
    <div className="col-12">
      {/* Tabs */}
      <div className="d-flex gap-2 mb30 border-bottom pb-2">
        <button
          type="button"
          className={`btn ${activeTab === 'emi' ? 'btn-thm text-white' : 'btn-light'} fw600 px-4 py-2`}
          style={{ borderRadius: '30px' }}
          onClick={() => setActiveTab('emi')}
        >
          <i className="fas fa-calculator me-2" /> Home Loan EMI Calculator
        </button>
        <button
          type="button"
          className={`btn ${activeTab === 'stamp' ? 'btn-thm text-white' : 'btn-light'} fw600 px-4 py-2`}
          style={{ borderRadius: '30px' }}
          onClick={() => setActiveTab('stamp')}
        >
          <i className="fas fa-file-contract me-2" /> Stamp Duty & Registry
        </button>
      </div>

      {activeTab === 'emi' ? (
        <div className="row g-4 align-items-center">
          {/* Controls Column */}
          <div className="col-lg-7">
            {/* Loan Amount */}
            <div className="mb25 p-3 rounded-3" style={{ background: '#fdfdfd', border: '1px solid #f0f0f0' }}>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <label className="fw600 fz15 mb-0">Loan Amount</label>
                <span className="badge bg-light text-dark border px-3 py-1 fz15 fw700" style={{ color: '#eb6753' }}>
                  {formatInr(loanAmount)} ({toReadableLakhs(loanAmount)})
                </span>
              </div>
              <input
                type="range"
                className="form-range"
                min={500000}
                max={50000000}
                step={100000}
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                style={{ accentColor: '#eb6753' }}
              />
              <div className="d-flex justify-content-between fz12 text-muted mt-1">
                <span>₹5 Lakh</span>
                <span>₹2.5 Cr</span>
                <span>₹5 Cr</span>
              </div>
            </div>

            {/* Interest Rate */}
            <div className="mb25 p-3 rounded-3" style={{ background: '#fdfdfd', border: '1px solid #f0f0f0' }}>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <label className="fw600 fz15 mb-0">Interest Rate (% P.A.)</label>
                <span className="badge bg-light text-dark border px-3 py-1 fz15 fw700">
                  {interestRate}%
                </span>
              </div>
              <input
                type="range"
                className="form-range"
                min={7.0}
                max={15.0}
                step={0.1}
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                style={{ accentColor: '#eb6753' }}
              />
              <div className="d-flex justify-content-between fz12 text-muted mt-1">
                <span>7.0% (Best Rate)</span>
                <span>11.0%</span>
                <span>15.0%</span>
              </div>
            </div>

            {/* Loan Tenure */}
            <div className="mb25 p-3 rounded-3" style={{ background: '#fdfdfd', border: '1px solid #f0f0f0' }}>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <label className="fw600 fz15 mb-0">Loan Tenure</label>
                <span className="badge bg-light text-dark border px-3 py-1 fz15 fw700">
                  {tenureYears} Years ({tenureYears * 12} Months)
                </span>
              </div>
              <input
                type="range"
                className="form-range"
                min={1}
                max={30}
                step={1}
                value={tenureYears}
                onChange={(e) => setTenureYears(Number(e.target.value))}
                style={{ accentColor: '#eb6753' }}
              />
              <div className="d-flex justify-content-between fz12 text-muted mt-1">
                <span>1 Year</span>
                <span>15 Years</span>
                <span>30 Years</span>
              </div>
            </div>
          </div>

          {/* Result Card Column */}
          <div className="col-lg-5">
            <div
              className="p-4 rounded-4 text-center"
              style={{
                background: 'linear-gradient(135deg, #181a20 0%, #2b303a 100%)',
                color: '#ffffff',
                boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
              }}
            >
              <p className="text-white-50 fz14 mb-1">Monthly Home Loan EMI</p>
              <h2 className="text-white fw700 mb-3" style={{ fontSize: '32px' }}>
                {formatInr(monthlyEmi)}
              </h2>

              <hr style={{ borderColor: 'rgba(255,255,255,0.15)' }} />

              <div className="d-flex justify-content-between fz14 mb-2">
                <span className="text-white-50">Principal Amount:</span>
                <span className="fw600">{formatInr(loanAmount)}</span>
              </div>

              <div className="d-flex justify-content-between fz14 mb-2">
                <span className="text-white-50">Total Interest Payable:</span>
                <span className="fw600" style={{ color: '#eb6753' }}>{formatInr(totalInterest)}</span>
              </div>

              <div className="d-flex justify-content-between fz14 mb-3">
                <span className="text-white-50">Total Payment (P + I):</span>
                <span className="fw700">{formatInr(totalPayable)}</span>
              </div>

              {/* Progress Ratio Bar */}
              <div className="mb-3">
                <div className="progress" style={{ height: '10px', borderRadius: '5px' }}>
                  <div
                    className="progress-bar bg-success"
                    style={{ width: `${principalRatio}%` }}
                    title={`Principal: ${principalRatio}%`}
                  />
                  <div
                    className="progress-bar"
                    style={{ width: `${interestRatio}%`, backgroundColor: '#eb6753' }}
                    title={`Interest: ${interestRatio}%`}
                  />
                </div>
                <div className="d-flex justify-content-between fz11 text-white-50 mt-1">
                  <span>● Principal ({principalRatio}%)</span>
                  <span>● Interest ({interestRatio}%)</span>
                </div>
              </div>

              {/* Direct WhatsApp Callout */}
              <a
                href={`https://wa.me/919855515783?text=${encodeURIComponent(
                  `Hi Home Zone team, I am planning a home loan of ${formatInr(loanAmount)} for ${tenureYears} years. Can you assist me with bank offers from SBI, HDFC, or ICICI?`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn text-white w-100 py-2 fw600"
                style={{
                  backgroundColor: '#25D366',
                  borderRadius: '30px',
                  fontSize: '14px',
                  textDecoration: 'none',
                }}
              >
                <i className="fab fa-whatsapp me-2" /> Connect for Bank Loan Offers
              </a>
            </div>
          </div>
        </div>
      ) : (
        /* Stamp Duty Calculator */
        <div className="row g-4 align-items-center">
          <div className="col-lg-7">
            <div className="mb25 p-3 rounded-3" style={{ background: '#fdfdfd', border: '1px solid #f0f0f0' }}>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <label className="fw600 fz15 mb-0">Total Property Consideration Value</label>
                <span className="badge bg-light text-dark border px-3 py-1 fz15 fw700" style={{ color: '#eb6753' }}>
                  {formatInr(propertyPrice)} ({toReadableLakhs(propertyPrice)})
                </span>
              </div>
              <input
                type="range"
                className="form-range"
                min={1000000}
                max={50000000}
                step={200000}
                value={propertyPrice}
                onChange={(e) => setPropertyPrice(Number(e.target.value))}
                style={{ accentColor: '#eb6753' }}
              />
            </div>

            {/* Buyer Type / Gender */}
            <div className="mb25 p-3 rounded-3" style={{ background: '#fdfdfd', border: '1px solid #f0f0f0' }}>
              <label className="fw600 fz15 mb-2 d-block">Property Registered In Name Of</label>
              <div className="d-flex gap-3">
                <button
                  type="button"
                  className={`btn flex-fill py-2 ${buyerGender === 'male' ? 'btn-thm' : 'btn-outline-secondary'}`}
                  style={{ borderRadius: '8px', fontSize: '13px', fontWeight: 600 }}
                  onClick={() => setBuyerGender('male')}
                >
                  Male (7% Stamp)
                </button>
                <button
                  type="button"
                  className={`btn flex-fill py-2 ${buyerGender === 'female' ? 'btn-thm' : 'btn-outline-secondary'}`}
                  style={{ borderRadius: '8px', fontSize: '13px', fontWeight: 600 }}
                  onClick={() => setBuyerGender('female')}
                >
                  Female (5% Stamp)
                </button>
                <button
                  type="button"
                  className={`btn flex-fill py-2 ${buyerGender === 'joint' ? 'btn-thm' : 'btn-outline-secondary'}`}
                  style={{ borderRadius: '8px', fontSize: '13px', fontWeight: 600 }}
                  onClick={() => setBuyerGender('joint')}
                >
                  Joint (6% Stamp)
                </button>
              </div>
              <small className="text-muted mt-2 d-block">
                * Based on Punjab & North India registration norms (Stamp duty + 1% registration fee).
              </small>
            </div>
          </div>

          <div className="col-lg-5">
            <div
              className="p-4 rounded-4 text-center"
              style={{
                background: 'linear-gradient(135deg, #181a20 0%, #2b303a 100%)',
                color: '#ffffff',
                boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
              }}
            >
              <p className="text-white-50 fz14 mb-1">Estimated Government Registry & Duty</p>
              <h2 className="text-white fw700 mb-3" style={{ fontSize: '32px' }}>
                {formatInr(totalGovtCharges)}
              </h2>

              <hr style={{ borderColor: 'rgba(255,255,255,0.15)' }} />

              <div className="d-flex justify-content-between fz14 mb-2">
                <span className="text-white-50">Stamp Duty ({stampPercent}%):</span>
                <span className="fw600">{formatInr(stampDutyAmount)}</span>
              </div>

              <div className="d-flex justify-content-between fz14 mb-2">
                <span className="text-white-50">Registration Fee (1%):</span>
                <span className="fw600">{formatInr(registrationAmount)}</span>
              </div>

              <div className="d-flex justify-content-between fz14 mb-3">
                <span className="text-white-50">Total Property + Govt Cost:</span>
                <span className="fw700">{formatInr(propertyPrice + totalGovtCharges)}</span>
              </div>

              <a
                href={`https://wa.me/919855515783?text=${encodeURIComponent(
                  `Hi Home Zone, I need help verifying circle rate and registry fees for a property valued at ${formatInr(propertyPrice)} in Patiala/Punjab.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn text-white w-100 py-2 fw600"
                style={{
                  backgroundColor: '#25D366',
                  borderRadius: '30px',
                  fontSize: '14px',
                  textDecoration: 'none',
                }}
              >
                <i className="fab fa-whatsapp me-2" /> Ask Legal / Registry Expert
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MortgageCalculator;
