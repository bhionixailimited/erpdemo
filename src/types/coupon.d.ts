interface CouponType {
  _id: string;
  applicableDate: string;
  code: string;
  createdAt: string;
  discountPercentage: number;
  expiryDate: string;
  isActive: boolean;
  isFullDiscount: boolean;
  maxDiscount: number;
  minAmountToApply: number;
  name: string;
}
export default CouponType;
