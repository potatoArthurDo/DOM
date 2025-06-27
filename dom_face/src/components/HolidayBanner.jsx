import React, { useEffect, useState } from "react";
import api from "../api";

export const HolidayBanner = () => {
  const [holiday, setHoliday] = useState([]);
  useEffect(() => {
    getHoliday();
  }, []);
  const getHoliday = () => {
    api
      .get("holiday/today/")
      .then((res) => {
        setHoliday(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="border-2 border-blue-50 p-2 w-[15vw] h-full hidden lg:block lg:fixed lg:top-0 lg:right-0">
      {holiday.recent_holiday && (
        <div className="text-white">
          <p>
            <strong>Recent Holiday:</strong> {holiday.recent_holiday.name}
          </p>
          <p>Date: {holiday.recent_holiday.date.iso}</p>
          <p>Description: {holiday.recent_holiday.description}</p>
        </div>
      )}
      <br />
      {holiday.today_holiday && (
        <div className="text-white">
          <p>
            <strong>Today Holiday:</strong> {holiday.today_holiday.name}
          </p>
          <p>Date: {holiday.today_holiday.date.iso}</p>
          <p>Description: {holiday.today_holiday.description}</p>
        </div>
      )}
      <br />
      {holiday.upcoming_holiday && (
        <div className="text-white">
          <p>
            <strong>Upcoming Holiday:</strong> {holiday.upcoming_holiday.name}
          </p>
          <p>Date: {holiday.upcoming_holiday.date.iso}</p>
          <p>Description: {holiday.upcoming_holiday.description}</p>
        </div>
      )}
    </div>
  );
};
