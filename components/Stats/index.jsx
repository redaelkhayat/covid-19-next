import NumberFormat from "react-number-format";
import ReactCountryFlag from "react-country-flag";
import Select from "react-select";
import { useRouter } from "next/router";
import { Flex, Item } from "react-flex-ready";
import { Doughnut } from "react-chartjs-2";
import Container from "../common/Container";
import { Wrapper, Card, Countries } from "./styles";

export default ({
  stats: { confirmed, recovered, deaths },
  country,
  countries
}) => {
  const router = useRouter();
  const activeCases = confirmed?.value - deaths?.value - recovered?.value;
  return (
    <Wrapper as={Container}>
      {country && (
        <ReactCountryFlag
          countryCode={country}
          svg
          style={{
            width: "6em",
            height: "6em",
            margin: "0 auto"
          }}
          title={country}
        />
      )}
      <Flex css="margin-bottom: 4rem;" align="flex-start">
        <Item col={3} colTablet={12} colMobile={12} gap={1} marginBottom={30}>
          <Card color="#5E35B1">
            <h1>Confirmed</h1>
            <p>
              <NumberFormat
                value={confirmed?.value}
                displayType={"text"}
                thousandSeparator={true}
              />
            </p>
          </Card>
        </Item>
        <Item col={3} colTablet={12} colMobile={12} gap={1} marginBottom={30}>
          <Card color="#ffb700">
            <h1>Active Cases</h1>
            <p>
              <NumberFormat
                value={activeCases}
                displayType={"text"}
                thousandSeparator={true}
              />
            </p>
          </Card>
        </Item>
        <Item col={3} colTablet={12} colMobile={12} gap={1} marginBottom={30}>
          <Card color="#f44336">
            <h1>Deaths</h1>
            <p>
              <NumberFormat
                value={deaths?.value}
                displayType={"text"}
                thousandSeparator={true}
              />
            </p>
          </Card>
        </Item>
        <Item col={3} colTablet={12} colMobile={12} gap={1}>
          <Card color="#4CAF50">
            <h1>Recovered</h1>
            <p>
              <NumberFormat
                value={recovered?.value}
                displayType={"text"}
                thousandSeparator={true}
              />
            </p>
          </Card>
        </Item>
      </Flex>
      <Countries>
        <Select
          options={countries.map(item => ({
            label: item[0],
            value: item[1]
          }))}
          onChange={e => router.push(`/${e.value}`)}
          defaultValue={{
            label: country
              ? countries.find(item => item[1] === country)[0]
              : "Select a country",
            value: country
              ? countries.find(item => item[1] === country)[1]
              : "Select a country"
          }}
        />
      </Countries>
      <Doughnut
        data={{
          datasets: [
            {
              data: [deaths?.value, recovered?.value, activeCases],
              backgroundColor: ["#f44336", "#4CAF50", "#ffb700"],
              hoverBackgroundColor: ["#ff5252", "#00E676", "#ffb700"]
            }
          ],
          labels: ["Deaths", "Recovered", "Active"]
        }}
        width={100}
        height={40}
        options={{
          legend: {
            display: true,
            position: "bottom"
          }
        }}
      />
    </Wrapper>
  );
};
