"use client";

import { Button } from "@/shared";
import s from "./GeneralInformation.module.scss";
import { useState, useEffect } from "react";

interface CountryData {
  [key: string]: {
    name: string;
    cities: string[];
  };
}

const countriesData: CountryData = {
  country1: {
    name: "Country1",
    cities: ["City1", "City2", "City3"],
  },
  country2: {
    name: "Country2",
    cities: ["City4", "City5", "City6"],
  },
  country3: {
    name: "Country3",
    cities: ["City7", "City8", "City9"],
  },
};

export const GeneralInformation = () => {
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCountry(e.target.value);
    setSelectedCity("");
  };

  const cities = selectedCountry ? countriesData[selectedCountry].cities : [];

  useEffect(() => {
    const isValid =
      username.trim() !== "" &&
      firstName.trim() !== "" &&
      lastName.trim() !== "" &&
      selectedCountry !== "" &&
      selectedCity !== "";

    setIsFormValid(isValid);
  }, [username, firstName, lastName, selectedCountry, selectedCity]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      console.log("Form submitted:", { username, firstName, lastName, selectedCountry, selectedCity });
    }
  };

  return (
    <form className={s.wrapper} onSubmit={handleSubmit}>
      <div className={s.field}>
        <label className={`${s.label} ${s.requiredLabel}`}>Username</label>
        <input required value={username} onChange={e => setUsername(e.target.value)} />
      </div>

      <div className={s.field}>
        <label className={`${s.label} ${s.requiredLabel}`}>First Name</label>
        <input required value={firstName} onChange={e => setFirstName(e.target.value)} />
      </div>

      <div className={s.field}>
        <label className={`${s.label} ${s.requiredLabel}`}>Last Name</label>
        <input required value={lastName} onChange={e => setLastName(e.target.value)} />
      </div>

      <div className={s.rowField}>
        <div className={s.halfField}>
          <label className={s.label}>Country</label>
          <select value={selectedCountry} onChange={handleCountryChange} className={s.transparentSelect} required>
            <option value="" disabled>
              Country
            </option>
            {Object.entries(countriesData).map(([value, { name }]) => (
              <option key={value} value={value}>
                {name}
              </option>
            ))}
          </select>
        </div>

        <div className={s.halfField}>
          <label className={s.label}>City</label>
          <select
            value={selectedCity}
            onChange={e => setSelectedCity(e.target.value)}
            disabled={!selectedCountry}
            className={s.transparentSelect}
            required
          >
            <option value="" disabled>
              {selectedCountry ? "City" : "Select a country first"}
            </option>
            {cities.map(city => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className={s.field}>
        <label className={s.label}>About me</label>
        <textarea placeholder="Text area" />
      </div>

      <Button variant="primary" disabled={!isFormValid} className={!isFormValid ? s.disabledButton : ""}>
        Save Changes
      </Button>
    </form>
  );
};
