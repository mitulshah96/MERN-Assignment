import "./home.scss";
import React, { useReducer, useEffect } from "react";
import { Layout, Select, Input } from "antd";
import { reducer, initialState } from "./reducer";
import environments from "../../environments";
import {
  GET_CITIES_REQUEST,
  GET_CITIES,
  GET_CITIES_FAILURE,
  GET_WEATHER_REQUEST,
  GET_WEATHER,
  GET_WEATHER_FAILURE,
  SET_CITIES
} from "../../store";

const { Search } = Input;
const { Option } = Select;

function onBlur() {
  console.log("blur");
}

function onFocus() {
  console.log("focus");
}

function onSearch(val) {
  console.log("search:", val);
}
const { Content } = Layout;

function Home(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  console.log(state);
  async function onChange(value) {
    const payload = await (
      await fetch(`${environments.BASE_URL}/cities/${value}`)
    ).json();

    if (payload && payload.data && payload.data.length > 0) {
      dispatch({ type: SET_CITIES, payload: payload.data });
    }
  }

  async function onZipSearch(value) {
    const payload = await (
      await fetch(`${environments.BASE_URL}/weather?array=${value}`)
    ).json();
    console.log(payload);
    if (payload && payload.data) {
      dispatch({
        type: GET_WEATHER,
        payload: payload.data
      });
    }
  }

  async function getCities() {
    dispatch({
      type: GET_CITIES_REQUEST
    });

    const payload = await (
      await fetch(`${environments.BASE_URL}/cities`)
    ).json();

    if (payload && payload.data && payload.data.length > 0) {
      dispatch({ type: GET_CITIES, payload: payload.data });
    } else {
      dispatch({
        type: GET_CITIES_FAILURE
      });
    }
  }

  useEffect(() => {
    getCities();
  }, []);
  return (
    <div>
      <Layout>
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            {state.cities.data.length > 0 ? (
              <div>
                <div>
                  <Select
                    showSearch
                    style={{ width: 200 }}
                    placeholder="Select a person"
                    optionFilterProp="children"
                    onChange={onChange}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onSearch={onSearch}
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {state.cities.data.map((item, i) => (
                      <Option key={i} value={item.id}>
                        {item.name}
                      </Option>
                    ))}
                  </Select>
                </div>
                <div className="ddlData">
                  {state.cities.selectedData.length > 0 && (
                    <div>
                      {state.cities.selectedData.map((item, i) => (
                        <div key={i}>
                          <p>
                            <strong>Name:</strong> {item.name}
                          </p>
                          <p>
                            <strong>Country:</strong> {item.country}
                          </p>
                          <p>
                            <strong>Occupation:</strong> {item.occupation}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div>No Data Found</div>
            )}

            <div>
              <Search
                placeholder="Enter Zip Code"
                style={{ width: 200 }}
                onSearch={onZipSearch}
                enterButton
              />
            </div>
            <div className="ddlData">
              {state.weather.data.length > 0 && (
                <div>
                  {state.weather.data.map((item, i) => (
                    <div key={i}>
                      <p>
                        <strong>Name:</strong> {item.name}
                      </p>
                      <p>
                        <strong>Wind Speed:</strong> {item.wind.speed}
                      </p>
                      <p>
                        <strong>Weather:</strong> {item.weather[0].main}
                      </p>
                      <p>
                        <strong>Country:</strong> {item.sys.country}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </Content>
      </Layout>
    </div>
  );
}
export default Home;
