import { CasinoPage } from "@pages/CasinoPage";
import { SearchOverlay } from "@pages/SearchOverlay";

describe("Casino Search & Game Launch", () => {
  const casino = new CasinoPage();
  const search = new SearchOverlay();

  beforeEach(() => {
    cy.fixture("testData").as("data");
  });

  it("CAS-001 Open casino lobby", { tags: ["smoke", "regression"] }, () => {
    casino.visit();
    cy.contains("Lobby").should("be.visible");
  });

  it("CAS-002 Open search overlay", () => {
    casino.visit().openSearch();
    search.assertOpen();
  });

  it(
    "CAS-003 No results scenario shows empty state",
    { tags: ["regression"] },
    function () {
      const data = this.data as any;
      casino.visit().openSearch();
      search
        .assertOpen()
        .typeQuery(data.casino.negativeQuery)
        .assertNoResults();
    },
  );

  it(
    "[regression] CAS-004 Generic search returns results",
    { tags: ["regression"] },
    function () {
      const data = this.data as any;
      casino.visit().openSearch();
      search
        .assertOpen()
        .typeQuery(data.casino.genericQuery)
        .assertHasAnyResult();
    },
  );

  it(
    "CAS-005/006 Search Sweet Bonanza and open from results",
    { tags: ["smoke", "regression"] },
    function () {
      const data = this.data as any;

      casino.visit().openSearch();
      search.assertOpen().typeQuery(data.casino.gameName);

      cy.get("body").then(($body) => {
        if ($body.find("button:contains('Play now')").length) {
          search.openFirstResultPlayNow();
        } else if ($body.find("button:contains('Demo')").length) {
          search.openFirstResultDemo();
        } else {
          cy.contains(data.casino.gameName).click({ force: true });
        }
      });

      // Best-effort running checks
      cy.get("iframe, canvas").should("exist");
    },
  );
});
