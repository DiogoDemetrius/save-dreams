interface MercadoPagoStatic {
  new (publicKey: string, options?: { locale: string }): {
    checkout: (options: {
      preference: {
        id: string;
      };
      autoOpen?: boolean;
      render?: {
        container?: string;
        label?: string;
      };
    }) => void;
  };
}

declare global {
  interface Window {
    MercadoPago: MercadoPagoStatic;
  }
}