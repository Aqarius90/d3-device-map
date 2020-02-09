import React, { useState } from "react";
import "./App.css";
import Map from "./Map.js";
import DB from "./DB.json";
import WindowSize from "./windowSize.js";

function App() {
  const [showOwn, setOwn] = useState("both"); //public/private/both
  const [showDev, setDev] = useState("Sve");
  const [showTime, setTime] = useState("now"); //now/after

  /*for the map*/
  function choro() {
    let foo = pullData();
    let bar = [
      { name: "Beograd", value: 0, sat: 0 },
      { name: "Jugoistok", value: 0, sat: 0 },
      { name: "Vojvodina", value: 0, sat: 0 },
      { name: "Centrozapad", value: 0, sat: 0 }
    ];
    foo.forEach(e => {
      bar[0].value += e.Beograd;
      bar[1].value += e.Jugoistok;
      bar[2].value += e.Vojvodina;
      bar[3].value += e.Centrozapad;
    });
    bar[0].sat = DB.pop.Beograd / bar[0].value;
    bar[1].sat = DB.pop.Jugoistok / bar[1].value;
    bar[2].sat = DB.pop.Vojvodina / bar[2].value;
    bar[3].sat = DB.pop.Centrozapad / bar[3].value;
    return bar;
  }
  function pullData() {
    if (["now", "after"].includes(showTime)) {
      if (["public", "private"].includes(showOwn)) {
        if (["MMG", "CT", "MRI"].includes(showDev)) {
          return [DB[showTime][showOwn][showDev]];
        } else {
          return [
            DB[showTime][showOwn].MMG,
            DB[showTime][showOwn].CT,
            DB[showTime][showOwn].MRI
          ];
        }
      } else {
        if (["MMG", "CT", "MRI"].includes(showDev)) {
          return [
            DB[showTime]["public"][showDev],
            DB[showTime]["private"][showDev]
          ];
        } else {
          return [
            DB[showTime]["public"].MMG,
            DB[showTime]["public"].CT,
            DB[showTime]["public"].MRI,
            DB[showTime]["private"].MMG,
            DB[showTime]["private"].CT,
            DB[showTime]["private"].MRI
          ];
        }
      }
    }
  }

  /*for the popup*/
  function formatData() {
    return {
      Kosovo: {
        name: "Kosovo",
        MMG: ["no data", "no data"],
        CT: ["no data", "no data"],
        MRI: ["no data", "no data"]
      },
      Beograd: {
        name: "Beograd",
        MMG: [
          DB[showTime].public.MMG.Beograd,
          DB[showTime].private.MMG.Beograd
        ],
        CT: [DB[showTime].public.CT.Beograd, DB[showTime].private.CT.Beograd],
        MRI: [DB[showTime].public.MRI.Beograd, DB[showTime].private.MRI.Beograd]
      },
      Jugoistok: {
        name: "Južna i istočna Srbija",
        MMG: [
          DB[showTime].public.MMG.Jugoistok,
          DB[showTime].private.MMG.Jugoistok
        ],
        CT: [
          DB[showTime].public.CT.Jugoistok,
          DB[showTime].private.CT.Jugoistok
        ],
        MRI: [
          DB[showTime].public.MRI.Jugoistok,
          DB[showTime].private.MRI.Jugoistok
        ]
      },
      Vojvodina: {
        name: "Vojvodina",
        MMG: [
          DB[showTime].public.MMG.Vojvodina,
          DB[showTime].private.MMG.Vojvodina
        ],
        CT: [
          DB[showTime].public.CT.Vojvodina,
          DB[showTime].private.CT.Vojvodina
        ],
        MRI: [
          DB[showTime].public.MRI.Vojvodina,
          DB[showTime].private.MRI.Vojvodina
        ]
      },
      Centrozapad: {
        name: "Šumadija i zapadna Srbija",
        MMG: [
          DB[showTime].public.MMG.Centrozapad,
          DB[showTime].private.MMG.Centrozapad
        ],
        CT: [
          DB[showTime].public.CT.Centrozapad,
          DB[showTime].private.CT.Centrozapad
        ],
        MRI: [
          DB[showTime].public.MRI.Centrozapad,
          DB[showTime].private.MRI.Centrozapad
        ]
      }
    };
  }

  const { height, width } = WindowSize();
  const h = width > 800 ? 800 : 200;
  const w = width > 800 ? 800 : 200;
  return (
    <div className="App">
      <div className="container-fluid ">
        <div className="header p-2">
          <h2>Raspored Aparata</h2>
        </div>
        <div className="row mx-auto justify-content-center">
          <div className="col-sm-12 col-lg-4 col-xl-3">
            <h4>Uređaji</h4>
            <div className="btn-group btn-group-lg">
              <button
                className={
                  showDev === "MMG"
                    ? "btn btn-secondary active"
                    : "btn btn-secondary"
                }
                onClick={() => setDev("MMG")}
              >
                {" "}
                MMG
              </button>
              <button
                className={
                  showDev === "CT"
                    ? "btn btn-secondary active"
                    : "btn btn-secondary"
                }
                onClick={() => setDev("CT")}
              >
                {" "}
                CT
              </button>
              <button
                className={
                  showDev === "MRI"
                    ? "btn btn-secondary active"
                    : "btn btn-secondary"
                }
                onClick={() => setDev("MRI")}
              >
                {" "}
                MRI
              </button>
              <button
                className={
                  showDev === "Sve"
                    ? "btn btn-secondary active"
                    : "btn btn-secondary"
                }
                onClick={() => setDev("Sve")}
              >
                {" "}
                Sve
              </button>
            </div>
          </div>
          <div className="col-sm-12 col-lg-4 col-xl-3">
            <h4>Vlasništvo</h4>
            <div className="btn-group btn-group-lg">
              <button
                className={
                  showOwn === "public"
                    ? "btn btn-secondary active"
                    : "btn btn-secondary"
                }
                onClick={() => setOwn("public")}
              >
                {" "}
                Javno
              </button>
              <button
                className={
                  showOwn === "private"
                    ? "btn btn-secondary aprivateive"
                    : "btn btn-secondary"
                }
                onClick={() => setOwn("private")}
              >
                {" "}
                Privatno
              </button>
              <button
                className={
                  showOwn === "both"
                    ? "btn btn-secondary active"
                    : "btn btn-secondary"
                }
                onClick={() => setOwn("both")}
              >
                {" "}
                Sve
              </button>
            </div>
          </div>
          <div className="col-sm-12 col-lg-4 col-xl-3">
            <h4>Stanje</h4>
            <div className="btn-group btn-group-lg">
              <button
                className={
                  showTime === "now"
                    ? "btn btn-secondary active"
                    : "btn btn-secondary"
                }
                onClick={() => setTime("now")}
              >
                {" "}
                Trenutno
              </button>
              <button
                className={
                  showTime === "after"
                    ? "btn btn-secondary aprivateive"
                    : "btn btn-secondary"
                }
                onClick={() => setTime("after")}
              >
                {" "}
                Predloženo
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="container p-4 overflow-auto">
        <Map choro={choro()} w={w} h={h} DB={formatData()} pop={DB.pop}></Map>
      </div>
    </div>
  );
}

export default App;
