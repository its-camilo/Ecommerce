"use strict";
//Aquí importan todo lo de stripe, en este caso, no es necesario
Object.defineProperty(exports, "__esModule", { value: true });
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
const strapi_1 = require("@strapi/strapi");
exports.default = strapi_1.factories.createCoreController('api::order.order', ({ strapi }) => ({
    async paymentOrder(ctx) {
        const { products, user: userId, totalPayment, idPayment, addressShipping } = ctx.request.body;
        // Calcular el total de pago si no viene del frontend (por seguridad)
        let calculatedTotalPayment = 0;
        products.forEach(product => {
            const priceTemp = calcDiscountPrice(product.price, product.discount);
            calculatedTotalPayment += Number(priceTemp) * product.quantity;
        });
        // Usar el total calculado en el servidor por seguridad
        const finalTotalPayment = calculatedTotalPayment;
        const orderData = {
            products,
            user: userId,
            totalPayment: finalTotalPayment,
            idPayment: idPayment || `payment_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            addressShipping,
        };
        const entry = await strapi.db.query('api::order.order').create({
            data: orderData,
        });
        return entry;
    },
}));
