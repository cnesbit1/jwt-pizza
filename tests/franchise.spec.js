import { test, expect } from "playwright-test-coverage";

test("login admin, create franchise", async ({ page }) => {
  await page.route("*/**/api/auth", async (route) => {
    const loginReq = { email: "a@jwt.com", password: "admin" };
    const loginRes = {
      user: {
        id: 1,
        name: "常用名字",
        email: "a@jwt.com",
        roles: [{ role: "admin" }],
      },
      token: "tttttt",
    };
    expect(route.request().method()).toBe("PUT");
    expect(route.request().postDataJSON()).toMatchObject(loginReq);
    await route.fulfill({ json: loginRes });
  });

  await page.route("*/**/api/order", async (route) => {
    const orderRes = {
      dinerId: 4,
      orders: [
        {
          id: 1,
          franchiseId: 1,
          storeId: 1,
          date: "2024-06-05T05:14:40.000Z",
          items: [{ id: 1, menuId: 1, description: "Veggie", price: 0.05 }],
        },
      ],
      page: 1,
    };
    expect(route.request().method()).toBe("GET");
    await route.fulfill({ json: orderRes });
  });

  await page.route("*/**/api/franchise", async (route) => {
    if (route.request().method() === "GET") {
      const franRes = [
        {
          id: 1,
          name: "testFranchise",
          admins: [{ id: 3, name: "常用名字", email: "a@jwt.com" }],
          stores: [
            { id: 1, name: "SLC", totalRevenue: 0.016 },
            { id: 2, name: "pizzatropolis", totalRevenue: 500 },
          ],
        },
      ];
      await route.fulfill({ json: franRes });
    } else if (route.request().method() === "POST") {
      const postReq = {
        stores: [],
        id: "",
        name: "testFranchise",
        admins: [{ email: "a@jwt.com" }],
      };
      expect(route.request().postDataJSON()).toMatchObject(postReq);
      const postRes = {
        stores: [],
        id: 9,
        name: "testFranchise",
        admins: [{ email: "a@jwt.com", id: 1, name: "常用名字" }],
      };
      await route.fulfill({ json: postRes });
    }
  });

  await page.route("*/**/api/franchise/*", async (route) => {
    expect(route.request().method()).toBe("DELETE");
    expect(route.request().headers()["authorization"]).toMatch(/Bearer tttttt/);
    await route.fulfill({ json: { message: "franchise deleted" } });
  });

  await page.goto("/");

  await page.getByRole("link", { name: "Login" }).click();
  await page.getByRole("textbox", { name: "Email address" }).click();
  await page.getByRole("textbox", { name: "Email address" }).fill("a@jwt.com");
  await page.getByRole("textbox", { name: "Password" }).click();
  await page.getByRole("textbox", { name: "Password" }).fill("admin");
  await page.getByRole("button", { name: "Login" }).click();

  await page.getByRole("link", { name: "常" }).click();
  await expect(page.getByRole("heading")).toContainText("Your pizza kitchen");
  await expect(page.getByRole("main")).toContainText("a@jwt.com");
  await expect(page.getByRole("main")).toContainText("admin");

  await page.getByRole("link", { name: "Admin" }).click();
  await expect(page.getByRole("main")).toContainText(
    "Keep the dough rolling and the franchises signing up."
  );
  await expect(page.getByRole("main")).toContainText("Add Franchise");
  await page.getByRole("button", { name: "Add Franchise" }).click();
  await page.getByRole("textbox", { name: "franchise name" }).click();
  await page
    .getByRole("textbox", { name: "franchise name" })
    .fill("testFranchise");

  await page.getByRole("textbox", { name: "franchisee admin email" }).click();
  await page
    .getByRole("textbox", { name: "franchisee admin email" })
    .fill("a@jwt.com");
  await expect(page.locator("form")).toContainText("Want to create franchise?");
  await page.getByRole("button", { name: "Create" }).click();

  await page
    .getByRole("row", { name: "testFranchise 常用名字 Close" })
    .getByRole("button")
    .click();
  await expect(page.getByRole("heading")).toContainText("Sorry to see you go");
  await expect(page.getByRole("main")).toContainText(
    "Sorry to see you goAre you sure you want to close the testFranchise franchise? This will close all associated stores and cannot be restored. All outstanding revenue will not be refunded.CloseCancel"
  );
  await page.getByRole("button", { name: "Close" }).click();
  await expect(page.getByRole("main")).toContainText(
    "Keep the dough rolling and the franchises signing up."
  );
});
