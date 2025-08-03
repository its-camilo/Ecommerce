"use strict";
/**
 * wishlist controller
 */
Object.defineProperty(exports, "__esModule", { value: true });
const strapi_1 = require("@strapi/strapi");
exports.default = strapi_1.factories.createCoreController("api::wishlist.wishlist", ({ strapi }) => ({
    async create(ctx) {
        try {
            const { user, product } = ctx.request.body.data;
            // Convertir user a número
            const userId = parseInt(user);
            // Para el producto, necesitamos encontrar el ID numérico usando el documentId
            let productNumericId;
            if (typeof product === "string" || typeof product === "number") {
                // Buscar el producto por documentId para obtener su ID numérico
                try {
                    // Usar document service para buscar por documentId
                    const productDocument = await strapi
                        .documents("api::product.product")
                        .findOne({
                        documentId: product.toString(),
                    });
                    if (!productDocument) {
                        ctx.throw(404, "Product not found");
                    }
                    productNumericId = productDocument.id;
                }
                catch (error) {
                    ctx.throw(404, "Product not found");
                }
            }
            else {
                ctx.throw(400, "Invalid product format");
            }
            const result = await strapi.entityService.create("api::wishlist.wishlist", {
                data: {
                    user: userId,
                    product: productNumericId,
                },
                populate: ["user", "product"],
            });
            return { data: result };
        }
        catch (error) {
            throw error;
        }
    },
}));
