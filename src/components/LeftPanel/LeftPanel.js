import React, { useState, useEffect } from "react";
import "./leftPanel.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBan,
  faCheck,
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
  faMinus,
  faPlus,
  faArrowDown,
  faArrowUp,
  faEquals,
} from "@fortawesome/free-solid-svg-icons";

function LeftPanel({ addedList, changedFunction, deletedElement }) {
  const [leftList, setLeftList] = useState([]); // sol panel listesi
  const [optionType, setOptionType] = useState(""); // seçilen senaryo tipi
  const [name, setName] = useState(""); // girilen senaryo ismi
  const [change, setChange] = useState(false); // değişiklik yapılıp yapılmadığı
  const [error, setError] = useState(false); // hata verilip verilmediği
  const [errorMsg, setErrorMsg] = useState(""); // hata mesajı

  // sol panelde değişiklik olursa liste güncellemesi
  useEffect(() => {
    setLeftList(leftList);
    if (error === true) setError(false);
  }, [change]);

  // sağ panelde değişiklik olursa liste güncellemesi
  useEffect(() => {
    if (deletedElement.length > 0) {
      leftList[deletedElement].added = false;
      // deletedElement array'inin sıfırlanması
      deletedElement.splice(0, 1);
      if (error === true) setError(false);
      setChange(!change);
    }
  }, [changedFunction]);

  // iptal butonu
  const cancel = () => {
    setName("");
    setOptionType("");
    document.getElementById("senaryo-input").value = "";
    document.getElementById("option-type").selectedIndex = 0;
  };

  // sol panele senaryo kaydet butonu
  const add = () => {
    // senaryo ismi girilmemişse
    if (name.length < 1) {
      setError(true);
      setErrorMsg("Lütfen senaryo giriniz");
      return;
    }
    //senaryo seçilmemişse
    if (optionType.length < 1) {
      setError(true);
      setErrorMsg("Lütfen ürün seçiniz.");
      return;
    }

    // default değerler
    var optionValue = 0;
    var delayTime = 0;
    var formattedNumber = "00"; // gecikme süresi 00 şeklinde yazılması
    var added = false;
    var leftListIndex = leftList.length;

    if (optionType === "combi") optionValue = 25.5;

    const newElement = {
      name,
      optionType,
      optionValue,
      delayTime,
      formattedNumber,
      added,
      leftListIndex,
    };

    var arr = [];

    if (leftList) arr = [...leftList];

    arr.push(newElement);
    setLeftList(arr);

    setName("");
    setOptionType("");
    document.getElementById("senaryo-input").value = "";
    document.getElementById("option-type").selectedIndex = 0;
    setChange(!change);
  };

  // lamba, vana botunu
  const toggle = (index) => {
    const value = leftList[index].optionValue;

    if (value === 1) leftList[index].optionValue = 0;
    else leftList[index].optionValue = 1;
    setChange(!change);
  };

  // sağ panele taşıma
  const addRightList = (index) => {
    // perdede seçenek seçilmemişse
    if (
      leftList[index].optionType === "curtain" &&
      leftList[index].optionValue === 0
    ) {
      setError(true);
      setErrorMsg("Lütfen yapılması istenilen senaryoyu seçiniz.");
      return;
    }
    leftList[index].added = true;
    addedList.push(leftList[index]);
    changedFunction();
  };

  // kombi sıcaklık değiştirme
  const changeTemperature = (temperature, index) => {
    leftList[index].optionValue = leftList[index].optionValue + temperature;
    setChange(!change);
  };

  // seçeneklerin seçilmesi, seçileni kaldırma
  const changeOptionValue = (value, index) => {
    if (value === leftList[index].optionValue) leftList[index].optionValue = 0;
    else leftList[index].optionValue = value;
    setChange(!change);
  };

  return (
    <>
      <div className="upper-left-panel">
        <div className="add-panel">
          <input
            type="text"
            id="senaryo-input"
            className="add-name-input"
            placeholder="SENARYO İSMİ GİRİNİZ"
            onChange={(e) => setName(e.target.value)}
          />

          <select
            name="type"
            id="option-type"
            className="option-type"
            onChange={(e) => setOptionType(e.target.value)}
          >
            <option hidden>
              SEÇİNİZ
            </option>
            <option value="light">Lamba</option>
            <option value="garage">Garaj</option>
            <option value="valve">Vana</option>
            <option value="combi">Kombi</option>
            <option value="bell">Alarm</option>
            <option value="curtain">Perde</option>
          </select>

          <div className="buttons">
            <label htmlFor="iptal">
              <FontAwesomeIcon icon={faBan} /> <br />
              <button id="iptal" onClick={cancel}>
                İPTAL
              </button>
            </label>
            <label htmlFor="kaydet">
              <FontAwesomeIcon icon={faCheck} /> <br />
              <button id="kaydet" onClick={add}>
                KAYDET
              </button>
            </label>
          </div>
        </div>

        <div className="order">
          <label htmlFor="hepsi">
            Hepsi{" "}
            <input type="radio" id="hepsi" name="orderBy" defaultChecked />
          </label>

          <label htmlFor="alan">
            Alan <input type="radio" id="alan" name="orderBy" />
          </label>

          <label htmlFor="tip">
            Tip <input type="radio" id="tip" name="orderBy" />
          </label>

          <label htmlFor="alfabetik">
            A-Z <input
              type="radio"
              id="alfabetik"
              name="orderBy"
              value="alfabetik"
            />
          </label>
        </div>
      </div>

      {error && <span className="errorMsg">Hata: {errorMsg}</span>}

      <div className="left-list">
        {leftList &&
          leftList.map((element, index) => (
            <>
              <div className="list-element-left">
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
                {element.optionType === "light" ? (
                  <>
                    <div className="element-option">
                      <button className="btnToggle">
                        <FontAwesomeIcon
                          size="3x"
                          icon={
                            leftList[index].optionValue === 0
                              ? faToggleOff
                              : faToggleOn
                          }
                          onClick={() => toggle(index)}
                        />
                      </button>
                    </div>
                  </>
                ) : element.optionType === "garage" ? (
                  <>
                    <div className="element-option">
                      <button
                        className={
                          "btnCall " +
                          (leftList[index].optionValue === 1 &&
                            "selected-option")
                        }
                        onClick={() => changeOptionValue(1, index)}
                      >
                        ÇAĞIR
                      </button>
                    </div>
                  </>
                ) : element.optionType === "valve" ? (
                  <>
                    <div className="element-option">
                      <button className="btnToggle">
                        <FontAwesomeIcon
                          size="3x"
                          icon={
                            leftList[index].optionValue
                              ? faToggleOn
                              : faToggleOff
                          }
                          onClick={() => toggle(index)}
                        />
                      </button>
                    </div>
                  </>
                ) : element.optionType === "combi" ? (
                  <>
                    <div className="element-option">
                      <button
                        className="btnInc"
                        onClick={() => changeTemperature(0.5, index)}
                      >
                        <FontAwesomeIcon icon={faPlus} />
                      </button>
                      <span className="temperature">
                        {leftList[index].optionValue}
                      </span>{" "}
                      <button
                        className="btnDec"
                        onClick={() => changeTemperature(-0.5, index)}
                      >
                        <FontAwesomeIcon icon={faMinus} />
                      </button>
                    </div>
                  </>
                ) : element.optionType === "bell" ? (
                  <>
                    <div className="element-option">
                      <button
                        className={
                          "btnInside " +
                          (leftList[index].optionValue === 1 &&
                            "selected-option")
                        }
                        onClick={() => changeOptionValue(1, index)}
                      >
                        EV
                      </button>
                      <button
                        className={
                          "btnOutdoor " +
                          (leftList[index].optionValue === 2 &&
                            "selected-option")
                        }
                        onClick={() => changeOptionValue(2, index)}
                      >
                        DIŞ
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="element-option">
                      <button
                        className={
                          "btnUp " +
                          (leftList[index].optionValue === 1 &&
                            "selected-option")
                        }
                        onClick={() => changeOptionValue(1, index)}
                      >
                        <FontAwesomeIcon icon={faArrowUp} />
                      </button>
                      <button
                        className={
                          "btnEqual " +
                          (leftList[index].optionValue === 2 &&
                            "selected-option")
                        }
                        onClick={() => changeOptionValue(2, index)}
                      >
                        <FontAwesomeIcon icon={faEquals} />
                      </button>
                      <button
                        className={
                          "btnDown " +
                          (leftList[index].optionValue === 3 &&
                            "selected-option")
                        }
                        onClick={() => changeOptionValue(3, index)}
                      >
                        <FontAwesomeIcon icon={faArrowDown} />
                      </button>
                    </div>
                  </>
                )}
                <div className="add-element-right-panel">
                  <button
                    onClick={() => addRightList(index)}
                    disabled={element.added ? true : false}
                  >
                    {element.added ? "EKLENDİ" : "EKLE"}
                  </button>
                </div>
              </div>
            </>
          ))}
      </div>
    </>
  );
}

export default LeftPanel;
