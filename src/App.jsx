import { useState } from "react";
import "./App.css";

function formatWithDashes(value) {
  return (
    value
      .replace(/\D/g, "") // remove non-digits just in case
      .match(/.{1,4}/g) // split every 4 digits
      ?.join("-") || ""
  ); // join with dashes or return empty
}

function App() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    costGuess: "",
    spidrPin: "",
  });

  const [showPin, setShowPin] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;

    if (name === "spidrPin") {
      const digitsOnly = value.replace(/\D/g, "").slice(0, 16); // max 16 digits
      setFormData((prev) => ({
        ...prev,
        [name]: digitsOnly,
      }));
      return;
    }

    // Update all other fields
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Form submitted.", formData);
  }

  const isFormValid = formData.spidrPin.length === 16;

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-12 font-raleway text-white">
      <div className="w-full max-w-md space-y-6">
        <h1 className="text-2xl font-semibold text-center text-[#d1d0ce]">
          Air Fryer Interest Form
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col">
            <label
              htmlFor="firstName"
              className="text-sm text-[#d1d0ce] font-medium mb-1"
            >
              First Name
            </label>
            <input
              name="firstName"
              id="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Josh"
              className="text-[#d1d0ce] px-3 py-2 border border-[#3892a0] shadow-sm focus:outline-none focus:ring-2 focus:ring-black transition"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="lastName"
              className="text-sm text-[#d1d0ce] font-medium mb-1"
            >
              Last Name
            </label>
            <input
              name="lastName"
              id="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Kim"
              className="text-[#d1d0ce] px-3 py-2 border border-[#3892a0] shadow-sm focus:outline-none focus:ring-2 focus:ring-black transition"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="phone"
              className="text-sm text-[#d1d0ce] font-medium mb-1"
            >
              Phone Number
            </label>
            <input
              name="phone"
              id="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="555-123-4567"
              inputMode="tel"
              className="text-[#d1d0ce] px-3 py-2 border border-[#3892a0] shadow-sm focus:outline-none focus:ring-2 focus:ring-black transition"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="text-sm text-[#d1d0ce] font-medium mb-1"
            >
              Email Address
            </label>
            <input
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="josh@example.com"
              inputMode="email"
              className="text-[#d1d0ce] px-3 py-2 border border-[#3892a0] shadow-sm focus:outline-none focus:ring-2 focus:ring-black transition"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="costGuess"
              className="text-sm text-[#d1d0ce] font-medium mb-1"
            >
              Guess the Air Fryer’s Cost
            </label>
            <input
              name="costGuess"
              id="costGuess"
              type="number"
              value={formData.costGuess}
              onChange={handleChange}
              placeholder="$149"
              inputMode="numeric"
              className="text-[#d1d0ce] px-3 py-2 border border-[#3892a0] shadow-sm focus:outline-none focus:ring-2 focus:ring-black transition"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="spidrPin"
              className="text-sm text-[#d1d0ce] font-medium mb-1"
            >
              Spidr PIN
              {formData.spidrPin.length < 16 && (
                <p className="text-sm text-red-600 mt-1">
                  PIN must be exactly 16 digits
                </p>
              )}
            </label>

            <input
              type={showPin ? "text" : "password"}
              name="spidrPin"
              id="spidrPin"
              value={formatWithDashes(formData.spidrPin)}
              onChange={handleChange}
              placeholder="####-####-####-####"
              inputMode="numeric"
              autoComplete="off"
              maxLength={19}
              className="text-[#d1d0ce] px-3 py-2 mb-2 border border-[#3892a0] shadow-sm focus:outline-none focus:ring-2 focus:ring-black transition font-mono tracking-widest pr-16"
            />

            <button
              type="button"
              onClick={() => setShowPin((prev) => !prev)}
              className="text-sm px-3 py-1 transition"
            >
              {showPin ? "Hide PIN" : "Show PIN"}
            </button>
          </div>
          <button
            type="submit"
            disabled={!isFormValid}
            className={`w-full py-2 px-4 font-semibold transition 
            ${!isFormValid ? "" : ""}`}
          >
            Submit
          </button>
        </form>
      </div>
    </main>
  );
}

export default App;
