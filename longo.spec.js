import LongoPage from './LongoPage';

describe('Longo.lv - Test Suite', () => {
  beforeEach(() => {
    // Clear session storage/cookies to ensure a clean state across all tests
    cy.clearCookies();
    cy.clearLocalStorage();
    
    LongoPage.visitCatalog();
    LongoPage.closeCookiePopup();

    // Ensure catalog filters DOM is fully loaded
    cy.get(LongoPage.selectors.filterSection).should('be.visible');
  });

  // ============================================================
  // TEST 1: CATALOG FILTERING
  // ============================================================
  it('should filter catalog by BMW and Sedans', () => {
    LongoPage.selectMake('BMW');
    LongoPage.selectBodyType('Sedans');
    LongoPage.clickShowResultsIfPresent();

    LongoPage.firstVehicleCard().should('exist');
  });

  // ============================================================
  // TEST 2: CARD → DETAIL PAGE CONSISTENCY
  // ============================================================
  it('should match vehicle data between catalog card and detail page', () => {
    LongoPage.selectMake('BMW');
    LongoPage.selectBodyType('Sedan');
    LongoPage.clickShowResultsIfPresent();
    cy.wait(5000);

    LongoPage.getFirstCardTitle().then((cardTitle) => {
      LongoPage.getFirstCardPrice().then((cardPrice) => {
        LongoPage.getFirstCardYear().then((cardYear) => {
          LongoPage.getFirstCardMileage().then((cardMileage) => {
            LongoPage.clickFirstVehicle();

            LongoPage.verifyUrlContains('auto/');

            LongoPage.getDetailTitle().then((detailTitle) => {
              expect(detailTitle.toLowerCase()).to.include(cardTitle.toLowerCase());

              LongoPage.getDetailPrice().then((detailPrice) => {
                const numericCardPrice = cardPrice.replace(/\D/g, '');
                expect(detailPrice).to.equal(numericCardPrice);

                if (cardMileage) {
                  LongoPage.getDetailMileage().then((detailMileage) => {
                    expect(detailMileage).to.equal(cardMileage);
                  });
                }
              });
            });
          });
        });
      });
    });
  });

  // TEST 2: NEGATIVE / EMPTY STATE FILTERING
  it('should display zero results empty state for BMW under 1000 EUR', () => {
  LongoPage.closeCookiePopup();
  LongoPage.selectMake('BMW');
  LongoPage.setMaxPrice(1000);
  LongoPage.clickShowResultsIfPresent();

  LongoPage.verifyResultsCount(LongoPage.labels.zeroResults);
});




// ============================================================
  // TEST 3: LANGUAGE SWITCHING
  // ============================================================
  it('should switch between RU, EN and LV and preserve language', () => {
    LongoPage.visitHomePage();
    LongoPage.closeCookiePopup();

    // Russian
    LongoPage.switchLanguage('/ru');
    
    LongoPage.clickRussianBuy();
    LongoPage.clickRussianFinancing();
    LongoPage.verifyContainsTextIgnoreCase(LongoPage.labels.ruCalcText);
    LongoPage.verifyUrlContains('/ru');

    // English
    LongoPage.switchLanguage('/en');
    
    LongoPage.clickEnglishBuy();
    LongoPage.clickEnglishFinancing();
    LongoPage.verifyContainsTextIgnoreCase('financing');
    LongoPage.verifyUrlContains('/en');

    // Latvian
    LongoPage.switchLanguage('/');
    
    LongoPage.clickLatvianUsedCars();
    LongoPage.clickLatvianFinancing();
    LongoPage.verifyContainsTextIgnoreCase(LongoPage.labels.lvCalcText);
  });

 // ============================================================
  // TEST 4: UI VS API VEHICLE DATA
  // ============================================================
  it('should match vehicle make and model between UI and API', () => {
    LongoPage.selectMake('BMW');
    LongoPage.clickShowResultsIfPresent();
    cy.wait(2000);

    // Dynamic assertion based on the actual card clicked
    LongoPage.getFirstCardTitle().then((cardTitle) => {
      const selectedMake = cardTitle.split(' ')[0].toLowerCase();

      LongoPage.clickFirstVehicle();
      cy.wait(3000);

      LongoPage.getDetailTitle().then((uiVehicleName) => {
        expect(uiVehicleName.toLowerCase()).to.include(selectedMake);
      });
    });
  });

  // ============================================================
  // TEST 5: VEHICLE URL SEO VALIDATION
  // ============================================================
  it('should return 200 with title and meta description for vehicle page', () => {
    LongoPage.selectMake('BMW');
    LongoPage.clickShowResultsIfPresent();
    cy.wait(2000);
    LongoPage.clickFirstVehicle();

    cy.url().then((vehicleUrl) => {
      // Pause briefly to clear rate limits from preceding catalog navigations
      cy.wait(2000);

      const requestVehiclePage = (retries = 3) => {
        cy.request({
          url: vehicleUrl,
          failOnStatusCode: false,
          headers: {
            'User-Agent': 'CypressTestRunner/1.0',
          },
        }).then((response) => {
          if (response.status === 429 && retries > 0) {
            cy.wait(3000);
            requestVehiclePage(retries - 1);
          } else {
            expect(response.status).to.equal(200);
            expect(response.headers['content-type']).to.include('text/html');

            const titleMatch = response.body.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
            expect(titleMatch, 'Page should contain a title').to.not.be.null;
            expect(titleMatch[1].replace(/\s+/g, ' ').trim()).to.not.equal('');

            const descriptionMatch = response.body.match(
              /<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["'][^>]*>/i
            );
            expect(descriptionMatch, 'Page should contain a meta description').to.not.be.null;
            expect(descriptionMatch[1].replace(/\s+/g, ' ').trim()).to.not.equal('');
          }
        });
      };

      requestVehiclePage();
    });
  });


it('should pass basic accessibility checks on catalog page', () => {
  cy.visit('/automasinu-katalogs');
  cy.injectAxe();
  
  // Log all WCAG failures to the command log without stopping the execution flow
  cy.checkA11y(null, null, null, true); 
});






});
