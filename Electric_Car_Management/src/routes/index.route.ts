import { Router } from "express";
import AdminRouter from "./admin.route";
import AuctionRouter from "./auction.route";
import CategoryRouter from "./category.route";
import ChatRouter from "./chat.route";
import ContractRouter from "./contract.route";
import FavoriteRouter from "./favorite.route";
import FeedbackRouter from "./feedback.route";
import GeminiRouter from "./gemini.route";
import NotificationRouter from "./notification.route";
import OrderRouter from "./order.route";
import PackageRouter from "./package.route";
import PaymentRouter from "./payment.route";
import PostRouter from "./post.route";
import ProductRouter from "./product.route";
import RelatedRouter from "./related.route";
import SellerRouter from "./seller.route";
import ServiceRouter from "./service.route";
import UploadRouter from "./upload.route";
import UserRouter from "./user.route";

const routes = Router();

routes.use("/api/test", (req: any, res: any) => {
  return res.status(200).json({
    success: true,
    message: "Hello World",
  });
});
routes.use("/api/user", UserRouter);
routes.use("/api/product", ProductRouter);
routes.use("/api/post", PostRouter);
routes.use("/api/category", CategoryRouter);
routes.use("/api/payment", PaymentRouter);
routes.use("/api/upload", UploadRouter);
routes.use("/api/gemini", GeminiRouter); // For multiple uploads
routes.use("/api/service", ServiceRouter);
routes.use("/api/order", OrderRouter);
routes.use("/api/admin", AdminRouter);
routes.use("/api/chat", ChatRouter);
routes.use("/api/notification", NotificationRouter);
routes.use("/api/auction", AuctionRouter);
routes.use("/api/package", PackageRouter);
routes.use("/api/contract", ContractRouter);
routes.use("/api/favorites", FavoriteRouter);
routes.use("/api/feedbacks", FeedbackRouter);
routes.use("/api/sellers", SellerRouter);
routes.use("/api/related", RelatedRouter);

export default routes;
