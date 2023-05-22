import http from "k6/http";
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";

export let options = {
  stages: [
    //endurance test
    { duration: "1m", target: 100 }, // simulate ramp-up of traffic from 1 to 100 users over 5 minutes.
    { duration: "3m", target: 100 }, // stay at 100 users for 10 minutes
    { duration: "1m", target: 0 }, // ramp-down to 0 users
  ],
};

export default function () {
  http.get("https://ikn.go.id/");
}

export function handleSummary(data) {
  return {
    "result.html": htmlReport(data),
    stdout: textSummary(data, { indent: " ", enableColors: true }),
  };
}
