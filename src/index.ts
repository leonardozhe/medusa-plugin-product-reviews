/**
 * Product Reviews Plugin for Medusa v2.13+
 *
 * @author Lambda Curry <team@lambdacurry.dev>
 * @author Modified for Medusa 2.13 compatibility by leonardozhe
 * @license MIT
 */

// Core exports
export * from "./models";
export * from "./repositories";
export * from "./services";
export * from "./validators";

// Plugin entry point
export { default as productReviewsPlugin } from "./plugin";
