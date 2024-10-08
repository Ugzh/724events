import { useEffect, useState, useRef } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc = data?.focus?.sort((evtA, evtB) =>
    new Date(evtA.date) < new Date(evtB.date) ? - 1 : 1
  );
  const intervalRef = useRef(null);
  const startInterval = () => {
    intervalRef.current = setInterval(() => {
      setIndex((prevIndex) => (prevIndex < byDateDesc.length - 1 ? prevIndex + 1 : 0));
    }, 5000);
  };

  useEffect(() => {
    startInterval();
      return () => clearInterval(intervalRef.current);
    }, [byDateDesc]);

  const handleRadioChange = (i) => {
    setIndex(i);
    clearInterval(intervalRef.current);
    startInterval(); 
    };

  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <div key={event.title}>
          <div
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
          >
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateDesc.map((_, radioIdx) => (
                  <input
                      key={Math.random()}
                      type="radio"
                      name="radio-button"
                      value={radioIdx}
                      checked={radioIdx === index }
                      onChange={()=>{
                        
                        handleRadioChange(radioIdx)
                      }}
                  />

              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Slider;
