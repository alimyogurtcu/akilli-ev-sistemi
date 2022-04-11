import React, { useEffect, useState } from "react";
import "./rightPanel.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDroplet,
  faLightbulb,
  faTemperature1,
  faTemperature2,
  faTemperature3,
  faWarehouse,
  faBell,
  faPersonBooth,
  faToggleOff,
  faToggleOn,
  faArrowDown,
  faArrowUp,
  faEquals,
  faTrash,
  faArrowCircleDown,
  faArrowCircleUp,
} from "@fortawesome/free-solid-svg-icons";

function RightPanel({ addedList, changed, deletedElement, changedFunction }) {
  const [rightList, setRightList] = useState([]); // sağ panel listesi
  const [change, setChange] = useState(false); // değişiklik yapılıp yapılmadığı

  // sol panelden element gelip gelmediği
  useEffect(() => {
    setRightList(addedList);
  }, [changed]);

  // sağ panelde yapılan değişiklik
  useEffect(() => {
    setRightList(rightList);
  }, [change]);

  // sağ panelde element silme
  const deleteElement = (index) => {
    // sol panelde ekleme butonunu aktifleştirmek için
    // sol panel index değeri gönderiliyor
    deletedElement.push(rightList[index].leftListIndex);
    rightList.splice(index, 1);
    changedFunction();
    setChange(!change);
  };

  // gecikme süresi arttırma azaltma
  const changeDelayTime = (time, index) => {
    var delayTime = rightList[index].delayTime + time;
    var formattedNumber;
    // gecikme süresi tek haneli ise 00 formatında yazılması
    if (0 < delayTime < 10 && delayTime >= 0) {
      formattedNumber = "0" + delayTime.toString();
      rightList[index].formattedNumber = formattedNumber;
    } else if (delayTime < 0 ) {
      formattedNumber = "00";
      rightList[index].formattedNumber = formattedNumber;
    }

    rightList[index].delayTime = rightList[index].delayTime + time;
    if (rightList[index].delayTime < 0) rightList[index].delayTime = 0;
    setChange(!change);
  };

  // listedeki elementlerin aşağı, yukarı index değerlerinin değiştirilmesi
  const changeIndex = (toIndex, index) => {
    var element = rightList[index];
    rightList.splice(index, 1);
    if (toIndex + index < 0) toIndex = 0;
    if (toIndex + index - 1 === rightList.length) toIndex = 0;
    rightList.splice(toIndex + index, 0, element);
    setRightList(rightList);
    setChange(!change);
  };

  return (
    <div className="right-list">
      {rightList &&
        rightList.map((element, index) => (
          <>
            <div className="delay-time">
              <span className="delay-time-text">Gecikme Süresi</span>
              <button onClick={() => changeDelayTime(-10, index)}>-10</button>
              <button onClick={() => changeDelayTime(-1, index)}>-1</button>
              <span className="delay-time-text">
                {element.delayTime >= 10
                  ? element.delayTime
                  : element.formattedNumber}{" "}
                sn
              </span>
              <button onClick={() => changeDelayTime(1, index)}>+1</button>
              <button onClick={() => changeDelayTime(10, index)}>+10</button>
            </div>

            <div className="list-element-right">
              <div className="element-name">{element.name}</div>
              <div className="element-type">
                {element.optionType === "light" ? (
                  <FontAwesomeIcon size="3x" icon={faLightbulb} />
                ) : element.optionType === "garage" ? (
                  <FontAwesomeIcon size="3x" icon={faWarehouse} />
                ) : element.optionType === "valve" ? (
                  <FontAwesomeIcon size="3x" icon={faDroplet} />
                ) : element.optionType === "combi" ? (
                  <FontAwesomeIcon
                    size="3x"
                    icon={
                      element.optionValue <= 25
                        ? faTemperature1
                        : element.optionValue < 30
                        ? faTemperature2
                        : faTemperature3
                    }
                  />
                ) : element.optionType === "bell" ? (
                  <FontAwesomeIcon size="3x" icon={faBell} />
                ) : (
                  <FontAwesomeIcon size="3x" icon={faPersonBooth} />
                )}
              </div>
              <div className="element-option">
                {element.optionType === "light" ? (
                  <button className="btnToggle">
                    <FontAwesomeIcon
                      size="3x"
                      icon={element.optionValue === 0 ? faToggleOff : faToggleOn}
                    />
                  </button>
                ) : element.optionType === "garage" ? (
                  <button
                    className={
                      "btnCall " +
                      (element.optionValue === 1
                        ? "selected-option-right-panel"
                        : "width100")
                    }
                  >
                    ÇAĞIR
                  </button>
                ) : element.optionType === "valve" ? (
                  <button className="btnToggle">
                    <FontAwesomeIcon
                      size="3x"
                      icon={element.optionValue ? faToggleOn : faToggleOff}
                    />
                  </button>
                ) : element.optionType === "combi" ? (
                  <span className="temperature">{element.optionValue}</span>
                ) : element.optionType === "bell" ? (
                  <button
                    className={
                      "selected-option-right-panel " +
                      (element.optionValue === 2 ? "btnOutdoor" : "btnInside")
                    }
                  >
                    {element.optionValue === 2 ? "DIŞ" : "EV"}
                  </button>
                ) : (
                  <button
                    className={
                      "selected-option-right-panel " +
                      (element.optionValue === 1
                        ? "btnUp"
                        : element.optionValue === 2
                        ? "btnEqual"
                        : "btnDown")
                    }
                  >
                    {element.optionValue === 1 ? (
                      <FontAwesomeIcon icon={faArrowUp} />
                    ) : element.optionValue === 2 ? (
                      <FontAwesomeIcon icon={faEquals} />
                    ) : (
                      <FontAwesomeIcon icon={faArrowDown} />
                    )}
                  </button>
                )}
              </div>
              <div className="right-buttons">
                <button onClick={() => changeIndex(1, index)}>
                  <FontAwesomeIcon size="3x" icon={faArrowCircleDown} />
                </button>
                <button onClick={() => changeIndex(-1, index)}>
                  <FontAwesomeIcon size="3x" icon={faArrowCircleUp} />
                </button>
                <button onClick={() => deleteElement(index)}>
                  <FontAwesomeIcon
                    size="3x"
                    icon={faTrash}
                  />
                </button>
              </div>
            </div>
          </>
        ))}
    </div>
  );
}

export default RightPanel;
