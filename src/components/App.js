import React, { useState, useEffect } from "react";
import { Container, Nav } from "./styled-components";

// fusioncharts
import FusionCharts from "fusioncharts";
import Charts from "fusioncharts/fusioncharts.charts";
import Maps from "fusioncharts/fusioncharts.maps";
import USARegion from "fusionmaps/maps/es/fusioncharts.usaregion";
import ReactFC from "react-fusioncharts";
import "./chart-theme";

import config from "./config";
import Dropdown from "react-dropdown";
import formatNum from "./format-number";

import UserImg from "../assets/images/general-kenobi.jpg";

ReactFC.fcRoot(FusionCharts, Charts, Maps, USARegion);

const url = `https://sheets.googleapis.com/v4/spreadsheets/${config.spreadsheetId
  }/values:batchGet?ranges=Sheet1&majorDimension=ROWS&key=${config.apiKey}`;


function App() {

  //These objects were already created in the constructor in the original version 
  //Setting the inital state of each object 
  const [items, setItems] = useState([]);
  const [dropdownOptions, setdropdownOptions] = useState([]);
  const [selectedValue, setSelectedValue] = useState(null);

  const [amRevenue, setAmRevenue] = useState(null);
  const [ebRevenue, setEbRevenue] = useState(null);
  const [etRevenue, setEtRevenue] = useState(null);
  const [mySpecialList, setMySpecialList] = useState(null);
  const [totalRevenue, setTotalRevenue] = useState(null);
  const [productiveViews, setProductiveViews] = useState(null);
  const [newMonthName, setNewMonthName] = useState(null);

  const [purchaseRate, setPurchaseRate] = useState(" ");
  const [checkoutRate, setCheckoutRate] = useState(" ");
  const [abandonedRate, setAbandonedRate] = useState(" ");
  
  //These objects were not defined in the constructor in the original version
  const [ordersTrendStore, setOrderTrendStore] = useState([]);
  // const [ordersTrendRegion, setOrderTrendRegion] = useState([]);
  // const [ordersTrendnw, setOrderTrendnw] = useState(null);
  // const [ordersTrendsw, setOrderTrendsw] = useState(null);
  // const [ordersTrendc, setOrderTrendc] = useState(null);
  // const [ordersTrendne, setOrderTrendne] = useState(null);
  // const [ordersTrendse, setOrderTrendse] = useState(null);

  // const [rows, setRows] = useState([]);

  
  const getData = arg => {
    console.log("getData Call: " + arg);
    // google sheets data
    const arr = items;
    const arrLen = arr.length;
    console.log("This is what arr is: " + arr);
    console.log("This is what arrLen is: " + arrLen);

    // let selectedValueNew = null; 
    // setSelectedValue(null);
    console.log("The Selected Value at start of getData is: " + String(selectedValue));
    
    // Add some local variables to hold the revenue values by company
    let amRevenueValue = 0;
    let ebRevenueValue = 0;
    let etRevenueValue = 0;

    for (let i = 0; i < arrLen; i++) {
      if (arg === arr[i]["month"]) {
        console.log("This is the current month: " + arg);
        if (arr[i]["source"] === "AM") {          

          // store the amRevenue value locally for use to calculate totalRevenue
          amRevenueValue = parseInt(arr[i].revenue)
          // set the state
          setAmRevenue(amRevenueValue);

          console.log("This is the revenue from Amazon: " + arr[i].revenue);
          ordersTrendStore.push({
            label: "Amazon",
            value: arr[i].orders,
            displayValue: `${arr[i].orders} orders`
          });
        }
        else if (arr[i]["source"] === "EB") {

          // store the ebRevenue value locally for use to calculate totalRevenue
          ebRevenueValue = parseInt(arr[i].revenue)
          // set the state
          setEbRevenue(ebRevenueValue);

          ordersTrendStore.push({
            label: "Ebay",
            value: arr[i].orders,
            displayValue: `${arr[i].orders} orders`
          });
        } else if (arr[i]["source"] === "ET") {

          // store the etRevenue value locally for use to calculate totalRevenue
          etRevenueValue = parseInt(arr[i].revenue)
          // set the state
          setEtRevenue(etRevenueValue);

          ordersTrendStore.push({
            label: "Etsy",
            value: arr[i].orders,
            displayValue: `${arr[i].orders} orders`
          });
        }
        else if (arr[i]["source"] === "SARAH") {
          // mySpecialList += parseInt(arr[i].My_Special_List);
          setMySpecialList(arr[i].revenue);
          // console.log("You have this value: " + mySpecialList);
          // console.log("It is coming from here: " + arr[i]["source"]);
          ordersTrendStore.push({
            label: "Sarah",
            value: arr[i].orders,
            displayValue: `${arr[i].orders} orders`
          });
        }

        setProductiveViews(parseInt(arr[i].product_views));
        setPurchaseRate(parseInt(arr[i].purchase_rate / 3));
        setCheckoutRate(parseInt(arr[i].checkout_rate / 3));
        setAbandonedRate(parseInt(arr[i].abandoned_rate / 3));
        // setOrderTrendc(parseInt(arr[i].orders_c));
        // setOrderTrendne(parseInt(arr[i].orders_ne));
        // setOrderTrendnw(parseInt(arr[i].orders_nw));
        // setOrderTrendsw(parseInt(arr[i].orders_sw));
        // setOrderTrendse(parseInt(arr[i].orders_se));
        setNewMonthName(String(arr[i].Name));
        console.log("We are on this month: " + arg);

        // purchaseRate += parseInt(arr[i].purchase_rate / 3);
        // checkoutRate += parseInt(arr[i].checkout_rate / 3);
        // abandonedRate += parseInt(arr[i].abandoned_rate / 3);
        // orderesTrendnw += parseInt(arr[i].orders_nw);
        // orderesTrendsw += parseInt(arr[i].orders_sw);
        // orderesTrendc += parseInt(arr[i].orders_c);
        // orderesTrendne += parseInt(arr[i].orders_ne);
        // orderesTrendse += parseInt(arr[i].orders_se);
        // newMonthName += arr[i]["name"];
       
      }
    }

    // totalRevenue = parseInt(amRevenue + ebRevenue + etRevenue);

    // use the local variables to calculate totalRevenue - we can't count on the state versions to havve been updated within this closure
    setTotalRevenue(parseInt(amRevenueValue + ebRevenueValue + etRevenueValue));

    // setTotalRevenue(parseInt(amRevenue));
    console.log("This should be the total Revenue: " + totalRevenue);
    // ordersTrendRegion.push({
    //   id: "01",
    //   value: ordersTrendne
    // }, {
    //   id: "02",
    //   value: ordersTrendnw
    // }, {
    //   id: "03",
    //   value: ordersTrendse
    // }, {
    //   id: "04",
    //   value: ordersTrendsw
    // }, {
    //   id: "05",
    //   value: ordersTrendc
    // });

    // selectedValueNew = arg; 
    setSelectedValue(arg);
    console.log("The New Selected Value: " + String(selectedValue));



    // setting state
    // setProductiveViews(productiveViews);
    // setPurchaseRate(purchaseRate);
    // setCheckoutRate(checkoutRate);
    // setAbandonedRate(abandonedRate);
    // setOrderTrendc(ordersTrendc);
    // setOrderTrendne(ordersTrendne);
    // setOrderTrendnw(ordersTrendnw);
    // setOrderTrendsw(ordersTrendsw);
    // setOrderTrendse(ordersTrendse);
    
  };


  const updateDashboard = event => {
    getData(event.value);
    setSelectedValue(event.value);
    console.log("SELECTED VALUE IN UPDATEDASHBOARD: " + selectedValue);
  };

  useEffect(() => {
    console.log("I'm here!");

    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data);

        let batchRowValues = data.valueRanges[0].values;
        // console.log("This is what batchRowValues is: " + batchRowValues);

        const rows = [];

        for (let i = 1; i < batchRowValues.length; i++) {
          let rowObject = {};
          for (let j = 0; j < batchRowValues[i].length; j++) {
            rowObject[batchRowValues[0][j]] = batchRowValues[i][j];
            // console.log("rowObject: " + rowObject);
            console.log("batchRowValues: " + batchRowValues[i][j])
          }
          rows.push(rowObject);
          // console.log("This is Rows: " + rows);
        }

        let options = [];
        // dropdown options


        for (let i = 0; i < rows.length; i++) {
          options.push(rows[i].month);
        }

        // setdropdownOptions(Array.from(new Set(options)).reverse());
        options = Array.from(new Set(options)).reverse();
        
        console.log("This is rows: " + rows);
        setItems(rows);
        setdropdownOptions(options);
        setSelectedValue("Jan 2018");
        console.log("selectedValue HERE is: " + selectedValue);
        // getData("Jan 2018");
      });
  }, []);

