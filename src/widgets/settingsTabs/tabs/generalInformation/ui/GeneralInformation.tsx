"use client";

import { Button, DatePicker, Input, SelectBox } from "@/shared";
import s from "./GeneralInformation.module.scss";
import { useState, useEffect, useMemo } from "react";
import { ProfileAvatarModal } from "@/features";
import { UserAvatar } from "@/entities";
import { TextArea } from "@/shared/ui/TextArea/TextArea";

const countriesOptions = [
  {
    label: "Russia",
    value: "Russia",
    cities: [
      { label: "Moscow", value: "Moscow" },
      { label: "St. Petersburg", value: "St. Petersburg" },
      { label: "Novosibirsk", value: "Novosibirsk" },
      { label: "Murmansk", value: "Murmansk" },
      { label: "Krasnoyarsk", value: "Krasnoyarsk" },
    ],
  },
  {
    label: "Germany",
    value: "Germany",
    cities: [
      { label: "Berlin", value: "Berlin" },
      { label: "Munich", value: "Munich" },
      { label: "Hamburg", value: "Hamburg" },
      { label: "Frankfurt", value: "Frankfurt" },
      { label: "Cologne", value: "Cologne" },
    ],
  },
  {
    label: "Armenia",
    value: "Armenia",
    cities: [
      { label: "Yerevan", value: "Yerevan" },
      { label: "Gyumri", value: "Gyumri" },
      { label: "Vanadzor", value: "Vanadzor" },
      { label: "Vagharshapat", value: "Vagharshapat" },
      { label: "Hrazdan", value: "Hrazdan" },
    ],
  },
  {
    label: "Belarus",
    value: "Belarus",
    cities: [
      { label: "Minsk", value: "Minsk" },
      { label: "Gomel", value: "Gomel" },
      { label: "Mogilev", value: "Mogilev" },
      { label: "Vitebsk", value: "Vitebsk" },
      { label: "Grodno", value: "Grodno" },
    ],
  },
];

export const GeneralInformation = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [isFormValid, setIsFormValid] = useState(false);

  const handleCountryChange = (country: string) => {
    setSelectedCountry(country);
    setSelectedCity("");
  };

  const citiesOptions = useMemo(() => {
    const country = countriesOptions.find(c => c.value === selectedCountry);
    return country ? country.cities : [];
  }, [selectedCountry]);

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
    <div className={s.mainWrapper}>
      <div className={s.avatarSectionWrapper}>
        <UserAvatar />
        <ProfileAvatarModal open={isOpenModal} onOpenChange={setIsOpenModal} />
        <Button variant={"outlined"} onClick={() => setIsOpenModal(prev => !prev)}>
          Select Profile Photo
        </Button>
      </div>

      <form className={s.wrapper} onSubmit={handleSubmit}>
        <Input required value={username} onChange={e => setUsername(e.target.value)} label="Username" fullWidth />

        <Input required value={firstName} onChange={e => setFirstName(e.target.value)} label="First Name" fullWidth />

        <Input required value={lastName} onChange={e => setLastName(e.target.value)} label="Last Name" fullWidth />

        <DatePicker value={selectedDate} onChange={selectedDate => setSelectedDate(selectedDate)} />

        <div className={s.rowField}>
          <div className={s.halfField}>
            <SelectBox
              width="100%"
              label="Country"
              placeholder="Country"
              value={selectedCountry}
              onChange={selectedCountry => handleCountryChange(selectedCountry)}
              options={countriesOptions}
              required
            />
          </div>

          <div className={s.halfField}>
            <SelectBox
              width="100%"
              label="City"
              placeholder="City"
              value={selectedCity}
              onChange={selectedCity => setSelectedCity(selectedCity)}
              disabled={!selectedCountry}
              options={citiesOptions}
              required
            />
          </div>
        </div>

        <TextArea placeholder={"About me..."} label="About me" />

        <Button variant="primary" disabled={!isFormValid} className={!isFormValid ? s.disabledButton : ""}>
          Save Changes
        </Button>
      </form>
    </div>
  );
};
