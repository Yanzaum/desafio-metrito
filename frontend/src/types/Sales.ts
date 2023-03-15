export interface SaleType {
  buyer?: {
    email: String;
    name: String;
    ucode: String;
  };
  producer: {
    name: String;
    ucode: String;
  };
  product?: {
    id: Number;
    name: String;
  };
  purchase: {
    approved_date: Number;
    commission_as: String;
    hotmart_fee: {
      base: Number;
      currency_code: String;
      fixed: Number;
      total: Number;
    };
    is_subscription: boolean;
    offer: {
      code: String;
      payment_mode: String;
    };
    order_date: number;
    payment: {
      installments_number: Number;
      method: String;
      type: String;
    };
    price: {
      currency_code: String;
      value: Number;
    };
    status: String;
    transaction: String;
    warranty_expire_date: Number;
  };
}
