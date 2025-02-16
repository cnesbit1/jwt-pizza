import { test, expect } from "playwright-test-coverage";

test("register user", async ({ page }) => {
  await page.route("*/**/api/auth", async (route) => {
    if (route.request().method() === "DELETE") {
      expect(route.request().headers()["authorization"]).toMatch(
        /Bearer tttttt/
      );
      await route.fulfill({ json: { message: "logout successful" } });
    } else {
      const registerReq = {
        name: "pizza diner",
        email: "d@jwt.com",
        password: "diner",
      };
      const registerRes = {
        user: {
          id: 2,
          name: "pizza diner",
          email: "d@jwt.com",
          roles: [{ role: "diner" }],
        },
        token: "tttttt",
      };
      expect(route.request().method()).toBe("POST");
      expect(route.request().postDataJSON()).toMatchObject(registerReq);
      await route.fulfill({ json: registerRes });
    }
  });

  await page.goto("/");

  await page.getByRole("link", { name: "Register" }).click();
  await expect(page.getByText("Welcome to the party")).toBeVisible();

  await page.getByRole("textbox", { name: "Full name" }).dblclick();
  await page.getByRole("textbox", { name: "Full name" }).fill("pizza diner");

  await page.getByRole("textbox", { name: "Email" }).dblclick();
  await page.getByRole("textbox", { name: "Email address" }).fill("d@jwt.com");

  await page.getByRole("textbox", { name: "Password" }).dblclick();
  await page.getByRole("textbox", { name: "Password" }).fill("diner");

  await expect(page.getByRole("textbox", { name: "Full name" })).toHaveValue(
    "pizza diner"
  );
  await expect(
    page.getByRole("textbox", { name: "Email address" })
  ).toHaveValue("d@jwt.com");
  await expect(page.getByRole("textbox", { name: "Password" })).toHaveValue(
    "diner"
  );
  await page.getByRole("button", { name: "Register" }).click();

  await page.getByRole("link", { name: "Logout" }).click();
});
