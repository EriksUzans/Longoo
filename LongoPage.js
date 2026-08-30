class LongoPage {
  selectors = {
    cookieBanner: '#CookieBannerNotice',
    cookieOverlay: '#CookieBannerOverlay',
    filterSection: '.filter-section',
    filterSectionTitle: '.filter-section__title',
    filterShowBtn: 'button',
    vehicleCard: '.catalog-page__content .vehicle-card-item-wrapper',
    cardTitle: '.vehicle-card-item__title',
    cardPrice: '.vehicle-card-item__price-value--full',
    detailTitle: 'h3.desktop-vehicle-header__title',
    detailPrice: 'span.desktop-vehicle-header-price__price-row',
    detailMileage: '.desktop-vehicle-header__chip',
    localeSwitcher: 'a.locale-switcher__link',
  };

  labels = {
    cookieAccept: 'Atļaut visu',
    makeSection: 'Marka',
    bodyTypeSection: 'Virsbūves tips',
    showResultsBtn: 'Rādīt',
    kmUnit: 'km',
    ruBuy: 'Купить автомобиль',
    ruFinancing: 'Лизинг и кредит',
    ruCalcText: 'расчёт',
    enBuy: 'Buy',
    enFinancing: 'Financing',
    enCalcText: 'calculation',
    lvUsedCars: 'Lietoti auto',
    lvFinancing: 'Finansējums',
    lvCalcText: 'Aprēķin',
  };

  api = {
    vehicle: '**/api/longo/longo-lv/catalog/vehicle/*',
  };

  visitCatalog() {
    cy.visit('/automasinu-katalogs');
  }

  visitHomePage() {
    cy.visit('/');
  }

  closeCookiePopup() {
    cy.setCookie('cookie_consent', 'true');

    cy.get('body').then(($body) => {
      if ($body.find(this.selectors.cookieBanner).length > 0) {
        cy.get(this.selectors.cookieBanner)
          .contains('button', this.labels.cookieAccept)
          .click({ force: true });
      }

      cy.window().then((win) => {
        const banner = win.document.querySelector(this.selectors.cookieBanner);
        if (banner) banner.remove();

        const overlay = win.document.querySelector(this.selectors.cookieOverlay);
        if (overlay) overlay.remove();
      });
    });
  }

  selectMake(make) {
    cy.contains(this.selectors.filterSection, this.labels.makeSection)
      .within(() => {
        cy.contains(make).click({ force: true });
      });
  }

  selectBodyType(bodyType) {
    // 1. Click the Body Type filter accordion/header to reveal options
    cy.contains(this.selectors.filterSectionTitle, this.labels.bodyTypeSection)
      .scrollIntoView()
      .click({ force: true });

    // 2. Target the specific label/option containing the body type text directly
    cy.contains(new RegExp(bodyType, 'i'))
      .scrollIntoView()
      .click({ force: true });
  }


  clickShowResultsIfPresent() {
    cy.get('body').then(($body) => {
      if ($body.find(`${this.selectors.filterShowBtn}:contains("${this.labels.showResultsBtn}")`).length > 0) {
        cy.contains(this.selectors.filterShowBtn, this.labels.showResultsBtn)
          .click({ force: true });
      }
    });
  }

  firstVehicleCard() {
    return cy.get(this.selectors.vehicleCard)
      .first()
      .should('exist');
  }

  clickFirstVehicle() {
    // Extract the vehicle URL directly and visit it to guarantee SPA page transition
    cy.get(this.selectors.vehicleCard)
      .first()
      .find('a')
      .first()
      .should('have.attr', 'href')
      .then((href) => {
        cy.visit(href);
      });
  }

  getFirstCardTitle() {
    return cy.get(this.selectors.vehicleCard)
      .first()
      .find(this.selectors.cardTitle)
      .invoke('text')
      .then((text) => text.replace(/\s+/g, ' ').trim());
  }

  getFirstCardPrice() {
    return cy.get(this.selectors.vehicleCard)
      .first()
      .find(this.selectors.cardPrice)
      .invoke('text')
      .then((text) => text.replace(/\s+/g, ' ').trim());
  }

  getFirstCardYear() {
    return cy.get(this.selectors.vehicleCard)
      .first()
      .invoke('text')
      .then((text) => {
        const yearMatch = text.match(/\b(19|20)\d{2}\b/);
        return yearMatch ? yearMatch[0] : '';
      });
  }

  getFirstCardMileage() {
    return cy.get(this.selectors.vehicleCard)
      .first()
      .invoke('text')
      .then((text) => {
        const mileageMatch = text.match(/(?:^|\D)(\d{1,3}(?:[\s\u00A0]\d{3})+)\s*km\b/i);
        return mileageMatch ? mileageMatch[1].replace(/\D/g, '') : '';
      });
  }

  getDetailTitle() {
    this.closeCookiePopup();

    return cy.get(this.selectors.detailTitle)
      .first()
      .should('exist')
      .invoke('text')
      .then((text) => text.replace(/\s+/g, ' ').trim());
  }

  getDetailPrice() {
    return cy.get(this.selectors.detailPrice)
      .first()
      .should('exist')
      .invoke('text')
      .then((text) => text.replace(/\D/g, ''));
  }

  getDetailMileage() {
    return cy.get(this.selectors.detailMileage)
      .contains(this.labels.kmUnit)
      .first()
      .should('exist')
      .invoke('text')
      .then((text) => text.replace(/\D/g, ''));
  }

  switchLanguage(langCode) {
    // Matches hrefs containing /ru, /en, or default /
    const selector = langCode === '/' 
      ? `${this.selectors.localeSwitcher}:not([href*="/ru"]):not([href*="/en"])`
      : `${this.selectors.localeSwitcher}[href*="${langCode}"]`;

    cy.get(selector)
      .first()
      .should('exist')
      .click({ force: true });
  }

  clickRussianBuy() {
    cy.contains(this.labels.ruBuy).click({ force: true });
  }

  clickRussianFinancing() {
    cy.contains(this.labels.ruFinancing).click({ force: true });
  }

  clickEnglishBuy() {
    cy.contains(this.labels.enBuy).click({ force: true });
  }

  clickEnglishFinancing() {
    cy.contains(this.labels.enFinancing).click({ force: true });
  }

  clickLatvianUsedCars() {
    cy.contains(this.labels.lvUsedCars).click({ force: true });
  }

  clickLatvianFinancing() {
    cy.contains(this.labels.lvFinancing).click({ force: true });
  }

  interceptVehicleApi() {
    cy.intercept('GET', this.api.vehicle).as('vehicleApi');
  }

  waitForVehicleApi() {
    return cy.wait('@vehicleApi');
  }

  verifyUrlContains(urlPart) {
    cy.url().should('include', urlPart);
  }

  verifyContainsTextIgnoreCase(text) {
    cy.contains(new RegExp(text, 'i')).should('exist');
  }
}

export default new LongoPage();