useEffect( () => {
  if (selectedValue) {
    getData(selectedValue);
  }
}, [selectedValue]);

  // render() {
  return (
    <Container>
      {/* static navbar - top */}
      <Nav className="navbar navbar-expand-lg fixed-top is-white is-dark-text">
        <Container className="navbar-brand h1 mb-0 text-large font-medium">
          Online Retail Dashboard
          </Container>
        <Container className="navbar-nav ml-auto">
          <Container className="user-detail-section">
            <span className="pr-2"> Hello there, {newMonthName}</span>
            <span className="img-container">
              <img src={UserImg} className="rounded-circle" alt="user" />
            </span>
          </Container>
        </Container>
      </Nav>

      {/* static navbar - bottom */}
      <Nav className="navbar fixed-top nav-secondary is-dark is-light-text">
        <Container className="text-medium">Summary</Container>
        <Container className="navbar-nav ml-auto">
          <Dropdown
            className="pr-2 custom-dropdown"
            options={dropdownOptions}
            onChange={updateDashboard}
            value={selectedValue}
            placeholder="Select an option"
          />
        </Container>
      </Nav>

      {/* content area start */}
      <Container className="container-fluid pr-5 pl-5 pt-5 pb-5">
        {/* row 1 - revenue */}
        <Container className="row">
          <Container className="col-lg-3 col-sm-6 is-light-text mb-4">
            <Container className="card grid-card is-card-dark">
              <Container className="card-heading">
                <Container className="is-dark-text-light letter-spacing text-small">
                  Total Revenue
                  </Container>
              </Container>

              <Container className="card-value pt-4 text-x-large">
                <span className="text-large pr-1">$</span>
                {totalRevenue}
              </Container>
            </Container>
          </Container>

          <Container className="col-lg-3 col-sm-6 is-light-text mb-4">
            <Container className="card grid-card is-card-dark">
              <Container className="card-heading">
                <Container className="is-dark-text-light letter-spacing text-small">
                  Revenue from Amazon
                  </Container>
                <Container className="card-heading-brand">
                  <i className="fab fa-amazon text-large" />
                </Container>
              </Container>

              <Container className="card-value pt-4 text-x-large">
                <span className="text-large pr-1">$</span>
                {amRevenue}
              </Container>
            </Container>
          </Container>

          <Container className="col-lg-3 col-sm-6 is-light-text mb-4">
            <Container className="card grid-card is-card-dark">
              <Container className="card-heading">
                <Container className="is-dark-text-light letter-spacing text-small">
                  Revenue from Ebay
                  </Container>
                <Container className="card-heading-brand">
                  <i className="fab fa-ebay text-x-large logo-adjust" />
                </Container>
              </Container>

              <Container className="card-value pt-4 text-x-large">
                <span className="text-large pr-1">$</span>
                {ebRevenue}
              </Container>
            </Container>
          </Container>

          <Container className="col-lg-3 col-sm-6 is-light-text mb-4">
            <Container className="card grid-card is-card-dark">
              <Container className="card-heading">
                <Container className="is-dark-text-light letter-spacing text-small">
                  Revenue from Etsy
                  </Container>
                <Container className="card-heading-brand">
                  <i className="fab fa-etsy text-medium" />
                </Container>
              </Container>

              <Container className="card-value pt-4 text-x-large">
                <span className="text-large pr-1">$</span>
                {etRevenue}
              </Container>
            </Container>
          </Container>
        </Container>

        <Container className="col-lg-3 col-sm-6 is-light-text mb-4">
          <Container className="card grid-card is-card-dark">
            <Container className="card-heading">
              <Container className="is-dark-text-light letter-spacing text-small">
                Sarah's Items
                  </Container>
              <Container className="card-heading-brand">
                <i className="fab fa-amazon text-large" />
              </Container>
            </Container>

            <Container className="card-value pt-4 text-x-large">
              <span className="text-large pr-1">$</span>
              {mySpecialList}
            </Container>
          </Container>
        </Container>

        {/* row 2 - conversion */}
        <Container className="row">
          <Container className="col-md-4 col-lg-3 is-light-text mb-4">
            <Container className="card grid-card is-card-dark">
              <Container className="card-heading mb-3">
                <Container className="is-dark-text-light letter-spacing text-small">
                  Product Views
                  </Container>
              </Container>
              <Container className="card-value pt-4 text-x-large">
                {productiveViews}
                <span className="text-medium pl-2 is-dark-text-light">
                  views
                  </span>
              </Container>
            </Container>
          </Container>

          <Container className="col-md-8 col-lg-9 is-light-text mb-4">
            <Container className="card is-card-dark chart-card">
              <Container className="row full-height">
                <Container className="col-sm-4 full height">
                  <Container className="chart-container full-height">
                    <ReactFC
                      {...{
                        type: "doughnut2d",
                        width: "100%",
                        height: "100%",
                        dataFormat: "json",
                        containerBackgroundOpacity: "0",
                        dataSource: {
                          chart: {
                            caption: "Purchase Rate",
                            theme: "ecommerce",
                            defaultCenterLabel: `${purchaseRate}%`,
                            paletteColors: "#3B70C4, #000000"
                          },
                          data: [
                            {
                              label: "active",
                              value: `${purchaseRate}`
                            },
                            {
                              label: "inactive",
                              alpha: 5,
                              value: `${100 - purchaseRate}`
                            }
                          ]
                        }
                      }}
                    />
                  </Container>
                </Container>
                <Container className="col-sm-4 full-height border-left border-right">
                  <Container className="chart-container full-height">
                    <ReactFC
                      {...{
                        type: "doughnut2d",
                        width: "100%",
                        height: "100%",
                        dataFormat: "json",
                        containerBackgroundOpacity: "0",
                        dataSource: {
                          chart: {
                            caption: "Checkout Rate",
                            theme: "ecommerce",
                            defaultCenterLabel: `${checkoutRate}%`,
                            paletteColors: "#41B6C4, #000000"
                          },
                          data: [
                            {
                              label: "active",
                              value: `${checkoutRate}`
                            },
                            {
                              label: "inactive",
                              alpha: 5,
                              value: `${100 - checkoutRate}`
                            }
                          ]
                        }
                      }}
                    />
                  </Container>
                </Container>
                <Container className="col-sm-4 full-height">
                  <Container className="chart-container full-height">
                    <ReactFC
                      {...{
                        type: "doughnut2d",
                        width: "100%",
                        height: "100%",
                        dataFormat: "json",
                        containerBackgroundOpacity: "0",
                        dataSource: {
                          chart: {
                            caption: "Abandoned Cart Rate",
                            theme: "ecommerce",
                            defaultCenterLabel: `${abandonedRate
                              }%`,
                            paletteColors: "#EDF8B1, #000000"
                          },
                          data: [
                            {
                              label: "active",
                              value: `${abandonedRate}`
                            },
                            {
                              label: "inactive",
                              alpha: 5,
                              value: `${100 - abandonedRate}`
                            }
                          ]
                        }
                      }}
                    />
                  </Container>
                </Container>
              </Container>
            </Container>
          </Container>
        </Container>

        {/* row 3 - orders trend */}
        <Container className="row" style={{ minHeight: "400px" }}>
          <Container className="col-md-6 mb-4">
            <Container className="card is-card-dark chart-card">
              <Container className="chart-container large full-height">
                <ReactFC
                  {...{
                    type: "bar2d",
                    width: "100%",
                    height: "100%",
                    dataFormat: "json",
                    containerBackgroundOpacity: "0",
                    dataEmptyMessage: "Loading Data...",
                    dataSource: {
                      chart: {
                        theme: "ecommerce",
                        caption: "Orders Trend",
                        subCaption: "By Stores"
                      },
                      data: ordersTrendStore
                    }
                  }}
                />
              </Container>
            </Container>
          </Container>

          {/* <Container className="col-md-6 mb-4">
            <Container className="card is-card-dark chart-card">
              <Container className="chart-container large full-height">
                <ReactFC
                  {...{
                    type: "usaregion",
                    width: "100%",
                    height: "100%",
                    dataFormat: "json",
                    containerBackgroundOpacity: "0",
                    dataEmptyMessage: "Loading Data...",
                    dataSource: {
                      chart: {
                        theme: "ecommerce",
                        caption: "Orders Trend",
                        subCaption: "By Region"
                      },
                      colorrange: {
                        code: "#F64F4B",
                        minvalue: "0",
                        gradient: "1",
                        color: [
                          {
                            minValue: "10",
                            maxvalue: "25",
                            code: "#EDF8B1"
                          },
                          {
                            minvalue: "25",
                            maxvalue: "50",
                            code: "#18D380"
                          }
                        ]
                      },
                      data: ordersTrendRegion
                    }
                  }}
                />
              </Container>
            </Container>
          </Container> */}
        </Container>
        {/* </Container> */}
        {/* content area end */}
      </Container>
    </Container>
  );
};
export default App;
