import { sleep, check, group, fail } from "k6";
import http from "k6/http";
import jsonpath from "https://jslib.k6.io/jsonpath/1.0.2/index.js";

export const options = {
  cloud: {
    distribution: {
      "amazon:us:ashburn": { loadZone: "amazon:us:ashburn", percent: 100 },
    },
    apm: [],
  },
  thresholds: {
    http_req_failed: ["rate<0.1"],
    http_req_duration: ["p(95)<300"],
    "http_req_duration{scenario:Scenario_1}": ["p(99)<400"],
    "http_req_duration{url:https://pizza-service.cjnhost.click/api/auth}": [
      "avg<300",
    ],
  },
  scenarios: {
    Scenario_1: {
      executor: "ramping-vus",
      gracefulStop: "30s",
      stages: [
        { target: 15, duration: "40s" },
        { target: 15, duration: "30s" },
        { target: 0, duration: "40s" },
      ],
      gracefulRampDown: "30s",
      exec: "scenario_1",
    },
  },
};

export function scenario_1() {
  let response;

  const vars = {};

  group(
    "Login, Order Pizza, Logout - https://pizza.cjnhost.click/",
    function () {
      // Login
      response = http.put(
        "https://pizza-service.cjnhost.click/api/auth",
        '{"email":"d@jwt.com","password":"diner"}',
        {
          headers: {
            accept: "*/*",
            "accept-encoding": "gzip, deflate, br, zstd",
            "accept-language": "en-US,en;q=0.9",
            "cache-control": "no-cache",
            "content-type": "application/json",
            origin: "https://pizza.cjnhost.click",
            priority: "u=1, i",
            "sec-ch-ua":
              '"Chromium";v="134", "Not:A-Brand";v="24", "Google Chrome";v="134"',
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": '"Windows"',
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-site",
          },
        }
      );
      if (
        !check(response, {
          "status equals 200": (response) =>
            response.status.toString() === "200",
        })
      ) {
        console.log(response.body);
        fail("Login was *not* 200");
      }
      // check(response, { 'status equals 200': response => response.status.toString() === '200' })

      vars["token"] = jsonpath.query(response.json(), "$.token")[0];

      sleep(4.4);

      // Get Menu
      response = http.get(
        "https://pizza-service.cjnhost.click/api/order/menu",
        {
          headers: {
            accept: "*/*",
            "accept-encoding": "gzip, deflate, br, zstd",
            "accept-language": "en-US,en;q=0.9",
            authorization: `Bearer ${vars["token"]}`,
            "cache-control": "no-cache",
            "content-type": "application/json",
            origin: "https://pizza.cjnhost.click",
            priority: "u=1, i",
            "sec-ch-ua":
              '"Chromium";v="134", "Not:A-Brand";v="24", "Google Chrome";v="134"',
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": '"Windows"',
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-site",
          },
        }
      );
      if (
        !check(response, {
          "status equals 200": (response) =>
            response.status.toString() === "200",
        })
      ) {
        console.log(response.body);
        fail("Get Menu was *not* 200");
      }

      // Get Franchise
      response = http.get("https://pizza-service.cjnhost.click/api/franchise", {
        headers: {
          accept: "*/*",
          "accept-encoding": "gzip, deflate, br, zstd",
          "accept-language": "en-US,en;q=0.9",
          authorization: `Bearer ${vars["token"]}`,
          "cache-control": "no-cache",
          "content-type": "application/json",
          origin: "https://pizza.cjnhost.click",
          priority: "u=1, i",
          "sec-ch-ua":
            '"Chromium";v="134", "Not:A-Brand";v="24", "Google Chrome";v="134"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"Windows"',
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-site",
        },
      });
      if (
        !check(response, {
          "status equals 200": (response) =>
            response.status.toString() === "200",
        })
      ) {
        console.log(response.body);
        fail("Get Franchise was *not* 200");
      }
      sleep(6.4);

      // Post Order
      response = http.post(
        "https://pizza-service.cjnhost.click/api/order",
        '{"items":[{"menuId":1,"description":"Veggie","price":0.0038}],"storeId":"1","franchiseId":1}',
        {
          headers: {
            accept: "*/*",
            "accept-encoding": "gzip, deflate, br, zstd",
            "accept-language": "en-US,en;q=0.9",
            authorization: `Bearer ${vars["token"]}`,
            "cache-control": "no-cache",
            "content-type": "application/json",
            origin: "https://pizza.cjnhost.click",
            priority: "u=1, i",
            "sec-ch-ua":
              '"Chromium";v="134", "Not:A-Brand";v="24", "Google Chrome";v="134"',
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": '"Windows"',
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-site",
          },
        }
      );
      if (
        !check(response, {
          "status equals 200": (response) =>
            response.status.toString() === "200",
        })
      ) {
        console.log(response.body);
        fail("Post Order was *not* 200");
      }

      vars["jwt1"] = jsonpath.query(response.json(), "$.jwt")[0];

      sleep(1.8);

      // Post Verify
      response = http.post(
        "https://pizza-factory.cs329.click/api/order/verify",
        `{"jwt":"${vars["jwt1"]}"}`,
        {
          headers: {
            accept: "*/*",
            "accept-encoding": "gzip, deflate, br, zstd",
            "accept-language": "en-US,en;q=0.9",
            authorization: `Bearer ${vars["token"]}`,
            "cache-control": "no-cache",
            "content-type": "application/json",
            origin: "https://pizza.cjnhost.click",
            priority: "u=1, i",
            "sec-ch-ua":
              '"Chromium";v="134", "Not:A-Brand";v="24", "Google Chrome";v="134"',
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": '"Windows"',
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "cross-site",
            "sec-fetch-storage-access": "active",
          },
        }
      );
      if (
        !check(response, {
          "status equals 200": (response) =>
            response.status.toString() === "200",
        })
      ) {
        console.log(response.body);
        fail("Post Verify was *not* 200");
      }
      sleep(6.8);

      // Logout
      response = http.del(
        "https://pizza-service.cjnhost.click/api/auth",
        null,
        {
          headers: {
            accept: "*/*",
            "accept-encoding": "gzip, deflate, br, zstd",
            "accept-language": "en-US,en;q=0.9",
            authorization: `Bearer ${vars["token"]}`,
            "cache-control": "no-cache",
            "content-type": "application/json",
            origin: "https://pizza.cjnhost.click",
            priority: "u=1, i",
            "sec-ch-ua":
              '"Chromium";v="134", "Not:A-Brand";v="24", "Google Chrome";v="134"',
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": '"Windows"',
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-site",
          },
        }
      );
      if (
        !check(response, {
          "status equals 200": (response) =>
            response.status.toString() === "200",
        })
      ) {
        console.log(response.body);
        fail("Logout was *not* 200");
      }
    }
  );
}
