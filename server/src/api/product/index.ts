export default (app) => {
  app.post(
    `/tenant/:tenantId/product`,
    require('./productCreate').default,
  );
  app.put(
    `/tenant/:tenantId/product/:id`,
    require('./productUpdate').default,
  );
  app.post(
    `/tenant/:tenantId/product/import`,
    require('./productImport').default,
  );
  app.delete(
    `/tenant/:tenantId/product`,
    require('./productDestroy').default,
  );
  app.get(
    `/tenant/:tenantId/product/autocomplete`,
    require('./productAutocomplete').default,
  );

  app.get(
    `/tenant/:tenantId/product/autocomplete/combo`,
    require('./productAutocompletecombo').default,
  );
  
  app.get(
    `/tenant/:tenantId/product`,
    require('./productList').default,
  );
  app.get(
    `/tenant/:tenantId/product/:id`,
    require('./productFind').default,
  );
  app.get(
    `/tenant/:tenantId/grap`,
    require('./grapOrders').default,
  )


  app.delete(
    `/tenant/:tenantId/resetAccount`,
    require('./productResetAccount').default,
  );



};

