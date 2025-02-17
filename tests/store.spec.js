import { test, expect } from "playwright-test-coverage";

test("login franchisee, create store", async ({ page }) => {
  await page.route("*/**/api/auth", async (route) => {
    if (route.request().method() === "PUT") {
      const loginReq = { email: "f@jwt.com", password: "franchisee" };
      const loginRes = {
        user: {
          id: 3,
          name: "pizza franchise",
          email: "f@jwt.com",
          roles: [{ role: "diner" }, { franchiseId: 1, role: "franchisee" }],
        },
        token: "tttttt",
      };
      expect(route.request().method()).toBe("PUT");
      expect(route.request().postDataJSON()).toMatchObject(loginReq);
      await route.fulfill({ json: loginRes });
    } else if (route.request().method() === "DELETE") {
      expect(route.request().headers()["authorization"]).toMatch(
        /Bearer tttttt/
      );
      await route.fulfill({ json: { message: "logout successful" } });
    }
  });

  await page.route("*/**/api/franchise/*", async (route) => {
    const userFranchiseRes = [
      {
        id: 2,
        name: "pizzaPocket",
        admins: [{ id: 4, name: "pizza franchisee", email: "f@jwt.com" }],
        stores: [{ id: 4, name: "SLC", totalRevenue: 0 }],
      },
    ];
    expect(route.request().method()).toBe("GET");
    await route.fulfill({ json: userFranchiseRes });
  });

  await page.route("*/**/api/franchise/d+/store", async (route) => {
    expect(route.request().method()).toBe("POST");
    const createReq = { franchiseId: 1, name: "SLC" };
    const createRes = { id: 1, name: "SLC", totalRevenue: 0 };

    expect(route.request().postDataJSON()).toMatchObject(createReq);
    await route.fulfill({ json: createRes });
  });

  await page.route("*/**/api/franchise/*/store/*", async (route) => {
    if (route.request().method() === "DELETE") {
      expect(route.request().headers()["authorization"]).toMatch(
        /Bearer tttttt/
      );

      await route.fulfill({ json: { message: "store deleted" } });
    }
  });

  await page.goto("/");

  await page.getByRole("link", { name: "Login" }).click();
  await expect(page.getByRole('textbox', { name: 'Email address' })).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Password' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();

  await page.getByRole("textbox", { name: "Email address" }).click();
  await page.getByRole("textbox", { name: "Email address" }).fill("f@jwt.com");
  await page.getByRole("textbox", { name: "Password" }).click();
  await page.getByRole("textbox", { name: "Password" }).fill("franchisee");
  await page.getByRole("button", { name: "Login" }).click();
  await expect(page.getByRole('link', { name: 'pf' })).toBeVisible();
  await expect(page.getByLabel('Global')).toContainText('pf');
  await expect(page.getByRole('heading')).toContainText('The web\'s best pizza');

  await page
    .getByLabel("Global")
    .getByRole("link", { name: "Franchise" })
    .click();
  await expect(page.getByRole('main')).toContainText('Everything you need to run an JWT Pizza franchise. Your gateway to success.');
  await page.getByRole("button", { name: "Create store" }).click();
  await page.getByRole("textbox", { name: "store name" }).fill("PHX");
  await page.getByRole("button", { name: "Create" }).click();

  await page.getByRole("link", { name: "Logout" }).click();
  await expect(page.getByRole('heading')).toContainText('The web\'s best pizza');

});
