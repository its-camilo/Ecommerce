"use strict";
/**
 * wishlist controller
 */
Object.defineProperty(exports, "__esModule", { value: true });
const strapi_1 = require("@strapi/strapi");
exports.default = strapi_1.factories.createCoreController("api::wishlist.wishlist", ({ strapi }) => ({
    async create(ctx) {
        try {
            console.log("Wishlist create - Original body:", JSON.stringify(ctx.request.body, null, 2));
            const { user, product } = ctx.request.body.data;
            console.log("Received data:", { user, product });
            console.log("User type:", typeof user, "Product type:", typeof product);
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
                        console.error("Product not found with documentId:", product);
                        ctx.throw(404, "Product not found");
                    }
                    productNumericId = productDocument.id;
                    console.log("Found product:", {
                        documentId: product,
                        numericId: productNumericId,
                    });
                }
                catch (error) {
                    console.error("Error finding product:", error);
                    ctx.throw(404, "Product not found");
                }
            }
            else {
                console.error("Invalid product format:", product);
                ctx.throw(400, "Invalid product format");
            }
            console.log("Final data for creation:", { userId, productNumericId });
            const result = await strapi.entityService.create("api::wishlist.wishlist", {
                data: {
                    user: userId,
                    product: productNumericId,
                },
                populate: ["user", "product"],
            });
            console.log("Created wishlist item:", result);
            return { data: result };
        }
        catch (error) {
            console.error("Wishlist create - Error:", error);
            throw error;
        }
    },
}));
