//Aquí importan todo lo de stripe, en este caso, no es necesario

function calcDiscountPrice(price, discount) {
  if (!discount) {
    return price;
  }

  const discountAmount = (price * discount) / 100;
  const result = price - discountAmount;

  return result.toFixed(2);
}

/**
 * order controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::order.order",
  ({ strapi }) => ({
    async paymentOrder(ctx) {
      console.log("Ok"); //cuando se llama al endpoint sale ese log en el server
      const { token, products, userId, addressShipping } = ctx.request.body; //no se sabe si token va v: por que es de stripe

      let totalPayment = 0;
      products.forEach((product) => {
        const priceTemp = calcDiscountPrice(product.price, product.discount);
        totalPayment += Number(priceTemp) * product.quantity;
      });

      //aca se comunica con stripe o lo que corresponda

      /*//lo que se guarda en la base de datos
        const data = {
            products,
            user: userId,
            totalPayment,
            //idPayment: charge.id, lo creamos nosotros porque no hay stripe
            addressShipping
        };

        const model = strapi.contentTypes['api::order.order'];
        const validData = await strapi.entityValidator.validateEntityCreation(
            model, 
            data
        );

        const entry = await strapi.db.query("api::order.order").create({data: validData,})

        return entry;*/

      const orderData = {
        products,
        user: userId,
        totalPayment,
        //idPayment: charge.id, lo creamos nosotros porque no hay stripe
        addressShipping,
      };

      const entry = await strapi.db.query("api::order.order").create({
        data: orderData,
      });

      return entry;
    },
  }),
);
