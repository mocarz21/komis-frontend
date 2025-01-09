import React, { useState, useEffect } from 'react';
import { useTestDrives } from '../../hooks/useTestDrives';
import 'bootstrap/dist/css/bootstrap.min.css';
import './DatePicker.scss';
import { useUsers } from '../../hooks/useUsers';
import { useNavigate, useParams } from 'react-router-dom';

const DatePicker = ({ closePopup }) => {
  const { id } = useParams();
  const { payloadCarsTestData, save } = useTestDrives(id);
  const { payload } = useUsers(localStorage.getItem('userId'));
  const [currentMonthIndex, setCurrentMonthIndex] = useState(0);
  const [twoMonth, setTwoMonth] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [showTimes, setShowTimes] = useState(false);
  const [dataToSend, setDataToSend] = useState('dupa');
  const [unavailableData, setUnavailableData] = useState({});

  const [addTest, setAddTest] = useState({
    user_id: payload?.id,
    car_id: id,
    test_drive_date: dataToSend,
    test_drive_time: selectedTime,
    status: 'scheduled',
  });

  const polishMonths = [
    "styczeń", "luty", "marzec", "kwiecień", "maj", "czerwiec",
    "lipiec", "sierpień", "wrzesień", "październik", "listopad", "grudzień"
  ];
  const availableTimes = ["13:00", "14:00", "15:00"];

  const today = new Date();
  const baseYear = today.getFullYear();
  const baseMonth = today.getMonth(); // 0-based

  const getDaysInMonth = (year, month) => {
    const date = new Date(year, month, 1);
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  useEffect(() => {
    const monthsCountArray = [0, 1, 2].map((offset) => {
      const realMonth = baseMonth + offset;
      const realYear = baseYear + Math.floor(realMonth / 12);
      const monthNormalized = realMonth % 12;
      return getDaysInMonth(realYear, monthNormalized);
    });
    setTwoMonth(monthsCountArray);
  }, [baseMonth, baseYear]);

  useEffect(() => {
    if (!payloadCarsTestData) return;
    const result = {}; 
    payloadCarsTestData.forEach(({ test_drive_date, test_drive_time }) => {
      const dateObj = new Date(test_drive_date);
      const y = dateObj.getFullYear();
      const m = dateObj.getMonth() + 1; 
      const d = dateObj.getDate();

      const monthKey = `${y}-${String(m).padStart(2, '0')}`;

      if (!result[monthKey]) {
        result[monthKey] = { days: [], times: {} };
      }

      const hourStr = test_drive_time.slice(0, 5); 
      if (!result[monthKey].times[d]) {
        result[monthKey].times[d] = [];
      }
      result[monthKey].times[d].push(hourStr);
    });

    Object.keys(result).forEach((monthKey) => {
      const { times } = result[monthKey];
      const fullyBlockedDays = [];

      Object.entries(times).forEach(([dayStr, hoursArray]) => {
        const has13 = hoursArray.includes("13:00");
        const has14 = hoursArray.includes("14:00");
        const has15 = hoursArray.includes("15:00");

        if (has13 && has14 && has15) {
          fullyBlockedDays.push(Number(dayStr));
        }
      });
      result[monthKey].days = fullyBlockedDays;
    });

    setUnavailableData(result);
  }, [payloadCarsTestData]);

  const getDisplayedYearAndMonth = () => {
    const realMonth = baseMonth + currentMonthIndex;
    const displayedYear = baseYear + Math.floor(realMonth / 12);
    const displayedMonth = realMonth % 12; 
    return { displayedYear, displayedMonth };
  };

  const count = (number) => {
    return Array.from({ length: number }, (_, i) => i + 1);
  };

  const handlePrevMonth = () => {
    if (currentMonthIndex > 0) {
      setCurrentMonthIndex(currentMonthIndex - 1);
    }
  };
  const handleNextMonth = () => {
    if (currentMonthIndex < twoMonth.length - 1) {
      setCurrentMonthIndex(currentMonthIndex + 1);
    }
  };

  const handleDateClick = (day) => {
    const { displayedYear, displayedMonth } = getDisplayedYearAndMonth();
    const monthKey = `${displayedYear}-${String(displayedMonth + 1).padStart(2, '0')}`;

    const monthData = unavailableData[monthKey];
    if (!monthData) {
      
    } else {
      const fullyBlockedDays = monthData.days; 
      if (fullyBlockedDays.includes(day)) {
        return;
      }
    }
    setSelectedDate({
      day,
      month: displayedMonth + 1,
      year: displayedYear,
    });
    setShowTimes(true);
  };

  const handleTimeClick = (time) => {
    if (!selectedDate) return;

    const { day, month, year } = selectedDate;
    const monthKey = `${year}-${String(month).padStart(2, '0')}`;


    const monthData = unavailableData[monthKey] || { times: {} };
    const dayHours = monthData.times[day] || [];
    if (dayHours.includes(time)) {
      return;
    }
    setSelectedTime(time);
  };

  const handleSend = () => {
    if (!payload || !selectedDate || !selectedTime) return;

    const dayStr = String(selectedDate.day).padStart(2, '0');
    const monthStr = String(selectedDate.month).padStart(2, '0');
    const year = selectedDate.year;
    const dateString = `${year}-${monthStr}-${dayStr}`;

    let timeString = selectedTime;
    if (timeString.length === 5) {
      timeString += ":00";  // np. "15:00" -> "15:00:00"
    }

    const body = {
      user_id: Number(payload.id),
      car_id: Number(id),
      test_drive_date: dateString,
      test_drive_time: timeString,
      status: 'scheduled',
    };

    save(body);
    console.log("add", body);
    closePopup()
    
  };

  useEffect(() => {
    if (!payload) return;
    setAddTest((prev) => ({
      ...prev,
      user_id: payload?.id || null,
    }));
  }, [payload]);

  useEffect(() => {
    setAddTest((prev) => ({
      ...prev,
      test_drive_date: selectedDate,
      test_drive_time: selectedTime,
    }));
  }, [selectedDate, selectedTime]);

  const { displayedYear, displayedMonth } = getDisplayedYearAndMonth();
  const daysInDisplayedMonth = twoMonth[currentMonthIndex] || 0; 
  const monthKey = `${displayedYear}-${String(displayedMonth + 1).padStart(2, '0')}`;
  const monthData = unavailableData[monthKey] || { days: [], times: {} };

  return (
    <div className="container data-module">
      <h1 className="text-center">Kalendarz</h1>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <button 
          className="btn btn-primary"
          onClick={handlePrevMonth} 
          disabled={currentMonthIndex === 0}
        >
          &larr; Poprzedni
        </button>
        <span className="fw-bold">
          {polishMonths[displayedMonth]} ({displayedYear})
        </span>
        <button 
          className="btn btn-primary"
          onClick={handleNextMonth} 
          disabled={currentMonthIndex === twoMonth.length - 1}
        >
          Następny &rarr;
        </button>
      </div>

      <div className="calendar-days">
        <ul className="d-grid grid-cols-7 list-unstyled">
          {count(daysInDisplayedMonth).map((day) => {
            // Czy ten dzień jest w "fully blocked" -> 13:00,14:00,15:00
            const isFullyBlocked = monthData.days.includes(day);
            return (
              <li 
                key={day}
                className={`border p-2 text-center ${isFullyBlocked ? 'bg-danger text-white' : ''}`}
                onClick={() => handleDateClick(day)}
                style={{ cursor: isFullyBlocked ? 'not-allowed' : 'pointer' }}
              >
                {day}
              </li>
            );
          })}
        </ul>
      </div>
      {showTimes && selectedDate && (
        <div className="available-times mt-3">
          <h5>
            Wybierz godzinę dla {selectedDate.day}/{selectedDate.month}/{selectedDate.year}:
          </h5>
          <div className="d-flex justify-content-center">
            {availableTimes.map((time) => {
              const dayHours = monthData.times[selectedDate.day] || [];
              const isBlocked = dayHours.includes(time);

              return (
                <div 
                  key={time}
                  className={`border p-2 mx-2 text-center ${isBlocked ? 'bg-danger text-white' : ''}`}
                  style={{ cursor: isBlocked ? 'not-allowed' : 'pointer' }}
                  onClick={() => handleTimeClick(time)}
                >
                  {time}
                </div>
              );
            })}
          </div>
          <div className="text-center mt-3">
            <button 
              className="btn btn-success"
              onClick={handleSend}
              disabled={!selectedTime}
            >
              Wyślij do API
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;
